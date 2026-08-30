<?php

namespace App\Http\Controllers\Api\V1;

use App\CentralLogics\Helpers;
use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ContactController extends Controller
{
    public const SYSTEM_SUBJECT = 'Website Contact Form';

    public function send(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:100',
            'email' => 'required|email|max:100',
            'phone' => ['required', 'regex:/^\+974[0-9]{8}$/'],
            'message' => 'required|string',
        ]);

        $validator->after(function ($validator) use ($request) {
            if (trim((string) $request->message) === '') {
                $validator->errors()->add('message', 'The message field is required.');
            }
        });

        if ($validator->fails()) {
            return response()->json(['errors' => Helpers::error_processor($validator)], 403);
        }

        $contact = new Contact;
        $contact->name = trim($request->name);
        $contact->email = trim($request->email);
        $contact->phone = $request->phone;
        $contact->subject = self::SYSTEM_SUBJECT;
        $contact->message = trim($request->message);
        $contact->save();

        return response()->json(['message' => 'Message sent successfully!'], 200);
    }
}
