import { COMPETENCIES, type Competency, type Norm } from '../domain/types';

export const NORM_VERSION = 'provisional-2026.08' as const;

const provisionalNorms: Readonly<Record<number, Readonly<Record<Competency, Norm>>>> = {
  3: { scientificReasoning: { mean: 52, standardDeviation: 13 }, quantitativeReasoning: { mean: 50, standardDeviation: 13 }, computationalThinking: { mean: 49, standardDeviation: 14 }, engineeringDecisions: { mean: 51, standardDeviation: 13 }, systemsThinking: { mean: 50, standardDeviation: 14 } },
  4: { scientificReasoning: { mean: 53, standardDeviation: 13 }, quantitativeReasoning: { mean: 51, standardDeviation: 13 }, computationalThinking: { mean: 50, standardDeviation: 13 }, engineeringDecisions: { mean: 52, standardDeviation: 13 }, systemsThinking: { mean: 51, standardDeviation: 14 } },
  5: { scientificReasoning: { mean: 54, standardDeviation: 13 }, quantitativeReasoning: { mean: 53, standardDeviation: 13 }, computationalThinking: { mean: 52, standardDeviation: 13 }, engineeringDecisions: { mean: 53, standardDeviation: 13 }, systemsThinking: { mean: 53, standardDeviation: 13 } },
  6: { scientificReasoning: { mean: 56, standardDeviation: 12 }, quantitativeReasoning: { mean: 54, standardDeviation: 13 }, computationalThinking: { mean: 54, standardDeviation: 13 }, engineeringDecisions: { mean: 55, standardDeviation: 13 }, systemsThinking: { mean: 55, standardDeviation: 13 } },
  7: { scientificReasoning: { mean: 57, standardDeviation: 12 }, quantitativeReasoning: { mean: 56, standardDeviation: 12 }, computationalThinking: { mean: 56, standardDeviation: 13 }, engineeringDecisions: { mean: 57, standardDeviation: 12 }, systemsThinking: { mean: 58, standardDeviation: 12 } },
  8: { scientificReasoning: { mean: 59, standardDeviation: 12 }, quantitativeReasoning: { mean: 58, standardDeviation: 12 }, computationalThinking: { mean: 58, standardDeviation: 12 }, engineeringDecisions: { mean: 59, standardDeviation: 12 }, systemsThinking: { mean: 61, standardDeviation: 12 } },
  9: { scientificReasoning: { mean: 61, standardDeviation: 12 }, quantitativeReasoning: { mean: 60, standardDeviation: 12 }, computationalThinking: { mean: 60, standardDeviation: 12 }, engineeringDecisions: { mean: 61, standardDeviation: 12 }, systemsThinking: { mean: 62, standardDeviation: 12 } },
  10: { scientificReasoning: { mean: 63, standardDeviation: 12 }, quantitativeReasoning: { mean: 62, standardDeviation: 12 }, computationalThinking: { mean: 62, standardDeviation: 12 }, engineeringDecisions: { mean: 63, standardDeviation: 12 }, systemsThinking: { mean: 64, standardDeviation: 12 } },
  11: { scientificReasoning: { mean: 65, standardDeviation: 11 }, quantitativeReasoning: { mean: 64, standardDeviation: 12 }, computationalThinking: { mean: 64, standardDeviation: 12 }, engineeringDecisions: { mean: 65, standardDeviation: 11 }, systemsThinking: { mean: 66, standardDeviation: 11 } },
  12: { scientificReasoning: { mean: 67, standardDeviation: 11 }, quantitativeReasoning: { mean: 66, standardDeviation: 11 }, computationalThinking: { mean: 66, standardDeviation: 11 }, engineeringDecisions: { mean: 67, standardDeviation: 11 }, systemsThinking: { mean: 68, standardDeviation: 11 } },
};

export function getNorm(classLevel: number, competency: Competency): Norm {
  const norm = provisionalNorms[classLevel]?.[competency];
  if (!norm || !COMPETENCIES.includes(competency)) {
    throw new Error(`No provisional norm is available for class ${classLevel} and ${competency}.`);
  }
  return norm;
}
