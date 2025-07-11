<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Atelier extends Model
{

    public function formations(){
        return $this->belongsTo(Formation::class);
    }

    public function seances(){
        return $this->hasMany(Seance::class);
    }

    public function formateur(){
        return $this->belongsTo(User::class);
    }

}
