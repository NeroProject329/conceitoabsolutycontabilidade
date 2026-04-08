import CtaLink from "@/components/CtaLink";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary-foreground/95 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-6 flex items-center justify-between h-16">
        <span className="text-xl font-black text-foreground">
          Conceito <span className="text-primary">Absoluty</span>
        </span>
        <CtaLink
          href="#"
          className="cta-gradient rounded-full px-6 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
        >
          Fale Conosco
        </CtaLink>
      </div>
    </nav>
  );
};

export default Navbar;
