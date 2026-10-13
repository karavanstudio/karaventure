import type { Place } from "@/types/place";
import AdminHeader from "./admin-header";
import PlacesCard from "./places-card";

interface AdminIndexProps {
    places: Place[];
}

export default function AdminIndex({
    places,
}: AdminIndexProps) {
    return (
        <div className="flex flex-col gap-6">
            <AdminHeader />
            <PlacesCard places={places} />
        </div>
    )
}