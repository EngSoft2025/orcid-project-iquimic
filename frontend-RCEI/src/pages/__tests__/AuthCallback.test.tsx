import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import AuthCallback from '../AuthCallback';
import { AuthProvider } from '@/contexts/AuthContext';
import { vi } from 'vitest';

// Helper to render the component within router and auth context
function renderWithRouter(initial: string) {
  return render(
    <AuthProvider>
      <MemoryRouter initialEntries={[initial]}>
        <Routes>
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/login" element={<div>login page</div>} />
          <Route path="/dashboard" element={<div>dashboard</div>} />
        </Routes>
      </MemoryRouter>
    </AuthProvider>
  );
}

describe('AuthCallback error handling', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('redirects to login when exchange fails', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ error: 'bad code' }),
    });
    vi.stubGlobal('fetch', fetchMock);

    renderWithRouter('/auth/callback?code=bad');

    await screen.findByText('login page');
    expect(fetchMock).toHaveBeenCalled();
  });

  it('redirects to login on network error', async () => {
    const fetchMock = vi.fn().mockRejectedValue(new Error('network'));
    vi.stubGlobal('fetch', fetchMock);

    renderWithRouter('/auth/callback?code=bad');

    await screen.findByText('login page');
    expect(fetchMock).toHaveBeenCalled();
  });
});
