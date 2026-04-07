import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, ChevronDown, ChevronUp } from "lucide-react";
import ProgressiveImage from "./ui/ProgressiveImage";
import { prefetchImages } from "@/lib/prefetcher";

import businessCardsImg from "@/assets/services/business-cards.jpg";
import bannersSignsImg from "@/assets/services/banners-signs.jpg";
import customApparelImg from "@/assets/services/custom-apparel.jpg";
import vinylStickersImg from "@/assets/services/vinyl-stickers.jpg";
import brochuresFlyersImg from "@/assets/services/brochures-flyers.jpg";
import flexPrintingImg from "@/assets/services/flex-printing.jpg";
import letterheadsImg from "@/assets/services/letterheads.jpg";
import weddingInvitationsImg from "@/assets/services/wedding-invitations.jpg";
import photoPrintingImg from "@/assets/services/photo-printing.jpg";
import canvasPrintsImg from "@/assets/services/canvas-prints.jpg";
import standeesImg from "@/assets/services/standees.jpg";
import backdropsImg from "@/assets/services/backdrops.jpg";
import postersImg from "@/assets/services/posters.jpg";
import billBooksImg from "@/assets/services/bill-books.jpg";
import rubberStampsImg from "@/assets/services/rubber-stamps.jpg";
import idCardsImg from "@/assets/services/id-cards.jpg";
import certificatesImg from "@/assets/services/certificates.jpg";
import packagingImg from "@/assets/services/packaging.jpg";
import envelopesImg from "@/assets/services/envelopes.jpg";
import pamphletsImg from "@/assets/services/pamphlets.jpg";

const PHONE = "919377476343";

const services = [
  { title: "Business Cards", desc: "Professional cards that make a lasting first impression with premium finishes.", img: businessCardsImg },
  { title: "Banners & Signs", desc: "Eye-catching banners and signage for indoor and outdoor advertising.", img: bannersSignsImg },
  { title: "Custom Apparel", desc: "Custom printed t-shirts, hoodies, caps and more for your brand or event.", img: customApparelImg },
  { title: "Vinyl Stickers", desc: "Durable vinyl stickers and decals for branding, packaging, and decoration.", img: vinylStickersImg },
  { title: "Brochures & Flyers", desc: "High-quality brochures and flyers to promote your business effectively.", img: brochuresFlyersImg },
  { title: "Flex Printing", desc: "Large format flex printing for hoardings, shop boards, and event displays.", img: flexPrintingImg },
  { title: "Letterheads", desc: "Corporate letterheads that reflect your brand's professionalism.", img: letterheadsImg },
  { title: "Wedding Invitations", desc: "Beautifully designed wedding cards with premium paper and printing.", img: weddingInvitationsImg },
  { title: "Photo Printing", desc: "High-resolution photo prints on premium paper in various sizes.", img: photoPrintingImg },
  { title: "Canvas Prints", desc: "Gallery-quality canvas prints for home and office decor.", img: canvasPrintsImg },
  { title: "Standees", desc: "Roll-up and cut-out standees for events, exhibitions, and promotions.", img: standeesImg },
  { title: "Backdrops", desc: "Custom printed backdrops for events, photo booths, and stage setups.", img: backdropsImg },
  { title: "Posters", desc: "Vibrant poster printing for advertising, art, and wall graphics.", img: postersImg },
  { title: "Bill Books", desc: "Custom bill books and receipt pads for your business needs.", img: billBooksImg },
  { title: "Rubber Stamps", desc: "Custom rubber stamps for business, personal, and official use.", img: rubberStampsImg },
  { title: "ID Cards", desc: "Professional ID cards with photo printing and lamination.", img: idCardsImg },
  { title: "Certificates", desc: "Custom certificates for events, awards, and recognition programs.", img: certificatesImg },
  { title: "Packaging", desc: "Custom packaging boxes and labels for products and gifts.", img: packagingImg },
  { title: "Envelopes", desc: "Branded envelopes that complement your corporate stationery.", img: envelopesImg },
  { title: "Pamphlets", desc: "Informative pamphlets for marketing campaigns and events.", img: pamphletsImg },
];

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
  const visible = showAll ? services : services.slice(0, 9);

  useState(() => {
    // Prefetch service images when the component state or context is ready
    const allUrls = services.map(s => s.img);
    prefetchImages(allUrls);
  });

  const openWhatsApp = (title: string) => {
    const msg = encodeURIComponent(`Hi, I'm interested in ${title} printing. Can you share details and pricing?`);
    window.open(`https://wa.me/${PHONE}?text=${msg}`, "_blank");
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
          {visible.map((service) => (
            <motion.div
              key={service.title}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              onClick={() => openWhatsApp(service.title)}
              className="group cursor-pointer bg-card rounded-xl border border-border shadow-sm hover:border-cyan/30 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] flex flex-col relative after:absolute after:inset-0 after:-z-10 after:rounded-xl after:shadow-[0_20px_40px_-12px_rgba(0,255,255,0.25)] after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300 after:will-change-opacity"
            >
              <div className="relative h-48 overflow-hidden rounded-t-xl flex-shrink-0 bg-muted/10">
                <ProgressiveImage
                  src={service.img}
                  alt={service.title}
                  containerClassName="w-full h-full"
                  className="transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-primary-foreground text-xs font-medium flex items-center gap-1">
                    <MessageCircle size={12} /> Inquire on WhatsApp
                  </span>
                </div>
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="font-heading font-semibold text-foreground text-base">{service.title}</h3>
                <p className="mt-1.5 text-muted-foreground text-sm line-clamp-2">{service.desc}</p>
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
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-cyan to-primary text-primary-foreground font-semibold text-sm shadow-lg hover:shadow-cyan-glow transition-all duration-300 active:scale-95"
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
