<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Place\Place;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ExploreController extends Controller
{
    public function index(Request $request) {
        $places = Place::with([
            'category',
            'placeImages',
            'robloxImages',
        ])
        ->where('is_hidden', false)
        ->latest()
        ->get();
        $categories = Category::all();

        return Inertia::render('explore', [
            'places' => $places,
            'categories' => $categories,
            'selectedCategory' => $request->integer('category') ?: null,
            'showTrending' => $request->boolean('trending'),
            'query' => $request->string('query') ?: '',
        ]);
    }
}
