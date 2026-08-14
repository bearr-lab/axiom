import { useEffect, useState, useCallback } from 'react';
import { getNextItem } from '../domain/assessment';
import { useAxiomSession } from '../context/AxiomSessionContext';
import { Button } from './ui/button';

export function Assessment() {
  const { session, answer, complete, undo } = useAxiomSession();
  const item = session.plan ? getNextItem(session.plan, Object.keys(session.responses)) : null;
  const [selectedOptionId, setSelectedOptionId] = useState<string>();
  useEffect(() => setSelectedOptionId(undefined), [item?.id]);

  const selected = item?.options.find((option) => option.id === selectedOptionId);
  const lockedCount = Object.keys(session.responses).length;
  const missionList = session.plan?.missionIds ?? [];
  
  const lock = useCallback(() => { 
    if (selected && item) {
      answer({ itemId: item.id, missionId: item.missionId, prompt: item.prompt, optionId: selected.id, optionLabel: selected.label, evidence: [...selected.evidence] });
    }
  }, [selected, item, answer]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.defaultPrevented ||
        e.ctrlKey ||
        e.metaKey ||
        e.altKey ||
        (e.target instanceof HTMLElement && (
          e.target.tagName === 'INPUT' ||
          e.target.tagName === 'TEXTAREA' ||
          e.target.tagName === 'BUTTON' ||
          e.target.tagName === 'SELECT' ||
          e.target.closest('[contenteditable="true"]')
        )) ||
        !item
      ) return;
      const key = e.key.toLowerCase();
      const index = ['a', 'b', 'c', 'd'].indexOf(key) !== -1 ? ['a', 'b', 'c', 'd'].indexOf(key) : ['1', '2', '3', '4'].indexOf(key);
      if (index !== -1 && item.options[index]) {
        setSelectedOptionId(item.options[index].id);
      } else if (key === 'enter' && selectedOptionId) {
        lock();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, selectedOptionId, lock]);

  if (!item) {
    return (
      <main className="flex flex-col flex-1 items-center justify-center h-[calc(100vh-4rem)] overflow-hidden p-6 text-center animate-in zoom-in-95 duration-500">
        <div className="bg-card/40 backdrop-blur-md p-10 rounded-none border border-border max-w-lg shadow-2xl flex flex-col items-center">
          <p className="text-primary font-bold tracking-widest uppercase text-xs sm:text-sm mb-3">Assessment complete</p>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">Evidence captured</h1>
          <p className="text-muted-foreground text-sm mb-6">Generate your projected benchmark from the decisions you have locked.</p>
          <Button onClick={complete} size="lg" className="group h-12 px-8 text-base">
            Generate benchmark 
            <span className="ml-2 group-hover:translate-x-1 transition-transform" aria-hidden="true">→</span>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-col lg:flex-row flex-1 w-full h-full overflow-hidden relative" data-testid="assessment-shell">
      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex flex-col w-64 xl:w-72 border-r border-sidebar-border bg-sidebar/50 backdrop-blur-sm p-6" aria-label="Assessment sequence">
        <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-6">Assessment sequence</p>
        <div className="flex flex-col gap-2">
          {item.missionId === 'calibration' && (
            <div className="relative p-4 border border-primary/20 bg-sidebar-accent/50 shadow-sm">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-primary" />
              <span className="text-xs uppercase text-muted-foreground">Active</span>
              <strong className="block mt-1 text-sm">Signal calibration</strong>
            </div>
          )}
          {missionList.map((missionId, index) => (
            <div key={missionId} className={`relative p-4 border ${item.missionId === missionId ? 'border-primary/20 bg-sidebar-accent/50 shadow-sm' : 'border-border'}`}>
              {item.missionId === missionId && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-primary" />}
              <span className="text-xs uppercase text-muted-foreground">Mission {index + 1}</span>
              <strong className="block mt-1 text-sm capitalize">{missionId.replace('-', ' ')}</strong>
            </div>
          ))}
        </div>
        <div className="mt-auto pt-8">
          <span className="text-xs font-bold tracking-widest uppercase text-muted-foreground">Signal captured</span>
          <div className="h-1.5 w-full bg-sidebar-accent mt-2 overflow-hidden">
            <div className="h-full bg-primary transition-all duration-1000 ease-out" style={{ width: `${Math.min(100, lockedCount * 9)}%` }} />
          </div>
        </div>
      </aside>

      {/* Main Content — scrolls internally */}
      <section className="flex-1 flex flex-col relative min-h-0 overflow-hidden">
        {/* Mobile Progress Bar */}
        <div className="lg:hidden w-full h-1 bg-accent">
          <div className="h-full bg-primary transition-all duration-1000" style={{ width: `${Math.min(100, lockedCount * 9)}%` }} />
        </div>
        
        <div className="p-3 sm:p-4 md:p-6 max-w-4xl mx-auto w-full flex-1 flex flex-col min-h-0 overflow-y-auto pb-20 lg:pb-24">
          <div className="flex flex-col gap-4 mb-6 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="flex items-center flex-wrap gap-3">
              <span className="text-xs font-bold tracking-widest uppercase px-3 py-1 bg-primary/20 text-primary">
                {item.missionTitle}
              </span>
              <span className="text-xs font-medium text-muted-foreground">Class {session.profile?.classLevel}</span>
            </div>
            <h1 className="font-heading text-xl sm:text-2xl font-semibold leading-[1.2] tracking-tight text-foreground/95">
              {item.prompt}
            </h1>
          </div>

          <div className="shrink-0 p-3 sm:p-4 text-sm bg-card/40 backdrop-blur-md border border-white/5 shadow-xl text-card-foreground leading-relaxed mb-5 animate-in fade-in duration-700 delay-150 fill-mode-both relative overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-tr from-primary/5 to-transparent pointer-events-none" />
            <strong className="text-primary font-heading tracking-wide uppercase text-xs block mb-2 opacity-80">Context</strong>
            <span className="relative z-10">{item.context}</span>
          </div>

          <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-3" aria-label="Response options">
            {item.options.map((option, index) => {
              const isSelected = selectedOptionId === option.id;
              const delayClass = ['delay-200', 'delay-300', 'delay-400', 'delay-500'][index] || 'delay-500';
              return (
                <label 
                  key={option.id}
                  className={`group relative flex items-start gap-5 p-5 text-left transition-all duration-300 border-2 cursor-pointer hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/5 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 animate-in fade-in slide-in-from-bottom-4 fill-mode-both ${delayClass} overflow-hidden
                    ${isSelected 
                      ? 'border-primary bg-primary/10 shadow-[0_0_30px_rgba(var(--primary),0.2)]' 
                      : 'border-border/50 bg-card/40 backdrop-blur-sm hover:border-primary/50'}`}
                >
                  {isSelected && <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-transparent pointer-events-none" />}
                  <input
                    type="radio"
                    name="assessment-option"
                    value={option.id}
                    checked={isSelected}
                    onChange={() => setSelectedOptionId(option.id)}
                    className="sr-only"
                  />
                  <span className={`flex items-center justify-center w-10 h-10 rounded-none text-base font-bold shrink-0 transition-all duration-300
                    ${isSelected 
                      ? 'bg-primary text-primary-foreground shadow-[0_0_15px_rgba(var(--primary),0.5)] scale-110' 
                      : 'bg-accent/50 text-foreground group-hover:bg-primary/20 group-hover:text-primary'}`}>
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="text-sm text-foreground mt-0.5 leading-snug font-medium relative z-10">
                    {option.label}
                  </span>
                </label>
              );
            })}
          </fieldset>
        </div>

        {/* Action Bar — absolute inside the scrolling section */}
        <footer className="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-between p-3 sm:p-4 sm:px-8 border-t border-border bg-background/90 backdrop-blur-xl shadow-[0_-8px_30px_rgba(0,0,0,0.4)] w-full">
          <span className="text-sm sm:text-base text-muted-foreground flex items-center gap-2">
            <span>Response <strong className="text-foreground">{lockedCount + 1}</strong></span>
            <span className="hidden sm:inline text-xs text-muted-foreground/80">· saved when locked</span>
          </span>
          <div className="flex items-center gap-2">
            {lockedCount > 0 && (
              <Button variant="ghost" onClick={undo} className="text-muted-foreground hover:text-foreground">
                Undo last
              </Button>
            )}
            <Button disabled={!selected} onClick={lock} size="lg" className="group h-10 sm:h-12 px-4 sm:px-8">
              Lock response 
              <span className="ml-1 sm:ml-2 group-hover:translate-x-1 transition-transform" aria-hidden="true">→</span>
            </Button>
          </div>
        </footer>
      </section>
    </main>
  );
}
