<?php

namespace App\Http\Controllers;
use Stichoza\GoogleTranslate\GoogleTranslate;
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

use function PHPSTORM_META\type;

class dashboardController extends Controller
{
    public function Onglet(Request $request)
    {
        $user = $request->user();

        $lang = $user->lang;
    
        $translator = new GoogleTranslate();
    
        $translator->setOptions(['verify' => false]);

        $tabs=['acceuil'=>'acceuil','annonce'=>'annonce','Messages'=>'messages','Dashboard'=>'Dashboard'];

        foreach ($tabs as $index=>$tab)
        {
            $tab = $translator->setSource()->setTarget($lang)->translate($tab);
        }
        return $tabs;
    }
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

    $extens=$audioFile->getClientOriginalExtension();

    $chemin=$this->uppload($audioFile);

    $type=null;
 
    if($extens === 'mp3')
    {
       $type='audio';
    }
    elseif($extens === 'docx' )
    {
       $type='docx';
    }
    elseif($extens === 'xlsx')
    {
    $type='excel';
    }
    elseif($extens === 'mp4')
    {
        $type='video'; 
    }
    elseif($extens === 'pptx')
    {
    $type='powerpoint';
    }else
    {
        $type='unDefined';
    }

    discussion::create([
        'sender_id'=>$sender_id,
        'receiver_id'=>$receiver_id,
        'contenu'=>$chemin,
        'type'=>$type
    ]);
     return back()->with("success",'audio envoye');
   }
   public function addChannels(addChannelsRequest $request)
   {
    $data=$request->validated();
    
    $user=$request->user();
    
    $user_id=$user->id;

    $data['user_id']=$user_id;
  
    
    Channel::create($data);

    return back()->with("success",'channel cree');
   }
   public function addMembers(Request $request){
   
   $user_id=$request->user()->id;

   $channel=$request->route("Channel");

   ChannelMember::create(['user_id'=>$user_id,'channel_id'=>$channel]);

   return back()->with("success",'admis dans le groupe');
  }
  public function addMessages(channelRequest $request){

    $data=$request->validated();

    $channel=$request->route("Channel");

    $data['user_id']=$request->user()->id;
    
    $data['channel_id']=$channel;

    Channel_messages::create($data);

    
    return back()->with("success",'message envoye');
  }
  public function showChannel(Request $request)
  {

    $channel=$request->route("Channel");

    $messages=Channel_messages::where('channel_id',$channel)->get();

    $userId=$request->user()->id;

    $join=false;

    $isMember = ChannelMember::where('channel_id', $channel)
                          ->where('user_id', $userId)
                          ->exists();
                          if ($isMember) {
                           $join=true;
                        } else {
                            $join=false;
                        }
    /**traduction des messages du canal */
    $user = $request->user();

    $lang = $user->lang;

    $translator = new GoogleTranslate();

    $translator->setOptions(['verify' => false]); 

   foreach ($messages as $message) {
                            $message->contenu = $translator->setSource()->setTarget($lang)->translate($message->contenu);
    }
    return view("dashboard.channel",["channel"=>$channel,'join'=>$join,'messages'=>$messages]);
  }
}