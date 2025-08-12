<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pointage extends Model
{
    protected $fillable = [
        'date',
        'arriver',
        'sortie',
        'seance_id',
        'user_id',
    ];

    public function participant(){
        return $this->belongsTo(User::class);
    }

    public function seance(){
        return $this->belongsTo(Seance::class);
    }

}
