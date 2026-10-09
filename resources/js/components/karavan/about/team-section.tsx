import { useState } from 'react';
import Abdan from '@/assets/abdan.jpeg';
import KaravanLogo from '@/assets/Logo_Karavan.png';
import Nayif from '@/assets/nayif.jpeg';
import PaGun from '@/assets/pa-gun.jpeg';
import Raeynal from '@/assets/raeynal.png';
import Rafi from '@/assets/rafi.png';

interface TeamMember {
    name: string;
    role: string;
    initials: string;
    image: string;
    isLead?: boolean;
}

const teamMembers: TeamMember[] = [
    {
        name: 'Gunawan Busyaeri, S.Pd., Gr.',
        role: 'Inisiator / Ketua Tim',
        initials: 'GB',
        image: PaGun,
        isLead: true,
    },
    {
        name: 'Abdan Syakura',
        role: 'Anggota Tim',
        initials: 'AS',
        image: Abdan,
    },
    {
        name: 'Nayif Aditya',
        role: 'Anggota Tim',
        initials: 'NA',
        image: Nayif,
    },
    {
        name: 'Rafi Islami Pasha',
        role: 'Anggota Tim',
        initials: 'RP',
        image: Rafi,
    },
    {
        name: 'Muhamad Raeynal Alfadhilah Afghani',
        role: 'Anggota Tim',
        initials: 'MR',
        image: Raeynal,
    },
];

function MemberCard({ member }: { member: TeamMember }) {
    const [imgError, setImgError] = useState(false);

    if (member.isLead) {
        return (
            <article className="col-span-1 grid grid-cols-1 overflow-hidden rounded-[28px] border border-[#ffd02b]/60 bg-[#11141b] transition-all duration-300 hover:-translate-y-1 hover:border-[#ffd02b] md:col-span-2 md:grid-cols-[340px_1fr]">
                <div className="relative aspect-4/5 min-h-75 overflow-hidden bg-gradient-to-b from-[#1c2433] to-[#0d1118] md:aspect-auto md:min-h-85">
                    {!imgError ? (
                        <img
                            src={member.image}
                            alt={`Foto ${member.name}`}
                            loading="lazy"
                            onError={() => setImgError(true)}
                            className="h-full w-full object-cover object-top"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-5xl font-extrabold tracking-wider text-[#ffd02b]">
                            {member.initials}
                        </div>
                    )}
                </div>
                <div className="flex flex-col justify-center p-8 md:p-10">
                    <h3 className="text-2xl leading-snug font-bold text-[#f5f5f2] md:text-3xl">
                        {member.name}
                    </h3>
                    <div>
                        <span className="mt-3 inline-block rounded-full bg-[#ffd02b]/15 px-3.5 py-1 text-sm md:text-base font-semibold text-[#ffd02b] w-full">
                            {member.role}
                        </span>
                    </div>
                </div>
            </article>
        );
    }

    return (
        <article className="overflow-hidden rounded-[28px] border border-white/10 bg-[#11141b] transition-all duration-300 hover:-translate-y-1 hover:border-[#ffd02b]/60">
            <div className="relative aspect-4/5 overflow-hidden bg-gradient-to-b from-[#1c2433] to-[#0d1118] h-150 w-full">
                {!imgError ? (
                    <img
                        src={member.image}
                        alt={`Foto ${member.name}`}
                        loading="lazy"
                        onError={() => setImgError(true)}
                        className="h-full w-full object-cover object-top"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-4xl font-extrabold tracking-wider text-[#ffd02b]">
                        {member.initials}
                    </div>
                )}
            </div>
            <div className="p-5 md:p-6">
                <h3 className="text-base leading-snug font-bold text-[#f5f5f2] md:text-lg">
                    {member.name}
                </h3>
                <span className="mt-2 inline-block rounded-full bg-[#ffd02b]/15 px-3 py-1 text-xs font-semibold text-[#ffd02b] md:text-sm">
                    {member.role}
                </span>
            </div>
        </article>
    );
}

export default function TeamSection() {
    return (
        <section className="w-full my-24">
            <div className="mb-14 grid grid-cols-1 items-end gap-12 lg:grid-cols-2">
                <div>
                    <div className="mb-4 inline-flex items-center gap-3.5 rounded-full border border-white/10 bg-[#11141b] py-2 pr-5 pl-2">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full">
                            <img src={KaravanLogo} alt="Karavan Logo" />
                        </span>
                        <b className="font-bold text-[#f5f5f2]">
                            Karavan Studio
                        </b>
                    </div>
                    <h2 className="mb-0 text-3xl font-bold tracking-tight text-[#f5f5f2] md:text-5xl">
                        Tim di Balik{' '}
                        <span className="text-[#ffd02b]">Karaventure</span>
                    </h2>
                </div>
                <p className="text-lg leading-relaxed text-[#b4b8c2]">
                    Karaventure digagas dan dikembangkan oleh Karavan
                    Studio, sebuah tim inovator dan kreator asal Karawang
                    yang berdedikasi memadukan teknologi (Game Engine &
                    Artificial Intelligence) dengan pelestarian budaya
                    lokal.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {teamMembers.map((member, index) => (
                    <MemberCard key={index} member={member} />
                ))}
            </div>
        </section>
    );
}
