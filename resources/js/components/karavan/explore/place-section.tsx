import { SmallCard } from "@/components/karavan/welcome/featured-place/card";
import { place as placeAnalytics } from "@/routes/analytics";
import type { Place } from "@/types/place";

interface PlaceSectionProps {
    places: Place[];
}

export default function PlaceSection({
    places,
}: PlaceSectionProps) {
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

    if (places.length === 0) {
        return (
            <section className="py-16">
                <p className="text-center text-muted-foreground">
                    Belum ada tempat yang tersedia.
                </p>
            </section>
        );
    }

    return (
        <section className="pt-16">
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {places.map((place, index) => (
                    <div
                        key={place.id ?? `place${index}`}
                        onClick={() => handlePlaceClicked(place.id)}
                    >
                        <SmallCard
                            place={place}
                            isExplorePage={true}
                        />
                    </div>
                ))}
            </div>
        </section>
    )
}