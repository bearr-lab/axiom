import { createSession, sessionReducer } from '../domain/session';
import type { AxiomSession, ItemResponse, LearnerProfile } from '../domain/types';

export const SESSION_KEY = 'axiom.session.v1';
export const PROFILE_KEY = 'axiom.profile.v1';

export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

export type PersistenceStatus = { state: 'saved' } | { state: 'unavailable'; message: string };

export interface LoadResult {
  session: AxiomSession;
  recovered: boolean;
}

export function saveSession(session: AxiomSession, storage: StorageLike): PersistenceStatus {
  try {
    storage.setItem(SESSION_KEY, JSON.stringify(session));
    if (session.profile) storage.setItem(PROFILE_KEY, JSON.stringify(session.profile));
    return { state: 'saved' };
  } catch {
    return { state: 'unavailable', message: 'Local save is unavailable in this browser.' };
  }
}

export function loadSession(storage: StorageLike): LoadResult {
  const profile = readProfile(storage);
  const raw = safelyRead(storage, SESSION_KEY);
  if (!raw) return { session: createSession(profile), recovered: false };

  try {
    const parsed: unknown = JSON.parse(raw);
    const session = migrateAndHydrate(parsed, profile);
    if (!session) throw new Error('Invalid AXIOM session data.');
    return { session, recovered: false };
  } catch {
    safelyRemove(storage, SESSION_KEY);
    return { session: createSession(profile), recovered: true };
  }
}

export function resetSession(storage: StorageLike): void {
  safelyRemove(storage, SESSION_KEY);
  safelyRemove(storage, PROFILE_KEY);
}

function migrateAndHydrate(value: unknown, fallbackProfile?: LearnerProfile): AxiomSession | null {
  if (!isRecord(value)) return null;
  const profile = isProfile(value.profile) ? value.profile : fallbackProfile;
  if (!profile) return createSession();
  const responses = isRecord(value.responses) ? Object.values(value.responses).filter(isItemResponse) : [];
  let session = createSession(profile);
  for (const response of responses) session = sessionReducer(session, { type: 'answerItem', response });
  return session;
}

function readProfile(storage: StorageLike): LearnerProfile | undefined {
  try {
    const value: unknown = JSON.parse(storage.getItem(PROFILE_KEY) ?? 'null');
    return isProfile(value) ? value : undefined;
  } catch {
    return undefined;
  }
}

function safelyRead(storage: StorageLike, key: string): string | null {
  try { return storage.getItem(key); } catch { return null; }
}

function safelyRemove(storage: StorageLike, key: string): void {
  try { storage.removeItem(key); } catch { /* recovery must not throw */ }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isProfile(value: unknown): value is LearnerProfile {
  return isRecord(value) && typeof value.name === 'string' && typeof value.classLevel === 'number' && Number.isInteger(value.classLevel) && value.classLevel >= 3 && value.classLevel <= 12;
}

function isItemResponse(value: unknown): value is ItemResponse {
  return isRecord(value)
    && typeof value.itemId === 'string'
    && typeof value.missionId === 'string'
    && typeof value.prompt === 'string'
    && typeof value.optionId === 'string'
    && typeof value.optionLabel === 'string'
    && Array.isArray(value.evidence);
}
