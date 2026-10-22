import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import LoginPage from '../admin/pages/LoginPage'
import PortfolioPage from '../pages/PortfolioPage'
import { renderWithProviders } from '../test/utils'

describe('Portfolio page', () => {
  it('renders the hero in English (LTR)', async () => {
    renderWithProviders(<PortfolioPage />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Mohamed Sabry')
    await waitFor(() => expect(document.documentElement.dir).toBe('ltr'))
  })

  it('switches to Arabic with RTL direction', async () => {
    renderWithProviders(<PortfolioPage />)
    await userEvent.click(screen.getByRole('button', { name: 'Switch language' }))
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('محمد صبري')
    expect(document.documentElement.dir).toBe('rtl')
    expect(document.documentElement.lang).toBe('ar')
  })

  it('stores a contact message via the form action', async () => {
    const { store } = renderWithProviders(<PortfolioPage />)
    const user = userEvent.setup()
    await user.type(screen.getByLabelText('Your name'), 'Recruiter')
    await user.type(screen.getByLabelText('Your email'), 'hr@example.com')
    await user.type(screen.getByLabelText('Subject'), 'Job offer')
    await user.type(screen.getByLabelText('Message'), 'Hello Mohamed')
    await user.click(screen.getByRole('button', { name: 'Send message' }))
    await waitFor(() => expect(store.getState().messages.items).toHaveLength(1))
    expect(await screen.findByText(/Your message was sent/)).toBeInTheDocument()
  })

  it('chats with the AI agent (local engine)', async () => {
    renderWithProviders(<PortfolioPage />)
    const user = userEvent.setup()
    await user.click(await screen.findByRole('button', { name: 'Open AI assistant' }))
    await user.type(screen.getByLabelText(/Ask me anything/), 'What is his current role?')
    await user.click(screen.getByRole('button', { name: 'Send' }))
    expect(await screen.findByText(/currently works as/)).toBeInTheDocument()
  })
})

describe('Admin login', () => {
  it('rejects wrong credentials', async () => {
    renderWithProviders(<LoginPage />, { route: '/admin/login' })
    const user = userEvent.setup()
    await user.type(screen.getByLabelText('Username'), 'admin')
    await user.type(screen.getByLabelText('Password'), 'wrong')
    await user.click(screen.getByRole('button', { name: 'Sign in' }))
    expect(await screen.findByRole('alert')).toHaveTextContent('Invalid')
  })
})
