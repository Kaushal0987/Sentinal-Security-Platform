<?php

namespace Database\Seeders;

use App\Models\VaultEntry;
use App\Models\User;
use App\Services\EncryptionService;
use Illuminate\Database\Seeder;

class VaultSeeder extends Seeder
{
    public function run(): void
    {
        $enc = new EncryptionService();

        $alice = User::where('email', 'alice@example.com')->first();
        $bob = User::where('email', 'bob@example.com')->first();

        if (!$alice || !$bob) {
            return;
        }

        // Alice's vault entries
        VaultEntry::create([
            'user_id' => $alice->id,
            'site_name' => 'github.com',
            'account_username' => 'alice.wonderland',
            'encrypted_password' => $enc->encrypt('GithubPass123!'),
            'encrypted_notes' => $enc->encrypt('Primary dev account'),
            'is_favorite' => true,
            'password_strength_score' => 85,
        ]);

        VaultEntry::create([
            'user_id' => $alice->id,
            'site_name' => 'gmail.com',
            'account_username' => 'alice.w@gmail.com',
            'encrypted_password' => $enc->encrypt('GmailSecure456@'),
            'encrypted_notes' => $enc->encrypt('Personal email'),
            'is_favorite' => false,
            'password_strength_score' => 80,
        ]);

        // Bob's vault entries
        VaultEntry::create([
            'user_id' => $bob->id,
            'site_name' => 'aws.amazon.com',
            'account_username' => 'bob.smith.aws',
            'encrypted_password' => $enc->encrypt('AWSRoot789$#%'),
            'encrypted_notes' => $enc->encrypt('Production AWS account - use 2FA'),
            'is_favorite' => true,
            'two_fa_enabled' => true,
            'password_strength_score' => 95,
        ]);

        VaultEntry::create([
            'user_id' => $bob->id,
            'site_name' => 'slack.com',
            'account_username' => 'bob@company.slack.com',
            'encrypted_password' => $enc->encrypt('SlackWork321!'),
            'encrypted_notes' => null,
            'is_favorite' => false,
            'password_strength_score' => 75,
        ]);
    }
}
