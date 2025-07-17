<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSessionFormationEntrepriseRequest extends FormRequest
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
            'date_debut' => 'required',
            'date_fin' => 'required',
            'etat' => 'sometimes|required',
            'raison_sus'=>'sometimes',
            'raison_annulation' =>'sometimes',
            'observations' =>'sometimes',
            'formation_id' => 'sometimes|required',
            'entreprise_id' => 'sometimes|required',
        ];
    }
}
