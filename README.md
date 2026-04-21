# Durojaiye Abisoye's Portfolio & Blog

Welcome to my personal website and blog repository. This is a static site hosted on GitHub Pages built with HTML, CSS, JavaScript, and an automated Markdown-to-HTML blog system.

🌐 **Live Site:** [durojaiyeabisoye.github.io](https://durojaiyeabisoye.github.io)

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- Git

### Installation & Setup

```bash
# Clone the repo
git clone https://github.com/DurojaiyeAbisoye/DurojaiyeAbisoye.github.io.git
cd DurojaiyeAbisoye.github.io

# Install dependencies
npm install
```

## 📝 Writing Blog Posts

### Create a New Post

Create a new file in `blog/posts/` named `YYYY-MM-DD-title.md`:

```markdown
---
title: "My Data Science Project"
date: "2026-04-21"
tags: ["blog", "data-science", "python"]
summary: "A brief description of what this post is about"
repoLink: "https://github.com/DurojaiyeAbisoye/my-project"
---

# Your Post Title

Write your content in Markdown here.

## Code Example

\`\`\`python
import pandas as pd

df = pd.read_csv('data.csv')
print(df.head())
\`\`\`

## Links

[Link to something](https://example.com)
```

### Tag Usage

- **`tutorial`** — How-to guides, step-by-step walkthroughs, learning resources
- **`blog`** — Project writeups, postmortems, reflections, announcements

You can use any tags you want. The system auto-generates filter buttons.

### Build and Deploy

**That's it!** The system handles everything automatically:

```bash
# 1. Build (converts Markdown → HTML + posts.json)
npm run build

# 2. Commit & push
git add .
git commit -m "Add blog post: My Project"
git push origin blog-system
```

**The magic happens:**
- `build-blog.js` converts your Markdown to HTML
- Generates `blog/posts.json` with all post metadata
- Your homepage fetches this JSON and auto-links all posts
- No manual linking needed!

### Frontmatter Fields

- `title` (required): Post title
- `date` (required): Publication date (YYYY-MM-DD)
- `tags` (optional): Array of tags for filtering
- `summary` (optional): Brief description shown below title
- `repoLink` (optional): Link to GitHub repository

### Example Workflow

```bash
# 1. Create post
cat > blog/posts/2026-04-21-hello-world.md << 'EOF'
---
title: "Hello World"
date: "2026-04-21"
tags: ["blog"]
summary: "My first post!"
---

# Welcome

This is my first blog post.
