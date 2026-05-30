<?php

namespace App\Services;

use RuntimeException;

class EncryptionService
{
    public function encrypt(string $plainText): string
    {
        $key = $this->keyMaterial();
        $iv = random_bytes(12);
        $tag = '';

        $cipherText = openssl_encrypt(
            $plainText,
            'aes-256-gcm',
            $key,
            OPENSSL_RAW_DATA,
            $iv,
            $tag,
            '',
            16,
        );

        if ($cipherText === false) {
            throw new RuntimeException('Unable to encrypt payload.');
        }

        return base64_encode(json_encode([
            'iv' => base64_encode($iv),
            'tag' => base64_encode($tag),
            'payload' => base64_encode($cipherText),
        ], JSON_THROW_ON_ERROR));
    }

    public function decrypt(string $payload): string
    {
        $key = $this->keyMaterial();
        $decoded = json_decode(base64_decode($payload, true), true, 512, JSON_THROW_ON_ERROR);

        $plainText = openssl_decrypt(
            base64_decode($decoded['payload'], true),
            'aes-256-gcm',
            $key,
            OPENSSL_RAW_DATA,
            base64_decode($decoded['iv'], true),
            base64_decode($decoded['tag'], true),
        );

        if ($plainText === false) {
            throw new RuntimeException('Unable to decrypt payload.');
        }

        return $plainText;
    }

    private function keyMaterial(): string
    {
        $appKey = config('app.key');

        if (! is_string($appKey) || $appKey === '') {
            throw new RuntimeException('Application key is not configured.');
        }

        $rawKey = str_starts_with($appKey, 'base64:')
            ? base64_decode(substr($appKey, 7), true)
            : $appKey;

        if (! is_string($rawKey) || strlen($rawKey) !== 32) {
            throw new RuntimeException('Application key must resolve to 32 bytes for AES-256-GCM.');
        }

        return $rawKey;
    }
}