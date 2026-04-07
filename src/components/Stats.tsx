import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Calendar, Users, Printer, Zap } from "lucide-react";

interface Stat {
  icon: React.ElementType;
  value: number;
  suffix: string;
  label: string;
  displayPrefix?: string;
}

const stats: Stat[] = [
  { icon: Calendar, value: 25, suffix: "+", label: "Years Experience" },
  { icon: Users, value: 50000, suffix: "+", label: "Happy Clients" },
  { icon: Printer, value: 1, suffix: "M+", label: "Prints Delivered" },
  { icon: Zap, value: 24, suffix: "hr", label: "Express Delivery" },
];

const formatNumber = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}K` : n >= 1000000 ? `${(n / 1000000).toFixed(0)}M` : String(n));

const useCountUp = (target: number, trigger: boolean, duration = 2000) => {
  const [count, setCount] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!trigger || hasRun.current) return;
    hasRun.current = true;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [trigger, target, duration]);

  return count;
};

const StatItem = ({ stat, inView, index }: { stat: Stat; inView: boolean; index: number }) => {
  const count = useCountUp(stat.value, inView);
  const Icon = stat.icon;
  const display = stat.value >= 50000 ? `${(count / 1000).toFixed(0)},000` : String(count);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.4, 0, 0.2, 1] }}
      className="flex flex-col items-center gap-2 py-6 group"
    >
      <Icon size={28} className="text-cyan mb-1 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
      <span className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground tabular-nums">
        {display}{stat.suffix}
      </span>
      <span className="text-sm text-primary-foreground/60 font-medium">{stat.label}</span>
    </motion.div>
  );
};

const Stats = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="bg-navy py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {stats.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} inView={inView} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
