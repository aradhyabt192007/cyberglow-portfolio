import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

const Navigation = () => {
  const [open, setOpen] = useState(false);

  const scrollTo = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Nav trigger — abstract line cluster */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-8 right-8 z-[90] flex flex-col gap-[3px] group"
        aria-label="Menu"
      >
        <motion.span
          animate={open ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
          className="block w-6 h-px bg-silver group-hover:bg-crimson transition-colors"
        />
        <motion.span
          animate={open ? { opacity: 0, x: 10 } : { opacity: 1, x: 0 }}
          className="block w-4 h-px bg-silver group-hover:bg-crimson transition-colors"
        />
        <motion.span
          animate={open ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
          className="block w-6 h-px bg-silver group-hover:bg-crimson transition-colors"
        />
      </button>

      {/* Fullscreen nav overlay */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[80] bg-background/98 flex items-center justify-center"
          >
            <div className="flex flex-col items-center gap-8">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => scrollTo(item.href)}
                  className="font-display text-4xl md:text-6xl font-bold text-foreground hover:text-crimson transition-colors uppercase tracking-tight glitch-text"
                  data-text={item.label}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
