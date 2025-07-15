<?php

namespace App\Http\Controllers;

use App\Models\Entreprise;
use App\Http\Requests\StoreEntrepriseRequest;
use App\Http\Requests\UpdateEntrepriseRequest;
use App\Http\Resources\EntrepriseResource;

class EntrepriseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return EntrepriseResource::collection(Entreprise::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEntrepriseRequest $request)
    {
        $formFields = $request ->validated();
        $entreprise = Entreprise::create($formFields);
        $response = new EntrepriseResource($entreprise);
        return response()->json([
            'entreprise' => $response,
            'message' => __('entreprise created successfully')
            ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Entreprise $entreprise)
    {
        return new EntrepriseResource($entreprise);   
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEntrepriseRequest $request, Entreprise $entreprise)
    {
        dd($request->all());
        $entreprise->update($request->validated());
        return response()->json([
            'entreprise' => new EntrepriseResource($entreprise),
            'message' => __('entreprise updated successfully')
            ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Entreprise $entreprise)
    {
        $entreprise->delete();
        return response()->json([
            'entreprise' => $entreprise,
            'message' => __('entreprise deleted successfully')
            ]); 
    }
}
