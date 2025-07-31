<?php

namespace App\Http\Controllers;

use App\Models\Module;
use App\Http\Requests\StoreModuleRequest;
use App\Http\Requests\UpdateModuleRequest;
use App\Http\Resources\ModuleResource;
use App\Models\File;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ModuleController extends Controller
{
    use AuthorizesRequests;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->authorize('viewAny',Module::class);
        return ModuleResource::collection(Module::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreModuleRequest $request)
    {
        $this->authorize('create', Module::class);
        $formFields = $request->validated();
        $module = DB::transaction(function () use ($request, $formFields) {

            $moduleData = collect($formFields)->except('files')->toArray();
            $module = Module::create($moduleData);
            if ($request->hasFile('files')) {
                foreach ($request->file('files') as $file) {
                    $path = $file->store('files', 'public');
                    $module->files()->create([
                        'file_path' => $path,
                        'file_nom' => $file->getClientOriginalName(),
                        'size' => $file->getSize(),
                    ]);
                }
            }

            return $module;
        });

        $response = new ModuleResource($module);
        return response()->json([
            'message'=>__('Le module a été créé avec succès.'),
            'module'=>$response,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Module $module)
    {
        $this->authorize('view', $module);
        return new ModuleResource($module);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateModuleRequest $request, Module $module)
    {
        $this->authorize('update', $module);
        $validatedData = $request->validated();
        DB::transaction(function () use ($module, $request, $validatedData) {
            $module->update(collect($validatedData)->except(['files', 'files_to_delete'])->toArray());
            if ($request->has('files_to_delete')) {
                $filesToDeleteIds = $request->input('files_to_delete');
                $files = File::whereIn('id', $filesToDeleteIds)->where('module_id', $module->id)->get();
                foreach ($files as $file) {
                    Storage::disk('public')->delete($file->file_path);
                    $file->delete();
                }
            }
            if ($request->hasFile('files')) {
                foreach ($request->file('files') as $file) {
                    $path = $file->store('files', 'public');
                    $module->files()->create([
                        'file_path' => $path,
                        'file_nom' => $file->getClientOriginalName(),
                        'size' => $file->getSize(),
                    ]);
                }
            }
        });
        return response()->json(['message' => 'Module mis à jour avec succès.', 'module' => $module->fresh()->load('files')]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Module $module)
    {
        $this->authorize('delete', $module);
        $files = $module->files;
        foreach($files as $file){
            Storage::disk('public')->delete($file->file_path);
            $file->delete();
        }
        $module->delete();
        return response()->json([
            'module' => $module,
            'message' => __('Le module a été supprimé avec succès.')
            ]); 
    }
}
