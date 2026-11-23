import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'

// `hasApiUrl` is read from VITE_API_URL when modules load, so each test stubs the env and re-imports.
async function renderLogin(apiUrl: string, fetchImpl: typeof fetch) {
  vi.stubEnv('VITE_API_URL', apiUrl)
  vi.stubGlobal('fetch', vi.fn(fetchImpl))
  vi.resetModules()
  const [{ renderWithProviders }, { default: LoginPage }] = await Promise.all([import('../../test/utils'), import('./LoginPage')])
  renderWithProviders(<LoginPage />, { route: '/admin/login' })
}

async function signIn(username: string, password: string) {
  const user = userEvent.setup()
  await user.type(screen.getByLabelText('Username'), username)
  await user.type(screen.getByLabelText('Password'), password)
  await user.click(screen.getByRole('button', { name: 'Sign in' }))
}

const networkDown = () => Promise.reject(new TypeError('Failed to fetch'))

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

describe('LoginPage with a configured backend', () => {
  it('does not fall back to the browser-only default login when the server is unreachable', async () => {
    await renderLogin('https://api.example.com', networkDown)
    expect(screen.queryByText(/admin123/)).not.toBeInTheDocument()
    await signIn('admin', 'admin123')
    expect(await screen.findByRole('alert')).toHaveTextContent('The server is unavailable')
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
  })

  it('tells the user when sign-in is rate limited', async () => {
    await renderLogin('https://api.example.com', async () => new Response('{"error":"rate_limited"}', { status: 429 }))
    await signIn('admin', 'whatever-password')
    expect(await screen.findByRole('alert')).toHaveTextContent('Too many sign-in attempts')
  })
})

describe('LoginPage without a backend', () => {
  it('keeps the browser-only login for static builds and local previews', async () => {
    await renderLogin('', networkDown)
    expect(screen.getByText(/admin123/)).toBeInTheDocument()
    await signIn('admin', 'admin123')
    // Signed in: the page redirects away from the form.
    await vi.waitFor(() => expect(screen.queryByLabelText('Password')).not.toBeInTheDocument())
  })
})
