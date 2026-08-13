import { render, screen } from '@testing-library/react';
import { Button } from './button';

describe('Button', () => {
  it('renders a semantic button with its selected shadcn variant', () => {
    render(<Button variant="outline">Keep data</Button>);

    expect(screen.getByRole('button', { name: 'Keep data' })).toHaveAttribute('data-variant', 'outline');
  });
});
