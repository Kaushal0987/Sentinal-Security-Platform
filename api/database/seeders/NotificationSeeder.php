<?php

namespace Database\Seeders;

use App\Models\Notification;
use App\Models\User;
use Illuminate\Database\Seeder;

class NotificationSeeder extends Seeder
{
    public function run(): void
    {
        $alice = User::where('email', 'alice@example.com')->first();
        $bob = User::where('email', 'bob@example.com')->first();

        if (!$alice || !$bob) {
            return;
        }

        // Alice's notifications
        Notification::create([
            'user_id' => $alice->id,
            'category' => 'suspicious_login',
            'title' => 'Unusual login detected',
            'body' => 'Login from Shanghai, China at ' . now()->subHours(6)->format('H:i A'),
            'severity' => 'warning',
            'is_read' => false,
        ]);

        Notification::create([
            'user_id' => $alice->id,
            'category' => 'outdated_device',
            'title' => 'Device update available',
            'body' => 'Pixel 8 has pending updates available',
            'severity' => 'info',
            'is_read' => true,
        ]);

        // Bob's notifications
        Notification::create([
            'user_id' => $bob->id,
            'category' => 'suspicious_login',
            'title' => 'New device login',
            'body' => 'New login from a device in New York',
            'severity' => 'warning',
            'is_read' => false,
        ]);

        Notification::create([
            'user_id' => $bob->id,
            'category' => 'outdated_device',
            'title' => 'Device updates pending',
            'body' => 'Dell XPS 13 has ' . rand(1, 10) . ' system updates available',
            'severity' => 'info',
            'is_read' => false,
        ]);
    }
}
