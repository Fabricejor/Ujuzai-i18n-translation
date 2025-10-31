"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "../cn";

export const MovingBorder = ({
  children,
  duration = 2000,
  className,
  containerClassName,
  as: Component = "div",
}: {
  children: React.ReactNode;
  duration?: number;
  className?: string;
  containerClassName?: string;
  as?: any;
}) => {
  return (
    <Component
      className={cn(
        "relative p-[1px] overflow-hidden",
        containerClassName
      )}
    >
      <motion.div
        className="absolute inset-0"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{
          duration: duration / 1000,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0%, #fff 20%, transparent 40%)",
        }}
      />
      <div className={cn("relative", className)}>
        {children}
      </div>
    </Component>
  );
};

