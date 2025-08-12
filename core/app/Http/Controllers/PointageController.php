<?php

namespace App\Http\Controllers;

use App\Models\Pointage;
use App\Http\Requests\StorePointageRequest;
use App\Http\Requests\UpdatePointageRequest;
use App\Http\Resources\PointageResource;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class PointageController extends Controller
{
    use AuthorizesRequests;
    
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePointageRequest $request)
    {
        $this->authorize('create', Pointage::class);
        $fieldform = $request->validated();
        $pointage = Pointage::create($fieldform);
        $response = new PointageResource($pointage);

        return response()->json([
            'message' => 'succès !',
            'pointage' => $response
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Pointage $pointage)
    {
        $this->authorize('view', $pointage);
        $response = new PointageResource($pointage);
        return response()->json([
            'pointage' => $response
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePointageRequest $request, Pointage $pointage)
    {
        $this->authorize('update', $pointage);
        $fieldform = $request->validated();
        $pointage->update($fieldform);
        $response = new PointageResource($pointage);

        return response()->json([
            'message' => 'succès !',
            'pointage' => $response
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pointage $pointage)
    {
        //
    }
}
