'use client';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import type { ChartOptions } from 'chart.js';
import { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import type { AnalyticItem } from './dashboard-content';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
);

interface PlaceAnalyticsChartProps {
    data: AnalyticItem[];
}

export default function PlaceAnalyticsChart({ data }: PlaceAnalyticsChartProps) {
    const chartData = useMemo(() => {
        const placeMap: Record<string, { name: string; clicks: number }> = {};

        data.forEach((item) => {
            if (!item.place_id || !item.place?.name || item.type !== 'place_click') {
                return;
            }

            const placeName = item.place.name;

            if (!placeMap[placeName]) {
                placeMap[placeName] = {
                    name: placeName,
                    clicks: 0,
                };
            }

            placeMap[placeName].clicks += 1;
        });

        const places = Object.values(placeMap);
        const labels = places.map((p) => p.name);

        return {
            labels,
            datasets: [
                {
                    label: 'Tempat yang dicari',
                    data: places.map((p) => p.clicks),
                    backgroundColor: '#f59e0b',
                    borderRadius: 8,
                    borderSkipped: false,
                },
            ],
        };
    }, [data]);

    const options: ChartOptions<'bar'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: '#a1a1aa',
                    font: {
                        family: 'inherit',
                        size: 12,
                    },
                },
            },
            tooltip: {
                backgroundColor: '#27272a',
                titleColor: '#f4f4f5',
                bodyColor: '#e4e4e7',
                borderColor: '#3f3f46',
                borderWidth: 1,
                padding: 10,
                cornerRadius: 8,
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
        <div className="space-y-4 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
            <div>
                <h2 className="text-lg font-semibold">
                    Analitik Klik Tempat
                </h2>
                <p className="text-xs text-zinc-400">
                    Jumlah Klik Pengunjung Berdasarkan Nama Tempat
                </p>
            </div>

            {chartData.labels.length === 0 ? (
                <div className="flex h-64 items-center justify-center text-sm text-zinc-500">
                    Tidak ada data klik tempat yang terdeteksi pada periode ini.
                </div>
            ) : (
                <div className="h-72 w-full pt-4">
                    <Bar data={chartData} options={options} />
                </div>
            )}
        </div>
    );
}