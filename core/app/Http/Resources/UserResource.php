<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'nom'=>$this->nom,
            'email'=>$this->email,
            'prenom'=>$this->prenom,
            'entreprise'=>$this->entreprise,
            'telephone'=>$this->telephone,
            'statut'=>$this->statut,
            'specialite_fonction'=>$this->specialite_fonction,
            'photo_profile'=>$this->photo_profile,
        ];
    }
}
