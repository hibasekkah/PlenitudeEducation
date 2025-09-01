<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSeanceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'date'=>'sometimes|date',
            'heure_debut'=>'sometimes',
            'heure_fin'=>'sometimes', 
            'session_id'=>'sometimes',
            'formateur_id'=>'sometimes',
            'module_id'=>'sometimes',
            'atelier_id'=>'sometimes',
            'Observations'=>'sometimes',
        ];
    }
}
