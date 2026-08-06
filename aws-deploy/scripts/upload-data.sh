#!/usr/bin/env bash
set -euo pipefail

if [[ -z "${AWS_DATA_BUCKET:-}" ]]; then
  echo "AWS_DATA_BUCKET is required" >&2
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DATA_FILE="${SCRIPT_DIR}/../data/customers.json"

if [[ ! -f "${DATA_FILE}" ]]; then
  echo "Data file not found: ${DATA_FILE}" >&2
  exit 1
fi

aws s3 cp "${DATA_FILE}" "s3://${AWS_DATA_BUCKET}/customers.json" --content-type application/json
