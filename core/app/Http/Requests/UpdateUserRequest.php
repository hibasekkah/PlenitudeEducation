<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
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
            'nom' => 'sometimes|required',
            'prenom' => 'sometimes|required',
            'telephone' => 'sometimes|required',
            'photo_profile' => 'required|image|mimes:jpeg,png,jpg,gif',
            'specialite_fonction' => 'sometimes|required',
            'entreprise_id'=>'sometimes|required',
        ];
    }
}
