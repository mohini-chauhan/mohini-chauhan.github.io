import React from "react";
import { motion } from "framer-motion";
import Toggle from "./Toggle";

export default function Header() {


  return (
    <header className="h-14 flex items-center gap-4 px-3.5 py-2 border-b border-border">
      <h1 className="text-xl font-bold header-foreground">
        Glad You’re Here{" "}
        <motion.span
          className="inline-block origin-bottom-right"
          animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 2,
            ease: "easeInOut",
          }}
        >
          👋
        </motion.span>
      </h1>
      <Toggle/>
    </header>
  );
}
