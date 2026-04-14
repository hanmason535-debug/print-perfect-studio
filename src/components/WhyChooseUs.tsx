import { motion } from "framer-motion";
import { Clock, Trophy, IndianRupee, MapPin } from "lucide-react";

const features = [
  { icon: Clock, title: "Fast Turnaround", desc: "24-hour express service available", color: "bg-cyan/15 text-cyan" },
  { icon: Trophy, title: "Premium Quality", desc: "Industry-leading printing standards", color: "bg-magenta/15 text-magenta" },
  { icon: IndianRupee, title: "Affordable Pricing", desc: "Competitive rates without compromise", color: "bg-yellow/15 text-yellow" },
  { icon: MapPin, title: "Trusted Local Printer", desc: "Serving Ahmedabad with excellence", color: "bg-magenta/15 text-magenta" },
];

const WhyChooseUs = () => (
  <section className="py-16 bg-background">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            whileHover={{ y: -4, boxShadow: "0 12px 30px -8px hsl(191 85% 50% / 0.15)" }}
            className="group flex items-start gap-4 p-5 rounded-xl border border-border border-b-2 border-b-transparent bg-card hover:border-b-cyan hover:shadow-sm transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${f.color} group-hover:brightness-125`}>
              <f.icon size={22} />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-foreground text-sm">{f.title}</h3>
              <p className="mt-1 text-muted-foreground text-xs">{f.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
