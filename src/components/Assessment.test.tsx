import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('AXIOM learner flow', () => {
  it('collects a class and locks a selected response in a stable assessment shell', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Navigate past landing page
    await user.click(screen.getByTestId('landing-cta'));

    await user.type(screen.getByLabelText(/your name/i), 'Mira');
    await user.selectOptions(screen.getByLabelText(/^grade level/i), '8');
    await user.click(screen.getByRole('button', { name: /launch calibration/i }));
    await user.click(screen.getByRole('radio', { name: /measure temperature at the bay/i }));

    expect(screen.getByRole('button', { name: /lock response/i })).toBeEnabled();
    expect(screen.getByTestId('assessment-shell')).toBeInTheDocument();
    expect(screen.getByText(/saved locally/i)).toBeInTheDocument();
  });
});
