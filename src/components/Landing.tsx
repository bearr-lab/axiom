interface LandingProps {
  onEnter(): void;
}

import { BorderBeam } from './ui/border-beam';

const features = [
  {
    label: 'Offline-First Architecture',
    desc: 'Works entirely in your browser after the first load. No internet connection is required during the assessment, ensuring uninterrupted focus.',
    icon: '⬡',
  },
  {
    label: 'Private by Design',
    desc: 'Zero data leaves your device. We use no accounts, no telemetry, and no backend. Your progress and results are yours alone.',
    icon: '⬡',
  },
  {
    label: 'Instant Projected Benchmark',
    desc: 'Get an immediate, projected competency benchmark across 5 STEAM domains the moment you lock your final decision.',
    icon: '⬡',
  },
];

const steps = [
  {
    num: '01',
    title: 'Initialize Profile',
    desc: 'Enter a local name and select your class level (3–12). No email or password required.'
  },
  {
    num: '02',
    title: 'Solve Scenarios',
    desc: 'Navigate 11 linked fictional scenarios, making critical engineering and scientific decisions.'
  },
  {
    num: '03',
    title: 'Review Signal',
    desc: 'Analyze your benchmark against a provisional reference distribution based on your class level.'
  }
]

const stats = [
  { value: '5', label: 'STEAM domains' },
  { value: '11', label: 'Scenario questions' },
  { value: '100%', label: 'Local & private' },
  { value: '3–12', label: 'Class levels' },
];

export function Landing({ onEnter }: LandingProps) {
  return (
    <main
      className="flex flex-col w-full relative"
      data-testid="landing-shell"
    >
      {/* Background glow top */}
      <div className="absolute top-0 left-1/2 w-[80vw] h-[60vw] bg-primary/10 blur-[150px] -z-10 pointer-events-none -translate-x-1/2 -translate-y-1/2 animate-scan" />

      {/* ── 1. Hero Section ── */}
      <section className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-16 sm:py-20 max-w-5xl mx-auto text-center w-full">
        <p className="text-primary font-bold tracking-[0.2em] uppercase text-xs sm:text-sm mb-6 animate-fade-in">
          STEAM Competency Assessment
        </p>

        <h1 className="font-heading font-extrabold tracking-tighter leading-[1.05] text-[clamp(2.5rem,4vw,3.5rem)] mb-6 animate-scale-in">
          Know where you<br />
          <span className="text-primary">actually stand.</span>
        </h1>

        <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-10 animate-fade-in [animation-delay:200ms] fill-mode-both">
          AXIOM is a private, offline benchmark that maps your thinking across five STEAM domains using linked fictional system scenarios.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 animate-fade-in [animation-delay:400ms] fill-mode-both">
          <button
            onClick={onEnter}
            className="group relative inline-flex items-center gap-3 bg-primary text-primary-foreground font-bold text-base px-8 h-12 shadow-[0_0_30px_rgba(var(--primary),0.35)] hover:shadow-[0_0_50px_rgba(var(--primary),0.6)] transition-all overflow-hidden"
            data-testid="landing-cta"
          >
            <BorderBeam size={80} duration={8} colorFrom="var(--color-background)" colorTo="var(--color-primary-foreground)" />
            <span className="relative z-10 flex items-center gap-2">
              Start Your Benchmark
              <span aria-hidden="true" className="group-hover:translate-x-2 transition-transform">→</span>
            </span>
          </button>
        </div>
        <p className="text-xs text-muted-foreground mt-4">Takes ~5 minutes · no login required</p>
      </section>

      {/* ── 2. Stat Band ── */}
      <section className="w-full border-y border-border bg-background/50 backdrop-blur-md relative z-10">
        <div className="max-w-7xl mx-auto flex flex-wrap divide-x divide-border">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center p-4 sm:p-6 flex-1 min-w-37.5"
            >
              <span className="font-heading font-extrabold text-2xl sm:text-3xl text-foreground leading-none mb-1.5">{stat.value}</span>
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.15em] text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. How it Works ── */}
      <section className="py-16 sm:py-24 px-4 max-w-7xl mx-auto w-full">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="font-heading font-extrabold text-2xl sm:text-4xl tracking-tight mb-3">Execution Protocol</h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">A streamlined three-step process to generate your provisional learning signal.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-5 left-[15%] right-[15%] h-px bg-border" />
          
          {steps.map((step, i) => (
            <div key={step.num} className="group relative z-10 flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300">
              <div className="w-10 h-10 bg-background border border-primary text-primary flex items-center justify-center font-heading font-bold text-lg mb-5 shadow-[0_0_15px_rgba(var(--primary),0.2)] group-hover:bg-primary/10 transition-colors duration-300">
                {step.num}
              </div>
              <h3 className="font-heading font-bold text-lg mb-2">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. Features Grid ── */}
      <section className="py-16 sm:py-24 px-4 bg-white/3 border-t border-border">
        <div className="max-w-7xl mx-auto w-full">
          <div className="mb-12 sm:mb-16">
            <h2 className="font-heading font-extrabold text-2xl sm:text-4xl tracking-tight mb-3">Uncompromising Architecture</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div
                key={f.label}
                className="group border border-border bg-background p-6 sm:p-8 hover:border-primary/50 transition-all duration-300 shadow-xl hover:shadow-[0_0_30px_rgba(var(--primary),0.1)] hover:-translate-y-1 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <div className="text-primary text-xl mb-5 opacity-80 group-hover:scale-110 transition-transform duration-300 origin-left">{f.icon}</div>
                <h3 className="font-heading font-bold text-base uppercase tracking-wider text-foreground mb-3">
                  {f.label}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* Privacy callout full width */}
          <div className="mt-6 border border-primary/20 bg-primary/5 p-5 flex flex-col sm:flex-row items-start sm:items-center gap-5 shadow-2xl">
            <div className="w-10 h-10 bg-primary/20 flex items-center justify-center text-primary shrink-0">
              ⬡
            </div>
            <div>
              <h4 className="font-heading font-bold text-base mb-1 text-foreground">Strict Data Containment</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Progress is saved directly to <code className="text-primary font-mono text-[11px] px-1 bg-primary/10">localStorage</code>. There is no database, no analytics, and no tracking. You are entirely invisible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Final CTA Footer ── */}
      <footer className="py-20 sm:py-24 px-4 text-center border-t border-border relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[50vw] h-[50vw] bg-ring/10 blur-[150px] -z-10 pointer-events-none translate-x-1/3 translate-y-1/3" />
        
        <h2 className="font-heading font-extrabold text-3xl sm:text-4xl tracking-tight mb-6">Ready to calibrate?</h2>
        <button
          onClick={onEnter}
          className="group relative inline-flex items-center gap-3 bg-primary text-primary-foreground font-bold text-base px-8 h-12 shadow-[0_0_30px_rgba(var(--primary),0.35)] hover:shadow-[0_0_50px_rgba(var(--primary),0.6)] transition-all overflow-hidden"
        >
          <BorderBeam size={80} duration={8} colorFrom="var(--color-background)" colorTo="var(--color-primary-foreground)" />
          <span className="relative z-10 flex items-center gap-2">
            Initialize Session
            <span aria-hidden="true" className="group-hover:translate-x-2 transition-transform">→</span>
          </span>
        </button>
      </footer>

    </main>
  );
}
