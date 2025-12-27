export default function handler(req, res){
  res.setHeader('Set-Cookie', `safi_admin=deleted; HttpOnly; Path=/; Max-Age=0; SameSite=Lax`)
  res.json({ok:true})
}
