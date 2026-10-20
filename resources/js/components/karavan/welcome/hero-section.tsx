import { Link } from "@inertiajs/react";
import { motion } from 'framer-motion';
import { Sparkles, ChevronRight, TrendingUp } from "lucide-react";
import HeroImage from "@/assets/kp-roblox-2.png";
import { explore } from "@/routes";

const STATS = [
  { value: "120+", label: "Tempat menarik" },
  { value: "27", label: "Kecamatan" },
  { value: "4.7", label: "Rating rata-rata" },
  { value: "10K+", label: "Eksplorer aktif" },
];

export default function HeroSection() {
    return (
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12 md:gap-32 lg:gap-64 mt-8 w-full min-h-[80vh]">

            {/* left section */}
            <div className="flex flex-col gap-6 md:gap-8 flex-1 w-full">
                <div
                    className="
                        text-white font-light
                        text-sm sm:text-sm md:text-base
                        border-2 border-amber-300 rounded-full
                        pe-6 ps-4 py-2.5 w-fit tracking-wide
                        transition-all duration-200
                        hover:tracking-[1px] hover:cursor-default
                    "
                >
                    <h3 className="flex flex-row gap-2 font-light whitespace-nowrap">
                        <Sparkles className="h-4 w-4 md:h-5 md:w-5" />
                        Direktori tempat seru #1 di <span className="text-amber-300">Karawang</span>
                    </h3>
                </div>
                <div className="mt-8">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-5xl md:text-6xl font-bold">Jelajahi</h1>
                        <h1 className="text-6xl md:text-6xl font-bold text-amber-300 tracking-wider">Kota Karawang</h1>
                        <span className="text-lg md:text-xl text-gray-300 tracking-wide">dengan cara baru</span>
                    </div>
                    <div className="mt-12">
                        <span className="text-base md:text-lg">Dari curug tersembunyi di kaki Sanggabuana, sate maranggi legendaris, sampai cafe paling aesthetic — <span className="text-amber-300">semua ada di sini</span>. Yuk mulai petualanganmu.</span>
                    </div>
                </div>
                <div className="flex justify-center lg:justify-start mt-8 gap-4 md:gap-8">
                    <Link
                        href="https://www.roblox.com/games/106041739530903/Karaventure"
                        className="
                            group
                            flex items-center justify-center gap-2
                            text-base md:text-lg
                            text-black font-medium
                            ps-8 pe-6 py-3 rounded-full
                            border-2 border-amber-300
                            bg-amber-300
                            hover:bg-amber-300/10 hover:text-white
                            transition-all duration-200
                        "
                    >
                        Mulai Eksplorasi
                        <ChevronRight className="pt-0.5 h-5 w-5 group-hover:translate-x-1 transition-all duration-200" />
                    </Link>
                    <Link
                        href={explore()}
                        data={{ trending: true }}
                        className="
                            flex items-center justify-center gap-2
                            text-base md:text-lg
                            text-white font-medium
                            ps-6 pe-7 py-3 rounded-full
                            border-2 border-amber-300
                            bg-amber-300/10
                            hover:bg-amber-300 hover:text-black
                            transition-all duration-200
                        "
                    >
                        <TrendingUp className="pt-0.5 h-5 w-5 transition-all duration-200" />
                        Trending Sekarang
                    </Link>
                </div>
                <div className="flex justify-center lg:justify-start">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9 }}
                        className="grid grid-cols-4 gap-4 pt-6 max-w-xl"
                        >
                        {STATS.map((s, i) => (
                            <motion.div
                            key={s.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1 + i * 0.1 }}
                            className="space-y-1"
                            >
                            <div className="text-2xl sm:text-3xl font-bold text-gradient">{s.value}</div>
                            <div className="text-xs text-muted-foreground">{s.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* right section */}
            <div className="flex-1 flex justify-center items-center lg:justify-end w-full mt-12 md:mt-0">
                <div className="relative">
                    <img
                        src={HeroImage}
                        alt="Hero Image"
                        className="min-h-130 w-full max-w-full sm:max-w-full md:max-w-150 lg:max-w-137.5 lg:min-w-80 xl:max-w-150 border-2 border-amber-300/60 rounded-3xl object-cover"
                    />
                </div>
            </div>
        </div>
    )
}