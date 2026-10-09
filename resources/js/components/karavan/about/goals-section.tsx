export default function GoalsSection() {
    const goals = [
        {
            title: 'Meningkatkan Literasi Budaya',
            desc: 'Menumbuhkan rasa bangga (sense of belonging) generasi muda terhadap warisan daerah Karawang.',
        },
        {
            title: 'Mendukung Industri Kreatif & Pariwisata',
            desc: 'Menjadi sarana promosi digital yang efisien dan mendorong dampak ekonomi langsung ke lokasi wisata nyata.',
        },
        {
            title: 'Menjaga Identitas Lokal',
            desc: 'Memastikan nilai-nilai sejarah dan kebudayaan Tatar Sunda tetap hidup di tengah arus globalisasi.',
        },
    ];

    return (
        <section className="w-full mt-24">
            <div className="mx-auto max-w-none md:max-w-350 px-0 md:px-8">
                <div className="mb-14 max-w-180">
                    <h2 className="text-5xl font-bold tracking-tight text-[#f5f5f2] md:text-6xl">
                        Tujuan <span className="text-[#ffd02b]">Kami</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                    {goals.map((goal, index) => (
                        <article
                            key={index}
                            className="relative overflow-hidden rounded-[18px] border border-white/10 bg-[#11141b] p-8"
                        >
                            <div className="absolute top-0 left-0 h-1 w-full bg-[#ffd02b]" />
                            <h3 className="mb-3 text-xl md:text-2xl leading-snug font-bold text-[#f5f5f2]">
                                {goal.title}
                            </h3>
                            <p className="text-base text-[#b4b8c2] md:text-lg">
                                {goal.desc}
                            </p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
