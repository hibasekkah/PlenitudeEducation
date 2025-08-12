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
            'adresse' => 'required',
            'capital'=>'required',
            'budget' => 'required',
            'priode' => 'required',
            'debut_period' => 'required|date',
            'fin_period' => 'required|date',
            'doc_rc' => 'required',
            'doc_status' => 'required',
            'doc_pv' => 'required',
            'CIN_gerant' => 'required',
            'files'=>'sometimes|array',
            'files.*' => 'required|file',
            'numero_patente' => 'required',
            'nombre_personnels' => 'required',
            'nombre_cadres' => 'required',
            'nombre_employees' =>'required',
            'nombre_ouvriers' => 'required',
            'nom_gerant' => 'required',
            'numero_cin_gerant' => 'required',
            'adresse_gerant' =>'required',

        ];
    }
}
