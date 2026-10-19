<?php

use App\Http\Controllers\AnalyticController;

Route::controller(AnalyticController::class)->group(function() {
    Route::prefix('/api')->group(function() {
        Route::post('/analytics/visit', 'trackVisit')->name('analytics.visit');
        Route::post('/analytics/place', 'trackPlaceClick')->name('analytics.place');
    });
});