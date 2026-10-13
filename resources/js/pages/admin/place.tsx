import AdminIndex from "@/components/karavan/place/admin-index/admin-index";
import { index } from "@/routes/place";
import type { Place } from "@/types/place";

interface PlaceProps {
    places: Place[];
}

export default function Place({
    places,
}: PlaceProps) {
    return (
        <div className="p-4">
            <AdminIndex places={places} />
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