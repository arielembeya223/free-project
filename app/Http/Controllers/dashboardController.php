<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use  App\Http\Requests\addRequest;
use App\Models\User;
use App\Models\Contact;
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
    public function compte()
    {
        $csrfToken = csrf_token();
        
        return view("dashboard.compte");
    
    }
    
    
    public function addContact(addRequest $request)
    {
       
       $user_id_1= $request->route('user');
       $content = $request->validated();

    // Recherche de l'utilisateur avec le nom fourni
    $user = User::where('name', $content['content'])->first();

    // Vérifiez si l'utilisateur existe
    if ($user) {
        // L'utilisateur existe, récupérez son ID
        $user_id_2= $user->id;

        Contact::create(['user_id_1'=>$user_id_1,'user_id_2'=>$user_id_2]);

        return back()->with("success",'contact ajoute');
    } else {
        // L'utilisateur n'existe pas
        return response()->json(['error' => 'Utilisateur non trouvé'], 404);
    }

        
    }
}
