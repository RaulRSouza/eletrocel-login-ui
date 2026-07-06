import { z } from "zod";
import { isValidEAN13 } from "./validation";

export const productCategories = [
  "Smartphones",
  "Acessórios",
  "Carregadores",
  "Fones",
  "Capas",
  "Películas",
  "Peças",
  "Outros",
] as const;

export type ProductCategory = (typeof productCategories)[number];

export const productSchema = z.object({
  nome: z.string().trim().min(2, "Informe o nome").max(120),
  sku: z.string().trim().min(1, "SKU obrigatório").max(40),
  ean13: z
    .string()
    .trim()
    .optional()
    .refine((v) => !v || isValidEAN13(v), "EAN-13 inválido"),
  categoria: z.enum(productCategories),
  preco: z.coerce.number().min(0, "Preço inválido"),
  custo: z.coerce.number().min(0, "Custo inválido"),
  estoque: z.coerce.number().int("Use um inteiro").min(0),
  descricao: z.string().max(500).optional().default(""),
});

export type ProductInput = z.infer<typeof productSchema>;

export interface Product extends ProductInput {
  id: string;
  atualizadoEm: string;
}

let seedIdCounter = 1;
const nextId = () => `p_${(seedIdCounter++).toString().padStart(4, "0")}`;

export const seedProducts: Product[] = [
  {
    id: nextId(),
    nome: "iPhone 15 128GB Preto",
    sku: "IPH15-128-BLK",
    ean13: "7891234567895",
    categoria: "Smartphones",
    preco: 6499,
    custo: 5400,
    estoque: 6,
    descricao: "Novo, lacrado, 1 ano de garantia Apple.",
    atualizadoEm: new Date().toISOString(),
  },
  {
    id: nextId(),
    nome: "Samsung Galaxy A55 256GB",
    sku: "SGA55-256",
    ean13: "7891234567901",
    categoria: "Smartphones",
    preco: 2799,
    custo: 2200,
    estoque: 12,
    descricao: "",
    atualizadoEm: new Date().toISOString(),
  },
  {
    id: nextId(),
    nome: "Carregador USB-C 20W",
    sku: "CH-USBC-20",
    ean13: "7891234567918",
    categoria: "Carregadores",
    preco: 89.9,
    custo: 32,
    estoque: 3,
    descricao: "",
    atualizadoEm: new Date().toISOString(),
  },
  {
    id: nextId(),
    nome: "Fone Bluetooth JBL Tune 520BT",
    sku: "JBL-520BT",
    ean13: "7891234567925",
    categoria: "Fones",
    preco: 349,
    custo: 210,
    estoque: 8,
    descricao: "",
    atualizadoEm: new Date().toISOString(),
  },
  {
    id: nextId(),
    nome: "Capa Silicone iPhone 15",
    sku: "CAP-IPH15-SIL",
    ean13: "7891234567932",
    categoria: "Capas",
    preco: 79,
    custo: 22,
    estoque: 24,
    descricao: "",
    atualizadoEm: new Date().toISOString(),
  },
  {
    id: nextId(),
    nome: "Película Vidro 3D Galaxy A55",
    sku: "PEL-A55-3D",
    ean13: "7891234567949",
    categoria: "Películas",
    preco: 39.9,
    custo: 8,
    estoque: 2,
    descricao: "",
    atualizadoEm: new Date().toISOString(),
  },
];

/** In-memory store — replace with real API later. */
class ProductStore {
  private items: Product[] = [...seedProducts];
  list() {
    return [...this.items];
  }
  create(input: ProductInput): Product {
    const p: Product = { ...input, id: nextId(), atualizadoEm: new Date().toISOString() };
    this.items.unshift(p);
    return p;
  }
  update(id: string, input: ProductInput): Product | null {
    const i = this.items.findIndex((x) => x.id === id);
    if (i < 0) return null;
    this.items[i] = { ...this.items[i], ...input, atualizadoEm: new Date().toISOString() };
    return this.items[i];
  }
  remove(id: string) {
    this.items = this.items.filter((x) => x.id !== id);
  }
  findByBarcode(code: string) {
    return this.items.find((p) => p.ean13 === code) ?? null;
  }
}

export const productStore = new ProductStore();
