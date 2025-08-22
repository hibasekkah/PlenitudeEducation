<?php

namespace App\Http\Controllers;

use App\Models\Seance;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;

class ListePresenceController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Seance $seance)
    {
        $seance->load([
            'session.formation',
            'session.sessionUsers.user',
            'pointages',
            'module',
            'atelier',
        ]);

        $sessionUsers = $seance->session->sessionUsers;
        $formation = $seance->session->formation->intitule;

        $presenceMap = $seance->pointages->keyBy('user_id');

        $data = $sessionUsers->map(function ($sessionUser) use ($presenceMap) {
            $user = $sessionUser->user;
            $estPresent = $presenceMap->has($user->id);

            return [
                'nom' => $user->nom,
                'prenom' => $user->prenom,
                'email' => $user->email,
                'telephone' => $user->telephone,
                'presence' => $estPresent?'Présent(e)':'Absent(e)',
            ];
        });

        Pdf::setOption(['dpi' => 150, 'defaultFont' => 'sans-serif', 'default_paper_orientation' => 'landscape']);
        
        $pdf = PDF::loadView('presence.presence', [
            'data' => $data, 
            'formation' => $formation,
            'date' => $seance->date,
            'heure_debut' => $seance->heure_debut,
            'heure_fin' => $seance->heure_fin,
            'module' => $seance->module?->titre,
            'atelier' => $seance->atelier?->type,
        ]);

        return $pdf->download('presence.pdf');
    }
}
