<?php
namespace App\Http\Controllers;


use App\Http\Requests\translateRequest;
use Google\Cloud\Speech\V1\SpeechClient;
use Google\Cloud\Speech\V1\RecognitionAudio;
use Google\Cloud\Speech\V1\RecognitionConfig;
use Google\Cloud\Translate\V2\TranslateClient;
use Google\Cloud\TextToSpeech\V1\TextToSpeechClient;
use Google\Cloud\TextToSpeech\V1\SynthesisInput;
use Google\Cloud\TextToSpeech\V1\VoiceSelectionParams;
use Google\Cloud\TextToSpeech\V1\AudioConfig;
use Google\Cloud\TextToSpeech\V1\AudioEncoding;
use Google\Cloud\TextToSpeech\V1\SsmlVoiceGender;
class translatorController extends Controller
{
    public function translateAudio(translateRequest $request)
    {
        $path = $request->input("path");
        $user = $request->user();

        $lang = $user->lang;
        $audioPath = storage_path("storage/" . $path); // Chemin du fichier audio

        // Reconnaissance vocale
        $speechClient = new SpeechClient();
        $audio = (new RecognitionAudio())
            ->setContent(file_get_contents($audioPath));
        $config = (new RecognitionConfig())
            ->setEncoding(AudioEncoding::LINEAR16)
            ->setSampleRateHertz(16000)
            ->setLanguageCode('fr-FR');
        $response = $speechClient->recognize($config, $audio);
        $transcript = $response->getResults()[0]->getAlternatives()[0]->getTranscript();

        // Traduction
        $translateClient = new TranslateClient();
        $translatedText = $translateClient->translate($transcript, ['target' => $lang])['text'];

        // Synthèse vocale
        $textToSpeechClient = new TextToSpeechClient();  
        $synthesisInput = new SynthesisInput(['text' => $translatedText]);
        $voice = new VoiceSelectionParams([
            'languageCode' => $lang,
            'ssmlGender' => SsmlVoiceGender::NEUTRAL
        ]);
        $audioConfig = new AudioConfig(['audioEncoding' => AudioEncoding::MP3]);

        $response = $textToSpeechClient->synthesizeSpeech($synthesisInput, $voice, $audioConfig);
        $outputAudio = 'translated_audio.mp3';
        file_put_contents(storage_path('app/public/translate/' . $outputAudio), $response->getAudioContent());

        return response()->json(['translated_audio' => $outputAudio]);
    }
}