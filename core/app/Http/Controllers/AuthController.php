<?php

namespace App\Http\Controllers;

use App\Models\Invitation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\Storage;

class AuthController extends Controller
{

    public function __construct()
    {
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);
        $credentials = $request->only('email', 'password');

        $token = Auth::attempt($credentials);
        if (!$token) {
            return response()->json([
                'status' => 'error',
                'message' => 'Accès non autorisé',
            ], 401);
        }

        $user = Auth::user();
        return response()->json([
                'status' => 'success',
                'user' => $user,
                'authorisation' => [
                    'token' => $token,
                    'type' => 'bearer',
                ]
            ]);

    }

    public function registerWithInvitation(Request $request){

        $request->validate([
            'nom' => 'required|string',
            'prenom' => 'required|string',
            'telephone' => 'required',
            'photo_profile' => 'image|mimes:jpeg,png,jpg,gif',
            'specialite_fonction' => 'required',
            'password' => 'required|string|min:8',
        ]);

        $invitation = Invitation::where('token',$request->token)->where('used',false)->firstOrFail();

        $userData = [
            'nom' => $request->nom,
            'prenom' => $request->prenom,
            'email' => $invitation->email,
            'telephone' => $request->telephone,
            'specialite_fonction' => $request->specialite_fonction,
            'password' => Hash::make($request->password),
            'role' => $invitation->role,
            'statut' => 'active',
            'entreprise_id'=>$invitation->entreprise,
        ];

        if($request->hasFile('photo_profile')){
            $path = $request->file('photo_profile')->store('profile_pictures', 'public');
            $userData['photo_profile'] = $path;
        }
        
        $user = User::create($userData);

        $invitation->update(['used'=>true]);

        $token = Auth::login($user);

        if ($user->photo_profil) {
            $user->photo_profil_url = Storage::url($user->photo_profil);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Votre compte a été créé avec succès.',
            'user' => $user,
            'authorisation' => [
                'token' => $token,
                'type' => 'bearer',
            ]
        ]);
    }

    public function logout()
    {
        Auth::logout();
        return response()->json([
            'status' => 'success',
            'message' => 'Successfully logged out',
        ]);
    }

    public function refresh()
    {
        return response()->json([
            'status' => 'success',
            'user' => Auth::user(),
            'authorisation' => [
                'token' => Auth::refresh(),
                'type' => 'bearer',
            ]
        ]);
    }

}