<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FileEntreprise extends Model
{
    protected $fillable =[
        'entreprise_id',
        'file_path',
        'file_nom',
        'size',
    ];

    public function entreprise(){
        return $this->belongsTo(Entreprise::class);
    }
}
