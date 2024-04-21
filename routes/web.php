<?php

use App\Http\Controllers\connectController;
use App\Http\Controllers\dashboardController;
use App\Http\Controllers\inscriptionController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\welcomeController;
use App\Http\Controllers\ajaxController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', [welcomeController::class,'index'])->name('welcome');
Route::get('/connect',[connectController::class,'index'])->name('connect');
Route::get('/inscription',[inscriptionController::class,'index'])->name('inscription');
Route::post('/inscription',[inscriptionController::class,'registration'])->name('registration');
Route::post('/connect',[connectController::class,'login'])->name("login");
Route::prefix("/dashboard-{user}")->controller(dashboardController::class)->middleware("auth")->name("dashboard.")->group(function(){
   route::get("/show","show")->name("show");
   route::get("/message","message")->name("message"); 
   route::get("/annonce","annonce")->name("annonce");
   route::post("/annonce","publie")->name("publie");
   route::get("/compte","compte")->name("compte");
   Route::post("/add-contact",'addContact')->name("addContact");
   Route::get("/conversation-{to}",'conversation')->name("conversation");
  // Route::get("/conversation-{to}", [ajaxController::class,'messages'])->name("conversation");
   Route::post("/conversation-{to}",'send')->name("send");
});
Route::get('/js/{file}', function ($file) {
    return response()->file(public_path('js/' . $file), ['Content-Type' => 'application/javascript']);
});

Route::get('/csrf-token', function() {
    return response()->json(['csrf_token' => csrf_token()]);
});
Route::get('/contacts', [ajaxController::class,'index']);
//messages 'ajaxController@post'Tweet lasts
Route::get('/messages', [ajaxController::class,'messages']);
Route::get('/posts', [ajaxController::class,'post']);
Route::get('/tweets', [ajaxController::class,'tweets']);
Route::get('/lasts', [ajaxController::class,'lasts']);