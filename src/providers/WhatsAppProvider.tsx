import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type WhatsContextValue = {
  loading: boolean;
  phone: string; // só dígitos
  error: string | null;
  refresh: () => Promise<void>;
  open: (message: string) => void;
};

const WhatsAppContext = createContext<WhatsContextValue | null>(null);

const API_BASE = import.meta.env.VITE_ZAP_API_BASE as string;

function getDomain(): string {
  if (typeof window === "undefined") return "";
  return window.location.hostname.replace(/^www\./, "");
}

function onlyDigits(v: string) {
  return String(v || "").replace(/\D/g, "");
}

function buildWaUrl(phoneDigits: string, message: string) {
  const phone = onlyDigits(phoneDigits);
  const text = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${text}`;
}

async function fetchPhoneByDomain(domain: string, signal?: AbortSignal) {
  const url = `${API_BASE}/zap?domain=${encodeURIComponent(domain)}`;

  const r = await fetch(url, { method: "GET", cache: "no-store", signal });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);

  const data = await r.json();
  const phone = onlyDigits(data?.phone);
  const numero = onlyDigits(data?.numero);
  const resolved = phone || numero;

  if (!resolved) throw new Error("Número não retornado");
  return resolved;
}

export function WhatsAppProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);

  const domain = useMemo(() => getDomain(), []);

  const refresh = useCallback(async () => {
    if (!API_BASE) {
      setPhone("");
      setError("VITE_ZAP_API_BASE não configurada no .env");
      setLoading(false);
      return;
    }

    if (!domain) {
      setPhone("");
      setError("Domínio inválido.");
      setLoading(false);
      return;
    }

    setLoading(true);
    const controller = new AbortController();

    try {
      const ph = await fetchPhoneByDomain(domain, controller.signal);
      setPhone(ph);
      setError(null);
    } catch {
      setPhone("");
      setError("WhatsApp indisponível no momento. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  }, [domain]);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    (async () => {
      try {
        if (!API_BASE) throw new Error("API_BASE missing");
        if (!domain) throw new Error("domain invalid");

        const ph = await fetchPhoneByDomain(domain, controller.signal);

        if (!cancelled) {
          setPhone(ph);
          setError(null);
          setLoading(false);
        }
      } catch {
        if (!cancelled) {
          setPhone("");
          setError("WhatsApp indisponível no momento. Tente novamente mais tarde.");
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [domain]);

  const open = useCallback(
    (message: string) => {
      if (loading) return;

      if (!phone) {
        alert(error || "WhatsApp indisponível no momento.");
        return;
      }

      const url = buildWaUrl(phone, message);
      window.open(url, "_blank", "noopener,noreferrer");
    },
    [loading, phone, error]
  );

  const value: WhatsContextValue = { loading, phone, error, refresh, open };

  return (
    <WhatsAppContext.Provider value={value}>
      {children}
    </WhatsAppContext.Provider>
  );
}

export function useWhatsApp() {
  const ctx = useContext(WhatsAppContext);
  if (!ctx) throw new Error("useWhatsApp must be used within WhatsAppProvider");
  return ctx;
}