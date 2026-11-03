<?php

use App\Http\Controllers\Api\AssignmentController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ClassController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\MaterialController;
use App\Http\Controllers\Api\WorkspaceController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| LYORA RESTful API Routes (v1)
|--------------------------------------------------------------------------
*/

Route::prefix('v1')->group(function () {
    // Public Auth
    Route::post('/auth/register', [AuthController::class, 'register']);
    Route::post('/auth/login', [AuthController::class, 'login']);

    // Authenticated Routes
    Route::middleware('auth:sanctum')->group(function () {
        // Auth & Identity
        Route::get('/auth/me', [AuthController::class, 'me']);
        Route::post('/auth/logout', [AuthController::class, 'logout']);

        // Dashboard Stats (Contextual per role)
        Route::get('/dashboard/stats', [DashboardController::class, 'stats']);

        // Workspaces
        Route::get('/workspaces', [WorkspaceController::class, 'index']);
        Route::post('/workspaces', [WorkspaceController::class, 'store']);
        Route::get('/workspaces/{id}', [WorkspaceController::class, 'show']);

        // Classes
        Route::get('/workspaces/{workspace_id}/classes', [ClassController::class, 'index']);
        Route::post('/workspaces/{workspace_id}/classes', [ClassController::class, 'store']);
        Route::get('/classes', [ClassController::class, 'index']);
        Route::get('/classes/{id}', [ClassController::class, 'show']);
        Route::post('/classes/join', [ClassController::class, 'join']);

        // Learning Materials
        Route::get('/classes/{class_id}/materials', [MaterialController::class, 'index']);
        Route::post('/classes/{class_id}/materials', [MaterialController::class, 'store']);

        // Assignments
        Route::get('/classes/{class_id}/assignments', [AssignmentController::class, 'index']);
        Route::post('/classes/{class_id}/assignments', [AssignmentController::class, 'store']);
    });
});
