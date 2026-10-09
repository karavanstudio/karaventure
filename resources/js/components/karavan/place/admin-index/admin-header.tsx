import { Link } from "@inertiajs/react";
import { Plus } from "lucide-react";
import { create } from "@/routes/place";

export default function AdminHeader() {
    return (
        <div className="flex justify-between items-center gap-2">
            <div className='flex flex-col items-start'>
                <h1 className="text-3xl font-bold">
                    Place Settings
                </h1>
                <p className="text-muted-foreground">
                    Manage place in karaventure website
                </p>
            </div>
            <div className="flex items-center gap-4">
                <Link
                    href={create()}
                    className="
                        flex gap-2
                        items-center justify-center
                        bg-white
                        border border-white
                        py-2 px-4 rounded-md
                        text-black text-sm font-medium
                        hover:bg-black
                        hover:text-white
                        transition-colors duration-200
                        cursor-pointer
                    "
                >
                    <Plus className='size-5 pb-0.5' />
                    Add Place
                </Link>
            </div>
        </div>
    )
}