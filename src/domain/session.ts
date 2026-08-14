import { createAssessment } from './assessment';
import type { AxiomSession, ItemResponse, LearnerProfile, ResultSnapshot } from './types';

export const CURRENT_SESSION_VERSION = 1 as const;

export type SessionAction =
  | { type: 'setProfile'; profile: LearnerProfile }
  | { type: 'answerItem'; response: ItemResponse }
  | { type: 'undoLastResponse' }
  | { type: 'complete'; result: ResultSnapshot }
  | { type: 'enterApp' }
  | { type: 'reset' };

export function createSession(profile?: LearnerProfile): AxiomSession {
  if (!profile) {
    return { version: CURRENT_SESSION_VERSION, phase: 'landing', responses: {} };
  }
  return { version: CURRENT_SESSION_VERSION, phase: 'assessment', profile, plan: createAssessment(profile.classLevel, []), responses: {} };
}

export function sessionReducer(session: AxiomSession, action: SessionAction): AxiomSession {
  if (action.type === 'reset') return createSession();
  if (action.type === 'enterApp') return { ...session, phase: 'onboarding' };
  if (action.type === 'setProfile') return createSession(action.profile);
  if (action.type === 'complete') return { ...session, phase: 'results', result: action.result };
  if (!session.profile) throw new Error('A learner profile is required before recording an assessment response.');

  let responses = { ...session.responses };
  
  if (action.type === 'undoLastResponse') {
    const keys = Object.keys(responses);
    if (keys.length === 0) return session;
    const lastKey = keys[keys.length - 1];
    delete responses[lastKey];
  } else if (action.type === 'answerItem') {
    responses = { ...responses, [action.response.itemId]: action.response };
  }

  const calibrationAnswers = Object.values(responses)
    .filter((response) => response.missionId === 'calibration')
    .map((response) => ({ itemId: response.itemId, optionId: response.optionId }));

  return { ...session, responses, plan: createAssessment(session.profile.classLevel, calibrationAnswers) };
}
