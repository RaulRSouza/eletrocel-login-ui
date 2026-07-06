import { useEffect, useState, type FormEvent } from "react";
import { Modal } from "@/components/ui/modal";
import {
  productCategories,
  productSchema,
  type Product,
  type ProductInput,
} from "@/lib/products-mock";

const SUN = "#facc15";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ProductInput) => void;
  initial?: Product | null;
}

const empty: ProductInput = {
  nome: "",
  sku: "",
  ean13: "",
  categoria: "Smartphones",
  preco: 0,
  custo: 0,
  estoque: 0,
  descricao: "",
};

export function ProductFormModal({ open, onClose, onSubmit, initial }: Props) {
  const [values, setValues] = useState<ProductInput>(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (open) {
      setValues(initial ? { ...initial, ean13: initial.ean13 ?? "" } : empty);
      setErrors({});
    }
  }, [open, initial]);

  const set = <K extends keyof ProductInput>(k: K, v: ProductInput[K]) =>
    setValues((p) => ({ ...p, [k]: v }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const parsed = productSchema.safeParse(values);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const i of parsed.error.issues) {
        const k = i.path[0] as string;
        if (!errs[k]) errs[k] = i.message;
      }
      setErrors(errs);
      return;
    }
    onSubmit(parsed.data);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={initial ? "Editar produto" : "Novo produto"}
      maxWidth="max-w-xl"
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <Field label="Nome" error={errors.nome}>
          <input
            value={values.nome}
            onChange={(e) => set("nome", e.target.value)}
            className={inputCls}
            autoFocus
          />
        </Field>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="SKU" error={errors.sku}>
            <input
              value={values.sku}
              onChange={(e) => set("sku", e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="EAN-13 (opcional)" error={errors.ean13}>
            <input
              value={values.ean13 ?? ""}
              onChange={(e) => set("ean13", e.target.value)}
              inputMode="numeric"
              className={inputCls}
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Field label="Categoria" error={errors.categoria}>
            <select
              value={values.categoria}
              onChange={(e) => set("categoria", e.target.value as ProductInput["categoria"])}
              className={inputCls}
            >
              {productCategories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Preço (R$)" error={errors.preco}>
            <input
              type="number"
              step="0.01"
              min={0}
              value={values.preco}
              onChange={(e) => set("preco", Number(e.target.value))}
              className={inputCls}
            />
          </Field>
          <Field label="Custo (R$)" error={errors.custo}>
            <input
              type="number"
              step="0.01"
              min={0}
              value={values.custo}
              onChange={(e) => set("custo", Number(e.target.value))}
              className={inputCls}
            />
          </Field>
        </div>

        <Field label="Estoque" error={errors.estoque}>
          <input
            type="number"
            min={0}
            step={1}
            value={values.estoque}
            onChange={(e) => set("estoque", Number(e.target.value))}
            className={inputCls}
          />
        </Field>

        <Field label="Descrição" error={errors.descricao}>
          <textarea
            value={values.descricao}
            onChange={(e) => set("descricao", e.target.value)}
            rows={3}
            className={`${inputCls} resize-none`}
          />
        </Field>

        <div className="flex items-center justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-white/10 bg-white/[0.02] px-4 py-2 text-sm text-slate-300 hover:border-white/20"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-950 transition-transform hover:scale-[1.01]"
            style={{ background: `linear-gradient(135deg, #fef08a, ${SUN})` }}
          >
            {initial ? "Salvar alterações" : "Cadastrar produto"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

const inputCls =
  "w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-slate-100 focus:border-white/20 focus:outline-none";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-slate-500">
        {label}
      </span>
      {children}
      {error && <span className="mt-1 block text-[11px] text-red-400">{error}</span>}
    </label>
  );
}
