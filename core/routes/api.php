<?php

use App\Http\Controllers\AtelierController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashbordAdminController;
use App\Http\Controllers\EntrepriseController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\FormationController;
use App\Http\Controllers\InvitationController;
use App\Http\Controllers\ModuleController;
use App\Http\Controllers\SeanceController;
use App\Http\Controllers\SessionFormationEntrepriseController;
use App\Http\Controllers\SessionUserController;
use App\Http\Controllers\UserController;


Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/invitation/register', [AuthController::class, 'registerWithInvitation']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/api/invitation/verify/{token}', [InvitationController::class, 'verify']);

Route::middleware('auth:api')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/user-profile', [AuthController::class, 'userProfile']);
    Route::post('/invitation/send', [InvitationController::class,'send']);
    Route::put('/user/password',[UserController::class,'updatePassword']);
    Route::put('/user/photo',[UserController::class,'updatePhoto']);
    Route::get('/dashbord/admin',[DashbordAdminController::class,'getStatistics']);
    Route::get('/dashbord/admin/formation/{formation}',[DashbordAdminController::class,'getFStatistics']);
    Route::get('/dashbord/admin/entreprise/{entreprise}',[DashbordAdminController::class,'getEStatistics']);
    Route::apiResources([
        'entreprises' => EntrepriseController::class,
        'formations' => FormationController::class,
        'modules' => ModuleController::class,
        'ateliers' => AtelierController::class,
        'files' => FileController::class,
        'sessionFormationEntreprise' => SessionFormationEntrepriseController::class,
        'sessionUsers' => SessionUserController::class,
        'seances' => SeanceController::class,
    ]);
    Route::get('/sessionFormationEntreprise/user/{sessionFormationEntreprise}',[SessionFormationEntrepriseController::class,'session']);
    Route::post('/sessionUsers/desaffecter',[SessionUserController::class,'desaffecter']);
    Route::put('/user/update/{user}',[UserController::class,'update']);
    Route::get('/user/participant',[UserController::class,'participant']);
    Route::get('/user/rh',[UserController::class,'rh']);
    Route::get('/user/formateur',[UserController::class,'formateur']);
    Route::delete('/user/{user}',[UserController::class,'destroy']);
    Route::post('/module/{module}', [ModuleController::class, 'update']);
    Route::post('/entreprise/{entreprise}', [EntrepriseController::class, 'update']);
    Route::put('/sessionFormationEntreprise/suspendreSession/{sessionFormationEntreprise}',[SessionFormationEntrepriseController::class,'suspendreSession']);
    Route::put('/sessionFormationEntreprise/annulerSession/{sessionFormationEntreprise}',[SessionFormationEntrepriseController::class,'annulerSession']);
    Route::put('/sessionFormationEntreprise/activerSession/{sessionFormationEntreprise}',[SessionFormationEntrepriseController::class,'activerSession']);
    Route::get('/entreprise/participants/{entreprise}', [EntrepriseController::class, 'participants']);
});

Route::post('/forgot-password', [PasswordResetLinkController::class, 'store']);
Route::post('/reset-password', [NewPasswordController::class, 'store']);


Route::put('/sessionFormationEntreprise/suspendreSession/{sessionFormationEntreprise}',[SessionFormationEntrepriseController::class,'suspendreSession']);
Route::put('/sessionFormationEntreprise/annulerSession/{sessionFormationEntreprise}',[SessionFormationEntrepriseController::class,'annulerSession']);
Route::put('/sessionFormationEntreprise/activerSession/{sessionFormationEntreprise}',[SessionFormationEntrepriseController::class,'activerSession']);
