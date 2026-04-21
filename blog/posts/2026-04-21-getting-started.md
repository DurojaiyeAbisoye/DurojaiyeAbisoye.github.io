---
title: "Getting Started with the Blog System"
date: "2026-04-21"
tags: ["tutorial", "blog"]
summary: "Learn how to write blog posts using Markdown and build them automatically."
repo: "DurojaiyeAbisoye/personal-repo"
repoLink: "https://github.com/DurojaiyeAbisoye/personal-repo"
---

## How to Write a Post

Just create a new Markdown file in `blog/posts/` with the following structure:

1. **Frontmatter** at the top (YAML):
   - `title`: Post title
   - `date`: Publication date (YYYY-MM-DD)
   - `tags`: Array of tags
   - `summary`: Brief description (optional)
   - `repoLink`: Link to GitHub repo (optional)

2. **Content**: Regular Markdown below the frontmatter

## Example File

Create a file like `blog/posts/my-first-post.md`:

```
---
title: "My Data Science Project"
date: "2026-04-21"
tags: ["python", "data-science"]
summary: "A walkthrough of my ML model"
repoLink: "https://github.com/yourname/ml-project"
---

Your post content in Markdown...
```

## Build the Blog

```bash
npm install
npm run build
```

This generates HTML files in `blog/dist/` that you can link to from your homepage.

## Link to Posts

Add links to `index.html`:

```html
<a href="/blog/dist/my-first-post.html">My Data Science Project</a>
```

That's it! Write Markdown, run `npm run build`, commit, and push.
