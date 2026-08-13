import { AxiomSessionProvider, useAxiomSession } from './context/AxiomSessionContext';
import { AppShell } from './components/AppShell';
import { Assessment } from './components/Assessment';
import { Onboarding } from './components/Onboarding';
import { Dashboard } from './components/Dashboard';

function AxiomApplication() {
  const { session, startNew, eraseLocalData } = useAxiomSession();
  const body = session.phase === 'onboarding' ? <Onboarding /> : session.phase === 'results' && session.result ? <Dashboard snapshot={session.result} onNew={startNew} onErase={eraseLocalData} /> : <Assessment />;
  return <AppShell>{body}</AppShell>;
}

export default function App() { return <AxiomSessionProvider><AxiomApplication /></AxiomSessionProvider>; }
