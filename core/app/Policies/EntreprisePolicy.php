<?php

namespace App\Policies;

use App\Models\Entreprise;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class EntreprisePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        if ($user->role === 'admin') {
            return true;
        }
        return false;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Entreprise $entreprise): bool
    {
        if ($user->role === 'admin' ) {
            return true;
        }

        if(($user->role === 'rh' || $user->role === 'participant') && $user->entreprise_id === $entreprise->id){
            return true;
        }
        return false;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        if ($user->role === 'admin' ) {
            return true;
        } 

        return false;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Entreprise $entreprise): bool
    {
        if ($user->role === 'admin' ) {
            return true;
        }

        return false;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Entreprise $entreprise): bool
    {
        if ($user->role === 'admin' ) {
            return true;
        } 
        return false;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Entreprise $entreprise): bool
    {
        if ($user->role === 'admin' ) {
            return true;
        } 
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Entreprise $entreprise): bool
    {
        if ($user->role === 'admin' ) {
            return true;
        } 
        return false;
    }
}
