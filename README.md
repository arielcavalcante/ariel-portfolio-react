# Ariel Cavalcante — Product Design Portfolio

Hello! I’m Ariel Cavalcante, a product designer with more than six years of experience across product design, design systems, fintech, and collaboration with front-end teams.

This is my bilingual portfolio, where I share selected work and the thinking behind it. I enjoy bridging design and engineering to create products that are useful, accessible, scalable, and full of personality.

## What’s inside

- A responsive portfolio available in English and Brazilian Portuguese
- Detailed product-design case studies
- The Somapay PF redesign, which contributed to a 24% increase in its Play Store rating
- Custom motion, microinteractions, data visualizations, and a tiny footer crab game
- Dedicated layouts for desktop, tablet, and mobile

## Built with

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- Plain CSS with responsive layouts, custom properties, and animations
- Local SVG, image, font, and video assets

The project intentionally keeps its runtime dependencies small: React handles the interface while the visual system and interactions are implemented directly with TypeScript, CSS, and SVG.

## Routes

| English | Português |
| --- | --- |
| `/` | `/br/` |
| `/somapay-pf` | `/br/somapay-pf` |
| Unrecognized routes display the 404 page | Rotas não reconhecidas exibem a página 404 |

## Run locally

```bash
npm install
npm run dev
```

For a reproducible installation, use `npm ci`.

## Production build

```bash
npm run build
npm run preview
```

The production output is generated in `dist/`.

## Project structure

```text
src/
├── components/   Reusable interface and interaction components
├── pages/        Homepage, Somapay PF case study, and 404 page
├── content.ts    English and Brazilian Portuguese content
└── styles.css    Shared visual system and responsive styles

public/
└── assets/       Local fonts, images, icons, SVGs, and videos
```

## Deployment

The site is ready for static hosting on Cloudflare Pages:

- Build command: `npm run build`
- Output directory: `dist`

The included `public/_redirects` file preserves client-side routing when a visitor opens a localized or case-study URL directly.

## Contact

Want to talk about product design, design systems, or working together?

[hello@arielcavalcante.com](mailto:hello@arielcavalcante.com)
