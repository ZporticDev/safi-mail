#!/usr/bin/env bash
set -euo pipefail

# Basit deploy betiği: Mailcow kurulumu için
# Kullanım: sudo ./deploy_mailcow.sh <public-ip>
# Not: Hostname olarak "mail.safi.com" kullanılacak, DNS A kaydı bu IP'ye yönlendirilmeli.

if [ "$#" -lt 1 ]; then
  echo "Kullanım: sudo $0 <server-ip>"
  exit 1
fi

SERVER_IP="$1"
MAILCOW_DIR="/opt/mailcow"
MAILCOW_HOSTNAME="mail.safi.com"

echo "Sunucu IP: $SERVER_IP"
echo "Mailcow kuruluyor (dizin: $MAILCOW_DIR, hostname: $MAILCOW_HOSTNAME)"

# Paketler
apt-get update
apt-get install -y git curl docker.io docker-compose openssl

# Docker servisleri aktif olsun
systemctl enable --now docker

# Clone mailcow
if [ ! -d "$MAILCOW_DIR" ]; then
  git clone https://github.com/mailcow/mailcow-dockerized.git "$MAILCOW_DIR"
fi
cd "$MAILCOW_DIR"

# Örnek yapılandırma oluştur
if [ ! -f "mailcow.conf" ]; then
  cp mailcow.conf.example mailcow.conf
  sed -ri "s/^#?MAILCOW_HOSTNAME=.*/MAILCOW_HOSTNAME=$MAILCOW_HOSTNAME/" mailcow.conf
  sed -ri "s/^#?TZ=.*/TZ=UTC/" mailcow.conf || true
fi

# Generate configs
./generate_config.sh

# Pull ve up
docker-compose pull
docker-compose up -d

cat <<EOF

Kurulum başlatıldı. Aşağıdaki adımları takip edin:
- DNS: 'mail.safi.com' için A kaydını <server-ip> ile ekleyin.
- DNS: 'safi.com' için MX kaydı: '10 mail.safi.com.' ekleyin.
- Reverse PTR (rDNS) sağlayıcınızda IP için "mail.safi.com" olarak ayarlayın.
- Web paneli: https://$MAILCOW_HOSTNAME/ ile erişin ve admin hesabını oluşturun (ilk kurulum ekranı).

Not: DKIM ve SPF kayıtları Mailcow UI üzerinden otomatik üretilip gösterilecektir; DNS'e ekleyin.
EOF
