// Turn the built site in dist/ into the private Firebase preview (not akhilcjacob.com):
// noindex on every page (meta tag, robots.txt, and the X-Robots-Tag header in firebase.json),
// and studio links pointed at the Tiny Bad Ideas preview instead of modrnmagic.app.
//
//   npm ci && npx astro build
//   node scripts/firebase-preview.mjs https://tinybadideas.web.app
//   firebase deploy --only hosting --project akhilcjacob-portfolio --account akhil@modrnmagic.app
import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join } from "node:path";

const studio = process.argv[2];
if (!/^https:\/\/[a-z0-9.-]+$/.test(studio ?? "")) {
  console.error("usage: node scripts/firebase-preview.mjs https://<tbi-site>.web.app");
  process.exit(1);
}
const META = '<meta name="robots" content="noindex, nofollow">';

function* files(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) yield* files(path);
    else yield path;
  }
}

let pages = 0;
for (const path of files("dist")) {
  if (!/\.(html|xml|txt|json)$/.test(path)) continue;
  let text = readFileSync(path, "utf8");
  const before = text;
  text = text.replaceAll("https://modrnmagic.app", studio);
  if (path.endsWith(".html")) {
    text = text.replace(/<meta name="robots"[^>]*>/g, "");
    if (!text.includes("<head>")) throw new Error(`${path}: no <head>`);
    text = text.replace("<head>", `<head>${META}`);
    pages++;
  }
  if (text !== before) writeFileSync(path, text);
}
writeFileSync("dist/robots.txt", "User-agent: *\nDisallow: /\n");
console.log(`preview: ${pages} pages noindexed, studio links -> ${studio}`);
