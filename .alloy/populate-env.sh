#!/usr/bin/env bash
# Idempotent env setup for Alloy sessions.
# Creates/fills .env at the repo root without clobbering real values.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ENV_FILE="$ROOT/.env"

touch "$ENV_FILE"

get_var() {
  # current value in .env (empty if unset)
  sed -n "s/^$1=//p" "$ENV_FILE" | tail -n 1
}

set_var() {
  local key="$1" value="$2"
  if grep -q "^${key}=" "$ENV_FILE"; then
    python3 - "$ENV_FILE" "$key" "$value" <<'PY'
import sys
path, key, value = sys.argv[1], sys.argv[2], sys.argv[3]
lines = open(path).read().splitlines()
out = [f"{key}={value}" if l.startswith(key + "=") else l for l in lines]
open(path, "w").write("\n".join(out) + "\n")
PY
  else
    printf '%s=%s\n' "$key" "$value" >> "$ENV_FILE"
  fi
}

# key -> default (only applied when missing/blank/placeholder)
ensure() {
  local key="$1" default="$2"
  local from_env="${!key:-}"
  local current
  current="$(get_var "$key")"
  if [ -n "$from_env" ]; then
    set_var "$key" "$from_env"
  elif [ -z "$current" ] || [ "$current" = "change-me-in-local-dev" ]; then
    set_var "$key" "$default"
  fi
}

ensure DATABASE_URL "postgresql://shadow:shadowpassword@127.0.0.1:5432/shadow"
ensure REDIS_URL "redis://127.0.0.1:6379"
ensure JWT_SECRET "$(openssl rand -hex 32)"
ensure API_BASE_URL "http://localhost:3000"
ensure PORT "3000"
ensure NODE_ENV "development"
ensure IS_ALLOY "${IS_ALLOY:-true}"
ensure EXPO_PUBLIC_API_BASE_URL "http://localhost:3000"

for optional in STORAGE_ENDPOINT STORAGE_BUCKET STORAGE_ACCESS_KEY STORAGE_SECRET_KEY; do
  if ! grep -q "^${optional}=" "$ENV_FILE"; then
    printf '%s=%s\n' "$optional" "${!optional:-}" >> "$ENV_FILE"
  fi
done

echo "Populated $ENV_FILE"
