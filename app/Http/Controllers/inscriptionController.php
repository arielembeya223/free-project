<?php

namespace App\Http\Controllers;
use App\Http\Requests\RegistrationRequest;
use Illuminate\Http\Request;

class inscriptionController extends Controller
{
    public function index()
    {
        return view("inscription");
    }
    public function registration(RegistrationRequest $request)
    {
        var_dump($request->validated());
    }
}
