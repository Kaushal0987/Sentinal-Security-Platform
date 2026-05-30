<?php

namespace App\Services;

use App\Models\VaultEntry;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class VaultService
{
    public function __construct(private EncryptionService $encryption)
    {
    }

    /**
     * List vault entries for a user, optional search.
     *
     * @return \Illuminate\Support\Collection|array
     */
    public function listForUser($user, ?string $search = null)
    {
        $query = VaultEntry::where('user_id', $user->id);

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('site_name', 'ilike', "%{$search}%")
                    ->orWhere('account_username', 'ilike', "%{$search}%");
            });
        }

        $entries = $query->orderBy('created_at', 'desc')->get();

        return $entries->map(fn (VaultEntry $e) => $this->decryptEntry($e));
    }

    public function getForUser($user, int $id): ?array
    {
        $entry = VaultEntry::where('user_id', $user->id)->find($id);

        return $entry ? $this->decryptEntry($entry) : null;
    }

    public function createForUser($user, array $data): array
    {
        $payload = [
            'user_id' => $user->id,
            'site_name' => $data['site_name'],
            'account_username' => $data['account_username'] ?? null,
            'encrypted_password' => $this->encryption->encrypt($data['password'] ?? ''),
            'encrypted_notes' => isset($data['notes']) ? $this->encryption->encrypt($data['notes']) : null,
            'is_favorite' => $data['is_favorite'] ?? false,
            'password_strength_score' => $data['password_strength_score'] ?? 0,
            'two_fa_enabled' => $data['two_fa_enabled'] ?? false,
            'encrypted_recovery_codes' => isset($data['recovery_codes']) ? $this->encryption->encrypt($data['recovery_codes']) : null,
        ];

        $entry = VaultEntry::create($payload);

        return $this->decryptEntry($entry);
    }

    public function updateForUser($user, int $id, array $data): ?array
    {
        $entry = VaultEntry::where('user_id', $user->id)->find($id);

        if (! $entry) {
            return null;
        }

        $up = [];

        if (array_key_exists('site_name', $data)) {
            $up['site_name'] = $data['site_name'];
        }

        if (array_key_exists('account_username', $data)) {
            $up['account_username'] = $data['account_username'];
        }

        if (array_key_exists('password', $data)) {
            $up['encrypted_password'] = $this->encryption->encrypt($data['password'] ?? '');
        }

        if (array_key_exists('notes', $data)) {
            $up['encrypted_notes'] = $data['notes'] ? $this->encryption->encrypt($data['notes']) : null;
        }

        if (array_key_exists('is_favorite', $data)) {
            $up['is_favorite'] = (bool) $data['is_favorite'];
        }

        if (array_key_exists('two_fa_enabled', $data)) {
            $up['two_fa_enabled'] = (bool) $data['two_fa_enabled'];
        }

        if (array_key_exists('password_strength_score', $data)) {
            $up['password_strength_score'] = (int) $data['password_strength_score'];
        }

        if (array_key_exists('recovery_codes', $data)) {
            $up['encrypted_recovery_codes'] = $data['recovery_codes'] ? $this->encryption->encrypt($data['recovery_codes']) : null;
        }

        $entry->update($up);

        return $this->decryptEntry($entry->fresh());
    }

    public function deleteForUser($user, int $id): bool
    {
        $entry = VaultEntry::where('user_id', $user->id)->find($id);

        if (! $entry) {
            return false;
        }

        return (bool) $entry->delete();
    }

    private function decryptEntry(VaultEntry $entry): array
    {
        return [
            'id' => $entry->id,
            'site_name' => $entry->site_name,
            'account_username' => $entry->account_username,
            'password' => $entry->encrypted_password ? $this->encryption->decrypt($entry->encrypted_password) : null,
            'notes' => $entry->encrypted_notes ? $this->encryption->decrypt($entry->encrypted_notes) : null,
            'is_favorite' => (bool) $entry->is_favorite,
            'password_strength_score' => $entry->password_strength_score,
            'two_fa_enabled' => (bool) $entry->two_fa_enabled,
            'recovery_codes' => $entry->encrypted_recovery_codes ? $this->encryption->decrypt($entry->encrypted_recovery_codes) : null,
            'created_at' => $entry->created_at?->toDateTimeString(),
            'updated_at' => $entry->updated_at?->toDateTimeString(),
        ];
    }
}
