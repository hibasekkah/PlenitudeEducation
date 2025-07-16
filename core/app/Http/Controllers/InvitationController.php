<?php

namespace App\Http\Controllers;

use App\Models\Invitation;
use App\Http\Requests\StoreInvitationRequest;
use App\Http\Requests\UpdateInvitationRequest;
use App\Mail\UserInvitationMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;


class InvitationController extends Controller
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
    public function store(StoreInvitationRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Invitation $invitation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateInvitationRequest $request, Invitation $invitation)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Invitation $invitation)
    {
        //
    }

    public function send(Request $request){
        $request->validate([
            'email' => 'required|email|unique:users,email|unique:invitations,email,NULL,id,used,0',
            'role' => 'required|string|in:rh,participant,formateur',
            
        ]);

        $invitation = Invitation::create([
            'email' => $request->email,
            'role' => $request->role,
            'token' => Str::uuid(),
            'entreprise' => $request->entreprise,
        ]);

        $link = config('app.frontend_url')."/register/invite/{$invitation->token}";
        Mail::to($request->email)->send(new UserInvitationMail($link));

        return response()->json(['message'=>'invitation envoyé avec success','invitation'=>$invitation]);
        
    }

    public function verify($token){
        $invitation = Invitation::where('token',$token)->where('used',false)->firstOrFail();
        return response()->json([
            'email'=> $invitation->email,
            'role'=> $invitation->role,
            'entreprise'=> $invitation->entreprise,
        ]);
    }
}
