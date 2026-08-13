import { useAxiomSession } from '../context/AxiomSessionContext';

export function SaveStatus() {
  const { persistenceStatus } = useAxiomSession();
  const unavailable = persistenceStatus.state === 'unavailable';
  return (
    <p className={`flex items-center gap-2 text-xs font-medium ${unavailable ? 'text-destructive' : 'text-muted-foreground'}`} role="status">
      <span aria-hidden="true" className={`w-2 h-2 rounded-full shadow-[0_0_8px_currentColor] ${unavailable ? 'bg-destructive' : 'bg-primary'}`} />
      <span className="hidden sm:inline-block">{unavailable ? 'Local save unavailable' : 'Saved locally'}</span>
    </p>
  );
}
