# How This Website Works

This is a personal portfolio and blog website hosted on GitHub Pages. Here's the architecture:

## File Structure

```
.
├── index.html              # Homepage (your main landing page)
├── package.json            # Node dependencies
├── build-blog.js           # Blog build script
├── blog/
│   ├── posts/              # Your Markdown blog posts go here
│   ├── dist/               # Generated HTML blog posts (auto-created)
│   └── README.md           # Blog documentation
├── README.md               # Main project README (this file)
├── HOW_IT_WORKS.md        # Architecture documentation (this file)
├── DEPLOY_GUIDE.md        # Deployment instructions (if exists)
└── node_modules/           # npm dependencies (don't commit)
```

## How It Works

### 1. **Homepage (index.html)**
- Static HTML file with embedded CSS and JavaScript
- Your main landing page with navigation and sections
- Directly served by GitHub Pages

### 2. **Blog System**
The blog uses a **build pipeline** approach:

```
Markdown (.md) → build-blog.js → HTML files → GitHub Pages serves them
```

**Flow:**
- Write posts as Markdown with YAML frontmatter in `blog/posts/`
- Run `npm run build` to convert them to HTML
- Generated HTML appears in `blog/dist/`
- Link to them from your homepage
- Push to GitHub, GitHub Pages serves them

### 3. **Styling**
- Main styles are in `index.html` `<style>` tag
- Blog posts reuse the same styling via embedded CSS in generated HTML
- Prism.js handles code syntax highlighting
- Custom cursor and animations included

### 4. **JavaScript Features**
- Custom cursor (follows mouse)
- Syntax highlighting (Prism.js)
- Smooth scrolling
- Navigation bar effects

## Technologies Used

- **HTML/CSS/JavaScript** — No JavaScript framework needed
- **Node.js** — Blog build tool
- **marked** — Markdown parser
- **gray-matter** — YAML frontmatter parser
- **GitHub Pages** — Hosting (static site generator)
- **Prism.js** — Code syntax highlighting (CDN)

## Development Workflow

### To Write a Blog Post

1. Create `blog/posts/YYYY-MM-DD-title.md`:
```markdown
---
title: "My Post Title"
date: "2026-04-21"
tags: ["python", "data-science"]
summary: "Brief description"
repoLink: "https://github.com/you/repo"
---

# Your post content

Write in Markdown...
```

2. Build:
```bash
npm run build
```

3. Add link to `index.html` or a blog listing page

4. Commit and push:
```bash
git add .
git commit -m "Add blog post: My Post"
git push
```

### To Deploy

See [DEPLOY_GUIDE.md](DEPLOY_GUIDE.md) for full instructions.

Quick version:
```bash
npm run build          # Generate blog HTML
git add .
git commit -m "Deploy changes"
git push origin main   # Push to main branch
```

GitHub Pages automatically rebuilds when you push.

## Customization

### To Change the Homepage
Edit `index.html` directly. All CSS is inline, so styling changes are in the `<style>` tag.

### To Change Blog Post Styling
Edit the template in `build-blog.js` — look for the `postTemplate()` function. It contains the CSS and HTML structure for blog posts.

### To Add New Features
- **New pages**: Create `.html` files in the root
- **New sections**: Add to `index.html` with internal links
- **New code themes**: Change Prism.js theme in `index.html` link

## Deployment & GitHub Pages

This is set up as a GitHub Pages repository. When you:
1. Push to the `main` branch
2. GitHub automatically serves the content at `https://DurojaiyeAbisoye.github.io`

**Important:** The repository must be named `{yourusername}.github.io` for this to work.

## Performance Notes

- Site is fully static (fast)
- CSS and JS are embedded (no extra requests)
- Prism.js is loaded from CDN only on blog posts
- No backend or database needed

## Future Enhancements

Possible additions (if needed):
- Blog listing page (auto-generated index of all posts)
- Search functionality
- Comments system (using GitHub Issues or Disqus)
- RSS feed
- Analytics
