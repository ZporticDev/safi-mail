import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Login() {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState(null)
  const r = useRouter()

  async function submit(e){
    e.preventDefault()
    setError(null)
    const res = await fetch('/api/login', {method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify({user, pass})})
    if(res.ok){ r.push('/') } else { const j = await res.json().catch(()=>({message:'Login failed'})); setError(j.message) }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <form onSubmit={submit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl mb-4">Admin Girişi</h1>
        <label className="block mb-2">Kullanıcı</label>
        <input value={user} onChange={e=>setUser(e.target.value)} className="border p-2 w-full rounded mb-3" />
        <label className="block mb-2">Şifre</label>
        <input type="password" value={pass} onChange={e=>setPass(e.target.value)} className="border p-2 w-full rounded mb-3" />
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Giriş</button>
      </form>
    </div>
  )
}
