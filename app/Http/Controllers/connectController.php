<?php

namespace App\Http\Controllers;
use App\Http\Requests\loginRequest;
use Illuminate\Http\Request;

class connectController extends Controller
{
    public function index()
    {
            return view('connect');
    }
    public function login(loginRequest $request){
        var_dump($request->validated());
    }
}
