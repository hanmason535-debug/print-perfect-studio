import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

import bc1 from "@/assets/portfolio/business-cards-1.jpg";
import bc2 from "@/assets/portfolio/business-cards-2.jpg";
import bc3 from "@/assets/portfolio/business-cards-3.jpg";
import ban1 from "@/assets/portfolio/banner-1.jpg";
import ban2 from "@/assets/portfolio/banner-2.jpg";
import ban3 from "@/assets/portfolio/banner-3.jpg";
import stk1 from "@/assets/portfolio/stickers-1.jpg";
import stk2 from "@/assets/portfolio/stickers-2.jpg";
import app1 from "@/assets/portfolio/apparel-1.jpg";
import app2 from "@/assets/portfolio/apparel-2.jpg";
import bro1 from "@/assets/portfolio/brochure-1.jpg";
import bro2 from "@/assets/portfolio/brochure-2.jpg";

const categories = ["All", "Business Cards", "Banners", "Stickers", "Apparel", "Brochures"];

const portfolioItems = [
  { title: "Corporate Business Cards", category: "Business Cards", img: bc1 },
  { title: "Event Banner Design", category: "Banners", img: ban1 },
  { title: "Product Label Stickers", category: "Stickers", img: stk1 },
  { title: "Team Uniforms", category: "Apparel", img: app1 },
  { title: "Marketing Brochure", category: "Brochures", img: bro1 },
  { title: "Premium Visiting Card", category: "Business Cards", img: bc2 },
  { title: "Outdoor Hoarding", category: "Banners", img: ban2 },
  { title: "Custom Vinyl Decals", category: "Stickers", img: stk2 },
  { title: "Branded Polo Shirts", category: "Apparel", img: app2 },
  { title: "Product Catalog", category: "Brochures", img: bro2 },
  { title: "Luxury Business Card", category: "Business Cards", img: bc3 },
  { title: "Exhibition Backdrop", category: "Banners", img: ban3 },
];

const Portfolio = () => {
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [showCount, setShowCount] = useState(9);

  const filtered = filter === "All" ? portfolioItems : portfolioItems.filter((p) => p.category === filter);
  const visible = filtered.slice(0, showCount);
  const remaining = filtered.length - visible.length;

  const openLightbox = (idx: number) => setLightbox(idx);
  const closeLightbox = () => setLightbox(null);

  const navigate = useCallback(
    (dir: number) => {
      if (lightbox === null) return;
      const next = lightbox + dir;
      if (next >= 0 && next < filtered.length) setLightbox(next);
    },
    [lightbox, filtered.length]
  );

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") navigate(-1);
      if (e.key === "ArrowRight") navigate(1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [lightbox, navigate]);

  return (
    <section id="portfolio" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-foreground">
            Our <span className="text-cmyk-gradient">Portfolio</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Browse our recent work and see the quality we deliver.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setFilter(cat); setShowCount(9); }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                filter === cat
                  ? "bg-cyan text-primary-foreground shadow-md"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {visible.map((item, i) => (
              <motion.div
                key={item.title + i}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i % 3 * 0.05 }}
                onClick={() => openLightbox(i)}
                className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  width={800}
                  height={800}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                  <span className="text-primary-foreground font-heading font-semibold text-sm">{item.title}</span>
                  <span className="text-primary-foreground/60 text-xs mt-1">{item.category}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {remaining > 0 && (
          <div className="text-center mt-10">
            <button
              onClick={() => setShowCount((c) => c + 6)}
              className="px-6 py-3 rounded-full border border-border text-foreground font-medium text-sm hover:border-cyan/50 hover:text-cyan transition-colors"
            >
              Load More ({remaining})
            </button>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && filtered[lightbox] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-navy/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/20 transition-colors"
            >
              <X size={20} />
            </button>

            {lightbox > 0 && (
              <button
                onClick={(e) => { e.stopPropagation(); navigate(-1); }}
                className="absolute left-4 w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/20 transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
            )}

            {lightbox < filtered.length - 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); navigate(1); }}
                className="absolute right-4 w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/20 transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            )}

            <motion.div
              key={lightbox}
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl max-h-[80vh] relative"
            >
              <img
                src={filtered[lightbox].img}
                alt={filtered[lightbox].title}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-navy/80 to-transparent rounded-b-lg">
                <p className="text-primary-foreground font-heading font-semibold">{filtered[lightbox].title}</p>
                <p className="text-primary-foreground/60 text-sm">{filtered[lightbox].category} · {lightbox + 1} / {filtered.length}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Portfolio;
