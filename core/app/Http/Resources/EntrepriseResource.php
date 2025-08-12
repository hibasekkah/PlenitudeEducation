<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EntrepriseResource extends JsonResource
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
            'secteur'=>$this->secteur,
            'ICE'=>$this->ICE,
            'IF'=>$this->IF,
            'CNSS'=>$this->CNSS,
            'telephone'=>$this->telephone,
            'email'=>$this->email,
            'adresse'=>$this->adresse,
            'capital'=>$this->capital,
            'budget'=>$this->budget,
            'priode'=>$this->priode,
            'debut_period'=>$this->debut_period,
            'fin_period'=>$this->fin_period,
            'doc_rc'=>$this->doc_rc,
            'doc_status'=>$this->doc_status,
            'doc_pv'=>$this->doc_pv,
            'CIN_gerant'=>$this->CIN_gerant,
            'files'=>$this->files,
            'numero_patente' => $this->numero_patente,
            'nombre_personnels' => $this->nombre_personnels,
            'nombre_cadres' => $this->nombre_cadres,
            'nombre_employees' =>$this->nombre_employees,
            'nombre_ouvriers' => $this->nombre_ouvriers,
            'nom_gerant' => $this->nom_gerant,
            'numero_cin_gerant' => $this->numero_cin_gerant,
            'adresse_gerant' => $this->adresse_gerant,
        ];
    }
}
