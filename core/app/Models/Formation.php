<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class Formation extends Model
{
    use Notifiable,SoftDeletes,HasFactory;

    protected $fillable = [
        'intitule',
        'objectifs',
        'duree',
        'niveau',
        'cout',
        'categorie',
    ];
    
    protected $table = 'formations';
    
    public function ateliers(){
        return $this->hasMany(Atelier::class);
    }

    public function modules(){
        return $this->hasMany(Module::class);
    }

    public function sessions(){
        return $this->hasMany(SessionFormationEntreprise::class);
    }
}
