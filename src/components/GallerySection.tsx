import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface Photo {
  id: number;
  src: string;
  category: string;
  title: string;
  tall?: boolean;
}

const photos: Photo[] = [
  { id: 1, src: "https://images.unsplash.com/photo-1493238792000-8113da705763?w=800&q=80", category: "Street", title: "Neon Corridor", tall: true },
  { id: 2, src: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80", category: "Abstract", title: "Fractured Light" },
  { id: 3, src: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&q=80", category: "Urban", title: "Grid Collapse" },
  { id: 4, src: "https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8?w=800&q=80", category: "Nature", title: "Silent Witness", tall: true },
  { id: 5, src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80", category: "Nature", title: "Void Garden" },
  { id: 6, src: "https://images.unsplash.com/photo-1519638399535-1b036603ac77?w=800&q=80", category: "Street", title: "After Hours" },
  { id: 7, src: "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=800&q=80", category: "Portrait", title: "Hollow Gaze", tall: true },
  { id: 8, src: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80", category: "Abstract", title: "Signal Decay" },
  { id: 9, src: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80", category: "Urban", title: "Monolith" },
  { id: 10, src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80", category: "Nature", title: "Threshold" },
];

const categories = ["All", "Street", "Portrait", "Abstract", "Urban", "Nature"];

const GallerySection = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxPhoto, setLightboxPhoto] = useState<Photo | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const filtered = activeCategory === "All" ? photos : photos.filter(p => p.category === activeCategory);

  return (
    <section ref={ref} className="relative py-32 px-6 md:px-16">
      {/* Section header */}
      <div className="max-w-7xl mx-auto mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-display text-3xl md:text-5xl font-bold text-foreground tracking-tight uppercase"
        >
          Gallery
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-16 h-px bg-crimson mt-2 origin-left"
        />

        {/* Filter chips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap gap-3 mt-8"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`filter-chip font-mono text-xs tracking-[0.2em] uppercase px-4 py-2 border transition-all duration-150 ${
                activeCategory === cat
                  ? "border-crimson text-crimson bg-crimson/5"
                  : "border-border text-muted-foreground hover:border-silver/50 hover:text-foreground"
              }`}
            >
              <span className="glitch-text" data-text={cat}>{cat}</span>
            </button>
          ))}
        </motion.div>
      </div>

      {/* Masonry grid */}
      <div className="max-w-7xl mx-auto columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((photo, i) => (
            <motion.div
              key={photo.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="gallery-item break-inside-avoid relative group cursor-pointer overflow-hidden"
              onClick={() => setLightboxPhoto(photo)}
            >
              <div className={`relative overflow-hidden ${photo.tall ? "aspect-[2/3]" : "aspect-[4/3]"}`}>
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  loading="lazy"
                />
                {/* Chromatic aberration overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none mix-blend-screen bg-gradient-to-r from-red-500/10 via-transparent to-blue-500/10" />

                {/* Info overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className="font-mono text-[10px] text-crimson tracking-[0.3em] uppercase block mb-1">
                      {photo.category}
                    </span>
                    <span className="font-display text-lg font-bold text-foreground">
                      {photo.title}
                    </span>
                  </div>
                </div>

                {/* Corner marks */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-silver/0 group-hover:border-silver/40 transition-all duration-300" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-crimson/0 group-hover:border-crimson/40 transition-all duration-300" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center lightbox-overlay bg-background/95"
            onClick={() => setLightboxPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl max-h-[90vh] mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightboxPhoto.src}
                alt={lightboxPhoto.title}
                className="max-w-full max-h-[85vh] object-contain"
              />
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <span className="font-mono text-[10px] text-crimson tracking-[0.3em] uppercase block">
                    {lightboxPhoto.category}
                  </span>
                  <span className="font-display text-xl font-bold text-foreground">
                    {lightboxPhoto.title}
                  </span>
                </div>
                <button
                  onClick={() => setLightboxPhoto(null)}
                  className="text-muted-foreground hover:text-crimson transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
