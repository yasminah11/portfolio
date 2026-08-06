import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
} from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useState, type ReactNode } from "react";

import { ThemeProvider } from "@/context/ThemeContext";
import { Cursor } from "@/components/chrome/Cursor";
import { Dock } from "@/components/chrome/Dock";
import { ScrollProgress } from "@/components/chrome/ScrollProgress";
import { ScrollToTop } from "@/components/chrome/ScrollToTop";
import { Preloader } from "@/components/chrome/Preloader";
import { SmoothScroll } from "@/components/chrome/SmoothScroll";
import { CommandPalette } from "@/components/chrome/CommandPalette";
import { Footer } from "@/components/chrome/Footer";

function NotFoundComponent() {
  return (
    <div className="grain flex min-h-dvh flex-col items-center justify-center px-6 text-center">
      <p className="eyebrow">Error 404</p>
      <h1 className="display mt-4 text-[clamp(4rem,18vw,11rem)] accent-text">404</h1>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        This route never shipped. Try the work index, or hit ⌘K to search.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex min-h-11 items-center rounded-full bg-accent px-6 text-sm font-medium text-accent-foreground transition-transform hover:scale-[1.03]"
      >
        Back to the portfolio
      </Link>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-dvh items-center justify-center px-6">
      <div className="max-w-md text-center">
        <p className="eyebrow">Something broke</p>
        <h1 className="display mt-3 text-4xl">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">Try again, or head back to the start.</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="min-h-11 rounded-full bg-accent px-5 text-sm font-medium text-accent-foreground"
          >
            Try again
          </button>
          <a
            href="/"
            className="min-h-11 rounded-full border border-hairline px-5 text-sm leading-[2.75rem]"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

const title = "Yasmin Ahmed Mohamed — Front-End Developer";
const description =
  "Front-End Developer skilled in HTML, CSS, JavaScript and React.js — building responsive, accessible, and interactive web experiences.";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Preloader />
        <SmoothScroll />
        <ScrollProgress />
        <Cursor />

        <main id="content">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>

        <Footer />
        <Dock onOpenPalette={() => setPaletteOpen(true)} />
        <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
        <ScrollToTop />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
