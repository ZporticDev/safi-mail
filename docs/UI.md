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

## PR Preview (Vercel)
Bu repo için PR açıldığında otomatik preview deploy yapmak için bir GitHub Action ekledim (`.github/workflows/preview_vercel.yml`). Preview çalışması için aşağıdaki repo secret'ları eklemeniz gerekir:

- `VERCEL_TOKEN` — Vercel account token
- `VERCEL_ORG_ID` — Vercel org id
- `VERCEL_PROJECT_ID` — Vercel project id

Ayarlar tamamlandığında her PR için UI build edilip Netlify veya Vercel'e preview deploy edilecek ve PR üzerine preview URL'si yorum olarak eklenecektir.

### Netlify preview (serverful Next.js)
Bu repo için PR açıldığında **Netlify Next.js plugin** kullanarak serverful preview deploy yapmak üzere bir GitHub Action ekledim (`.github/workflows/preview_netlify.yml`). Bu yapılandırma API route'larını da destekleyecek şekilde Netlify'in Next.js plugin'ini kullanır.

Gerekli repo secret'ları:
- `NETLIFY_AUTH_TOKEN` — Netlify personal access token
- `NETLIFY_SITE_ID` — Netlify site ID

Ayarlar tamamlandığında workflow otomatik olarak:
1. `netlify build` çalıştırır (repo kökünde `netlify.toml` kullanılır),
2. Oluşan `.netlify/output/public` dizinini Netlify'e deploy eder,
3. PR üzerine preview URL'sini yorum olarak ekler.

Notlar:
- `netlify.toml` köke eklendi ve `@netlify/plugin-nextjs` kullanılıyor.
- Netlify site ayarlarında ek konfig gerektirmez; ancak özel ortamlar veya Netlify ek pluginleri için site ayarlarınızı kontrol edin.
- Eğer isterseniz ben Netlify üzerinde tam yapılandırma adımlarını (site ayarı, token alma, site id bulma) adım adım gösterebilirim.

