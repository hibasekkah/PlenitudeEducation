<?php

namespace App\Http\Controllers;

use App\Models\SessionUser;
use App\Http\Requests\StoreSessionUserRequest;
use App\Http\Requests\UpdateSessionUserRequest;
use App\Http\Resources\SessionUserResource;
use App\Mail\ConvocationMail;
use Illuminate\Support\Facades\Mail;

class SessionUserController extends Controller
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
    public function store(StoreSessionUserRequest $request)
    {
        //dd($request);
        $formfields = $request->validated();
        $sessionuser = SessionUser::create($formfields);
        $response = new SessionUserResource($sessionuser);

        $link = config('app.frontend_url')."/login";
        $session = $sessionuser->session;
        Mail::to($sessionuser->user->email)->send(new ConvocationMail($link,$session,$sessionuser->user));

        return response()->json([
            'session'=>$response,
            'message'=>__('Le participant a été affecté avec succès à la session.')
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(SessionUser $sessionUser)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSessionUserRequest $request, SessionUser $sessionUser)
    {
        $formfields = $request->validated();
        $sessionUser->update($formfields);
        return response()->json([
            'session'=>$sessionUser,
            'message'=>__("L'affectation a été mise à jour avec succès.")
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SessionUser $sessionUser)
    {
        $sessionUser->delete();
        return response()->json([
            'sessionUser' => $sessionUser,
            'message' => __("L'utilisateur a été supprimé avec succès de la session.")
            ]);
    }
}
