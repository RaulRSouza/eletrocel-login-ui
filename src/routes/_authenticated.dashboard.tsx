import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  DollarSign,
  Package,
  Receipt,
  Wrench,
  ShoppingCart,
  Users,
  BarChart3,
} from "lucide-react";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { ModuleCard } from "@/components/dashboard/ModuleCard";
import { formatCurrency } from "@/lib/format";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "Eletrocel — Dashboard" },
      { name: "description", content: "Visão consolidada da operação da Eletrocel." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const now = new Date();
  const greeting =
    now.getHours() < 12 ? "Bom dia" : now.getHours() < 18 ? "Boa tarde" : "Boa noite";

  return (
    <div className="space-y-10">
      <motion.header
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Dashboard</p>
        <h1 className="mt-1 text-2xl font-semibold text-slate-100">
          {greeting}, Admin
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Aqui está um resumo do que está acontecendo na sua loja hoje.
        </p>
      </motion.header>

      <section aria-label="Métricas do dia">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            index={0}
            label="Vendas do dia"
            value={formatCurrency(4820.5)}
            delta={{ value: "+12,4% vs. ontem", positive: true }}
            icon={DollarSign}
            spark={[10, 14, 12, 18, 16, 22, 24]}
          />
          <MetricCard
            index={1}
            label="Ticket médio"
            value={formatCurrency(268.9)}
            delta={{ value: "-3,1%", positive: false }}
            icon={Receipt}
            spark={[20, 18, 22, 19, 17, 18, 16]}
          />
          <MetricCard
            index={2}
            label="Estoque baixo"
            value="7 itens"
            delta={{ value: "atenção", positive: false }}
            icon={Package}
            spark={[2, 3, 3, 4, 5, 6, 7]}
          />
          <MetricCard
            index={3}
            label="OS abertas"
            value="14"
            delta={{ value: "3 aguardando peça", positive: true }}
            icon={Wrench}
            spark={[8, 10, 9, 11, 12, 13, 14]}
          />
        </div>
      </section>

      <section aria-label="Módulos" className="space-y-3">
        <h2 className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
          Módulos
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <ModuleCard
            index={0}
            to="/produtos"
            title="Produtos"
            description="Catálogo, estoque e códigos de barras."
            icon={Package}
          />
          <ModuleCard
            index={1}
            to="/produtos"
            title="Vendas"
            description="PDV com leitor, offline-first."
            icon={ShoppingCart}
            disabled
          />
          <ModuleCard
            index={2}
            to="/produtos"
            title="Ordens de Serviço"
            description="Consertos, orçamentos e WhatsApp."
            icon={Wrench}
            disabled
          />
          <ModuleCard
            index={3}
            to="/produtos"
            title="Clientes"
            description="Cadastro com conformidade LGPD."
            icon={Users}
            disabled
          />
          <ModuleCard
            index={4}
            to="/produtos"
            title="Relatórios"
            description="Vendas, DRE e performance."
            icon={BarChart3}
            disabled
          />
        </div>
      </section>
    </div>
  );
}
