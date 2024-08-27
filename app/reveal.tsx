"use client";
import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

interface Props {
  children: JSX.Element;
  width?: "fit-content" | "100%";
  direction?: "up" | "down" | "left" | "right"; // Add direction prop
  distance?: number; // Add distance prop for custom distance
  duration?: number; // Add duration prop for animation timing
  delay?: number; // Add delay prop for animation delay
}

export const Reveal = ({
  children,
  width = "fit-content",
  direction = "up", // Default animation direction
  distance = 75, // Default distance for the motion
  duration = 0.5, // Default duration for the animation
  delay = 0.25, // Default delay before the animation starts
}: Props) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  const getVariants = () => {
    let initialPosition;
    switch (direction) {
      case "up":
        initialPosition = { y: distance };
        break;
      case "down":
        initialPosition = { y: -distance };
        break;
      case "left":
        initialPosition = { x: distance };
        break;
      case "right":
        initialPosition = { x: -distance };
        break;
      default:
        initialPosition = { y: distance };
    }

    return {
      hidden: { opacity: 0, ...initialPosition },
      visible: { opacity: 1, x: 0, y: 0 },
    };
  };

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        width,
        overflow: "hidden",
        display: "inline-block", // Maintain inline styling for children
        textAlign: "center", // Center align text
      }}
    >
      <motion.div
        variants={getVariants()}
        initial="hidden"
        animate={mainControls}
        transition={{ duration, delay }}
      >
        {children}
      </motion.div>
    </div>
  );
};
