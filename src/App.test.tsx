import { render, screen } from '@testing-library/react';
import App from './App';

describe('AXIOM application shell', () => {
  it('renders the AXIOM landing page on boot', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: /know where you/i })).toBeInTheDocument();
    expect(screen.getByTestId('landing-shell')).toBeInTheDocument();
    expect(screen.getByTestId('landing-cta')).toHaveTextContent(/start your benchmark/i);
  });
});
