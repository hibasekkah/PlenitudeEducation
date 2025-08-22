<?php

use App\Http\Controllers\AtelierController;
use App\Http\Controllers\AttestationController;
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
use App\Http\Controllers\ListeParticipantController;
use App\Http\Controllers\ListePresenceController;
use App\Http\Controllers\ModuleController;
use App\Http\Controllers\PlanningController;
use App\Http\Controllers\PointageController;
use App\Http\Controllers\SeanceController;
use App\Http\Controllers\SessionFormationEntrepriseController;
use App\Http\Controllers\SessionUserController;
use App\Http\Controllers\UserController;
use App\Models\Pointage;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/invitation/register', [AuthController::class, 'registerWithInvitation']);
Route::post('/login', [AuthController::class, 'login']);


Route::middleware('auth:api')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/user-profile', [AuthController::class, 'userProfile']);
    Route::put('/user/password',[UserController::class,'updatePassword']);
    Route::put('/user/photo',[UserController::class,'updatePhoto']);

    Route::get('/participant/formation/{user}',[FormationController::class,'formationsParticipant']);
    Route::get('/rh/formation/{entreprise}',[FormationController::class,'formationsRH']);
    Route::get('/participant/formationTerminee/{user}',[FormationController::class,'formationsParticipantTerminee']);
    Route::get('/participant/seances/{user}',[FormationController::class,'SeancesParticipant']);
    Route::get('/formateur/seances/{user}',[SeanceController::class,'SeanceF']);
    Route::get('/formateur/seancesp/{user}',[SeanceController::class,'SeanceP']);
    Route::get('/sessionFormationEntreprise/seances/{sessionFormationEntreprise}',[SessionFormationEntrepriseController::class,'SeancesSession']);


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
        'pointages' => PointageController::class,
    ]);
    Route::get('/sessionFormationEntreprise/user/{sessionFormationEntreprise}',[SessionFormationEntrepriseController::class,'session']);
    Route::post('/sessionUsers/desaffecter',[SessionUserController::class,'desaffecter']);
    Route::put('/user/update/{user}',[UserController::class,'update']);
    Route::get('/user/participant',[UserController::class,'participant']);
    Route::post('/user/participant/create',[UserController::class,'storeParticipant']);
    Route::post('/user/formateur/create',[UserController::class,'storeFormateur']);
    Route::post('/user/rh/create',[UserController::class,'storeRH']);
    Route::get('/user/rh',[UserController::class,'rh']);
    Route::get('/user/formateur',[UserController::class,'formateur']);
    Route::delete('/user/{user}',[UserController::class,'destroy']);
    Route::post('/module/{module}', [ModuleController::class, 'update']);
    Route::post('/entreprise/{entreprise}', [EntrepriseController::class, 'update']);


    Route::put('/sessionFormationEntreprise/suspendreSession/{sessionFormationEntreprise}',[SessionFormationEntrepriseController::class,'suspendreSession']);
    Route::put('/sessionFormationEntreprise/annulerSession/{sessionFormationEntreprise}',[SessionFormationEntrepriseController::class,'annulerSession']);
    Route::put('/sessionFormationEntreprise/activerSession/{sessionFormationEntreprise}',[SessionFormationEntrepriseController::class,'activerSession']);
    Route::get('/entreprise/participants/{entreprise}', [EntrepriseController::class, 'participants']);

    Route::post('/attestation', AttestationController::class);
});

Route::post('/forgot-password', [PasswordResetLinkController::class, 'store']);
Route::post('/reset-password', [NewPasswordController::class, 'store']);
Route::get('/planning/{sessionFormationEntreprise}', PlanningController::class);
Route::get('/participant/{sessionFormationEntreprise}', ListeParticipantController::class);
Route::get('/presence/{seance}', ListePresenceController::class);
Route::get('/attestation/{user}', AttestationController::class);

Route::put('/sessionFormationEntreprise/suspendreSession/{sessionFormationEntreprise}',[SessionFormationEntrepriseController::class,'suspendreSession']);
Route::put('/sessionFormationEntreprise/annulerSession/{sessionFormationEntreprise}',[SessionFormationEntrepriseController::class,'annulerSession']);
Route::put('/sessionFormationEntreprise/activerSession/{sessionFormationEntreprise}',[SessionFormationEntrepriseController::class,'activerSession']);

Route::get('/sessionFormationEntreprise/seances/{sessionFormationEntreprise}',[SessionFormationEntrepriseController::class,'SeancesSession']);