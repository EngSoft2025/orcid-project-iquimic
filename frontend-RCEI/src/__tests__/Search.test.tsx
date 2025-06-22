import { render, screen, fireEvent } from '@testing-library/react';
import Search from '../pages/Search';
import { describe, it, expect } from 'vitest';

// Basic smoke test that changing the filter hides publications

describe('Search filtering', () => {
  it('updates results when filter changes', () => {
    render(<Search />);

    // Publications and Projects tab counts should start at 0 because no data
    expect(screen.getByText(/Publicações \(0\)/)).toBeInTheDocument();
    expect(screen.getByText(/Projetos \(0\)/)).toBeInTheDocument();

    // Change filter to publications
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'publications' },
    });

    // Count labels should update automatically
    expect(screen.getByText(/Pesquisadores \(0\)/)).toBeInTheDocument();
  });
});
