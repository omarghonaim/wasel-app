<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Validator;
use App\Traits\Processor;
use App\Models\PaymentRequest;

class Tap
{
    use Processor;

    private $config_values;

    public function __construct()
    {
        $config = $this->payment_config('tap', 'payment_config');
        if (!is_null($config) && $config->mode == 'live') {
            $this->config_values = json_decode($config->live_values);
        } elseif (!is_null($config) && $config->mode == 'test') {
            $this->config_values = json_decode($config->test_values);
        }
    }

    function create_charge($data)
    {
        return $this->send_api_request('charges', $data);
    }

    function retrieve_charge($charge_id)
    {
        return $this->send_api_request('charges/' . $charge_id, null, 'GET');
    }

    function currency_decimals($currency_code)
    {
        return in_array(strtoupper($currency_code), ['KWD', 'BHD', 'OMR']) ? 3 : 2;
    }

    function is_valid_webhook($charge, $hashstring_header)
    {
        if (!$hashstring_header) {
            return false;
        }
        $string = 'x_id' . ($charge['id'] ?? '')
            . 'x_amount' . number_format((float) ($charge['amount'] ?? 0), $this->currency_decimals($charge['currency'] ?? 'USD'), '.', '')
            . 'x_currency' . ($charge['currency'] ?? '')
            . 'x_gateway_reference' . ($charge['reference']['gateway'] ?? '')
            . 'x_payment_reference' . ($charge['reference']['payment'] ?? '')
            . 'x_status' . ($charge['status'] ?? '')
            . 'x_created' . ($charge['transaction']['created'] ?? '');
        $signature = hash_hmac('sha256', $string, $this->config_values->secret_key);
        return hash_equals($signature, $hashstring_header);
    }

    function send_api_request($request_url, $data = null, $request_method = 'POST')
    {
        $curl = curl_init();
        $options = array(
            CURLOPT_URL => 'https://api.tap.company/v2/' . $request_url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_CUSTOMREQUEST => $request_method,
            CURLOPT_HTTPHEADER => array(
                'Authorization: Bearer ' . $this->config_values->secret_key,
                'Content-Type: application/json'
            ),
        );
        if (!is_null($data)) {
            $options[CURLOPT_POSTFIELDS] = json_encode($data);
        }
        curl_setopt_array($curl, $options);

        $response = json_decode(curl_exec($curl), true);
        return $response;
    }
}

class TapController extends Controller
{
    use Processor;

    private PaymentRequest $payment;
    private $user;

    public function __construct(PaymentRequest $payment, User $user)
    {
        $this->payment = $payment;
        $this->user = $user;
    }

    public function payment(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'payment_id' => 'required|uuid'
        ]);

        if ($validator->fails()) {
            return response()->json($this->response_formatter(GATEWAYS_DEFAULT_400, null, $this->error_processor($validator)), 400);
        }

        $payment_data = $this->payment::where(['id' => $request['payment_id']])->where(['is_paid' => 0])->first();
        if (!isset($payment_data)) {
            return response()->json($this->response_formatter(GATEWAYS_DEFAULT_204), 200);
        }
        $payer = json_decode($payment_data['payer_information']);

        $plugin = new Tap();
        $data = [
            "amount" => round($payment_data->payment_amount, $plugin->currency_decimals($payment_data->currency_code)),
            "currency" => $payment_data->currency_code,
            "customer_initiated" => true,
            "threeDSecure" => true,
            "source" => ["id" => "src_all"],
            "customer" => [
                "first_name" => $payer->name ?? "N/A",
                "email" => $payer->email ?? null,
                "phone" => [
                    "country_code" => "965",
                    "number" => $payer->phone ?? "00000000"
                ]
            ],
            "redirect" => [
                "url" => route('tap.callback', ['payment_id' => $payment_data->id])
            ],
            "post" => [
                "url" => route('tap.callback', ['payment_id' => $payment_data->id])
            ],
            "reference" => [
                "transaction" => (string) $payment_data->id,
                "order" => (string) $payment_data->attribute_id,
                "idempotent" => (string) $payment_data->id
            ]
        ];

        $charge = $plugin->create_charge($data);
        if (!isset($charge['transaction']['url'])) {
            return response()->json($this->response_formatter(GATEWAYS_DEFAULT_204), 200);
        }
        header('Location:' . $charge['transaction']['url']); /* Redirect browser */
        exit();
    }

    public function callback(Request $request)
    {
        $charge_id = $request->get('tap_id');

        if (!$charge_id) {
            return response()->json($this->response_formatter(GATEWAYS_DEFAULT_204), 200);
        }

        $plugin = new Tap();
        $verify_result = $plugin->retrieve_charge($charge_id);

        $hashstring_header = $request->header('hashstring');
        if ($hashstring_header && !$plugin->is_valid_webhook($verify_result, $hashstring_header)) {
            return response()->json($this->response_formatter(GATEWAYS_DEFAULT_204), 200);
        }

        $is_success = isset($verify_result['status']) && $verify_result['status'] === 'CAPTURED';

        if ($is_success) {
            $this->payment::where(['id' => $request['payment_id']])->update([
                'payment_method' => 'tap',
                'is_paid' => 1,
                'transaction_id' => $charge_id,
            ]);
            $payment_data = $this->payment::where(['id' => $request['payment_id']])->first();
            if (isset($payment_data) && function_exists($payment_data->success_hook)) {
                call_user_func($payment_data->success_hook, $payment_data);
            }
            return $this->payment_response($payment_data, 'success');
        }
        $payment_data = $this->payment::where(['id' => $request['payment_id']])->first();
        if (isset($payment_data) && function_exists($payment_data->failure_hook)) {
            call_user_func($payment_data->failure_hook, $payment_data);
        }
        return $this->payment_response($payment_data, 'fail');
    }

    public function response(Request $request)
    {
        return response()->json($this->response_formatter(GATEWAYS_DEFAULT_200), 200);
    }
}
