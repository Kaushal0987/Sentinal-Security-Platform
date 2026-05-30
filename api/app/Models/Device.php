<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Device extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'type',
        'os_name',
        'notes',
        'update_status',
        'trust_level',
        'encryption_enabled',
        'antivirus_enabled',
        'security_score',
        'last_seen_at',
    ];

    protected function casts(): array
    {
        return [
            'encryption_enabled' => 'boolean',
            'antivirus_enabled' => 'boolean',
            'security_score' => 'integer',
            'last_seen_at' => 'datetime',
        ];
    }
}