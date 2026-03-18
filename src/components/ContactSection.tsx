import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Instagram, Twitter, Mail } from "lucide-react";

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const socials = [
    { icon: Instagram, label: "Instagram", href: "#" },
    { icon: Twitter, label: "Twitter/X", href: "#" },
    { icon: Mail, label: "Email", href: "mailto:hello@kaelnoctis.com" },
  ];

  return (
    <section ref={ref} className="relative py-32 px-6 md:px-16">
      {/* Decorative line */}
      <div className="max-w-6xl mx-auto mb-16">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-silver/20 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Left - Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground tracking-tight uppercase">
            Contact
          </h2>
          <div className="w-16 h-px bg-crimson mt-2 mb-8" />

          <p className="font-mono text-sm text-muted-foreground mb-8 max-w-sm">
            Available for commissions, collaborations, and exhibitions.
            Reach out through the form or find me on socials.
          </p>

          <div className="font-mono text-sm text-foreground mb-12">
            hello@kaelnoctis.com
          </div>

          {/* Social links */}
          <div className="flex gap-6">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="text-muted-foreground hover:text-crimson transition-colors duration-150"
                aria-label={s.label}
              >
                <s.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Right - Form */}
        <motion.form
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
          onSubmit={(e) => e.preventDefault()}
        >
          {[
            { name: "name" as const, label: "Name", type: "text" },
            { name: "email" as const, label: "Email", type: "email" },
          ].map((field) => (
            <div key={field.name}>
              <label className="font-mono text-[10px] text-crimson tracking-[0.3em] uppercase block mb-2">
                {field.label}
              </label>
              <input
                type={field.type}
                value={formData[field.name]}
                onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                className="w-full bg-transparent border border-border px-4 py-3 font-mono text-sm text-foreground focus:border-crimson focus:outline-none transition-colors"
              />
            </div>
          ))}
          <div>
            <label className="font-mono text-[10px] text-crimson tracking-[0.3em] uppercase block mb-2">
              Message
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={5}
              className="w-full bg-transparent border border-border px-4 py-3 font-mono text-sm text-foreground focus:border-crimson focus:outline-none transition-colors resize-none"
            />
          </div>
          <button
            type="submit"
            className="font-mono text-xs tracking-[0.3em] uppercase px-8 py-3 border border-crimson text-crimson hover:bg-crimson hover:text-primary-foreground transition-all duration-150"
          >
            Transmit
          </button>
        </motion.form>
      </div>

      {/* Footer sigil */}
      <div className="max-w-6xl mx-auto mt-32 text-center">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-silver/20 to-transparent mb-8" />
        <p className="font-mono text-[10px] text-muted-foreground tracking-[0.4em] uppercase">
          © 2026 Kael Noctis — All rights reserved
        </p>
      </div>
    </section>
  );
};

export default ContactSection;
