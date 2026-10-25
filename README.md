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
npm run dev        # web on http://localhost:5173 + API on http://localhost:8787
```

| Script | Description |
| --- | --- |
| `npm run dev` | Vite dev server + API server |
| `npm run build` | Type-check and production build |
| `npm start` | Serve the API and the built `dist/` from Express |
| `npm test` | Vitest + React Testing Library |
| `npm run lint` | oxlint |

## Backend: Node.js + MongoDB

The Express server in `server/` is the backend. With `MONGODB_URI` set it stores data in MongoDB (Mongoose):

| Collection | What it stores |
| --- | --- |
| `experiences`, `projects`, `skillgroups`, `education`, `certificates`, `languages`, `blog`, `faqs` | One document per item (`_id` = item id, `order` = position) |
| `site` | Single values: `profile`, `softSkills`, `sections` (visibility) |
| `messages` | Contact-form messages |
| `chatlogs` | Visitor questions and assistant answers |
| `admins` | Admin accounts (bcrypt-hashed passwords) |

An empty database is seeded with the CV content from `src/data` on first start.

```bash
docker compose up -d        # local MongoDB on port 27017
cp .env.example .env        # set MONGODB_URI, JWT_SECRET, ADMIN_USERNAME, ADMIN_PASSWORD
npm run build && npm start  # API + built site on http://localhost:8787
```

- The first admin account is created from `ADMIN_USERNAME` / `ADMIN_PASSWORD` on first start.
- Admin login returns a JWT (8 hours). While signed in, each admin action calls the matching CRUD endpoint (`src/store/backendSync.ts`), and all visitors load the content from `GET /api/portfolio`.
- Changing credentials in admin → Settings updates the account in MongoDB.
- Without a backend (GitHub Pages, or no `MONGODB_URI`) the site falls back to the built-in content and browser-only storage, as before.

| Endpoint | Auth | Purpose |
| --- | --- | --- |
| `POST /api/auth/login` | – | Get a JWT |
| `GET /api/auth/me` | admin | Current admin |
| `PUT /api/auth/credentials` | admin | Change username/password |
| `GET /api/portfolio` | – | All portfolio content in one response |
| `POST /api/portfolio/import` | admin | Replace all content (JSON import / reset) |
| `GET /api/profile`, `/api/softSkills`, `/api/sections` | – | Read a single value |
| `PUT /api/profile`, `/api/softSkills`, `/api/sections` | admin | Replace a single value |
| `GET /api/:collection` | – | List items in order (`experiences`, `projects`, `skillGroups`, `education`, `certificates`, `languages`, `blog`, `faqs`) |
| `GET /api/:collection/:id` | – | One item |
| `POST /api/:collection` | admin | Create an item (409 if the id exists) |
| `PUT /api/:collection/:id` | admin | Create or replace an item |
| `DELETE /api/:collection/:id` | admin | Delete an item |
| `PUT /api/:collection/order` | admin | Reorder: `{ "ids": [...] }` |
| `POST /api/messages` | – | Send a contact message |
| `GET /api/messages` | admin | List messages |
| `PATCH /api/messages/:id` / `DELETE /api/messages/:id` | admin | Mark read / delete |
| `GET /api/chat-logs` | admin | Visitor chat logs |

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
server/             Express API: MongoDB connection (db.ts), portfolio collections (portfolioStore.ts), auth (auth.ts), REST routes (routes.ts), LLM proxy, Sanity
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

## Deploy to GitHub Pages

Live site: https://mohamedsabry000.github.io/mohamed-sabry-portfolio/

```bash
npm run build:pages   # static build with base /mohamed-sabry-portfolio/ and a 404.html SPA fallback
```

Then publish `dist/` to the `gh-pages` branch. GitHub Pages has no API server, so on Pages the assistant uses the built-in engine and reads Sanity content straight from Sanity's CDN. For that to work, add `https://mohamedsabry000.github.io` as a CORS origin (credentials not needed) in sanity.io/manage → API. OpenAI answers and chat logging need the Express server (`npm start`) on a Node host.

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
