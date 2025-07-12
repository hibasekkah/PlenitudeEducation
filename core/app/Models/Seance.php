<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Seance extends Model
{
    public function session(){
        return $this->belongsTo(SessionFormationEntreprise::class);
    }

    public function module(){
        return $this->belongsTo(Module::class);
    }

    public function atelier(){
        return $this->belongsTo(Atelier::class);
    }
}
