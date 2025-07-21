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
            'date'=>'sometimes|required|date',
            'heure_debut'=>'sometimes|required',
            'heure_fin'=>'sometimes|required', 
            'session_id'=>'sometimes|required',
            'formateur_id'=>'sometimes|required',
            'module_id'=>'sometimes|required',
            'atelier_id'=>'sometimes|required',
            'Observations'=>'sometimes|required',
            'etat'=>'sometimes|required|string',
        ];
    }
}
