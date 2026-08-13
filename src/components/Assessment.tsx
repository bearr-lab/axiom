import { useEffect, useState } from 'react';
import { getNextItem } from '../domain/assessment';
import { useAxiomSession } from '../context/AxiomSessionContext';
import { Button } from './ui/button';

export function Assessment() {
  const { session, answer, complete } = useAxiomSession();
  const item = session.plan ? getNextItem(session.plan, Object.keys(session.responses)) : null;
  const [selectedOptionId, setSelectedOptionId] = useState<string>();
  useEffect(() => setSelectedOptionId(undefined), [item?.id]);

  if (!item) return <main className="completion-gate"><p className="eyebrow">Assessment complete</p><h1>Evidence captured</h1><p>Generate your projected benchmark from the decisions you have locked.</p><Button onClick={complete}>Generate benchmark →</Button></main>;
  const selected = item.options.find((option) => option.id === selectedOptionId);
  const lockedCount = Object.keys(session.responses).length;
  const missionList = session.plan?.missionIds ?? [];
  const lock = () => { if (selected) answer({ itemId: item.id, missionId: item.missionId, prompt: item.prompt, optionId: selected.id, optionLabel: selected.label, evidence: [...selected.evidence] }); };

  return <main className="assessment-shell" data-testid="assessment-shell"><aside className="mission-rail" aria-label="Assessment sequence"><p className="rail-label">Assessment sequence</p><div className={item.missionId === 'calibration' ? 'mission active' : 'mission'}><span>Active</span><strong>{item.missionTitle}</strong></div>{missionList.map((missionId, index) => <div key={missionId} className={item.missionId === missionId ? 'mission active' : 'mission'}><span>Mission {index + 1}</span><strong>{missionId.replace('-', ' ')}</strong></div>)}<div className="progress-line"><span>Signal captured</span><i style={{ width: `${Math.min(100, lockedCount * 9)}%` }} /></div></aside><section className="assessment-content"><div className="question-header"><div><p className="eyebrow">{item.missionTitle} · Class {session.profile?.classLevel}</p><h1>{item.prompt}</h1></div><span className="pace">Untimed</span></div><p className="scenario-context"><strong>Context:</strong> {item.context}</p><div className="answer-grid" aria-label="Response options">{item.options.map((option, index) => <button key={option.id} type="button" aria-pressed={selectedOptionId === option.id} className={`answer-option${selectedOptionId === option.id ? ' selected' : ''}`} onClick={() => setSelectedOptionId(option.id)}><span>{String.fromCharCode(65 + index)}</span>{option.label}</button>)}</div><footer className="action-bar"><span>Response {lockedCount + 1} · saved when locked</span><Button disabled={!selected} onClick={lock}>Lock response →</Button></footer></section></main>;
}
