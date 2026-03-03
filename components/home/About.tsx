"use client";
import React, { useEffect, useRef, useState } from "react";
import Container from "@/components/ui/Container";
import { createClient } from "@/utils/supabase/client";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface ProfileData {
    display_name: string;
    bio: string;
    core_strengths: string;
    beyond_coding: string;
    future_vision: string;
    portrait_url: string | null;
}

function renderBoldMarkdown(text: string) {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
            return <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
        }
        return <span key={i}>{part}</span>;
    });
}

export default function About() {
    const [profile, setProfile] = useState<ProfileData | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const supabase = createClient();
            const { data } = await supabase
                .from("profile")
                .select("display_name, bio, core_strengths, beyond_coding, future_vision, portrait_url")
                .limit(1)
                .single();

            if (data) setProfile(data as ProfileData);
        };
        fetchProfile();
    }, []);

    // Scroll reveal refs
    const titleRef = useScrollReveal<HTMLHeadingElement>({ preset: "fade-up", duration: 1000 });
    const bioRef = useScrollReveal<HTMLParagraphElement>({ preset: "fade-up", delay: 200, duration: 1000 });
    const portraitRef = useScrollReveal<HTMLDivElement>({ preset: "fade-left", delay: 300, duration: 900 });
    const cardsRef = useScrollReveal<HTMLDivElement>({ preset: "stagger-children", delay: 100, staggerDelay: 150, duration: 800 });

    const displayName = profile?.display_name || "Tran Huu Giang";
    const bio = profile?.bio || "Hi, I'm Tran Huu Giang. I turn ideas into interactive digital realities.";
    const coreStrengths = profile?.core_strengths || 'My expertise lies at the intersection of **Frontend**, **Backend**, and **Artificial Intelligence**. I enjoy building scalable systems and integrating smart AI solutions into seamless user interfaces.';
    const beyondCoding = profile?.beyond_coding || 'When I\'m not debugging, you\'ll find me **drawing**, **listening to music**, or immersing myself in **anime & movies**. I\'m also an avid **gamer**, always appreciating the art and logic behind great games.';
    const futureVision = profile?.future_vision || 'I am aiming for **Fullstack Developer** or **AI Application Engineer** roles. My long-term goal is to lead innovative projects that combine aesthetic design with powerful backend logic, pushing the boundaries of what\'s possible on the web.';
    const portraitUrl = profile?.portrait_url || null;

    return (
        <section
            id="about"
            className="relative min-h-[120vh] py-20"
        >
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-space)] via-[var(--bg-deep)]/80 to-[var(--bg-space)] pointer-events-none" />

            <Container className="relative z-10 flex flex-col items-center">
                <div className="max-w-4xl text-center space-y-12">
                    <h2 ref={titleRef} className="text-4xl md:text-6xl font-display font-bold text-white mb-8">
                        <span className="text-[var(--accent-purple)]">/</span> About Me
                    </h2>

                    <p ref={bioRef} className="text-2xl md:text-3xl font-light leading-relaxed text-gray-300">
                        &quot;{bio.includes(displayName)
                            ? bio.split(displayName).map((part, i, arr) => (
                                <React.Fragment key={i}>
                                    {part}
                                    {i < arr.length - 1 && <span className="text-gradient font-semibold">{displayName}</span>}
                                </React.Fragment>
                            ))
                            : <>{bio}</>
                        }&quot;
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 text-left mt-20">
                        {/* Portrait Card */}
                        <div ref={portraitRef} className="lg:col-span-1">
                            <div className="sticky top-24 glass p-4 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-sm group hover:border-[var(--accent-cyan)] transition-colors duration-500 max-w-sm mx-auto lg:max-w-none">
                                <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-gray-800">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />

                                    {portraitUrl ? (
                                        <img
                                            src={portraitUrl}
                                            alt={displayName}
                                            className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm">
                                            [Insert Portrait Here]
                                        </div>
                                    )}

                                    <div className="absolute bottom-4 left-4 z-20">
                                        <span className="block text-xs font-mono text-[var(--accent-cyan)] mb-1">HELLO_WORLD</span>
                                        <h3 className="text-xl font-display font-bold text-white">{displayName}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Text Content — stagger animated */}
                        <div ref={cardsRef} className="lg:col-span-2 space-y-12">
                            <div className="glass p-8 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-sm">
                                <h3 className="text-xl font-display font-semibold text-[var(--accent-cyan)] mb-4">Core Strengths</h3>
                                <p className="text-gray-400 leading-7">
                                    {renderBoldMarkdown(coreStrengths)}
                                </p>
                            </div>

                            <div className="glass p-8 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-sm">
                                <h3 className="text-xl font-display font-semibold text-[var(--accent-pink)] mb-4">Beyond Coding</h3>
                                <p className="text-gray-400 leading-7">
                                    {renderBoldMarkdown(beyondCoding)}
                                </p>
                            </div>

                            <div className="glass p-8 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-sm">
                                <h3 className="text-xl font-display font-semibold text-[var(--accent-purple)] mb-4">Future Vision</h3>
                                <p className="text-gray-400 leading-7">
                                    {renderBoldMarkdown(futureVision)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
