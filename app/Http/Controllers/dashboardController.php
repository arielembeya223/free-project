<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use  App\Http\Requests\addRequest;
use App\Models\User;
use App\Models\Contact;
use Illuminate\Support\Facades\Auth;
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
    public function compte(Request $request)
    {
       
        return view("dashboard.compte");
    }
    
    public function conversation(Request $request)
    {
        return view("dashboard.conversation"); 
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
    public function send()
    {
        var_dump("bonjour");
    }
}
