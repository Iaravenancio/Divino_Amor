import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { StoreProvider } from "@/lib/store";
import { NavBar } from "@/components/site/NavBar";
import { Footer } from "@/components/site/Footer";
import { MiniCart } from "@/components/site/MiniCart";
import { Logo } from "@/components/site/Logo";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-6 w-fit"><Logo size={120} /></div>
        <h1 className="text-5xl">Página não encontrada</h1>
        <p className="mt-3 text-sm text-muted-foreground">A página que você procura não existe ou mudou de lugar.</p>
        <Link to="/" className="mt-8 inline-block rounded-sm bg-wine px-8 py-3.5 text-xs uppercase tracking-[0.3em] text-gold-light">Voltar ao início</Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-2xl">Esta página não carregou</h1>
        <p className="mt-2 text-sm text-muted-foreground">Algo deu errado. Tente novamente.</p>
        <button onClick={() => { router.invalidate(); reset(); }} className="mt-6 rounded-sm bg-wine px-6 py-3 text-xs uppercase tracking-[0.3em] text-gold-light">Tentar de novo</button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "DIVINO AMOR — Moda feminina" },
      { name: "description", content: "Moda feminina com amor e elegância." },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Archivo+Black&family=Hanken+Grotesk:wght@300;400;500&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const isHome = path === "/";
  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        <NavBar className={isHome ? "rise" : "sticky top-0"} />
        <main><Outlet /></main>
        <Footer />
        <MiniCart />
        <Toaster />
      </StoreProvider>
    </QueryClientProvider>
  );
}
