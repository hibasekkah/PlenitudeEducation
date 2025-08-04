<?php

namespace App\Http\Controllers;

use App\Models\SessionFormationEntreprise;
use App\Http\Requests\StoreSessionFormationEntrepriseRequest;
use App\Http\Requests\UpdateSessionFormationEntrepriseRequest;
use App\Http\Resources\SessionFormationEntrepriseResource;
use Illuminate\Http\Request;

class SessionFormationEntrepriseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return SessionFormationEntrepriseResource::collection(SessionFormationEntreprise::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSessionFormationEntrepriseRequest $request)
    {
        
        $formfields = $request->validated();
        $session = SessionFormationEntreprise::create($formfields);
        $response = new SessionFormationEntrepriseResource($session);
        return response()->json([
            'session'=>$response,
            'message'=>__('La session a été créée avec succès.')
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(SessionFormationEntreprise $sessionFormationEntreprise)
    {
         return response()->json([
            'session'=>$sessionFormationEntreprise->id,
            'message'=>__('La session a été créée avec succès.')
        ]); 
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSessionFormationEntrepriseRequest $request, SessionFormationEntreprise $sessionFormationEntreprise)
    {
        $formfields = $request->validated();
        //dd($formfields);
        $sessionFormationEntreprise->update($formfields);
        //$response = new SessionFormationEntrepriseResource($sessionFormationEntreprise);
        return response()->json([
            'session'=>$sessionFormationEntreprise,
            'message'=>__('La session a été mise à jour avec succès.')
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SessionFormationEntreprise $sessionFormationEntreprise)
    {
        $sessionFormationEntreprise->delete();
        return response()->json([
            'sessionFormationEntreprise' => $sessionFormationEntreprise,
            'message' => __('La session a été supprimée avec succès.')
            ]); 
    }

    public function suspendreSession(Request $request, SessionFormationEntreprise $sessionFormationEntreprise)
    {
        $formfields = $request->validate([
            'raison_sus'=>'required'
        ]);
        $formfields['etat']='suspendue';
        $sessionFormationEntreprise->update($formfields);
        return response()->json([
            'session'=>$sessionFormationEntreprise,
            'message'=>__('La session a été suspendue avec succès.')
        ]);
    }

    public function annulerSession(Request $request, SessionFormationEntreprise $sessionFormationEntreprise)
    {
        $formfields = $request->validate([
            'raison_annulation'=>'required'
        ]);
        $formfields['etat']='annuler';
        $sessionFormationEntreprise->update($formfields);
        return response()->json([
            'session'=>$sessionFormationEntreprise,
            'message'=>__('La session a été annulée avec succès.')
        ]);
    }

    public function activerSession(SessionFormationEntreprise $sessionFormationEntreprise)
    {
        $formfields['etat']='active';
        $sessionFormationEntreprise->update($formfields);
        return response()->json([
            'session'=>$sessionFormationEntreprise,
            'message'=>__('La session a été réactivée avec succès.')
        ]);
    }


}
