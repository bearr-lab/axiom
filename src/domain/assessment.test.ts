import { createAssessment, getNextItem } from './assessment';
import { applyScenarioMutation } from './continuity';

describe('assessment planner', () => {
  it('chooses the same three missions for identical class and calibration evidence', () => {
    const answers = [{ itemId: 'calibration-systems', optionId: 'calibration-route-flex' }];

    expect(createAssessment(8, answers)).toEqual(createAssessment(8, answers));
  });

  it('changes the selected mission sequence for a materially different calibration decision', () => {
    const flexible = createAssessment(8, [{ itemId: 'calibration-systems', optionId: 'calibration-route-flex' }]);
    const reserve = createAssessment(8, [{ itemId: 'calibration-systems', optionId: 'calibration-protect-reserve' }]);

    expect(flexible.missionIds).not.toEqual(reserve.missionIds);
  });

  it('returns calibration items before the three selected mission sequences', () => {
    const plan = createAssessment(8, []);

    expect(getNextItem(plan, [])?.id).toBe('calibration-science');
    expect(getNextItem(plan, plan.calibrationItems.map((item) => item.id))?.missionId).toBe(plan.missionIds[0]);
  });
});

describe('scenario continuity', () => {
  it('preserves unmentioned state attributes when an allowed mutation occurs', () => {
    expect(applyScenarioMutation({ capacity: 5, routes: 6 }, ['capacity', 'routes'], { capacity: 4 })).toEqual({ capacity: 4, routes: 6 });
  });

  it('rejects a mutation outside the item state contract', () => {
    expect(() => applyScenarioMutation({ capacity: 5 }, ['capacity'], { landmark: 'recognizable building' })).toThrow(/mutation/i);
  });
});
