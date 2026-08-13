import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('AXIOM learner flow', () => {
  it('collects a class and locks a selected response in a stable assessment shell', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText(/learner name/i), 'Mira');
    await user.selectOptions(screen.getByLabelText(/^class/i), '8');
    await user.click(screen.getByRole('button', { name: /begin calibration/i }));
    await user.click(screen.getByRole('button', { name: /measure temperature at the bay/i }));

    expect(screen.getByRole('button', { name: /lock response/i })).toBeEnabled();
    expect(screen.getByTestId('assessment-shell')).toHaveClass('assessment-shell');
    expect(screen.getByText(/saved locally/i)).toBeInTheDocument();
  });
});
