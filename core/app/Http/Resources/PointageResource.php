<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PointageResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    
    public function toArray(Request $request): array
    {
        return [
            'date' => $this->date,
            'arriver' => $this->arriver,
            'sortie' => $this->sortie,
            'seance' => $this->seance,
            'user' => $this->participant,
        ];
    }
}
