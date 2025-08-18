<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    protected $fillable =[
        'module_id',
        'file_path',
        'file_nom',
        'size',
    ];

    public function modules(){
        return $this->belongsTo(Module::class);
    }
}
