<?php

namespace App\Http\Controllers;

use App\Models\Place\Place;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PlaceController extends Controller
{
    public function detail(Place $place) {
        $place->load([
            'category',
            'placeImages',
            'robloxImages',
        ]);
        
        $relatedPlaces = Place::with([
            'category',
            'placeImages',
            'robloxImages',
        ])
        ->whereKeyNot($place->id)
        ->inRandomOrder()
        ->take(3)
        ->get();
        
        return Inertia::render('place/place-index', [
            'place' => $place,
            'relatedPlaces' => $relatedPlaces,
        ]);
    }

    // admin site
    public function index() {
        return Inertia::render('admin/place');
    }

    public function create() {
        return Inertia::render('admin/places/create');
    }
}
