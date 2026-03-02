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
}

export default function HolographicCursor() {
    const pathname = usePathname();
    const cursorRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);
    const [isEnabled, setIsEnabled] = useState(true);

    // Position of the actual mouse and the lerped cursor
    const mouse = useRef({ x: -100, y: -100 });
    const cursorObj = useRef({ x: -100, y: -100 });

    // Store stars left behind
    const starsRef = useRef<Star[]>([]);
    const starIdCounter = useRef(0);
    const lastStarCreated = useRef(0);

    const requestRef = useRef<number>(0);

    const starsContainerRef = useRef<HTMLDivElement>(null);

    // React state to force re-renders for the static stars and connections when needed
    // We remove the React state renderTrigger entirely to avoid lagging the cursor with too many VDOM diffs.
    // DOM will be manipulated directly.

    useEffect(() => {
        if (pathname === '/playground' || !isEnabled) {
            document.body.style.cursor = 'auto';
            return;
        }

        document.body.style.cursor = 'none';

        const createStar = (x: number, y: number) => {
            const now = Date.now();
            if (now - lastStarCreated.current < 200) return; // Prevent spamming, create a star every 200ms of movement

            const newStar: Star = {
                id: starIdCounter.current++,
                x,
                y,
                opacity: 1,
                createdAt: now
            };

            starsRef.current.push(newStar);
            lastStarCreated.current = now;

            // Optional: Remove old stars after 5 seconds to prevent DOM bloat
            if (starsRef.current.length > 15) {
                starsRef.current.shift();
            }

            // OPTIMIZATION: Manually append the star DOM element instead of relying on React state re-render
            if (starsContainerRef.current) {
                const starEl = document.createElement('div');
                starEl.id = `star-${newStar.id}`;
                starEl.className = `absolute w-[3px] h-[3px] -ml-[1.5px] -mt-[1.5px] bg-[var(--accent-cyan)] rounded-full shadow-[0_0_8px_rgba(76,201,240,1)]`;
                starEl.style.left = `${x}px`;
                starEl.style.top = `${y}px`;
                starEl.style.opacity = '1';
                starEl.style.willChange = 'opacity';
                starsContainerRef.current.appendChild(starEl);
            }

            // Note: In a production app, instead of forcing React re-render constantly on mouse move,
            // we should manually inject SVG <circle> and <line> elements into the DOM for max 60FPS.
            // But for a portfolio with < 15 stars, this is acceptable.
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouse.current = { x: e.clientX, y: e.clientY };

            // Create a star if we moved enough
            const dist = Math.hypot(e.clientX - cursorObj.current.x, e.clientY - cursorObj.current.y);
            if (dist > 50) {
                createStar(e.clientX, e.clientY);
            }
        };

        const handleMouseClick = (e: MouseEvent) => {
            // Pulse the current cursor dot
            if (cursorRef.current) {
                animate(cursorRef.current, {
                    scale: [1, 3, 1],
                    duration: 600,
                    easing: 'easeOutElastic(1, .5)'
                });
            }

            // Immediately create a star on click
            createStar(e.clientX, e.clientY);
        };

        const renderConstellations = () => {
            // Lerp the main cursor
            cursorObj.current.x += (mouse.current.x - cursorObj.current.x) * 0.2;
            cursorObj.current.y += (mouse.current.y - cursorObj.current.y) * 0.2;

            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate(${cursorObj.current.x}px, ${cursorObj.current.y}px)`;
            }

            // Update SVG lines directly for performance
            if (svgRef.current) {
                svgRef.current.innerHTML = ''; // Clear prev lines

                const maxDistance = 150; // Max connect distance
                const stars = starsRef.current;

                // Fade out old stars
                const now = Date.now();
                for (let i = stars.length - 1; i >= 0; i--) {
                    const age = now - stars[i].createdAt;
                    if (age > 4000) {
                        stars[i].opacity -= 0.02; // Fade out
                        if (stars[i].opacity <= 0) {

                            // Remove DOM element
                            if (starsContainerRef.current) {
                                const starEl = document.getElementById(`star-${stars[i].id}`);
                                if (starEl) starEl.remove();
                            }
                            stars.splice(i, 1);

                            continue;
                        }
                    } else {
                        // Keep opacity in sync
                        if (starsContainerRef.current) {
                            const starEl = document.getElementById(`star-${stars[i].id}`);
                            if (starEl) starEl.style.opacity = stars[i].opacity.toFixed(3);
                        }
                    }

                    // Check distance from current cursor
                    const distToCursor = Math.hypot(cursorObj.current.x - stars[i].x, cursorObj.current.y - stars[i].y);
                    if (distToCursor < maxDistance) {
                        const lineOpacity = (1 - distToCursor / maxDistance) * stars[i].opacity * 0.8;
                        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                        line.setAttribute('x1', cursorObj.current.x.toString());
                        line.setAttribute('y1', cursorObj.current.y.toString());
                        line.setAttribute('x2', stars[i].x.toString());
                        line.setAttribute('y2', stars[i].y.toString());
                        line.setAttribute('stroke', 'rgba(255, 255, 255, ' + lineOpacity + ')');
                        line.setAttribute('stroke-width', '1');
                        svgRef.current.appendChild(line);
                    }

                    // Check distance to other stars
                    for (let j = i + 1; j < stars.length; j++) {
                        const dist = Math.hypot(stars[i].x - stars[j].x, stars[i].y - stars[j].y);
                        if (dist < maxDistance) {
                            const lineOpacity = (1 - dist / maxDistance) * Math.min(stars[i].opacity, stars[j].opacity) * 0.5;
                            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                            line.setAttribute('x1', stars[i].x.toString());
                            line.setAttribute('y1', stars[i].y.toString());
                            line.setAttribute('x2', stars[j].x.toString());
                            line.setAttribute('y2', stars[j].y.toString());
                            line.setAttribute('stroke', 'rgba(76, 201, 240, ' + lineOpacity + ')');
                            line.setAttribute('stroke-width', '0.5'); // Thinner lines between stars
                            svgRef.current.appendChild(line);
                        }
                    }
                }
            }

            requestRef.current = requestAnimationFrame(renderConstellations);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isClickable =
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.tagName === 'INPUT' ||
                target.tagName === 'TEXTAREA' ||
                target.tagName === 'SELECT' ||
                target.closest('a') ||
                target.closest('button') ||
                target.closest('[role="button"]');

            if (isClickable && cursorRef.current && cursorRef.current.firstChild) {
                animate(cursorRef.current.firstChild as HTMLElement, {
                    scale: 2.5,
                    rotate: 90,
                    duration: 400,
                    easing: 'easeOutElastic(1, .5)'
                });
            }
        };

        const handleMouseOut = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isClickable =
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.tagName === 'INPUT' ||
                target.tagName === 'TEXTAREA' ||
                target.tagName === 'SELECT' ||
                target.closest('a') ||
                target.closest('button') ||
                target.closest('[role="button"]');

            if (isClickable && cursorRef.current && cursorRef.current.firstChild) {
                animate(cursorRef.current.firstChild as HTMLElement, {
                    scale: 1,
                    rotate: 0,
                    duration: 400,
                    easing: 'easeOutExpo'
                });
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
        <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden mix-blend-screen">

            <svg
                ref={svgRef}
                className="absolute inset-0 w-full h-full"
                style={{ filter: 'drop-shadow(0px 0px 4px rgba(255,255,255,0.8))' }}
            />

            {/* Static Stars Left Behind (Rendered manually to DOM for perf) */}
            <div ref={starsContainerRef} className="absolute inset-0" />

            {/* Main Cursor Moving Star */}
            <div
                ref={cursorRef}
                className="absolute top-0 left-0"
                style={{ willChange: 'transform' }}
            >
                <div className="w-[6px] h-[6px] -ml-[3px] -mt-[3px] bg-white rounded-full flex items-center justify-center mix-blend-difference shadow-[0_0_15px_rgba(255,255,255,1)]">
                    {/* Tiny cross styling */}
                    <div className="absolute w-[14px] h-[1px] bg-white opacity-60"></div>
                    <div className="absolute w-[1px] h-[14px] bg-white opacity-60"></div>
                </div>
            </div>

        </div>
    );
}
