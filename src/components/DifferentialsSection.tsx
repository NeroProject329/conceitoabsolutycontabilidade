import { Percent, ShieldCheck, FileX, Monitor } from "lucide-react";
import { motion } from "framer-motion";

const cards = [
  {
    icon: Percent,
    title: "Condições que fazem sentido",
    description: "A gente busca as melhores condições disponíveis para o seu momento. Assim, você compara alternativas com calma — com opções de desconto, parcelamento e mais flexibilidade.",
  },
  {
    icon: ShieldCheck,
    title: "Privacidade em primeiro lugar",
    description: "Suas informações ficam protegidas do início ao fim. Seguimos boas práticas de segurança para garantir uma experiência tranquila e confiável.",
  },
  {
    icon: FileX,
    title: "Sem taxas escondidas",
    description: "Você não paga nada para entender suas opções. Qualquer valor só acontece se você decidir seguir com uma alternativa — sem cobranças surpresa.",
  },
  {
    icon: Monitor,
    title: "Tudo online, no seu tempo",
    description: "Tecnologia pra facilitar de verdade: você escolhe quando, onde e como avançar, com um processo simples e orientação clara em cada etapa.",
  },
];

const DifferentialsSection = () => {
  return (
    <section className="py-20 hero-gradient relative overflow-hidden">
      <div className="absolute inset-0 hero-pattern" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl lg:text-5xl font-black text-primary-foreground leading-tight">
              Como nós fazemos com clareza
            </h2>
            <motion.div
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-foreground/80 px-5 py-2 text-sm font-semibold text-primary-foreground"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Monitor className="w-4 h-4" />
              ATENDIMENTO HUMANO
            </motion.div>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4">
            {cards.map((card, i) => (
              <motion.div
                key={i}
                className="bg-primary-foreground/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-muted mb-4 group-hover:bg-primary/10 transition-colors">
                  <card.icon className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-sm font-bold text-foreground mb-2">{card.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{card.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DifferentialsSection;
