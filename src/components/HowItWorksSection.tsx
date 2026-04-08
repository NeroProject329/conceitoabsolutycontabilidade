import { Search, FileText, CheckCircle, ThumbsUp } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Análise e Diagnóstico",
    description: "Realizamos uma análise completa da sua situação atual, identificando todas as oportunidades para você voltar ao azul.",
  },
  {
    icon: FileText,
    number: "02",
    title: "Estratégia e Planejamento",
    description: "Desenvolvemos um plano estratégico personalizado com metas claras e cronograma de implementação.",
  },
  {
    icon: CheckCircle,
    number: "03",
    title: "Implementação",
    description: "Colocamos em prática todas as estratégias planejadas com acompanhamento constante.",
  },
  {
    icon: ThumbsUp,
    number: "04",
    title: "Resultados",
    description: "Monitoramos os resultados, ajustando processos para garantir os melhores descontos possíveis.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1 rounded-full text-sm font-semibold text-primary border border-primary/30 mb-4">
            Passo a Passo
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            Como <span className="text-gradient">funciona</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Simples, rápido e transparente. Veja como é fácil resolver sua situação.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              className="relative bg-card rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <span className="absolute -top-1 -left-1 text-3xl font-black text-primary/10 group-hover:text-primary/20 transition-colors select-none leading-none">
                {step.number}
              </span>
              <div className="relative z-10 pt-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4">
                  <step.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
