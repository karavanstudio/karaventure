import type { Category } from "@/types/category";
import PlaceForm from "../place-form";
import CreateHeader from "./create-header";

interface PlaceCreateProps {
    categories: Category[];
    githubToken: string;
}

export default function CreateIndex({
    categories,
    githubToken,
}: PlaceCreateProps) {
    return (
        <div className="p-4">
            <CreateHeader />
            <PlaceForm categories={categories} githubToken={githubToken} />
        </div>
    )
}