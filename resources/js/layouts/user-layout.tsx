import { Head, Link } from "@inertiajs/react";
import { BotMessageSquare } from "lucide-react";
import Footer from "@/components/karavan/footer";
import Navbar from "@/components/karavan/navbar";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAnalyticsTracker } from "@/hooks/use-analytics-tracker";
import { chatbot } from "@/routes";

export default function UserLayout({ children }: { children: React.ReactNode }) {
    const isChatbotPage = typeof window !== "undefined" && window.location.pathname === chatbot().url;
    useAnalyticsTracker();

    return (
        <div className="relative isolate w-full overflow-x-hidden">
            <Head>
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <Navbar />
            {!isChatbotPage && (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href={chatbot()}
                                className="
                                    fixed border-2 border-amber-300
                                    bg-amber-300 hover:bg-amber-300/10
                                    text-black hover:text-amber-300
                                    p-2 z-50
                                    rounded-full bottom-5 md:bottom-15 right-5 md:right-15
                                    transition-all duration-200
                                "
                            >
                                <BotMessageSquare className="size-8"/>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent
                            className="
                                border border-amber-300/50
                                bg-amber-300
                                text-black font-medium
                            "
                        >
                            <p>Tanya Seputar Karawang!</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            )}
            <div className="min-h-[90vh] h-auto relative z-10">
                <div className="flex flex-col px-6 md:px-10 lg:px-17.5 pt-24">
                    {children}
                </div>
            </div>
            {!isChatbotPage && (
                <Footer />
            )}
        </div>
    )
}