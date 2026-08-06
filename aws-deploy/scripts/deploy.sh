#!/usr/bin/env bash
set -euo pipefail

if [[ -z "${AWS_S3_BUCKET:-}" ]]; then
  echo "AWS_S3_BUCKET is required" >&2
  exit 1
fi

if [[ -z "${AWS_CLOUDFRONT_DISTRIBUTION_ID:-}" ]]; then
  echo "AWS_CLOUDFRONT_DISTRIBUTION_ID is required" >&2
  exit 1
fi

if [[ -z "${VITE_DATA_URL:-}" ]]; then
  echo "VITE_DATA_URL is required" >&2
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
APP_DIR="${SCRIPT_DIR}/../frontend"

cd "${APP_DIR}"

npm ci
printf 'VITE_DATA_URL=%s\n' "${VITE_DATA_URL}" > .env.production
npm run build

aws s3 sync dist "s3://${AWS_S3_BUCKET}" --delete
aws cloudfront create-invalidation \
  --distribution-id "${AWS_CLOUDFRONT_DISTRIBUTION_ID}" \
  --paths "/*"
