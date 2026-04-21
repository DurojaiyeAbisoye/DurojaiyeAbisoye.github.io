# Durojaiye Abisoye's Portfolio & Blog

Welcome to my personal website and blog repository. This is a static site hosted on GitHub Pages built with HTML, CSS, JavaScript, and a custom Markdown-to-HTML blog pipeline.

🌐 **Live Site:** [durojaiyeabisoye.github.io](https://durojaiyeabisoye.github.io)

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- Git

### Installation & Setup

```bash
# Clone the repo (or continue if already cloned)
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
tags: ["python", "data-science", "machine-learning"]
summary: "A brief description of what this post is about"
repoLink: "https://github.com/DurojaiyeAbisoye/my-project"
---

# Your Post Title

Write your content in Markdown here.

## Code Example

\`\`\`python
import pandas as pd

# Your code with syntax highlighting
df = pd.read_csv('data.csv')
print(df.head())
\`\`\`

## Links

[Link to something](https://example.com)
```

### Frontmatter Fields

- `title` (required): Post title
- `date` (required): Publication date (YYYY-MM-DD)
- `tags` (optional): Array of tags
- `summary` (optional): Brief description shown below title
- `repoLink` (optional): Link to GitHub repository

### Build Blog Posts

After writing a post, generate the HTML:

```bash
npm run build
```

This creates an HTML file in `blog/dist/` that you can link to.

### Example Workflow

```bash
# 1. Create post
echo "---
title: 'My First Post'
date: '2026-04-21'
tags: ['tutorial']
---

# Hello World
This is my first post!" > blog/posts/2026-04-21-hello-world.md

# 2. Build
npm run build

# 3. Add to index.html (link to blog/posts/2026-04-21-hello-world.md)

# 4. Commit & push
git add .
git commit -m "Add blog post: My First Post"
git push
```

## 🚢 Deployment

### Deploy to GitHub Pages

The site automatically deploys when you push to the `main` branch.

```bash
# Build blog posts
npm run build

# Stage changes
git add .

# Commit
git commit -m "Update: description of changes"

# Push to main
git push origin main
```

GitHub Pages will automatically serve your changes at `https://DurojaiyeAbisoye.github.io` within a few seconds.

**Full deployment guide:** See [DEPLOY_GUIDE.md](DEPLOY_GUIDE.md)

## 📂 Project Structure

```
.
├── index.html                 # Homepage
├── package.json               # npm dependencies
├── build-blog.js              # Blog build script (Markdown → HTML)
├── README.md                  # This file
├── HOW_IT_WORKS.md            # Architecture documentation
├── DEPLOY_GUIDE.md            # Deployment instructions
├── blog/
│   ├── posts/                 # Your Markdown blog posts
│   ├── dist/                  # Generated HTML (don't edit)
│   └── README.md              # Blog documentation
└── node_modules/              # npm packages (don't commit)
```

## 🎨 Customization

### Edit Homepage
Modify `index.html` directly. All CSS is embedded in the `<style>` tag.

### Change Blog Styling
Edit the template in `build-blog.js` — look for the `postTemplate()` function.

### Add New Pages
Create new `.html` files in the root directory.

## 🛠 Commands

```bash
# Install dependencies
npm install

# Build blog posts (Markdown → HTML)
npm run build

# View the site locally
# Open index.html in a browser, or use:
python -m http.server 8000
# Then visit http://localhost:8000
```

## 📚 Documentation

- **[HOW_IT_WORKS.md](HOW_IT_WORKS.md)** — How the site architecture works
- **[DEPLOY_GUIDE.md](DEPLOY_GUIDE.md)** — Step-by-step deployment instructions
- **[blog/README.md](blog/README.md)** — Detailed blog system documentation

## 🔗 Linking Personal Repos

When you write about a personal project, add the `repoLink` to your post frontmatter:

```yaml
---
title: "Building a Data Pipeline"
repoLink: "https://github.com/DurojaiyeAbisoye/data-pipeline"
---
```

This adds a "View Repository" link at the top of the blog post.

## 📊 Technologies

- **HTML/CSS/JavaScript** — No framework overhead
- **Markdown** — Simple content creation
- **Node.js + marked + gray-matter** — Blog build pipeline
- **GitHub Pages** — Free hosting (static site)
- **Prism.js** — Code syntax highlighting

## ⚡ Performance

- ✅ Fully static (fast load times)
- ✅ Embedded CSS/JS (no extra requests)
- ✅ Syntax highlighting on-demand (blog posts only)
- ✅ No backend or database required
- ✅ Works offline (after first load)

## 🐛 Troubleshooting

### Blog post not showing?
```bash
# Ensure it's built
npm run build

# Check blog/dist/ exists with your .html file
ls blog/dist/
```

### Changes not showing on GitHub Pages?
- Hard refresh: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
- Wait 1-2 minutes for GitHub Pages to update
- Check repository settings → Pages branch is set to `main`

### Styling looks wrong?
- Check your browser console for errors (F12)
- Verify the post was generated with `npm run build`
- Compare CSS in generated HTML to `index.html`

## 📝 License

This is a personal portfolio—feel free to use as inspiration, but please don't copy the design directly.

## 👋 Questions?

Check the documentation files or review the source code. Everything is self-contained and well-commented.

---

**Last Updated:** April 21, 2026
