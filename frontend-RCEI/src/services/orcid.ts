import { getOrcidToken } from '@/services/auth';

export async function searchResearchers(query: string) {
  const token = getOrcidToken();
  const headers: HeadersInit = { Accept: 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(
    `https://pub.orcid.org/v3.0/expanded-search/?q=${encodeURIComponent(query)}`,
    { headers }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch researchers');
  }

  return response.json();
}
