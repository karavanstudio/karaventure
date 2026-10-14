import type { Category } from "@/types/category";
import type { Place } from "@/types/place";
import PlaceForm from "../place-form";
import EditHeader from "./edit-header";

interface EditIndexProps {
    place: Place;
    categories: Category[];
}

export default function EditIndex({
    place,
    categories,
}: EditIndexProps) {
    return (
        <div className="p-4">
            <EditHeader />
            <PlaceForm place={place} categories={categories} />
        </div>
    )
}