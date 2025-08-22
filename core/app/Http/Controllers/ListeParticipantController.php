<?php

namespace App\Http\Controllers;

use App\Models\SessionFormationEntreprise;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;

class ListeParticipantController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(SessionFormationEntreprise $sessionFormationEntreprise)
    {
        $sessionUsers = $sessionFormationEntreprise->sessionUsers;
        $formation = $sessionFormationEntreprise->formation->intitule;
        $data = $sessionUsers->map(function ($sessionUser) {
            return [
            'nom'=>$sessionUser->user->nom,
            'prenom'=>$sessionUser->user->prenom,
            'email'=>$sessionUser->user->email,
            'telephone'=>$sessionUser->user->telephone,
            'fonction'=>$sessionUser->user->specialite_fonction,
            'statut'=>$sessionUser->user->statut, ];
        });

        Pdf::setOption(['dpi' => 150, 'defaultFont' => 'sans-serif','default_paper_orientation' => 'paysage']);
        $pdf = PDF::loadView('participants.participant', [
            'data' => $data, 
            'formation' => $formation
        ]);
        return $pdf->download('participant.pdf');
    }
}
