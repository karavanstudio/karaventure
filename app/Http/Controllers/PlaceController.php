<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Place\Place;
use App\Models\Place\PlaceImage;
use App\Models\Place\RobloxImage;

use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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
        $places = Place::with([
            'category',
            'placeImages',
            'robloxImages',
        ])
        ->orderBy('id', 'desc')
        ->get();
        return Inertia::render('admin/place', [
            'places' => $places,
        ]);
    }

    public function create() {
        $categories = Category::all();

        return Inertia::render('admin/places/create', [
            'categories' => $categories,
        ]);
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'category_id'    => 'required|exists:categories,id',
            'name'           => 'required|string|max:255',
            'tagline'        => 'nullable|string|max:255',
            'description'    => 'required|string',
            'tags'           => 'nullable|array',
            'avg_rating'     => 'nullable|numeric|min:0|max:5',
            'address'        => 'required|string',
            'district'       => 'nullable|string|max:255',
            'hours'          => 'nullable|string|max:255',
            'lat'            => 'nullable|numeric',
            'lng'            => 'nullable|numeric',
            'is_featured'    => 'boolean',
            'is_trending'    => 'boolean',
            'is_hidden'      => 'boolean',

            'main_image'     => 'nullable|string|url',
            'gallery_images' => 'nullable|array',
            'gallery_images.*' => 'string|url',
            'roblox_image'   => 'nullable|string|url',
        ]);

        DB::transaction(function () use ($validated, $request) {
            $slug = Str::slug($validated['name']);
            $originalSlug = $slug;
            $count = 1;

            while (Place::where('slug', $slug)->exists()) {
                $slug = "{$originalSlug}-{$count}";
                $count++;
            }

            $place = Place::create([
                'category_id' => $validated['category_id'],
                'name'        => $validated['name'],
                'slug'        => $slug,
                'tagline'     => $validated['tagline'] ?? null,
                'description' => $validated['description'],
                'tags'        => $validated['tags'] ?? [],
                'avg_rating'  => $validated['avg_rating'] ?? 0,
                'address'     => $validated['address'],
                'district'    => $validated['district'] ?? null,
                'hours'       => $validated['hours'] ?? null,
                'lat'         => $validated['lat'] ?? null,
                'lng'         => $validated['lng'] ?? null,
                'is_featured' => $request->boolean('is_featured'),
                'is_trending' => $request->boolean('is_trending'),
                'is_hidden'   => $request->boolean('is_hidden'),
            ]);

            if (!empty($validated['main_image'])) {
                PlaceImage::create([
                    'place_id' => $place->id,
                    'image'    => $validated['main_image'],
                ]);
            }

            if (!empty($validated['gallery_images'])) {
                foreach ($validated['gallery_images'] as $galleryUrl) {
                    PlaceImage::create([
                        'place_id' => $place->id,
                        'image'    => $galleryUrl,
                    ]);
                }
            }

            if (!empty($validated['roblox_image'])) {
                RobloxImage::create([
                    'place_id' => $place->id,
                    'image'    => $validated['roblox_image'],
                ]);
            }
        });

        return redirect()->route('place.index')->with('success', 'Place berhasil ditambahkan!');
    }

    public function edit(Place $place) {
        $place->load([
            'category',
            'placeImages',
            'robloxImages',
        ]);
        $categories = Category::all();

        return Inertia::render('admin/places/edit', [
            'place' => $place,
            'categories' => $categories,
        ]);
    }

    public function update(Request $request, Place $place) {
        $validated = $request->validate([
            'category_id'      => 'required|exists:categories,id',
            'name'             => 'required|string|max:255',
            'tagline'          => 'nullable|string|max:255',
            'description'      => 'required|string',
            'tags'             => 'nullable|array',
            'avg_rating'       => 'nullable|numeric|min:0|max:5',
            'address'          => 'required|string',
            'district'         => 'nullable|string|max:255',
            'hours'            => 'nullable|string|max:255',
            'lat'              => 'nullable|numeric',
            'lng'              => 'nullable|numeric',
            'is_featured'      => 'boolean',
            'is_trending'      => 'boolean',
            'is_hidden'        => 'boolean',

            'main_image'       => 'nullable|string|url',
            'gallery_images'   => 'nullable|array',
            'gallery_images.*' => 'string|url',
            'roblox_image'     => 'nullable|string|url',
        ]);

        DB::transaction(function () use ($validated, $request, $place) {
            if ($place->name !== $validated['name']) {
                $slug = Str::slug($validated['name']);
                $originalSlug = $slug;
                $count = 1;

                while (Place::where('slug', $slug)->where('id', '!=', $place->id)->exists()) {
                    $slug = "{$originalSlug}-{$count}";
                    $count++;
                }
            } else {
                $slug = $place->slug;
            }

            $place->update([
                'category_id' => $validated['category_id'],
                'name'        => $validated['name'],
                'slug'        => $slug,
                'tagline'     => $validated['tagline'] ?? null,
                'description' => $validated['description'],
                'tags'        => $validated['tags'] ?? [],
                'avg_rating'  => $validated['avg_rating'] ?? 0,
                'address'     => $validated['address'],
                'district'    => $validated['district'] ?? null,
                'hours'       => $validated['hours'] ?? null,
                'lat'         => $validated['lat'] ?? null,
                'lng'         => $validated['lng'] ?? null,
                'is_featured' => $request->boolean('is_featured'),
                'is_trending' => $request->boolean('is_trending'),
                'is_hidden'   => $request->boolean('is_hidden'),
            ]);

            $place->placeImages()->delete();

            if (!empty($validated['main_image'])) {
                PlaceImage::create([
                    'place_id' => $place->id,
                    'image'    => $validated['main_image'],
                ]);
            }

            if (!empty($validated['gallery_images'])) {
                foreach ($validated['gallery_images'] as $galleryUrl) {
                    PlaceImage::create([
                        'place_id' => $place->id,
                        'image'    => $galleryUrl,
                    ]);
                }
            }

            $place->robloxImages()->delete();

            if (!empty($validated['roblox_image'])) {
                RobloxImage::create([
                    'place_id' => $place->id,
                    'image'    => $validated['roblox_image'],
                ]);
            }
        });

        return redirect()->route('place.index')->with('success', 'Place berhasil diperbarui!');
    }

    public function destroy(Place $place) {
        $place->delete();

        return redirect()->route('place.index')->with('success', 'Place berhasil dihapus!');
    }
}
