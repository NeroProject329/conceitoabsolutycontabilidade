import { ArrowRight, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-woman-updated.png";
import CtaLink from "@/components/CtaLink";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ backgroundColor: 'hsl(345, 80%, 56%)' }}>
      {/* Animated background shapes */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 rounded-full bg-primary-foreground/10 blur-xl"
        animate={{ y: [0, -30, 0], x: [0, 15, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/4 right-20 w-32 h-32 rounded-full bg-primary-foreground/8 blur-2xl"
        animate={{ y: [0, 20, 0], x: [0, -20, 0], scale: [1, 0.8, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/3 left-1/4 w-16 h-16 rounded-full bg-accent/15 blur-xl"
        animate={{ y: [0, -20, 0], scale: [1, 1.3, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 right-1/3 w-24 h-24 rounded-full bg-primary-foreground/5 blur-2xl"
        animate={{ y: [0, 25, 0], x: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Small floating dots */}
      <motion.div
        className="absolute top-32 left-1/3 w-3 h-3 rounded-full bg-accent/40"
        animate={{ y: [0, -15, 0], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-2/3 right-1/4 w-2 h-2 rounded-full bg-primary-foreground/30"
        animate={{ y: [0, -20, 0], opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute bottom-1/4 left-16 w-4 h-4 rounded-full bg-accent/25"
        animate={{ y: [0, -12, 0], x: [0, 8, 0], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
      {/* Sparkle particles */}
      <motion.div
        className="absolute top-40 right-60 w-1.5 h-1.5 rounded-full bg-primary-foreground/50"
        animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
      />
      <motion.div
        className="absolute bottom-40 right-40 w-1 h-1 rounded-full bg-accent/60"
        animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
      />

      <div className="container mx-auto px-6 flex flex-col items-center text-center md:grid md:grid-cols-2 md:text-left md:items-center gap-6 lg:gap-12 relative z-10 pt-24 md:pt-0">
        <div className="space-y-6 md:space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/15 px-4 py-2 text-sm text-primary-foreground backdrop-blur-sm"
          >
            <ShieldCheck className="w-4 h-4" />
            Milhares de clientes satisfeitos
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight text-primary-foreground drop-shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Descontos{" "}
            <span className="text-accent">Exclusivos</span>
            <br />
            Volte para o Azul Hoje Mesmo!
          </motion.h1>


          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8, type: "spring" }}
            whileHover={{ scale: 1.08, boxShadow: "0 0 35px hsla(338, 80%, 55%, 0.5)" }}
            whileTap={{ scale: 0.95 }}
          >
            <CtaLink
              href="#"
              className="inline-flex items-center gap-2 lg:gap-3 rounded-full bg-primary-foreground px-5 py-3 lg:px-8 lg:py-4 text-sm lg:text-lg font-semibold text-primary shadow-lg transition-all duration-300 pulse-glow"
            >
              Consultar Grátis
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.span>
            </CtaLink>
          </motion.div>

        </div>

        <motion.div
          className="flex justify-center items-end -mt-4 md:mt-8 md:items-start md:self-start"
          initial={{ opacity: 0, scale: 0.8, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, type: "spring" }}
        >
          <div className="relative">
            <motion.div
              className="absolute inset-0 rounded-full bg-primary-foreground/10 blur-3xl scale-75"
              animate={{ scale: [0.75, 0.85, 0.75], opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <img
              src={heroImage}
              alt="Consultoria financeira"
              className="relative z-10 max-h-[340px] md:max-h-[380px] lg:max-h-[480px] object-contain drop-shadow-2xl"
            />
          </div>
        </motion.div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="hsl(0, 0%, 100%)" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
