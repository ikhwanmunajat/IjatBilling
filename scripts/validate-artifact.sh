#!/usr/bin/env bash
set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if [[ "${SITES_ENV_READY:-}" != "1" ]]; then
  exec "${script_dir}/sites-env.sh" -- "$0" "$@"
fi

worker="${SITES_PROJECT_ROOT}/dist/server/index.js"
source_hosting="${SITES_PROJECT_ROOT}/.openai/hosting.json"
packaged_hosting="${SITES_PROJECT_ROOT}/dist/.openai/hosting.json"
generated_wrangler="${SITES_PROJECT_ROOT}/dist/server/wrangler.json"
wrangler="${SITES_PROJECT_ROOT}/node_modules/.bin/wrangler"

[[ -f "${worker}" ]] || {
  echo "Missing Worker entry: dist/server/index.js" >&2
  exit 66
}

if [[ -f "${source_hosting}" ]]; then
  [[ -f "${packaged_hosting}" ]] || {
    echo "Missing packaged Sites manifest: dist/.openai/hosting.json" >&2
    exit 66
  }

  node --input-type=module - "${worker}" "${packaged_hosting}" <<'NODE'
import { readFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";

const [workerPath, hostingPath] = process.argv.slice(2);
JSON.parse(await readFile(hostingPath, "utf8"));

const workerUrl = pathToFileURL(workerPath);
workerUrl.searchParams.set("sites-validation", `${process.pid}-${Date.now()}`);
const worker = await import(workerUrl.href);

if (!worker.default || typeof worker.default.fetch !== "function") {
  throw new Error("dist/server/index.js must have an ESM default export with fetch(request, env, ctx)");
}
NODE

  echo "Validated Sites artifact: Worker and hosting manifest are present."
  exit 0
fi

[[ -f "${generated_wrangler}" ]] || {
  echo "Missing Cloudflare build configuration: dist/server/wrangler.json" >&2
  exit 66
}

[[ -x "${wrangler}" ]] || {
  echo "Wrangler is unavailable. Install project dependencies first." >&2
  exit 69
}

"${wrangler}" deploy --dry-run --outdir "${SITES_PROJECT_ROOT}/.wrangler/artifact-validation"

echo "Validated Cloudflare artifact with Wrangler dry-run."
