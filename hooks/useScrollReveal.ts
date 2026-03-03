"use client";

import { useEffect, useRef } from "react";
// @ts-ignore
import { animate, stagger } from "animejs";

type RevealPreset = "fade-up" | "fade-left" | "fade-right" | "scale-up" | "stagger-children";

interface UseScrollRevealOptions {
    preset?: RevealPreset;
    delay?: number;
    duration?: number;
    threshold?: number;
    staggerDelay?: number;
}

export function useScrollReveal<T extends HTMLElement>({
    preset = "fade-up",
    delay = 0,
    duration = 800,
    threshold = 0.15,
    staggerDelay = 100,
}: UseScrollRevealOptions = {}) {
    const ref = useRef<T>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        // Set initial hidden state
        if (preset === "stagger-children") {
            const children = el.children;
            for (let i = 0; i < children.length; i++) {
                (children[i] as HTMLElement).style.opacity = "0";
                (children[i] as HTMLElement).style.transform = "translateY(40px)";
            }
        } else {
            el.style.opacity = "0";
            switch (preset) {
                case "fade-up":
                    el.style.transform = "translateY(60px)";
                    break;
                case "fade-left":
                    el.style.transform = "translateX(-60px)";
                    break;
                case "fade-right":
                    el.style.transform = "translateX(60px)";
                    break;
                case "scale-up":
                    el.style.transform = "scale(0.85)";
                    break;
            }
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    if (preset === "stagger-children") {
                        animate(el.children, {
                            opacity: [0, 1],
                            translateY: [40, 0],
                            delay: stagger(staggerDelay, { start: delay }),
                            duration,
                            easing: "easeOutExpo",
                        });
                    } else {
                        const props: Record<string, any> = {
                            opacity: [0, 1],
                            delay,
                            duration,
                            easing: "easeOutExpo",
                        };

                        switch (preset) {
                            case "fade-up":
                                props.translateY = [60, 0];
                                break;
                            case "fade-left":
                                props.translateX = [-60, 0];
                                break;
                            case "fade-right":
                                props.translateX = [60, 0];
                                break;
                            case "scale-up":
                                props.scale = [0.85, 1];
                                break;
                        }

                        animate(el, props);
                    }

                    observer.unobserve(el);
                }
            },
            { threshold }
        );

        observer.observe(el);

        return () => observer.disconnect();
    }, [preset, delay, duration, threshold, staggerDelay]);

    return ref;
}
