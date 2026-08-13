import type { AssessmentItem, AssessmentOption, Competency, DevelopmentalBand, EvidenceContribution, ScenarioState } from '../domain/types';

export const MISSION_IDS = ['city-mobility', 'water-resilience', 'food-habitat', 'digital-routing', 'orbital-research'] as const;
export type MissionId = (typeof MISSION_IDS)[number];

export function getDevelopmentalBand(classLevel: number): DevelopmentalBand {
  if (classLevel >= 3 && classLevel <= 4) return '3-4';
  if (classLevel <= 6) return '5-6';
  if (classLevel <= 8) return '7-8';
  if (classLevel <= 10) return '9-10';
  if (classLevel <= 12) return '11-12';
  throw new Error(`Class ${classLevel} is outside AXIOM's Class 3-12 assessment range.`);
}

function evidence(primary: Competency, earned: number): readonly EvidenceContribution[] {
  const systemEvidence: EvidenceContribution = { competency: 'systemsThinking', earnedWeight: primary === 'systemsThinking' ? earned : Math.max(1, earned - 2), availableWeight: 10 };
  return primary === 'systemsThinking'
    ? [systemEvidence]
    : [{ competency: primary, earnedWeight: earned, availableWeight: 10 }, systemEvidence];
}

function option(id: string, label: string, primary: Competency, earned: number): AssessmentOption {
  return { id, label, evidence: evidence(primary, earned) };
}

function item(
  id: string,
  missionId: string,
  missionTitle: string,
  prompt: string,
  context: string,
  primary: Competency,
  state: ScenarioState,
  options: readonly AssessmentOption[],
): Omit<AssessmentItem, 'developmentalBand'> {
  return { id, missionId, missionTitle, prompt, context, options, scenarioState: state, mutableStateKeys: Object.keys(state), mutation: primary === 'engineeringDecisions' ? { reserve: Math.max(0, Number(state.reserve ?? 0) - 1) } : undefined };
}

const calibrationBlueprints: readonly Omit<AssessmentItem, 'developmentalBand'>[] = [
  item('calibration-science', 'calibration', 'Signal calibration', 'A cooling bay reports a sudden temperature rise. Which observation best tests the proposed cause?', 'The setting is a fictional research network with no real-world location.', 'scientificReasoning', { temperature: 31, reserve: 4 }, [option('calibration-measure-both', 'Measure temperature at the bay and a comparison bay before changing the system.', 'scientificReasoning', 10), option('calibration-change-first', 'Change several settings immediately and observe whether the alert disappears.', 'scientificReasoning', 3)]),
  item('calibration-quant', 'calibration', 'Signal calibration', 'A water grid has 120 stored units and uses 18 units each hour. Which plan uses the data to protect a six-hour reserve?', 'The reservoir is part of a fictional resilient-city simulation.', 'quantitativeReasoning', { storage: 120, reserve: 4 }, [option('calibration-calculate-reserve', 'Calculate the six-hour demand, then compare it with stored units before releasing water.', 'quantitativeReasoning', 10), option('calibration-guess-reserve', 'Release water now because the storage number looks large.', 'quantitativeReasoning', 3)]),
  item('calibration-code', 'calibration', 'Signal calibration', 'A routing rule must send urgent packets first without losing ordinary packets. Which logic is most reliable?', 'The digital environment is fictional and has no identifiable city or institution.', 'computationalThinking', { queue: 18, reserve: 4 }, [option('calibration-priority-queue', 'Use a priority queue with a fair rule that returns to ordinary packets.', 'computationalThinking', 10), option('calibration-delete-ordinary', 'Delete ordinary packets whenever urgent packets arrive.', 'computationalThinking', 2)]),
  item('calibration-engineering', 'calibration', 'Signal calibration', 'A bridge sensor loses power during a storm simulation. Which design choice keeps the system safest?', 'The bridge is an invented infrastructure prototype, not a recognizable building.', 'engineeringDecisions', { battery: true, reserve: 4 }, [option('calibration-redundant-power', 'Switch to an independent backup sensor and record the failure for repair.', 'engineeringDecisions', 10), option('calibration-ignore-sensor', 'Continue using the missing sensor reading as if it were current.', 'engineeringDecisions', 1)]),
  item('calibration-systems', 'calibration', 'Signal calibration', 'Passenger flow rises in one district of a fictional transit grid. Which intervention protects the entire network?', 'The same autonomous routing system connects six anonymous districts.', 'systemsThinking', { capacity: 5, routes: 6, reserve: 4 }, [option('calibration-route-flex', 'Redirect flexible routes through available capacity while protecting the reserve.', 'systemsThinking', 10), option('calibration-protect-reserve', 'Hold all reserve capacity in place and let the local queue grow.', 'systemsThinking', 5)]),
];

