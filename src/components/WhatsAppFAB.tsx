import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";

const PHONE = "919377476343";
const WA_URL = `https://wa.me/${PHONE}?text=${encodeURIComponent("Hi! I'd like to know more about your printing services.")}`;

const WhatsAppFAB = () => {
  const [show, setShow] = useState(false);
  const [tooltip, setTooltip] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShow(true), 2000);
    const t2 = setTimeout(() => setTooltip(true), 2500);
    const t3 = setTimeout(() => setTooltip(false), 6000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3"
        >
          <AnimatePresence>
            {tooltip && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="bg-card text-foreground text-xs font-medium px-3 py-2 rounded-lg shadow-lg border border-border whitespace-nowrap"
              >
                Chat with us on WhatsApp
              </motion.div>
            )}
          </AnimatePresence>
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-16 h-16 rounded-full bg-whatsapp flex items-center justify-center text-primary-foreground shadow-lg hover:brightness-110 transition-all active:scale-95"
            style={{ animation: "pulse-glow 2s ease-in-out infinite" }}
            aria-label="Chat on WhatsApp"
          >
            <MessageCircle size={28} />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WhatsAppFAB;
