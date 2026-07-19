import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { setTimeout as delay } from "node:timers/promises";

const developmentPreviewMeta =
  /<meta(?=[^>]*\bname=["']codex-preview["'])(?=[^>]*\bcontent=["']development["'])[^>]*>/i;

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const viteCli = fileURLToPath(
  new URL("../node_modules/vite/bin/vite.js", import.meta.url),
);

test(
  "renders development preview metadata",
  { timeout: 60_000 },
  async (context) => {
    const previewPort = 41_000 + (process.pid % 1_000);
    const previewUrl = `http://127.0.0.1:${previewPort}/`;

    const preview = spawn(
      process.execPath,
      [
        viteCli,
        "preview",
        "--host",
        "127.0.0.1",
        "--port",
        String(previewPort),
        "--strictPort",
      ],
      {
        cwd: projectRoot,
        env: {
          ...process.env,
          WRANGLER_WRITE_LOGS: "false",
        },
        stdio: ["ignore", "pipe", "pipe"],
      },
    );

    let previewOutput = "";

    preview.stdout.setEncoding("utf8");
    preview.stderr.setEncoding("utf8");

    preview.stdout.on("data", (chunk) => {
      previewOutput += chunk;
    });

    preview.stderr.on("data", (chunk) => {
      previewOutput += chunk;
    });

    context.after(async () => {
      if (preview.exitCode === null) {
        preview.kill();

        await Promise.race([
          once(preview, "exit").catch(() => undefined),
          delay(5_000),
        ]);
      }
    });

    let response;
    const deadline = Date.now() + 45_000;

    while (Date.now() < deadline) {
      if (preview.exitCode !== null) {
        throw new Error(
          `Cloudflare preview berhenti dengan kode ${preview.exitCode}.\n${previewOutput}`,
        );
      }

      try {
        response = await fetch(previewUrl, {
          headers: { accept: "text/html" },
        });
        break;
      } catch {
        await delay(250);
      }
    }

    assert.ok(
      response,
      `Cloudflare preview tidak siap dalam 45 detik.\n${previewOutput}`,
    );
    assert.equal(response.status, 200);
    assert.match(
      response.headers.get("content-type") ?? "",
      /^text\/html\b/i,
    );
    assert.match(await response.text(), developmentPreviewMeta);
  },
);
