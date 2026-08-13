import { render, screen } from '@testing-library/react';
import App from './App';

describe('AXIOM application shell', () => {
  it('renders the AXIOM learning-signal boot state', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: /AXIOM/i })).toBeInTheDocument();
    expect(screen.getByText(/learning signal/i)).toBeInTheDocument();
    expect(screen.getByTestId('onboarding-shell')).toBeInTheDocument();
    expect(screen.getByTestId('onboarding-submit')).toHaveTextContent(/begin calibration/i);
  });
});
