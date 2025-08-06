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
            'SIRET'=>$this->SIRET,
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
            'files'=>$this->files
        ];
    }
}
