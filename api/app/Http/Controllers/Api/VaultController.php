<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Vault\StoreVaultEntryRequest;
use App\Http\Requests\Vault\UpdateVaultEntryRequest;
use App\Services\VaultService;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class VaultController extends Controller
{
    public function __construct(private VaultService $vault)
    {
    }

    public function index(Request $request)
    {
        $user = $request->user();
        $search = $request->query('q');

        return response()->json($this->vault->listForUser($user, $search));
    }

    public function store(StoreVaultEntryRequest $request)
    {
        $user = $request->user();

        $entry = $this->vault->createForUser($user, $request->validated());

        return response()->json($entry, Response::HTTP_CREATED);
    }

    public function show(Request $request, int $id)
    {
        $user = $request->user();

        $entry = $this->vault->getForUser($user, $id);

        if (! $entry) {
            return response()->json(['message' => 'Not found'], Response::HTTP_NOT_FOUND);
        }

        return response()->json($entry);
    }

    public function update(UpdateVaultEntryRequest $request, int $id)
    {
        $user = $request->user();

        $entry = $this->vault->updateForUser($user, $id, $request->validated());

        if (! $entry) {
            return response()->json(['message' => 'Not found'], Response::HTTP_NOT_FOUND);
        }

        return response()->json($entry);
    }

    public function destroy(Request $request, int $id)
    {
        $user = $request->user();

        $ok = $this->vault->deleteForUser($user, $id);

        if (! $ok) {
            return response()->json(['message' => 'Not found'], Response::HTTP_NOT_FOUND);
        }

        return response()->noContent();
    }
}
