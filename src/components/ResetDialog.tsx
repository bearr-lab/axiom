import { useState } from 'react';

export function ResetDialog({ onConfirm }: { onConfirm(): void }) {
  const [confirming, setConfirming] = useState(false);
  return confirming ? <div className="reset-confirm" role="alert"><p>Erase this browser’s AXIOM profile, progress, and result snapshot?</p><button className="secondary-button" onClick={() => setConfirming(false)}>Keep data</button><button className="danger-button" onClick={onConfirm}>Confirm erase</button></div> : <button className="secondary-button" onClick={() => setConfirming(true)}>Erase local data</button>;
}
