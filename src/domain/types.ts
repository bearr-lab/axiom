export const COMPETENCIES = [
  'scientificReasoning',
  'quantitativeReasoning',
  'computationalThinking',
  'engineeringDecisions',
  'systemsThinking',
] as const;

export type Competency = (typeof COMPETENCIES)[number];

export interface Norm {
  mean: number;
  standardDeviation: number;
}

export interface EvidenceContribution {
  competency: Competency;
  earnedWeight: number;
  availableWeight: number;
}

export interface ItemResponse {
  itemId: string;
  missionId: string;
  prompt: string;
  optionId: string;
  optionLabel: string;
  evidence: EvidenceContribution[];
}

export interface CompetencyProjection {
  rawPercent: number;
  zScore: number;
  score: number;
  norm: Norm;
}

export interface ResultSnapshot {
  assessmentVersion: 1;
  completedAt: string;
  classLevel: number;
  normVersion: 'provisional-2026.08';
  responses: readonly ItemResponse[];
  competencies: Readonly<Record<Competency, CompetencyProjection>>;
  overallScore: number;
  percentile: number;
}

export type DevelopmentalBand = '3-4' | '5-6' | '7-8' | '9-10' | '11-12';

export type ScenarioValue = string | number | boolean;
export type ScenarioState = Readonly<Record<string, ScenarioValue>>;
export type ScenarioMutation = Readonly<Record<string, ScenarioValue>>;

export interface AssessmentOption {
  id: string;
  label: string;
  evidence: readonly EvidenceContribution[];
}

export interface AssessmentItem {
  id: string;
  missionId: string;
  missionTitle: string;
  developmentalBand: DevelopmentalBand;
  prompt: string;
  context: string;
  options: readonly AssessmentOption[];
  scenarioState: ScenarioState;
  mutableStateKeys: readonly string[];
  mutation?: ScenarioMutation;
}

export interface CalibrationAnswer {
  itemId: string;
  optionId: string;
}

export interface AssessmentPlan {
  classLevel: number;
  developmentalBand: DevelopmentalBand;
  calibrationItems: readonly AssessmentItem[];
  missionIds: readonly string[];
  missionItems: readonly AssessmentItem[];
}
