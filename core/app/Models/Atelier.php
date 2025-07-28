<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Atelier extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'type',
        'materiels',
        'observations',
        'lieu',
        'duree',
        'formation_id',
    ];

    public function formation(){
        return $this->belongsTo(Formation::class);
    }

    public function seances(){
        return $this->hasMany(Seance::class);
    }

}
