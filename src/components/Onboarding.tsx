import { useState, type FormEvent } from 'react';
import { useAxiomSession } from '../context/AxiomSessionContext';
import { Button } from './ui/button';

export function Onboarding() {
  const { setProfile } = useAxiomSession();
  const [name, setName] = useState('');
  const [classLevel, setClassLevel] = useState('8');
  const begin = (event: FormEvent) => { event.preventDefault(); setProfile({ name: name.trim() || 'Learner', classLevel: Number(classLevel) }); };

  return (
    <main className="flex flex-col flex-1 w-full h-full items-center justify-center p-4 sm:p-6 overflow-hidden relative" data-testid="onboarding-shell">
      {/* Background glow effects */}
      <div className="absolute top-0 left-0 w-[50vw] h-[50vw] bg-primary/15 blur-[120px] -z-10 pointer-events-none translate-x-[-20%] translate-y-[-20%]" />
      <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] bg-ring/15 blur-[100px] -z-10 pointer-events-none translate-x-[20%] translate-y-[20%]" />

      {/* Centered content card */}
      <div className="w-full max-w-120 flex flex-col gap-5 z-10">
        {/* Header text */}
        <div className="text-center sm:text-left animate-in slide-in-from-bottom-2 duration-700 delay-100 fill-mode-both">
          <p className="text-primary font-bold tracking-widest uppercase text-xs mb-2">
            Interactive STEAM Missions
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter leading-[1.05] mb-3 animate-in slide-in-from-bottom-2 duration-700 delay-200 fill-mode-both">
            AXIOM
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed animate-in slide-in-from-bottom-2 duration-700 delay-300 fill-mode-both">
            Challenge how you think, build, and solve. Your progress stays securely on your device.
          </p>
        </div>

        {/* Form card */}
        <form
          onSubmit={begin}
          className="flex flex-col gap-4 animate-in slide-in-from-bottom-2 duration-700 delay-500 fill-mode-both bg-white/5 backdrop-blur-2xl p-5 sm:p-6 border border-border shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent pointer-events-none" />

          <label className="flex flex-col gap-1.5 text-left text-sm font-medium text-foreground relative z-10">
            Your name
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="What should we call you?"
              className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none placeholder:text-white/40 text-sm"
            />
          </label>

          <label className="flex flex-col gap-1.5 text-left text-sm font-medium text-foreground relative z-10">
            Grade Level
            <select
              value={classLevel}
              onChange={(event) => setClassLevel(event.target.value)}
              className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none appearance-none text-sm"
            >
              {Array.from({ length: 10 }, (_, index) => index + 3).map((level) => (
                <option key={level} value={level}>Class {level}</option>
              ))}
            </select>
          </label>

          <Button
            data-testid="onboarding-submit"
            type="submit"
            size="lg"
            className="w-full mt-2 group text-sm h-11 px-6 shadow-[0_0_20px_rgba(var(--primary),0.3)] hover:shadow-[0_0_30px_rgba(var(--primary),0.5)] transition-all z-10"
          >
            Launch Calibration
            <span aria-hidden="true" className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </Button>
        </form>

        <p className="text-[11px] text-muted-foreground text-center animate-in fade-in duration-1000 delay-700 fill-mode-both" data-testid="onboarding-disclosure">
          One local learner profile · no account · provisional benchmark
        </p>
      </div>
    </main>
  );
}
