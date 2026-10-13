import type { Category } from "@/types/category";
import PlaceForm from "../place-form";
import CreateHeader from "./create-header";

interface PlaceCreateProps {
    categories: Category[];
}

export default function CreateIndex({
    categories,
}: PlaceCreateProps) {
    return (
        <div className="p-4">
            <CreateHeader />
            <PlaceForm categories={categories} />
        </div>
    )
}