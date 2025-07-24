<?php

namespace App\Http\Controllers;

use App\Models\Formation;
use App\Http\Requests\StoreFormationRequest;
use App\Http\Requests\UpdateFormationRequest;
use App\Http\Resources\FormationResource;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class FormationController extends Controller
{
    use AuthorizesRequests;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->authorize('viewAny',Formation::class);
        return FormationResource::collection(Formation::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFormationRequest $request)
    {
        $this->authorize('create', Formation::class);
        $formFields = $request ->validated();
        $formation = Formation::create($formFields);
        $response = new FormationResource($formation);
        return response()->json([
            'formation' => $response,
            'message' => __('formation created successfully')
            ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Formation $formation)
    {
        $this->authorize('view', $formation);
        return new FormationResource($formation); 
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateFormationRequest $request, Formation $formation)
    {
        $this->authorize('update', $formation);
        $formation->update($request->validated());
        return response()->json([
            'entreprise' => new FormationResource($formation),
            'message' => __('formation updated successfully')
            ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Formation $formation)
    {
        $this->authorize('delete', $formation);
        $formation->delete();
        return response()->json([
            'entreprise' => $formation,
            'message' => __('formation deleted successfully')
            ]); 
    }
}
