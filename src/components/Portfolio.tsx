import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const categories = ["All", "Business Cards", "Banners", "Stickers", "Apparel", "Brochures"];

const portfolioItems = [
  { title: "Corporate Business Cards", category: "Business Cards", img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&h=600&fit=crop" },
  { title: "Event Banner Design", category: "Banners", img: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=600&fit=crop" },
  { title: "Product Label Stickers", category: "Stickers", img: "https://images.unsplash.com/photo-1635405074683-96d6921a2a68?w=600&h=600&fit=crop" },
  { title: "Team Uniforms", category: "Apparel", img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop" },
  { title: "Marketing Brochure", category: "Brochures", img: "https://images.unsplash.com/photo-1586075010882-3a0b4f23c871?w=600&h=600&fit=crop" },
  { title: "Premium Visiting Card", category: "Business Cards", img: "https://images.unsplash.com/photo-1568205631419-48be6e942a60?w=600&h=600&fit=crop" },
  { title: "Outdoor Hoarding", category: "Banners", img: "https://images.unsplash.com/photo-1504270997636-07ddfbd48945?w=600&h=600&fit=crop" },
  { title: "Custom Vinyl Decals", category: "Stickers", img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=600&fit=crop" },
  { title: "Branded T-Shirts", category: "Apparel", img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop" },
  { title: "Product Catalog", category: "Brochures", img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=600&fit=crop" },
  { title: "Luxury Business Card", category: "Business Cards", img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&h=600&fit=crop" },
  { title: "Exhibition Backdrop", category: "Banners", img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=600&fit=crop" },
];

const Portfolio = () => {
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [showCount, setShowCount] = useState(9);

  const filtered = filter === "All" ? portfolioItems : portfolioItems.filter((p) => p.category === filter);
  const visible = filtered.slice(0, showCount);

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

        {visible.length < filtered.length && (
          <div className="text-center mt-10">
            <button
              onClick={() => setShowCount((c) => c + 6)}
              className="px-6 py-3 rounded-full border border-border text-foreground font-medium text-sm hover:border-cyan/50 hover:text-cyan transition-colors"
            >
              Load More
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
