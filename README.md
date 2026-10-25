# Mohamed Sabry — Portfolio, Admin Panel & AI Assistant

Personal portfolio for **Mohamed Sabry**, Front-End Software Engineer, with a built-in admin panel and a visitor-facing AI assistant. All content comes from the CV and can be edited from the admin panel.

## Tech stack

- **React 19**: `use()`, `useActionState`, `useFormStatus`, `useOptimistic`, `useTransition`, `useDeferredValue`, `<Context value>` providers, `ref` as a prop, and document metadata (`<title>`/`<meta>` rendered inside components)
- **Context API**: language (RTL/LTR), theme, auth, toasts, chat widget
- **RTL**: full English / Arabic switch (`dir="rtl"`, logical CSS utilities, Cairo font)
- **Redux Toolkit + Redux Persist**: portfolio content, messages, chat history, agent settings, admin settings
- **Tailwind CSS v4 + Less**: Tailwind for layout and utilities, Less for gradients, animations, the chat widget and the admin shell
- **Vite + TypeScript**, **Vitest + React Testing Library**, **oxlint**
- **Express** API (optional) that streams responses from an OpenAI-compatible LLM

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173 (start the API repo on :8787 for backend features)
```

| Script | Description |
| --- | --- |
| `npm run dev` | Vite dev server |
| `npm run build` | Type-check and production build |
| `npm test` | Vitest + React Testing Library |
| `npm run lint` | oxlint |

## Backend (separate repo)

The Node.js + Express + MongoDB backend lives in **[mohamed-sabry-portfolio-api](https://github.com/MohamedSabry000/mohamed-sabry-portfolio-api)**. It stores portfolio content, contact messages, chat logs and admin accounts in MongoDB and exposes CRUD endpoints for every collection (see that repo's README).

- **Local dev:** run the API on `http://localhost:8787` (`npm run dev` in the API repo). The Vite dev server proxies `/api` to it.
- **Hosted API:** build with `VITE_API_URL=https://<api-host>`; all requests (`src/lib/api.ts`, `src/agent/agentService.ts`, `src/agent/sanityContent.ts`) then go to `<api-host>/api`. The API must list this site's origin in `CORS_ORIGINS`.
- Admin login returns a JWT (8 hours). While signed in, each admin action calls the matching CRUD endpoint (`src/store/backendSync.ts`), and all visitors load the content from `GET /api/portfolio`.
- **Without a backend** (GitHub Pages without `VITE_API_URL`, or the API is down) the site falls back to the built-in content and browser-only storage.

## Developer guide

### Project structure

```
src/
  admin/            Admin panel: layout, pages and the generic collection editor
    collectionSchemas.ts   Field definitions for every editable collection
  agent/            AI assistant
    intents.ts      Keyword-based intent detection (English/Arabic)
    matching.ts     Finds mentioned projects, technologies and FAQ entries
    localAgent.ts   Builds answers for the built-in (offline) engine
    agentService.ts Chooses between the LLM API and the local engine
    knowledge.ts    System prompt / knowledge base for the LLM
    sanityContent.ts, sanityShared.ts   Loads assistant content from Sanity
  components/       UI building blocks, layout, public sections, chat widget, blog
  context/          React contexts: language (RTL), theme, auth, toast, chat UI
  data/             Seed content: CV data, blog posts, FAQs, interview series
  i18n/             English and Arabic UI strings
  lib/              Small helpers (utils, blog, api client for the backend)
  pages/            Route components (portfolio, blog list/post, 404)
  store/            Redux Toolkit slices, Redux Persist setup and migrations
  types/            Shared TypeScript types
studio/             Sanity Studio (schemas for the assistant content)
```

### Data flow

Seed data in `src/data` is the initial Redux state. Redux Persist saves it to `localStorage`, and the admin panel edits it through `portfolioSlice` actions (`upsertItem`, `removeItem`, `moveItem`, ...). Public sections read it with `useAppSelector`.

### Common tasks

- **Add a UI string:** add the key to both `en` and `ar` in `src/i18n/translations.ts`, then use `t('your.key')`.
- **Add an editable collection:** add the type to `src/types`, the seed data to `src/data`, the key to `CollectionKey`, a schema to `src/admin/collectionSchemas.ts`, and a route and nav item in `App.tsx` / `AdminLayout.tsx`.
- **Change seed data for existing visitors:** bump `version` in `src/store/index.ts` and add a migration in `src/store/migrations.ts`.
- **Teach the built-in assistant a new topic:** add keywords to `src/agent/intents.ts` and a reply in `localAgent.ts`, or simply add an FAQ entry in Sanity.

### Checks

```bash
npm run typecheck && npm test && npm run lint && npm run build
```

## Deploy to Vercel

