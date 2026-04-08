import { Users, TrendingUp, ShieldCheck, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedCounter from "./AnimatedCounter";

const stats = [
  { icon: Users, value: 16, suffix: "M+", label: "Clientes Atendidos", color: "bg-primary/10 text-primary" },
  { icon: TrendingUp, value: 98, suffix: "%", label: "Desconto Máximo", color: "bg-secondary/10 text-secondary" },
  { icon: ShieldCheck, value: 100, suffix: "%", label: "Seguro e Confiável", color: "bg-green-100 text-green-600" },
  { icon: CheckCircle, value: 5, suffix: " Anos", label: "No Mercado", color: "bg-orange-100 text-orange-500" },
];

const StatsSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            Confiança, Segurança,{" "}
            <span className="text-gradient">Eficiência</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Com segurança, nossa equipe especializada estará sempre ao seu lado para orientá-lo e garantir que você tome as melhores decisões.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="text-center p-6 rounded-2xl bg-card shadow-sm hover:shadow-lg transition-shadow duration-300"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${stat.color} mb-4`}>
                <stat.icon className="w-7 h-7" />
              </div>
              <div className="text-3xl lg:text-4xl font-black text-foreground">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
