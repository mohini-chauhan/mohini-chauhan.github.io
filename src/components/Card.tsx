import React from "react";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly animateBorder?: boolean;
  readonly borderColor?: string;
}

export default function Card({
  children,
  className = "",
  animateBorder = false,
  borderColor = "#FFD960",
}: CardProps) {
  const baseStyles = "rounded-xl bg-background-card backdrop-blur-[2px] backdrop-opacity-5 shadow-lg p-6 w-full max-w-full overflow-hidden";

  if (!animateBorder) {
    return (
      <div className={twMerge(baseStyles, className)}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className="relative w-full max-w-full overflow-hidden"
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      {/* Card content */}
      <div className={twMerge(baseStyles, "relative", className)}>
        {children}
      </div>

      {/* Animated gradient border - positioned on top */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        style={{
          background: `linear-gradient(90deg, ${borderColor}, #4ECDC4, ${borderColor})`,
          backgroundSize: "200% 100%",
          padding: "2px",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
        variants={{
          rest: {
            opacity: 0,
          },
          hover: {
            opacity: 1,
            backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"],
            transition: {
              backgroundPosition: {
                duration: 2,
                ease: "linear",
                repeat: 0,
              },
              opacity: {
                duration: 0.3,
              },
            },
          },
        }}
      />
    </motion.div>
  );
}
