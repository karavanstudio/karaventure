import { Users, MousePointerClick, Eye, Calendar } from 'lucide-react';
import { useState, useMemo } from 'react';
import DailyPageViewsChart from './daily-page-view-chart';
import PlaceAnalyticsChart from './place-analytics-chart';

export interface AnalyticItem {
    id: number;
    place_id: number | null;
    type: 'page_view' | 'place_click';
    created_at: string;
    place?: {
        id: number;
        name: string;
    } | null;
}

interface DashboardContentProps {
    rawAnalytics: AnalyticItem[];
    summary: {
        total_page_views: number;
        total_place_clicks: number;
        unique_visitors: number;
    };
}

type FilterRange =
    | 'today'
    | '3days'
    | 'weekly'
    | 'monthly'
    | '3months'
    | '6months'
    | 'yearly';

export default function DashboardContent({
    rawAnalytics = [],
    summary,
}: DashboardContentProps) {
    const [range, setRange] = useState<FilterRange>('monthly');

    const filteredData = useMemo(() => {
        const now = new Date();
        const cutoff = new Date();

        switch (range) {
            case 'today':
                cutoff.setHours(0, 0, 0, 0);
                break;
            case '3days':
                cutoff.setDate(now.getDate() - 3);
                break;
            case 'weekly':
                cutoff.setDate(now.getDate() - 7);
                break;
            case 'monthly':
                cutoff.setMonth(now.getMonth() - 1);
                break;
            case '3months':
                cutoff.setMonth(now.getMonth() - 3);
                break;
            case '6months':
                cutoff.setMonth(now.getMonth() - 6);
                break;
            case 'yearly':
                cutoff.setFullYear(now.getFullYear() - 1);
                break;
        }

        return rawAnalytics.filter(
            (item) => new Date(item.created_at) >= cutoff,
        );
    }, [rawAnalytics, range]);

    // const chartData = useMemo(() => {
    //     const dateMap: Record<
    //         string,
    //         { date: string; page_views: number; place_clicks: number }
    //     > = {};

    //     filteredData.forEach((item) => {
    //         const dateStr = new Date(item.created_at).toLocaleDateString(
    //             'id-ID',
    //             {
    //                 day: '2-digit',
    //                 month: 'short',
    //             },
    //         );

    //         if (!dateMap[dateStr]) {
    //             dateMap[dateStr] = {
    //                 date: dateStr,
    //                 page_views: 0,
    //                 place_clicks: 0,
    //             };
    //         }

    //         if (item.type === 'page_view') {
    //             dateMap[dateStr].page_views += 1;
    //         } else if (item.type === 'place_click') {
    //             dateMap[dateStr].place_clicks += 1;
    //         }
    //     });

    //     return Object.values(dateMap);
    // }, [filteredData]);

    const filteredViews = filteredData.filter(
        (i) => i.type === 'page_view',
    ).length;
    const filteredClicks = filteredData.filter(
        (i) => i.type === 'place_click',
    ).length;
    // const maxVal = Math.max(
    //     ...chartData.map((d) => Math.max(d.page_views, d.place_clicks)),
    //     1,
    // );

    return (
        <>
            {/* Header & Filter Bar */}
            <div className="flex flex-col justify-between gap-4 border-b border-zinc-800 pb-6 sm:flex-row sm:items-center mt-6">
                <div className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 p-1.5">
                    <Calendar className="ml-2 size-4 text-zinc-400" />
                    <select
                        value={range}
                        onChange={(e) =>
                            setRange(e.target.value as FilterRange)
                        }
                        className="cursor-pointer border-none bg-transparent pr-4 text-sm font-medium focus:ring-0 focus:outline-none"
                    >
                        <option value="today" className="bg-zinc-900">
                            Hari Ini (Today)
                        </option>
                        <option value="3days" className="bg-zinc-900">
                            3 Hari Terakhir
                        </option>
                        <option value="weekly" className="bg-zinc-900">
                            Minggu Ini (7 Hari)
                        </option>
                        <option value="monthly" className="bg-zinc-900">
                            Bulan Ini (30 Hari)
                        </option>
                        <option value="3months" className="bg-zinc-900">
                            3 Bulan Terakhir
                        </option>
                        <option value="6months" className="bg-zinc-900">
                            6 Bulan Terakhir
                        </option>
                        <option value="yearly" className="bg-zinc-900">
                            1 Tahun Terakhir
                        </option>
                    </select>
                </div>
            </div>

            {/* Metric Cards */}
            <div className="grid gap-4 sm:grid-cols-3 my-4">
                <div className="space-y-2 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
                    <div className="flex items-center justify-between text-zinc-400">
                        <span className="text-sm font-medium">Kunjungan ke dalam Website</span>
                        <Eye className="size-4 text-blue-400" />
                    </div>
                    <div className="text-3xl font-bold">{filteredViews}</div>
                    <p className="text-xs text-zinc-500">
                        Tampilan halaman pada periode ini
                    </p>
                </div>

                <div className="space-y-2 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
                    <div className="flex items-center justify-between text-zinc-400">
                        <span className="text-sm font-medium">
                            Tempat diklik
                        </span>
                        <MousePointerClick className="size-4 text-amber-400" />
                    </div>
                    <div className="text-3xl font-bold">{filteredClicks}</div>
                    <p className="text-xs text-zinc-500">
                        Klik tempat pada periode ini
                    </p>
                </div>

                <div className="space-y-2 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
                    <div className="flex items-center justify-between text-zinc-400">
                        <span className="text-sm font-medium">
                            Total pengunjung unik
                        </span>
                        <Users className="size-4 text-emerald-400" />
                    </div>
                    <div className="text-3xl font-bold">
                        {summary?.unique_visitors ?? 0}
                    </div>
                    <p className="text-xs text-zinc-500">
                        Akumulasi IP unik terdeteksi
                    </p>
                </div>
            </div>

            <DailyPageViewsChart data={filteredData} />
            <PlaceAnalyticsChart data={filteredData} />
        </>
    );
}
