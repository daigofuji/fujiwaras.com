# CLAUDE.md — fujiwaras.com

> Project-level context for this repo. Defer to `~/.claude/CLAUDE.md` for collaboration style and working agreement.
> Defer to `../CLAUDE.md` for portfolio-wide standards and 2030 north star.

---

## What This Repo Is

**`fujiwaras.com`** — personal/creative domain for the Fujiwara-Smith clan.
Previously named `r3f-playground`. Renamed and repurposed April 2026.

Two things live here:

1. **The home page** — are.na-style sparse index. White. Small type. Links into `/lab/`. No animation, no hero. Fast.
2. **The lab** — full-screen R3F/WebGPU experiments, shared publicly as a "learn in public" practice.

---

## North Star

Be known by Archie Tse and Jeremy Singer-Vine before applying to NYT.
Strategy: publish small R3F/drei experiments regularly → share to Bluesky → build reputation as the journalist-developer who makes beautiful 3D things and teaches as he goes.

---

## Architecture

```text
src/
  lab/
    001-sagarifuji/     ← rotating Sagarifuji emblem + clickable Fujiwara clan mark
    002-rainbow-swarm/  ← rainbow text + instanced particle swarm
    003-...             ← next experiment
  home/                 ← fujiwaras.com landing (are.na aesthetic)
  main.jsx              ← wouter router
```

Each lab experiment is a full-screen canvas page at `fujiwaras.com/lab/NNN-name`.
The home page is just a clean list linking to each experiment.

---

## Stack

- **Vite 6** + **React 19**
- **@react-three/fiber v9** — WebGPU-ready (import from `@react-three/fiber/webgpu`)
- **@react-three/drei** — helpers, controls, loaders
- **@react-three/postprocessing** — bloom, vignette, etc.
- **three 0.173+** — WebGPU renderer available
- **wouter** — lightweight client-side router
- **GitHub Pages** — hosting, custom domain `fujiwaras.com`

---

## Key Commands

```bash
npm run dev      # local dev server
npm run build    # production build
npm run preview  # preview build locally
```

---

## Design Principles

- **Home page**: are.na sparse. No R3F on the index. Pure HTML/CSS. Loads instantly.
- **Lab pages**: full-screen canvas, no chrome, immersive.
- **Aesthetic**: NYT-minimalist meets luxury brand. Restraint on the index, expression in the lab.
- **Mobile**: lab experiments should degrade gracefully on mobile.

---

## 3D Asset Pipeline

SVG → Blender (import SVG, extrude/solidify, export `.glb`) → [gltfjsx](https://gltf.pmnd.rs/) → React component.

Used for: Sagarifuji emblem (`/public/sagarifuji.glb`), Fujiwara clan mark (`/public/fujiwara.glb` or similar).
Social icon SVGs (`public/svgs/`) are loaded directly via Three.js `SVGLoader` and extruded at runtime — no Blender step needed for those.

---

## WebGPU Notes

- Import `Canvas` from `@react-three/fiber/webgpu` (not the default entrypoint)
- Requires Chrome 113+ / Edge. No Safari support yet as of early 2026.
- Falls back gracefully — consider a WebGL fallback or a clear browser notice.

---

## Lab Index

| # | Name | Status | URL |
| --- | --- | --- | --- |
| 001 | Sagarifuji | ✅ done | `/lab/001-sagarifuji` |
| 002 | Rainbow swarm | ✅ done | `/lab/002-rainbow-swarm` |

---

## Deployment

- GitHub Pages, branch: `main`
- Custom domain: `fujiwaras.com` (CNAME in repo root)
- DNS: Dreamhost → GitHub Pages IPs
- `404.html` = copy of `index.html` (for SPA routing on GitHub Pages)
