import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export interface CartItem { slug: string; size: string; color: string; qty: number }

interface Store {
  cart: CartItem[];
  favs: string[];
  miniOpen: boolean;
  setMiniOpen: (o: boolean) => void;
  add: (i: CartItem) => void;
  setQty: (i: CartItem, qty: number) => void;
  remove: (i: CartItem) => void;
  clear: () => void;
  toggleFav: (slug: string) => void;
}

const Ctx = createContext<Store | null>(null);
const same = (a: CartItem, b: CartItem) => a.slug === b.slug && a.size === b.size && a.color === b.color;

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favs, setFavs] = useState<string[]>([]);
  const [miniOpen, setMiniOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      setCart(JSON.parse(localStorage.getItem("da-cart") || "[]"));
      setFavs(JSON.parse(localStorage.getItem("da-favs") || "[]"));
    } catch { /* ignore */ }
    setReady(true);
  }, []);
  useEffect(() => { if (ready) localStorage.setItem("da-cart", JSON.stringify(cart)); }, [cart, ready]);
  useEffect(() => { if (ready) localStorage.setItem("da-favs", JSON.stringify(favs)); }, [favs, ready]);

  const value: Store = {
    cart, favs, miniOpen, setMiniOpen,
    add: (i) => {
      setCart((c) => (c.some((x) => same(x, i)) ? c.map((x) => (same(x, i) ? { ...x, qty: x.qty + i.qty } : x)) : [...c, i]));
      setMiniOpen(true);
    },
    setQty: (i, qty) => setCart((c) => c.map((x) => (same(x, i) ? { ...x, qty: Math.max(1, qty) } : x))),
    remove: (i) => setCart((c) => c.filter((x) => !same(x, i))),
    clear: () => setCart([]),
    toggleFav: (s) => setFavs((f) => (f.includes(s) ? f.filter((x) => x !== s) : [...f, s])),
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const s = useContext(Ctx);
  if (!s) throw new Error("useStore outside provider");
  return s;
}

export const COUPONS: Record<string, number> = { DIVINO10: 0.1 };
export function shippingFor(cep: string, subtotal: number) {
  const d = cep.replace(/\D/g, "");
  if (d.length !== 8) return null;
  if (subtotal >= 399) return 0;
  return d.startsWith("0") || d.startsWith("1") ? 19.9 : 29.9;
}
