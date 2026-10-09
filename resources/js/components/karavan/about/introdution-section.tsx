import { Bot, Box, Compass } from "lucide-react";

export default function IntroductionSection() {
    return (
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12 md:gap-32 mt-8 w-full">
            <div className="w-full flex flex-col gap-4">
                <h2 className="text-5xl md:text-6xl font-bold">Apa itu Karaventure?</h2>
                <span className="text-base md:text-lg text-gray-300">Di tengah modernisasi dan perkembangan kawasan industri Karawang, warisan sejarah dan budaya lokal sering kali terabaikan oleh generasi muda (Gen Z & Alpha).</span>
                <span className="text-base md:text-lg text-gray-300">Karaventure mengubah cara belajar sejarah dan mengeksplorasi daerah, dari metode hafalan dan informasi pasif menjadi pengalaman langsung (experiential learning).</span>
            </div>
            <div className="w-full flex flex-col gap-4">
                <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                    <div
                        className="
                            p-8 flex flex-col
                            border border-accent
                            bg-[#11141b]
                            rounded-3xl gap-3
                            w-full hover:-translate-y-1
                            hover:border-amber-300/60
                            transition-all duration-300
                        "
                    >
                        <div className="p-4 bg-yellow-300/10 w-fit rounded-xl">
                            <Compass className="text-yellow-300" />
                        </div>
                        <span className="text-lg md:text-xl font-semibold mt-2">
                            Eksplorasi Web & AI Assistant
                        </span>
                        <span className="text-base text-gray-300">
                            Direktori tempat menarik (sejarah, alam, kuliner, hingga kafe) yang didukung rekomendasi asisten AI.
                        </span>
                    </div>
                    <div
                        className="
                            p-8 flex flex-col
                            border border-accent
                            bg-[#11141b]
                            rounded-3xl gap-3
                            w-full hover:-translate-y-1
                            hover:border-amber-300/60
                            transition-all duration-300
                        "
                    >
                        <div className="p-4 bg-yellow-300/10 w-fit rounded-xl">
                            <Bot className="text-yellow-300" />
                        </div>
                        <span className="text-lg md:text-xl font-semibold mt-2">
                            NPC Berbasis AI
                        </span>
                        <span className="text-base text-gray-300">
                            Karakter virtual di dalam game yang dapat menjawab pertanyaan sejarah secara real-time.
                        </span>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                    <div
                        className="
                            p-8 flex flex-col
                            border border-accent
                            bg-[#11141b]
                            rounded-3xl gap-3
                            w-full hover:-translate-y-1
                            hover:border-amber-300/60
                            transition-all duration-300
                        "
                    >
                        <div className="p-4 bg-yellow-300/10 w-fit rounded-xl">
                            <Box className="text-yellow-300" />
                        </div>
                        <span className="text-lg md:text-xl font-semibold mt-2">
                            Metaverse Roblox
                        </span>
                        <span className="text-base text-gray-300">
                            Peta virtual 3D landmark ikonik Karawang seperti Karangpawitan dan Lorong Waktu Sejarah (Rengasdengklok & Candi Jiwa).
                        </span>
                    </div>
                    {/* <div
                        className="
                            p-8 flex flex-col
                            border border-accent
                            bg-[#11141b]
                            rounded-3xl gap-3
                            w-full hover:-translate-y-1
                            hover:border-amber-300/60
                            transition-all duration-300
                        "
                    >
                        <div className="p-4 bg-yellow-300/10 w-fit rounded-xl">
                            <Bot className="text-yellow-300" />
                        </div>
                        <span className="text-lg md:text-xl font-semibold mt-2">
                            NPC Berbasis AI
                        </span>
                        <span className="text-base text-gray-300">
                            Karakter virtual di dalam game yang dapat menjawab pertanyaan sejarah secara real-time.
                        </span>
                    </div> */}
                </div>
            </div>
        </div>
    )
}