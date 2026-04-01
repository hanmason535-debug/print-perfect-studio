import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, MessageCircle, ChevronDown, Users, Zap, Award } from "lucide-react";
import FileUploadModal from "./FileUploadModal";

const PHONE = "919377476343";
const WA_URL = `https://wa.me/${PHONE}?text=${encodeURIComponent("Hi, I'm interested in your printing services. Can you share more details?")}`;

const trustItems = [
  { icon: Users, label: "500+ Happy Clients", color: "text-cyan" },
  { icon: Zap, label: "24hr Express Service", color: "text-magenta" },
  { icon: Award, label: "Premium Quality", color: "text-yellow" },
];

const Hero = () => {
  const [uploadOpen, setUploadOpen] = useState(false);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-navy">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-charcoal" />

      {/* Floating CMYK shapes */}
      <motion.div
        className="absolute top-[15%] left-[10%] w-20 h-20 rounded-full bg-cyan/20 blur-sm"
        animate={{ y: [-20, 20, -20], rotate: [0, 180, 360] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[30%] right-[12%] w-16 h-16 rounded-xl bg-magenta/20 blur-sm"
        animate={{ y: [20, -20, 20], rotate: [0, -90, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[25%] left-[20%] w-14 h-14 rounded-full bg-yellow/15 blur-sm"
        animate={{ y: [10, -25, 10], rotate: [0, 120, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[60%] right-[25%] w-10 h-10 rounded-lg bg-cyan/10 blur-sm"
        animate={{ y: [-15, 15, -15] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-navy-foreground leading-tight"
        >
          Premium Printing
          <br />
          <span className="text-cmyk-gradient">Solutions</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-6 max-w-2xl mx-auto text-navy-foreground/70 text-base sm:text-lg font-body"
        >
          Your trusted print partner in Ahmedabad. From business cards to large-format banners,
          we deliver exceptional quality with fast turnaround and competitive pricing.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => setUploadOpen(true)}
            className="group flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-cyan to-primary text-primary-foreground font-semibold text-sm shadow-lg hover:shadow-cyan-glow transition-all duration-300 active:scale-95 min-w-[180px] justify-center"
          >
            <Upload size={18} />
            Upload File
          </button>
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-whatsapp text-primary-foreground font-semibold text-sm shadow-lg hover:brightness-110 transition-all duration-300 active:scale-95 min-w-[180px] justify-center"
          >
            <MessageCircle size={18} />
            WhatsApp Us
          </a>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-8"
        >
          {trustItems.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <item.icon size={16} className={item.color} />
              <span className="text-navy-foreground/60 text-xs sm:text-sm font-medium">{item.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-navy-foreground/40 text-xs uppercase tracking-widest">Scroll</span>
        <ChevronDown size={20} className="text-navy-foreground/40" />
      </motion.div>

      <FileUploadModal open={uploadOpen} onOpenChange={setUploadOpen} />
    </section>
  );
};

export default Hero;
