import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Camila R.",
    role: "Cliente",
    avatar: "CR",
    rating: 5,
    text: "Entrei em contato e resolveram minha situação em menos de 24 horas. Atendimento rápido e super profissional. Indico demais!",
  },
  {
    name: "Lucas M.",
    role: "Cliente",
    avatar: "LM",
    rating: 5,
    text: "Fui atendido com muita segurança e agilidade. Me explicaram tudo direitinho e eu me senti confiante do início ao fim.",
  },
  {
    name: "Patrícia S.",
    role: "Cliente",
    avatar: "PS",
    rating: 5,
    text: "Serviço excelente! A equipe foi muito atenciosa e me ajudou a entender todas as opções disponíveis. Recomendo de olhos fechados.",
  },
  {
    name: "André F.",
    role: "Cliente",
    avatar: "AF",
    rating: 5,
    text: "Processo simples e transparente. Não precisei sair de casa pra nada, tudo foi resolvido online. Nota 10!",
  },
  {
    name: "Juliana T.",
    role: "Cliente",
    avatar: "JT",
    rating: 5,
    text: "Atendimento humanizado e eficiente. Me senti acolhida e bem orientada em cada etapa. Super indico o serviço!",
  },
  {
    name: "Ricardo B.",
    role: "Cliente",
    avatar: "RB",
    rating: 5,
    text: "Equipe muito competente e organizada. Tudo foi feito com clareza e sem enrolação. Experiência nota máxima!",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60, rotateX: 15 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-background overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="inline-block px-4 py-1 rounded-full text-sm font-semibold text-primary border border-primary/30 mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
          >
            Depoimentos
          </motion.span>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            O que nossos <span className="text-gradient">clientes dizem</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Histórias reais de pessoas que transformaram sua vida financeira com nossa ajuda.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              whileHover={{ y: -8, boxShadow: "0 20px 40px -12px hsla(338, 80%, 55%, 0.2)" }}
              className="relative bg-card rounded-2xl p-6 border border-border/50 shadow-sm transition-colors duration-300 group"
            >
              {/* Quote icon */}
              <motion.div
                className="absolute top-4 right-4 text-primary/10 group-hover:text-primary/25 transition-colors duration-300"
                initial={{ rotate: 0 }}
                whileHover={{ rotate: 12, scale: 1.2 }}
              >
                <Quote className="w-8 h-8" />
              </motion.div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <motion.div
                    key={j}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + j * 0.05, type: "spring", stiffness: 300 }}
                  >
                    <Star className="w-4 h-4 fill-accent text-accent" />
                  </motion.div>
                ))}
              </div>

              {/* Text */}
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                "{t.text}"
              </p>


              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                <motion.div
                  className="w-10 h-10 rounded-full hero-gradient flex items-center justify-center text-sm font-bold text-primary-foreground"
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {t.avatar}
                </motion.div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
