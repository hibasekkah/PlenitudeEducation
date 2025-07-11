<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Formation extends Model
{
    
    public function ateliers(){
        return $this->hasMany(Atelier::class);
    }

    public function modules(){
        return $this->hasMany(Module::class);
    }
}
