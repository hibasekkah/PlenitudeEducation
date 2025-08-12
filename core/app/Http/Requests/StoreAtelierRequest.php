<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAtelierRequest extends FormRequest
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
            'type' => 'required|unique:ateliers,type',
            'materiels' => 'sometimes',
            'observations' =>'sometimes',
            'lieu' => 'required',
            'duree' => 'required',
            'formation_id' => 'required',
        ];
    }
}
