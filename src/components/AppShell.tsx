import type { PropsWithChildren } from 'react';
import { SaveStatus } from './SaveStatus';

export function AppShell({ children }: PropsWithChildren) {
  return <div className="app-shell"><header className="app-header"><div><span className="wordmark">AXIOM</span><span className="header-subtitle">/ Applied benchmark</span></div><SaveStatus /></header>{children}</div>;
}
