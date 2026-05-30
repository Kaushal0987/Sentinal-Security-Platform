<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VaultEntry extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'site_name',
        'account_username',
        'encrypted_password',
        'encrypted_notes',
        'is_favorite',
        'password_strength_score',
        'two_fa_enabled',
        'encrypted_recovery_codes',
    ];

    protected function casts(): array
    {
        return [
            'is_favorite' => 'boolean',
            'two_fa_enabled' => 'boolean',
            'password_strength_score' => 'integer',
        ];
    }
}