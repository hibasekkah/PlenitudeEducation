<?php

namespace App\Http\Resources;

use App\Models\Atelier;
use App\Models\Module;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SeanceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $pointage = $this->pointages->first();
        return [
        'id' => $this->id,
        'date' => $this->date,
        'etat' => $this->etat,
        'heure_debut' => $this->heure_debut,
        'heure_fin' => $this->heure_fin,
        'session_id' => new SessionFormationEntrepriseResource($this->session) ,
        'module' => new ModuleResource($this->whenLoaded('module')),
        'atelier' => new AtelierResource($this->whenLoaded('atelier')),
        'formateur_id' => new UserResource($this->whenLoaded('formateur')),
        'presence_participant' => $pointage ? (bool) $pointage->est_present : null,
        'Observations' => $this->Observations,
    ];
    }
}
