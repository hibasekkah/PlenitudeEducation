<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Module extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'titre',
        'duree',
        'categorie',
        'formation_id',
    ];


    public function formation(){
        return $this->belongsTo(Formation::class);
    }

    public function seances(){
        return $this->hasMany(Seance::class);
    }

    public function files(){
        return $this->hasMany(File::class);
    }

}
