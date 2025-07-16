<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class Invitation extends Model
{
    use Notifiable,HasFactory;

    protected $fillable = [
        'email',
        'token',
        'role',
        'used',
        'entreprise',
    ];
}
