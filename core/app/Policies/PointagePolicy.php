<?php

namespace App\Policies;

use App\Models\Pointage;
use App\Models\User;

class PointagePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        if($user->role === 'admin'){
            return true;
        }
        return false;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Pointage $pointage): bool
    {
        if($user->role === 'admin'){
            return true;
        }
        if($user->role === 'participant' || $pointage->user_id === $user->id){
            return true;
        }
        return false;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        if($user->role === 'participant' || $user->role === 'admin'){
            return true;
        }
        return false;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Pointage $pointage): bool
    {
        if($user->role === 'participant' || $user->role === 'admin'){
            return true;
        }
        return false;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Pointage $pointage): bool
    {
        return false;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Pointage $pointage): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Pointage $pointage): bool
    {
        return false;
    }
}
