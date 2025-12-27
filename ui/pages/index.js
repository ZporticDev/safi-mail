import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function Dashboard(){
  const [user, setUser] = useState(null)
  const r = useRouter()

  useEffect(()=>{
    fetch('/api/me').then(async res => {
      if(res.ok){ const j=await res.json(); setUser(j.user) } else { r.push('/login') }
    }).catch(()=>r.push('/login'))
  },[])

  if(!user) return <div className="p-8">Yükleniyor...</div>

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Merhaba, {user}</h1>
      <p className="mt-4">Bu panel Mailcow API ile entegrasyon için hazırlanmıştır. (shadcn bileşenleri eklenebilir)</p>
    </div>
  )
}
