# Admin UI — shadcn-ready (admin.safi.com)

Bu doküman, `ui/` klasöründe bulunan Next.js admin iskeletini açıklıyor. İleride `shadcn` bileşenleri ile zenginleştirilmeye hazır.

## Hızlı kurulum
1. ```
   cd ui
   npm install
   ```
2. `.env` oluşturun (örnek aşağıda) ve gerekli değerleri ayarlayın.
3. Admin şifresi için hash üretin:
   ```
   node scripts/gen_admin_hash.js "YOUR_PASSWORD"
   # Çıktıyı ADMIN_PASS_HASH olarak .env'e koyun
   ```
4. Geliştirme:
   ```
   npm run dev
   # http://localhost:3000
   ```

## Örnek `.env` (ui/.env)
- `ADMIN_USER=admin`
- `ADMIN_PASS_HASH=$2a$12$...` (bcrypt hash)
- `ADMIN_SECRET=long_random_secret` (HMAC için)
- `ADMIN_HOSTNAME=admin.safi.com`

## Güvenlik & Notlar
- `ADMIN_PASS_HASH` direkt şifre değil; üretmek için `node scripts/gen_admin_hash.js` kullanın.
- `ADMIN_SECRET` güçlü bir rastgele dize olmalıdır.
- Production için `Secure` cookie opsiyonunu enabled bırakın (NODE_ENV=production).

## shadcn entegrasyonu
- Bu scaffold Tailwind ile hazır; `shadcn` CLI ile bileşenleri eklemek için aşağıdaki adımları izleyin:
  - `npx shadcn-ui@latest init` (ui içinde)
  - `npx shadcn-ui@latest add button` vb.

## Deploy önerisi
- `ui`'yi Docker image olarak build edip reverse proxy (traefik/nginx) ile `admin.safi.com`'a yönlendirin.
- Mailcow ile güvenli iletişim için aynı internal network üzerinde olması önerilir.

## PR Preview (Vercel & Netlify)
Bu repo için PR açıldığında otomatik preview deploy yapmak üzere GitHub Action'lar ekledim. İki seçenek mevcuttur:

### Vercel (preview)
- Workflow: `.github/workflows/preview_vercel.yml`
- Gerekli repo secret'lar:
  - `VERCEL_TOKEN` — Vercel account token
  - `VERCEL_ORG_ID` — Vercel org id
  - `VERCEL_PROJECT_ID` — Vercel project id
- Her PR açıldığında UI build edilip Vercel'e preview deploy edilip PR üzerine preview URL'si yorum olarak eklenecektir.

### Netlify (serverful Next.js preview)
- Workflow: `.github/workflows/preview_netlify.yml` — **Netlify Next.js plugin** kullanarak serverful preview oluşturur (API route'ları dahil).
- Gerekli repo secret'lar:
  - `NETLIFY_AUTH_TOKEN` — Netlify personal access token
  - `NETLIFY_SITE_ID` — Netlify site ID
- Ayrıca repo kökünde `netlify.toml` bulunmaktadır ve `@netlify/plugin-nextjs` kullanılır.
- Workflow otomatik olarak `netlify build` çalıştırır, oluşan `.netlify/output/public` dizinini Netlify'e deploy eder ve PR üzerine preview URL'sini yorum olarak ekler.

Notlar:
- Vercel preview daha basit kurulum sağlarken Netlify config ile API route'larını içeren serverful preview imkanı verir.
- Hangi servisi kullanmak istediğinizi seçin; ben isterseniz Netlify ayarlarını (site oluşturma, token alma, site id alma) adım adım yönlendiririm.
