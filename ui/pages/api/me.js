import { verifyToken } from '../../lib/session'

export default function handler(req, res){
  const cookie = req.headers.cookie || ''
  const m = cookie.split(';').map(s=>s.trim()).find(s=>s.startsWith('safi_admin='))
  if(!m) return res.status(401).json({message:'Not authenticated'})
  const token = m.split('=')[1]
  const v = verifyToken(token)
  if(!v) return res.status(401).json({message:'Invalid token'})
  res.json({user: v.user})
}
