<?php

namespace Database\Seeders;

use App\Models\Device;
use App\Models\User;
use Illuminate\Database\Seeder;

class DeviceSeeder extends Seeder
{
    public function run(): void
    {
        $alice = User::where('email', 'alice@example.com')->first();
        $bob = User::where('email', 'bob@example.com')->first();

        if (!$alice || !$bob) {
            return;
        }

        // Alice's devices
        Device::create([
            'user_id' => $alice->id,
            'name' => 'MacBook Pro 16',
            'type' => 'laptop',
            'os_name' => 'macOS 14',
            'notes' => 'Primary work machine',
            'trust_level' => 'trusted',
            'last_seen_at' => now()->subDays(1),
            'update_status' => 'up_to_date',
            'encryption_enabled' => true,
            'antivirus_enabled' => true,
            'security_score' => 95,
        ]);

        Device::create([
            'user_id' => $alice->id,
            'name' => 'iPhone 15 Pro',
            'type' => 'mobile',
            'os_name' => 'iOS 18',
            'notes' => 'Personal phone',
            'trust_level' => 'trusted',
            'last_seen_at' => now(),
            'update_status' => 'up_to_date',
            'encryption_enabled' => true,
            'antivirus_enabled' => false,
            'security_score' => 85,
        ]);

        // Bob's devices
        Device::create([
            'user_id' => $bob->id,
            'name' => 'Dell XPS 13',
            'type' => 'laptop',
            'os_name' => 'Windows 11',
            'notes' => 'Development machine',
            'trust_level' => 'trusted',
            'last_seen_at' => now()->subHours(2),
            'update_status' => 'updates_available',
            'encryption_enabled' => true,
            'antivirus_enabled' => true,
            'security_score' => 88,
        ]);

        Device::create([
            'user_id' => $bob->id,
            'name' => 'Pixel 8',
            'type' => 'mobile',
            'os_name' => 'Android 14',
            'notes' => 'Work phone',
            'trust_level' => 'risky',
            'last_seen_at' => now()->subDays(10),
            'update_status' => 'updates_available',
            'encryption_enabled' => true,
            'antivirus_enabled' => false,
            'security_score' => 72,
        ]);
    }
}
