import { motion } from "framer-motion";
import { ChevronRight, Mic } from "lucide-react";

function FloatingPaths({ position }: { position: number }) {
    const paths = Array.from({ length: 24 }, (_, i) => ({
        id: i,
        d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
            380 - i * 5 * position
        } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
            152 - i * 5 * position
        } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
            684 - i * 5 * position
        } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
        color: `rgba(57, 255, 20, ${0.05 + i * 0.01})`,
        width: 0.5 + i * 0.05,
    }));

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <svg
                className="w-full h-full text-[#39FF14]"
                viewBox="0 0 696 316"
                fill="none"
            >
                <title>Background Paths</title>
                {paths.map((path) => (
                    <motion.path
                        key={path.id}
                        d={path.d}
                        stroke="currentColor"
                        strokeWidth={path.width}
                        strokeOpacity={0.1 + path.id * 0.01}
                        initial={{ pathLength: 0.3, opacity: 0.4 }}
                        animate={{
                            pathLength: 1,
                            opacity: [0.2, 0.4, 0.2],
                            pathOffset: [0, 1, 0],
                        }}
                        transition={{
                            duration: 20 + Math.random() * 10,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                        }}
                    />
                ))}
            </svg>
        </div>
    );
}

export function BackgroundPaths({
    title = "Talk to Our AI Voice Agent",
    subtitle = "Get instant answers about our services, pricing, and how our AI technology can transform your business communication.",
    buttonText = "Speak to AI Now",
    buttonLink = "#",
    footerText = "No waiting, no forms - just ask our AI directly"
}: {
    title?: string;
    subtitle?: string;
    buttonText?: string;
    buttonLink?: string;
    footerText?: string;
}) {
    const words = title.split(" ");

    return (
        <div className="relative overflow-hidden z-10 min-h-[360px]">
            <div className="absolute inset-0">
                <FloatingPaths position={1} />
                <FloatingPaths position={-1} />
            </div>

            <div className="relative z-20 max-w-3xl mx-auto text-center py-10">
                <span className="inline-block bg-gray-800 text-blue-400 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                    Experience the Future of Business Communication
                </span>
                
                <h2 className="text-3xl font-bold mb-3 tracking-tight">
                    {words.map((word, wordIndex) => (
                        <span
                            key={wordIndex}
                            className="inline-block mr-2 last:mr-0"
                        >
                            {word.split("").map((letter, letterIndex) => (
                                <motion.span
                                    key={`${wordIndex}-${letterIndex}`}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{
                                        delay:
                                            wordIndex * 0.1 +
                                            letterIndex * 0.03,
                                        type: "spring",
                                        stiffness: 150,
                                        damping: 25,
                                    }}
                                    className="inline-block"
                                >
                                    {letter}
                                </motion.span>
                            ))}
                        </span>
                    ))}
                </h2>
                
                <motion.p 
                    className="text-amber-400 mb-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                >
                    {subtitle}
                </motion.p>
                
                <motion.div 
                    className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                >
                    <button
                        onClick={() => {
                            // This function will be overridden with the parent component's
                            // voice activation function through event bubbling
                            const voiceActivateEvent = new CustomEvent('activateVoiceAssistant');
                            document.dispatchEvent(voiceActivateEvent);
                        }}
                        className="bg-[#39FF14] text-black px-6 py-3 font-semibold hover:bg-[#32CC11] transition-all flex items-center justify-center space-x-2 rounded shadow-[0_0_10px_rgba(57,255,20,0.3)] pulsating-button w-full"
                    >
                        <Mic className="w-5 h-5" />
                        <span>{buttonText}</span>
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </motion.div>
                
                <motion.p 
                    className="text-emerald-400 text-sm mt-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1, duration: 0.5 }}
                >
                    {footerText}
                </motion.p>
            </div>
        </div>
    );
}