<?php

namespace App\Http\Requests\Vault;

use Illuminate\Foundation\Http\FormRequest;

class UpdateVaultEntryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'site_name' => ['sometimes', 'required', 'string', 'max:255'],
            'account_username' => ['sometimes', 'nullable', 'string', 'max:255'],
            'password' => ['sometimes', 'nullable', 'string'],
            'notes' => ['sometimes', 'nullable', 'string'],
            'is_favorite' => ['sometimes', 'boolean'],
            'two_fa_enabled' => ['sometimes', 'boolean'],
            'password_strength_score' => ['sometimes', 'integer', 'min:0', 'max:100'],
            'recovery_codes' => ['sometimes', 'nullable', 'string'],
        ];
    }
}
