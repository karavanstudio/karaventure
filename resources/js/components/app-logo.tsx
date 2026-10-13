import AppLogoIcon from '@/assets/karaventure-logo-crop.png';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-6 items-center justify-center rounded-md text-sidebar-primary-foreground">
                <img src={AppLogoIcon} alt="Karaventure Logo" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-base">
                <span className="mb-0.5 truncate leading-tight font-semibold">
                    Karaventure
                </span>
            </div>
        </>
    );
}
