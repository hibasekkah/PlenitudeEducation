<?php

namespace App\Http\Resources;

use App\Models\File;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\DB;

class ModuleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'=>$this->id,
            'titre'=>$this->titre,
            'duree'=>$this->duree,
            'categorie'=>$this->categorie,
            'formation'=>$this->formation,
            'files'=>$this->files
        ];
    }
}
