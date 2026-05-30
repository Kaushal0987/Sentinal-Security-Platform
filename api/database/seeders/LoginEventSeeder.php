<?php

namespace Database\Seeders;

use App\Models\LoginEvent;
use App\Models\User;
use App\Models\Device;
use Illuminate\Database\Seeder;

class LoginEventSeeder extends Seeder
{
    public function run(): void
    {
        $alice = User::where('email', 'alice@example.com')->first();
        $bob = User::where('email', 'bob@example.com')->first();
        $aliceDevices = Device::where('user_id', $alice?->id)->limit(1)->get();
        $bobDevices = Device::where('user_id', $bob?->id)->limit(1)->get();

        if (!$alice || !$bob || $aliceDevices->isEmpty() || $bobDevices->isEmpty()) {
            return;
        }

        // Alice's successful logins
        LoginEvent::create([
            'user_id' => $alice->id,
            'device_id' => $aliceDevices[0]->id,
            'status' => 'success',
            'ip_address' => '192.168.1.100',
            'location_country' => 'US',
            'location_city' => 'San Francisco',
            'risk_level' => 'low',
            'occurred_at' => now()->subHours(2),
        ]);

        LoginEvent::create([
            'user_id' => $alice->id,
            'device_id' => $aliceDevices[0]->id,
            'status' => 'success',
            'ip_address' => '192.168.1.100',
            'location_country' => 'US',
            'location_city' => 'San Francisco',
            'risk_level' => 'low',
            'occurred_at' => now()->subHours(24),
        ]);

        // Alice's failed login
        LoginEvent::create([
            'user_id' => $alice->id,
            'device_id' => null,
            'status' => 'failed',
            'ip_address' => '203.0.113.42',
            'location_country' => 'CN',
            'location_city' => 'Shanghai',
            'risk_level' => 'high',
            'occurred_at' => now()->subHours(6),
        ]);

        // Bob's logins
        LoginEvent::create([
            'user_id' => $bob->id,
            'device_id' => $bobDevices[0]->id,
            'status' => 'success',
            'ip_address' => '10.0.0.5',
            'location_country' => 'US',
            'location_city' => 'New York',
            'risk_level' => 'low',
            'occurred_at' => now()->subHours(1),
        ]);

        LoginEvent::create([
            'user_id' => $bob->id,
            'device_id' => $bobDevices[0]->id,
            'status' => 'success',
            'ip_address' => '10.0.0.5',
            'location_country' => 'US',
            'location_city' => 'New York',
            'risk_level' => 'low',
            'occurred_at' => now()->subDays(1),
        ]);
    }
}
