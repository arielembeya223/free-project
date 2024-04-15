<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\dashboardController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Route pour fournir le jeton CSRF
Route::get('/csrf-token', function (Request $request) {
    return response()->json(['csrf_token' => csrf_token()]);
});

// Groupement de routes avec le middleware CSRF
Route::middleware('csrf')->group(function () {
    // Vos autres routes API ici
    Route::prefix("/dashboard-{user}")->controller(dashboardController::class)->middleware(["auth"])->name("dashboard.")->group(function(){
        route::get("/show","show")->name("show");
        route::get("/message","message")->name("message"); 
        route::get("/annonce","annonce")->name("annonce");
        route::get("/compte","compte")->name("compte");
        Route::post("/add-contact",'addContact')->name("addContact");
    });
});
Route::middleware('auth:sanctum')->get('/contacts', 'ajaxController@index');
 