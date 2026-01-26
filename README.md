# CivicThesis

A modern, feature-rich blog platform built with Astro, featuring newspaper-style layouts, rich data visualizations, and a comprehensive component library.

## 🌟 Features

- **📰 Newspaper-Style Layout** - Dense, grid-heavy homepage inspired by The Onion
- **📊 Rich Data Visualizations** - Custom VOX-style charts with Chart.js and Mermaid
- **✍️ Multiple Content Types** - Blog posts, satirical stories, and educational resources
- **🎨 54+ Reusable Components** - Well-organized component library
- **🌓 Dark Mode** - Smooth theme switching with persistent preferences
- **📱 Fully Responsive** - Mobile-first design with adaptive layouts
- **� Fuzzy Search** - Fast search powered by Fuse.js
- **📈 SEO Optimized** - Meta tags, sitemap, and structured data
- **⚡ PWA Ready** - Service worker with offline support
- **🎭 Unique Aesthetics** - Hand-drawn scribble effects and cinematic animations

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/CivicThesis.git
cd CivicThesis

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:4321` to see your site.

## 📁 Project Structure

```
CivicThesis/
├── src/
│   ├── components/          # 54+ reusable components
│   │   ├── charts/          # Data visualization (5)
│   │   ├── data/            # Tables and data display (1)
│   │   ├── media/           # Images, videos, maps (4)
│   │   ├── typography/      # Text effects (5)
│   │   ├── educational/     # Learning components (2)
│   │   ├── ui/              # Cards and boxes (4)
│   │   ├── utility/         # Misc utilities (2)
│   │   ├── ads/             # Advertisement components (3)
│   │   ├── annotations/     # Text annotations (5)
│   │   ├── layout/          # Header, Footer, Cards (12)
│   │   ├── scribble/        # Hand-drawn effects (7)
│   │   └── vox/             # VOX-style charts (4)
│   ├── content/             # Content collections
│   │   ├── blog/            # Technical blog posts (33)
│   │   ├── stories/         # Satirical news articles (26)
│   │   └── education/       # Educational resources (18)
│   ├── layouts/             # Page layouts (3)
│   ├── pages/               # Routes (14)
│   └── styles/              # Global CSS
├── public/                  # Static assets
└── dist/                    # Build output
```

## 🎨 Component Categories

### Charts (5 components)
Data visualization components for rendering charts, graphs, and diagrams.
- `BarChart.astro` - Chart.js bar charts
- `Chart.astro` - Generic chart wrapper
- `ChartAnnotation.astro` - Chart annotations with arrows
- `EquationGraph.astro` - Mathematical graphs
- `Mermaid.astro` - Mermaid diagram rendering

### Data (1 component)
Structured data display components.
- `CustomTable.astro` - Styled data tables with multiple variants

### Media (4 components)
Rich media content components.
- `AnimatedCircleImage.astro` - Circular image animations
- `OptimizedImage.astro` - Optimized image component
- `VideoEmbed.astro` - Responsive video embeds
- `MapEmbed.astro` - Interactive map embeds

### Typography (5 components)
Text styling and animation components.
- `CinematicText.astro` - Cinematic text effects
- `TypewriterCode.astro` - Typewriter code animations
- `TypewriterSyntax.astro` - Syntax-highlighted typewriter
- `TypingText.astro` - Typing text animations
- `Quote.astro` - Styled blockquotes

### Educational (2 components)
Learning and educational enhancement components.
- `StyledMath.astro` - Colorful math rendering with KaTeX
- `TableOfContents.astro` - Auto-generated table of contents

### UI (4 components)
Reusable interface elements.
- `CinematicCard.astro` - Themed card component
- `SubjectCard.astro` - Subject/course cards
- `ComparisonBox.astro` - Side-by-side comparisons
- `HandDrawnBox.astro` - Hand-drawn style boxes

### Utility (2 components)
General-purpose utility components.
- `Board.astro` - Board/canvas component
- `Emoji.astro` - Emoji rendering

## 📝 Content Collections

### Blog (33 posts)
Technical tutorials and web development guides covering:
- Astro framework and deployment
- Custom data visualizations
- Image optimization techniques
- Typography and animations
- SEO and indexing

### Stories (26 articles)
Satirical news articles with categories:
- Analysis (Haryana CET exam guides)
- Politics (Indian political commentary)
- Technology, Culture, Entertainment
- Fiction (satirical narratives)

### Education (18 resources)
Structured educational content with hierarchical organization:
- Courses, Subjects, Modules, Units
- Math and data science content
- Interactive learning materials

## 🛠️ Available Commands

| Command | Action |
|---------|--------|
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview build locally |
| `npm run astro ...` | Run Astro CLI commands |

## 🎨 Design System

### Color Palette

**Light Mode:**
- Background: `#ffffff`
- Text: `#1a1a1a`
- Primary: `#1B2A41` (Navy Blue)
- Secondary: `#C5A059` (Gold)

**Dark Mode:**
- Background: `#1F2023` (Dark Charcoal)
- Text: `#e2e8f0`
- Primary: `#ffffff`
- Secondary: `#C5A059` (Gold)

### Typography

- **Headings:** Carrois Gothic
- **Body:** Inter
- **Serif:** Playfair Display
- **Monospace:** Fira Code
- **Handwritten:** Kalam

## 🔧 Technology Stack

- **Framework:** Astro 5.16.2
- **Content:** MDX 4.3.12
- **Styling:** Vanilla CSS
- **Charts:** Chart.js 4.5.1
- **Math:** KaTeX (rehype-katex, remark-math)
- **Diagrams:** Mermaid 11.12.1
- **Search:** Fuse.js 7.1.0
- **PWA:** vite-plugin-pwa 1.2.0

## � Build Statistics

- **Components:** 54
- **Content Files:** 77 (33 blog + 26 stories + 18 education)
- **Pages Generated:** 132
- **Build Time:** ~7 seconds
- **Build Output:** 6.1 MB (precached)

## 🌐 Deployment

The site is configured for GitHub Pages deployment:

```bash
# Build the site
npm run build

# Deploy dist/ folder to GitHub Pages
```

**Site URL:** `https://civicthesis.github.io/`

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for:
- Development workflow
- Git command reference
- Code style guidelines
- Component creation guide
- Pull request process

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Design inspiration from The Onion and VOX Media
- Astro framework and community
- All open-source dependencies

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**Built with ❤️ using Astro**
