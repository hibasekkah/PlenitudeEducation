<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;


class AttestationController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, User $user)
    {
        
        $data = [
        'name' => $user->name . ' ' . $user->prenom,
        'date' => '2000000',
        //'formation' => $request->formation,
        ];

        Pdf::setOptions([
            'dpi' => 150,
            'defaultFont' => 'sans-serif',
            'orientation' => 'landscape', 
        ]);
        $pdf = PDF::loadView('attestation.attestation', $data)->setPaper('a4', 'landscape');;
        return $pdf->download('attestation.pdf');
    }
}
