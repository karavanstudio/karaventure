import { Link } from '@inertiajs/react';
import { MapPin, Instagram, Twitter, Youtube, Mail } from "lucide-react";
import { explore } from '@/routes';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative mt-16 border-t border-border/50 z-40">
            <div className="absolute inset-0 bg-black/40 pointer-events-none" />
            <div className="relative mx-auto px-6 md:px-17.5 py-16 grid gap-10 md:grid-cols-4">
                <div className="md:col-span-2 space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="border border-amber-300 bg-white/10 rounded-lg p-2">
                            <MapPin className="size-6 text-amber-300" strokeWidth={2.5} />
                        </div>
                        <span className="font-bold text-2xl">
                            Karaven<span className="text-amber-300">ture</span>
                        </span>
                    </div>
                    <p className="text-sm md:text-base text-muted-foreground max-w-md">
                        Platform eksplorasi tempat menarik di Karawang — dari curug tersembunyi, sate maranggi legendaris, sampai cafe paling aesthetic.
                    </p>
                    <div className="flex gap-3">
                        {[Instagram, Twitter, Youtube, Mail].map((Icon, i) => (
                            <a
                                key={i}
                                href="#"
                                className="glass rounded-lg p-2 hover:text-amber-300 transition-colors"
                            >
                                <Icon className="size-4 md:size-5" />
                            </a>
                        ))}
                    </div>
                </div>
                <div>
                    <h4 className="font-semibold mb-3 text-sm md:text-base">Eksplorasi</h4>
                    <ul className="space-y-2 text-sm md:text-base text-muted-foreground">
                        <li><Link href={explore()} className="hover:text-amber-300">Semua Tempat</Link></li>
                        <li><Link href={explore()} className="hover:text-amber-300">Kuliner</Link></li>
                        <li><Link href={explore()} className="hover:text-amber-300">Alam</Link></li>
                        <li><Link href={explore()} className="hover:text-amber-300">Hidden Gems</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold mb-3 text-sm md:text-base">Tentang</h4>
                    <ul className="space-y-2 text-sm md:text-base text-muted-foreground">
                        <li><a href="#" className="hover:text-amber-300">Cerita Kami</a></li>
                        <li><a href="#" className="hover:text-amber-300">Partner</a></li>
                        <li><a href="#" className="hover:text-amber-300">Kontak</a></li>
                    </ul>
                </div>
            </div>
            <div className="relative border-t border-border/50 py-6 text-center text-xs md:text-sm text-muted-foreground">
                © {currentYear} Karaventure oleh Karavan Studio.
            </div>
        </footer>
    )
}