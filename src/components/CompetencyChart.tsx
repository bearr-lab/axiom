import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { COMPETENCIES, type ResultSnapshot } from '../domain/types';

const labels = { scientificReasoning: 'Science', quantitativeReasoning: 'Quant', computationalThinking: 'Computing', engineeringDecisions: 'Engineering', systemsThinking: 'Systems' };

export function CompetencyChart({ snapshot }: { snapshot: ResultSnapshot }) {
  const data = COMPETENCIES.map((competency) => ({ name: labels[competency], score: snapshot.competencies[competency].score }));
  return <section className="chart-panel" aria-label="Competency projected scores"><h2>Competency signal map</h2><div className="chart-frame"><ResponsiveContainer width="100%" height={240}><BarChart data={data}><CartesianGrid stroke="#29414b" vertical={false} /><XAxis dataKey="name" stroke="#9cb3bb" /><YAxis domain={[100, 900]} stroke="#9cb3bb" /><Tooltip /><Bar dataKey="score" fill="#67e8f9" radius={[3, 3, 0, 0]} /></BarChart></ResponsiveContainer></div><ul className="sr-values">{data.map((point) => <li key={point.name}>{point.name}: {point.score}</li>)}</ul></section>;
}
