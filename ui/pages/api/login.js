import bcrypt from 'bcryptjs'
import { signToken } from '../../lib/session'

export default async function handler(req, res){
  if(req.method !== 'POST') return res.status(405).end()
  const { user, pass } = req.body || {}
  const ADMIN_USER = process.env.ADMIN_USER
  const ADMIN_PASS_HASH = process.env.ADMIN_PASS_HASH
  if(!ADMIN_USER || !ADMIN_PASS_HASH) return res.status(500).json({message:'Admin not configured'})
  if(user !== ADMIN_USER) return res.status(401).json({message:'Invalid credentials'})
  const ok = await bcrypt.compare(pass, ADMIN_PASS_HASH)
  if(!ok) return res.status(401).json({message:'Invalid credentials'})
  const token = signToken(user)
  const secure = process.env.NODE_ENV === 'production'
  res.setHeader('Set-Cookie', `safi_admin=${token}; HttpOnly; Path=/; ${secure? 'Secure; ' : ''}SameSite=Lax; Max-Age=86400`)
  res.json({ok:true})
}
