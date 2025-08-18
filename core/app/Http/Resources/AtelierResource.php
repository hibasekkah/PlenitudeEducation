<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AtelierResource extends JsonResource
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
            'type'=>$this->type,
            'materiels'=>$this->materiels,
            'observations'=>$this->observations,
            'lieu'=>$this->lieu,
            'formation'=>$this->formation,
        ];
    }
}
