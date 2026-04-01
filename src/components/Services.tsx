import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, ChevronDown, ChevronUp } from "lucide-react";

const PHONE = "919377476343";

const services = [
  { title: "Business Cards", desc: "Professional cards that make a lasting first impression with premium finishes.", img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=300&fit=crop" },
  { title: "Banners & Signs", desc: "Eye-catching banners and signage for indoor and outdoor advertising.", img: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop" },
  { title: "Custom Apparel", desc: "Custom printed t-shirts, hoodies, caps and more for your brand or event.", img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop" },
  { title: "Vinyl Stickers", desc: "Durable vinyl stickers and decals for branding, packaging, and decoration.", img: "https://images.unsplash.com/photo-1635405074683-96d6921a2a68?w=400&h=300&fit=crop" },
  { title: "Brochures & Flyers", desc: "High-quality brochures and flyers to promote your business effectively.", img: "https://images.unsplash.com/photo-1586075010882-3a0b4f23c871?w=400&h=300&fit=crop" },
  { title: "Flex Printing", desc: "Large format flex printing for hoardings, shop boards, and event displays.", img: "https://images.unsplash.com/photo-1504270997636-07ddfbd48945?w=400&h=300&fit=crop" },
  { title: "Letterheads", desc: "Corporate letterheads that reflect your brand's professionalism.", img: "https://images.unsplash.com/photo-1568205631419-48be6e942a60?w=400&h=300&fit=crop" },
  { title: "Wedding Invitations", desc: "Beautifully designed wedding cards with premium paper and printing.", img: "https://images.unsplash.com/photo-1607861716497-e65ab29fc7ac?w=400&h=300&fit=crop" },
  { title: "Photo Printing", desc: "High-resolution photo prints on premium paper in various sizes.", img: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop" },
  { title: "Canvas Prints", desc: "Gallery-quality canvas prints for home and office decor.", img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=300&fit=crop" },
  { title: "Standees", desc: "Roll-up and cut-out standees for events, exhibitions, and promotions.", img: "https://images.unsplash.com/photo-1504270997636-07ddfbd48945?w=400&h=300&fit=crop" },
  { title: "Backdrops", desc: "Custom printed backdrops for events, photo booths, and stage setups.", img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=300&fit=crop" },
  { title: "Posters", desc: "Vibrant poster printing for advertising, art, and wall graphics.", img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop" },
  { title: "Bill Books", desc: "Custom bill books and receipt pads for your business needs.", img: "https://images.unsplash.com/photo-1568205631419-48be6e942a60?w=400&h=300&fit=crop" },
  { title: "Rubber Stamps", desc: "Custom rubber stamps for business, personal, and official use.", img: "https://images.unsplash.com/photo-1586075010882-3a0b4f23c871?w=400&h=300&fit=crop" },
  { title: "ID Cards", desc: "Professional ID cards with photo printing and lamination.", img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=300&fit=crop" },
  { title: "Certificates", desc: "Custom certificates for events, awards, and recognition programs.", img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=300&fit=crop" },
  { title: "Packaging", desc: "Custom packaging boxes and labels for products and gifts.", img: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop" },
  { title: "Envelopes", desc: "Branded envelopes that complement your corporate stationery.", img: "https://images.unsplash.com/photo-1568205631419-48be6e942a60?w=400&h=300&fit=crop" },
  { title: "Pamphlets", desc: "Informative pamphlets for marketing campaigns and events.", img: "https://images.unsplash.com/photo-1586075010882-3a0b4f23c871?w=400&h=300&fit=crop" },
];

const Services = () => {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? services : services.slice(0, 9);

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i % 3 * 0.08 }}
              whileHover={{ y: -10 }}
              onClick={() => openWhatsApp(service.title)}
              className="group cursor-pointer bg-card rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-cyan-glow hover:border-cyan/30 transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.img}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-primary-foreground text-xs font-medium flex items-center gap-1">
                    <MessageCircle size={12} /> Inquire on WhatsApp
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-heading font-semibold text-foreground text-base">{service.title}</h3>
                <p className="mt-1.5 text-muted-foreground text-sm line-clamp-2">{service.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

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
