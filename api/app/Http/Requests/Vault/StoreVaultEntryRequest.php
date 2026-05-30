<?php

namespace App\Http\Requests\Vault;

use Illuminate\Foundation\Http\FormRequest;

class StoreVaultEntryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'site_name' => ['required', 'string', 'max:255'],
            'account_username' => ['nullable', 'string', 'max:255'],
            'password' => ['required', 'string'],
            'notes' => ['nullable', 'string'],
            'is_favorite' => ['nullable', 'boolean'],
            'two_fa_enabled' => ['nullable', 'boolean'],
            'password_strength_score' => ['nullable', 'integer', 'min:0', 'max:100'],
            'recovery_codes' => ['nullable', 'string'],
        ];
    }
}
