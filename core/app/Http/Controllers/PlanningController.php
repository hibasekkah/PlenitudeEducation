<?php

namespace App\Http\Controllers;

use App\Models\Formation;
use App\Models\SessionFormationEntreprise;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;


class PlanningController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(SessionFormationEntreprise $sessionFormationEntreprise)
    {
        $seances = $sessionFormationEntreprise->Seances;
        $formation = $sessionFormationEntreprise->formation->intitule;
        $data = $seances->map(function ($seance) {
            return [
            'date'=>$seance->date,
            'heure_debut'=>$seance->heure_debut,
            'heure_fin'=>$seance->heure_fin,
            'Observations'=>$seance->Observations,
            'formateur'=>$seance->formateur->nom . ' ' . $seance->formateur->prenom,
            'module'=>$seance->module?->titre,
            'atelier'=>$seance->atelier?->type,];
        });
        Pdf::setOption(['dpi' => 150, 'defaultFont' => 'sans-serif','default_paper_orientation' => 'paysage']);
        $pdf = PDF::loadView('planning.planning', [
            'seances' => $data, 
            'formation' => $formation
        ]);
        return $pdf->download('planning.pdf');
    }
}
