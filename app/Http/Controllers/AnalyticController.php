<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\Analytic;
use Inertia\Inertia;
use Carbon\Carbon;

class AnalyticController extends Controller
{
    public function trackVisit(Request $request)
    {
        Analytic::create([
            'place_id'   => null,
            'type'       => 'page_view',
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return response()->json(['status' => 'success']);
    }

    public function trackPlaceClick(Request $request)
    {
        $validated = $request->validate([
            'place_id' => 'required|exists:places,id',
        ]);

        Analytic::create([
            'place_id'   => $validated['place_id'],
            'type'       => 'place_click',
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return response()->json(['status' => 'success']);
    }

    public function dashboard() {
        $analytics = Analytic::with('place:id,name')
            ->where('created_at', '>=', Carbon::now()->subYear())
            ->get(['id', 'place_id', 'type', 'created_at']);

        $summary = [
            'total_page_views'     => $analytics->where('type', 'page_view')->count(),
            'total_place_clicks'   => $analytics->where('type', 'place_click')->count(),
            'unique_visitors'      => Analytic::where('type', 'page_view')->distinct('ip_address')->count('ip_address'),
        ];

        return Inertia::render('dashboard', [
            'rawAnalytics' => $analytics,
            'summary'      => $summary,
        ]);   
    }
}
