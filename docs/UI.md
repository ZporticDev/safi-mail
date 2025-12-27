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
