import { COMPETENCIES, type ResultSnapshot } from '../domain/types';
import { CompetencyChart } from './CompetencyChart';
import { ResetDialog } from './ResetDialog';
import { Button } from './ui/button';

const labels = { scientificReasoning: 'Scientific reasoning', quantitativeReasoning: 'Quantitative reasoning', computationalThinking: 'Computational thinking', engineeringDecisions: 'Engineering decisions', systemsThinking: 'Systems thinking' };

export function Dashboard({ snapshot, onNew, onErase }: { snapshot: ResultSnapshot; onNew(): void; onErase(): void }) {
  const lowest = COMPETENCIES.reduce((selected, competency) => snapshot.competencies[competency].score < snapshot.competencies[selected].score ? competency : selected, COMPETENCIES[0]);
  
  return (
    <main className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 p-4 sm:p-8 md:p-12 pb-24 animate-in fade-in duration-700">
      <section className="col-span-1 flex flex-col justify-center p-8 sm:p-12 bg-card/40 backdrop-blur-md border border-border rounded-3xl shadow-xl hover:shadow-primary/5 transition-all animate-in slide-in-from-left-4 duration-500">
        <p className="text-primary font-bold tracking-widest uppercase text-xs mb-4">Projected benchmark</p>
        <h1 className="text-7xl sm:text-9xl font-extrabold tracking-tighter mb-4 bg-clip-text text-transparent bg-linear-to-br from-foreground to-foreground/50">{snapshot.overallScore}</h1>
        <p className="text-lg sm:text-xl font-medium mb-8">Projected percentile band: <strong className="text-primary">{snapshot.percentile}th</strong></p>
        <p className="text-xs text-muted-foreground leading-relaxed">Provisional reference distribution · Class {snapshot.classLevel} · not a verified global rank</p>
      </section>

      <CompetencyChart snapshot={snapshot} />

      <section className="col-span-1 lg:col-span-1 p-6 sm:p-8 bg-card/40 backdrop-blur-md border border-border rounded-3xl shadow-lg hover:shadow-primary/5 transition-all animate-in slide-in-from-bottom-4 duration-500 delay-200 fill-mode-both">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-primary" /> Decision evidence</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead>
              <tr className="border-b border-border/50 text-muted-foreground">
                <th className="pb-3 font-semibold uppercase tracking-wider text-xs">Mission</th>
                <th className="pb-3 font-semibold uppercase tracking-wider text-xs">Selected intervention</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {snapshot.responses.map((response) => (
                <tr key={response.itemId} className="hover:bg-accent/30 transition-colors">
                  <td className="py-4 pr-4 font-medium capitalize text-foreground/80">{response.missionId.replace('-', ' ')}</td>
                  <td className="py-4 text-foreground/90">{response.optionLabel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="col-span-1 lg:col-span-1 flex flex-col justify-center p-6 sm:p-8 bg-linear-to-br from-card/60 to-primary/5 backdrop-blur-md border border-border rounded-3xl shadow-lg hover:border-primary/30 transition-all animate-in slide-in-from-bottom-4 duration-500 delay-300 fill-mode-both">
        <p className="text-primary font-bold tracking-widest uppercase text-xs mb-3">Next growth signal</p>
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Strengthen {labels[lowest]}</h2>
        <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">Revisit a system decision by naming the inputs, constraints, and downstream effects before choosing an intervention.</p>
      </section>

      <section className="col-span-1 lg:col-span-2 flex flex-col sm:flex-row items-center gap-4 mt-6 animate-in fade-in duration-500 delay-500 fill-mode-both">
        <Button onClick={onNew} size="lg" className="w-full sm:w-auto text-base h-12 px-8">Start a new assessment</Button>
        <div className="w-full sm:w-auto">
          <ResetDialog onConfirm={onErase} />
        </div>
      </section>
    </main>
  );
}
