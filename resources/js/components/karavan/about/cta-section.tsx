import { ChevronRight, Play } from 'lucide-react';
import { explore } from '@/routes';

export default function CtaSection() {
    return (
        <section className="w-full mb-12">
            <div className="mx-auto max-w-300 px-8">
                <div className="flex flex-col gap-4 rounded-[36px] border-2 border-[#ffd02b]/70 bg-[#11141b] bg-[radial-gradient(600px_300px_at_50%_0%,rgba(255,208,43,0.18),transparent_70%)] px-6 py-18 text-center md:px-10">
                    <h2 className="mx-auto mb-3.5 max-w-[20ch] text-4xl font-bold tracking-tight text-[#f5f5f2] md:text-6xl">
                        Siap Berpetualang Lebih Jauh Bersama{' '}
                        <span className="text-[#ffd02b]">Karaventure?</span>
                    </h2>
                    <p className="mx-auto mb-9 max-w-[52ch] text-base text-[#b4b8c2] md:text-lg">
                        Jelajahi direktori tempat seru di Karawang, atau
                        langsung masuk ke dunia 3D-nya di Roblox.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a
                            href={explore().url}
                            className="inline-flex items-center gap-2.5 rounded-full border-2 border-[#ffd02b] bg-[#ffd02b] px-8 py-4 text-base md:text-lg font-semibold text-[#16130a] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#e6b800] hover:shadow-[0_10px_30px_rgba(255,208,43,0.25)]"
                        >
                            Mulai Eksplorasi Web
                            <ChevronRight className="h-5 w-5" />
                        </a>
                        <a
                            href="https://www.roblox.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2.5 rounded-full border-2 border-[#ffd02b] bg-[#ffd02b]/5 px-8 py-4 text-base md:text-lg font-semibold text-[#f5f5f2] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#ffd02b]/15"
                        >
                            <Play className="h-4 w-4 fill-current" />
                            Mainkan di Roblox
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
