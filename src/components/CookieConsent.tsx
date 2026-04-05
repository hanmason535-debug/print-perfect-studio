import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!localStorage.getItem("cookie-consent")) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  const preferences = () => {
    toast({ title: "Preferences", description: "Cookie preferences coming soon." });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 border-t border-border bg-card text-foreground shadow-premium"
        >
          <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 max-w-5xl">
            <p className="text-sm text-muted-foreground text-center sm:text-left">
              We use cookies to enhance your browsing experience and analyze site traffic.
            </p>
            <div className="flex gap-3 flex-shrink-0">
              <Button variant="outline" size="sm" onClick={preferences}>
                Preferences
              </Button>
              <Button size="sm" onClick={accept}>
                Accept All
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
