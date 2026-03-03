'use client';

import React, { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
// @ts-ignore
import { animate } from 'animejs';

interface Star {
    id: number;
    x: number;
    y: number;
    opacity: number;
    createdAt: number;
    el: HTMLDivElement; // Cache DOM reference directly — no more getElementById per frame
}

export default function HolographicCursor() {
    const pathname = usePathname();
    const cursorRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isEnabled, setIsEnabled] = useState(true);

    const mouse = useRef({ x: -100, y: -100 });
    const cursorObj = useRef({ x: -100, y: -100 });

    const starsRef = useRef<Star[]>([]);
    const starIdCounter = useRef(0);
    const lastStarCreated = useRef(0);
    const requestRef = useRef<number>(0);
    const starsContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (pathname === '/playground' || !isEnabled) {
            document.body.style.cursor = 'auto';
            return;
        }

        document.body.style.cursor = 'none';

        // Resize canvas to match window
        const resizeCanvas = () => {
            if (canvasRef.current) {
                const dpr = window.devicePixelRatio || 1;
                canvasRef.current.width = window.innerWidth * dpr;
                canvasRef.current.height = window.innerHeight * dpr;
                canvasRef.current.style.width = window.innerWidth + 'px';
                canvasRef.current.style.height = window.innerHeight + 'px';
                const ctx = canvasRef.current.getContext('2d');
                if (ctx) ctx.scale(dpr, dpr);
            }
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const createStar = (x: number, y: number) => {
            const now = Date.now();
            if (now - lastStarCreated.current < 250) return;

            const starEl = document.createElement('div');
            starEl.style.cssText = `position:absolute;width:4px;height:4px;margin-left:-2px;margin-top:-2px;background:#4cc9f0;border-radius:50%;box-shadow:0 0 8px 2px rgba(76,201,240,1), 0 0 16px rgba(76,201,240,0.4);left:${x}px;top:${y}px;opacity:1;`;

            if (starsContainerRef.current) {
                starsContainerRef.current.appendChild(starEl);
            }

            const newStar: Star = {
                id: starIdCounter.current++,
                x, y,
                opacity: 1,
                createdAt: now,
                el: starEl
            };

            starsRef.current.push(newStar);
            lastStarCreated.current = now;

            // Cap at 12 stars max
            if (starsRef.current.length > 12) {
                const old = starsRef.current.shift();
                if (old) old.el.remove();
            }
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouse.current = { x: e.clientX, y: e.clientY };

            const dist = Math.hypot(e.clientX - cursorObj.current.x, e.clientY - cursorObj.current.y);
            if (dist > 60) {
                createStar(e.clientX, e.clientY);
            }
        };

        const handleMouseClick = (e: MouseEvent) => {
            if (cursorRef.current) {
                animate(cursorRef.current, {
                    scale: [1, 3, 1],
                    duration: 600,
                    easing: 'easeOutElastic(1, .5)'
                });
            }
            createStar(e.clientX, e.clientY);
        };

        const renderConstellations = () => {
            // Instant cursor — no delay
            cursorObj.current.x = mouse.current.x;
            cursorObj.current.y = mouse.current.y;

            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate(${cursorObj.current.x}px, ${cursorObj.current.y}px)`;
            }

            // Draw lines on Canvas2D
            const canvas = canvasRef.current;
            const ctx = canvas?.getContext('2d');
            if (ctx && canvas) {
                const dpr = window.devicePixelRatio || 1;
                ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                const maxDist = 150;
                const stars = starsRef.current;
                const now = Date.now();

                // Update stars + draw lines
                for (let i = stars.length - 1; i >= 0; i--) {
                    const age = now - stars[i].createdAt;

                    // Fade out after 4s
                    if (age > 4000) {
                        stars[i].opacity -= 0.015;
                        if (stars[i].opacity <= 0) {
                            stars[i].el.remove();
                            stars.splice(i, 1);
                            continue;
                        }
                        stars[i].el.style.opacity = String(stars[i].opacity);
                    }

                    // Line from cursor to star
                    const dx = cursorObj.current.x - stars[i].x;
                    const dy = cursorObj.current.y - stars[i].y;
                    const distToCursor = Math.sqrt(dx * dx + dy * dy); // faster than hypot
                    if (distToCursor < maxDist) {
                        const alpha = (1 - distToCursor / maxDist) * stars[i].opacity * 0.9;
                        ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(cursorObj.current.x, cursorObj.current.y);
                        ctx.lineTo(stars[i].x, stars[i].y);
                        ctx.stroke();
                    }

                    // Lines between nearby stars
                    for (let j = i + 1; j < stars.length; j++) {
                        const sx = stars[i].x - stars[j].x;
                        const sy = stars[i].y - stars[j].y;
                        const dist = Math.sqrt(sx * sx + sy * sy);
                        if (dist < maxDist) {
                            const alpha = (1 - dist / maxDist) * Math.min(stars[i].opacity, stars[j].opacity) * 0.6;
                            ctx.strokeStyle = `rgba(76,201,240,${alpha})`;
                            ctx.lineWidth = 0.8;
                            ctx.beginPath();
                            ctx.moveTo(stars[i].x, stars[i].y);
                            ctx.lineTo(stars[j].x, stars[j].y);
                            ctx.stroke();
                        }
                    }
                }
            }

            requestRef.current = requestAnimationFrame(renderConstellations);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('a, button, input, textarea, select, [role="button"]')) {
                if (cursorRef.current?.firstChild) {
                    animate(cursorRef.current.firstChild as HTMLElement, {
                        scale: 2.5, rotate: 90,
                        duration: 400, easing: 'easeOutElastic(1, .5)'
                    });
                }
            }
        };

        const handleMouseOut = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('a, button, input, textarea, select, [role="button"]')) {
                if (cursorRef.current?.firstChild) {
                    animate(cursorRef.current.firstChild as HTMLElement, {
                        scale: 1, rotate: 0,
                        duration: 400, easing: 'easeOutExpo'
                    });
                }
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleMouseClick);
        document.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseout', handleMouseOut);
        requestRef.current = requestAnimationFrame(renderConstellations);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseClick);
            document.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseout', handleMouseOut);
            window.removeEventListener('resize', resizeCanvas);
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
            document.body.style.cursor = 'auto';

            const interactiveElements = document.querySelectorAll('a, button, input, textarea, select');
            interactiveElements.forEach((el) => {
                (el as HTMLElement).style.cursor = '';
            });
        };
    }, [pathname, isEnabled]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key.toLowerCase() === 'c' && e.ctrlKey) {
                setIsEnabled(prev => !prev);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        if (pathname === '/playground' || !isEnabled) return;
        const style = document.createElement('style');
        style.innerHTML = `* { cursor: none !important; }`;
        document.head.appendChild(style);
        return () => { document.head.removeChild(style); }
    }, [pathname, isEnabled]);

    if (pathname === '/playground' || !isEnabled) return null;

    return (
        <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">

            {/* Canvas2D for lines — 10x faster than SVG innerHTML */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
            />

            {/* Star dots container */}
            <div ref={starsContainerRef} className="absolute inset-0" />

            {/* Cursor dot */}
            <div
                ref={cursorRef}
                className="absolute top-0 left-0"
                style={{ willChange: 'transform' }}
            >
                <div className="w-[8px] h-[8px] -ml-[4px] -mt-[4px] bg-white rounded-full flex items-center justify-center shadow-[0_0_16px_4px_rgba(255,255,255,1),0_0_30px_rgba(76,201,240,0.5)]">
                    <div className="absolute w-[18px] h-[1.5px] bg-white opacity-80"></div>
                    <div className="absolute w-[1.5px] h-[18px] bg-white opacity-80"></div>
                </div>
            </div>

        </div>
    );
}
