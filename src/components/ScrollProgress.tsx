import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUp } from "lucide-react";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const opacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <motion.button
      onClick={scrollToTop}
      style={{ opacity, willChange: "transform, opacity" }}
      className="fixed bottom-28 right-[34px] z-40 w-11 h-11 rounded-full flex items-center justify-center cursor-pointer group will-change-transform"
      aria-label="Scroll to top"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <svg width="44" height="44" viewBox="0 0 44 44" className="absolute inset-0 -rotate-90">
        <circle
          cx="22" cy="22" r="19"
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth="3"
        />
        <motion.circle
          cx="22" cy="22" r="19"
          fill="none"
          stroke="hsl(var(--cyan))"
          strokeWidth="3"
          strokeLinecap="round"
          style={{ pathLength: smoothProgress }}
        />
      </svg>
      <ArrowUp size={16} className="text-foreground group-hover:text-cyan transition-colors relative z-10" />
    </motion.button>
  );
};

export default ScrollProgress;
