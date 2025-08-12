<?php

namespace App\Http\Resources;

use App\Models\Seance;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SessionFormationEntrepriseResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
        'id' => $this->id,
        'etat' => $this->etat,
        'date_debut' => $this->date_debut,
        'date_fin' => $this->date_fin,
        'raison_sus' => $this->raison_sus,
        'raison_annulation' => $this->raison_annulation,
        'observations' => $this->observations,
        'entreprise' => $this->entreprise,
        'formation' => new FormationResource($this->formation),
        //'seances' => SeanceResource::collection($this->Seances),
    ];
    }
}
