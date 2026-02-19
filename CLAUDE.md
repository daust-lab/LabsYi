# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

LabsYi is a remote robotics learning platform with two main parts:
- **Python FastAPI backend** (`app/`) — robot control, teleoperation, recording, training, and calibration via the LeRobot framework
- **Next.js frontend** (`web-platform/`) — browser UI for controlling robots, monitoring streams, and managing training sessions

## Commands

### Frontend (run from `web-platform/`)
```bash
npm run dev      # Dev server on port 3000
npm run build    # Production build
npm run lint     # ESLint
```

### Backend (run from repo root)
```bash
# Via installed entry points (after pip install -e .):
lelab                  # Backend only on port 8000
lelab-fullstack        # Both frontend + backend
lelab-frontend         # Frontend only on port 8080

# Or directly:
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

### Install
```bash
pip install -e .                        # Python backend
cd web-platform && npm install          # Frontend deps
```

## Architecture

### Backend (`app/`)
FastAPI application split into modules by concern:
- `main.py` — app entrypoint, CORS config, WebSocket manager, all route registrations
- `config.py` — config path helpers; robot ports/configs persisted under `~/.cache/huggingface/lerobot/`
- `calibrating.py`, `recording.py`, `replaying.py`, `teleoperating.py`, `training.py` — one module per robot operation mode, each exporting router endpoints and a manager class

Real-time joint data is broadcast over WebSocket at `ws://localhost:8000/ws/joint-data` to all connected clients.

### Frontend (`web-platform/src/`)
Next.js App Router. Key directories:
- `app/` — pages: `/` (landing), `/auth/login`, `/auth/signup`, `/booking`, `/lab`
- `components/lab/` — four lab UI components: `CodeEditor`, `RobotControls`, `VideoStream`, `LogsPanel`
- `lib/api/robot.ts` — singleton `RobotAPI` class; all HTTP calls to backend go through here; base URL via `NEXT_PUBLIC_API_URL`
- `lib/websocket.ts` — singleton `WebSocketManager` with auto-reconnect; used via `hooks/useRobotData.ts`
- `lib/supabase.ts` — Supabase client for auth and DB

State management uses Zustand. Auth uses Supabase (primary) with Firebase as an alternative integration.

### Styling
Tailwind CSS v4 via PostCSS. Custom utilities (`.glass`, `.glass-dark`, `.gradient-primary`, `.glow`, `.animate-float`) are defined in `web-platform/src/app/globals.css` using `@utility` — do not use `@apply` (incompatible with Tailwind v4).

## Environment Variables

Frontend (`web-platform/.env.local`):
```
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_WS_URL=ws://localhost:8000
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

## Key Conventions

- Backend modules export both a FastAPI `APIRouter` and a manager/class for the operation logic; routes are registered in `main.py`
- The `scripts/` directory contains process orchestration scripts (not application logic) — `fullstack.py` spawns both servers and handles graceful shutdown
- Path aliases: `@/*` maps to `web-platform/src/*`
- Python 3.10+ required; LeRobot is installed from GitHub source
