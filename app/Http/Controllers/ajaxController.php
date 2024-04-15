<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contact;
class ajaxController extends Controller
{
      public function index(Request $request)
    {
        $user = $request->user();
        $contacts = Contact::where('user_id_1', $user->id)
            ->join('users', 'contacts.user_id_2', '=', 'users.id')
            ->select('contacts.*', 'users.*')
            ->get();
       
        return response()->json($contacts);
    }
}
