import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, MapPin, MessageCircle } from "lucide-react";

const PHONE = "919377476343";
const WA_URL = `https://wa.me/${PHONE}?text=${encodeURIComponent("Hi, I'm interested in your printing services. Can you share more details?")}`;
const MAPS_URL = "https://maps.google.com/?q=Paras+Graphics,+Chandrika+Chamber,+Mirzapur+Rd,+Ahmedabad";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = ["contact", "portfolio", "services", "home"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-navy/90 backdrop-blur-xl shadow-premium"
          : "bg-navy/50 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between h-16 md:h-18">
        {/* Logo */}
        <a href="#home" onClick={() => handleNav("#home")} className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.12, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 12 }}
            className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan to-primary flex items-center justify-center text-primary-foreground font-heading font-bold text-lg"
          >
            PG
          </motion.div>
          <div className="hidden sm:block">
            <div className="text-primary-foreground font-heading font-bold text-base leading-tight">Paras Graphics</div>
            <div className="text-primary-foreground/60 text-[10px] font-body tracking-widest uppercase">Premium Printing</div>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeSection === link.href.slice(1)
                  ? "text-cyan bg-cyan/10"
                  : "text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/5"
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-2">
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="relative w-9 h-9 rounded-full flex items-center justify-center text-primary-foreground/70 hover:text-cyan transition-colors border border-primary-foreground/20 hover:border-cyan/50"
          >
            <MapPin size={16} />
          </a>
          <a
            href={`tel:+${PHONE}`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-cyan/20 text-cyan hover:bg-cyan/30 transition-colors"
          >
            <Phone size={14} />
            Call
          </a>
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-whatsapp/20 text-whatsapp hover:bg-whatsapp/30 transition-colors"
          >
            <MessageCircle size={14} />
            WhatsApp
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden w-10 h-10 flex items-center justify-center text-primary-foreground"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-navy/95 backdrop-blur-xl overflow-hidden border-t border-primary-foreground/10"
          >
            <div className="px-4 py-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className="text-left text-primary-foreground/80 hover:text-cyan py-2 px-3 rounded-lg hover:bg-cyan/10 transition-colors font-medium"
                >
                  {link.label}
                </button>
              ))}
              <div className="flex gap-2 mt-2 pt-2 border-t border-primary-foreground/10">
                <a
                  href={`tel:+${PHONE}`}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full bg-cyan/20 text-cyan text-sm font-medium"
                >
                  <Phone size={16} /> Call Now
                </a>
                <a
                  href={WA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full bg-whatsapp/20 text-whatsapp text-sm font-medium"
                >
                  <MessageCircle size={16} /> WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
