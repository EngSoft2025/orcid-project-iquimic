const BASE_URL = 'https://pub.orcid.org/v3.0';
export const DEFAULT_ORCID = '0000-0002-0435-3992';

function resolveOrcid(orcidId?: string): string {
  return orcidId?.trim() || DEFAULT_ORCID;
}

export async function searchResearchers(query: string) {
  const response = await fetch(
    `${import.meta.env.VITE_BACK_BASE_URL}/search?query=${encodeURIComponent(query)}`
  );
  if (!response.ok) {
    throw new Error('Erro ao buscar pesquisadores');
  }
  return response.json();
}

export async function searchProjects(query: string) {
  const headers: HeadersInit = { Accept: 'application/json' };
  const res = await fetch(
    `${BASE_URL}/expanded-search/?q=${encodeURIComponent(query)}&defType=dismax&search_field=funding`,
    { headers }
  );
  if (!res.ok) {
    throw new Error(`Erro ao buscar projetos: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

// Agora com parâmetro opcional
export async function getWorks(orcidId?: string) {
  const orcid = resolveOrcid(orcidId);
  const response = await fetch(`${import.meta.env.VITE_BACK_BASE_URL}/works?orcidId=${orcid}`);
  if (!response.ok) {
    throw new Error('Erro ao buscar publicações do ORCID');
  }
  return response.json();
}

export async function getFundings(orcidId?: string) {
  const orcid = resolveOrcid(orcidId);
  const response = await fetch(`${import.meta.env.VITE_BACK_BASE_URL}/fundings?orcidId=${orcid}`);
  if (!response.ok) {
    throw new Error('Erro ao buscar financiamentos do ORCID');
  }
  return response.json();
}

export async function getReviews(orcidId?: string) {
  const orcid = resolveOrcid(orcidId);
  const response = await fetch(`${import.meta.env.VITE_BACK_BASE_URL}/reviews?orcidId=${orcid}`);
  if (!response.ok) {
    throw new Error('Erro ao buscar revisões do ORCID');
  }
  return response.json();
}

export async function getEmployments(orcidId?: string) {
  const orcid = resolveOrcid(orcidId);
  const response = await fetch(`${import.meta.env.VITE_BACK_BASE_URL}/employments?orcidId=${orcid}`);
  if (!response.ok) {
    throw new Error('Erro ao buscar vínculos do ORCID');
  }
  return response.json();
}

export async function getAllInfo(orcidId?: string) {
  const orcid = resolveOrcid(orcidId);
  const response = await fetch(`${import.meta.env.VITE_BACK_BASE_URL}/info?orcidId=${orcid}`);
  if (!response.ok) {
    throw new Error('Erro ao buscar informações do ORCID');
  }
  return response.json();
}
