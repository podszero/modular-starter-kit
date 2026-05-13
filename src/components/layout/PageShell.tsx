import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { APP_NAME } from "@/app/constants";

interface PageShellProps {
  children: ReactNode;
}

/**
 * Basic page layout: header + main + footer.
 * Use this around any page that needs the global chrome.
 */
export function PageShell({ children }: PageShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link to="/" className="text-sm font-semibold tracking-tight">
            {APP_NAME}
          </Link>
          <nav className="text-sm text-muted-foreground">v0.1</nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-10">{children}</main>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-5xl px-6 py-4 text-xs text-muted-foreground">
          Built with TanStack Start
        </div>
      </footer>
    </div>
  );
}
