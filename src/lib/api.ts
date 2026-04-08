/** Em dev use "" para o proxy do Vite (/api → 3001). Em produção defina VITE_API_URL. */
const API_BASE = import.meta.env.VITE_API_URL ?? "";

function getToken(): string | null {
  return localStorage.getItem("painel_token");
}

export async function login(username: string, password: string) {
  const res = await fetch(`${API_BASE}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Falha no login");
  if (data.token) localStorage.setItem("painel_token", data.token);
  return data;
}

export async function logout() {
  const token = getToken();
  if (token) {
    await fetch(`${API_BASE}/api/logout`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
  }
  localStorage.removeItem("painel_token");
}

export async function getNumbers() {
  const token = getToken();
  if (!token) throw new Error("Não autorizado");
  const res = await fetch(`${API_BASE}/api/numbers`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json().catch(() => []);
  if (!res.ok) throw new Error(Array.isArray(data) ? "Erro ao carregar" : (data as { error?: string }).error);
  return data as NumberRow[];
}

export async function addNumber(number: string, label?: string) {
  const token = getToken();
  if (!token) throw new Error("Não autorizado");
  const res = await fetch(`${API_BASE}/api/numbers`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ number, label }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((data as { error?: string }).error || "Erro ao adicionar");
  return data as NumberRow;
}

export async function setNumberActive(id: number, is_active: boolean) {
  const token = getToken();
  if (!token) throw new Error("Não autorizado");
  const res = await fetch(`${API_BASE}/api/numbers/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ is_active }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((data as { error?: string }).error || "Erro ao atualizar");
  return data as NumberRow;
}

export async function deleteNumber(id: number) {
  const token = getToken();
  if (!token) throw new Error("Não autorizado");
  const res = await fetch(`${API_BASE}/api/numbers/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error((data as { error?: string }).error || "Erro ao excluir");
  }
}

export async function getActiveNumber() {
  const res = await fetch(`${API_BASE}/api/active-number`);
  const data = await res.json().catch(() => ({}));
  return data as { active: { id: number; number: string; label: string | null } | null; url: string | null };
}

/** Registra um clique no número ativo e retorna a URL do WhatsApp. */
export async function registerClick(): Promise<{ url: string }> {
  const res = await fetch(`${API_BASE}/api/click`, { method: "POST", headers: { "Content-Type": "application/json" } });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((data as { error?: string }).error || "Nenhum número ativo");
  return data as { url: string };
}

export interface NumberRow {
  id: number;
  number: string;
  label: string | null;
  is_active: number;
  click_count: number;
  created_at: string;
}
