<?php

namespace Tests\Unit;

use App\Services\EncryptionService;
use Tests\TestCase;

class EncryptionServiceTest extends TestCase
{
    public function test_it_encrypts_and_decrypts_payloads_symmetrically(): void
    {
        $service = app(EncryptionService::class);

        $cipherText = $service->encrypt('vault-secret-value');
        $plainText = $service->decrypt($cipherText);

        $this->assertSame('vault-secret-value', $plainText);
    }
}