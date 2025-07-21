<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SessionFormationEntreprise extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'date_debut',
        'date_fin',
        'etat',
        'raison_sus',
        'raison_annulation',
        'observations',
        'formation_id',
        'entreprise_id',
    ];


    public function formation(){
        return $this->belongsTo(Formation::class);
    }

    public function entreprise(){
        return $this->belongsTo(Entreprise::class);
    }

    public function participants()
    {
        return $this->belongsToMany(User::class, 'session_users');
    }
}
