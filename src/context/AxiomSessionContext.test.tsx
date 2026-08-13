import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createSession, sessionReducer } from '../domain/session';
import { saveSession } from '../persistence/storage';
import { AxiomSessionProvider, useAxiomSession } from './AxiomSessionContext';

describe('AxiomSessionProvider', () => {
  it('hydrates a saved answer and persists its replacement', async () => {
    const saved = sessionReducer(sessionReducer(createSession(), { type: 'setProfile', profile: { name: 'Mira', classLevel: 8 } }), { type: 'answerItem', response: response('route-flex') });
    saveSession(saved, localStorage);

    render(<AxiomSessionProvider><Harness /></AxiomSessionProvider>);

    expect(screen.getByText(/saved answer: route-flex/i)).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: /choose reserve/i }));

    expect(screen.getByText(/saved answer: protect-reserve/i)).toBeInTheDocument();
    expect(localStorage.getItem('axiom.session.v1')).toContain('protect-reserve');
  });
});

function Harness() {
  const { session, answer } = useAxiomSession();
  return <><p>Saved answer: {session.responses['calibration-systems']?.optionId}</p><button onClick={() => answer(response('protect-reserve'))}>Choose reserve</button></>;
}

function response(optionId: string) {
  return { itemId: 'calibration-systems', missionId: 'calibration', prompt: 'Prompt', optionId, optionLabel: optionId, evidence: [{ competency: 'systemsThinking' as const, earnedWeight: 10, availableWeight: 10 }] };
}
