<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSeanceRequest extends FormRequest
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
            'date'=>'required',
            'heure_debut'=>'required',
            'heure_fin'=>'required', 
            'session_id'=>'required',
            'formateur_id'=>'required',
            'module_id'=>'required|sometimes',
            'atelier_id'=>'required|sometimes',
            'Observations'=>'sometimes',
        ];
    } 
}
