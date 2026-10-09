export default function VisionMission() {
    const missions = [
        {
            title: 'Inovasi Pembelajaran',
            desc: 'Mengubah persepsi sejarah dan budaya lokal agar menjadi menyenangkan, interaktif, dan relevan bagi generasi digital natives.',
        },
        {
            title: 'Promosi Pariwisata Daerah',
            desc: 'Membantu mempromosikan destinasi wisata, desa wisata, serta landmark bersejarah Karawang secara global.',
        },
        {
            title: 'Pemberdayaan Ekonomi Lokal',
            desc: 'Mendorong kunjungan wisatawan fisik dan mendukung pertumbuhan UMKM lokal melalui sistem quest & reward.',
        },
        {
            title: 'Kolaborasi Edukasi',
            desc: 'Menyediakan media pembelajaran kearifan lokal yang adaptif untuk sekolah-sekolah di Kabupaten Karawang.',
        },
    ];

    return (
        <section className="w-full mt-24">
            <div className="mb-14 max-w-180">
                <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-[#f5f5f2]">
                    Visi & <span className="text-[#ffd02b]">Misi</span>
                </h2>
            </div>

            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr]">
                <div className="self-start rounded-[28px] border-2 border-[#ffd02b] bg-gradient-to-br from-[#ffd02b]/10 to-transparent p-8 md:p-11">
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">Visi</h3>
                    <p className="text-lg leading-relaxed text-[#f5f5f2]">
                        Menjadi pelopor ekosistem pariwisata dan edukasi budaya
                        digital di Indonesia yang menghubungkan pengalaman
                        virtual dengan kunjungan nyata, serta menjaga
                        kelestarian identitas Tatar Sunda di era digital.
                    </p>
                </div>

                <div>
                    <h3 className="mb-4 text-2xl md:text-3xl font-bold text-[#f5f5f2]">
                        Misi
                    </h3>
                    <ol className="grid list-none gap-4">
                        {missions.map((mission, index) => (
                            <li
                                key={index}
                                className="grid grid-cols-[44px_1fr] gap-4 rounded-[18px] border border-white/10 bg-[#11141b] p-5 md:p-6"
                            >
                                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#ffd02b] text-lg font-extrabold text-[#16130a]">
                                    {index + 1}
                                </div>
                                <div>
                                    <h4 className="mb-1 text-lg md:text-xl font-bold text-[#f5f5f2]">
                                        {mission.title}
                                    </h4>
                                    <p className="text-sm text-[#b4b8c2] md:text-base">
                                        {mission.desc}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </section>
    );
}
