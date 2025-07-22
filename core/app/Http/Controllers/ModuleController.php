<?php

namespace App\Http\Controllers;

use App\Models\Module;
use App\Http\Requests\StoreModuleRequest;
use App\Http\Requests\UpdateModuleRequest;
use App\Http\Resources\ModuleResource;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class ModuleController extends Controller
{
    use AuthorizesRequests;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->authorize('viewAny');
        return ModuleResource::collection(Module::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreModuleRequest $request)
    {
        $this->authorize('create');
        $formFields = $request->validated();
        $response = Module::create($formFields);
        $module = new ModuleResource($response);
        return response()->json([
            'message'=>__('module created successfully'),
            'module'=>$module,
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
        $formFields =$request->validated();
        $module->update($formFields);
        return response()->json([
            'module' => new ModuleResource($module),
            'message' => __('module updated successfully')
            ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Module $module)
    {
        $this->authorize('delete', $module);
        $module->delete();
        return response()->json([
            'module' => $module,
            'message' => __('module deleted successfully')
            ]); 
    }
}
