import { motion } from "framer-motion";
import CtaLink from "@/components/CtaLink";

const FooterSection = () => {
  return (
    <>
      {/* CTA Section */}
      <section className="py-20 bg-background" id="consultar">
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            className="text-3xl lg:text-4xl font-bold text-foreground mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Resolva totalmente a  <span className="text-gradient">sua vida financeira agora!</span>!
          </motion.h2>
          <motion.p
            className="text-muted-foreground mb-8 max-w-md mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Consulte agora suas opções e encontre as melhores condições para resolver sua situação.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4, type: "spring" }}
          >
            <CtaLink
              href="#"
              className="inline-flex items-center gap-3 cta-gradient rounded-full px-10 py-4 text-lg font-bold text-primary-foreground shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              Consultar Grátis →
            </CtaLink>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground py-10">
        <div className="container mx-auto px-6 text-center space-y-3">
          <p className="text-sm font-semibold text-primary-foreground/80">
            Conceito Absoluty Contabilidade LTDA
          </p>
          <p className="text-xs text-primary-foreground/50">
            CNPJ: 11.590.631/0001-24
          </p>
          <p className="text-xs text-primary-foreground/50 leading-relaxed">
            Rua Minas Gerais, 1441E — Anexo, Sala 04 — Residencial Fiorindo Scussiato<br />
            Passo dos Fortes — Chapecó/SC — CEP 89805-512
          </p>
          <p className="text-xs text-primary-foreground/40 pt-2">
            © 2026 Conceito Absoluty Contabilidade LTDA. Todos os direitos reservados.
          </p>
        </div>
      </footer>

      {/* WhatsApp FAB — registra clique no número ativo e abre WhatsApp */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
      >
        <CtaLink
          href="#"
          className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-500 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
          aria-label="Abrir WhatsApp"
        >
          <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </CtaLink>
      </motion.div>
    </>
  );
};

export default FooterSection;
