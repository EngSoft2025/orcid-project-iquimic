const TOKEN_KEY = 'orcid_token';
const BASE_URL = 'https://pub.orcid.org/v3.0';

// Função para pesquisar pesquisadores
export async function searchResearchers(query: string) {

  const response = await fetch(
    `${import.meta.env.VITE_BACK_BASE_URL}/search?query=${encodeURIComponent(query)}`);

  if (!response.ok) {
    throw new Error('Erro ao buscar pesquisadores');
  }

  return response.json();
}

// Função para pesquisar projetos
export async function searchProjects(query: string) {
  const headers: HeadersInit = { Accept: 'application/json' };

  const res = await fetch(
    `${BASE_URL}/expanded-search/?q=${encodeURIComponent(query)}&defType=dismax&search_field=funding`,
    { headers }
  );
  if (!res.ok) {
    throw new Error(`Failed to search projects: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

// Função para obter as publicações (works) de um pesquisador ORCID
export async function getWorks() {
  const orcid = '0000-0002-0435-3992'
  const response = await fetch(`${import.meta.env.VITE_BACK_BASE_URL}/works?orcidId=${orcid}`);

  if (!response.ok) {
    throw new Error('Erro ao buscar projetos (fundings) do ORCID');
  }

  return response.json();
}


// Função para obter o financiamento de um pesquisador ORCID
export async function getFundings() {
  const orcid = '0000-0002-0435-3992'
  const response = await fetch(`${import.meta.env.VITE_BACK_BASE_URL}/fundings?orcidId=${orcid}`);

  if (!response.ok) {
    throw new Error('Erro ao buscar projetos (fundings) do ORCID');
  }

  return response.json();
}

export async function getReviews() {
  const orcid = '0000-0002-0435-3992'
  const response = await fetch(`${import.meta.env.VITE_BACK_BASE_URL}/reviews?orcidId=${orcid}`);

  if (!response.ok) {
    throw new Error('Erro ao buscar projetos (fundings) do ORCID');
  }

  return response.json();
}

export async function getEmployments() {
  const orcid = '0000-0002-0435-3992'
  const response = await fetch(`${import.meta.env.VITE_BACK_BASE_URL}/employments?orcidId=${orcid}`);

  if (!response.ok) {
    throw new Error('Erro ao buscar projetos (fundings) do ORCID');
  }

  return response.json();
}

export async function getAllInfo() {
  const orcid = '0000-0002-0435-3992'
  const response = await fetch(`${import.meta.env.VITE_BACK_BASE_URL}/info?orcidId=${orcid}`);

  if (!response.ok) {
    throw new Error('Erro ao buscar projetos (fundings) do ORCID');
  }

  return response.json();
}


export const DEFAULT_ORCID = '0000-0003-3905-0546';
