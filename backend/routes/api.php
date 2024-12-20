<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\SharedProjectController;
use App\Http\Controllers\TaskController;

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('me', [AuthController::class, 'getProfile']);
    Route::put('me', [AuthController::class, 'updateProfile']);
    Route::delete('logout', [AuthController::class, 'logout']);
    Route::post('change-password', [AuthController::class, 'changePassword']);
    Route::get('users/search/{query}', [UserController::class, 'search']);

    Route::apiResource('projects', ProjectController::class);
    Route::apiResource('projects.tasks', TaskController::class);
    Route::apiResource('projects.sharing', SharedProjectController::class);
});
