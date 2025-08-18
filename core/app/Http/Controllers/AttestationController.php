<?php

namespace App\Http\Controllers;

use App\Models\SessionFormationEntreprise;
use App\Models\User;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;

class AttestationController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, User $user)
    {
        // Validation du session_id
        $validated = $request->validate([
            'session_id' => 'required|integer|exists:session_formation_entreprises,id'
        ]);

        $session = SessionFormationEntreprise::with('formation')
            ->where('id', $validated['session_id'])
            ->firstOrFail();
        
        $data = [
            'name' => trim(($user->nom ?? '') . ' ' . ($user->prenom ?? '')),
            'date' => date('d/m/Y'),
            'date_debut' => Carbon::parse($session->date_debut)->format('d-m-Y'),
            'date_fin' => Carbon::parse($session->date_fin)->format('d-m-Y'),
            'formation' => $session->formation->intitule 
        ];

        Pdf::setOptions([
            'dpi' => 300,
            'defaultFont' => 'DejaVu Sans',
            'orientation' => 'landscape',
            'isHtml5ParserEnabled' => true,
            'isRemoteEnabled' => true,
        ]);
        
        $pdf = PDF::loadView('attestation.attestation', $data)
                  ->setPaper('a4', 'landscape');
        
        $filename = 'attestation_' . str_replace(' ', '_', strtolower($user->name)) . '_' . date('Y-m-d') . '.pdf';
        
        return $pdf->download($filename);
    }
}