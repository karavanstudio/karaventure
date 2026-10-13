import CreateIndex from "@/components/karavan/place/admin-create/create-index";
import { index, create } from "@/routes/place";
import type { Category } from "@/types/category";

interface PlaceCreateProps {
    categories: Category[];
}

export default function PlaceCreate({
    categories,
}: PlaceCreateProps) {
    return (
        <CreateIndex categories={categories} />
    )
}

PlaceCreate.layout = {
    breadcrumbs: [
        {
            title: 'Place',
            href: index(),
        },
        {
            title: 'Create',
            href: create(),
        },
    ],
};