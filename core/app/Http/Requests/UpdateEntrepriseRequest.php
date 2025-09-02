<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

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
        $entrepriseId = $this->route('entreprise')->id;
        return [
            'nom' => 'sometimes|max:50',
            'secteur' => 'sometimes',
            'ICE' => 'sometimes',
            'IF' => 'sometimes',
            'CNSS' => 'sometimes',
            'telephone' => 'sometimes',
            'email' => 'sometimes',
            'adresse' => 'sometimes',
            'capital'=>'sometimes',
            'budget' => 'sometimes',
            'priode' => 'sometimes',
            'debut_period' => 'sometimes|date',
            'fin_period' => 'sometimes|date',
            'doc_rc' => 'sometimes|file',
            'doc_status' => 'sometimes|file',
            'doc_pv' => 'sometimes|file',
            'CIN_gerant' => 'sometimes|file',
            'numero_patente' => 'sometimes',
            'nombre_personnels' => 'sometimes',
            'nombre_cadres' => 'sometimes',
            'nombre_employees' =>'sometimes',
            'nombre_ouvriers' => 'sometimes',
            'nom_gerant' => 'sometimes',
            'numero_cin_gerant' => 'sometimes',
            'adresse_gerant' =>'sometimes',
            'files' => 'sometimes|array',
            'files.*' => 'sometimes|file',
            'files_to_delete' => 'sometimes|array',
            'files_to_delete.*' => [
            'sometimes',
            'integer',
            function ($attribute, $value, $fail) use ($entrepriseId) {
                $fileExists = \App\Models\FileEntreprise::where('id', $value)
                    ->where('entreprise_id', $entrepriseId)
                    ->exists();
                
                if (!$fileExists) {
                    $fail("Le fichier avec l'ID {$value} n'existe pas ou n'appartient pas à cette entreprise.");
                }
            }
        ],
        ];
    }
}
