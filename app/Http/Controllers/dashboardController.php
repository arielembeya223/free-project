<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class dashboardController extends Controller
{
    public function show()
    {
        return view("dashboard.show");
    }
    public function message()
    {
        return view("dashboard.message");
    }
    public function annonce()
    {
        return view("dashboard.annonce");
    }
}
