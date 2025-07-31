<?php

namespace App\Http\Controllers;

use App\Models\Entreprise;
use App\Http\Requests\StoreEntrepriseRequest;
use App\Http\Requests\UpdateEntrepriseRequest;
use App\Http\Resources\EntrepriseResource;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class EntrepriseController extends Controller
{
    use AuthorizesRequests;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->authorize('viewAny', Entreprise::class);
        return EntrepriseResource::collection(Entreprise::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEntrepriseRequest $request)
    {
        $this->authorize('create', Entreprise::class);
        $formFields = $request->validated();
        $entreprise = Entreprise::create($formFields);
        $response = new EntrepriseResource($entreprise);
        return response()->json([
            'entreprise' => $response,
            'message' => __("L'entreprise a été créée avec succès.")
            ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Entreprise $entreprise)
    {
        $this->authorize('view', $entreprise);
        return new EntrepriseResource($entreprise);   
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEntrepriseRequest $request, Entreprise $entreprise)
    {
        $this->authorize('update', $entreprise);
        $formFields =$request->validated();
        $entreprise->update($formFields);
        return response()->json([
            'entreprise' => new EntrepriseResource($entreprise),
            'message' => __("L'entreprise a été mise à jour avec succès.")
            ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Entreprise $entreprise)
    {
        $this->authorize('delete', $entreprise);
        $employes = $entreprise->employees;
        foreach($employes as $employee){
            $employee->delete();
        }
        $entreprise->delete();
        return response()->json([
            'entreprise' => $entreprise,
            'message' => __("L'entreprise a été supprimée avec succès.")
            ]); 
    }
}
