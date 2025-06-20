export async function searchResearchers(query: string) {
  const response = await fetch(
    `https://pub.orcid.org/v3.0/expanded-search/?q=${encodeURIComponent(query)}`,
    {
      headers: { Accept: "application/json" },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch researchers');
  }

  return response.json();
}
