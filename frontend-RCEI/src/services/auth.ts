export const TOKEN_KEY = 'orcid_token';

export function getOrcidToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setOrcidToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearOrcidToken() {
  localStorage.removeItem(TOKEN_KEY);
}
