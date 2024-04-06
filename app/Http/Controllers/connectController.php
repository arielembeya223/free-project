<?php

namespace App\Http\Controllers;
use App\Http\Requests\loginRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class connectController extends Controller
{
    public function index()
    {
            return view('connect');
    }
    

    public function login(loginRequest $request){
        $credentials = $request->validated(); // Récupérer les informations d'identification depuis la requête
    
        if(Auth::attempt($credentials))
        {             
            $id = Auth::id(); // Récupérer l'ID de l'utilisateur authentifié
            
            Session::regenerate();
            
            return redirect()->route("dashboard.show",['user'=>$id])->with("success","Vous êtes connecté");
        } else {
            // Échec de l'authentification
            return redirect()->back()->withInput()->with("error","Identifiants invalides");
        }
    }
    
}
