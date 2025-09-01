<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateModuleRequest extends FormRequest
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
            'titre' => 'sometimes|string|max:200',
            'duree' => 'sometimes',
            'categorie' => 'sometimes|string|max:200',
            'formation_id' => 'sometimes',
            'files' => 'sometimes|array',
            'files.*' => 'sometimes|file',
            'files_to_delete' => 'sometimes|array',
            'files_to_delete.*' => 'sometimes|integer|exists:files,id',
        ];
    }
}
