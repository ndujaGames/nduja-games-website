#!/bin/sh
set -e

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

docker build -t nduja-games-website:local .

docker stop nduja-games-website-local nduja-server-local 2>/dev/null || true
docker rm nduja-games-website-local nduja-server-local 2>/dev/null || true

ENV_FILE_ARG=""
if [ -f "$ROOT/.env.local" ]; then
  ENV_FILE_ARG="--env-file $ROOT/.env.local"
fi

# shellcheck disable=SC2086
docker run --name nduja-games-website-local \
  -p 9080 \
  --restart unless-stopped \
  -e VIRTUAL_HOST=nduja.games.local \
  -e VIRTUAL_PORT=9080 \
  -e SITE_HOST=nduja.games.local \
  -e SITE_URL=http://nduja.games.local \
  -e ABDOKU_URL=http://abdoku.nduja.games.local \
  -e CHROMAWELL_URL=http://chromawell.nduja.games.local \
  -e SITE_BETA=true \
  -e NODE_ENV=development \
  -e TRUST_PROXY=true \
  -e POSTGRES_ENABLED=false \
  $ENV_FILE_ARG \
  -d nduja-games-website:local

echo "nduja-games-website-local → http://nduja.games.local"
