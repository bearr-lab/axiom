import { useState } from 'react';
import { Button } from './ui/button';

export function ResetDialog({ onConfirm }: { onConfirm(): void }) {
  const [confirming, setConfirming] = useState(false);
  return confirming ? <div className="reset-confirm" role="alert"><p>Erase this browser’s AXIOM profile, progress, and result snapshot?</p><Button variant="outline" onClick={() => setConfirming(false)}>Keep data</Button><Button variant="destructive" onClick={onConfirm}>Confirm erase</Button></div> : <Button variant="outline" onClick={() => setConfirming(true)}>Erase local data</Button>;
}
