<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class inscriptionController extends Controller
{
    public function index()
    {
        return view('inscription');
    }
}
