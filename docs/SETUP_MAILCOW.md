# Mailcow Kurulum Rehberi — safi.com (Kişisel)

Bu rehber, Mailcow'u `mail.safi.com` hostname'iyle kurmanız için adım adım yönergeler sağlar.

## 1) Ön gereksinimler
- Bir VPS (public IP) ve PTR (reverse DNS) ayarlanmış olmalı.
- Port 25, 465, 587, 80, 443, 110, 143, 993, 995 açık olmalı.
- DNS: `mail.safi.com` A kaydı IP'ye yönlendirilmeli, `safi.com` için MX kaydı olmalı.

## 2) Otomatik deploy (örnek)
1. Sunucuya bağlanın ve betiği çalıştırın:

   sudo bash scripts/deploy_mailcow.sh <YOUR_SERVER_IP>

2. Betik, gerekli paketleri kuracak, Mailcow repo'sunu klonlayacak ve container'ları ayağa kaldıracaktır.

3. Web arayüzüne gidin: https://mail.safi.com/ — ilk admin kullanıcıyı oluşturun.

## 3) DKIM & DNS
- Mailcow paneli domain ekledikten sonra DKIM anahtarlarını oluşturur ve eklemeniz için TXT kaydını gösterir.
- `scripts/generate_dkim.sh` scriptini kullanarak elle anahtar oluşturabilirsiniz.

## 4) Mailbox oluşturma
- Web panelinden `ilkemert@safi.com` ve `mehmet@safi.com` hesaplarını oluşturun.

## 5) Testler
- mail-tester.com adresine test maili gönderin ve puanı kontrol edin.
- MXToolbox ile DNS / SMTP testleri yapın.

## 6) Ek güvenlik
- fail2ban ve ufw ile brute-force koruması ekleyin.
- Yedekleme: `/var/lib/docker/volumes` içindeki mailcow volümlerinin düzenli yedeğini alın.


