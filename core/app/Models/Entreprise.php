<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Entreprise extends Model
{
    


    public function employees(){
        return $this->hasMany(User::class);
    }

    public function formations(){
        return $this->hasMany(User::class);
    }
}
