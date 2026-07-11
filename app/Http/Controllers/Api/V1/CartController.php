<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Cart;
use App\Models\Item;
use Illuminate\Http\Request;
use App\CentralLogics\Helpers;
use App\Http\Controllers\Controller;
use App\Models\ItemCampaign;
use App\Models\Coupon;
use App\CentralLogics\CouponLogic;
use Illuminate\Support\Facades\Validator;

class CartController extends Controller
{
    public function get_carts(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'guest_id' => $request->user ? 'nullable' : 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => Helpers::error_processor($validator)], 403);
        }
        $user_id = $request->user ? $request->user->id : $request['guest_id'];
        $is_guest = $request->user ? 0 : 1;
        $tax_lines = [];
        $carts = Cart::where('user_id', $user_id)->where('is_guest',$is_guest)->where('module_id',$request->header('moduleId'))->get()
        ->map(function ($data) use (&$tax_lines) {
            $data->add_on_ids = json_decode($data->add_on_ids,true);
            $data->add_on_qtys = json_decode($data->add_on_qtys,true);
            $data->variation = json_decode($data->variation,true);
            $raw_item = $data->item;
            $discount = ($raw_item && $raw_item->store) ? Helpers::product_discount_calculate($raw_item, $data->price, $raw_item->store) : null;
            if ($raw_item) {
                $tax_lines[] = ['raw_item' => $raw_item, 'discount' => $discount, 'cart' => $data];
            }
			$data->item = Helpers::cart_product_data_formatting($raw_item, $data->variation,$data->add_on_ids,
            $data->add_on_qtys, false, app()->getLocale());
			$data->price_breakdown = Helpers::cart_price_breakdown($data, $data->item, $discount);
			return $data;
		});

        $additional_charge_status = (int) Helpers::get_business_settings('additional_charge_status') ?? 0;
        $additional_charge = $additional_charge_status ? (float) (Helpers::get_business_settings('additional_charge') ?? 0) : 0;

        $subtotal = round($carts->sum(fn($c) => $c->price_breakdown['line_total']), 3);

        $coupon_discount = 0;
        $coupon_code = null;
        $coupon_error = null;
        if ($request->filled('coupon_code')) {
            $first_item = $carts->first()->item ?? null;
            $store_id = $first_item['store_id'] ?? null;
            $coupon = Coupon::active()->where(['code' => $request['coupon_code']])->first();
            if (!isset($coupon)) {
                $coupon_error = translate('messages.coupon_not_found');
            } elseif (!$store_id) {
                $coupon_error = translate('messages.coupon_not_found');
            } else {
                $status = CouponLogic::is_valide($coupon, $user_id, $store_id);
                if ($status == 200) {
                    if ($coupon->coupon_type != 'free_delivery' && $subtotal < $coupon->min_purchase) {
                        $coupon_error = translate('messages.minimum_purchase_required');
                    } else {
                        $coupon_discount = $coupon->coupon_type == 'free_delivery' ? 0 : round(CouponLogic::get_discount($coupon, $subtotal), 3);
                        $coupon_code = $coupon->code;
                    }
                } elseif ($status == 407) {
                    $coupon_error = translate('messages.coupon_expire');
                } elseif ($status == 406) {
                    $coupon_error = translate('messages.coupon_usage_limit_over');
                } elseif ($status == 408) {
                    $coupon_error = translate('messages.You_are_not_eligible_for_this_coupon');
                } else {
                    $coupon_error = translate('messages.coupon_not_found');
                }
            }
        }

        $tips = (float) ($request['dm_tips'] ?? 0);

        $tax_store_id = $tax_lines[0]['raw_item']->store_id ?? null;
        $tax_result = Helpers::cart_tax_calculate($tax_lines, $coupon_discount, $tax_store_id);

        $gross_total = round($carts->sum(fn($c) => $c->price_breakdown['line_total']), 3);
        $final_subtotal = round(max($gross_total - $coupon_discount + $additional_charge + $tips + $tax_result['tax_amount'], 0), 3);

        $cart_total = [
            'base_total' => round($carts->sum(fn($c) => $c->price_breakdown['base_total']), 3),
            'variations_total' => round($carts->sum(fn($c) => $c->price_breakdown['variations_total']), 3),
            'addons_total' => round($carts->sum(fn($c) => $c->price_breakdown['addons_total']), 3),
            'item_discount' => round($carts->sum(fn($c) => $c->price_breakdown['item_discount']), 3),
            'coupon_code' => $coupon_code,
            'coupon_discount' => $coupon_discount,
            'coupon_error' => $coupon_error,
            'tax' => $tax_result['tax_amount'],
            'tax_status' => $tax_result['tax_status'],
            'additional_charge' => round($additional_charge, 3),
            'tips' => round($tips, 3),
            'subtotal' => $final_subtotal,
        ];

        return response()->json(['carts' => $carts, 'cart_total' => $cart_total], 200);
    }

    public function add_to_cart(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'guest_id' => $request->user ? 'nullable' : 'required',
            'item_id' => 'required|integer',
            'model' => 'required|string|in:Item,ItemCampaign',
            'price' => 'required|numeric',
            'quantity' => 'required|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => Helpers::error_processor($validator)], 403);
        }

        $user_id = $request->user ? $request->user->id : $request['guest_id'];
        $is_guest = $request->user ? 0 : 1;
        $model = $request->model === 'Item' ? 'App\Models\Item' : 'App\Models\ItemCampaign';
        $item = $request->model === 'Item' ? Item::find($request->item_id) : ItemCampaign::find($request->item_id);


        if(!$item) {
            return response()->json(['errors' => [['code' => 'item', 'message' => translate('messages.item_not_found')]]], 404);
        }

        $cart = Cart::where('item_id',$request->item_id)->where('item_type',$model)->where('user_id', $user_id)->where('is_guest',$is_guest)->where('module_id',$request->header('moduleId'))->first();

        if ($cart && json_decode($cart->variation, true) == $request->variation) {

            return response()->json([
                'errors' => [
                    ['code' => 'cart_item', 'message' => translate('messages.Item_already_exists')]
                ]
            ], 403);
        }

        if($item->maximum_cart_quantity && ($request->quantity>$item->maximum_cart_quantity)){
            return response()->json([
                'errors' => [
                    ['code' => 'cart_item_limit', 'message' => translate('messages.maximum_cart_quantity_exceeded')]
                ]
            ], 403);
        }

        $cart = new Cart();
        $cart->user_id = $user_id;
        $cart->module_id = $request->header('moduleId');
        $cart->item_id = $request->item_id;
        $cart->is_guest = $is_guest;
        $cart->add_on_ids = isset($request->add_on_ids)?json_encode($request->add_on_ids):json_encode([]);
        $cart->add_on_qtys = isset($request->add_on_qtys)?json_encode($request->add_on_qtys):json_encode([]);
        $cart->item_type = $request->model;
        $cart->price = $request->price;
        $cart->quantity = $request->quantity;
        $cart->variation = isset($request->variation)?json_encode($request->variation):json_encode([]);
        $cart->save();

        $item->carts()->save($cart);

        $carts = Cart::where('user_id', $user_id)->where('is_guest',$is_guest)->where('module_id',$request->header('moduleId'))->get()
        ->map(function ($data) {
            $data->add_on_ids = json_decode($data->add_on_ids,true);
            $data->add_on_qtys = json_decode($data->add_on_qtys,true);
            $data->variation = json_decode($data->variation,true);
			$data->item = Helpers::cart_product_data_formatting($data->item, $data->variation,$data->add_on_ids,
            $data->add_on_qtys, false, app()->getLocale());
            return $data;
		});
        return response()->json($carts, 200);
    }

    public function update_cart(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'cart_id' => 'required',
            'guest_id' => $request->user ? 'nullable' : 'required',
            'price' => 'required|numeric',
            'quantity' => 'required|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => Helpers::error_processor($validator)], 403);
        }

        $user_id = $request->user ? $request->user->id : $request['guest_id'];
        $is_guest = $request->user ? 0 : 1;
        $cart = Cart::find($request->cart_id);
        $item = $cart->item_type === 'App\Models\Item' ? Item::find($cart->item_id) : ItemCampaign::find($cart->item_id);
        if($item->maximum_cart_quantity && ($request->quantity>$item->maximum_cart_quantity)){
            return response()->json([
                'errors' => [
                    ['code' => 'cart_item_limit', 'message' => translate('messages.maximum_cart_quantity_exceeded')]
                ]
            ], 403);
        }

        $cart->user_id = $user_id;
        $cart->module_id = $request->header('moduleId');
        $cart->is_guest = $is_guest;
        $cart->add_on_ids = isset($request->add_on_ids)?json_encode($request->add_on_ids):$cart->add_on_ids;
        $cart->add_on_qtys = isset($request->add_on_qtys)?json_encode($request->add_on_qtys):$cart->add_on_qtys;
        $cart->price = $request->price;
        $cart->quantity = $request->quantity;
        $cart->variation = isset($request->variation)?json_encode($request->variation):$cart->variation;
        $cart->save();

        $carts = Cart::where('user_id', $user_id)->where('is_guest',$is_guest)->where('module_id',$request->header('moduleId'))->get()
        ->map(function ($data) {
            $data->add_on_ids = json_decode($data->add_on_ids,true);
            $data->add_on_qtys = json_decode($data->add_on_qtys,true);
            $data->variation = json_decode($data->variation,true);
			$data->item = Helpers::cart_product_data_formatting($data->item, $data->variation,$data->add_on_ids,
            $data->add_on_qtys, false, app()->getLocale());
            return $data;
		});
        return response()->json($carts, 200);
    }

    public function remove_cart_item(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'cart_id' => 'required',
            'guest_id' => $request->user ? 'nullable' : 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => Helpers::error_processor($validator)], 403);
        }

        $user_id = $request->user ? $request->user->id : $request['guest_id'];
        $is_guest = $request->user ? 0 : 1;

        $cart = Cart::find($request->cart_id);
        $cart?->delete();

        $carts = Cart::where('user_id', $user_id)->where('is_guest',$is_guest)->where('module_id',$request->header('moduleId'))->get()
        ->map(function ($data) {
            $data->add_on_ids = json_decode($data->add_on_ids,true);
            $data->add_on_qtys = json_decode($data->add_on_qtys,true);
            $data->variation = json_decode($data->variation,true);
			$data->item = Helpers::cart_product_data_formatting($data->item, $data->variation,$data->add_on_ids,
            $data->add_on_qtys, false, app()->getLocale());
            return $data;
		});
        return response()->json($carts, 200);
    }

    public function remove_cart(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'guest_id' => $request->user ? 'nullable' : 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => Helpers::error_processor($validator)], 403);
        }

        $user_id = $request->user ? $request->user->id : $request['guest_id'];
        $is_guest = $request->user ? 0 : 1;

        $carts = Cart::where('user_id', $user_id)->where('is_guest',$is_guest)->where('module_id',$request->header('moduleId'))->get();

        foreach($carts as $cart){
            $cart?->delete();
        }


        $carts = Cart::where('user_id', $user_id)->where('is_guest',$is_guest)->where('module_id',$request->header('moduleId'))->get()
        ->map(function ($data) {
            $data->add_on_ids = json_decode($data->add_on_ids,true);
            $data->add_on_qtys = json_decode($data->add_on_qtys,true);
            $data->variation = json_decode($data->variation,true);
			$data->item = Helpers::cart_product_data_formatting($data->item, $data->variation,$data->add_on_ids,
            $data->add_on_qtys, false, app()->getLocale());
            return $data;
		});
        return response()->json($carts, 200);
    }
}
