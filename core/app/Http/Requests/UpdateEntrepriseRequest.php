<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateEntrepriseRequest extends FormRequest
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
            'nom' => 'sometimes|required|max:50',
            'secteur' => 'sometimes|required',
            'SIRET' => 'sometimes|required',
            'IF' => 'sometimes|required',
            'CNSS' => 'sometimes|required',
            'telephone' => 'sometimes|required',
            'email' => 'sometimes|required|email|unique:entreprises,'.$this->id,
            'adresse' => 'sometimes|required',
            'capital'=>'sometimes|required',
            'budget' => 'sometimes|required',
            'priode' => 'sometimes|required',
            'debut_period' => 'sometimes|required|date',
            'fin_period' => 'sometimes|required|date',
        ];
    }
}
