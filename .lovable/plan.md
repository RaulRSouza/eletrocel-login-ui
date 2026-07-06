## Contexto

Você quer expandir o app além do login/recuperação de senha e construir o núcleo do MVP Eletrocel: **Dashboard** e **Produtos**, com componentes UI reutilizáveis. O prompt novo pede paleta escura com acentos vibrantes (roxo/pink/cyan) — isso **conflita** com a paleta atual "Midnight & Sun" (preto + amarelo) que acabamos de aplicar no login.

**Antes de codar preciso resolver isso** (ver "Perguntas abertas" no fim). Enquanto isso, aqui vai o plano assumindo que mantemos coerência visual em todo o sistema.

---

## Escopo desta entrega

### Novas rotas (TanStack Router, file-based em `src/routes/`)
- `src/routes/_authenticated.tsx` — layout gate simples (mock, sem backend por ora) com `<Outlet />` + header persistente.
- `src/routes/_authenticated.dashboard.tsx` — `/dashboard`
- `src/routes/_authenticated.produtos.tsx` — `/produtos`
- Login redireciona para `/dashboard` no sucesso (mock).

### Dashboard (`DashboardPage`)
- Header: título "Dashboard", saudação com nome do usuário, badge online/offline (via `navigator.onLine` + listener), botão logout.
- Grid responsivo de **MetricCard** (4 cards mock): Vendas do dia, Ticket médio, Produtos em estoque baixo, OS abertas. Cada card: ícone Lucide, valor grande, delta vs. período anterior, sparkline leve (SVG inline, sem lib).
- Grid de **ModuleCard** (atalhos): Vendas, Produtos, Ordens de Serviço, Clientes, Relatórios. Hover com brilho sutil.
- Skeletons (não spinners) durante loading mockado.
- Animações escalonadas de entrada (motion), suaves.

### Produtos (`ProductsPage`)
- **ProductFiltersBar**: busca (debounce 300ms), filtro categoria, ordenação, botão "Novo produto", botão "Buscar por código".
- **ProductsTable**: colunas Foto, Nome, SKU/EAN, Categoria, Estoque (badge cor), Preço, Ações (editar/excluir). Responsivo: em mobile vira lista de cards.
- **ProductFormModal**: cadastro/edição com Zod (`nome`, `sku`, `ean13` validado, `preco`, `custo`, `estoque`, `categoria`, `descricao`). Fecha com ESC.
- **BarcodeSearchModal**: input com foco automático, aceita EAN-13, valida checksum, "encontrado / não encontrado".
- Dados: mock em memória (array) — sem backend ainda. Estrutura pronta para plugar API depois.

### Componentes UI reutilizáveis (`src/components/ui/`)
Já usamos shadcn (Button, Card, Badge existem). Vou padronizar variantes usando os tokens do design system (`src/styles.css` via `@theme`) em vez de criar novos arquivos que dupliquem shadcn. Isso evita duplicação e mantém o padrão do projeto.

### Utilitários (`src/lib/`)
- `format.ts` — `formatCurrency` (BRL), `formatDate`, `formatNumber`.
- `validation.ts` — `isValidEAN13` (checksum), reuso dos schemas Zod existentes.

### Design system
- Migrar cores hardcoded (`NIGHT`, `SUN` como string literal) para tokens em `src/styles.css` (`@theme` com `--color-*` em oklch). Assim `bg-primary`, `text-accent` etc. funcionam e o tema fica consistente entre login e app.
- Manter tipografia distintiva (não Inter/Roboto). Sugestão: **Sora** (display) + **Manrope** (body) via `@fontsource`, carregadas em `src/main.tsx`.

---

## Fora de escopo (fica pra depois)

- Backend real / integração com `http://localhost:3000/api` — hoje é mock.
- Gráficos com Recharts.
- Ordens de Serviço, Clientes, Vendas (só como cards de atalho no dashboard).
- Autenticação real (Lovable Cloud/Supabase).

---

## Detalhes técnicos

- Stack: **TanStack Start + TanStack Router** (não React Router DOM, apesar de o prompt citar). Vou seguir as convenções do projeto (`createFileRoute`, `<Link>`, `useNavigate`).
- Estado de URL (filtros/busca/página) via `validateSearch` + `Route.useSearch()`, não `useState`.
- Motion: animações minimalistas, escalonadas (0.05–0.08s stagger), respeitando o tom "elegante" do login.
- Acessibilidade: labels em todos os inputs, `aria-*` nos modais, foco visível, navegação por teclado, contraste AA.

---

## Perguntas abertas (preciso da sua resposta antes de codar)

1. **Paleta**: mantenho a **Midnight & Sun** (preto + dourado) que aplicamos no login para o app inteiro, ou você quer **repintar tudo** com dark + roxo/pink/cyan como diz o novo prompt? (Recomendo manter Midnight & Sun — o login já está pronto e o sistema fica coeso.)
2. **Backend**: sigo com **mock em memória** ou já quero habilitar **Lovable Cloud** (equivalente a Supabase gerenciado) para persistir produtos/usuários de verdade?
3. Confirma que quer as **duas telas nesta entrega** (Dashboard + Produtos) ou prefere fatiar (só Dashboard primeiro)?