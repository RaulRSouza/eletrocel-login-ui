import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppHeader } from "@/components/dashboard/AppHeader";

export const Route = createFileRoute("/_authenticated")({
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  return (
    <div className="min-h-dvh bg-[#0a0e1a] text-slate-100">
      <AppHeader />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <Outlet />
      </main>
    </div>
  );
}
