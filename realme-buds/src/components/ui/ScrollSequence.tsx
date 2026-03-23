"use client";

import { useMotionValueEvent, MotionValue } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";

interface ScrollSequenceProps {
  progress: MotionValue<number>;
}

export default function ScrollSequence({ progress }: ScrollSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  
  const frameCount = 240;

  const drawFrame = useCallback((img: HTMLImageElement | undefined) => {
    if (!canvasRef.current || !img || !img.complete || img.naturalHeight === 0) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const windowRatio = window.innerWidth / window.innerHeight;
    const imageRatio = img.width / img.height;
    
    let drawWidth = canvas.width;
    let drawHeight = canvas.height;
    let offsetX = 0;
    let offsetY = 0;

    if (windowRatio > imageRatio) {
      drawWidth = canvas.width;
      drawHeight = canvas.width / imageRatio;
      offsetY = (canvas.height - drawHeight) / 2;
    } else {
      drawWidth = canvas.height * imageRatio;
      drawHeight = canvas.height;
      offsetX = (canvas.width - drawWidth) / 2;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }, []);

  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      const indexStr = i.toString().padStart(3, '0');
      img.src = `/frames/ezgif-frame-${indexStr}.jpg`;
      
      img.onload = () => {
        loadedCount++;
        // If it's the very first frame and the canvas is ready, draw it
        if (i === 1) {
          requestAnimationFrame(() => drawFrame(img));
        }
        if (loadedCount === frameCount) {
          setImagesLoaded(true);
        }
      };
      
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, [drawFrame]);

  useEffect(() => {
    const updateSize = () => {
      if (canvasRef.current) {
        const dpr = window.devicePixelRatio || 1;
        canvasRef.current.width = window.innerWidth * dpr;
        canvasRef.current.height = window.innerHeight * dpr;
        
        const currentFrameIndex = Math.min(
          frameCount - 1,
          Math.max(0, Math.round(progress.get() * (frameCount - 1)))
        );
        if (images[currentFrameIndex]) {
          requestAnimationFrame(() => drawFrame(images[currentFrameIndex]));
        }
      }
    };
    
    window.addEventListener("resize", updateSize);
    updateSize(); 
    
    return () => window.removeEventListener("resize", updateSize);
  }, [images, progress, drawFrame]);

  useMotionValueEvent(progress, "change", (latest) => {
    if (images.length === 0) return;
    
    const frameIndex = Math.min(
      frameCount - 1,
      Math.max(0, Math.floor(latest * frameCount))
    );
    
    if (images[frameIndex]) {
      requestAnimationFrame(() => {
        drawFrame(images[frameIndex]);
      });
    }
  });

  return (
    <div className="sticky top-0 left-0 w-full h-screen bg-[#050505] overflow-hidden z-0">
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
