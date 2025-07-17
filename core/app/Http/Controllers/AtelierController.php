<?php

namespace App\Http\Controllers;

use App\Models\Atelier;
use App\Http\Requests\StoreAtelierRequest;
use App\Http\Requests\UpdateAtelierRequest;
use App\Http\Resources\AtelierResource;

class AtelierController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return AtelierResource::collection(Atelier::all());

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAtelierRequest $request)
    {
        $formFields = $request ->validated();
        $atelier = Atelier::create($formFields);
        $response = new AtelierResource($atelier);
        return response()->json([
            'atelier' => $response,
            'message' => __('atelier created successfully')
            ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Atelier $atelier)
    {
        return new AtelierResource($atelier);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAtelierRequest $request, Atelier $atelier)
    {
        $formFields =$request->validated();
        $atelier->update($formFields);
        return response()->json([
            'atelier' => new AtelierResource($atelier),
            'message' => __('atelier updated successfully')
            ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Atelier $atelier)
    {
        $atelier->delete();
        return response()->json([
            'atelier' => $atelier,
            'message' => __('atelier deleted successfully')
            ]); 
    }
}
