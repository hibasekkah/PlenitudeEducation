<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Seance extends Model
{

    protected $fillable = [
        'date',
        'heure_debut',
        'heure_fin',
        'etat',
        'Observations',
        'session_id',
        'formateur_id',
        'module_id',
        'atelier_id',   
    ];

    protected $casts = [
        'date' => 'date'
    ];

    public function session(){
        return $this->belongsTo(SessionFormationEntreprise::class);
    }

    public function module(){
        return $this->belongsTo(Module::class);
    }

    public function atelier(){
        return $this->belongsTo(Atelier::class);
    }

    public function formateur(){
        return $this->belongsTo(User::class);
    }

    public function pointages()
    {
        return $this->hasMany(Pointage::class);
    }
}
