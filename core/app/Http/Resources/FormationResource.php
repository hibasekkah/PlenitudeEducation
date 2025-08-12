<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FormationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'intitule' => $this->intitule,
            'objectifs'=> $this->objectifs,
            'duree'=> $this->duree,
            'niveau'=> $this->niveau,
            'cout'=> $this->cout,
            'categorie'=> $this->categorie,
            'modules'=> ModuleResource::collection($this->modules),
            'ateliers'=> $this->ateliers,
        ];
    }
}
