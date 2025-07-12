<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Module extends Model
{


    public function formation(){
        return $this->belongsTo(Formation::class);
    }

    public function seances(){
        return $this->hasMany(Seance::class);
    }

}
