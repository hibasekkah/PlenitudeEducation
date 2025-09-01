<?php

namespace App\Http\Controllers;

use App\Models\Seance;
use App\Http\Requests\StoreSeanceRequest;
use App\Http\Requests\UpdateSeanceRequest;
use App\Http\Resources\SeanceResource;
use App\Mail\SeanceMiseAJourMail;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Mail;

class SeanceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return SeanceResource::collection(Seance::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSeanceRequest $request)
    {
        $formfields = $request->validated();
        $seance = Seance::create($formfields);
        $response  = new SeanceResource($seance);
        return response()->json([
            'message'=>__('La séance a été créée avec succès.'),
            'seance'=>$response
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Seance $seance)
    {
        return new SeanceResource($seance);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSeanceRequest $request, Seance $seance)
    {
        $formfields = $request->validated();
        $seance->update($formfields);

        $seance->load(['session.sessionUsers.user', 'module', 'formateur']);
        
        $session = $seance->session;
        $participants = $session->sessionUsers;

        if ($participants->isNotEmpty()) {
            foreach ($participants as $participant) {
                $user = $participant->user;
                
                if ($user && $user->email) {
                    Mail::to($user->email)->send(new SeanceMiseAJourMail($seance, $session, $user));
                }
            }
        }

        $response = new SeanceResource($seance);

        return response()->json([
            'message' => __('La séance a été mise à jour avec succès. Les participants ont été notifiés.'),
            'seance' => $response
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Seance $seance)
    {
        $seance->delete();
        return response()->json([
            'message' => __('La séance a été supprimée avec succès.'),
            'seance' => $seance
        ]);
    }

    public function SeanceF(User $user) {
        $now = Carbon::now();
        
        $seances = $user->seances->filter(function($seance) use ($now) {
            try {
                // Parser correctement la date et l'heure de fin
                $seanceDate = Carbon::parse($seance->date)->format('Y-m-d');
                $heureFinFormatted = strlen($seance->heure_fin) === 5 ? $seance->heure_fin . ':00' : $seance->heure_fin;
                $seanceEndDateTime = Carbon::parse($seanceDate . ' ' . $heureFinFormatted);
                
                return $seanceEndDateTime > $now;
            } catch (\Exception $e) {
            
                return false;
            }
        });
        
        return SeanceResource::collection($seances);
    }

    // Méthode pour les séances passées (terminées)
    public function SeanceP(User $user) {
        $now = Carbon::now();
        
        $seances = $user->seances->filter(function($seance) use ($now) {
            try {
                // Parser correctement la date et l'heure de fin
                $seanceDate = Carbon::parse($seance->date)->format('Y-m-d');
                $heureFinFormatted = strlen($seance->heure_fin) === 5 ? $seance->heure_fin . ':00' : $seance->heure_fin;
                $seanceEndDateTime = Carbon::parse($seanceDate . ' ' . $heureFinFormatted);
                
                return $seanceEndDateTime <= $now;
            } catch (\Exception $e) {
                
                return false;
            }
        });
        
        return SeanceResource::collection($seances);
    }

}
