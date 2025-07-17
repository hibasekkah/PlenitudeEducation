<?php

namespace App\Http\Controllers;

use App\Models\SessionFormationEntreprise;
use App\Http\Requests\StoreSessionFormationEntrepriseRequest;
use App\Http\Requests\UpdateSessionFormationEntrepriseRequest;
use App\Http\Resources\Session_FormationResource;

class SessionFormationEntrepriseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Session_FormationResource::collection(SessionFormationEntreprise::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSessionFormationEntrepriseRequest $request)
    {
        $formfields = $request->validated();
        $session = SessionFormationEntreprise::create($formfields);
        $response = new Session_FormationResource($session);
        return response()->json([
            'session'=>$response,
            'message'=>__('sessionFormationEntreprise created successfully')
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(SessionFormationEntreprise $sessionFormationEntreprise)
    {
        return new Session_FormationResource($sessionFormationEntreprise); 
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSessionFormationEntrepriseRequest $request, SessionFormationEntreprise $sessionFormationEntreprise)
    {
        $formfields = $request->validated();
        $sessionFormationEntreprise->update($formfields);
        $response = new Session_FormationResource($sessionFormationEntreprise);
        return response()->json([
            'session'=>$response,
            'message'=>__('sessionFormationEntreprise updated successfully')
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
            'message' => __('sessionFormationEntreprise deleted successfully')
            ]); 
    }
}
