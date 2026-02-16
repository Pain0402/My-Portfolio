"use client";
import React, { useState, useEffect } from "react";
import { cn } from "@/components/ui/Container";

interface TypewriterProps {
    words: string[];
    typeSpeed?: number;
    deleteSpeed?: number;
    delaySpeed?: number;
    className?: string;
}

export default function Typewriter({
    words,
    typeSpeed = 100,
    deleteSpeed = 50,
    delaySpeed = 2000,
    className,
}: TypewriterProps) {
    const [text, setText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(typeSpeed);

    useEffect(() => {
        let timer: NodeJS.Timeout;

        const handleTyping = () => {
            const i = loopNum % words.length;
            const fullText = words[i];

            setText(
                isDeleting
                    ? fullText.substring(0, text.length - 1)
                    : fullText.substring(0, text.length + 1)
            );

            setTypingSpeed(isDeleting ? deleteSpeed : typeSpeed);

            if (!isDeleting && text === fullText) {
                timer = setTimeout(() => setIsDeleting(true), delaySpeed);
            } else if (isDeleting && text === "") {
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
                timer = setTimeout(handleTyping, 500);
            } else {
                timer = setTimeout(handleTyping, typingSpeed);
            }
        };

        timer = setTimeout(handleTyping, typingSpeed);
        return () => clearTimeout(timer);
    }, [text, isDeleting, loopNum, words, typeSpeed, deleteSpeed, delaySpeed]); // Re-added props to deps for stability, as removing them could lead to stale closures.

    return (
        <span className={cn("inline-block relative text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600", className)}>
            {text}
            <span className="animate-pulse ml-1 text-white opacity-70">|</span>
        </span>
    );
}
