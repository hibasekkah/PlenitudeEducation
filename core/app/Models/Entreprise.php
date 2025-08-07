<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class Entreprise extends Model
{
    use Notifiable,SoftDeletes,HasFactory;
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'nom',
        'secteur',
        'SIRET',
        'IF',
        'CNSS',
        'telephone',
        'email',
        'adresse',
        'capital',
        'budget',
        'priode',
        'debut_period',
        'fin_period',
        'doc_rc',
        'doc_status',
        'doc_pv',
        'CIN_gerant',
    ];
    
    protected $table = 'entreprises';  

    public function employees(){
        return $this->hasMany(User::class);
    }

    public function sessions(){
        return $this->hasMany(SessionFormationEntreprise::class);
    }

    public function files(){
        return $this->hasMany(FileEntreprise::class);
    }

    public function participants()
    {
        return $this->hasMany(User::class, 'entrprise_id')->where('role', 'participant');
    }

}
