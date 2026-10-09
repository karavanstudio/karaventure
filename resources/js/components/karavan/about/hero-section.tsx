import { Landmark } from "lucide-react";
import HeroImage from "@/assets/kp-roblox.png";

export default function HeroSection() {
    return (
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12 md:gap-32 mt-8 w-full min-h-[80vh]">
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
                        <Landmark className="h-4 w-4 md:h-5 md:w-5" />
                        Tentang Kami
                    </h3>
                </div>
                <div className="mt-8">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-6xl md:text-7xl font-bold">Mengenal</h1>
                        <h1 className="text-6xl md:text-7xl font-bold text-amber-300 tracking-wider">Karaventure</h1>
                        <span className="text-lg md:text-xl tracking-wide mt-6">Ekosistem Edukasi Budaya & Wisata Digital Pertama di Kabupaten Karawang.</span>
                    </div>
                    <div className="mt-12">
                        <span className="text-base md:text-lg text-gray-300">Karaventure (Karawang Adventure & Virtual Education through Roblox Technology and AI for Cultural Heritage) adalah platform inovatif yang menggabungkan direktori wisata website dengan platform gamifikasi 3D di Roblox serta kecerdasan buatan (AI). Kami hadir untuk mengenalkan kekayaan sejarah, landmark, dan tempat-tempat seru di Karawang kepada generasi muda melalui cara baru yang modern dan imersif.</span>
                    </div>
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
                    {/* <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent" /> */}
                </div>
            </div>
        </div>
    )
}