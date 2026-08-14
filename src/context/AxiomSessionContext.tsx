import { createContext, type PropsWithChildren, useCallback, useContext, useEffect, useMemo, useReducer } from 'react';
import { calculateResult } from '../domain/scoring';
import { createSession, sessionReducer } from '../domain/session';
import type { AxiomSession, ItemResponse, LearnerProfile } from '../domain/types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { loadSession, type PersistenceStatus, type StorageLike } from '../persistence/storage';

interface AxiomSessionContextValue {
  session: AxiomSession;
  persistenceStatus: PersistenceStatus;
  setProfile(profile: LearnerProfile): void;
  answer(response: ItemResponse): void;
  undo(): void;
  complete(): void;
  enterApp(): void;
  startNew(): void;
  eraseLocalData(): void;
}

const AxiomSessionContext = createContext<AxiomSessionContextValue | null>(null);

export function AxiomSessionProvider({ children, storage = window.localStorage }: PropsWithChildren<{ storage?: StorageLike }>) {
  const [session, dispatch] = useReducer(sessionReducer, undefined, () => loadSession(storage).session);
  const { persistenceStatus, persist, erase } = useLocalStorage(storage);

  useEffect(() => { persist(session); }, [persist, session]);

  const value = useMemo<AxiomSessionContextValue>(() => ({
    session,
    persistenceStatus,
    setProfile: (profile) => dispatch({ type: 'setProfile', profile }),
    answer: (response) => dispatch({ type: 'answerItem', response }),
    undo: () => dispatch({ type: 'undoLastResponse' }),
    complete: () => {
      if (!session.profile) throw new Error('A learner profile is required before completion.');
      const result = calculateResult(Object.values(session.responses), session.profile.classLevel, new Date().toISOString());
      dispatch({ type: 'complete', result });
    },
    enterApp: () => dispatch({ type: 'enterApp' }),
    startNew: () => dispatch({ type: 'reset' }),
    eraseLocalData: () => { erase(); dispatch({ type: 'reset' }); },
  }), [erase, persistenceStatus, session]);

  return <AxiomSessionContext.Provider value={value}>{children}</AxiomSessionContext.Provider>;
}

export function useAxiomSession(): AxiomSessionContextValue {
  const value = useContext(AxiomSessionContext);
  if (!value) throw new Error('useAxiomSession must be used inside AxiomSessionProvider.');
  return value;
}

export { createSession };
