import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  getNumbers,
  addNumber,
  setNumberActive,
  deleteNumber,
  logout,
  type NumberRow,
} from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { LogOut, Plus, Trash2, Phone } from "lucide-react";

const Painel = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [numbers, setNumbers] = useState<NumberRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [newNumber, setNewNumber] = useState("");
  const [newLabel, setNewLabel] = useState("");
  const [adding, setAdding] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const list = await getNumbers();
      setNumbers(list);
    } catch {
      toast({ title: "Erro", description: "Não autorizado ou falha ao carregar.", variant: "destructive" });
      navigate("/painel/login", { replace: true });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/painel/login", { replace: true });
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNumber.trim()) return;
    setAdding(true);
    try {
      const row = await addNumber(newNumber.trim(), newLabel.trim() || undefined);
      setNumbers((prev) => [row, ...prev]);
      setNewNumber("");
      setNewLabel("");
      toast({ title: "Número adicionado" });
    } catch (err) {
      toast({ title: "Erro", description: err instanceof Error ? err.message : "Falha ao adicionar", variant: "destructive" });
    } finally {
      setAdding(false);
    }
  };

  const handleToggleActive = async (id: number, current: number) => {
    const newActive = current ? 0 : 1;
    try {
      const updated = await setNumberActive(id, newActive === 1);
      setNumbers((prev) => prev.map((n) => (n.id === id ? updated : { ...n, is_active: 0 })));
      toast({ title: newActive ? "Número ativado" : "Número desativado" });
    } catch (err) {
      toast({ title: "Erro", description: err instanceof Error ? err.message : "Falha ao atualizar", variant: "destructive" });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Excluir este número?")) return;
    try {
      await deleteNumber(id);
      setNumbers((prev) => prev.filter((n) => n.id !== id));
      toast({ title: "Número excluído" });
    } catch (err) {
      toast({ title: "Erro", description: err instanceof Error ? err.message : "Falha ao excluir", variant: "destructive" });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <p className="text-muted-foreground">Carregando…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-background">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">Painel — Números</h1>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 max-w-3xl">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Adicionar número</CardTitle>
            <CardDescription>O número ativo receberá os cliques dos botões do site (ex.: WhatsApp).</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAdd} className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 space-y-2">
                <Label htmlFor="number">Número (ex: 49999999999)</Label>
                <Input
                  id="number"
                  value={newNumber}
                  onChange={(e) => setNewNumber(e.target.value)}
                  placeholder="49999999999"
                />
              </div>
              <div className="flex-1 space-y-2">
                <Label htmlFor="label">Rótulo (opcional)</Label>
                <Input
                  id="label"
                  value={newLabel}
                  onChange={(e) => setNewLabel(e.target.value)}
                  placeholder="Vendas"
                />
              </div>
              <div className="flex items-end">
                <Button type="submit" disabled={adding}>
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Números cadastrados</CardTitle>
            <CardDescription>Ative um número para receber os cliques. Apenas um pode estar ativo por vez.</CardDescription>
          </CardHeader>
          <CardContent>
            {numbers.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">Nenhum número cadastrado. Adicione acima.</p>
            ) : (
              <ul className="space-y-4">
                {numbers.map((n) => (
                  <li
                    key={n.id}
                    className="flex flex-wrap items-center justify-between gap-4 rounded-lg border p-4 bg-background"
                  >
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{n.number}</p>
                        {n.label && <p className="text-sm text-muted-foreground">{n.label}</p>}
                        <p className="text-sm text-muted-foreground">
                          <strong>{n.click_count}</strong> cliques
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <Label htmlFor={`switch-${n.id}`} className="text-sm">Ativo</Label>
                        <Switch
                          id={`switch-${n.id}`}
                          checked={n.is_active === 1}
                          onCheckedChange={() => handleToggleActive(n.id, n.is_active)}
                        />
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDelete(n.id)}
                        aria-label="Excluir"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Painel;
