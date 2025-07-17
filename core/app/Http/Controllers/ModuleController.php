<?php

namespace App\Http\Controllers;

use App\Models\Module;
use App\Http\Requests\StoreModuleRequest;
use App\Http\Requests\UpdateModuleRequest;
use App\Http\Resources\ModuleResource;

class ModuleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ModuleResource::collection(Module::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreModuleRequest $request)
    {
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
        return new ModuleResource($module);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateModuleRequest $request, Module $module)
    {
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
        $module->delete();
        return response()->json([
            'module' => $module,
            'message' => __('module deleted successfully')
            ]); 
    }
}
