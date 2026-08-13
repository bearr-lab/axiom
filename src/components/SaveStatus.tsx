import { useAxiomSession } from '../context/AxiomSessionContext';

export function SaveStatus() {
  const { persistenceStatus } = useAxiomSession();
  const unavailable = persistenceStatus.state === 'unavailable';
  return <p className={`save-status${unavailable ? ' warning' : ''}`} role="status"><span aria-hidden="true" className="status-dot" />{unavailable ? 'Local save unavailable' : 'Saved locally'}</p>;
}
