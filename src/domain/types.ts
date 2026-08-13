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
