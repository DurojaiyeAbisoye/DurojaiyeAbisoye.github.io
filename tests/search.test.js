import assert from 'node:assert/strict';
import test from 'node:test';
import { buildSearchIndex, searchEntries } from '../src/lib/search.js';

const date = new Date('2025-01-01T00:00:00.000Z');

test('builds a full-text index of published blog posts', () => {
  const index = buildSearchIndex([
    {
      type: 'Blog',
      basePath: '/blog',
      entries: [
        {
          data: { title: 'Production models', date, tags: ['mlops'] },
          body: 'Monitor model drift with feature distributions.',
          slug: 'production-models',
        },
        {
          data: { title: 'Draft entry', date, draft: true },
          body: 'This draft must not be searchable.',
          slug: 'draft-entry',
        },
      ],
    },
  ]);

  assert.deepEqual(index.map((entry) => entry.href), [
    '/blog/production-models',
  ]);
  assert.equal(searchEntries(index, 'feature distributions')[0].title, 'Production models');
  assert.deepEqual(searchEntries(index, 'draft must not'), []);
});

test('search is case-insensitive and ignores blank queries', () => {
  const index = buildSearchIndex([{
    type: 'Blog',
    basePath: '/blog',
    entries: [{
      data: { title: 'Production Models', date },
      body: 'Monitor model drift.',
      slug: 'production-models',
    }],
  }]);

  assert.equal(searchEntries(index, '  MODEL DRIFT ')[0].title, 'Production Models');
  assert.deepEqual(searchEntries(index, '  '), []);
});
