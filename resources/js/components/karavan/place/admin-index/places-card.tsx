import { Link, router } from "@inertiajs/react";
import { Edit, Trash2, Star, MapPin, EyeOff, Flame, Sparkles, Loader2 } from "lucide-react";
import { useState } from "react";
import { deleteFromGithub } from "@/lib/github-upload";
import { edit, destroy } from "@/routes/place";
import type { Place } from "@/types/place";
import { showSuccessToast } from "@/lib/toast";

interface PlacesCardProps {
    places: Place[];
}

export default function PlacesCard({
    places,
}: PlacesCardProps) {
    const [deletingId, setDeletingId] = useState<number | null>(null);
    
    const handleDelete = async (place: Place) => {
        if (!confirm(`Are you sure you want to delete "${place.name}" and all its images?`)) {
            return;
        }

        setDeletingId(place.id);

        try {
            const allImageUrls: string[] = [
                ...(place.place_images?.map((img) => img.image) ?? []),
                ...(place.roblox_images?.map((img) => img.image) ?? []),
            ];

            for (const url of allImageUrls) {
                try {
                    await deleteFromGithub(url);
                } catch (err) {
                    console.error(`Gagal menghapus gambar: ${url}`, err);
                }
            }

            router.delete(destroy({ place: place.id }).url, {
                onFinish: () => setDeletingId(null),
                onSuccess: () => showSuccessToast('Success', 'Place deleted successfully!'),
            });
        } catch (error) {
            console.error("Gagal menghapus gambar dari GitHub:", error);
            alert("Terjadi kesalahan saat menghapus gambar dari GitHub.");
            setDeletingId(null);
        }
    };

    if (!places || places.length === 0) {
        return (
            <div className="w-full rounded-xl border border-white/20 bg-black p-8 text-center text-zinc-400">
                Belum ada data place yang tersedia.
            </div>
        );
    }

    return (
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {places.map((place) => {
                const mainImage = place.place_images?.[0]?.image || "/placeholder.jpg";
                const isDeletingThis = deletingId === place.id;
                console.log(mainImage);

                return (
                    <div
                        key={place.id}
                        className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-white/20 bg-black transition-all duration-300 hover:border-white/50"
                    >
                        <div>
                            {/* Image Container */}
                            <div className="relative aspect-video w-full overflow-hidden bg-zinc-900">
                                <img
                                    src={mainImage}
                                    alt={place.name}
                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />

                                {/* Category Badge */}
                                <div className="absolute left-3 top-3 rounded-md border border-white/20 bg-black/70 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-md">
                                    {place.category?.name || "Uncategorized"}
                                </div>

                                {/* Status Badges (Featured / Trending / Hidden) */}
                                <div className="absolute right-3 top-3 flex gap-1.5">
                                    {place.is_featured && (
                                        <span className="flex items-center gap-1 rounded-md bg-amber-500/80 px-2 py-1 text-[10px] font-semibold text-black backdrop-blur-md">
                                            <Sparkles className="size-3" /> Featured
                                        </span>
                                    )}
                                    {place.is_trending && (
                                        <span className="flex items-center gap-1 rounded-md bg-rose-500/80 px-2 py-1 text-[10px] font-semibold text-white backdrop-blur-md">
                                            <Flame className="size-3" /> Trending
                                        </span>
                                    )}
                                    {place.is_hidden && (
                                        <span className="flex items-center gap-1 rounded-md bg-zinc-800/90 px-2 py-1 text-[10px] font-semibold text-zinc-300 backdrop-blur-md">
                                            <EyeOff className="size-3" /> Hidden
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Card Content */}
                            <div className="p-5 space-y-3">
                                {/* Title & Rating */}
                                <div className="flex items-start justify-between gap-2">
                                    <h3 className="line-clamp-1 text-lg font-bold text-white">
                                        {place.name}
                                    </h3>
                                    <div className="flex shrink-0 items-center gap-1 text-amber-400">
                                        <Star className="size-4 fill-amber-400" />
                                        <span className="text-sm font-semibold text-white">
                                            {place.avg_rating}
                                        </span>
                                    </div>
                                </div>

                                {/* Tagline */}
                                {place.tagline && (
                                    <p className="line-clamp-1 text-sm italic text-zinc-400">
                                        "{place.tagline}"
                                    </p>
                                )}

                                {/* Address / District */}
                                <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                                    <MapPin className="size-3.5 shrink-0 text-zinc-500" />
                                    <span className="line-clamp-1">
                                        {place.district ? `${place.district}, ` : ""}
                                        {place.address}
                                    </span>
                                </div>

                                {/* Tags */}
                                {place.tags && place.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5 pt-1">
                                        {place.tags.map((tag, idx) => (
                                            <span
                                                key={idx}
                                                className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-zinc-300"
                                            >
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center border-t border-white/10 p-3 gap-2">
                            <Link
                                href={edit(place)}
                                className="
                                    flex flex-1 items-center justify-center gap-2
                                    rounded-md border border-white/20 bg-transparent
                                    py-1.5 px-3 text-xs font-medium text-white
                                    hover:bg-white/10 transition-colors duration-200
                                "
                            >
                                <Edit className="size-3.5" />
                                Edit
                            </Link>

                            <button
                                type="button"
                                disabled={isDeletingThis}
                                onClick={() => handleDelete(place)}
                                className="
                                    flex items-center justify-center gap-2
                                    rounded-md border border-red-500/30 bg-red-500/10
                                    py-1.5 px-3 text-xs font-medium text-red-400
                                    hover:bg-red-500 hover:text-white transition-colors duration-200
                                    cursor-pointer
                                "
                            >
                                {isDeletingThis ? (
                                    <>
                                        <Loader2 className="size-3.5 animate-spin" />
                                        Deleting...
                                    </>
                                ) : (
                                    <>
                                        <Trash2 className="size-3.5" />
                                        Delete
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}