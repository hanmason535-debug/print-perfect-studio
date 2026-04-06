import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Clock, Facebook, Instagram, Linkedin, MessageCircle } from "lucide-react";
import { BorderBeam } from "@/registry/magicui/border-beam";
import { useToast } from "@/hooks/use-toast";

const PHONE = "919377476343";
const MAPS_URL = "https://maps.google.com/?q=Paras+Graphics,+Chandrika+Chamber,+Mirzapur+Rd,+Ahmedabad";
const MAPS_EMBED = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d229.4900191730085!2d72.58254442332628!3d23.02963496831482!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e844430345e57%3A0xe294cc40affa7024!2sParas%20Graphics!5e0!3m2!1sen!2sin!4v1775394624007!5m2!1sen!2sin";

const contactInfo = [
  {
    icon: MapPin, title: "Visit Our Store", detail: "2, Chandrika Chamber, Mirzapur Rd, Ahmedabad 380001",
    href: MAPS_URL, color: "bg-cyan/15 text-cyan",
  },
  {
    icon: Mail, title: "Email Us", detail: "parasgph@gmail.com",
    href: "mailto:parasgph@gmail.com", color: "bg-magenta/15 text-magenta",
  },
  {
    icon: Phone, title: "Call Us", detail: "+91 93774 76343",
    href: `tel:+${PHONE}`, color: "bg-yellow/15 text-yellow",
  },
  {
    icon: Clock, title: "Business Hours", detail: "Mon–Sat: 11AM–8PM | Sun: Closed",
    href: undefined, color: "bg-cyan/15 text-cyan",
  },
];

const socials = [
  { icon: Facebook, href: "/facebook", label: "Facebook", hover: "hover:text-cyan" },
  { icon: Instagram, href: "/instagram", label: "Instagram", hover: "hover:text-magenta" },
  { icon: Linkedin, href: "/linkedin", label: "LinkedIn", hover: "hover:text-primary" },
];

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "", honey: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.honey) return; // spam bot

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast({ title: "Please fill all required fields", variant: "destructive" });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      toast({ title: "Please enter a valid email", variant: "destructive" });
      return;
    }

    setSending(true);
    const msg = `New inquiry from website:\n\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone || "N/A"}\n\nMessage:\n${form.message}`;
    window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`, "_blank");
    setSending(false);
    setForm({ name: "", email: "", phone: "", message: "", honey: "" });
    toast({ title: "Redirecting to WhatsApp…" });
  };

  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mb-12"
        >
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-foreground">
            Contact <span className="text-cmyk-gradient">Us</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Get in touch for a quote or any printing inquiry. We'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-card rounded-xl border border-border p-6 sm:p-8 shadow-sm relative overflow-hidden">
              <BorderBeam duration={6} size={400} className="from-transparent via-red-500 to-transparent" />
              <BorderBeam duration={6} delay={3} size={400} borderWidth={2} className="from-transparent via-blue-500 to-transparent" />

              <h3 className="font-heading font-semibold text-lg text-foreground mb-6">Send us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" className="hidden" value={form.honey} onChange={(e) => setForm({ ...form, honey: e.target.value })} tabIndex={-1} autoComplete="off" />
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Name *</label>
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                    placeholder="Your name"
                    maxLength={100}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Email *</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                    placeholder="you@example.com"
                    maxLength={255}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Phone</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                    placeholder="+91 XXXXX XXXXX"
                    maxLength={20}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Message *</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-shadow resize-none"
                    placeholder="Tell us about your printing needs…"
                    maxLength={1000}
                  />
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-whatsapp text-primary-foreground font-semibold text-sm hover:brightness-110 transition-all active:scale-95 disabled:opacity-60"
                >
                  <MessageCircle size={18} />
                  {sending ? "Sending…" : "Send Message via WhatsApp"}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Info + Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-5"
          >
            {contactInfo.map((item) => (
              <motion.div
                key={item.title}
                whileHover={{ x: 10 }}
                className="flex items-start gap-4 group"
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${item.color}`}>
                  <item.icon size={20} />
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-foreground text-sm">{item.title}</h4>
                  {item.href ? (
                    <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="text-muted-foreground text-sm hover:text-cyan transition-colors">
                      {item.detail}
                    </a>
                  ) : (
                    <p className="text-muted-foreground text-sm">{item.detail}</p>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Map */}
            <div className="rounded-xl overflow-hidden shadow-sm border border-border mt-6">
              <iframe
                src={MAPS_EMBED}
                width="100%"
                height="220"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Paras Graphics Location"
              />
            </div>

            {/* Social */}
            <div>
              <p className="text-sm font-medium text-foreground mb-3">Follow Us</p>
              <div className="flex gap-3">
                {socials.map((s) => (
                  <Link
                    key={s.label}
                    to={s.href}
                    aria-label={s.label}
                    className={`w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground transition-all hover:scale-110 ${s.hover}`}
                  >
                    <s.icon size={18} />
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
