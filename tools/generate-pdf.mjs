import { chromium } from "playwright";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const dir = path.dirname(fileURLToPath(import.meta.url));
const src = path.join(dir, "case-studies.html");
const out = path.join(dir, "..", "public", "case-studies.pdf");

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto("file://" + src, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.pdf({
  path: out,
  format: "A4",
  printBackground: true,
  preferCSSPageSize: true,
  margin: { top: "0", right: "0", bottom: "0", left: "0" },
});
await browser.close();

const kb = (fs.statSync(out).size / 1024).toFixed(0);
console.log(`✓ wrote public/case-studies.pdf (${kb} KB)`);
