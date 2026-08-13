import { useEffect, useState } from 'react';
import { getNextItem } from '../domain/assessment';
import { useAxiomSession } from '../context/AxiomSessionContext';
import { Button } from './ui/button';

export function Assessment() {
  const { session, answer, complete } = useAxiomSession();
  const item = session.plan ? getNextItem(session.plan, Object.keys(session.responses)) : null;
  const [selectedOptionId, setSelectedOptionId] = useState<string>();
  useEffect(() => setSelectedOptionId(undefined), [item?.id]);

  if (!item) {
    return (
      <main className="flex flex-col flex-1 items-center justify-center p-6 text-center animate-in zoom-in-95 duration-500">
        <div className="bg-card/40 backdrop-blur-md p-10 rounded-3xl border border-border max-w-lg shadow-2xl flex flex-col items-center">
          <p className="text-primary font-bold tracking-widest uppercase text-xs sm:text-sm mb-4">Assessment complete</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">Evidence captured</h1>
          <p className="text-muted-foreground mb-8">Generate your projected benchmark from the decisions you have locked.</p>
          <Button onClick={complete} size="lg" className="group h-12 px-8 text-base">
            Generate benchmark 
            <span className="ml-2 group-hover:translate-x-1 transition-transform" aria-hidden="true">→</span>
          </Button>
        </div>
      </main>
    );
  }

  const selected = item.options.find((option) => option.id === selectedOptionId);
  const lockedCount = Object.keys(session.responses).length;
  const missionList = session.plan?.missionIds ?? [];
  const lock = () => { if (selected) answer({ itemId: item.id, missionId: item.missionId, prompt: item.prompt, optionId: selected.id, optionLabel: selected.label, evidence: [...selected.evidence] }); };

  return (
    <main className="flex flex-col lg:flex-row flex-1" data-testid="assessment-shell">
      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex flex-col w-64 xl:w-72 border-r border-sidebar-border bg-sidebar/50 backdrop-blur-sm p-6" aria-label="Assessment sequence">
        <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-6">Assessment sequence</p>
        <div className="flex flex-col gap-2">
          <div className={`p-4 rounded-xl border-l-4 transition-all ${item.missionId === 'calibration' ? 'border-sidebar-primary bg-sidebar-accent/50 shadow-sm' : 'border-border'}`}>
            <span className="text-xs uppercase text-muted-foreground">Active</span>
            <strong className="block mt-1 text-sm">{item.missionTitle}</strong>
          </div>
          {missionList.map((missionId, index) => (
            <div key={missionId} className={`p-4 rounded-xl border-l-4 transition-all ${item.missionId === missionId ? 'border-sidebar-primary bg-sidebar-accent/50 shadow-sm' : 'border-border'}`}>
              <span className="text-xs uppercase text-muted-foreground">Mission {index + 1}</span>
              <strong className="block mt-1 text-sm capitalize">{missionId.replace('-', ' ')}</strong>
            </div>
          ))}
        </div>
        <div className="mt-auto pt-8">
          <span className="text-xs font-bold tracking-widest uppercase text-muted-foreground">Signal captured</span>
          <div className="h-1.5 w-full bg-sidebar-accent rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-sidebar-primary transition-all duration-1000 ease-out" style={{ width: `${Math.min(100, lockedCount * 9)}%` }} />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <section className="flex-1 flex flex-col relative pb-24">
        {/* Mobile Progress Bar (visible only on small screens) */}
        <div className="lg:hidden w-full h-1 bg-accent">
          <div className="h-full bg-primary transition-all duration-1000" style={{ width: `${Math.min(100, lockedCount * 9)}%` }} />
        </div>
        
        <div className="p-3 sm:p-6 md:p-10 max-w-4xl mx-auto w-full flex-1 flex flex-col">
          <div className="flex flex-col gap-3 mb-6 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="flex items-center flex-wrap gap-2">
              <p className="text-primary font-bold tracking-widest uppercase text-[10px] sm:text-xs">
                {item.missionTitle} <span className="opacity-50 mx-1">·</span> Class {session.profile?.classLevel}
              </p>
              <span className="text-[10px] font-mono bg-accent text-accent-foreground px-2 py-0.5 rounded-full whitespace-nowrap">Untimed</span>
            </div>
            <h1 className="text-xl sm:text-3xl md:text-4xl font-semibold leading-tight text-foreground/95">{item.prompt}</h1>
          </div>

          <p className="p-3 sm:p-5 text-sm sm:text-base bg-primary/5 border-l-2 border-primary rounded-r-xl text-card-foreground leading-relaxed mb-6 animate-in fade-in duration-700 delay-150 fill-mode-both">
            <strong className="text-primary">Context:</strong> {item.context}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4" aria-label="Response options">
            {item.options.map((option, index) => {
              const isSelected = selectedOptionId === option.id;
              return (
                <button 
                  key={option.id} 
                  type="button" 
                  aria-pressed={isSelected}
                  onClick={() => setSelectedOptionId(option.id)}
                  className={`flex items-start gap-4 p-5 text-left rounded-xl transition-all duration-200 border-2 hover:-translate-y-1 hover:shadow-lg animate-in fade-in slide-in-from-bottom-4 fill-mode-both delay-${200 + index * 100}
                    ${isSelected 
                      ? 'border-primary bg-primary/10 shadow-[0_0_15px_rgba(var(--primary),0.2)]' 
                      : 'border-border bg-card/20 hover:border-primary/50'}`}
                >
                  <span className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold shrink-0 transition-colors
                    ${isSelected ? 'bg-primary text-primary-foreground' : 'bg-accent text-foreground'}`}>
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="text-sm sm:text-base text-foreground mt-1 leading-snug">{option.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Bar */}
        <footer className="fixed bottom-0 left-0 right-0 lg:left-64 xl:left-72 z-10 flex items-center justify-between p-3 sm:p-4 sm:px-8 border-t border-border bg-background/90 backdrop-blur-xl shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
          <span className="text-sm sm:text-base text-muted-foreground">
            Response <strong className="text-foreground">{lockedCount + 1}</strong>
            <span className="hidden sm:inline text-xs ml-2 opacity-60">· saved when locked</span>
          </span>
          <Button disabled={!selected} onClick={lock} size="lg" className="group h-10 sm:h-12 px-4 sm:px-8 ml-2">
            Lock response 
            <span className="ml-1 sm:ml-2 group-hover:translate-x-1 transition-transform" aria-hidden="true">→</span>
          </Button>
        </footer>
      </section>
    </main>
  );
}
