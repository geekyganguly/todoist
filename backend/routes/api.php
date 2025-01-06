<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Config;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ProjectUserController;
use App\Http\Controllers\TaskController;

Route::middleware('guest')->group(function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);

    // forgot & reset password
    Route::post('forgot-password', [AuthController::class, 'forgotPassword']);
    Route::post('reset-password', [AuthController::class, 'resetPassword']);

    // forgot password redirect
    Route::get('reset-password/{token}', function (Request $request, string $token) {
        $frontendURL = Config::get('app.frontend_url');
        $queryParams = http_build_query($request->query());
        return redirect()->away($frontendURL . '/reset-password/' . $token . '?' . $queryParams);
    })->name('password.reset');

    // email verification redirect
    Route::get('email/verify/{id}/{hash}', function (Request $request, string $id, string $hash) {
        $frontendURL = Config::get('app.frontend_url');
        $queryParams = http_build_query($request->query());
        return redirect()->away($frontendURL . '/email/verify/' . $id . '/' . $hash . '?' . $queryParams);
    })->name('verification.verify');
});


Route::middleware('auth:sanctum')->group(function () {
    // email verification
    Route::post('email/request-verification', [AuthController::class, 'sendVerificationEmail']);
    Route::post('email/verify', [AuthController::class, 'verifyEmail']);

    Route::get('me', [AuthController::class, 'getProfile']);
    Route::put('me', [AuthController::class, 'updateProfile']);
    Route::delete('logout', [AuthController::class, 'logout']);
    Route::post('change-password', [AuthController::class, 'changePassword']);
    Route::get('users/search/{query}', [UserController::class, 'search']);

    Route::apiResource('projects', ProjectController::class);
    Route::apiResource('projects.tasks', TaskController::class);
    Route::apiResource('projects.users', ProjectUserController::class);
});
