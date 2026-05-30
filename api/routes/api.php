<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\HealthController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::get('health', HealthController::class);

    Route::prefix('auth')->group(function () {
        Route::post('register', [AuthController::class, 'register']);
        Route::post('login', [AuthController::class, 'login']);

        Route::middleware('auth:sanctum')->group(function () {
            Route::post('logout', [AuthController::class, 'logout']);
            Route::get('me', [AuthController::class, 'me']);
        });
    });

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('dashboard/summary', fn () => response()->json(['message' => 'Not implemented yet'], 501));

        Route::prefix('vault-entries')->group(function () {
            Route::get('/', [\App\Http\Controllers\Api\VaultController::class, 'index']);
            Route::post('/', [\App\Http\Controllers\Api\VaultController::class, 'store']);
            Route::get('/{id}', [\App\Http\Controllers\Api\VaultController::class, 'show']);
            Route::put('/{id}', [\App\Http\Controllers\Api\VaultController::class, 'update']);
            Route::patch('/{id}', [\App\Http\Controllers\Api\VaultController::class, 'update']);
            Route::delete('/{id}', [\App\Http\Controllers\Api\VaultController::class, 'destroy']);
        });

        Route::prefix('devices')->group(function () {
            Route::get('/', fn () => response()->json(['message' => 'Not implemented yet'], 501));
            Route::post('/', fn () => response()->json(['message' => 'Not implemented yet'], 501));
        });

        Route::prefix('login-events')->group(function () {
            Route::get('recent', fn () => response()->json(['message' => 'Not implemented yet'], 501));
            Route::get('failed', fn () => response()->json(['message' => 'Not implemented yet'], 501));
        });

        Route::get('notifications', fn () => response()->json(['message' => 'Not implemented yet'], 501));
    });
});