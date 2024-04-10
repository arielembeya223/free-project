<?php

use App\Http\Controllers\connectController;
use App\Http\Controllers\dashboardController;
use App\Http\Controllers\inscriptionController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\welcomeController;
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
   route::get("/compte","compte")->name("compte");

});
Route::get('/js/{file}', function ($file) {
    return response()->file(public_path('js/' . $file), ['Content-Type' => 'application/javascript']);
});

