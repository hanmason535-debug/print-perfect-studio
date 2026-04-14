import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Upload, FileCheck, Printer, Truck } from "lucide-react";

const steps = [
  { icon: Upload, label: "Upload Design", desc: "Send us your artwork via WhatsApp or our form" },
  { icon: FileCheck, label: "Digital Proofing", desc: "We review & send a digital proof for approval" },
  { icon: Printer, label: "Precision Printing", desc: "State-of-the-art machines bring it to life" },
  { icon: Truck, label: "Fast Delivery", desc: "Delivered to your doorstep on time" },
];

const iconColors = [
  "text-cyan bg-cyan/10 border-cyan/20",
  "text-magenta bg-magenta/10 border-magenta/20",
  "text-yellow bg-yellow/10 border-yellow/20",
  "text-cyan bg-cyan/10 border-cyan/20",
];

const OurProcess = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.5"],
  });

  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={ref} className="py-20 bg-navy text-navy-foreground overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mb-16"
        >
          <span className="text-cyan text-sm font-medium tracking-widest uppercase">How We Work</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mt-2">
            From File to Finish in 4 Steps
          </h2>
        </motion.div>

        {/* Desktop horizontal timeline */}
        <div className="hidden md:block relative">
          {/* Connecting line background */}
          <div className="absolute top-10 left-[12.5%] right-[12.5%] h-px bg-navy-foreground/20" />
          {/* Animated line */}
          <motion.div
            className="absolute top-10 left-[12.5%] h-px bg-gradient-to-r from-cyan via-magenta to-yellow"
            style={{ width: lineWidth, maxWidth: "75%" }}
          />

          <div className="flex justify-between">
            {steps.map((step, i) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.2,
                  duration: 0.5,
                  ease: [0.4, 0, 0.2, 1],
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                }}
                className="flex flex-col items-center text-center w-1/4 px-2"
              >
                <div className={`w-20 h-20 rounded-2xl border flex items-center justify-center mb-4 ${iconColors[i]}`}>
                  <step.icon size={28} strokeWidth={1.5} />
                </div>
                <span className="text-xs text-navy-foreground/50 font-medium mb-1">Step {i + 1}</span>
                <h3 className="font-heading font-semibold text-sm text-navy-foreground">{step.label}</h3>
                <p className="text-xs text-navy-foreground/60 mt-1 max-w-[180px]">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile vertical timeline */}
        <div className="md:hidden relative pl-10">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-navy-foreground/20" />
          <motion.div
            className="absolute left-4 top-0 w-px bg-gradient-to-b from-cyan via-magenta to-yellow"
            style={{ height: lineWidth }}
          />

          <div className="space-y-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                className="relative"
              >
                {/* Dot on line */}
                <div className={`absolute -left-10 top-1 w-3 h-3 rounded-full border-2 ${i === 0 ? "bg-cyan border-cyan" : i === 1 ? "bg-magenta border-magenta" : i === 2 ? "bg-yellow border-yellow" : "bg-cyan border-cyan"}`} />
                <span className="text-xs text-navy-foreground/50 font-medium">Step {i + 1}</span>
                <h3 className="font-heading font-semibold text-sm text-navy-foreground">{step.label}</h3>
                <p className="text-xs text-navy-foreground/60 mt-0.5">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurProcess;
