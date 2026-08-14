import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { COMPETENCIES, type ResultSnapshot } from '../domain/types';

const labels = { scientificReasoning: 'Science', quantitativeReasoning: 'Quant', computationalThinking: 'Computing', engineeringDecisions: 'Engineering', systemsThinking: 'Systems' };

export function CompetencyChart({ snapshot }: { snapshot: ResultSnapshot }) {
  const data = COMPETENCIES.map((competency) => ({ name: labels[competency], score: snapshot.competencies[competency].score }));
  
  return (
    <section className="col-span-1 flex flex-col min-h-0 p-6 sm:p-8 bg-card/40 backdrop-blur-md border border-border shadow-lg hover:shadow-primary/5 transition-all animate-in slide-in-from-right-4 duration-500 delay-100 fill-mode-both" aria-label="Competency projected scores">
      <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
        <span className="w-2 h-2 bg-primary" /> 
        Competency signal map
      </h2>
      <div className="flex-1 min-h-0 overflow-auto w-full max-w-sm mx-auto mb-6 relative">
        <ResponsiveContainer width="100%" height="100%" minHeight={200}>
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid stroke="var(--color-border)" strokeOpacity={0.4} vertical={false} />
            <XAxis dataKey="name" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis domain={[100, 900]} stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip 
              cursor={{ fill: 'var(--color-accent)' }}
              contentStyle={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)', borderRadius: '0.75rem', color: 'var(--color-foreground)' }} 
              itemStyle={{ color: 'var(--color-primary)', fontWeight: 'bold' }}
            />
            <Bar dataKey="score" fill="#a855f7" radius={[6, 6, 0, 0]} maxBarSize={60} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <ul className="mt-6 flex flex-wrap gap-4 text-xs text-muted-foreground justify-center">
        {data.map((point) => (
          <li key={point.name} className="flex items-center gap-1.5 bg-background/50 px-3 py-1.5 rounded-none border border-border">
            <span className="font-semibold text-foreground/80">{point.name}</span>
            <span className="text-primary font-mono">{point.score}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
