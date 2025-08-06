<?php

namespace App\Http\Controllers;

use App\Models\Entreprise;
use App\Http\Requests\StoreEntrepriseRequest;
use App\Http\Requests\UpdateEntrepriseRequest;
use App\Http\Resources\EntrepriseResource;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\DB;
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
        
        $formFields = $request->validated();
        
        $entreprise = DB::transaction(function () use ($request, $formFields) {

            $entrepriseData = collect($formFields)->except('files')->toArray();

            $fileFields = ['doc_rc', 'doc_status', 'doc_pv', 'CIN_gerant'];
        
            foreach ($fileFields as $field) {
                if ($request->hasFile($field)) {
                    $path = $request->file($field)->store('entreprise_docs', 'public');
                    $entrepriseData[$field] = $path;
                }
            }
            $entreprise = Entreprise::create($entrepriseData);
            if ($request->hasFile('files')) {
                foreach ($request->file('files') as $file) {
                    $path = $file->store('entreprise_docs', 'public');
                    $entreprise->files()->create([
                        'file_path' => $path,
                        'file_nom' => $file->getClientOriginalName(),
                        'size' => $file->getSize(),
                    ]);
                }
            }
  
            return $entreprise;
        });

        
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
        $this->authorize('view', $entreprise);
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

        $entreprise = DB::transaction(function () use ($request, $validatedData, $entreprise) {
            
            $updateData = collect($validatedData)->except([
                'doc_rc', 'doc_status', 'doc_pv', 'CIN_gerant', 'files', 'files_to_delete'
            ])->toArray();

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

            $updated = $entreprise->update($updateData);
            logger('Update status:', ['success' => $updated]);

            if ($request->has('files_to_delete') && is_array($request->files_to_delete)) {
                foreach ($request->files_to_delete as $fileId) {
                    $fileToDelete = $entreprise->files()->find($fileId);
                    if ($fileToDelete) {
                        if (Storage::disk('public')->exists($fileToDelete->file_path)) {
                            Storage::disk('public')->delete($fileToDelete->file_path);
                        }
                        $fileToDelete->delete();
                        logger('Fichier supprimé:', ['id' => $fileId, 'path' => $fileToDelete->file_path]);
                    }
                }
            }

            if ($request->hasFile('files')) {
                foreach ($request->file('files') as $file) {
                    $path = $file->store('entreprise_docs', 'public');
                    $entreprise->files()->create([
                        'file_path' => $path,
                        'file_nom' => $file->getClientOriginalName(),
                        'size' => $file->getSize(),
                    ]);
                    logger('Nouveau fichier ajouté:', [
                        'name' => $file->getClientOriginalName(),
                        'path' => $path,
                        'size' => $file->getSize()
                    ]);
                }
            }

            return $entreprise;
        });
        
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
