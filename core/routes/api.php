<?php

use App\Http\Controllers\AtelierController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EntrepriseController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\FormationController;
use App\Http\Controllers\InvitationController;
use App\Http\Controllers\ModuleController;
use App\Http\Controllers\SessionFormationEntrepriseController;
use App\Http\Controllers\SessionUserController;
use App\Http\Controllers\UserController;


Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/invitation/register', [AuthController::class, 'registerWithInvitation']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/api/invitation/verify/{token}', [InvitationController::class, 'verify']);


Route::apiResources([
    'entreprises' => EntrepriseController::class,
    'formations' => FormationController::class,
    'modules' => ModuleController::class,
    'ateliers' => AtelierController::class,
    'files' => FileController::class,
    'sessionFormationEntreprise' => SessionFormationEntrepriseController::class,
    'sessionUsers' => SessionUserController::class,
]);

Route::middleware('auth:api')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/user-profile', [AuthController::class, 'userProfile']);
    Route::post('/invitation/send', [InvitationController::class,'send']);
    Route::put('/user/password',[UserController::class,'updatePassword']);
    Route::put('/user/photo',[UserController::class,'updatePhoto']);
    //Route::put('/user/update/{user}',[UserController::class,'update']);
});

Route::post('/forgot-password', [PasswordResetLinkController::class, 'store']);
Route::post('/reset-password', [NewPasswordController::class, 'store']);
Route::put('/user/update/{user}',[UserController::class,'update']);

Route::put('/sessionFormationEntreprise/suspendreSession/{sessionFormationEntreprise}',[SessionFormationEntrepriseController::class,'suspendreSession']);
Route::put('/sessionFormationEntreprise/annulerSession/{sessionFormationEntreprise}',[SessionFormationEntrepriseController::class,'annulerSession']);
Route::put('/sessionFormationEntreprise/activerSession/{sessionFormationEntreprise}',[SessionFormationEntrepriseController::class,'activerSession']);
Route::put('/sessionFormationEntreprise/activerSession/{sessionFormationEntreprise}',[SessionFormationEntrepriseController::class,'activerSession']);