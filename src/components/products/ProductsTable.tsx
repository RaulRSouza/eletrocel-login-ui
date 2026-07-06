import { motion } from "motion/react";
import { Pencil, Trash2, PackageX } from "lucide-react";
import type { Product } from "@/lib/products-mock";
import { formatCurrency } from "@/lib/format";

interface Props {
  products: Product[];
  onEdit: (p: Product) => void;
  onDelete: (p: Product) => void;
}

function stockTone(n: number) {
  if (n === 0) return { color: "#f87171", bg: "#f8717118", label: "Sem estoque" };
  if (n <= 5) return { color: "#facc15", bg: "#facc1518", label: `${n} un` };
  return { color: "#4ade80", bg: "#4ade8018", label: `${n} un` };
}

export function ProductsTable({ products, onEdit, onDelete }: Props) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-6 py-16 text-center">
        <PackageX className="h-8 w-8 text-slate-600" />
        <p className="mt-3 text-sm text-slate-300">Nenhum produto encontrado</p>
        <p className="mt-1 text-xs text-slate-500">
          Ajuste os filtros ou cadastre um novo produto.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] md:block">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/[0.02] text-[11px] uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">Produto</th>
              <th className="px-4 py-3 font-medium">SKU / EAN</th>
              <th className="px-4 py-3 font-medium">Categoria</th>
              <th className="px-4 py-3 font-medium">Estoque</th>
              <th className="px-4 py-3 font-medium text-right">Preço</th>
              <th className="px-4 py-3 font-medium text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {products.map((p, i) => {
              const tone = stockTone(p.estoque);
              return (
                <motion.tr
                  key={p.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(i * 0.02, 0.2) }}
                  className="text-slate-200 transition-colors hover:bg-white/[0.02]"
                >
                  <td className="px-4 py-3">
                    <p className="font-medium text-slate-100">{p.nome}</p>
                    {p.descricao && (
                      <p className="mt-0.5 line-clamp-1 text-xs text-slate-500">
                        {p.descricao}
                      </p>
                    )}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-slate-400">
                    <div>{p.sku}</div>
                    {p.ean13 && <div className="text-slate-600">{p.ean13}</div>}
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-400">{p.categoria}</td>
                  <td className="px-4 py-3">
                    <span
                      className="inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium"
                      style={{ background: tone.bg, color: tone.color }}
                    >
                      {tone.label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-medium tabular-nums text-slate-100">
                    {formatCurrency(p.preco)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <button
                        onClick={() => onEdit(p)}
                        aria-label={`Editar ${p.nome}`}
                        className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-white/5 hover:text-slate-100"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => onDelete(p)}
                        aria-label={`Excluir ${p.nome}`}
                        className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-red-500/10 hover:text-red-400"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile list */}
      <div className="grid gap-2 md:hidden">
        {products.map((p, i) => {
          const tone = stockTone(p.estoque);
          return (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.02, 0.2) }}
              className="rounded-2xl border border-white/5 bg-white/[0.02] p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-slate-100">{p.nome}</p>
                  <p className="mt-0.5 font-mono text-[11px] text-slate-500">{p.sku}</p>
                </div>
                <span
                  className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium"
                  style={{ background: tone.bg, color: tone.color }}
                >
                  {tone.label}
                </span>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-slate-400">{p.categoria}</span>
                <span className="font-medium tabular-nums text-slate-100">
                  {formatCurrency(p.preco)}
                </span>
              </div>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => onEdit(p)}
                  className="flex-1 rounded-lg border border-white/10 bg-white/[0.03] py-1.5 text-xs text-slate-200 hover:border-white/20"
                >
                  Editar
                </button>
                <button
                  onClick={() => onDelete(p)}
                  className="rounded-lg border border-red-500/20 bg-red-500/5 px-3 py-1.5 text-xs text-red-400 hover:bg-red-500/10"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </>
  );
}
