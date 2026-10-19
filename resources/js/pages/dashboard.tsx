import { Head } from '@inertiajs/react';
import DashboardIndex from '@/components/karavan/dashboard/dashboard-index';
import { dashboard } from '@/routes';

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

interface DashboardProps {
    rawAnalytics: AnalyticItem[];
    summary: {
        total_page_views: number;
        total_place_clicks: number;
        unique_visitors: number;
    };
}

export default function Dashboard({
    rawAnalytics,
    summary,
}: DashboardProps) {
    return (
        <>
            <Head title="Dashboard" />
            <div className="p-4">
                <DashboardIndex rawAnalytics={rawAnalytics} summary={summary} />
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
