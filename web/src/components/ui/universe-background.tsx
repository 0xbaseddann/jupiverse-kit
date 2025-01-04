"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

interface UniverseBackgroundProps {
  className?: string;
}

interface Star {
  x: number;
  y: number;
  size: number;
  speed: number;
  angle: number;
  brightness: number;
  twinkleSpeed: number;
  color: string;
}

export function UniverseBackground({ className }: UniverseBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size to window size
    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Star colors based on theme
    const starColors =
      theme === "dark"
        ? [
            "#ffffff", // Pure white
            "#fffaf0", // Warm white
            "#f0f8ff", // Cool white
            "#fff5ee", // Seashell
            "#ffd700", // Gold
          ]
        : [
            "#000000", // Pure black
            "#1a1a1a", // Dark gray
            "#2c2c2c", // Medium gray
            "#3d3d3d", // Light gray
            "#4a4a4a", // Charcoal
          ];

    // Star properties
    const stars: Star[] = [];
    const numStars = 400; // Keep increased number of stars

    // Initialize stars
    for (let i = 0; i < numStars; i++) {
      const isBigStar = Math.random() < 0.15; // 15% chance of being a bigger star
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: isBigStar ? Math.random() * 2 + 1.5 : Math.random() * 1 + 0.7, // Slightly reduced sizes
        speed: Math.random() * 0.3 + 0.1,
        angle: Math.random() * Math.PI * 2,
        brightness: Math.random() * 0.3 + 0.7,
        twinkleSpeed: Math.random() * 0.05 + 0.01,
        color: starColors[Math.floor(Math.random() * starColors.length)],
      });
    }

    let time = 0;
    let fadeInOpacity = 0;
    const fadeInDuration = 60;
    let frame = 0;

    // Animation function
    function animate() {
      if (!ctx || !canvas) return;

      // Handle fade in
      if (frame < fadeInDuration) {
        fadeInOpacity = frame / fadeInDuration;
        frame++;
      } else if (!isLoaded) {
        setIsLoaded(true);
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.016;

      // Draw and update stars
      stars.forEach((star) => {
        // Update position
        const dx = Math.cos(star.angle) * star.speed;
        const dy = Math.sin(star.angle) * star.speed;
        star.x += dx;
        star.y += dy;

        // Calculate twinkling effect
        const twinkle =
          Math.sin(time * star.twinkleSpeed * Math.PI) * 0.3 + 0.7;
        const brightness = star.brightness * twinkle * fadeInOpacity;

        // Create gradient for star glow
        const gradient = ctx.createRadialGradient(
          star.x,
          star.y,
          0,
          star.x,
          star.y,
          star.size * 2 // Reduced glow radius
        );
        gradient.addColorStop(
          0,
          `${star.color}${Math.floor(brightness * 255)
            .toString(16)
            .padStart(2, "0")}`
        );
        gradient.addColorStop(
          0.1,
          `${star.color}${Math.floor(brightness * 200)
            .toString(16)
            .padStart(2, "0")}`
        );
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

        // Draw star glow
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2);
        ctx.fill();

        // Draw star core
        ctx.fillStyle = `${star.color}${Math.floor(brightness * 255)
          .toString(16)
          .padStart(2, "0")}`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * 0.5, 0, Math.PI * 2); // Reduced core size
        ctx.fill();

        // Wrap around screen edges
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;

        // Occasionally change direction slightly
        if (Math.random() < 0.001) {
          star.angle += (Math.random() - 0.5) * 0.5;
        }
      });

      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [theme]); // Add theme as a dependency

  return (
    <div
      className={cn(
        "fixed inset-0 -z-10 transition-opacity duration-1000",
        isLoaded ? "opacity-100" : "opacity-0",
        className
      )}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{
          backgroundColor: theme === "dark" ? "black" : "white",
        }}
      />
    </div>
  );
}
