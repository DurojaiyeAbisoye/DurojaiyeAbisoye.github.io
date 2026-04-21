#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const matter = require('gray-matter');

const POSTS_DIR = './blog/posts';
const DIST_DIR = './blog/dist';

// Ensure dist directory exists
if (!fs.existsSync(DIST_DIR)) {
  fs.mkdirSync(DIST_DIR, { recursive: true });
}

// HTML template for blog posts
const postTemplate = (data, content) => {
  const {
    title = 'Untitled',
    date = new Date().toISOString().split('T')[0],
    tags = [],
    repo = null,
    repoLink = null,
    summary = ''
  } = data;

  const tagsHTML = tags.length
    ? tags.map(tag => `<span class="post-tag">${tag}</span>`).join('')
    : '';

  const repoHTML = repoLink
    ? `<a href="${repoLink}" class="post-repo-link">→ View Repository</a>`
    : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${title} — Durojaiye Abisoye</title>
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='16' fill='%230a0a0f'/><text y='.9em' font-size='60' x='50%' dominant-baseline='middle' text-anchor='middle' fill='%239d4edd' font-family='serif' font-weight='700'>D</text></svg>"/>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@300;400;500&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap" rel="stylesheet"/>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css"/>
  <style>
    :root {
      --black: #06060a;
      --surface: #0e0e16;
      --surface2: #14141f;
      --border: #1e1e2e;
      --purple: #9d4edd;
      --purple-light: #bb86fc;
      --purple-dim: #6a1fa8;
      --purple-glow: rgba(157, 78, 221, 0.15);
      --text: #e8e6f0;
      --text-muted: #7a7891;
      --text-dim: #4a4862;
      --white: #f4f2ff;
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body {
      background: var(--black);
      color: var(--text);
      font-family: 'DM Sans', sans-serif;
      font-weight: 300;
      line-height: 1.7;
      cursor: none;
    }

    /* CURSOR */
    .cursor { position: fixed; width: 12px; height: 12px; background: var(--purple); border-radius: 50%; pointer-events: none; z-index: 9999; transform: translate(-50%,-50%); mix-blend-mode: screen; }
    .cursor-ring { position: fixed; width: 36px; height: 36px; border: 1px solid rgba(157,78,221,0.4); border-radius: 50%; pointer-events: none; z-index: 9998; transform: translate(-50%,-50%); transition: transform 0.15s ease-out; }

    /* NAV */
    nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 100;
      padding: 1.25rem 3rem;
      display: flex; justify-content: space-between; align-items: center;
      background: rgba(6,6,10,0.85);
      backdrop-filter: blur(20px);
      border-bottom: 1px solid var(--border);
    }
    .nav-logo { font-family: 'DM Serif Display', serif; font-size: 1.3rem; color: var(--white); text-decoration: none; }
    .nav-logo span { color: var(--purple-light); }
    .nav-back { font-family: 'DM Mono', monospace; font-size: 0.72rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-muted); text-decoration: none; transition: color 0.2s; display: flex; align-items: center; gap: 0.5rem; }
    .nav-back:hover { color: var(--purple-light); }

    /* POST LAYOUT */
    .post-wrapper {
      max-width: 720px;
      margin: 0 auto;
      padding: 8rem 2rem 6rem;
    }

    /* POST HEADER */
    .post-eyebrow {
      display: flex; align-items: center; gap: 1.5rem;
      margin-bottom: 2rem;
    }
    .post-date {
      font-family: 'DM Mono', monospace;
      font-size: 0.68rem; letter-spacing: 0.1em;
      color: var(--text-dim);
    }
    .post-tags { display: flex; gap: 0.4rem; flex-wrap: wrap; }
    .post-tag {
      padding: 0.2rem 0.6rem;
      background: var(--purple-glow);
      border: 1px solid rgba(157,78,221,0.2);
      font-family: 'DM Mono', monospace;
      font-size: 0.6rem; letter-spacing: 0.08em; text-transform: uppercase;
      color: var(--purple-light);
    }
    .post-title {
      font-family: 'DM Serif Display', serif;
      font-size: clamp(2rem, 5vw, 3.2rem);
      line-height: 1.1; letter-spacing: -0.02em;
      color: var(--white);
      margin-bottom: 1.5rem;
    }
    .post-summary {
      font-size: 1.05rem;
      color: var(--text-muted);
      line-height: 1.8;
      margin-bottom: 2rem;
      padding-bottom: 2rem;
      border-bottom: 1px solid var(--border);
    }
    .post-repo-link {
      display: inline-flex; align-items: center; gap: 0.5rem;
      font-family: 'DM Mono', monospace; font-size: 0.72rem;
      letter-spacing: 0.08em; text-transform: uppercase;
      color: var(--purple-light);
      text-decoration: none;
      transition: color 0.2s;
      margin-bottom: 2.5rem;
    }
    .post-repo-link:hover { color: var(--white); }

    /* POST CONTENT */
    .post-content {
      font-size: 1rem;
      line-height: 1.8;
    }
    .post-content h2 {
      font-family: 'DM Serif Display', serif;
      font-size: 1.8rem; letter-spacing: -0.01em;
      margin: 2.5rem 0 1rem;
      color: var(--white);
    }
    .post-content h3 {
      font-family: 'DM Serif Display', serif;
      font-size: 1.3rem;
      margin: 2rem 0 0.8rem;
      color: var(--purple-light);
    }
    .post-content p {
      margin-bottom: 1.5rem;
    }
    .post-content a {
      color: var(--purple-light);
      text-decoration: none;
      border-bottom: 1px solid var(--purple);
      transition: color 0.2s;
    }
    .post-content a:hover { color: var(--white); }
    .post-content code {
      font-family: 'DM Mono', monospace;
      background: var(--surface2);
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      font-size: 0.9em;
      color: var(--purple-light);
    }
    .post-content pre {
      background: var(--surface2);
      border: 1px solid var(--border);
      border-radius: 6px;
      padding: 1.5rem;
      overflow-x: auto;
      margin: 2rem 0;
      font-size: 0.85rem;
    }
    .post-content pre code {
      background: none;
      padding: 0;
      color: var(--text);
    }
    .post-content ul, .post-content ol {
      margin: 1.5rem 0 1.5rem 2rem;
    }
    .post-content li {
      margin-bottom: 0.5rem;
    }
    .post-content blockquote {
      border-left: 3px solid var(--purple);
      padding-left: 1.5rem;
      margin: 2rem 0;
      color: var(--text-muted);
      font-style: italic;
    }

    /* FOOTER */
    footer {
      margin-top: 4rem;
      padding-top: 2rem;
      border-top: 1px solid var(--border);
      font-size: 0.9rem;
      color: var(--text-dim);
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="cursor"></div>
  <div class="cursor-ring"></div>

  <nav>
    <a href="/" class="nav-logo"><span>D</span></a>
    <a href="/" class="nav-back">← Back</a>
  </nav>

  <div class="post-wrapper">
    <div class="post-eyebrow">
      <span class="post-date">${date}</span>
      <div class="post-tags">${tagsHTML}</div>
    </div>

    <h1 class="post-title">${title}</h1>
    
    ${summary ? `<div class="post-summary">${summary}</div>` : ''}
    
    ${repoHTML}

    <div class="post-content">
      ${content}
    </div>

    <footer>
      <p>Written by Durojaiye Abisoye • <a href="/" style="color: var(--purple-light);">Back to home</a></p>
    </footer>
  </div>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-python.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-javascript.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-sql.min.js"></script>
  
  <script>
    // Custom cursor
    const cursor = document.querySelector('.cursor');
    const cursorRing = document.querySelector('.cursor-ring');
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      cursorRing.style.left = e.clientX + 'px';
      cursorRing.style.top = e.clientY + 'px';
    });
    document.addEventListener('mousedown', () => {
      cursor.style.width = '8px';
      cursor.style.height = '8px';
    });
    document.addEventListener('mouseup', () => {
      cursor.style.width = '12px';
      cursor.style.height = '12px';
    });
  </script>
</body>
</html>`;
};

// Build function
function buildBlog() {
  try {
    if (!fs.existsSync(POSTS_DIR)) {
      console.log(`✓ No posts directory yet. Create ${POSTS_DIR}/ to get started.`);
      return;
    }

    const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));

    if (files.length === 0) {
      console.log('✓ No markdown files found in blog/posts/');
      return;
    }

    console.log(`Building ${files.length} blog post(s)...`);

    files.forEach(file => {
      const filePath = path.join(POSTS_DIR, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(fileContent);
      const html = marked(content);
      const rendered = postTemplate(data, html);

      const outputName = file.replace('.md', '.html');
      const outputPath = path.join(DIST_DIR, outputName);
      fs.writeFileSync(outputPath, rendered);

      console.log(`  ✓ ${file} → ${outputName}`);
    });

    console.log('Build complete!');
  } catch (err) {
    console.error('Build error:', err.message);
    process.exit(1);
  }
}

buildBlog();
