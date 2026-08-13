import { useState, type FormEvent } from 'react';
import { useAxiomSession } from '../context/AxiomSessionContext';
import { Button } from './ui/button';

export function Onboarding() {
  const { setProfile } = useAxiomSession();
  const [name, setName] = useState('');
  const [classLevel, setClassLevel] = useState('8');
  const begin = (event: FormEvent) => { event.preventDefault(); setProfile({ name: name.trim() || 'Learner', classLevel: Number(classLevel) }); };
  return <main className="onboarding"><p className="eyebrow">Learning signal</p><h1>AXIOM</h1><p className="lede">Applied systems-thinking benchmarks, held privately in this browser.</p><form onSubmit={begin} className="profile-form"><label>Learner name<input value={name} onChange={(event) => setName(event.target.value)} placeholder="Your first name" /></label><label>Class<select value={classLevel} onChange={(event) => setClassLevel(event.target.value)}>{Array.from({ length: 10 }, (_, index) => index + 3).map((level) => <option key={level} value={level}>Class {level}</option>)}</select></label><Button type="submit">Begin calibration <span aria-hidden="true">→</span></Button></form><p className="fine-print">One local learner profile · no account · provisional benchmark</p></main>;
}