const missionBlueprints: Readonly<Record<MissionId, readonly Omit<AssessmentItem, 'developmentalBand'>[]>> = {
  'city-mobility': [
    item('city-mobility-flow', 'city-mobility', 'Mobility network', 'A heat surge increases passenger demand in District 4. What should the transit intelligence evaluate before rerouting autonomous vehicles?', 'All six districts are fictional and visually anonymous.', 'systemsThinking', { capacity: 5, routes: 6, reserve: 4 }, [option('city-flow-model', 'Compare network capacity, transfer effects, and the energy reserve before rerouting.', 'systemsThinking', 10), option('city-flow-local', 'Add every available vehicle to District 4 without checking the rest of the network.', 'systemsThinking', 3)]),
    item('city-mobility-sensor', 'city-mobility', 'Mobility network', 'A traffic sensor conflicts with three nearby sensors. What is the most reliable next step?', 'The vehicles and routing attributes remain unchanged across this mission.', 'scientificReasoning', { sensors: 4, reserve: 4 }, [option('city-sensor-check', 'Compare the sensor with independent readings and inspect its calibration history.', 'scientificReasoning', 10), option('city-sensor-ignore', 'Choose the reading that creates the shortest local queue.', 'scientificReasoning', 3)]),
  ],
  'water-resilience': [
    item('water-resilience-demand', 'water-resilience', 'Water intelligence', 'A treatment system has a two-day energy reserve. Which calculation must guide the next release schedule?', 'The water network exists only inside AXIOM’s imagined coastal research zone.', 'quantitativeReasoning', { storage: 160, reserve: 2, demand: 35 }, [option('water-demand-model', 'Forecast demand, treatment energy, and reserve draw before choosing a release rate.', 'quantitativeReasoning', 10), option('water-demand-fixed', 'Repeat yesterday’s release rate without checking new demand.', 'quantitativeReasoning', 3)]),
    item('water-resilience-filter', 'water-resilience', 'Water intelligence', 'A filter efficiency drops while quality readings remain safe. Which engineering response is most resilient?', 'The same fictional filter units continue through every question.', 'engineeringDecisions', { filterEfficiency: 78, reserve: 2 }, [option('water-filter-backup', 'Route a controlled share through a backup filter and schedule a measured inspection.', 'engineeringDecisions', 10), option('water-filter-overload', 'Push all water through the declining filter until it stops.', 'engineeringDecisions', 2)]),
  ],
  'food-habitat': [
    item('food-habitat-pattern', 'food-habitat', 'Food and habitat intelligence', 'A greenhouse harvest declines after a lighting update. Which investigation can separate correlation from cause?', 'The habitat is a universal research dome, not a regional landmark.', 'scientificReasoning', { lightHours: 14, nutrientFlow: 7, reserve: 4 }, [option('food-pattern-control', 'Compare matched growing zones while changing one variable at a time.', 'scientificReasoning', 10), option('food-pattern-assume', 'Assume lighting is the cause because it changed most recently.', 'scientificReasoning', 3)]),
    item('food-habitat-loop', 'food-habitat', 'Food and habitat intelligence', 'A compost sensor sends values every minute. Which rule handles a faulty spike without discarding useful data?', 'The sensor and crop attributes remain constant unless the item declares a change.', 'computationalThinking', { readings: 60, reserve: 4 }, [option('food-loop-validate', 'Flag outliers, preserve the raw reading, and use a validated rolling estimate.', 'computationalThinking', 10), option('food-loop-delete', 'Delete every recent reading after one spike appears.', 'computationalThinking', 2)]),
  ],
  'digital-routing': [
    item('digital-routing-load', 'digital-routing', 'Digital safety and data routing', 'An emergency message queue is slowing as routine updates arrive. Which algorithmic policy keeps communication fair and safe?', 'The network is an invented digital environment with no real institution or city.', 'computationalThinking', { urgentQueue: 8, routineQueue: 30, reserve: 4 }, [option('digital-load-priority', 'Prioritize emergency messages while reserving scheduled capacity for routine updates.', 'computationalThinking', 10), option('digital-load-block', 'Block all routine updates indefinitely.', 'computationalThinking', 3)]),
    item('digital-routing-security', 'digital-routing', 'Digital safety and data routing', 'A node asks for access outside its normal role. What response protects the whole network?', 'All identities and system attributes remain stable across this scenario.', 'systemsThinking', { trustedNodes: 12, reserve: 4 }, [option('digital-security-verify', 'Verify the request, restrict access to the needed scope, and record the event.', 'systemsThinking', 10), option('digital-security-open', 'Grant broad access because the node is already connected.', 'systemsThinking', 1)]),
  ],
  'orbital-research': [
    item('orbital-research-power', 'orbital-research', 'Orbital research station', 'A research station predicts a shadow interval that reduces solar input. Which design decision protects the investigation?', 'The station is fictional and uses no recognizable real-world architecture.', 'engineeringDecisions', { batteryUnits: 48, reserve: 6, solarInput: true }, [option('orbital-power-reserve', 'Schedule experiments around the reserve budget and activate a redundant power path.', 'engineeringDecisions', 10), option('orbital-power-max', 'Run every experiment at maximum power before the shadow interval.', 'engineeringDecisions', 2)]),
    item('orbital-research-model', 'orbital-research', 'Orbital research station', 'Two tracking models disagree about a debris path. What is the strongest quantitative next step?', 'The same orbit and sensor assumptions remain fixed during the comparison.', 'quantitativeReasoning', { modelA: 12, modelB: 16, reserve: 6 }, [option('orbital-model-uncertainty', 'Compare model uncertainty, measurement error, and the safety margin before selecting a route.', 'quantitativeReasoning', 10), option('orbital-model-average', 'Use the average path without checking uncertainty.', 'quantitativeReasoning', 3)]),
  ],
};

export function getCalibrationItems(classLevel: number): readonly AssessmentItem[] {
  return materialize(calibrationBlueprints, getDevelopmentalBand(classLevel));
}

export function getMissionItems(missionId: MissionId, classLevel: number): readonly AssessmentItem[] {
  return materialize(missionBlueprints[missionId], getDevelopmentalBand(classLevel));
}

function materialize(items: readonly Omit<AssessmentItem, 'developmentalBand'>[], developmentalBand: DevelopmentalBand): readonly AssessmentItem[] {
  return items.map((source) => ({ ...source, developmentalBand, prompt: `${bandInstruction(developmentalBand)} ${source.prompt}` }));
}

function bandInstruction(band: DevelopmentalBand): string {
  const instructions: Record<DevelopmentalBand, string> = {
    '3-4': 'Use the information you can observe and choose the safest connected action.',
    '5-6': 'Use the evidence to compare what could happen next across the system.',
    '7-8': 'Trace how a local decision affects linked parts of the system.',
    '9-10': 'Evaluate the trade-offs, constraints, and feedback effects before deciding.',
    '11-12': 'Model the uncertainty, dependencies, and second-order effects before deciding.',
  };
  return instructions[band];
}