The front end and the [API](https://github.com/MohamedSabry000/mohamed-sabry-portfolio-api) are two Vercel projects.

1. Deploy the API repo first (see its README) and note its URL, e.g. `https://mohamed-sabry-portfolio-api.vercel.app`.
2. Vercel → Add New → Project → import this repo. `vercel.json` sets the Vite build, the `dist` output and the SPA fallback (direct links like `/blog/...` load the app).
3. Environment variable: `VITE_API_URL` = the API URL from step 1. It is baked in at build time, so redeploy after changing it.
4. Add this project's domain to the API's `CORS_ORIGINS` (e.g. `https://mohamed-sabry-portfolio.vercel.app`, or `https://*.vercel.app` to include previews).

## Deploy to GitHub Pages

Live site: https://mohamedsabry000.github.io/mohamed-sabry-portfolio/

```bash
npm run build:pages   # static build with base /mohamed-sabry-portfolio/ and a 404.html SPA fallback
VITE_API_URL=https://<api-host> npm run build:pages   # same, connected to the hosted API
```

Then publish `dist/` to the `gh-pages` branch. Without `VITE_API_URL` the Pages build has no API, so the assistant uses the built-in engine and reads Sanity content straight from Sanity's CDN. For that to work, add `https://mohamedsabry000.github.io` as a CORS origin (credentials not needed) in sanity.io/manage → API. OpenAI answers, chat logging and central content need the API repo deployed on a Node host.

## Admin panel

Go to `/admin`. Default credentials: **admin / admin123**. Change them under **Settings** right away.

From the admin panel you can:

- Edit the profile (English and Arabic), stats, and availability
- Add, edit, delete, and reorder experience, projects, skills, education, certificates, and languages
- Write blog posts (English and Arabic, Markdown) and manage FAQ entries
- Show or hide sections of the public site
- Configure the AI assistant (name, greeting, mode, instructions, suggested prompts)
- Read contact messages and visitor chat logs
- Export, import, or reset all portfolio data as JSON

> Admin authentication and data persistence happen in the browser (Redux Persist → localStorage). Content edited in the admin panel is stored per browser. Use **Export JSON** to back it up or move it between browsers.

## Blog & FAQ

- `/blog` lists published posts with search and tag filters; `/blog/:slug` shows a post. The latest 3 posts also appear on the home page.
- Posts are written in a safe Markdown subset (headings, lists, links, code blocks, quotes). Raw HTML is not rendered.
- The FAQ section is an accessible accordion. The AI assistant answers matching questions from the FAQ and can list blog articles.

## Sanity CMS for the AI assistant

The assistant's settings and an extra knowledge base can be managed in [Sanity](https://www.sanity.io). The Studio lives in `studio/`.

| Document | Purpose |
| --- | --- |
| **Assistant settings** (singleton) | Name, greeting, response engine, extra AI instructions, suggested questions. Values set here override the admin panel. |
| **FAQ** | The existing `faq` documents (plain English question/answer, keywords, category, priority) are used as assistant knowledge too. |
| **Knowledge base** | Bilingual question/answer pairs with optional trigger keywords. The built-in engine answers matching questions with them, and they are added to the AI model prompt. |
| **Visitor conversations** | Read-only log of visitor chats (only when `SANITY_WRITE_TOKEN` is set). |

Setup:

1. Create a project at [sanity.io/manage](https://www.sanity.io/manage) (or run `npx sanity init` inside `studio/`) and note the project ID.
2. Install and run the Studio:
   ```bash
   cd studio && npm install
   SANITY_STUDIO_PROJECT_ID=<id> npm run dev   # http://localhost:3333
   ```
   Or deploy it with `npm run deploy` inside `studio/`.
3. Optionally seed the settings and starter knowledge from the portfolio data: `SANITY_STUDIO_PROJECT_ID=<id> npm run studio:seed` (uses your `sanity login` session).
4. Set `SANITY_PROJECT_ID` (and `SANITY_DATASET`) for the API server. Add `SANITY_WRITE_TOKEN` (an Editor token) to save visitor chats.

The browser never talks to Sanity directly: the API server reads the content (`GET /api/assistant`, cached for 60 seconds) and writes chat logs (`POST /api/chat/log`). Conversation documents use private IDs (`aiConversation.<session>`) so they are not readable from the public dataset API. If Sanity is not configured, the assistant uses the admin panel settings.

## AI assistant

The chat widget always works offline: a local engine answers questions in English or Arabic using the portfolio data (skills, projects, experience, contact, CV, and more), and it can scroll to the relevant section.

To use a real LLM, create a `.env` file (or set environment variables) for the API server:

```bash
OPENAI_API_KEY=sk-...
OPENAI_BASE_URL=https://api.openai.com/v1   # any OpenAI-compatible endpoint
OPENAI_MODEL=gpt-4o-mini
CHAT_RATE_LIMIT=20                          # requests per minute per IP
```

The key stays on the server. In `auto` mode the widget streams LLM answers when the API is configured and falls back to the local engine otherwise.
