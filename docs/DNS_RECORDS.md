# DNS Kayıt Şablonları — safi.com

Aşağıda `safi.com` için gerekli temel DNS kayıt şablonları bulunmaktadır. `<YOUR_SERVER_IP>` ile gerçek sunucu IP'nizi değiştirin.

## 1) A kaydı
- `mail.safi.com. A <YOUR_SERVER_IP>`

## 2) MX kaydı
- `safi.com. MX 10 mail.safi.com.`

## 3) SPF (TXT)
- `safi.com. TXT "v=spf1 mx a ip4:<YOUR_SERVER_IP> -all"`

## 4) DKIM (TXT)
- DKIM selector Mailcow tarafından üretilirse, Mailcow UI size bir TXT satırı verecektir.
- Eğer manuel oluşturduysanız (örneğin selector `mail`):

  `mail._domainkey.safi.com. TXT "v=DKIM1; k=rsa; p=<PUBLIC_KEY>"`

  (Public key tek satıra sıkıştırılmış ve `p=` alanına konmalı)

## 5) DMARC (TXT)
- ` _dmarc.safi.com. TXT "v=DMARC1; p=quarantine; rua=mailto:postmaster@safi.com; ruf=mailto:postmaster@safi.com; pct=100;"`

## 6) PTR (Reverse DNS)
- Sağlayıcınızın (VPS/hosting) kontrol panelinde IP için PTR olarak `mail.safi.com` ayarlayın.

## 7) Notlar
- Port 25 outbound ve inbound kontrol edin.
- DNS değişiklikleri TTL'e bağlı olarak yayılabilir (0-48 saat).
- DKIM ve SPF doğruluğunu `mail-tester.com` ve `MXToolbox` ile kontrol edin.
