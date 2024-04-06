<?php

namespace App\Http\Controllers;
use App\Http\Requests\RegistrationRequest;
use App\Models\User;
use Illuminate\Support\Facades\Session;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class inscriptionController extends Controller
{
    public function index()
    {
        return view("inscription");
    }
    public function registration(RegistrationRequest $request)
    {
        $data=$request->validated();

        $password=$data['password'];

        $credidentials=['name'=>$data['name'],"password"=>$data["password"]];

        $password=Hash::make($password);

        $data['password']=$password;
        
        $user=User::create($data);

        Auth::login($user);
    
        // Récupérer l'ID de l'utilisateur authentifié
        $id = Auth::id(); 
         
        Session::regenerate();
         
        return redirect()->route("dashboard.show",['user'=>$id])->with("success","vous etez connecte");
    }
}
