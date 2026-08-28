#!/bin/sh
# Node app listens on 9080 (see Dockerfile EXPOSE).
set -e

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

docker build -t nduja-games-website:local .

docker stop nduja-games-website nduja-server 2>/dev/null || true
docker rm nduja-games-website nduja-server 2>/dev/null || true

ENV_FILE_ARG=""
if [ -f "$ROOT/.env" ]; then
  ENV_FILE_ARG="--env-file $ROOT/.env"
fi

# shellcheck disable=SC2086
docker run --name nduja-games-website \
  --restart unless-stopped \
  -e VIRTUAL_HOST=nduja.games \
  -e VIRTUAL_PORT=9080 \
  -e LETSENCRYPT_HOST=nduja.games \
  -e LETSENCRYPT_EMAIL=info@ndujalabs.com \
  -e SITE_HOST=nduja.games \
  -e SITE_URL=https://nduja.games \
  -e ABDOKU_URL=https://abdoku.nduja.games \
  -e CHROMAWELL_URL=https://chromawell.nduja.games \
  -e CHESSRELAY_URL=https://chessrelay.nduja.games \
  -e SITE_BETA=false \
  -e NODE_ENV=production \
  -e TRUST_PROXY=true \
  -e POSTGRES_ENABLED=false \
  $ENV_FILE_ARG \
  -d nduja-games-website:local

echo "nduja-games-website → https://nduja.games"
