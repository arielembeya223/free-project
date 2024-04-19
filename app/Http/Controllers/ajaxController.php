<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contact;
use App\Models\discussion;
use App\Models\Post;
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
    public function messages(Request $request)
    {
        $url_referer = $_SERVER['HTTP_REFERER'];

        // Divisez l'URL en segments en utilisant le caractère '/'
        $segments = explode('/', $url_referer);
        
        // Récupérez le dernier segment de l'URL
        $conversation = end($segments);
        
        // Convertissez le numéro en entier
        $seg_conv=explode('-',$conversation);

        $numero=end($seg_conv);
        $user = $request->user();
        $id1 =$user->id;
        $id2 = $numero;
        
        // Récupération des messages de la base de données
        $messagesFromDatabase = discussion::where('sender_id', $id1)
            ->where('receiver_id', $id2)
            ->orwhere('sender_id', $id2)
            ->where('receiver_id', $id1)
            ->orderBy('created_at', 'asc')
            ->get();
    
        // Construction du tableau de messages à renvoyer
        $messages = [];
        foreach ($messagesFromDatabase as $message) {
            $messages[] = [
                'id' => $message->id,
                'contenu' => $message->contenu,
                'sender_id' => $message->sender_id,
                'receiver_id' =>$message->receiver_id,
            ];
        }
    
        // Renvoi des messages au format JSON
        return response()->json($messages);
    }
    public function post(Request $request)
    {
        $user = $request->user();
        $posts = Post::where('user_id', $user->id)
                    ->get();
       
        return response()->json($posts);
    }
}
