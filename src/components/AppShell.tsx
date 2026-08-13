import type { PropsWithChildren } from 'react';
import { SaveStatus } from './SaveStatus';

export function AppShell({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-primary/20 via-background to-background text-foreground flex flex-col">
      <header className="sticky top-0 z-50 h-16 flex items-center justify-between px-4 md:px-8 border-b border-border bg-background/60 backdrop-blur-md">
        <div className="flex items-baseline gap-3">
          <span className="font-extrabold tracking-[0.2em] text-sm text-foreground">AXIOM</span>
          <span className="hidden md:inline-block text-[0.7rem] uppercase tracking-wider text-muted-foreground">/ Applied benchmark</span>
        </div>
        <SaveStatus />
      </header>
      <div className="flex-1 flex flex-col">
        {children}
      </div>
    </div>
  );
}
