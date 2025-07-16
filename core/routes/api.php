<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EntrepriseController;
use App\Http\Controllers\FormationController;
use App\Http\Controllers\InvitationController;
use App\Models\Invitation;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/invitation/register', [AuthController::class, 'registerWithInvitation']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/api/invitation/verify/{token}', [InvitationController::class, 'verify']);


Route::apiResources([
    'entreprises' => EntrepriseController::class,
    'formations' => FormationController::class,
    //'users' => UserController::class,
    
]);

Route::middleware('auth:api')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/user-profile', [AuthController::class, 'userProfile']);
    Route::post('/invitation/send', [InvitationController::class,'send']);
});