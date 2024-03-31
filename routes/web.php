<?php

use App\Http\Controllers\connectController;
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
Route::get('/js/{file}', function ($file) {
    return response()->file(public_path('js/' . $file), ['Content-Type' => 'application/javascript']);
});

