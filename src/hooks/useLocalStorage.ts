import { useCallback, useState } from 'react';
import type { AxiomSession } from '../domain/types';
import { resetSession, saveSession, type PersistenceStatus, type StorageLike } from '../persistence/storage';

export function useLocalStorage(storage: StorageLike) {
  const [persistenceStatus, setPersistenceStatus] = useState<PersistenceStatus>({ state: 'saved' });

  const persist = useCallback((session: AxiomSession) => {
    const status = saveSession(session, storage);
    setPersistenceStatus(status);
    return status;
  }, [storage]);

  const erase = useCallback(() => {
    resetSession(storage);
    setPersistenceStatus({ state: 'saved' });
  }, [storage]);

  return { persistenceStatus, persist, erase };
}
