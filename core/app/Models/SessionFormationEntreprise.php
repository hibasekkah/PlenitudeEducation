<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SessionFormationEntreprise extends Model
{


    public function formation(){
        return $this->belongsTo(Formation::class);
    }

    public function entreprise(){
        return $this->belongsTo(Entreprise::class);
    }

    public function participants(){
        return $this->hasMany(User::class,'session_user');
    }
}
