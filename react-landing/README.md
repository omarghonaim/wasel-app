# Wasel React Landing

Standalone Vite + React + Tailwind marketing site, served by Laravel at the domain root (`/`) from `public/react-landing/`.

## Commands

```bash
cd react-landing
npm install
npm run dev      # http://127.0.0.1:5173 (API proxied to :8000)
npm run build    # writes to ../public/react-landing
```

After `npm run build`, open `http://127.0.0.1:8000/` (or `https://wasel.com/`) — no redirect.

## Settings / logo

Logo and business settings load from:

- `VITE_CONFIG_ENDPOINT` (default `/api/v1/config`)
- Mapped as `settings.logo` from `logo_full_url`

No local logo imports. Changing the logo in Admin updates the site after refresh.

## Structure

```
src/
  api/           # HTTP client + config mapping
  components/
    Button/
    Header/
    Hero/
  hooks/
  pages/Home.tsx
  types/
```
