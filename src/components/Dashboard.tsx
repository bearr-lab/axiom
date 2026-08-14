import { COMPETENCIES, type ResultSnapshot } from '../domain/types';
import { CompetencyChart } from './CompetencyChart';
import { ResetDialog } from './ResetDialog';
import { Button } from './ui/button';

const labels = { scientificReasoning: 'Scientific reasoning', quantitativeReasoning: 'Quantitative reasoning', computationalThinking: 'Computational thinking', engineeringDecisions: 'Engineering decisions', systemsThinking: 'Systems thinking' };

export function Dashboard({ snapshot, onNew, onErase }: { snapshot: ResultSnapshot; onNew(): void; onErase(): void }) {
  const lowest = COMPETENCIES.reduce((selected, competency) => snapshot.competencies[competency].score < snapshot.competencies[selected].score ? competency : selected, COMPETENCIES[0]);
  
  return (
    <main className="w-full max-w-7xl mx-auto h-full flex flex-col gap-3 p-3 sm:p-5 md:p-8 animate-in fade-in duration-700 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 flex-1 min-h-0">
        <section className="group col-span-1 flex flex-col justify-center p-4 sm:p-6 bg-card/40 backdrop-blur-3xl border border-white/5 shadow-2xl hover:shadow-primary/15 hover:border-primary/30 hover:-translate-y-1 transition-all duration-500 animate-in slide-in-from-left-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-transparent pointer-events-none group-hover:from-primary/20 transition-colors duration-500" />
        <p className="text-primary font-bold tracking-widest uppercase text-xs mb-4 relative z-10">Projected benchmark</p>
        <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tighter mb-2 bg-clip-text text-transparent bg-linear-to-br from-foreground to-foreground/40 relative z-10 leading-none">
          {snapshot.overallScore}
        </h1>
        <p className="text-base font-medium mb-3 relative z-10">Projected percentile band: <strong className="text-primary">{snapshot.percentile}th</strong></p>
        <p className="text-xs text-muted-foreground leading-relaxed relative z-10">Provisional reference distribution · Class {snapshot.classLevel} · not a verified global rank</p>
      </section>

      <CompetencyChart snapshot={snapshot} />

      <section className="group col-span-1 lg:col-span-1 flex flex-col min-h-0 p-4 sm:p-5 bg-card/40 backdrop-blur-2xl border border-white/5 shadow-xl hover:shadow-primary/10 hover:border-primary/30 hover:-translate-y-1 transition-all duration-500 animate-in slide-in-from-bottom-4 delay-200 fill-mode-both">
        <h2 className="font-heading text-base sm:text-lg font-bold mb-3 flex items-center gap-2 shrink-0"><span className="w-2 h-2 bg-primary shadow-md shadow-primary/50 group-hover:shadow-lg group-hover:shadow-primary/80 transition-shadow duration-500" /> Decision evidence</h2>
        <div className="overflow-auto flex-1 min-h-0 pr-2">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border/50 text-muted-foreground">
                <th className="pb-4 font-semibold uppercase tracking-wider text-xs">Mission</th>
                <th className="pb-4 font-semibold uppercase tracking-wider text-xs">Selected intervention</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {snapshot.responses.map((response) => (
                <tr key={response.itemId} className="hover:bg-accent/30 transition-colors group">
                  <td className="py-2.5 pr-4 font-medium capitalize text-foreground/80 group-hover:text-primary transition-colors text-sm">{response.missionId.replace('-', ' ')}</td>
                  <td className="py-2.5 text-foreground/90 text-sm">{response.optionLabel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="group col-span-1 lg:col-span-1 flex flex-col justify-center p-4 sm:p-5 bg-linear-to-br from-card/80 to-primary/10 backdrop-blur-2xl border border-white/5 shadow-xl hover:shadow-[0_0_30px_rgba(var(--primary),0.15)] hover:border-primary/40 hover:-translate-y-1 transition-all duration-500 animate-in slide-in-from-bottom-4 delay-300 fill-mode-both relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl group-hover:bg-primary/30 transition-colors duration-500" />
        <p className="text-primary font-bold tracking-widest uppercase text-xs mb-3 relative z-10">Next growth signal</p>
        <h2 className="font-heading text-xl sm:text-2xl font-extrabold mb-2 relative z-10">Strengthen {labels[lowest]}</h2>
        <p className="text-muted-foreground leading-relaxed text-sm relative z-10">Revisit a system decision by naming the inputs, constraints, and downstream effects before choosing an intervention.</p>
      </section>

      </div>
      <section className="shrink-0 flex flex-col sm:flex-row items-center justify-end gap-3 mt-1 animate-in fade-in duration-500 delay-500 fill-mode-both">
        <div className="w-full sm:w-auto">
          <ResetDialog onConfirm={onErase} />
        </div>
        <Button onClick={onNew} size="lg" className="w-full sm:w-auto text-base h-12 px-8">Start a new assessment</Button>
      </section>
    </main>
  );
}
