"use client";
import React, { useId } from "react";
import { motion } from "framer-motion";
import { cn } from "../cn";

export const SparklesCore = ({
  id,
  className,
  background = "transparent",
  minSize = 0.4,
  maxSize = 1,
  speed = 4,
  particleColor = "#FFFFFF",
  particleCount = 100,
}: {
  id?: string;
  className?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  particleColor?: string;
  particleCount?: number;
}) => {
  const generatedId = useId();
  const effectiveId = id || generatedId;

  return (
    <div className={cn("relative", className)}>
      <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill={background} />
        {[...Array(particleCount)].map((_, index) => {
          const randomX = Math.random() * 100;
          const randomY = Math.random() * 100;
          const randomDelay = Math.random() * speed;
          const randomSize = minSize + Math.random() * (maxSize - minSize);

          return (
            <motion.circle
              key={`particle-${effectiveId}-${index}`}
              cx={`${randomX}%`}
              cy={`${randomY}%`}
              r={randomSize}
              fill={particleColor}
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: speed,
                repeat: Infinity,
                delay: randomDelay,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </svg>
    </div>
  );
};

