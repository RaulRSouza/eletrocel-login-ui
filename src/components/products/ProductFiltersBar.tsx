import { Search, ScanLine, Plus, X } from "lucide-react";
import { productCategories, type ProductCategory } from "@/lib/products-mock";

const SUN = "#facc15";

export interface ProductFiltersBarProps {
  search: string;
  category: ProductCategory | "all";
  sort: "recent" | "name" | "stock" | "price";
  onSearch: (v: string) => void;
  onCategory: (v: ProductCategory | "all") => void;
  onSort: (v: "recent" | "name" | "stock" | "price") => void;
  onNew: () => void;
  onBarcode: () => void;
}

export function ProductFiltersBar({
  search,
  category,
  sort,
  onSearch,
  onCategory,
  onSort,
  onNew,
  onBarcode,
}: ProductFiltersBarProps) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-white/5 bg-white/[0.02] p-3 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
          aria-hidden
        />
        <input
          type="search"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Buscar por nome, SKU ou EAN..."
          aria-label="Buscar produtos"
          className="w-full rounded-xl border border-white/5 bg-black/30 py-2 pl-9 pr-9 text-sm text-slate-100 placeholder:text-slate-600 focus:border-white/10 focus:outline-none"
        />
        {search && (
          <button
            type="button"
            onClick={() => onSearch("")}
            aria-label="Limpar busca"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-slate-500 hover:text-slate-200"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      <select
        value={category}
        onChange={(e) => onCategory(e.target.value as ProductCategory | "all")}
        aria-label="Filtrar por categoria"
        className="rounded-xl border border-white/5 bg-black/30 px-3 py-2 text-sm text-slate-200 focus:border-white/10 focus:outline-none"
      >
        <option value="all">Todas categorias</option>
        {productCategories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <select
        value={sort}
        onChange={(e) => onSort(e.target.value as typeof sort)}
        aria-label="Ordenar"
        className="rounded-xl border border-white/5 bg-black/30 px-3 py-2 text-sm text-slate-200 focus:border-white/10 focus:outline-none"
      >
        <option value="recent">Recentes</option>
        <option value="name">Nome (A-Z)</option>
        <option value="stock">Estoque (menor)</option>
        <option value="price">Preço (maior)</option>
      </select>

      <div className="flex gap-2">
        <button
          onClick={onBarcode}
          className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-medium text-slate-200 transition-colors hover:border-white/20"
        >
          <ScanLine className="h-4 w-4" />
          Código de barras
        </button>
        <button
          onClick={onNew}
          className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-950 transition-transform hover:scale-[1.02]"
          style={{ background: `linear-gradient(135deg, #fef08a, ${SUN})` }}
        >
          <Plus className="h-4 w-4" />
          Novo produto
        </button>
      </div>
    </div>
  );
}
