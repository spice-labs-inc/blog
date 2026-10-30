# Spice Labs Documentation

Spice Labs Blog: https://blog.spicelabs.io

Built with Astro and featuring:

- 📝 MDX-based documentation with content collections
- 🔍 Client-side search powered by Pagefind
- 📱 Responsive mobile-first design
- 🎨 Modern UI with copy-to-clipboard code blocks
- 🚀 Fast static site generation

## Deployment

- **Production**: `main` branch deploys to **blog.spicelabs.io** via GitHub Pages

## Adding Documentation

1. Create a new `.mdx` file in `src/content/posts/`
2. Add frontmatter with `title`, `date`, `author`, `image`, and `description` (optional)
3. Write your content using Markdown and MDX components
4. The file will automatically appear in the navigation sidebar

Example:

```mdx
---
title: "My New Blog Post"
date: 2025-10-20 # YYYY-MM-DD
description: "Thoughts, updates, and announcements from Spice Labs, Inc."
author: "Manjula-Jayne"
image: "path to author image"
---

# My New Guide

Content goes here...
```

## Development

All commands are run from the root of the project:

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `pnpm install`         | Installs dependencies                            |
| `pnpm dev`             | Starts local dev server at `localhost:4321`      |
| `pnpm build`           | Build your production site to `./dist/`          |
| `pnpm format`          | Format your code with Prettier                   |
| `pnpm preview`         | Preview your build locally, before deploying     |
| `pnpm astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro -- --help` | Get help using the Astro CLI                     |

**Note:** Search functionality requires a production build (`pnpm build`) to work, as it uses Pagefind to index the content.

## Resources

- [Astro Documentation](https://docs.astro.build)
