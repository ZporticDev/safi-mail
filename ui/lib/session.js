import crypto from 'crypto'

const SECRET = process.env.ADMIN_SECRET || 'change_this_secret'
const MAX_AGE = 1000 * 60 * 60 * 24 // 1 day

export function signToken(user){
  const ts = Date.now().toString()
  const payload = `${user}|${ts}`
  const hmac = crypto.createHmac('sha256', SECRET).update(payload).digest('hex')
  return Buffer.from(`${payload}|${hmac}`).toString('base64')
}

export function verifyToken(token){
  try {
    const raw = Buffer.from(token, 'base64').toString()
    const [user, ts, hmac] = raw.split('|')
    const payload = `${user}|${ts}`
    const expected = crypto.createHmac('sha256', SECRET).update(payload).digest('hex')
    const ok = crypto.timingSafeEqual(Buffer.from(hmac), Buffer.from(expected))
    if(!ok) return null
    if((Date.now() - Number(ts)) > MAX_AGE) return null
    return { user }
  } catch(e){
    return null
  }
}
