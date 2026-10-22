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
