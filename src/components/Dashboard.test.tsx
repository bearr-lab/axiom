import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { calculateResult } from '../domain/scoring';
import { Dashboard } from './Dashboard';

const snapshot = calculateResult([
  ...['scientificReasoning', 'quantitativeReasoning', 'computationalThinking', 'engineeringDecisions', 'systemsThinking'].map((competency, index) => ({ itemId: `item-${index}`, missionId: 'city-mobility', prompt: 'Prompt', optionId: 'route-flex', optionLabel: 'Redirect flexible routes', evidence: [{ competency: competency as 'scientificReasoning', earnedWeight: 8, availableWeight: 10 }] })),
], 8, '2026-08-12T00:00:00.000Z');

describe('Dashboard', () => {
  it('renders projected-benchmark disclosures and decision evidence', () => {
    render(<Dashboard snapshot={snapshot} onNew={() => undefined} onErase={() => undefined} />);
    expect(screen.getByText(/projected benchmark/i)).toBeInTheDocument();
    expect(screen.getByText(/provisional reference distribution/i)).toBeInTheDocument();
    expect(screen.getAllByText(/redirect flexible routes/i).length).toBeGreaterThan(0);
  });

  it('requires a second confirmation before erasing local data', async () => {
    const erase = vi.fn();
    render(<Dashboard snapshot={snapshot} onNew={() => undefined} onErase={erase} />);
    await userEvent.click(screen.getByRole('button', { name: /erase local data/i }));
    expect(erase).not.toHaveBeenCalled();
    await userEvent.click(screen.getByRole('button', { name: /confirm erase/i }));
    expect(erase).toHaveBeenCalledOnce();
  });
});
