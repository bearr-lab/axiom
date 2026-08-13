import { getNorm } from '../data/norms';
import type { ItemResponse } from './types';
import { calculateResult, projectScore } from './scoring';

describe('projectScore', () => {
  it('maps the reference mean to 480 and clamps extreme projections', () => {
    const norm = { mean: 60, standardDeviation: 10 };

    expect(projectScore(60, norm).score).toBe(480);
    expect(projectScore(200, norm).score).toBe(900);
    expect(projectScore(-100, norm).score).toBe(100);
  });

  it('selects the exact provisional norm for a class and rejects unsupported classes', () => {
    expect(getNorm(8, 'systemsThinking')).toEqual({ mean: 61, standardDeviation: 12 });
    expect(() => getNorm(2, 'systemsThinking')).toThrow(/norm/i);
  });
});

describe('calculateResult', () => {
  it('creates a five-competency immutable projected benchmark from weighted evidence', () => {
    const responses: ItemResponse[] = [
      response('city-1', 'scientificReasoning', 8, 10),
      response('city-2', 'quantitativeReasoning', 6, 10),
      response('city-3', 'computationalThinking', 7, 10),
      response('city-4', 'engineeringDecisions', 5, 10),
      response('city-5', 'systemsThinking', 9, 10),
    ];

    const result = calculateResult(responses, 8, '2026-08-12T00:00:00.000Z');

    expect(result.classLevel).toBe(8);
    expect(result.competencies.systemsThinking.rawPercent).toBe(90);
    expect(result.competencies.systemsThinking.score).toBe(722);
    expect(result.overallScore).toBeGreaterThan(100);
    expect(result.percentile).toBeGreaterThanOrEqual(1);
    expect(result.percentile).toBeLessThanOrEqual(99);
    expect(Object.isFrozen(result)).toBe(true);
  });

  it('refuses a benchmark with missing competency evidence', () => {
    expect(() => calculateResult([response('city-1', 'scientificReasoning', 8, 10)], 8, '2026-08-12T00:00:00.000Z')).toThrow(/evidence/i);
  });
});

function response(itemId: string, competency: ItemResponse['evidence'][number]['competency'], earnedWeight: number, availableWeight: number): ItemResponse {
  return {
    itemId,
    missionId: 'city-mobility',
    prompt: 'A fictional system prompt',
    optionId: 'route-flex',
    optionLabel: 'Redirect flexible routes',
    evidence: [{ competency, earnedWeight, availableWeight }],
  };
}
