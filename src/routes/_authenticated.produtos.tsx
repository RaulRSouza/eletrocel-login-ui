import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { ProductFiltersBar } from "@/components/products/ProductFiltersBar";
import { ProductsTable } from "@/components/products/ProductsTable";
import { ProductFormModal } from "@/components/products/ProductFormModal";
import { BarcodeSearchModal } from "@/components/products/BarcodeSearchModal";
import {
  productStore,
  type Product,
  type ProductCategory,
  type ProductInput,
} from "@/lib/products-mock";

export const Route = createFileRoute("/_authenticated/produtos")({
  head: () => ({
    meta: [
      { title: "Eletrocel — Produtos" },
      { name: "description", content: "Gerencie o catálogo e o estoque da Eletrocel." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ProductsPage,
});

function useDebounced<T>(value: T, ms: number) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), ms);
    return () => clearTimeout(t);
  }, [value, ms]);
  return v;
}

function ProductsPage() {
  const [items, setItems] = useState<Product[]>(() => productStore.list());
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<ProductCategory | "all">("all");
  const [sort, setSort] = useState<"recent" | "name" | "stock" | "price">("recent");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [barcodeOpen, setBarcodeOpen] = useState(false);

  const debSearch = useDebounced(search, 300);

  const filtered = useMemo(() => {
    const q = debSearch.trim().toLowerCase();
    let list = items.filter((p) => {
      if (category !== "all" && p.categoria !== category) return false;
      if (!q) return true;
      return (
        p.nome.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        (p.ean13 ?? "").includes(q)
      );
    });
    switch (sort) {
      case "name":
        list = [...list].sort((a, b) => a.nome.localeCompare(b.nome));
        break;
      case "stock":
        list = [...list].sort((a, b) => a.estoque - b.estoque);
        break;
      case "price":
        list = [...list].sort((a, b) => b.preco - a.preco);
        break;
      default:
        list = [...list].sort(
          (a, b) => +new Date(b.atualizadoEm) - +new Date(a.atualizadoEm),
        );
    }
    return list;
  }, [items, debSearch, category, sort]);

  const refresh = () => setItems(productStore.list());

  const handleSubmit = (data: ProductInput) => {
    if (editing) productStore.update(editing.id, data);
    else productStore.create(data);
    refresh();
    setFormOpen(false);
    setEditing(null);
  };

  const handleDelete = (p: Product) => {
    if (!confirm(`Excluir "${p.nome}"?`)) return;
    productStore.remove(p.id);
    refresh();
  };

  return (
    <div className="space-y-6">
      <motion.header
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-wrap items-end justify-between gap-3"
      >
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Catálogo</p>
          <h1 className="mt-1 text-2xl font-semibold text-slate-100">Produtos</h1>
          <p className="mt-1 text-sm text-slate-500">
            {filtered.length} de {items.length} produto{items.length === 1 ? "" : "s"}
          </p>
        </div>
      </motion.header>

      <ProductFiltersBar
        search={search}
        category={category}
        sort={sort}
        onSearch={setSearch}
        onCategory={setCategory}
        onSort={setSort}
        onNew={() => {
          setEditing(null);
          setFormOpen(true);
        }}
        onBarcode={() => setBarcodeOpen(true)}
      />

      <ProductsTable
        products={filtered}
        onEdit={(p) => {
          setEditing(p);
          setFormOpen(true);
        }}
        onDelete={handleDelete}
      />

      <ProductFormModal
        open={formOpen}
        onClose={() => {
          setFormOpen(false);
          setEditing(null);
        }}
        onSubmit={handleSubmit}
        initial={editing}
      />

      <BarcodeSearchModal open={barcodeOpen} onClose={() => setBarcodeOpen(false)} />
    </div>
  );
}
