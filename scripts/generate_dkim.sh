#!/usr/bin/env bash
set -euo pipefail

# Basit DKIM anahtar üretme scripti (DNS için public key çıktısı verir)
# Kullanım: ./generate_dkim.sh <domain> <selector>
# Örnek: ./generate_dkim.sh safi.com mail

if [ "$#" -lt 2 ]; then
  echo "Kullanım: $0 <domain> <selector>"
  exit 1
fi

DOMAIN="$1"
SELECTOR="$2"
OUTDIR="./dkim_keys/${DOMAIN}"
mkdir -p "$OUTDIR"
PRIVATE_KEY="$OUTDIR/${SELECTOR}.private"
PUBLIC_KEY="$OUTDIR/${SELECTOR}.pub"

openssl genrsa -out "$PRIVATE_KEY" 2048
openssl rsa -in "$PRIVATE_KEY" -pubout -out "$PUBLIC_KEY"

# Public key'ı DNS için uygun forma sok
PUB_B64=$(openssl rsa -in "$PRIVATE_KEY" -pubout -outform PEM | tail -n +2 | head -n -1 | tr -d '\n')

cat > "$OUTDIR/${SELECTOR}_dns.txt" <<EOF
# DKIM DNS kaydı (selector = $SELECTOR)
# TXT record name: ${SELECTOR}._domainkey.${DOMAIN}
# TXT value: v=DKIM1; k=rsa; p=<PUBLIC_KEY>

${SELECTOR}._domainkey.${DOMAIN} IN TXT "v=DKIM1; k=rsa; p=${PUB_B64}"
EOF

cat <<EOF
Oluşturuldu:
- Private: $PRIVATE_KEY
- Public (DNS format): $OUTDIR/${SELECTOR}_dns.txt

DNS kaydını ekledikten sonra Mailcow veya OpenDKIM konfigürasyonuna private key'i yerleştirin.
EOF
