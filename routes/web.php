<?php

use App\Http\Controllers\ChatbotController;
use App\Http\Controllers\ExploreController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PlaceController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;
use Inertia\Inertia;

// Route::inertia('/', 'welcome', [
//     'canRegister' => Features::enabled(Features::registration()),
// ])->name('home');

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/about', function() {
    return Inertia::render('about');
})->name('about');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

Route::controller(ChatbotController::class)->group(function () {
    Route::get('/chatbot', 'index')->name('chatbot');
    Route::post('/chatbot/store', 'store')->name('chatbot.store');
});

Route::controller(ExploreController::class)->group(function() {
    Route::get('/explore', 'index')->name('explore');
});

Route::controller(PlaceController::class)->group(function () {
    Route::get('/place/{place}', 'detail')->name('place');
});

Route::prefix('admin')->group(function() {
    Route::controller(PlaceController::class)->group(function() {
        Route::get('/place', 'index')->name('place.index');
        Route::get('/place/create', 'create')->name('place.create');
    });
});

require __DIR__.'/settings.php';
