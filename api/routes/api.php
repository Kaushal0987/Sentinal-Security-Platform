<?php

use App\Http\Controllers\Api\HealthController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::get('health', HealthController::class);

    Route::prefix('auth')->group(function () {
        Route::post('login', fn () => response()->json(['message' => 'Not implemented yet'], 501));
        Route::post('register', fn () => response()->json(['message' => 'Not implemented yet'], 501));
        Route::post('logout', fn () => response()->json(['message' => 'Not implemented yet'], 501));
        Route::get('me', fn () => response()->json(['message' => 'Not implemented yet'], 501));
    });

    Route::get('dashboard/summary', fn () => response()->json(['message' => 'Not implemented yet'], 501));

    Route::prefix('vault-entries')->group(function () {
        Route::get('/', fn () => response()->json(['message' => 'Not implemented yet'], 501));
        Route::post('/', fn () => response()->json(['message' => 'Not implemented yet'], 501));
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