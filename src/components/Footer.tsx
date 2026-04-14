import { Phone, Mail, Clock } from "lucide-react";
import { motion } from "framer-motion";

const PHONE = "919377476343";

const Footer = () => {

  return (
    <footer className="bg-charcoal text-charcoal-foreground pt-16 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">
          {/* Company */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan to-primary flex items-center justify-center font-heading font-bold text-primary-foreground text-lg transition-all duration-300 hover:scale-110 hover:rotate-[5deg] hover:shadow-[0_0_12px_hsl(191_85%_50%/0.3)]">
                PG
              </div>
              <div>
                <div className="font-heading font-bold text-base">Paras Graphics</div>
                <div className="text-charcoal-foreground/50 text-[10px] tracking-widest uppercase">Print Perfect</div>
              </div>
            </div>
            <p className="text-charcoal-foreground/60 text-sm leading-relaxed">
              Your trusted printing partner in Ahmedabad. Delivering premium quality prints since 1997.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          >
            <h4 className="font-heading font-semibold text-sm mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["Services", "Portfolio", "Contact"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="underline-slide text-charcoal-foreground/60 text-sm hover:text-cyan transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
              <li>
                <button
                  onClick={() => {
                    const hero = document.getElementById("home");
                    hero?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-charcoal-foreground/60 text-sm hover:text-cyan transition-colors"
                >
                  Upload File
                </button>
              </li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          >
            <h4 className="font-heading font-semibold text-sm mb-4">Contact</h4>
            <div className="space-y-3">
              <a href={`tel:+${PHONE}`} className="flex items-center gap-2 text-charcoal-foreground/60 text-sm hover:text-cyan transition-colors">
                <Phone size={14} /> +91 93774 76343
              </a>
              <a href="mailto:parasgph@gmail.com" className="flex items-center gap-2 text-charcoal-foreground/60 text-sm hover:text-cyan transition-colors">
                <Mail size={14} /> parasgph@gmail.com
              </a>
              <div className="flex items-center gap-2 text-charcoal-foreground/60 text-sm">
                <Clock size={14} /> Mon–Sat: 11AM–8PM
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom */}
        <div className="h-px bg-gradient-to-r from-transparent via-charcoal-foreground/10 to-transparent mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-charcoal-foreground/40 text-xs">
            © {new Date().getFullYear()} Paras Graphics, Ahmedabad. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="/privacy-policy" className="text-charcoal-foreground/40 text-xs hover:text-cyan transition-colors">Privacy Policy</a>
            <a href="/terms" className="text-charcoal-foreground/40 text-xs hover:text-cyan transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
