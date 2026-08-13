import { createSession, sessionReducer } from './session';

describe('sessionReducer', () => {
  it('replaces an answer immutably instead of duplicating it', () => {
    const initial = sessionReducer(createSession(), { type: 'setProfile', profile: { name: 'Mira', classLevel: 8 } });
    const first = sessionReducer(initial, { type: 'answerItem', response: response('route-flex') });
    const replaced = sessionReducer(first, { type: 'answerItem', response: response('protect-reserve') });

    expect(first.responses['calibration-systems'].optionId).toBe('route-flex');
    expect(replaced.responses['calibration-systems'].optionId).toBe('protect-reserve');
    expect(Object.keys(replaced.responses)).toHaveLength(1);
  });

  it('resets to an onboarding session', () => {
    const active = sessionReducer(createSession(), { type: 'setProfile', profile: { name: 'Mira', classLevel: 8 } });
    expect(sessionReducer(active, { type: 'reset' })).toMatchObject({ phase: 'onboarding', responses: {} });
  });
});

function response(optionId: string) {
  return { itemId: 'calibration-systems', missionId: 'calibration', prompt: 'Prompt', optionId, optionLabel: optionId, evidence: [{ competency: 'systemsThinking' as const, earnedWeight: 10, availableWeight: 10 }] };
}
