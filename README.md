# fujiwaras.com

Personal creative lab — R3F/WebGPU experiments published as I learn in public.

[fujiwaras.com](https://fujiwaras.com) is a sparse index of lab experiments. Each one is a full-screen canvas page at `/lab/NNN-name`.

---

## Stack

| Package | Version | Purpose |
| --- | --- | --- |
| Vite | 8 | Build tooling |
| React | 19 | UI |
| TypeScript | 6 | Strict types throughout |
| @react-three/fiber | 10 alpha (WebGPU) | React renderer for Three.js — import from `/webgpu` |
| @react-three/drei | 11 alpha | Helpers: `Text3D`, `Center`, `OrbitControls`, `useGLTF` |
| three | 0.184+ | Core 3D engine |
| wouter | 3 | Lightweight SPA router (~1.5KB, no provider needed) |
| maath | 0.10 | Math/easing utilities from the pmnd.rs ecosystem |

WebGPU renderer requires Chrome 113+ / Edge. No Safari support yet.

---

## Getting Started

```bash
nvm use          # node v22.22.2
npm install
npm start
```

---

## Scripts

```bash
npm run dev        # local dev server
npm run build      # production build
npm run preview    # preview build locally
npm run typecheck  # tsc --build (type check without emitting)
npm run lint       # eslint
npm run lint:fix   # eslint --fix
```

---

## Architecture

```text
src/
  lab/
    toc.ts                ← experiment registry (TocEntry[]: slug, url, title, date, description)
    lab.css               ← shared canvas reset
    001-sagarifuji/       ← index.tsx + Sagarifuji.tsx + Fujiwara.tsx
    002-rainbow-swarm/    ← index.tsx + RainbowMaterial.ts
    003-stage/            ← index.tsx
  home/
    index.tsx             ← sparse landing page (are.na aesthetic)
    home.css
  main.tsx                ← wouter router
  vite-env.d.ts           ← CSS module types + Vite client globals
public/
  sagarifuji.glb
  fujiwara.glb
  hitter.glb
  Russo_One.json
  404.html                ← copy of index.html for GitHub Pages SPA routing
```

Each lab experiment is fully self-contained — its own `index.tsx` and any co-located components.

**Adding experiment 004:** create `src/lab/004-name/index.tsx`, add one entry to `src/lab/toc.ts`, add one `<Route>` in `src/main.tsx`.

---

## Deployment

**Push to `main` → GitHub Actions builds and publishes automatically.**

Workflow: `.github/workflows/deploy.yml` — runs `npm ci && npm run build`, uploads `dist/` as a Pages artifact, deploys via `actions/deploy-pages`. Requires GitHub repo Settings → Pages → Source set to **"GitHub Actions"**.

Custom domain `fujiwaras.com`. DNS at Dreamhost (A records → GitHub Pages IPs). `public/CNAME` keeps the custom domain pinned after each deploy.

`public/404.html` is identical to `index.html` — GitHub Pages serves it for any path that doesn't match a static file, letting wouter handle the route.

---

## 3D Asset Pipeline

SVG → Blender (import, extrude, export `.glb`) → [gltfjsx](https://gltf.pmnd.rs/) → React component.

Used for: `sagarifuji.glb`, `fujiwara.glb`, `hitter.glb`.

### Blender GLB export steps

1. Import SVG → hit `S` to scale up → `Ctrl+J` to join shapes
2. `Tab` → edit mode → `A` select all → `E` extrude
3. Rotate X axis 90° → remove material → export as `.glb`
4. Drop in `public/`, run through [gltf.pmnd.rs](https://gltf.pmnd.rs/) to generate the React component

### Font pipeline

Download TTF from Google Fonts → convert to JSON via [facetype.js](https://gero3.github.io/facetype.js/) → drop in `public/`.
