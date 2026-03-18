import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Instagram, Linkedin, Mail } from "lucide-react";

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const socials = [
    { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/4ru007/" },
    { icon: Linkedin, label: "Linkedin", href: "https://www.linkedin.com/in/aradhya-bhushan-thakur-34b169366/" },
    { icon: Mail, label: "Email", href: "mailto:aradhyabt192007@gmail.com" },
  ];

  return (
    <section ref={ref} className="relative py-32 px-6 md:px-16">
      {/* Decorative line */}
      <div className="max-w-6xl mx-auto mb-16">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-silver/20 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground tracking-tight uppercase">
            Contact
          </h2>
          <div className="w-16 h-px bg-crimson mt-2 mb-8 mx-auto" />

          <p className="font-mono text-sm text-muted-foreground mb-8 max-w-sm">
            Get In Touch
            Have a project idea, collaboration, or just want to connect? Feel free to reach out.
            I’m currently open to internships, freelance work, and creative collaborations.

          </p>

          <div className="font-mono text-sm text-foreground mb-12">
            aradhyabt192007@gmail.com
          </div>

          <div className="flex gap-6 justify-center">
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
      </div>

      {/* Footer sigil */}
      <div className="max-w-6xl mx-auto mt-32 text-center">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-silver/20 to-transparent mb-8" />
        <p className="font-mono text-[10px] text-muted-foreground tracking-[0.4em] uppercase">
          © 2026 Aradhya Bhushan Thakur — All rights reserv
        </p>
      </div>
    </section>
  );
};

export default ContactSection;