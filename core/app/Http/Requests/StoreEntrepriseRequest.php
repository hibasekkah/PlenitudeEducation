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
            'ICE' => 'required',
            'IF' => 'required',
            'CNSS' => 'required',
            'telephone' => 'required',
            'email' => 'required',
            'adresse' => 'sometimes',
            'capital'=>'sometimes',
            'budget' => 'required',
            'priode' => 'required',
            'debut_period' => 'required|date',
            'fin_period' => 'required|date',
            'doc_rc' => 'sometimes',
            'doc_status' => 'sometimes',
            'doc_pv' => 'sometimes',
            'CIN_gerant' => 'sometimes',
            'files'=>'sometimes|array',
            'files.*' => 'sometimes|file',
            'numero_patente' => 'sometimes',
            'nombre_personnels' => 'sometimes',
            'nombre_cadres' => 'sometimes',
            'nombre_employees' =>'sometimes',
            'nombre_ouvriers' => 'sometimes',
            'nom_gerant' => 'sometimes',
            'numero_cin_gerant' => 'sometimes',
            'adresse_gerant' =>'sometimes',

        ];
    }
}
