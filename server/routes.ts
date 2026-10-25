// REST API backed by MongoDB: portfolio content, contact messages, chat logs and admin auth.
import { Router, type Response } from 'express'
import { isValidObjectId } from 'mongoose'
import { login, requireAdmin, updateCredentials, type AuthedRequest } from './auth.ts'
import { ChatLogModel, isDbConnected, MessageModel, PortfolioModel } from './db.ts'

export const api = Router()

const requireDb = (_req: unknown, res: Response, next: () => void) => {
  if (isDbConnected()) next()
  else res.status(503).json({ error: 'database_unavailable' })
}

const text = (value: unknown, max: number) => String(value ?? '').trim().slice(0, max)
const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

// --- Auth ---
api.post('/auth/login', requireDb, async (req, res) => {
  const token = await login(text(req.body?.username, 100), String(req.body?.password ?? ''))
  if (!token) return void res.status(401).json({ error: 'invalid_credentials' })
  res.json({ token })
})

api.get('/auth/me', requireAdmin, (req: AuthedRequest, res) => res.json({ username: req.admin?.username }))

api.put('/auth/credentials', requireDb, requireAdmin, async (req: AuthedRequest, res) => {
  const username = text(req.body?.username, 100)
  const password = String(req.body?.password ?? '')
  if (!username || password.length < 6) return void res.status(400).json({ error: 'invalid' })
  await updateCredentials(req.admin!.sub, username, password)
  res.status(204).end()
})

// --- Portfolio content (single document) ---
api.get('/portfolio', requireDb, async (_req, res) => {
  const doc = await PortfolioModel.findOne({ key: 'main' }).lean()
  if (!doc) return void res.status(404).json({ error: 'not_found' })
  res.json({ data: doc.data, updatedAt: doc.updatedAt })
})

api.put('/portfolio', requireDb, requireAdmin, async (req, res) => {
  const data = req.body?.data
  if (!data || typeof data !== 'object' || !data.profile) return void res.status(400).json({ error: 'invalid' })
  const doc = await PortfolioModel.findOneAndUpdate({ key: 'main' }, { data }, { upsert: true, new: true }).lean()
  res.json({ updatedAt: doc?.updatedAt })
})

// --- Contact messages ---
api.post('/messages', requireDb, async (req, res) => {
  const message = {
    name: text(req.body?.name, 120),
    email: text(req.body?.email, 200),
    subject: text(req.body?.subject, 200),
    message: text(req.body?.message, 5000),
  }
  if (!message.name || !isEmail(message.email) || !message.message) return void res.status(400).json({ error: 'invalid' })
  const doc = await MessageModel.create(message)
  res.status(201).json({ id: doc.id })
})

api.get('/messages', requireDb, requireAdmin, async (_req, res) => {
  const items = await MessageModel.find().sort({ createdAt: -1 }).limit(500).lean()
  res.json(items.map(({ _id, createdAt, name, email, subject, message, read }) => ({ id: String(_id), createdAt, name, email, subject, message, read })))
})

api.patch('/messages/:id', requireDb, requireAdmin, async (req, res) => {
  if (!isValidObjectId(req.params.id)) return void res.status(400).json({ error: 'invalid_id' })
  await MessageModel.findByIdAndUpdate(req.params.id, { read: Boolean(req.body?.read) })
  res.status(204).end()
})

api.delete('/messages/:id', requireDb, requireAdmin, async (req, res) => {
  if (!isValidObjectId(req.params.id)) return void res.status(400).json({ error: 'invalid_id' })
  await MessageModel.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

// --- Visitor chat logs ---
api.get('/chat-logs', requireDb, requireAdmin, async (_req, res) => {
  res.json(await ChatLogModel.find().sort({ createdAt: -1 }).limit(500).lean())
})

export async function saveChatLog(entry: { sessionId: string; lang: string; question: string; answer: string; source: string }) {
  if (isDbConnected()) await ChatLogModel.create(entry)
}
