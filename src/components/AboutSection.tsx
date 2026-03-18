import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const metadata = [
  { label: "Location", value: "Tokyo / Berlin" },
  { label: "Gear", value: "Fujifilm X-T5" },
  { label: "Style", value: "Raw / Ethereal" },
  { label: "Active Since", value: "2019" }];


  return (
    <section ref={ref} className="relative py-32 px-6 md:px-16 overflow-hidden">
      {/* Sigil frame lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
        <line x1="10%" y1="0" x2="10%" y2="100%" stroke="hsl(var(--silver))" strokeWidth="0.3" opacity="0.1" />
        <line x1="90%" y1="0" x2="90%" y2="100%" stroke="hsl(var(--silver))" strokeWidth="0.3" opacity="0.1" />
        <line x1="0" y1="50%" x2="100%" y2="50%" stroke="hsl(var(--crimson))" strokeWidth="0.2" opacity="0.08" />
      </svg>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center">
        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="md:col-span-5 relative">
          
          <div className="aspect-[3/4] bg-muted overflow-hidden relative">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80"
              alt="Portrait"
              className="w-full h-full object-cover grayscale contrast-125" />
            
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
          </div>
          {/* Corner marks */}
          <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-silver/30" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-silver/30" />
        </motion.div>

        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="md:col-span-7">
          
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-2 tracking-tight uppercase">
            About
          </h2>
          <div className="w-16 h-px bg-crimson mb-8" />

          <p className="font-mono text-sm leading-relaxed text-muted-foreground mb-8 max-w-lg">
            I’m Aradhya Bhushan Thakur, a first-year Computer Science student with a strong interest in technology, creativity, and visual storytelling. Alongside my academic journey, I actively pursue photography and graphic design as a way to capture perspectives and bring ideas to life.
I enjoy blending logic with creativity whether it’s through writing code or designing visuals that communicate meaning and emotion. As I continue to learn and grow, I aim to build projects that reflect both technical skill and artistic vision.











      
          


          </p>

          


          

          {/* Metadata grid */}
          <div className="grid grid-cols-2 gap-6">
            {metadata.map((item, i) => <motion.div key={item.label} initial={{ opacity: 0, y: 15 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}>
              
                <span className="font-mono text-[10px] text-crimson tracking-[0.3em] uppercase block mb-1">
                  {item.label}
                </span>
                <span className="font-mono text-sm text-foreground">
                  {item.value}
                </span>
              </motion.div>)}
          </div>
        </motion.div>
      </div>
    </section>);};export default AboutSection;