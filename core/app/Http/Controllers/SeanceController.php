<?php

namespace App\Http\Controllers;

use App\Models\Seance;
use App\Http\Requests\StoreSeanceRequest;
use App\Http\Requests\UpdateSeanceRequest;
use App\Http\Resources\SeanceResource;

class SeanceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return SeanceResource::collection(Seance::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSeanceRequest $request)
    {
        $formfields = $request->validated();
        $seance = Seance::create($formfields);
        $response  = new SeanceResource($seance);
        return response()->json([
            'message'=>__('seance created successfully'),
            'seance'=>$response
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Seance $seance)
    {
        return new SeanceResource($seance);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSeanceRequest $request, Seance $seance)
    {
        $formfields = $request->validated();
        $seance->update($formfields);
        $response  = new SeanceResource($seance);
        return response()->json([
            'message' => __('seance updated successfully'),
            'seance' => $response
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Seance $seance)
    {
        $seance->delete();
        return response()->json([
            'message' => __('seance deleted successfully'),
            'seance' => $seance
        ]);
    }
}
