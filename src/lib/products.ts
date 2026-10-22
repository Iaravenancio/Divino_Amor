import l1 from "@/assets/looks/look-1.webp.asset.json";
import l2 from "@/assets/looks/look-2.webp.asset.json";
import l3 from "@/assets/looks/look-3.webp.asset.json";
import l4 from "@/assets/looks/look-4.webp.asset.json";
import l5 from "@/assets/looks/look-5.webp.asset.json";
import l6 from "@/assets/looks/look-6.webp.asset.json";

export const LOOKS = [l1.url, l2.url, l3.url, l4.url, l5.url, l6.url] as [string, string, string, string, string, string];

export type Category = "Vestidos" | "Macacões" | "Conjuntos" | "Acessórios";
export const CATEGORIES: Category[] = ["Vestidos", "Macacões", "Conjuntos", "Acessórios"];
export const SIZES = ["P", "M", "G", "GG"] as const;

export interface Product {
  slug: string;
  name: string;
  category: Category;
  price: number;
  oldPrice?: number;
  badge?: "Novo" | "Promoção";
  colors: [string, ...string[]];
  sizes: string[];
  images: [string, string];
  description: string;
  composition: string;
  createdAt: number;
}

// Dados de exemplo — edite aqui até cadastrar os produtos reais.
export const PRODUCTS: Product[] = [
  { slug: "macacao-pantalona-rosa-cha", name: "Macacão Pantalona Rosa Chá", category: "Macacões", price: 289.9, badge: "Novo", colors: ["Rosa Chá"], sizes: ["P", "M", "G", "GG"], images: [l1.url, l5.url], description: "Macacão de alcinha com pantalona fluida e caimento leve. Elegante do dia à noite.", composition: "100% viscose", createdAt: 6 },
  { slug: "conjunto-cropped-halter-short-azul-petroleo", name: "Conjunto Cropped Halter e Short Azul Petróleo", category: "Conjuntos", price: 219.9, badge: "Novo", colors: ["Azul Petróleo"], sizes: ["P", "M", "G"], images: [l2.url, l6.url], description: "Cropped com gola halter e short de cintura alta com bolsos.", composition: "97% algodão, 3% elastano", createdAt: 5 },
  { slug: "vestido-midi-pink-pesponto", name: "Vestido Midi Pink com Pesponto", category: "Vestidos", price: 259.9, oldPrice: 319.9, badge: "Promoção", colors: ["Pink"], sizes: ["P", "M", "G", "GG"], images: [l3.url, l1.url], description: "Vestido midi evasê com pespontos contrastantes e decote cavado.", composition: "100% linho misto", createdAt: 4 },
  { slug: "macacao-terracota-bolsos-cargo", name: "Macacão Terracota com Bolsos Cargo", category: "Macacões", price: 299.9, colors: ["Terracota"], sizes: ["P", "M", "G", "GG"], images: [l4.url, l2.url], description: "Macacão regata com zíper frontal, bolsos cargo e perna ampla.", composition: "100% viscolinho", createdAt: 3 },
  { slug: "conjunto-cropped-pantalona-bege", name: "Conjunto Cropped e Pantalona Bege", category: "Conjuntos", price: 269.9, oldPrice: 329.9, badge: "Promoção", colors: ["Bege"], sizes: ["P", "M", "G"], images: [l5.url, l3.url], description: "Cropped ombro único com babado e pantalona de alfaiataria.", composition: "100% poliéster crepe", createdAt: 2 },
  { slug: "vestido-midi-vermelho-cinto", name: "Vestido Midi Vermelho com Cinto", category: "Vestidos", price: 279.9, badge: "Novo", colors: ["Vermelho"], sizes: ["P", "M", "G", "GG"], images: [l6.url, l4.url], description: "Vestido midi com cinto de fivela, pespontos e barra sereia.", composition: "100% linho misto", createdAt: 1 },
];

export const brl = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
export const INSTALLMENTS = 6;
export const installment = (n: number) => `${INSTALLMENTS}x de ${brl(n / INSTALLMENTS)} sem juros`;
export const WHATSAPP = "5500000000000"; // substitua pelo número real
export const waLink = (msg: string) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
