<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Place\Place;

class Analytic extends Model
{
    protected $table = 'analytics';
    protected $fillable = [
        'place_id',
        'type',
        'ip_address',
        'user_agent',
    ];

    public function place() {
        return $this->belongsTo(Place::class, 'place_id');
    }
}
