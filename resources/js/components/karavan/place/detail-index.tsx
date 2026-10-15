import { router } from "@inertiajs/react";
import {
    Flame,
    Star,
    MapPin,
    Clock,
    BadgeCheck,
    Gem,
} from "lucide-react";
import { place as placeRoute } from "@/routes";
import type { Place } from "@/types/place";
import Footer from "../footer";
import BackButton from "./back-button";

interface DetailIndexProps {
    place: Place;
    relatedPlaces: Place[];
}

export default function DetailIndex({
    place,
    relatedPlaces,
}: DetailIndexProps) {
    const heroImage = place.place_images[0]?.image ?? "/images/placeholder.jpg";

    return (
        <div className="w-full min-h-screen relative bg-black">
            <BackButton />

            {/* in the image */}
            <div className="h-[90vh] w-full relative">
                <img
                    src={heroImage}
                    className="absolute inset-0 h-[90vh] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/30 to-black/30 h-full" />
                <div className="absolute bottom-12 flex flex-col gap-2 px-6 md:px-10 lg:px-17.5">
                    <div className="flex items-center gap-2">
                        <div className="px-4 py-2 bg-black/70 border border-white/20 rounded-full text-sm h-10 flex items-center">
                            {place.category.name}
                        </div>
                        {place.is_trending && (
                            <div className="px-4 py-2 bg-black/70 border border-red-500 rounded-full text-sm flex items-center justify-center gap-1 h-10">
                                <Flame className="size-5 pb-1 fill-red-500 text-red-500" />
                                <span>Trending</span>
                            </div>
                        )}
                        {place.category.name === 'Hidden-Gems' && (
                            <span className="bg-yellow-300 text-black py-2 px-4 text-sm rounded-full flex items-center justify-center gap-1 h-10">
                                <Gem className="size-4 text-blue-600 fill-blue-400" />
                                Hidden Gem
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col gap-4 mt-4">
                        <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold">
                            {place.name}
                        </h1>
                        <p className="text-base text-muted-foreground">
                            {place.tagline}
                        </p>
                    </div>
                    <div className="flex items-center text-muted-foreground gap-8 mt-4">
                        <div className="flex items-center gap-1">
                            <Star className="size-4 text-yellow-400 fill-amber-400" />
                            <span className="text-white text-lg">{place.avg_rating}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="size-4" />
                            <span className="text-base">{place.district}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="size-4" />
                            <span className="text-base">{place.hours}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row px-6 md:px-10 lg:px-17.5 gap-8 lg:gap-16">
                {/* left section */}
                <div className="flex flex-col flex-3">
                    <div
                        className="
                            group box-content relative
                            space-y-3 border border-amber-300/20
                            rounded-3xl bg-black/50 p-8
                            transition-all duration-300
                            hover:border-yellow-400/30
                            hover:shadow-[0_0_30px_rgba(250,204,21,0.08)]
                        "
                    >
                        <h2 className="text-xl md:text-3xl font-semibold">Tentang Tempat Ini</h2>
                        <p className="text-muted-foreground text-base">{place.description}</p>
                        {place.tags.length != 0 && (
                            <div className="flex flex-wrap items-center gap-4 mt-8">
                                {place.tags.map((tag) => (
                                    <div className="rounded-full px-4 py-1 bg-gray-900 border border-white/20 cursor-default whitespace-nowrap">
                                        {tag}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    {place.place_images.length != 0 && (
                        <div className="flex flex-col gap-4 mt-8">
                            <h2 className="text-xl md:text-3xl font-semibold underline">Gallery</h2>
                            <div
                                className="
                                    columns-1
                                    sm:columns-2
                                    lg:columns-3
                                    xl:columns-4
                                    gap-4
                                    space-y-6
                                "
                            >
                                {place.place_images.map((gallery) => (
                                    <div
                                        key={gallery.id}
                                        className="mb-6 break-inside-avoid"
                                    >
                                        <img
                                            src={gallery.image ?? ""}
                                            alt={`Gallery ${gallery.place}`}
                                            loading="lazy"
                                            className="
                                                w-full
                                                rounded-2xl
                                                object-contain
                                                transition-all
                                                duration-300
                                                hover:scale-[1.02]
                                                hover:shadow-2xl
                                            "
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {place.roblox_images.length != 0 && (
                        <div className="flex flex-col gap-4 mt-12">
                            <h2 className="text-xl md:text-3xl font-semibold underline">Roblox Gallery</h2>
                            <div
                                className="
                                    columns-1
                                    sm:columns-2
                                    lg:columns-3
                                    xl:columns-4
                                    gap-4
                                    space-y-6
                                "
                            >
                                {place.roblox_images.map((gallery) => (
                                    <div
                                        key={gallery.id}
                                        className="mb-6 break-inside-avoid"
                                    >
                                        <img
                                            src={gallery.image ?? ""}
                                            alt={`Gallery ${gallery.place}`}
                                            loading="lazy"
                                            className="
                                                w-full
                                                rounded-2xl
                                                object-contain
                                                transition-all
                                                duration-300
                                                hover:scale-[1.02]
                                                hover:shadow-2xl
                                            "
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* right section */}
                <div className="flex flex-col flex-1 gap-4">
                    <div
                        className="
                            group box-content relative
                            space-y-3 border border-amber-300/20
                            rounded-3xl bg-black/50 p-6
                            transition-all duration-300
                            hover:border-yellow-400/30
                            hover:shadow-[0_0_30px_rgba(250,204,21,0.08)]
                        "
                    >
                        <div className="flex items-center text-yellow-300 gap-1">
                            <Clock className="size-5" />
                            <span className="text-base">Jam Operasional</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-base text-white">{place.hours}</span>
                            <div className="flex items-center text-green-500 gap-1">
                                <BadgeCheck className="size-3" />
                                <span className="text-xs">Buka Sekarang</span>
                            </div>
                        </div>
                    </div>
                    <div
                        className="
                            group box-content relative
                            space-y-4 border border-amber-300/20
                            rounded-3xl bg-black/50 p-6
                            transition-all duration-300
                            hover:border-yellow-400/30
                            hover:shadow-[0_0_30px_rgba(250,204,21,0.08)]
                        "
                    >
                        <div className="flex items-center text-yellow-300 gap-1">
                            <MapPin className="size-5" />
                            <span className="text-base">Alamat</span>
                        </div>
                        <div className="flex flex-col justify-center gap-2">
                            <span className="text-base text-white">{place.address}</span>
                            <span className="text-sm">{place.district}</span>
                        </div>
                    </div>
                    {relatedPlaces.length != 0 && 
                        relatedPlaces.map((item) => (
                            <div
                                onClick={() => router.visit(placeRoute(item.id))}
                                className="
                                    group box-content relative
                                    space-y-4 border border-amber-300/20
                                    rounded-3xl bg-black/50 p-4
                                    hover:-translate-y-1 cursor-pointer
                                    transition-all duration-300
                                    hover:border-yellow-400/50
                                    hover:shadow-[0_0_30px_rgba(250,204,21,0.08)]
                                "
                            >
                                <div className="flex items-center gap-4">
                                    <img
                                        src={item.place_images[0].image}
                                        alt={item.name}
                                        className="w-32 h-32 aspect-square object-cover rounded-xl"
                                    />
                                    <div className="flex flex-col gap-2">
                                        <h2 className="text-base line-clamp-1">
                                            {item.name}
                                        </h2>
                                        <p className="text-xs line-clamp-2 text-muted-foreground">
                                            {item.tagline}
                                        </p>
                                        <div className="flex items-center gap-1 text-xs">
                                            <Star className="size-4 pb-0.5 text-yellow-400 fill-yellow-400" />
                                            {item.avg_rating}
                                        </div>
                                        <div className="flex items-center gap-1 text-xs">
                                            <MapPin className="size-4 pb-0.5" />
                                            {item.district}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <Footer />
        </div>
    )
}