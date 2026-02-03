import { motion } from "framer-motion";
import Toggle from "./Toggle";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between gap-2 px-2 xs:px-3.5 py-2 border-b border-border bg-background/80 backdrop-blur-md">
      <h1 className="text-lg xs:text-xl font-bold header-foreground">
        Glad You're Here{" "}
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

      <Toggle />
    </header>
  );
}
