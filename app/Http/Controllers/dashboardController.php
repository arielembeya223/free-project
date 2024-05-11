<?php

namespace App\Http\Controllers;
use Illuminate\Http\UploadedFile;
use Illuminate\Http\Request;
use  App\Http\Requests\addRequest;
use App\Http\Requests\audioRequest;
use App\Models\User;

use App\Models\Contact;

use App\Models\discussion;

use App\Models\Post;

use App\Models\Channel;

use App\Models\Channel_messages;

use App\Models\ChannelMember;


use Illuminate\Support\Facades\Auth;
use App\Http\Requests\addChannelsRequest;

use App\Http\Requests\channelRequest;

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
       $to= $request->route('to');
        return view("dashboard.conversation",['to'=>$to]); 
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
    public function send(addRequest $request)
    {
        $form=$request->validated();
        $content=$form['content'];


    
        $type="texte";
        $data=[
            'sender_id'=>$request->route("user"),
            'receiver_id'=>$request->route("to"),
            'type'=>'text',
            'contenu'=>$content
        ];
        discussion::create($data);
        return back()->with("success",'contact ajoute');
    }
    public function publie(addRequest $request)
    {
        $id=$request->user()->id;

        Post::create(['user_id'=>$id,'content'=>$request->validated('content')]);

        return back()->with("success",'Post ajoute');
    }
    private function uppload(UploadedFile $file, string $name="public"){
        return $file->store($name,"public");
       }
       
    public function audio(Request $request)
    {
    $sender_id=$request->user()->id;
    $receiver_id=$request->route('to');
    $audioFile = $request->file('audio');
    $chemin=$this->uppload($audioFile);
    discussion::create([
        'sender_id'=>$sender_id,
        'receiver_id'=>$receiver_id,
        'contenu'=>$chemin,
        'type'=>'audio'
    ]);
     return back()->with("success",'audio envoye');
   }
   public function addChannels(addChannelsRequest $request)
   {
    

    $data=$request->validated();
    
    Channel::create($data);

    return back()->with("success",'channel cree');
   }
   public function addMembers(Request $request,Channel $channel){
   $user_id= $request->route('user');

   ChannelMember::create(['user_id'=>$user_id,'channel_id'=>$channel]);
  }
  public function addMessages(channelRequest $request,Channel $channel){
    $data=$request->validated();

    $data[]=['user_id'=>$request->user()->id,'channel_id'=>$channel];

    
    return back()->with("success",'message envoye');
  }
}