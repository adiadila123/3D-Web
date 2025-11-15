// src/components/UniverseScene3D.tsx
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface Explosion {
    sprite: THREE.Sprite;
    baseScale: number;
    speed: number;
}

interface ShootingStarData {
    velocity: THREE.Vector3;
    life: number;
    maxLife: number;
    active: boolean;
}

const UniverseScene3D: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const parent = canvas.parentElement;
        if (!parent) return;

        // =========================
        // SCENĂ DE BAZĂ
        // =========================
        const scene = new THREE.Scene();
        scene.background = new THREE.Color("#02041a");

        const camera = new THREE.PerspectiveCamera(
            55,
            parent.clientWidth / parent.clientHeight,
            0.1,
            500
        );

        const renderer = new THREE.WebGLRenderer({
            canvas,
            antialias: true,
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.setSize(parent.clientWidth, parent.clientHeight);

        // =========================
        // LUMINI
        // =========================
        const ambient = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambient);

        const coreLight = new THREE.PointLight(0xff4bda, 3.2, 120);
        coreLight.position.set(0, 0, 0);
        scene.add(coreLight);

        const rimBlue = new THREE.PointLight(0x60a5fa, 1.2, 260);
        rimBlue.position.set(-40, 20, -40);
        scene.add(rimBlue);

        const rimGold = new THREE.PointLight(0xfbbf24, 1.0, 260);
        rimGold.position.set(40, -10, 30);
        scene.add(rimGold);

        // =========================
        // GALAXIE (grup principal)
        // =========================
        const galaxy = new THREE.Group();
        scene.add(galaxy);

        const tmpColor = new THREE.Color();

        // ---------- NUCLEU MOV / ROZ ----------
        const coreGeo = new THREE.SphereGeometry(3, 64, 64);
        const coreMat = new THREE.MeshPhysicalMaterial({
            color: 0x9333ea,
            emissive: 0xec4899,
            emissiveIntensity: 2.2,
            roughness: 0.3,
            metalness: 0.2,
            transparent: true,
            opacity: 0.95,
            clearcoat: 1,
            clearcoatRoughness: 0.2,
        });
        const core = new THREE.Mesh(coreGeo, coreMat);
        galaxy.add(core);

        const innerGlowGeo = new THREE.SphereGeometry(4.2, 64, 64);
        const innerGlowMat = new THREE.MeshBasicMaterial({
            color: 0xec4899,
            transparent: true,
            opacity: 0.4,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
        });
        const innerGlow = new THREE.Mesh(innerGlowGeo, innerGlowMat);
        galaxy.add(innerGlow);

        // ---------- INEL AURIU (particule) ----------
        const ringCount = 4500;
        const ringPos = new Float32Array(ringCount * 3);
        const ringCol = new Float32Array(ringCount * 3);

        for (let i = 0; i < ringCount; i++) {
            const i3 = i * 3;

            const radius = 10 + Math.random() * 13;
            const angle = Math.random() * Math.PI * 2;
            const height = (Math.random() - 0.5) * 4;

            const x = Math.cos(angle) * radius;
            const y = height;
            const z = Math.sin(angle) * radius;

            ringPos[i3] = x;
            ringPos[i3 + 1] = y;
            ringPos[i3 + 2] = z;

            const t = (radius - 10) / 13;
            const h = 0.83 - t * 0.25; // roz -> auriu
            const s = 0.7 + Math.random() * 0.15;
            const l = 0.6 + Math.random() * 0.15;
            tmpColor.setHSL(h, s, l);

            ringCol[i3] = tmpColor.r;
            ringCol[i3 + 1] = tmpColor.g;
            ringCol[i3 + 2] = tmpColor.b;
        }

        const ringGeo = new THREE.BufferGeometry();
        ringGeo.setAttribute("position", new THREE.BufferAttribute(ringPos, 3));
        ringGeo.setAttribute("color", new THREE.BufferAttribute(ringCol, 3));

        const ringMat = new THREE.PointsMaterial({
            size: 0.35,
            vertexColors: true,
            depthWrite: false,
            transparent: true,
            blending: THREE.AdditiveBlending,
            opacity: 0.9,
        });

        const brightRing = new THREE.Points(ringGeo, ringMat);
        brightRing.rotation.x = 0.55;
        galaxy.add(brightRing);

        // ---------- CEAȚĂ ALBASTRĂ EXTERIOARĂ (praf cosmic) ----------
        const hazeCount = 5500;
        const hazePos = new Float32Array(hazeCount * 3);
        const hazeCol = new Float32Array(hazeCount * 3);

        for (let i = 0; i < hazeCount; i++) {
            const i3 = i * 3;

            const radius = 18 + Math.random() * 40;
            const angle = Math.random() * Math.PI * 2;
            const height = (Math.random() - 0.5) * 16;

            const x = Math.cos(angle) * radius;
            const y = height;
            const z = Math.sin(angle) * radius;

            hazePos[i3] = x;
            hazePos[i3 + 1] = y;
            hazePos[i3 + 2] = z;

            const t = (radius - 18) / 40;
            const h = 0.58 + t * 0.1; // albastru -> turcoaz
            const s = 0.4 + Math.random() * 0.2;
            const l = 0.45 + Math.random() * 0.15;
            tmpColor.setHSL(h, s, l);

            hazeCol[i3] = tmpColor.r;
            hazeCol[i3 + 1] = tmpColor.g;
            hazeCol[i3 + 2] = tmpColor.b;
        }

        const hazeGeo = new THREE.BufferGeometry();
        hazeGeo.setAttribute("position", new THREE.BufferAttribute(hazePos, 3));
        hazeGeo.setAttribute("color", new THREE.BufferAttribute(hazeCol, 3));

        const hazeMat = new THREE.PointsMaterial({
            size: 0.6,
            vertexColors: true,
            depthWrite: false,
            transparent: true,
            blending: THREE.AdditiveBlending,
            opacity: 0.35,
        });

        const blueHaze = new THREE.Points(hazeGeo, hazeMat);
        blueHaze.rotation.x = 0.7;
        galaxy.add(blueHaze);

        // ---------- PRAF COSMIC ÎN NUCLEU (roz / mov) ----------
        const dustCount = 2800;
        const dustPos = new Float32Array(dustCount * 3);
        const dustCol = new Float32Array(dustCount * 3);

        for (let i = 0; i < dustCount; i++) {
            const i3 = i * 3;

            const radius = 4 + Math.random() * 9;
            const angle = Math.random() * Math.PI * 2;
            const height = (Math.random() - 0.5) * 5;

            const x = Math.cos(angle) * radius;
            const y = height;
            const z = Math.sin(angle) * radius;

            dustPos[i3] = x;
            dustPos[i3 + 1] = y;
            dustPos[i3 + 2] = z;

            const t = (radius - 4) / 9;
            const h = 0.85 - t * 0.15; // mov -> roz
            const s = 0.65 + Math.random() * 0.2;
            const l = 0.6 + Math.random() * 0.1;
            tmpColor.setHSL(h, s, l);

            dustCol[i3] = tmpColor.r;
            dustCol[i3 + 1] = tmpColor.g;
            dustCol[i3 + 2] = tmpColor.b;
        }

        const dustGeo = new THREE.BufferGeometry();
        dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
        dustGeo.setAttribute("color", new THREE.BufferAttribute(dustCol, 3));

        const dustMat = new THREE.PointsMaterial({
            size: 0.22,
            vertexColors: true,
            depthWrite: false,
            transparent: true,
            blending: THREE.AdditiveBlending,
            opacity: 0.85,
        });

        const coreDust = new THREE.Points(dustGeo, dustMat);
        coreDust.rotation.x = 0.4;
        galaxy.add(coreDust);

        // =========================
        // STELE COLORATE DE FUNDAL
        // =========================
        const starsCount = 3800;
        const starsPos = new Float32Array(starsCount * 3);
        const starsCol = new Float32Array(starsCount * 3);

        for (let i = 0; i < starsCount; i++) {
            const i3 = i * 3;

            const r = 120 * Math.cbrt(Math.random());
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);

            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.cos(phi);
            const z = r * Math.sin(phi) * Math.sin(theta);

            starsPos[i3] = x;
            starsPos[i3 + 1] = y;
            starsPos[i3 + 2] = z;

            const t = Math.random();
            if (t < 0.35) {
                tmpColor.setHSL(0.6 + Math.random() * 0.03, 0.35, 0.8 + Math.random() * 0.15);
            } else if (t < 0.65) {
                tmpColor.setHSL(0.55 + Math.random() * 0.05, 0.1, 0.9);
            } else if (t < 0.85) {
                tmpColor.setHSL(0.13 + Math.random() * 0.03, 0.7, 0.85);
            } else {
                tmpColor.setHSL(0.06 + Math.random() * 0.03, 0.8, 0.8);
            }

            starsCol[i3] = tmpColor.r;
            starsCol[i3 + 1] = tmpColor.g;
            starsCol[i3 + 2] = tmpColor.b;
        }

        const starsGeo = new THREE.BufferGeometry();
        starsGeo.setAttribute("position", new THREE.BufferAttribute(starsPos, 3));
        starsGeo.setAttribute("color", new THREE.BufferAttribute(starsCol, 3));

        const starsMat = new THREE.PointsMaterial({
            size: 0.18,
            vertexColors: true,
            depthWrite: false,
            transparent: true,
            opacity: 0.95,
        });

        const stars = new THREE.Points(starsGeo, starsMat);
        galaxy.add(stars);

        // =========================
        // EXPLOZII COSMICE (NEBULOASE)
        // =========================
        function createExplosionTexture(
            colorTemplate: string
        ): THREE.CanvasTexture | null {
            const size = 256;
            const cvs = document.createElement("canvas");
            cvs.width = cvs.height = size;
            const ctx = cvs.getContext("2d");
            if (!ctx) return null;

            const gradient = ctx.createRadialGradient(
                size / 2,
                size / 2,
                0,
                size / 2,
                size / 2,
                size / 2
            );
            gradient.addColorStop(0, colorTemplate.replace("ALPHA", "1"));
            gradient.addColorStop(0.25, colorTemplate.replace("ALPHA", "0.95"));
            gradient.addColorStop(0.6, colorTemplate.replace("ALPHA", "0.25"));
            gradient.addColorStop(1, "rgba(0,0,0,0)");

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, size, size);

            const tex = new THREE.CanvasTexture(cvs);
            tex.needsUpdate = true;
            tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
            return tex;
        }

        const explosions: Explosion[] = [];

        const explosionColors: string[] = [
            "rgba(96,165,250,ALPHA)", // albastru
            "rgba(236,72,153,ALPHA)", // roz
            "rgba(250,204,21,ALPHA)", // auriu
        ];

        const explosionPositions: THREE.Vector3[] = [
            new THREE.Vector3(-26, 10, -8),
            new THREE.Vector3(24, -8, 5),
            new THREE.Vector3(6, 18, -20),
        ];

        explosionColors.forEach((c, idx) => {
            const tex = createExplosionTexture(c);
            if (!tex) return;

            const mat = new THREE.SpriteMaterial({
                map: tex,
                transparent: true,
                blending: THREE.AdditiveBlending,
                depthWrite: false,
                opacity: 0.8,
            });
            const sprite = new THREE.Sprite(mat);
            const baseScale = 40 + idx * 10;
            sprite.scale.set(baseScale, baseScale, 1);
            sprite.position.copy(explosionPositions[idx]);
            galaxy.add(sprite);

            explosions.push({
                sprite,
                baseScale,
                speed: 0.7 + idx * 0.35,
            });
        });

        // =========================
        // STEA CĂZĂTOARE (UNA, RANDOM)
        // =========================
        const SHOOTING_STAR_COUNT = 1;
        const shootingStarPositions = new Float32Array(SHOOTING_STAR_COUNT * 3);
        const shootingStarColors = new Float32Array(SHOOTING_STAR_COUNT * 3);
        const shootingStarsData: ShootingStarData[] = [];

        const shootingColors = [
            new THREE.Color(0xffffff), // alb
            new THREE.Color(0x93c5fd), // albastru pal
            new THREE.Color(0xf9a8d4), // roz
            new THREE.Color(0xfacc15), // auriu
            new THREE.Color(0x22c55e), // verde
        ];

        const shootingGeo = new THREE.BufferGeometry();
        shootingGeo.setAttribute(
            "position",
            new THREE.BufferAttribute(shootingStarPositions, 3)
        );
        shootingGeo.setAttribute(
            "color",
            new THREE.BufferAttribute(shootingStarColors, 3)
        );

        const shootingMat = new THREE.PointsMaterial({
            size: 0.85, // clar vizibilă
            vertexColors: true,
            depthWrite: false,
            transparent: true,
            blending: THREE.AdditiveBlending,
            opacity: 1,
        });

        const shootingPoints = new THREE.Points(shootingGeo, shootingMat);
        scene.add(shootingPoints);

        function randomShootingColor(): THREE.Color {
            const idx = Math.floor(Math.random() * shootingColors.length);
            return shootingColors[idx];
        }

        // steaua începe ca inactivă
        shootingStarsData[0] = {
            velocity: new THREE.Vector3(0, 0, 0),
            life: 0,
            maxLife: 0,
            active: false,
        };

        function resetShootingStar(index: number): void {
            const i3 = index * 3;

            // alegem direcția: true = stânga -> dreapta, false = dreapta -> stânga
            const fromLeft = Math.random() < 0.5;

            const startX = fromLeft ? -140 : 140;
            const endX = -startX;

            // Y relativ central, ca să „taie” ecranul
            const y = (Math.random() - 0.5) * 40;
            // Z ușor în față sau spate
            const z = -20 + Math.random() * 40;

            shootingStarPositions[i3] = startX;
            shootingStarPositions[i3 + 1] = y;
            shootingStarPositions[i3 + 2] = z;

            // ținta e la capătul opus
            const target = new THREE.Vector3(endX, y + (Math.random() - 0.5) * 10, z);

            const dir = new THREE.Vector3(
                target.x - startX,
                target.y - y,
                target.z - z
            ).normalize();

            // viteză destul de mare ca să traverseze în ~2 secunde
            const speed = 120 + Math.random() * 40;

            shootingStarsData[index] = {
                velocity: dir.multiplyScalar(speed),
                life: 0,
                maxLife: 2.2 + Math.random() * 0.4, // ~2–2.6s
                active: true,
            };

            const c = randomShootingColor();
            shootingStarColors[i3] = c.r;
            shootingStarColors[i3 + 1] = c.g;
            shootingStarColors[i3 + 2] = c.b;

            (shootingGeo.getAttribute("position") as THREE.BufferAttribute).needsUpdate =
                true;
            (shootingGeo.getAttribute("color") as THREE.BufferAttribute).needsUpdate =
                true;
        }

        // spawn random: între 2 și 6 secunde
        let shootingSpawnTimer = 0;
        let nextSpawnDelay = 2 + Math.random() * 4;

        // =========================
        // CAMERA & NAVIGARE CU MOUSE
        // =========================
        let camRadius = 55;
        let camTheta = Math.PI / 2.2;
        let camPhi = Math.PI / 2.3;

        const MIN_RADIUS = 15;
        const MAX_RADIUS = 140;
        const MIN_PHI = 0.25;
        const MAX_PHI = Math.PI - 0.25;

        const targetRot = { x: 0, y: 0 };
        const currentRot = { x: 0, y: 0 };

        let isDragging = false;
        let dragStartX = 0;
        let dragStartY = 0;
        let thetaOnDown = camTheta;
        let phiOnDown = camPhi;
        let activePointerId: number | null = null;

        const onPointerDown = (e: PointerEvent) => {
            isDragging = true;
            dragStartX = e.clientX;
            dragStartY = e.clientY;
            thetaOnDown = camTheta;
            phiOnDown = camPhi;
            activePointerId = e.pointerId;
            canvas.setPointerCapture(e.pointerId);
        };

        const onPointerMove = (e: PointerEvent) => {
            const rect = canvas.getBoundingClientRect();
            const nx = (e.clientX - rect.left) / rect.width;
            const ny = (e.clientY - rect.top) / rect.height;
            const mx = nx * 2 - 1;
            const my = ny * 2 - 1;

            // parallax fin
            targetRot.y = mx * 0.2;
            targetRot.x = my * 0.15;

            if (!isDragging) return;

            const dx = e.clientX - dragStartX;
            const dy = e.clientY - dragStartY;
            const ROT_SPEED = 0.005;

            camTheta = thetaOnDown - dx * ROT_SPEED;
            camPhi = THREE.MathUtils.clamp(
                phiOnDown - dy * ROT_SPEED,
                MIN_PHI,
                MAX_PHI
            );
        };

        const endDrag = () => {
            isDragging = false;
            if (activePointerId !== null) {
                try {
                    canvas.releasePointerCapture(activePointerId);
                } catch {
                    // ignore
                }
                activePointerId = null;
            }
        };

        const onPointerLeave = () => {
            targetRot.x = 0;
            targetRot.y = 0;
        };

        const onWheel = (e: WheelEvent) => {
            e.preventDefault();
            const ZOOM_SPEED = 0.0025;

            camRadius -= e.deltaY * ZOOM_SPEED * camRadius;
            camRadius = THREE.MathUtils.clamp(camRadius, MIN_RADIUS, MAX_RADIUS);
        };

        canvas.addEventListener("pointerdown", onPointerDown);
        canvas.addEventListener("pointermove", onPointerMove);
        canvas.addEventListener("pointerup", endDrag);
        canvas.addEventListener("pointercancel", endDrag);
        canvas.addEventListener("pointerleave", onPointerLeave);
        canvas.addEventListener("wheel", onWheel, { passive: false });

        // =========================
        // RESIZE
        // =========================
        const handleResize = () => {
            if (!parent) return;
            const w = parent.clientWidth;
            const h = parent.clientHeight;
            renderer.setSize(w, h);
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
        };
        window.addEventListener("resize", handleResize);

        // =========================
        // ANIMARE
        // =========================
        const clock = new THREE.Clock();
        let frameId: number;
        let elapsed = 0;

        const animate = () => {
            frameId = requestAnimationFrame(animate);
            const dt = clock.getDelta();
            elapsed += dt;

            // rotație lentă generală a galaxiei
            galaxy.rotation.y += 0.0018;
            blueHaze.rotation.z += 0.0006;
            brightRing.rotation.z += 0.0009;
            coreDust.rotation.z += 0.0008;

            // sfera din mijloc se învârte clar
            core.rotation.y += 0.01;
            core.rotation.x += 0.004;
            innerGlow.rotation.y += 0.006;

            // puls nucleu + halo
            const pulse = 1 + Math.sin(elapsed * 1.5) * 0.06;
            core.scale.setScalar(pulse);
            const haloScale = 1.15 + Math.sin(elapsed * 1.1) * 0.08;
            innerGlow.scale.setScalar(haloScale);

            // explozii cosmice animate
            explosions.forEach((exp, idx) => {
                const s =
                    exp.baseScale *
                    (1 + Math.sin(elapsed * (0.6 + idx * 0.4)) * 0.12 + 0.05);
                exp.sprite.scale.set(s, s, 1);

                const spriteMat = exp.sprite.material as THREE.SpriteMaterial;
                spriteMat.opacity =
                    0.55 + Math.sin(elapsed * (0.8 + idx * 0.3)) * 0.25;
            });

            // SPAWN LOGIC pentru steaua căzătoare (una singură, din când în când)
            const starData = shootingStarsData[0];
            if (!starData.active) {
                shootingSpawnTimer += dt;
                if (shootingSpawnTimer > nextSpawnDelay) {
                    resetShootingStar(0);
                    shootingSpawnTimer = 0;
                    nextSpawnDelay = 2 + Math.random() * 4; // 2–6s până la următoarea
                }
            }

            // mișcare stea căzătoare dacă e activă
            if (starData.active) {
                const i3 = 0 * 3;
                starData.life += dt;

                shootingStarPositions[i3] += starData.velocity.x * dt;
                shootingStarPositions[i3 + 1] += starData.velocity.y * dt;
                shootingStarPositions[i3 + 2] += starData.velocity.z * dt;

                const posVec = new THREE.Vector3(
                    shootingStarPositions[i3],
                    shootingStarPositions[i3 + 1],
                    shootingStarPositions[i3 + 2]
                );

                const distFromCenter = posVec.length();

                if (
                    starData.life > starData.maxLife ||
                    distFromCenter > 260
                ) {
                    // oprim steaua, următoarea va apărea după delay random
                    starData.active = false;
                }

                (shootingGeo.getAttribute("position") as THREE.BufferAttribute).needsUpdate =
                    true;
            }

            // easing pentru parallax
            currentRot.x += (targetRot.x - currentRot.x) * 0.06;
            currentRot.y += (targetRot.y - currentRot.y) * 0.06;
            galaxy.rotation.x = 0.35 + currentRot.x;
            galaxy.rotation.y += currentRot.y * 0.02;

            // orbită automat când nu tragi de mouse
            if (!isDragging) {
                camTheta += 0.0004;
            }

            const camX = camRadius * Math.sin(camPhi) * Math.cos(camTheta);
            const camZ = camRadius * Math.sin(camPhi) * Math.sin(camTheta);
            const camY = camRadius * Math.cos(camPhi) * 0.55;

            camera.position.set(camX, camY, camZ);
            camera.lookAt(0, 0, 0);

            renderer.render(scene, camera);
        };

        animate();

        // =========================
        // CLEANUP
        // =========================
        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener("resize", handleResize);

            canvas.removeEventListener("pointerdown", onPointerDown);
            canvas.removeEventListener("pointermove", onPointerMove);
            canvas.removeEventListener("pointerup", endDrag);
            canvas.removeEventListener("pointercancel", endDrag);
            canvas.removeEventListener("pointerleave", onPointerLeave);
            canvas.removeEventListener("wheel", onWheel);

            renderer.dispose();
            coreGeo.dispose();
            coreMat.dispose();
            innerGlowGeo.dispose();
            innerGlowMat.dispose();
            ringGeo.dispose();
            ringMat.dispose();
            hazeGeo.dispose();
            hazeMat.dispose();
            dustGeo.dispose();
            dustMat.dispose();
            starsGeo.dispose();
            starsMat.dispose();
            shootingGeo.dispose();
            shootingMat.dispose();

            explosions.forEach((exp) => {
                const mat = exp.sprite.material as THREE.SpriteMaterial;
                const tex = mat.map as THREE.Texture | null;
                if (tex) tex.dispose();
                mat.dispose();
            });
        };
    }, []);

    return <canvas ref={canvasRef} className="interactive-universe-canvas" />;
};

export default UniverseScene3D;
