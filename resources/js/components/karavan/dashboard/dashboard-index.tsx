import DashboardContent from "./dashboard-content";
import DashboardHeader from "./dashboard-header";

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

interface DashboardIndexProps {
    rawAnalytics: AnalyticItem[];
    summary: {
        total_page_views: number;
        total_place_clicks: number;
        unique_visitors: number;
    };
}

export default function DashboardIndex({
    rawAnalytics,
    summary,
}: DashboardIndexProps) {
    return (
        <>
            <DashboardHeader />
            <DashboardContent rawAnalytics={rawAnalytics} summary={summary} />
        </>
    )
}