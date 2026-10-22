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
- Show or hide sections of the public site
- Configure the AI assistant (name, greeting, mode, instructions, suggested prompts)
- Read contact messages and visitor chat logs
- Export, import, or reset all portfolio data as JSON

> Admin authentication and data persistence happen in the browser (Redux Persist → localStorage). Content edited in the admin panel is stored per browser. Use **Export JSON** to back it up or move it between browsers.

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
