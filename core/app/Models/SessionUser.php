<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SessionUser extends Model
{
    protected $fillable = [
        'user_id',
        'session_id'
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function session(){
        return $this->belongsTo(SessionFormationEntreprise::class);
    }


}
