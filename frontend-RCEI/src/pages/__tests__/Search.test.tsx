import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Search from '../Search';
import * as orcidService from '../../services/orcid';

vi.mock('../../services/orcid');

describe('Search page', () => {
  it('loads results from query param', async () => {
    (orcidService.searchResearchers as unknown as vi.Mock).mockResolvedValueOnce({
      "expanded-result": [
        { "orcid-id": "1", "given-names": "John", "family-names": "Doe" }
      ]
    });

    const client = new QueryClient();

    render(
      <QueryClientProvider client={client}>
        <MemoryRouter initialEntries={['/search?q=example']}>
          <Routes>
            <Route path="/search" element={<Search />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );

    await screen.findByText('John Doe');
    expect(orcidService.searchResearchers).toHaveBeenCalledWith('example');
  });

  it('searches when a tag is clicked', async () => {
    (orcidService.searchResearchers as unknown as vi.Mock).mockResolvedValue({
      "expanded-result": [],
    });

    const client = new QueryClient();

    render(
      <QueryClientProvider client={client}>
        <MemoryRouter initialEntries={['/search']}>
          <Routes>
            <Route path="/search" element={<Search />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );

    const tag = screen.getByText('Data Mining');
    fireEvent.click(tag);

    expect(orcidService.searchResearchers).toHaveBeenLastCalledWith(
      'keyword:"Data Mining"'
    );
  });
});
