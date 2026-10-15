import EditIndex from "@/components/karavan/place/admin-edit/edit-index";
import { index, edit } from "@/routes/place";
import type { Category } from "@/types/category";
import type { Place } from "@/types/place";

interface PlaceEditProps {
    place: Place;
    categories: Category[];
    githubToken: string;
}

export default function PlaceEdit({
    place,
    categories,
    githubToken
}: PlaceEditProps) {
    return (
        <EditIndex
            place={place}
            categories={categories}
            githubToken={githubToken}
        />
    )
}

PlaceEdit.layout = (page: PlaceEditProps) => ({
    breadcrumbs: [
        {
            title: 'Place',
            href: index(),
        },
        {
            title: 'Edit',
            href: edit(page.place.id),
        },
    ],
});