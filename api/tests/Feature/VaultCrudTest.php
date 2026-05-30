<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class VaultCrudTest extends TestCase
{
    use RefreshDatabase;

    public function test_register_login_and_vault_crud()
    {
        // Register a new user
        $reg = $this->postJson('/api/v1/auth/register', [
            'name' => 'Test User',
            'email' => 'test+vault@example.com',
            'password' => 'Password123!@#',
            'password_confirmation' => 'Password123!@#'
        ]);

        $reg->assertStatus(201);

        $token = $reg->json('token');
        $this->assertIsString($token);

        $authHeader = ['Authorization' => "Bearer {$token}"];

        // Create vault entry
        $create = $this->withHeaders($authHeader)->postJson('/api/v1/vault-entries', [
            'site_name' => 'example.com',
            'account_username' => 'tester',
            'password' => 'S3cret!Pass',
            'notes' => 'some notes',
        ]);

        $create->assertStatus(201);
        $data = $create->json();
        $this->assertArrayHasKey('id', $data);
        $this->assertEquals('example.com', $data['site_name']);
        $this->assertEquals('S3cret!Pass', $data['password']);

        $id = $data['id'];

        // List
        $list = $this->withHeaders($authHeader)->getJson('/api/v1/vault-entries');
        $list->assertStatus(200);
        $this->assertCount(1, $list->json());

        // Show
        $show = $this->withHeaders($authHeader)->getJson("/api/v1/vault-entries/{$id}");
        $show->assertStatus(200);
        $this->assertEquals('S3cret!Pass', $show->json('password'));

        // Update
        $update = $this->withHeaders($authHeader)->putJson("/api/v1/vault-entries/{$id}", [
            'site_name' => 'example.org',
        ]);

        $update->assertStatus(200);
        $this->assertEquals('example.org', $update->json('site_name'));

        // Delete
        $delete = $this->withHeaders($authHeader)->deleteJson("/api/v1/vault-entries/{$id}");
        $delete->assertStatus(204);

        $showAfter = $this->withHeaders($authHeader)->getJson("/api/v1/vault-entries/{$id}");
        $showAfter->assertStatus(404);
    }
}
