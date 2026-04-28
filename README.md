# fujiwaras.com

Personal creative lab — R3F/WebGPU experiments published as I learn in public.

[fujiwaras.com](https://fujiwaras.com) is a sparse index of lab experiments. Each one is a full-screen canvas page at `/lab/NNN-name`.

---

## Stack

| Package | Purpose |
| --- | --- |
| Vite 6 + React 19 | Build tooling and UI |
| @react-three/fiber v9 | React renderer for Three.js (WebGPU-ready) |
| @react-three/drei | Helpers: `Text3D`, `Center`, `OrbitControls`, `useGLTF` |
| @react-three/postprocessing | Bloom, Vignette, etc. |
| three 0.173+ | Core 3D engine |
| wouter v3 | Lightweight SPA router (~1.5KB, no provider needed) |
| maath | Math/easing utilities from the pmnd.rs ecosystem |

---

## Getting Started

```bash
nvm use          # node v22.22.2
npm install
npm start
```

---

## Architecture

```text
src/
  lab/
    index.js              ← experiment registry (slug, title, date, description)
    lab.css               ← shared canvas reset
    001-sagarifuji/       ← App.jsx + co-located assets
    002-rainbow-swarm/    ← App.jsx + co-located assets
  home/
    index.jsx             ← sparse landing page (Libre Franklin, are.na aesthetic)
    home.css
  main.jsx                ← wouter router
public/
  sagarifuji.glb
  fujiwara.glb
  Russo_One.json
  404.html                ← copy of index.html for GitHub Pages SPA routing
```

Each lab experiment is fully self-contained — its own `index.jsx` and any co-located asset components.

**Adding experiment 003:** create `src/lab/003-name/index.jsx`, add one object to `src/lab/index.js`, add one `<Route>` in `src/main.jsx`.

---

## Deployment

GitHub Pages, branch `main`, custom domain `fujiwaras.com`. DNS at Dreamhost.

`public/404.html` is identical to `index.html` — GitHub Pages serves it for any path that doesn't match a static file, letting wouter handle the route.

---

## 3D Asset Pipeline

SVG → Blender (import, extrude, export `.glb`) → [gltfjsx](https://gltf.pmnd.rs/) → React component.

Used for: `sagarifuji.glb`, `fujiwara.glb`. Social icon SVGs are loaded at runtime via Three.js `SVGLoader`.

### Blender GLB export steps

1. Import SVG → hit `S` to scale up → `Ctrl+J` to join shapes
2. `Tab` → edit mode → `A` select all → `E` extrude
3. Rotate X axis 90° → remove material → export as `.glb`
4. Drop in `public/`, run through [gltf.pmnd.rs](https://gltf.pmnd.rs/) to generate the React component

### Font pipeline

Download TTF from Google Fonts → convert to JSON via [facetype.js](https://gero3.github.io/facetype.js/) → drop in `public/`.
