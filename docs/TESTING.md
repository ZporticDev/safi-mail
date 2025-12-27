# Test & Doğrulama Planı

1) DNS Kontrolleri
- MX kaydı: MXToolbox ile `safi.com` için MX doğrulaması yapın.
- DKIM/SPF/DMARC: DNS'teki kayıtları doğrulayın.

2) Mail-tester
- mail-tester.com adresinden bir test maili gönderin ve puanı en az 8/10 hedefleyin.

3) SMTP Tesleri
- `openssl s_client -crlf -connect mail.safi.com:25 -starttls smtp` ile TLS testleri

4) Delivery Testleri
- Farklı sağlayıcılara (Gmail, Outlook) test mailleri gönderin, spam klasörüne düşüp düşmediğini kontrol edin.

5) Warm-up Planı
- Yeni IP için "warming" (1-2 hafta boyunca düşük hacim ile kademeli artış) planlayın.

