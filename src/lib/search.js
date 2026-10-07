export function buildSearchIndex(collections) {
  return collections
    .flatMap(({ entries, type, basePath }) =>
      entries
        .filter((entry) => !entry.data.draft)
        .map((entry) => ({
          title: entry.data.title,
          summary: [entry.data.author, entry.data.summary].filter(Boolean).join(' '),
          content: entry.body || '',
          date: entry.data.date.toISOString().slice(0, 10),
          tags: entry.data.tags || [],
          type,
          href: `${basePath}/${entry.slug}`,
        })),
    )
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function searchEntries(entries, query) {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return [];

  return entries.filter((entry) =>
    `${entry.title} ${entry.summary} ${entry.content} ${entry.tags.join(' ')} ${entry.type}`
      .toLowerCase()
      .includes(normalizedQuery),
  );
}
