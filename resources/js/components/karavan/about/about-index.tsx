import CtaSection from "./cta-section";
import GoalsSection from "./goals-section";
import HeroSection from "./hero-section";
import IntroductionSection from "./introdution-section";
import TeamSection from "./team-section";
import VisionMission from "./vission-mission";

export default function AboutIndex() {
    return (
        <div className="min-h-[85vh] flex flex-col items-center justify-center">
            <HeroSection />
            <IntroductionSection />
            <VisionMission />
            <GoalsSection />
            <TeamSection />
            <CtaSection />
        </div>
    );
}