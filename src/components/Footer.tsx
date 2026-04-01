import { ArrowUp, Phone, Mail, Clock } from "lucide-react";

const PHONE = "919377476343";

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-charcoal text-charcoal-foreground pt-16 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">
          {/* Company */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan to-primary flex items-center justify-center font-heading font-bold text-primary-foreground text-lg">
                PG
              </div>
              <div>
                <div className="font-heading font-bold text-base">Paras Graphics</div>
                <div className="text-charcoal-foreground/50 text-[10px] tracking-widest uppercase">Print Perfect</div>
              </div>
            </div>
            <p className="text-charcoal-foreground/60 text-sm leading-relaxed">
              Your trusted printing partner in Ahmedabad. Delivering premium quality prints since 2015.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-sm mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["Services", "Portfolio", "Contact"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-charcoal-foreground/60 text-sm hover:text-cyan transition-colors"
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
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-sm mb-4">Contact</h4>
            <div className="space-y-3">
              <a href={`tel:+${PHONE}`} className="flex items-center gap-2 text-charcoal-foreground/60 text-sm hover:text-cyan transition-colors">
                <Phone size={14} /> +91 93774 76343
              </a>
              <a href="mailto:info@parasgraphics.example" className="flex items-center gap-2 text-charcoal-foreground/60 text-sm hover:text-cyan transition-colors">
                <Mail size={14} /> info@parasgraphics.example
              </a>
              <div className="flex items-center gap-2 text-charcoal-foreground/60 text-sm">
                <Clock size={14} /> Mon–Sat: 9AM–7PM
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-charcoal-foreground/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-charcoal-foreground/40 text-xs">
            © {new Date().getFullYear()} Paras Graphics, Ahmedabad. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-charcoal-foreground/40 text-xs hover:text-cyan transition-colors"
          >
            <ArrowUp size={14} /> Back to Top
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
