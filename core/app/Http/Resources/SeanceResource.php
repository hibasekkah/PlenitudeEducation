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
        return [
        'id' => $this->id,
        'date' => $this->date,
        'etat' => $this->etat,
        'heure_debut' => $this->heure_debut,
        'heure_fin' => $this->heure_fin,
        'session_id' => new SessionFormationEntrepriseResource($this->session) ,
        'formateur_id' => $this->formateur,
        'module' => $this->module,
        'atelier' => $this->atelier,
        //'entreprise_id' => $this->session->entreprise,
        //'formation_id' => $this->session->formation,
    ];
    }
}
