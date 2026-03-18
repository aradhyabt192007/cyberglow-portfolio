import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Sunkissed_Women from "../assets/Sunkissed_Women.JPG";
import Heart_in_the_city from "../assets/Heart_in_the_city.JPG";
import Abandoned_Royalty from "../assets/Abandoned_Royalty.JPG";
import Flower_a_New_Hope from "../assets/Flower_a_New_Hope.JPG";
import Flower_Empire_Strikes_Back from "../assets/Flower_Empire_Strikes_Back.JPG";
import Dying_Majesty from "../assets/Dying_Majesty.JPG";
import Flower_Return_of_the_Jedi from "../assets/Flower_Return_of_the_Jedi.JPG";
import Sinners from "../assets/Sinners.JPG";
import First_Rule from "../assets/1st_Rule_of_the_fight_club.JPG";
import monotony from "../assets/monotony.JPG";
import Acid from "../assets/Acid.JPG";

interface Photo {
  id: number;
  src: string;
  category: string;
  title: string;
  tall?: boolean;
}

const photos: Photo[] = [
  { id: 1, src: Sunkissed_Women, category: "People", title: "Sunkissed Women", tall: true },
  { id: 2, src: Heart_in_the_city, category: "Street", title: "Heart in the City", tall: true  },
  { id: 3, src: Abandoned_Royalty, category: "Architecture", title: "Abandoned Royalty", tall: true  },
  { id: 4, src: Flower_a_New_Hope, category: "Nature", title: "Flower a New Hope", tall: true},
  { id: 5, src: Flower_Empire_Strikes_Back, category: "Nature", title: "Flower Empire Strikes Back", tall: true },
  { id: 6, src: Flower_Return_of_the_Jedi, category: "Nature", title: "Flower Return of the Jedi", tall: true },
  { id: 7, src: Dying_Majesty, category: "Architecture", title: "Dying Majesty", tall: true },
  { id: 8, src: Sinners, category: "Street", title: "Sinners", tall: true },
  { id: 9, src: First_Rule, category: "Street", title: "1st Rule of the Fight Club", tall: true },
  { id: 10, src: monotony, category: "Street", title: "Monotony", tall: true },
  { id: 11, src: Acid, category: "Trippy", title: "Acid", tall: true },
];

const categories = ["All", "Street", "People", "Trippy", "Architecture", "Nature"];

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
