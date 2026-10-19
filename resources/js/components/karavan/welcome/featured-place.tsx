import { useMemo } from "react";
import { HeroCard, SmallCard } from "@/components/karavan/welcome/featured-place/card";
import FeaturedHeader from "@/components/karavan/welcome/featured-place/featured-header";
import { place as placeAnalytics } from "@/routes/analytics";
import type { Place } from "@/types/place";

interface FeaturedPlaceProps {
    places: Place[];
}

export default function FeaturedPlace({
    places,
}: FeaturedPlaceProps) {
    const featuredPlaces = useMemo(() => {
        return places
            .filter((place) => place.is_featured)
            .sort((a, b) => b.avg_rating - a.avg_rating)
            .slice(0, 5);
    }, [places]);

    const handlePlaceClicked = (placeId: number) => {
        fetch(placeAnalytics().url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '',
            },
            body: JSON.stringify({ place_id: placeId }),
        }).catch((error) => console.error("Failed to track analytics:", error));
    };

    if (featuredPlaces.length === 0) {
        return (
            <div>kosong bang</div>
        )
    }

    const [hero, ...items] = featuredPlaces;

    return (
        <div className="flex flex-col gap-8">
            <FeaturedHeader />
            <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 xl:gap-8">
                <div
                    className="row-span-2"
                    onClick={() => handlePlaceClicked(hero.id)}
                >
                    <HeroCard place={hero} />
                </div>

                {items.map((place, index) => (
                    <div
                        key={place.id ?? `place-${index}`}
                        onClick={() => handlePlaceClicked(place.id)}
                        className="grid"
                    >
                        <SmallCard
                            place={place}
                        />
                    </div>
                ))}
            </section>
        </div>
    )
}