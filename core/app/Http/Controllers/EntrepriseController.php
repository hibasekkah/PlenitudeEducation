<?php

namespace App\Http\Controllers;

use App\Models\Entreprise;
use App\Http\Requests\StoreEntrepriseRequest;
use App\Http\Requests\UpdateEntrepriseRequest;
use App\Http\Resources\EntrepriseResource;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Storage;

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
        
        $validatedData = $request->validated();

        $fileFields = ['doc_rc', 'doc_status', 'doc_pv', 'CIN_gerant'];
        
        foreach ($fileFields as $field) {
            if ($request->hasFile($field)) {
                $path = $request->file($field)->store('entreprise_docs', 'public');
                $validatedData[$field] = $path;
            }
        }

        $entreprise = Entreprise::create($validatedData);
        
        return response()->json([
            'entreprise' => new EntrepriseResource($entreprise),
            'message' => __("L'entreprise a été créée avec succès.")
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Entreprise $entreprise)
    {
        $this->authorize('view', $entreprise);
        return new EntrepriseResource($entreprise);   
    }


    public function participants(Entreprise $entreprise)
    {
        //$this->authorize('view', $entreprise);
        $participant = User::where('entreprise_id',$entreprise->id)
                            ->where('role', 'participant')
                            ->get();
        return UserResource::collection($participant);   
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEntrepriseRequest $request, Entreprise $entreprise)
    {
        $this->authorize('update', $entreprise);
        $validatedData = $request->validated();
        logger('Contenu de $validatedData', $validatedData);

        $updateData = collect($validatedData)->except(['doc_rc', 'doc_status', 'doc_pv', 'CIN_gerant'])->toArray();

        $fileFieldsToProcess = ['doc_rc', 'doc_status', 'doc_pv', 'CIN_gerant'];
        foreach ($fileFieldsToProcess as $field) {
            if ($request->hasFile($field)) {
                if ($entreprise->$field && Storage::disk('public')->exists($entreprise->$field)) {
                    Storage::disk('public')->delete($entreprise->$field);
                }
                $path = $request->file($field)->store('entreprise_docs', 'public');
                $updateData[$field] = $path;
            }
        }

        $updated =$entreprise->update($updateData);
        logger('Update status:', ['success' => $updated]);
        
        return response()->json([
            'entreprise' => new EntrepriseResource($entreprise->fresh()),
            'message' => __("L'entreprise a été mise à jour avec succès.")
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Entreprise $entreprise)
    {
        $this->authorize('delete', $entreprise);
        
        $fileFields = ['doc_rc', 'doc_status', 'doc_pv', 'CIN_gerant'];
        foreach ($fileFields as $field) {
            if ($entreprise->$field && Storage::disk('public')->exists($entreprise->$field)) {
                Storage::disk('public')->delete($entreprise->$field);
            }
        }
        
        $entreprise->delete();
        
        return response()->json(null, 204);
    }
}
