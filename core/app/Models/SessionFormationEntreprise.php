<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Symfony\Component\HttpFoundation\Session\Session;

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

    protected $casts = [
        'date_debut' => 'date',
        'date_fin' => 'date',
    ];

    public function formation(){
        return $this->belongsTo(Formation::class);
    }

    public function entreprise(){
        return $this->belongsTo(Entreprise::class);
    }

    // public function participants()
    // {
    //     return $this->belongsToMany(User::class, 'session_users');
    // }

    public function sessionUsers()
    {
        return $this->hasMany(SessionUser::class,'session_id');
    }

    public function Seances()
    {
        return $this->hasMany(Seance::class, 'session_id');
    }

}
