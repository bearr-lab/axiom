import { useState, type FormEvent } from 'react';
import { useAxiomSession } from '../context/AxiomSessionContext';
import { Button } from './ui/button';

export function Onboarding() {
  const { setProfile } = useAxiomSession();
  const [name, setName] = useState('');
  const [classLevel, setClassLevel] = useState('8');
  const begin = (event: FormEvent) => { event.preventDefault(); setProfile({ name: name.trim() || 'Learner', classLevel: Number(classLevel) }); };

  return (
    <main className="flex flex-col flex-1 items-center justify-center p-6 sm:p-12 animate-in fade-in duration-700" data-testid="onboarding-shell">
      <div className="w-full max-w-lg flex flex-col gap-8 text-center sm:text-left">
        <div>
          <p className="text-primary font-bold tracking-widest uppercase text-xs sm:text-sm mb-4 animate-in slide-in-from-bottom-2 duration-700 delay-100 fill-mode-both">Learning signal</p>
          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-6 animate-in slide-in-from-bottom-2 duration-700 delay-200 fill-mode-both">AXIOM</h1>
          <p className="text-muted-foreground text-lg sm:text-xl max-w-md mx-auto sm:mx-0 animate-in slide-in-from-bottom-2 duration-700 delay-300 fill-mode-both">Applied systems-thinking benchmarks, held privately in this browser.</p>
        </div>

        <form onSubmit={begin} className="flex flex-col gap-6 animate-in slide-in-from-bottom-2 duration-700 delay-500 fill-mode-both bg-card/40 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-border shadow-2xl">
          <label className="flex flex-col gap-2 text-left text-sm font-medium text-foreground">
            Learner name
            <input 
              value={name} 
              onChange={(event) => setName(event.target.value)} 
              placeholder="Your first name" 
              className="px-4 py-3 bg-background border border-input rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
            />
          </label>
          <label className="flex flex-col gap-2 text-left text-sm font-medium text-foreground">
            Class
            <select 
              value={classLevel} 
              onChange={(event) => setClassLevel(event.target.value)}
              className="px-4 py-3 bg-background border border-input rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none appearance-none"
            >
              {Array.from({ length: 10 }, (_, index) => index + 3).map((level) => (
                <option key={level} value={level}>Class {level}</option>
              ))}
            </select>
          </label>
          <Button data-testid="onboarding-submit" type="submit" size="lg" className="w-full sm:w-auto self-start mt-2 group text-base h-12">
            Begin calibration 
            <span aria-hidden="true" className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </Button>
        </form>

        <p className="text-xs text-muted-foreground mt-4 animate-in fade-in duration-1000 delay-700 fill-mode-both" data-testid="onboarding-disclosure">
          One local learner profile · no account · provisional benchmark
        </p>
      </div>
    </main>
  );
}
