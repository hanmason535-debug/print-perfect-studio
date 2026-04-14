import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const swatches = [
  {
    id: "matte",
    name: "Premium Matte",
    description: "Elegant, soft-touch finish with zero glare. Perfect for minimalist corporate branding.",
    color: "bg-charcoal",
    shine: "bg-white/5",
    effect: "Soft Velvet Texture",
  },
  {
    id: "gloss",
    name: "Glossy UV",
    description: "High-shine protective coating that makes colors pop and provides water resistance.",
    color: "bg-navy",
    shine: "bg-gradient-to-br from-white/30 via-transparent to-transparent",
    effect: "Glass-like Shine",
  },
  {
    id: "spot-uv",
    name: "Spot UV",
    description: "Strategic gloss highlights on a matte background. Adds incredible depth and tactile feel.",
    color: "bg-charcoal",
    patterns: true,
    effect: "Raised Selective Gloss",
  },
  {
    id: "foil",
    name: "Golden Foil",
    description: "Metallic gold stamping for luxury branding. Reflects light with a rich, prestigious glow.",
    color: "bg-gradient-to-br from-amber-400 via-amber-200 to-amber-600",
    shine: "bg-white/40",
    effect: "Metallic Stamping",
  },
];

const MaterialSwatches = () => {
  const [active, setActive] = useState(swatches[0]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section id="materials" className="py-24 bg-navy overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-cyan text-sm font-medium tracking-widest uppercase mb-3 block">Premium Finishes</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white">
            The Science of <span className="text-cmyk-gradient">Texture</span>
          </h2>
          <p className="mt-4 text-white/60 max-w-2xl mx-auto">
            Experience our specialty finishes. Move your mouse over the swatches to see how they interact with light.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Swatch Selector */}
          <div className="grid grid-cols-2 gap-4">
            {swatches.map((swatch) => (
              <motion.button
                key={swatch.id}
                onClick={() => setActive(swatch)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "relative aspect-video rounded-xl p-4 flex flex-col justify-end text-left overflow-hidden transition-all duration-300",
                  active.id === swatch.id 
                    ? "ring-2 ring-cyan shadow-[0_0_20px_rgba(0,255,255,0.2)]" 
                    : "ring-1 ring-white/10 opacity-70 hover:opacity-100"
                )}
              >
                <div className={cn("absolute inset-0 z-0", swatch.color)} />
                <div className="relative z-10">
                  <span className="block text-xs font-semibold text-white/50 uppercase tracking-tighter mb-1">
                    {swatch.effect}
                  </span>
                  <span className="block text-sm font-bold text-white">
                    {swatch.name}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Large Preview */}
          <div 
            className="relative aspect-square sm:aspect-video lg:aspect-square rounded-2xl overflow-hidden bg-charcoal border border-white/5 shadow-2xl group"
            onMouseMove={handleMouseMove}
          >
            {/* Base Color */}
            <div className={cn("absolute inset-0 transition-colors duration-500", active.color)} />
            
            {/* Pattern for Spot UV */}
            {active.id === "spot-uv" && (
              <div 
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                  backgroundSize: "24px 24px"
                }}
              />
            )}

            {/* Dynamic Lighting Effect */}
            <motion.div
              className={cn(
                "absolute pointer-events-none transition-opacity duration-300",
                active.shine || "bg-white/10"
              )}
              style={{
                width: active.id === "matte" ? "100%" : "600px",
                height: active.id === "matte" ? "100%" : "600px",
                left: mousePos.x,
                top: mousePos.y,
                transform: "translate(-50%, -50%)",
                borderRadius: "100%",
                filter: active.id === "matte" ? "blur(120px)" : "blur(40px)",
                opacity: active.id === "matte" ? 0.05 : 0.2,
              }}
            />

            {/* Content Overlay */}
            <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-12 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <span className="inline-block px-3 py-1 rounded-full bg-cyan/20 text-cyan text-[10px] font-bold uppercase tracking-widest mb-4">
                  Feature Spotlight
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">{active.name}</h3>
                <p className="text-white/60 text-sm sm:text-base leading-relaxed max-w-md">
                  {active.description}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MaterialSwatches;
