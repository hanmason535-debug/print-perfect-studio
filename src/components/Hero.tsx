import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Upload, MessageCircle, ChevronDown, Users, Zap, Award } from "lucide-react";
import FileUploadModal from "./FileUploadModal";
import heroBg from "@/assets/hero-bg.jpg";

const PHONE = "919377476343";
const WA_URL = `https://wa.me/${PHONE}?text=${encodeURIComponent("Hi, I'm interested in your printing services. Can you share more details?")}`;

const trustItems = [
  { icon: Users, label: "50,000+ Happy Clients", color: "text-cyan" },
  { icon: Zap, label: "24hr Express Service", color: "text-magenta" },
  { icon: Award, label: "Premium Quality", color: "text-yellow" },
];

const words = ["Printing", "Branding", "Packaging", "Design"];

const Hero = () => {
  const [uploadOpen, setUploadOpen] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const heroRef = useRef(null);
  const isInView = useInView(heroRef, { once: false, amount: 0.1 });

  useEffect(() => {
    if (!isInView) return;

    const word = words[currentWordIndex];
    let timer: NodeJS.Timeout;

    const handleTyping = () => {
      if (!isDeleting && currentText === word) {
        timer = setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && currentText === "") {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
        setTypingSpeed(150);
      } else {
        const nextText = isDeleting
          ? word.substring(0, currentText.length - 1)
          : word.substring(0, currentText.length + 1);

        setCurrentText(nextText);
        setTypingSpeed(isDeleting ? 50 : 150 - Math.random() * 50);
      }
    };

    timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, typingSpeed, isInView]);

  return (
    <section id="home" ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-navy">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-100"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      {/* Background gradient overlay - Dark top/middle, 80% opacity bottom for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy/85 via-60% to-navy/80" />

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
          className="font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-navy-foreground leading-tight min-h-[2.5em] sm:min-h-[2.2em]"
        >
          Premium <span className="text-cyan">{currentText}</span>
          <span className="animate-pulse">|</span>
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
