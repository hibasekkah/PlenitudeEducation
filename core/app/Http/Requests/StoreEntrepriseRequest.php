<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEntrepriseRequest extends FormRequest
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
            'nom' => 'required|max:50',
            'secteur' => 'required',
            'SIRET' => 'required',
            'IF' => 'required',
            'CNSS' => 'required',
            'telephone' => 'required',
            'email' => 'required|unique:entreprises|email',
            'adresse' => 'required',
            'capital'=>'required',
            'budget' => 'required',
            'priode' => 'required',
            'debut_period' => 'required|date',
            'fin_period' => 'required|date',
        ];
    }
}
