import React, { useEffect, useRef, useState } from "react";

type ParticlesVariant = "network" | "dots";

interface ParticlesFieldProps {
    variant?: ParticlesVariant; // "network" (puncte + legături) sau "dots" (doar puncte)
}

const ParticlesField: React.FC<ParticlesFieldProps> = ({ variant = "network" }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    // nu avem nevoie de setEnabled, doar citim valoarea
    const [enabled] = useState<boolean>(() => {
        if (typeof window === "undefined") return true;
        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;
        return !prefersReducedMotion;
    });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !enabled) return;

        const context = canvas.getContext("2d");
        if (!context) return;
        const ctx = context; // CanvasRenderingContext2D, nu mai e posibil null

        let dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
        let width = 0;
        let height = 0;

        let particles: {
            x: number;
            y: number;
            vx: number;
            vy: number;
            r: number;
        }[] = [];

        const mouse = { x: -9999, y: -9999 };

        const rand = (min: number, max: number) => Math.random() * (max - min) + min;
        const clamp = (n: number, a: number, b: number) => Math.max(a, Math.min(b, n));

        const readVar = (name: string, fallback: string) => {
            const v = getComputedStyle(document.documentElement)
                .getPropertyValue(name)
                .trim();
            return v || fallback;
        };

        function seed() {
            const area = width * height;
            const density = 1 / 12000;
            const target = clamp(Math.floor(area * density), 40, 160);
            particles = new Array(target).fill(0).map(() => ({
                x: rand(0, width),
                y: rand(0, height),
                vx: rand(-0.4, 0.4),
                vy: rand(-0.4, 0.4),
                r: rand(1.2, 2.2),
            }));
        }

        function resize() {
            const c = canvasRef.current;
            if (!c) return;

            width =
                c.clientWidth ||
                c.parentElement?.clientWidth ||
                window.innerWidth;
            height =
                c.clientHeight ||
                c.parentElement?.clientHeight ||
                window.innerHeight;

            c.width = Math.floor(width * dpr);
            c.height = Math.floor(height * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            seed();
        }

        function update() {
            const linkDist = 110;
            const repelRadius = 80;
            const repelStrength = 0.08;

            for (const p of particles) {
                const dx = p.x - mouse.x;
                const dy = p.y - mouse.y;
                const d2 = dx * dx + dy * dy;

                if (d2 < repelRadius * repelRadius) {
                    const d = Math.sqrt(d2) || 1;
                    const ux = dx / d;
                    const uy = dy / d;
                    p.vx += ux * repelStrength;
                    p.vy += uy * repelStrength;
                }

                p.x += p.vx;
                p.y += p.vy;

                // wrap edges
                if (p.x < -10) p.x = width + 10;
                if (p.x > width + 10) p.x = -10;
                if (p.y < -10) p.y = height + 10;
                if (p.y > height + 10) p.y = -10;

                // friction
                p.vx *= 0.997;
                p.vy *= 0.997;
            }

            ctx.clearRect(0, 0, width, height);

            const dotColour = readVar("--muted", "#88a");
            const lineColour = readVar("--brand", "#59f");

            // DOTS – mereu desenăm
            ctx.fillStyle = dotColour;
            ctx.globalAlpha = 0.9;
            for (const p of particles) {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.globalAlpha = 1;

            // LINES – DOAR pentru varianta "network"
            if (variant === "network") {
                ctx.strokeStyle = lineColour;
                for (let i = 0; i < particles.length; i++) {
                    for (let j = i + 1; j < particles.length; j++) {
                        const a = particles[i];
                        const b = particles[j];
                        const dx = a.x - b.x;
                        const dy = a.y - b.y;
                        const d2 = dx * dx + dy * dy;
                        if (d2 < linkDist * linkDist) {
                            const alpha = 1 - Math.sqrt(d2) / linkDist;
                            ctx.globalAlpha = alpha * 0.6;
                            ctx.beginPath();
                            ctx.moveTo(a.x, a.y);
                            ctx.lineTo(b.x, b.y);
                            ctx.stroke();
                        }
                    }
                }
                ctx.globalAlpha = 1;
            }
        }

        let rafId: number;

        const loop = () => {
            if (!enabled) return;
            update();
            rafId = requestAnimationFrame(loop);
        };

        const handleResize = () => {
            dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
            resize();
        };

        const handleMove = (e: PointerEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        const handleLeave = () => {
            mouse.x = -9999;
            mouse.y = -9999;
        };

        window.addEventListener("resize", handleResize, { passive: true });
        window.addEventListener("pointermove", handleMove, { passive: true });
        window.addEventListener("pointerleave", handleLeave, { passive: true });

        resize();
        loop();

        const handleVisibility = () => {
            if (document.hidden) {
                cancelAnimationFrame(rafId);
            } else if (enabled) {
                loop();
            }
        };
        document.addEventListener("visibilitychange", handleVisibility);

        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("pointermove", handleMove);
            window.removeEventListener("pointerleave", handleLeave);
            document.removeEventListener("visibilitychange", handleVisibility);
        };
    }, [enabled, variant]);

    return (
        <div className="particles-layer" aria-hidden="true">
            <canvas ref={canvasRef} className="particles-canvas" />
        </div>
    );
};

export default ParticlesField;
