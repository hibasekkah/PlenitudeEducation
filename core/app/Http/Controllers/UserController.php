<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules\Password;

class UserController extends Controller
{
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
    public function store(StoreUserRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        //dd($request->validated());
        $formFields = $request->validate([
            'nom' => 'sometimes|required',
            'prenom' => 'sometimes|required',
            'telephone' => 'sometimes|required',
            'photo_profile' => 'sometimes|required|image|mimes:jpeg,png,jpg,gif',
            'specialite_fonction' => 'sometimes|required',
            'entreprise_id'=>'sometimes|required',
        ]);
        
        if($request->hasFile('photo_profile')){
            if ($user->photo_profile) {
                if (Storage::disk('public')->exists($user->photo_profile)) {
                    Storage::disk('public')->delete($user->photo_profile);
                }
            }
            $path = $request->file('photo_profile')->store('profile_pictures', 'public');
            $formFields['photo_profile'] = $path;
        }
        //dd($formFields);
        $user->update($formFields);
        $response = new UserResource($user);
        return response()->json([
            'user' => $response,
            'message' => __('user updated successfully')
            ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();
        return response()->json([
            'entreprise' => $user,
            'message' => __('user deleted successfully')
            ]); 
    }

    public function updatePassword(Request $request){

        $user=$request->user();
        $request->validate([
            'current_password'=>['required','string'],
            'new_password'=>['required','string','confirmed', Password::min(8)],
        ]);

        if(!Hash::check($request->current_password,$user->password)){

            return response()->json([
                'message' => 'The provided password does not match your current password.',
                'errors' => [
                    'current_password' => ['The provided password does not match your current password.']
                ]
            ], 422);
        }

        $user->update([
            'password' => Hash::make($request->new_password),
        ]);

        return response()->json([
            'message' => 'Password updated successfully.',
        ]);

    }
    public function updatePhoto(Request $request){

        $user=$request->user();

        $formFields = $request->validate([
            'photo_profile' => 'required|image|mimes:jpeg,png,jpg,gif',
        ]);

        if($request->hasFile('photo_profile')){
            if ($user->photo_profile) {
                if (Storage::disk('public')->exists($user->photo_profile)) {
                    Storage::disk('public')->delete($user->photo_profile);
                }
            }
            $path = $request->file('photo_profile')->store('profile_pictures', 'public');
            $formFields['photo_profile'] = $path;
        }
        $user->update($formFields);
        $response = new UserResource($user);
        return response()->json([
            'user' => $response,
            'message' => __('user updated successfully')
            ]);

    }
}
