<?php

namespace App\Models\Place;

use App\Models\Analytic;
use App\Models\Category;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;

class Place extends Model
{
    protected $table = 'places';
    protected $fillable = [
        'category_id',
        'name',
        'slug',
        'tagline',
        'description',
        'tags',
        'avg_rating',
        'address',
        'district',
        'hours',
        'lat',
        'lng',
        'is_featured',
        'is_trending',
        'is_hidden',
    ];

    protected $casts = [
        'tags' => 'array',
        'is_featured' => 'boolean',
        'is_trending' => 'boolean',
        'is_hidden' => 'boolean',
    ];

    protected static function booted(): void
    {
        static::creating(function ($place) {
            if (! empty($place->slug)) {
                return;
            }

            $slug = Str::slug($place->name);
            $originalSlug = $slug;
            $count = 1;

            while (static::where('slug', $slug)->exists()) {
                $slug = "{$originalSlug}-{$count}";
                $count++;
            }
            $place->slug = $slug;
        });
    }

    public function category() {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function placeImages() {
        return $this->hasMany(PlaceImage::class, 'place_id');
    }

    public function robloxImages() {
        return $this->hasMany(RobloxImage::class, 'place_id');
    }

    public function analytics() {
        return $this->hasMany(Analytic::class, 'place_id');
    }
}
