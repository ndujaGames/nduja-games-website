# nduja-games-website

Site, documentation, and API for **ndujaGames** at [nduja.games](https://nduja.games).

| Host | Role |
|---|---|
| `nduja.games` | ndujaGames hub (this server) |
| `midcoil.nduja.games` | Midcoil web app |
| `abdoku.nduja.games` | ABdoku web app |
| `chromawell.nduja.games` | Chromawell web app |
| `chessrelay.nduja.games` | ChessRelay web app |
| `hexact.nduja.games` | Hexact web app |

## Routes

| Path | Description |
|---|---|
| `/` | Redirect → `/en/` or `/it/` (browser language) |
| `/en/` | Home + projects (English) |
| `/it/` | Home + projects (Italian) |
| `/en/docs` | Documentation index (English) |
| `/it/docs` | Documentation index (Italian) |
| `/en/docs/:project` | How to play (English) |
| `/it/docs/:project` | How to play (Italian) |
| `/en/privacy` | Privacy policy (English) |
| `/it/privacy` | Informativa sulla privacy (Italian) |
| `/en/terms` | Terms of service (English) |
| `/it/terms` | Termini di servizio (Italian) |
| `/api/v1/health` | Service health JSON |

The hub has terms, privacy, and a cookie banner. Each game also has in-app terms and privacy.

## Development

```bash
cp .env.example .env
npm install
npm run dev
```

Open http://localhost:9080

## Production (Docker)

```bash
./docker/server.sh
```

Expects nginx-proxy + Let's Encrypt companion on the host.

## Local Docker (no TLS)

Add to `/etc/hosts` (point at your dev machine):

```
127.0.0.1 nduja.games.local midcoil.nduja.games.local abdoku.nduja.games.local chromawell.nduja.games.local chessrelay.nduja.games.local hexact.nduja.games.local
```

Then:

```bash
./docker/local.sh
../midcoil/docker/local.sh
../abdoku/docker/local.sh
../chromawell/docker/local.sh
../hexact/docker/local.sh
```

Optional overrides in `.env.local`.
