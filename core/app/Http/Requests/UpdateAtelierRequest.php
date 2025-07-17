<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAtelierRequest extends FormRequest
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
            'type' => 'sometimes|required',
            'materiels' => 'sometimes|required',
            'observations'=>'sometimes',
            'lieu' => 'sometimes|required',
            'duree' => 'sometimes|required',
            'formation_id' => 'sometimes|required',
        ];
    }
}
