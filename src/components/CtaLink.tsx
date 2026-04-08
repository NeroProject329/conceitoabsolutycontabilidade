import React, { useMemo } from "react";
import { useWhatsApp } from "@/providers/WhatsAppProvider";

type CtaLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  /** Se true, apenas navega/scroll (ex: href="#consultar") */
  onlyScroll?: boolean;
  /** Mensagem do WhatsApp para esse CTA */
  message?: string;
};

const DEFAULT_MESSAGE =
  "Olá, gostaria de consultar minhas ofertas disponíveis!";

export default function CtaLink({
  href = "#",
  children,
  className,
  onlyScroll,
  message,
  ...rest
}: CtaLinkProps) {
  const { open, loading } = useWhatsApp();

  const isAnchor = useMemo(
    () => Boolean(onlyScroll) && href.startsWith("#"),
    [onlyScroll, href]
  );

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isAnchor) return; // deixa o scroll/navegação normal

    e.preventDefault();
    if (loading) return;

    open(message || DEFAULT_MESSAGE);
  };

  return (
    <a
      href={href}
      className={className}
      onClick={handleClick}
      style={{ pointerEvents: loading && !isAnchor ? "none" : undefined }}
      {...rest}
    >
      {children}
    </a>
  );
}