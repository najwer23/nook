import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { Home } from './Home';

vi.mock('@app/hooks/useDocumentTitle', () => ({
  useDocumentTitle: vi.fn(),
}));

describe('Home test', () => {
  test('Should show Hello World!', () => {
    render(<Home />);
    expect(screen.getByText(/Hello World!/i)).toBeInTheDocument();
  });
});
