import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MessageCircle, ChevronDown, ChevronUp } from "lucide-react";
import ProgressiveImage from "./ui/ProgressiveImage";
import { prefetchImages } from "@/lib/prefetcher";

import { supabase } from "@/lib/supabase";

const PHONE = "919377476343";

type ServiceItem = {
  id: string;
  title: string;
  description: string;
  media_url: string;
};

/* stagger container + child variants */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.35, 
      ease: [0.22, 1, 0.36, 1] 
    } 
  },
};

const Services = () => {
  const [showAll, setShowAll] = useState(false);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      const { data } = await supabase.from("services").select("*").order("created_at", { ascending: true });
      if (data) {
        setServices(data);
        const allUrls = data.map(s => s.media_url);
        prefetchImages(allUrls);
      }
      setLoading(false);
    };
    fetchServices();
  }, []);

  const visible = showAll ? services : services.slice(0, 9);

  const openWhatsApp = (title: string) => {
    const msg = encodeURIComponent(`Hi, I'm interested in ${title} printing. Can you share details and pricing?`);
    window.open(`https://wa.me/${PHONE}?text=${msg}`, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-foreground">
            Our Premium <span className="text-cmyk-gradient">Services</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Comprehensive printing solutions for businesses and individuals. Every project receives our full attention to detail.
          </p>
        </motion.div>

        <motion.div
          key={showAll ? "all" : "partial"}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {loading && services.length === 0 ? (
            <div className="col-span-1 sm:col-span-2 lg:col-span-3 py-12 flex justify-center">
               <div className="w-8 h-8 rounded-full border-t-2 border-cyan animate-spin"></div>
            </div>
          ) : visible.map((service) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              onClick={() => openWhatsApp(service.title)}
              className="group cursor-pointer bg-card rounded-xl border border-border shadow-sm hover:border-cyan/30 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] flex flex-col relative after:absolute after:inset-0 after:-z-10 after:rounded-xl after:shadow-[0_20px_40px_-12px_rgba(0,255,255,0.25)] after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300 after:will-change-opacity"
            >
              <div className="relative h-48 overflow-hidden rounded-t-xl flex-shrink-0 bg-muted/10">
                <ProgressiveImage
                  src={service.media_url}
                  alt={service.title}
                  containerClassName="w-full h-full"
                  className="transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-primary-foreground text-xs font-medium flex items-center gap-1">
                    <MessageCircle size={12} /> Inquire on WhatsApp
                  </span>
                </div>
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="font-heading font-semibold text-foreground text-base transition-colors duration-300 group-hover:text-cyan">{service.title}</h3>
                <p className="mt-1.5 text-muted-foreground text-sm line-clamp-2">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {!showAll && services.length > 9 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground font-medium text-sm hover:border-cyan/50 hover:text-cyan transition-colors"
            >
              View All Services ({services.length})
              <ChevronDown size={16} />
            </button>
          </motion.div>
        )}

        {showAll && (
          <div className="text-center mt-10">
            <button
              onClick={() => setShowAll(false)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground font-medium text-sm hover:border-cyan/50 hover:text-cyan transition-colors"
            >
              Show Less
              <ChevronUp size={16} />
            </button>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href={`https://wa.me/${PHONE}?text=${encodeURIComponent("Hi, I need a custom printing quote. Can we discuss my requirements?")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="shine-sweep inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-cyan to-primary text-primary-foreground font-semibold text-sm shadow-lg hover:shadow-cyan-glow transition-all duration-300 active:scale-95"
          >
            <MessageCircle size={18} />
            Get Custom Quote
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
