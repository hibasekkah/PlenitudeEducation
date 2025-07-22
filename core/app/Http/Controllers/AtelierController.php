<?php

namespace App\Http\Controllers;

use App\Models\Atelier;
use App\Http\Requests\StoreAtelierRequest;
use App\Http\Requests\UpdateAtelierRequest;
use App\Http\Resources\AtelierResource;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class AtelierController extends Controller
{
    use AuthorizesRequests;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->authorize('viewAny');
        return AtelierResource::collection(Atelier::all());

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAtelierRequest $request)
    {
        $this->authorize('create');
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
        $this->authorize('view', $atelier);
        return new AtelierResource($atelier);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAtelierRequest $request, Atelier $atelier)
    {
        $this->authorize('update', $atelier);
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
        $this->authorize('delete', $atelier);
        $this->authorize('delete', $atelier);
        $atelier->delete();
        return response()->json([
            'atelier' => $atelier,
            'message' => __('atelier deleted successfully')
            ]); 
    }
}
