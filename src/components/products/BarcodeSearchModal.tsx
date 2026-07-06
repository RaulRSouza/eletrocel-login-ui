import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ScanLine, CheckCircle2, XCircle } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { isValidEAN13, normalizeBarcode } from "@/lib/validation";
import { productStore, type Product } from "@/lib/products-mock";
import { formatCurrency } from "@/lib/format";

const SUN = "#facc15";

interface Props {
  open: boolean;
  onClose: () => void;
  onFound?: (p: Product) => void;
}

type State =
  | { kind: "idle" }
  | { kind: "invalid" }
  | { kind: "found"; product: Product }
  | { kind: "not_found"; code: string };

export function BarcodeSearchModal({ open, onClose, onFound }: Props) {
  const [code, setCode] = useState("");
  const [state, setState] = useState<State>({ kind: "idle" });
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setCode("");
      setState({ kind: "idle" });
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [open]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const c = normalizeBarcode(code);
    if (!isValidEAN13(c)) {
      setState({ kind: "invalid" });
      return;
    }
    const found = productStore.findByBarcode(c);
    if (found) {
      setState({ kind: "found", product: found });
      onFound?.(found);
    } else {
      setState({ kind: "not_found", code: c });
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Buscar por código de barras">
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div className="flex flex-col items-center gap-3 py-2">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-2xl"
            style={{ background: `${SUN}18`, color: SUN }}
          >
            <ScanLine className="h-6 w-6" />
          </div>
          <p className="text-center text-xs text-slate-500">
            Aponte o leitor ou digite os 13 dígitos do EAN-13
          </p>
        </div>

        <input
          ref={inputRef}
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            if (state.kind !== "idle") setState({ kind: "idle" });
          }}
          inputMode="numeric"
          placeholder="0000000000000"
          aria-label="Código de barras"
          className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-center font-mono text-lg tracking-[0.2em] text-slate-100 focus:border-white/20 focus:outline-none"
        />

        <AnimatePresence mode="wait">
          {state.kind === "invalid" && (
            <ResultBox key="i" tone="err" icon={<XCircle className="h-4 w-4" />}>
              Código inválido. Confira os 13 dígitos.
            </ResultBox>
          )}
          {state.kind === "not_found" && (
            <ResultBox key="n" tone="warn" icon={<XCircle className="h-4 w-4" />}>
              Nenhum produto encontrado para{" "}
              <span className="font-mono">{state.code}</span>.
            </ResultBox>
          )}
          {state.kind === "found" && (
            <ResultBox key="f" tone="ok" icon={<CheckCircle2 className="h-4 w-4" />}>
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-slate-100">
                    {state.product.nome}
                  </p>
                  <p className="mt-0.5 font-mono text-[11px] text-slate-500">
                    {state.product.sku}
                  </p>
                </div>
                <span className="shrink-0 font-semibold tabular-nums text-slate-100">
                  {formatCurrency(state.product.preco)}
                </span>
              </div>
            </ResultBox>
          )}
        </AnimatePresence>

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-white/10 bg-white/[0.02] px-4 py-2 text-sm text-slate-300 hover:border-white/20"
          >
            Fechar
          </button>
          <button
            type="submit"
            className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-950"
            style={{ background: `linear-gradient(135deg, #fef08a, ${SUN})` }}
          >
            Buscar
          </button>
        </div>
      </form>
    </Modal>
  );
}

function ResultBox({
  tone,
  icon,
  children,
}: {
  tone: "ok" | "warn" | "err";
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  const map = {
    ok: { color: "#4ade80", bg: "#4ade8014", border: "#4ade8033" },
    warn: { color: "#facc15", bg: "#facc1514", border: "#facc1533" },
    err: { color: "#f87171", bg: "#f8717114", border: "#f8717133" },
  }[tone];
  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      className="flex items-start gap-2 rounded-lg border px-3 py-2 text-sm"
      style={{ color: map.color, background: map.bg, borderColor: map.border }}
    >
      <span className="mt-0.5 shrink-0">{icon}</span>
      <div className="flex-1 text-slate-200">{children}</div>
    </motion.div>
  );
}
