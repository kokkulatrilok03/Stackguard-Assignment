# StackGuard Frontend Assignment

A production-ready, frontend-only implementation using React + Vite + Tailwind CSS + shadcn-style UI + React Router + Zustand.

## Quick Start

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build → dist/
npm run preview   # preview the build
```

## Tech Stack
- React (Vite)
- Tailwind CSS
- shadcn-style UI primitives (Button, Card, Input, Label, Toaster)
- React Router v6
- Zustand (persisted to localStorage)
- Framer Motion + Sonner (UX)

## Project Structure
```
src/
  components/
    AuthForm.jsx
    InputField.jsx
    Logo.jsx
    ui/
      button.jsx
      card.jsx
      input.jsx
      label.jsx
      toaster.jsx
  pages/
    AuthPage.jsx
    ConfigPage.jsx
    DashboardPage.jsx
  store/
    useAuthStore.js
  utils/
    validateKey.js
  App.jsx
  router.jsx
  main.jsx
  index.css
```

## Routing & Guards
- `/auth` (public): Sign In / Sign Up toggle with validation
- `/config` (protected): requires `user`; validates key length 100–1000, saves as `configKey`
- `/dashboard` (private): requires `configKey`

## State (Zustand)
```js
{ user: null, configKey: null, login(user), logout(), setConfigKey(key) }
```
Persisted under `stackguard-auth` in localStorage to survive refresh.

## Design
- Split layout per Figma: large left panel, right card with logo and form
- Inputs: grey fill by default, purple fill on focus, no borders
- Accessible, responsive, subtle motion and toasts

## Deploy (Vercel)
- Build command: `npm run build`
- Output directory: `dist`

## Notes
- Only essential files are included; defaults/assets from Vite were removed
- Code follows a minimal, reusable component approach and clean imports
