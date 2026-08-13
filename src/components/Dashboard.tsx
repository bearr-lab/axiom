import { COMPETENCIES, type ResultSnapshot } from '../domain/types';
import { CompetencyChart } from './CompetencyChart';
import { ResetDialog } from './ResetDialog';
import { Button } from './ui/button';

const labels = { scientificReasoning: 'Scientific reasoning', quantitativeReasoning: 'Quantitative reasoning', computationalThinking: 'Computational thinking', engineeringDecisions: 'Engineering decisions', systemsThinking: 'Systems thinking' };

export function Dashboard({ snapshot, onNew, onErase }: { snapshot: ResultSnapshot; onNew(): void; onErase(): void }) {
  const lowest = COMPETENCIES.reduce((selected, competency) => snapshot.competencies[competency].score < snapshot.competencies[selected].score ? competency : selected, COMPETENCIES[0]);
  return <main className="dashboard"><section className="projection-hero"><p className="eyebrow">Projected benchmark</p><h1>{snapshot.overallScore}</h1><p>Projected percentile band: {snapshot.percentile}th</p><p className="disclosure">Provisional reference distribution · Class {snapshot.classLevel} · not a verified global rank</p></section><CompetencyChart snapshot={snapshot} /><section className="evidence-panel"><h2>Decision evidence</h2><table><thead><tr><th>Mission</th><th>Selected intervention</th></tr></thead><tbody>{snapshot.responses.map((response) => <tr key={response.itemId}><td>{response.missionId.replace('-', ' ')}</td><td>{response.optionLabel}</td></tr>)}</tbody></table></section><section className="growth-panel"><p className="eyebrow">Next growth signal</p><h2>Strengthen {labels[lowest]}</h2><p>Revisit a system decision by naming the inputs, constraints, and downstream effects before choosing an intervention.</p></section><section className="dashboard-actions"><Button onClick={onNew}>Start a new assessment</Button><ResetDialog onConfirm={onErase} /></section></main>;
}
