<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Requests\StoreUserRequest;
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
        $formFields = $request->validate([
            'email' => 'sometimes',
            'nom' => 'sometimes',
            'prenom' => 'sometimes',
            'telephone' => 'sometimes',
            'statut' => 'sometimes',
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
        $user->update($formFields);
        $response = new UserResource($user);
        return response()->json([
            'user' => $response,
            'message' => __("L'utilisateur a été mis à jour avec succès.")
            ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();
        return response()->json([
            'user' => $user,
            'message' => __("L'utilisateur a été supprimé avec succès.")
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
                'message' => 'Le mot de passe fourni ne correspond pas à votre mot de passe actuel.',
                'errors' => [
                    'current_password' => ['Le mot de passe fourni ne correspond pas à votre mot de passe actuel.']
                ]
            ], 422);
        }

        $user->update([
            'password' => Hash::make($request->new_password),
        ]);

        return response()->json([
            'message' => 'Mot de passe mis à jour avec succès.',
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
            'message' => __("L'utilisateur a été mis à jour avec succès.")
            ]);

    }

    public function participant(){
        $Participants = User::where('role','participant')->get();
        return UserResource::collection($Participants);
    }

    public function rh(){
        $rh = User::where('role','rh')->get();
        return UserResource::collection($rh);
    }

    public function formateur(){
        $formateur = User::where('role','formateur')->get();
        return UserResource::collection($formateur);
    }


    public function storeParticipant(StoreUserRequest $request)
    {
        $request->validate([
            'nom' => 'required|string',
            'prenom' => 'required|string',            
            'email' => 'required|email|unique:users,email',
            'telephone' => 'required',
            'statut' => 'required',
            'photo_profile' => 'image|mimes:jpeg,png,jpg,gif',
            'specialite_fonction' => 'sometimes',
            'password' => 'required|string|min:8',
            'entreprise_id'=>'required|exists:entreprises,id',
        ]);

        $userData = [
            'nom' => $request->nom,
            'prenom' => $request->prenom,
            'email' => $request->email,
            'statut' => $request->statut,
            'telephone' => $request->telephone,
            'specialite_fonction' => $request->specialite_fonction,
            'password' => Hash::make($request->password),
            'role' => 'participant',
            'statut' => $request->statut,
            'entreprise_id'=>$request->entreprise_id,
        ];

        if($request->hasFile('photo_profile')){
            $path = $request->file('photo_profile')->store('profile_pictures', 'public');
            $userData['photo_profile'] = $path;
        }

        $user = User::create($userData);

        if ($user->photo_profil) {
            $user->photo_profil_url = Storage::url($user->photo_profil);
        }

        $response = new UserResource($user);

        return response()->json([
            'message' => 'Le participant est crée avec succes !',
            'user' => $response,
        ]);
    }

    public function storeRH(StoreUserRequest $request)
    {
        $request->validate([
            'nom' => 'required|string',
            'prenom' => 'required|string',            
            'email' => 'required|email|unique:users,email',
            'telephone' => 'required',
            'statut' => 'required',
            'photo_profile' => 'image|mimes:jpeg,png,jpg,gif',
            'specialite_fonction' => 'sometimes',
            'password' => 'required|string|min:8',
            'entreprise_id'=>'required',
        ]);

        $userData = [
            'nom' => $request->nom,
            'prenom' => $request->prenom,
            'email' => $request->email,
            'statut' => $request->statut,
            'telephone' => $request->telephone,
            'specialite_fonction' => $request->specialite_fonction,
            'password' => Hash::make($request->password),
            'role' => 'rh',
            'statut' => $request->statut,
            'entreprise_id'=>$request->entreprise_id,
        ];

        if($request->hasFile('photo_profile')){
            $path = $request->file('photo_profile')->store('profile_pictures', 'public');
            $userData['photo_profile'] = $path;
        }

        $user = User::create($userData);

        if ($user->photo_profil) {
            $user->photo_profil_url = Storage::url($user->photo_profil);
        }

        $response = new UserResource($user);

        return response()->json([
            'message' => 'Le rh est crée avec succes !',
            'user' => $response,
        ]);
    }

    public function storeFormateur(StoreUserRequest $request)
    {
        $request->validate([
            'nom' => 'required|string',
            'prenom' => 'required|string',            
            'email' => 'required|email|unique:users,email',
            'telephone' => 'required',
            'photo_profile' => 'image|mimes:jpeg,png,jpg,gif',
            'specialite_fonction' => 'sometimes',
            'password' => 'required|string|min:8',
        ]);

        $userData = [
            'nom' => $request->nom,
            'prenom' => $request->prenom,
            'email' => $request->email,
            'telephone' => $request->telephone,
            'specialite_fonction' => $request->specialite_fonction,
            'password' => Hash::make($request->password),
            'role' => 'formateur',
            'statut' => $request->statut,
        ];

        if($request->hasFile('photo_profile')){
            $path = $request->file('photo_profile')->store('profile_pictures', 'public');
            $userData['photo_profile'] = $path;
        }

        $user = User::create($userData);

        if ($user->photo_profil) {
            $user->photo_profil_url = Storage::url($user->photo_profil);
        }
        $response = new UserResource($user);

        return response()->json([
            'message' => 'Le formateur est crée avec succes !',
            'user' => $response,
        ]);

    }



}



