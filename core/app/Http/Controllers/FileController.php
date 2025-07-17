<?php

namespace App\Http\Controllers;

use App\Models\File;
use App\Http\Requests\StoreFileRequest;
use App\Http\Requests\UpdateFileRequest;
use App\Http\Resources\FileResource;
use Illuminate\Support\Facades\Storage;

class FileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return FileResource::collection(File::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFileRequest $request)
    {
        $formFields = $request->validated();
        
        if($request->hasFile('file_path')){
            $path = $request->file('file_path')->store('files', 'public');
            $file['file_path'] = $path;
        }
        $file= File::create($formFields);
        $response = new FileResource($file);
        return response()->json([
            'file' => $response,
            'message' => __('file created successfully')
            ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(File $file)
    {
        return new FileResource($file);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateFileRequest $request, File $file)
    {
        $formFields = $request->validated();
        
        if($request->hasFile('file_path')){
            if ($file->file_path) {
                if (Storage::disk('public')->exists($file->file_path)) {
                    Storage::disk('public')->delete($file->file_path);
                }
            }
            $path = $request->file('file_path')->store('files', 'public');
            $file['file_path'] = $path;
        }
        $file->update($formFields);
        $response = new FileResource($file);
        return response()->json([
            'file' => $response,
            'message' => __('file updated successfully')
            ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(File $file)
    {
        if($file->hasFile('file_path')){
            if ($file->file_path) {
                if (Storage::disk('public')->exists($file->file_path)) {
                    Storage::disk('public')->delete($file->file_path);
                }
            }
        }
        $file->delete();
        return response()->json([
            'file' => $file,
            'message' => __('file deleted successfully')
            ]);
    }
}
