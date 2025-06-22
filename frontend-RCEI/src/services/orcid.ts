const TOKEN_KEY = 'orcid_token';
const BASE_URL = 'https://pub.orcid.org/v3.0';

// Função para realizar a requisição à API do ORCID
async function fetchOrcid(path: string) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch ${path}: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

// Função para pesquisar pesquisadores
export async function searchResearchers(query: string) {
  const token = await getOrcidToken();
  const headers: HeadersInit = { Accept: 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(
    `${BASE_URL}/expanded-search/?q=${encodeURIComponent(query)}`,
    { headers }
  );
  if (!res.ok) {
    throw new Error(`Failed to search researchers: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

// Função para pesquisar projetos
export async function searchProjects(query: string) {
  const token = await getOrcidToken();
  const headers: HeadersInit = { Accept: 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

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
export async function getWorks(orcid: string) {
  return fetchOrcid(`/${orcid}/works`);
}

// Função para obter as atividades de um pesquisador ORCID
export async function getActivities(orcid: string) {
  return fetchOrcid(`/${orcid}/activities`);
}

// Função para obter o financiamento de um pesquisador ORCID
export async function getFunding(orcid: string) {
  return fetchOrcid(`/${orcid}/funding`);
}

// Função para obter as revisões de pares de um pesquisador ORCID
export async function getPeerReviews(orcid: string) {
  return fetchOrcid(`/${orcid}/peer-reviews`);
}

// Função para obter o token ORCID do localStorage
export const getOrcidToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

// Função para definir o token ORCID no localStorage
export const setOrcidToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

// Função para limpar o token ORCID do localStorage
export const clearOrcidToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

// Definindo o ORCID padrão para testes ou fallback
export const DEFAULT_ORCID = '0000-0003-3905-0546';
