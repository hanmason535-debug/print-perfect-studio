import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, MapPin, MessageCircle, CreditCard, Image, Sticker, Shirt } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import React from "react";

const PHONE = "919377476343";
const WA_URL = `https://wa.me/${PHONE}?text=${encodeURIComponent("Hi, I'm interested in your printing services. Can you share more details?")}`;
const MAPS_URL = "https://maps.google.com/?q=Paras+Graphics,+Chandrika+Chamber,+Mirzapur+Rd,+Ahmedabad";

const simpleLinks = [
  { label: "Home", href: "#home" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
];

const serviceItems = [
  { title: "Business Cards", description: "Premium cards that make lasting first impressions.", icon: CreditCard, href: "#services" },
  { title: "Flex Banners", description: "Large-format prints for maximum visual impact.", icon: Image, href: "#services" },
  { title: "Vinyl Stickers", description: "Durable, weather-resistant custom stickers.", icon: Sticker, href: "#services" },
  { title: "Corporate Apparel", description: "Branded clothing and merchandise printing.", icon: Shirt, href: "#services" },
];

const ListItem = React.forwardRef<HTMLAnchorElement, React.ComponentPropsWithoutRef<"a"> & { title: string; icon: React.ElementType }>(
  ({ className, title, children, icon: Icon, ...props }, ref) => (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "flex items-start gap-3 select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-primary/10 focus:bg-primary/10 group",
            className
          )}
          {...props}
        >
          <Icon className="h-5 w-5 mt-0.5 text-primary shrink-0 group-hover:text-primary/80 transition-colors" />
          <div>
           <div className="text-sm font-medium leading-none text-foreground">{title}</div>
             <p className="line-clamp-2 text-xs leading-snug text-muted-foreground mt-1">{children}</p>
          </div>
        </a>
      </NavigationMenuLink>
    </li>
  )
);
ListItem.displayName = "ListItem";

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
            <div className="text-primary-foreground/60 text-[10px] font-body tracking-widest uppercase">Premium Print</div>
          </div>
        </a>

        {/* Desktop Nav with NavigationMenu */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {/* Home link */}
            <NavigationMenuItem>
              <button
                onClick={() => handleNav("#home")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeSection === "home"
                    ? "text-cyan bg-cyan/10"
                    : "text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/5"
                }`}
              >
                Home
              </button>
            </NavigationMenuItem>

            {/* Services Dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger
                onClick={() => handleNav("#services")}
                className={`px-4 py-2 rounded-full text-sm font-medium bg-transparent border-0 transition-all duration-200 ${
                  activeSection === "services"
                    ? "text-cyan bg-cyan/10"
                    : "text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/5"
                }`}
              >
                Services
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-[520px] bg-card/90 backdrop-blur-xl border border-border rounded-xl p-4 shadow-2xl">
                  <div className="grid grid-cols-5 gap-3">
                    {/* Left highlight column */}
                    <div className="col-span-2 rounded-lg bg-gradient-to-br from-cyan/20 via-primary/10 to-cyan/5 p-4 flex flex-col justify-end border border-cyan/10">
                       <div className="text-foreground font-heading font-bold text-base leading-tight mb-2">
                         Premium Commercial Printing
                       </div>
                       <p className="text-muted-foreground text-xs leading-relaxed">
                        We deliver high-quality prints for every scale of business.
                      </p>
                    </div>
                    {/* Right column list */}
                    <ul className="col-span-3 grid gap-1">
                      {serviceItems.map((item) => (
                        <ListItem
                          key={item.title}
                          title={item.title}
                          icon={item.icon}
                          href={item.href}
                          onClick={(e) => {
                            e.preventDefault();
                            handleNav(item.href);
                          }}
                        >
                          {item.description}
                        </ListItem>
                      ))}
                    </ul>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Portfolio & Contact */}
            {simpleLinks.slice(1).map((link) => (
              <NavigationMenuItem key={link.href}>
                <button
                  onClick={() => handleNav(link.href)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeSection === link.href.slice(1)
                      ? "text-cyan bg-cyan/10"
                      : "text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/5"
                  }`}
                >
                  {link.label}
                </button>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-2">
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="relative w-9 h-9 rounded-full flex items-center justify-center text-primary-foreground/70 hover:text-primary-foreground transition-colors border border-primary-foreground/20 hover:border-primary-foreground/50 group"
          >
            <span className="relative inline-block w-4 h-4">
              <MapPin size={16} className="absolute inset-0" />
              <span className="absolute left-[6px] top-[4.5px] w-[4px] h-[4px] rounded-full bg-foreground opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
            </span>
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
          <ThemeToggle />
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
              {[{ label: "Home", href: "#home" }, { label: "Services", href: "#services" }, { label: "Portfolio", href: "#portfolio" }, { label: "Contact", href: "#contact" }].map((link) => (
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
