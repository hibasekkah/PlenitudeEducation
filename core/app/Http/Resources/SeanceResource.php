<?php

namespace App\Http\Resources;

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
        'module' => new ModuleResource($this->module),
        'atelier' => new AtelierResource($this->atelier),
        'formateur_id' => new UserResource($this->formateur),
        'presence_participant' => $pointage ? (bool) true : null,
        'Observations' => $this->Observations,
        'DEBUG_POINTAGE_OBJECT' => $pointage, // Affiche l'objet pointage entier
        'DEBUG_EST_PRESENT_VALUE' => $pointage ? $pointage->est_present : 'POINTAGE_NON_TROUVE',
        'DEBUG_EST_PRESENT_TYPE' => $pointage ? gettype($pointage->est_present) : 'POINTAGE_NON_TROUVE',
    ];
    }
}
