import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const SigilSVG = () => (
  <svg viewBox="0 0 400 400" className="w-64 h-64 md:w-96 md:h-96" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Central diamond */}
    <path d="M200 40 L360 200 L200 360 L40 200 Z" stroke="hsl(var(--silver))" strokeWidth="0.5" className="sigil-line" opacity="0.6" />
    {/* Inner diamond */}
    <path d="M200 100 L300 200 L200 300 L100 200 Z" stroke="hsl(var(--silver))" strokeWidth="0.5" className="sigil-line" style={{ animationDelay: "0.5s" }} opacity="0.4" />
    {/* Vertical thorn */}
    <line x1="200" y1="20" x2="200" y2="380" stroke="hsl(var(--silver))" strokeWidth="0.5" className="sigil-line" style={{ animationDelay: "1s" }} opacity="0.3" />
    {/* Horizontal thorn */}
    <line x1="20" y1="200" x2="380" y2="200" stroke="hsl(var(--silver))" strokeWidth="0.5" className="sigil-line" style={{ animationDelay: "1.2s" }} opacity="0.3" />
    {/* Diagonal thorns */}
    <line x1="80" y1="80" x2="320" y2="320" stroke="hsl(var(--crimson))" strokeWidth="0.3" className="sigil-line" style={{ animationDelay: "1.5s" }} opacity="0.4" />
    <line x1="320" y1="80" x2="80" y2="320" stroke="hsl(var(--crimson))" strokeWidth="0.3" className="sigil-line" style={{ animationDelay: "1.7s" }} opacity="0.4" />
    {/* Small inner marks */}
    <circle cx="200" cy="200" r="8" stroke="hsl(var(--crimson))" strokeWidth="0.5" fill="none" className="sigil-line" style={{ animationDelay: "2s" }} />
    <circle cx="200" cy="200" r="30" stroke="hsl(var(--silver))" strokeWidth="0.3" fill="none" className="sigil-line" style={{ animationDelay: "2.2s" }} opacity="0.3" />
  </svg>
);

const HeroSection = () => {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background image with dark overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1533134486753-c833f0ed4866?w=1920&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-background/90" />
      </div>

      {/* Sigil */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative z-10"
      >
        <SigilSVG />
      </motion.div>

      {/* Name */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="relative z-10 text-center mt-8"
      >
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-foreground uppercase">
          KAEL NOCTIS
        </h1>
        <p className="font-mono text-xs md:text-sm text-muted-foreground mt-4 tracking-[0.3em] uppercase">
          Photographer — Visual Artist — Observer
        </p>
      </motion.div>

      {/* Thin line separator */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 1.5 }}
        className="relative z-10 w-32 h-px bg-silver/30 mt-8"
      />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-12 z-10 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] text-muted-foreground tracking-[0.4em] uppercase">Scroll</span>
        <ChevronDown className="w-4 h-4 text-crimson thorn-pulse" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
