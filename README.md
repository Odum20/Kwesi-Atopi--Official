# Kwesi Odum — Digital Workspace & Portfolio (`odum.dev`)

> Production-grade digital workspace, portfolio, and experimentation laboratory showcasing full-stack engineering systems, automated pipelines, fintech telemetry, geospatial intelligence (GIS), and interactive WebGL shaders.

![Portfolio Preview](https://res.cloudinary.com/dukipuswv/image/upload/v1790449072/85b8ad62-abb3-405a-9a6f-09880e2e113a_yfttez.png)

---

## 🚀 Overview

**Odum.dev** is a high-performance personal engineering portfolio and interactive workspace designed with meticulous typographic hierarchy, zero-pill aesthetic discipline, and fluid dark-mode design principles. It features real-time synchronization with Google Firebase Firestore, a secure hidden admin dashboard (`Ctrl + Alt + A`), custom WebGL/Canvas micro-animations, and dynamic case study drawers.

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS (v4)
- **Icons & UI Elements**: Lucide React, Custom Canvas Animations
- **Backend & Persistence**: Google Firebase Firestore (Real-time `onSnapshot` subscriptions)
- **State Management & Loading**: Custom React Hooks with animated Cyberpunk **"K" circuit preloaders**
- **SEO & Social Optimization**: OpenGraph preview cards, Twitter large image cards, Schema.org JSON-LD (`Person` & `ProfilePage` structured data), `robots.txt`, and XML sitemap.

---

## ✨ Key Features

1. **Live Firestore Integration**:
   - Zero hardcoded mock data flash.
   - Real-time synchronization of production projects (e.g., *Mfasomu*, *Automated Pipelines*, *Automotive Fintech*, *Environmental Intelligence*) and laboratory prototypes.
2. **Cyberpunk "K" Circuit Preloaders**:
   - Custom HTML5 Canvas vector preloader animating circuit paths and glowing nodes during asynchronous image resolution and initial dataset syncs.
3. **Secret Admin Dashboard**:
   - Hidden administrative control panel unlocked via keyboard shortcut (`Ctrl + Alt + A`).
   - Enables secure publishing, editing, and deleting of projects and experiments with live cloud persistence and instant preloader feedback on image uploads/URLs.
4. **Comprehensive Case Studies**:
   - Interactive deep-dive modal drawers breaking down technical challenges, architectures, live URLs, and GitHub repositories for each project.
5. **Advanced Search Engine Optimization (SEO)**:
   - Configured with canonical links, Google Knowledge Graph entities (`sameAs` links to GitHub, LinkedIn, and TikTok), and optimized `robots.txt` / `sitemap.xml` for Bing, Google, and AI search crawlers.

---

## 📂 Project Structure

```text
├── public/
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/       # UI Components (Navbar, Hero, WorkSection, ExperimentsSection, AdminModal, ProjectDetailModal, KPreloader, ProjectImage, etc.)
│   ├── config/           # Contact and environment configurations
│   ├── data/             # Static reference datasets
│   ├── hooks/            # Custom React hooks (useProjects)
│   ├── lib/              # Firebase initialization and asset resolution utilities
│   ├── types/            # TypeScript interfaces and project models
│   ├── App.tsx           # Main application root and keyboard shortcut handlers
│   └── main.tsx          # Application entry point
├── firestore.rules       # Secure Firebase Firestore security rules
└── metadata.json         # Applet & capability metadata
