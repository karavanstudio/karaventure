import CreateIndex from "@/components/karavan/place/admin-create/create-index";
import { index, create } from "@/routes/place";
import type { Category } from "@/types/category";

interface PlaceCreateProps {
    categories: Category[];
    githubToken: string;
}

export default function PlaceCreate({
    categories,
    githubToken,
}: PlaceCreateProps) {
    return (
        <CreateIndex categories={categories} githubToken={githubToken} />
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