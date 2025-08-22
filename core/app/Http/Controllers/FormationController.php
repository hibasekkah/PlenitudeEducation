<?php

namespace App\Http\Controllers;

use App\Models\Formation;
use App\Http\Requests\StoreFormationRequest;
use App\Http\Requests\UpdateFormationRequest;
use App\Http\Resources\FormationResource;
use App\Http\Resources\SeanceResource;
use App\Http\Resources\SessionFormationEntrepriseResource;
use App\Models\Entreprise;
use App\Models\Seance;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;

class FormationController extends Controller
{
    use AuthorizesRequests;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->authorize('viewAny',Formation::class);
        return FormationResource::collection(Formation::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFormationRequest $request)
    {
        $this->authorize('create', Formation::class);
        $formFields = $request ->validated();
        $formation = Formation::create($formFields);
        $response = new FormationResource($formation);
        return response()->json([
            'formation' => $response,
            'message' => __('La formation a été créée avec succès.')
            ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Formation $formation)
    {
        $this->authorize('view', $formation);
        return new FormationResource($formation); 
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateFormationRequest $request, Formation $formation)
    {
        $this->authorize('update', $formation);
        $formation->update($request->validated());
        return response()->json([
            'entreprise' => new FormationResource($formation),
            'message' => __('La formation a été mise à jour avec succès.')
            ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Formation $formation)
    {
        $this->authorize('delete', $formation);
        $modules = $formation->modules;
        foreach($modules as $module){
            $module->delete();
        }
        $aletiers = $formation->ateliers;
        foreach($aletiers as $aletier){
            $aletier->delete();
        }
        $formation->delete();
        return response()->json([
            'formation' => $formation,
            'message' => __('La formation a été supprimée avec succès.')
            ]); 
    }

    public function formationsParticipant(User $user){

        $user->load(['sessionsUser.session' => function ($query) {
            $query->where('etat', 'active');
        }]);

        $activeSessions = $user->sessionsUser->filter(function ($sessionUser) {
            return $sessionUser->session !== null;
        })->map(function ($sessionUser) {
            return $sessionUser->session;
        })->unique('id');
        return SessionFormationEntrepriseResource::collection($activeSessions);
    }

    public function formationsParticipantTerminee(User $user){

        $user->load(['sessionsUser.session' => function ($query) {
            $query->where('etat', 'active')->where('date_fin','<', Carbon::now())->with('formation');
        }]);

        $activeSessions = $user->sessionsUser->filter(function ($sessionUser) {
            return $sessionUser->session !== null;
        })->map(function ($sessionUser) {
            return $sessionUser->session;
        });
        return SessionFormationEntrepriseResource::collection($activeSessions);
    }

    public function SeancesParticipant(User $user)
    {
        $sessionIds = $user->sessionsUser()->pluck('session_id')->unique();
        //dd($sessionIds->toArray()); 
        $seancesQuery = Seance::whereIn('session_id', $sessionIds)
                              ->with([
                                  'module', 
                                  'atelier', 
                                  'formateur',
                                  'pointages' => function ($query) use ($user) {
                                      $query->where('user_id', $user->id);
                                  }
                              ])
                              ->orderBy('date')
                              ->orderBy('heure_debut');

        $seancesDuJour = (clone $seancesQuery)->whereDate('date', Carbon::today())->get();
        //dd($seancesDuJour->toArray());
        $seancesPassees = (clone $seancesQuery)->whereDate('date', '<', Carbon::today())->get();
        $seancesAvenir = (clone $seancesQuery)->whereDate('date', '>', Carbon::today())->get();

        return response()->json([
            'seances_du_jour' => SeanceResource::collection($seancesDuJour),
            'seances_passees' => SeanceResource::collection($seancesPassees),
            'seances_avenir' => SeanceResource::collection($seancesAvenir),
        ]);
        
        
        
    }

    public function formationsRH(Entreprise $entreprise){
        $sessions = $entreprise->sessions;
        return SessionFormationEntrepriseResource::collection($sessions);
    }


}
