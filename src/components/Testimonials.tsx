import { useRef, useEffect, useCallback, useState } from "react";
import { motion, useInView } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Star } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  stars: number;
  quote: string;
  initials: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Rajesh Mehta",
    role: "Business Owner",
    stars: 5,
    quote: "Paras Graphics delivered outstanding quality for our entire corporate branding. The attention to detail in our business cards and brochures was impeccable.",
    initials: "RM",
  },
  {
    name: "Priya Sharma",
    role: "Event Planner",
    stars: 5,
    quote: "We've been relying on Paras Graphics for all our event materials — banners, invitations, and backdrops. They never disappoint with their speed and quality.",
    initials: "PS",
  },
  {
    name: "Amit Patel",
    role: "Marketing Manager",
    stars: 4,
    quote: "Great printing quality and very responsive team. They handled our bulk order of 10,000 flyers within 24 hours. Highly recommended for marketing collateral.",
    initials: "AP",
  },
  {
    name: "Sneha Desai",
    role: "Boutique Owner",
    stars: 5,
    quote: "The packaging boxes they designed for our boutique are absolutely gorgeous. Our customers always compliment the premium feel. Truly print-perfect!",
    initials: "SD",
  },
];

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  return (
    <section ref={sectionRef} id="testimonials" className="bg-navy py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-3">
            What Our <span className="text-cmyk-gradient">Clients Say</span>
          </h2>
          <p className="text-primary-foreground/60 max-w-lg mx-auto">
            Trusted by thousands of businesses across Ahmedabad.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex gap-6">
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_48%] lg:flex-[0_0_31%] px-1"
                >
                  <div className="h-full rounded-2xl border border-border/40 bg-card/10 backdrop-blur-sm p-6 flex flex-col gap-4 transition-all duration-300 hover:border-cyan/30 hover:bg-card/20">
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star
                          key={s}
                          size={16}
                          className={s < t.stars ? "text-accent fill-accent" : "text-white/20"}
                        />
                      ))}
                    </div>
                    <p className="text-primary-foreground/80 text-sm leading-relaxed flex-1">
                      "{t.quote}"
                    </p>
                    <div className="flex items-center gap-3 pt-2 border-t border-border/20">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan to-secondary flex items-center justify-center text-primary-foreground text-xs font-bold transition-transform duration-300 hover:scale-110">
                        {t.initials}
                      </div>
                      <div>
                        <p className="text-primary-foreground font-semibold text-sm">{t.name}</p>
                        <p className="text-primary-foreground/50 text-xs">{t.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => emblaApi?.scrollTo(i)}
                className={`h-2 rounded-full transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                  i === selectedIndex ? "bg-cyan w-6" : "bg-white/20 w-2"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
