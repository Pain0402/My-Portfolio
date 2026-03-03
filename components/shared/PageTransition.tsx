"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useCallback } from "react";
// @ts-ignore
import { animate, createTimeline } from "animejs";

export default function PageTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const overlayRef = useRef<HTMLDivElement>(null);
    const [displayChildren, setDisplayChildren] = useState(children);
    const [isAnimating, setIsAnimating] = useState(false);
    const prevPathname = useRef(pathname);

    const runExitAnimation = useCallback(() => {
        return new Promise<void>((resolve) => {
            if (!overlayRef.current) { resolve(); return; }

            const overlay = overlayRef.current;
            overlay.style.display = "flex";

            const tl = createTimeline({ onComplete: () => resolve() });

            // Curtain wipe from bottom
            tl.add(overlay, {
                clipPath: ["inset(100% 0 0 0)", "inset(0% 0 0 0)"],
                duration: 500,
                easing: "easeInOutCubic",
            })
                // Star-streak lines animation
                .add(".transition-line", {
                    scaleX: [0, 1],
                    opacity: [0, 1, 0.8],
                    duration: 400,
                    easing: "easeOutExpo",
                    delay: (_, i) => i * 30,
                }, "-=200")
                // Center flash
                .add(".transition-flash", {
                    scale: [0, 3],
                    opacity: [1, 0],
                    duration: 400,
                    easing: "easeOutExpo",
                }, "-=200");
        });
    }, []);

    const runEnterAnimation = useCallback(() => {
        return new Promise<void>((resolve) => {
            if (!overlayRef.current) { resolve(); return; }

            const overlay = overlayRef.current;

            const tl = createTimeline({
                onComplete: () => {
                    overlay.style.display = "none";
                    resolve();
                }
            });

            // Curtain wipe out to top
            tl.add(overlay, {
                clipPath: ["inset(0% 0 0 0)", "inset(0 0 100% 0)"],
                duration: 500,
                easing: "easeInOutCubic",
            });
        });
    }, []);

    useEffect(() => {
        if (pathname === prevPathname.current) {
            setDisplayChildren(children);
            return;
        }

        // Skip transitions for admin pages
        if (pathname.startsWith("/admin") || prevPathname.current.startsWith("/admin")) {
            prevPathname.current = pathname;
            setDisplayChildren(children);
            return;
        }

        const doTransition = async () => {
            setIsAnimating(true);
            await runExitAnimation();
            setDisplayChildren(children);
            prevPathname.current = pathname;

            // Small delay to let new page mount
            await new Promise(r => setTimeout(r, 50));
            await runEnterAnimation();
            setIsAnimating(false);
        };

        doTransition();
    }, [pathname, children, runExitAnimation, runEnterAnimation]);

    // Generate star streak lines
    const lines = Array.from({ length: 8 }, (_, i) => i);

    return (
        <>
            {displayChildren}

            {/* Transition Overlay */}
            <div
                ref={overlayRef}
                className="fixed inset-0 z-[99999] items-center justify-center"
                style={{
                    display: "none",
                    clipPath: "inset(100% 0 0 0)",
                    background: "linear-gradient(180deg, #030014 0%, #0a0a2e 50%, #030014 100%)",
                }}
            >
                {/* Star streak lines */}
                {lines.map((i) => (
                    <div
                        key={i}
                        className="transition-line absolute h-[1px] w-full"
                        style={{
                            top: `${12 + i * 10}%`,
                            background: `linear-gradient(90deg, transparent, ${i % 2 === 0 ? 'rgba(76,201,240,0.6)' : 'rgba(123,44,191,0.6)'}, transparent)`,
                            transformOrigin: i % 2 === 0 ? "left" : "right",
                            transform: "scaleX(0)",
                        }}
                    />
                ))}

                {/* Center flash */}
                <div
                    className="transition-flash absolute w-[100px] h-[100px] rounded-full"
                    style={{
                        background: "radial-gradient(circle, rgba(76,201,240,0.8) 0%, transparent 70%)",
                        transform: "scale(0)",
                    }}
                />

                {/* Center text */}
                <span className="text-white/30 font-mono text-xs tracking-[0.5em] uppercase z-10">
                    WARPING
                </span>
            </div>
        </>
    );
}
