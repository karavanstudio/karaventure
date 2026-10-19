'use client';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import type { ChartOptions, ScriptableLineSegmentContext } from 'chart.js';
import { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import type { AnalyticItem } from './dashboard-content';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
);

interface DailyPageViewsChartProps {
    data: AnalyticItem[];
}

export default function DailyPageViewsChart({
    data,
}: DailyPageViewsChartProps) {
    const chartData = useMemo(() => {
        const pageViewItems = data.filter((item) => item.type === 'page_view');
        const dateMap: Record<string, number> = {};

        const sortedData = [...pageViewItems].sort(
            (a, b) =>
                new Date(a.created_at).getTime() -
                new Date(b.created_at).getTime(),
        );

        sortedData.forEach((item) => {
            const dateStr = new Date(item.created_at).toLocaleDateString(
                'id-ID',
                {
                    day: '2-digit',
                    month: 'short',
                },
            );

            dateMap[dateStr] = (dateMap[dateStr] || 0) + 1;
        });

        const labels = Object.keys(dateMap);
        const values = Object.values(dateMap);

        return {
            labels,
            datasets: [
                {
                    label: 'Page Views Harian',
                    data: values,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    pointBackgroundColor: '#22c55e', // default point color
                    borderWidth: 2.5,
                    segment: {
                        borderColor: (ctx: ScriptableLineSegmentContext) => {
                            const p0 = ctx.p0.parsed.y ?? 0;
                            const p1 = ctx.p1.parsed.y ?? 0;

                            if (p1 < p0) {
                                return '#ef4444';
                            }

                            return '#22c55e';
                        },
                    },
                },
            ],
        };
    }, [data]);

    const options: ChartOptions<'line'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: '#27272a',
                titleColor: '#f4f4f5',
                bodyColor: '#e4e4e7',
                borderColor: '#3f3f46',
                borderWidth: 1,
                padding: 10,
                cornerRadius: 8,
                displayColors: false,
                callbacks: {
                    label: (context) => `Pengunjung: ${context.parsed.y}`,
                },
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: '#a1a1aa',
                    font: {
                        size: 11,
                    },
                },
            },
            y: {
                grid: {
                    color: '#27272a',
                },
                ticks: {
                    color: '#a1a1aa',
                    stepSize: 1,
                    precision: 0,
                },
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="space-y-4 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 mb-4">
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                <div>
                    <h2 className="text-lg font-semibold">
                        Tren Kunjungan Website (Page Views)
                    </h2>
                    <p className="text-xs text-zinc-400">
                        Frekuensi pengunjung membuka website per hari
                    </p>
                </div>

                <div className="flex items-center gap-4 text-xs font-medium">
                    <div className="flex items-center gap-1.5">
                        <span className="size-3 rounded-full bg-emerald-500" />
                        <span className="text-zinc-400">Naik / Tetap</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="size-3 rounded-full bg-red-500" />
                        <span className="text-zinc-400">Menurun</span>
                    </div>
                </div>
            </div>

            {chartData.labels.length === 0 ? (
                <div className="flex h-64 items-center justify-center text-sm text-zinc-500">
                    Tidak ada data page views pada periode ini.
                </div>
            ) : (
                <div className="h-72 w-full pt-4">
                    <Line data={chartData} options={options} />
                </div>
            )}
        </div>
    );
}
