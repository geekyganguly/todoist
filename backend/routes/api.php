<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Config;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\SharedProjectController;
use App\Http\Controllers\TaskController;

Route::middleware('guest')->group(function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);

    // forgot & reset password
    Route::post('forgot-password', [AuthController::class, 'forgotPassword']);
    Route::get('reset-password/{token}', function (Request $request, string $token) {
        $frontendURL = Config::get('app.frontend_url');
        $queryParams = http_build_query($request->all());
        return redirect()->away($frontendURL . '/reset-password/' . $token . '?' . $queryParams);
    })->name('password.reset');
    Route::post('reset-password', [AuthController::class, 'resetPassword']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('me', [AuthController::class, 'getProfile']);
    Route::put('me', [AuthController::class, 'updateProfile']);
    Route::delete('logout', [AuthController::class, 'logout']);
    Route::post('change-password', [AuthController::class, 'changePassword']);
    Route::get('users/search/{query}', [UserController::class, 'search']);

    Route::apiResource('projects', ProjectController::class);
    Route::apiResource('projects.tasks', TaskController::class);
    Route::apiResource('projects.share', SharedProjectController::class);
});
