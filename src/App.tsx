import { AxiomSessionProvider, useAxiomSession } from './context/AxiomSessionContext';
import { AppShell } from './components/AppShell';
import { Assessment } from './components/Assessment';
import { Landing } from './components/Landing';
import { Onboarding } from './components/Onboarding';
import { Dashboard } from './components/Dashboard';

function AxiomApplication() {
  const { session, startNew, eraseLocalData, enterApp } = useAxiomSession();
  const body =
    session.phase === 'landing' ? <Landing onEnter={enterApp} /> :
    session.phase === 'onboarding' ? <Onboarding /> :
    session.phase === 'results' && session.result ? <Dashboard snapshot={session.result} onNew={startNew} onErase={eraseLocalData} /> :
    <Assessment />;
  return <AppShell scrollable={session.phase === 'landing'}>{body}</AppShell>;
}

export default function App() { return <AxiomSessionProvider><AxiomApplication /></AxiomSessionProvider>; }

