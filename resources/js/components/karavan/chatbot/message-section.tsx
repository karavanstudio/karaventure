import axios from "axios";
import { Send, Sparkles } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { store } from "@/routes/chatbot";

type Message = {
    question: string;
    answer: string;
};

export default function MessageSection() {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const bottomRef = useRef<HTMLDivElement | null>(null);

    const suggestions = [
        "Cafe yang enak buat nugas?",
        "Apa itu Karaventure?",
        "Tempat makan keluarga?",
        "Hidden Gems di karawang?",
        "Tempat yang lagi trending di karawang?",
        // "Bagaimana cara mengunggah foto toko?",
    ];

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages, loading]);

    const sendMessage = async (
        question?: string
    ) => {
        const content = question ?? message;

        if (!content.trim() || loading) {
            return
        }

        setMessage("");
        setLoading(true);

        try {
            const response = await axios.post(store().url, {
                message: content,
            });
            console.log(response.data);
            setMessages((prev) => [
                ...prev,
                {
                    question: content,
                    answer:
                        response.data.answer ??
                        "Maaf, saya tidak dapat menjawab pertanyaan tersebut.",
                },
            ]);
        } catch {
            setMessages((prev) => [
                ...prev,
                {
                    question: content,
                    answer: "Terjadi kesalahan saat memproses pertanyaan.",
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = () => {
        sendMessage();
    };

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLTextAreaElement>
    ) => {
        if (
            e.key === "Enter" &&
            !e.shiftKey
        ) {
            e.preventDefault();
            sendMessage();
        }
    };
    
    return (
        <div className="flex flex-col w-full mx-auto min-h-[90vh]">
            {messages.length === 0 ? (
                <div className="flex flex-1 flex-col items-center justify-center">
                    {!loading ? (
                        <>
                            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-amber-300/10">
                                <Sparkles
                                    size={30}
                                    className="text-amber-300"
                                />
                            </div>
                            <h1 className="text-center text-4xl font-bold">
                                Asisten Karaventure
                            </h1>
                            <p className="mt-3max-w-xl text-center text-zinc-400">
                                Tanyakan apa saja tentang penggunaan aplikasi Explore Karawang atau fitur lainnya.
                            </p>
                            <div className="mt-10 flex flex-wrap justify-center gap-3">
                                {suggestions.map(
                                    (item) => (
                                        <button
                                            key={item}
                                            onClick={() => sendMessage(item)}
                                            className="
                                                rounded-full
                                                border
                                                border-zinc-700
                                                px-4 py-2
                                                text-sm
                                                transition-all cursor-pointer
                                                hover:border-amber-300
                                                hover:text-amber-300
                                            "
                                        >
                                            {item}
                                        </button>
                                    )
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="animate-pulse text-zinc-400">
                            Sedang mencari jawaban...
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex-1 overflow-y-auto pr-2">
                    <div className="mx-auto max-w-4xl space-y-10">
                        {messages.map(
                            (item, index) => (
                                <div key={index} className="space-y-5">
                                    <div>
                                        <p className="mb-2 text-xs uppercase tracking-wider text-zinc-500">
                                            Pertanyaan
                                        </p>
                                        <h2 className="text-xl font-semibold">
                                            {item.question}
                                        </h2>
                                    </div>
                                    <div className="border-l-2 border-amber-300 pl-5">
                                        <p className="mb-4 text-xs uppercase tracking-wider text-zinc-500">
                                            Jawaban
                                        </p>
                                        <div className="prose prose-invert max-w-none">
                                            <ReactMarkdown
                                                remarkPlugins={[
                                                    remarkGfm,
                                                ]}
                                                rehypePlugins={[
                                                    rehypeRaw,
                                                    rehypeHighlight,
                                                ]}
                                            >
                                                {item.answer}
                                            </ReactMarkdown>
                                        </div>
                                    </div>
                                </div>
                            )
                        )}

                        {loading && (
                            <div className="animate-pulse text-zinc-400">
                                Sedang mencari jawaban...
                            </div>
                        )}
                        <div ref={bottomRef} />
                    </div>
                </div>
            )}

            {/* user message */}
            <div className="mx-auto mt-6 w-full max-w-4xl">
                <div
                    className="
                        flex items-end
                        gap-3 p-3
                        rounded-full
                        border border-zinc-800 bg-[#1A1A22]/50
                        focus-within:border-amber-300/80
                        transition-colors duration-300
                    "
                >
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        autoFocus
                        rows={1}
                        placeholder="Tanyakan sesuatu tentang aplikasi..."
                        className="
                            max-h-40 min-h-12
                            flex-1
                            resize-none bg-transparent
                            px-2 py-3
                            outline-none placeholder:text-zinc-500
                        "
                    />
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="
                            flex items-center justify-center
                            h-12 w-12
                            rounded-full border-2 border-amber-300
                            bg-amber-300 hover:bg-[#1A1A22]
                            text-[#1E1B26] hover:text-amber-300
                            transition duration-200
                            disabled:opacity-50
                            cursor-pointer
                        "
                    >
                        <Send size={22} />
                    </button>
                </div>
                <p className="mt-3 text-center text-xs text-zinc-500">
                    Asisten AI dapat membuat kesalahan. Selalu verifikasi informasi penting.
                </p>
            </div>
        </div>
    )
}