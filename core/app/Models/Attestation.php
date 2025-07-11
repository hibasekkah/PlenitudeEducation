<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Attestation extends Model
{
    


    public function user(){
        return $this->belongsTo(User::class);
    }

    public function formation(){
        return $this->belongsTo(Formation::class);
    }
}
