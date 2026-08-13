import { createSession } from '../domain/session';
import { loadSession, PROFILE_KEY, saveSession, SESSION_KEY } from './storage';

describe('local AXIOM storage', () => {
  it('migrates a version 0 session to the current version', () => {
    const storage = new MemoryStorage();
    storage.setItem(SESSION_KEY, JSON.stringify({ profile: { name: 'Mira', classLevel: 8 }, responses: {} }));

    expect(loadSession(storage).session).toMatchObject({ version: 1, profile: { name: 'Mira', classLevel: 8 } });
  });

  it('removes corrupt session JSON but retains an independently readable profile', () => {
    const storage = new MemoryStorage();
    storage.setItem(SESSION_KEY, '{invalid');
    storage.setItem(PROFILE_KEY, JSON.stringify({ name: 'Mira', classLevel: 8 }));

    const result = loadSession(storage);

    expect(result.recovered).toBe(true);
    expect(result.session.profile).toEqual({ name: 'Mira', classLevel: 8 });
    expect(storage.getItem(SESSION_KEY)).toBeNull();
  });

  it('reports unavailable storage without discarding in-memory progress', () => {
    const status = saveSession(createSession(), { getItem: () => null, setItem: () => { throw new Error('blocked'); }, removeItem: () => undefined });

    expect(status.state).toBe('unavailable');
  });
});

class MemoryStorage {
  private values = new Map<string, string>();
  getItem(key: string) { return this.values.get(key) ?? null; }
  setItem(key: string, value: string) { this.values.set(key, value); }
  removeItem(key: string) { this.values.delete(key); }
}
