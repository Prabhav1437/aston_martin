'use client';

import { useMotionValueEvent, MotionValue } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface ValkyrieScrollCanvasProps {
    scrollYProgress: MotionValue<number>;
    totalFrames: number;
    imageFolderPath: string;
}

export default function ValkyrieScrollCanvas({
    scrollYProgress,
    totalFrames,
    imageFolderPath,
}: ValkyrieScrollCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    // 1. Preload Images
    useEffect(() => {
        let loadedCount = 0;
        const loadedImages: HTMLImageElement[] = [];

        for (let i = 0; i < totalFrames; i++) {
            const img = new Image();
            img.src = `${imageFolderPath}/${i + 1}.jpg`;
            img.onload = () => {
                loadedCount++;
                if (loadedCount === totalFrames) {
                    setImagesLoaded(true);
                }
            };
            loadedImages.push(img);
        }

        setImages(loadedImages);
    }, [totalFrames, imageFolderPath]);

    // 2. Render Logic
    const renderFrame = (index: number) => {
        const canvas = canvasRef.current;
        if (!canvas || !images[index]) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const ratio = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();

        // Handle high-DPI scaling
        if (canvas.width !== rect.width * ratio || canvas.height !== rect.height * ratio) {
            canvas.width = rect.width * ratio;
            canvas.height = rect.height * ratio;
            ctx.scale(ratio, ratio);
        }

        // Clear canvas with deep black/green (Aston Black)
        ctx.fillStyle = "#0B0C0B";
        ctx.fillRect(0, 0, rect.width, rect.height);

        const img = images[index];

        // Object-fit: COVER logic
        const imgRatio = img.width / img.height;
        const canvasRatio = rect.width / rect.height;

        let drawWidth, drawHeight, offsetX, offsetY;

        if (canvasRatio > imgRatio) {
            // Canvas is wider than image (relative to aspect)
            drawWidth = rect.width;
            drawHeight = rect.width / imgRatio;
            offsetX = 0;
            offsetY = (rect.height - drawHeight) / 2;
        } else {
            // Canvas is taller than image (relative to aspect)
            drawHeight = rect.height;
            drawWidth = rect.height * imgRatio;
            offsetY = 0;
            offsetX = (rect.width - drawWidth) / 2;
        }

        // Draw
        if (img.complete) {
            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        }
    };

    // 3. Update Frame on Scroll (Framer Motion)
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (!images || images.length === 0 || !imagesLoaded) return;

        const frameIndex = Math.min(
            totalFrames - 1,
            Math.floor(latest * totalFrames)
        );

        if (currentIndex !== frameIndex) {
            setCurrentIndex(frameIndex);
            requestAnimationFrame(() => renderFrame(frameIndex));
        }
    });

    // 4. Handle Resize & Initial Render
    useEffect(() => {
        const handleResize = () => {
            requestAnimationFrame(() => renderFrame(currentIndex));
        };

        window.addEventListener('resize', handleResize);

        // Initial render if loaded
        if (imagesLoaded) {
            renderFrame(currentIndex);
        }

        return () => window.removeEventListener('resize', handleResize);
    }, [currentIndex, imagesLoaded]);

    return (
        <canvas
            ref={canvasRef}
            className="w-full h-full object-cover pointer-events-none block"
        />
    );
}
