import { getCalibrationItems, getDevelopmentalBand, getMissionItems, MISSION_IDS, type MissionId } from '../data/scenarios';
import type { AssessmentItem, AssessmentPlan, CalibrationAnswer } from './types';

export function createAssessment(classLevel: number, calibrationAnswers: readonly CalibrationAnswer[]): AssessmentPlan {
  const calibrationItems = getCalibrationItems(classLevel);
  const missionIds = selectMissionIds(classLevel, calibrationAnswers);
  const missionItems = missionIds.flatMap((missionId) => getMissionItems(missionId, classLevel));
  return Object.freeze({ classLevel, developmentalBand: getDevelopmentalBand(classLevel), calibrationItems, missionIds, missionItems });
}

export function getNextItem(plan: AssessmentPlan, answeredItemIds: readonly string[]): AssessmentItem | null {
  const answered = new Set(answeredItemIds);
  return [...plan.calibrationItems, ...plan.missionItems].find((item) => !answered.has(item.id)) ?? null;
}

function selectMissionIds(classLevel: number, answers: readonly CalibrationAnswer[]): readonly MissionId[] {
  const systemsAnswer = answers.find((answer) => answer.itemId === 'calibration-systems')?.optionId;
  const forcedOffset = systemsAnswer === 'calibration-route-flex' ? 0 : systemsAnswer === 'calibration-protect-reserve' ? 2 : hash(`${classLevel}:${answers.map((answer) => answer.optionId).join('|')}`) % MISSION_IDS.length;
  return Object.freeze([0, 1, 2].map((offset) => MISSION_IDS[(forcedOffset + offset) % MISSION_IDS.length]));
}

function hash(value: string): number {
  return [...value].reduce((total, character) => (total * 31 + character.charCodeAt(0)) >>> 0, 7);
}
