import AdminIndex from "@/components/karavan/place/admin-index/admin-index";
import { index } from "@/routes/place";

export default function Place() {
    return (
        <div className="p-4">
            <AdminIndex />
        </div>
    )
}

Place.layout = {
    breadcrumbs: [
        {
            title: 'Place',
            href: index(),
        },
    ],
};