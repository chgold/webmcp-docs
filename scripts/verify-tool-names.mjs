import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

// Tool names come from the PM database and surface on plugins.goldnat.ai, which is
// the authoritative source. Docs written by hand drift from it — names get invented,
// namespaces get missed. This fails the build when a documented tool does not exist.
//
// A tool reference is any single-backticked `namespace.toolName`. Names that are not
// tools (manifest fields, example domains) are listed in NON_TOOL_REFS.
//
// Network failure is a skip, not a failure: the docs deploy must not depend on the
// availability of a separate site. Only a genuine mismatch fails.

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const ORIGIN = 'https://plugins.goldnat.ai';

const NON_TOOL_REFS = new Set(['namespace.actionTarget', 'server.url', 'example.com']);

const TOOL_REF = /`([a-z][a-z0-9_]*\.[a-zA-Z][a-zA-Z0-9]*)`/g;
const TOOL_NAME_IN_HTML = /class="tool-list__name"[^>]*>([^<]+)<\/code>/g;
const SITEMAP_PLUGIN_PAGE = /<loc>(https:\/\/plugins\.goldnat\.ai\/[a-z0-9-]+\/[a-z0-9-]+)<\/loc>/g;
const NOT_A_PLUGIN_PAGE = /\/(guide)$|\/(docs|updates)\//;

async function fetchKnownToolNames() {
  const sitemap = await fetch(`${ORIGIN}/sitemap-0.xml`).then(r => r.text());
  const pages = [...sitemap.matchAll(SITEMAP_PLUGIN_PAGE)]
    .map(m => m[1])
    .filter(url => !NOT_A_PLUGIN_PAGE.test(url));

  const names = new Set();
  for (const url of pages) {
    const html = await fetch(url).then(r => r.text());
    for (const m of html.matchAll(TOOL_NAME_IN_HTML)) names.add(m[1].trim());
  }
  return { names, pageCount: pages.length };
}

function markdownFiles(dir) {
  return readdirSync(dir).flatMap(entry => {
    if (entry === 'node_modules' || entry === '.git' || entry === '.vitepress') return [];
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) return markdownFiles(path);
    return entry.endsWith('.md') ? [path] : [];
  });
}

const known = await fetchKnownToolNames().catch(err => {
  console.warn(`verify-tool-names: skipped — could not reach ${ORIGIN} (${err.message})`);
  return null;
});

if (known) {
  const problems = [];
  let checked = 0;

  for (const file of markdownFiles(ROOT)) {
    const text = readFileSync(file, 'utf8');
    const lines = text.split('\n');
    lines.forEach((line, i) => {
      for (const m of line.matchAll(TOOL_REF)) {
        const name = m[1];
        if (NON_TOOL_REFS.has(name)) continue;
        checked++;
        if (!known.names.has(name)) {
          problems.push(`${relative(ROOT, file)}:${i + 1}  ${name}`);
        }
      }
    });
  }

  console.log(
    `verify-tool-names: ${checked} references checked against ` +
    `${known.names.size} tools from ${known.pageCount} plugin pages`,
  );

  if (problems.length) {
    console.error(`\nThese tool names do not exist on ${ORIGIN}:\n`);
    for (const p of problems) console.error(`  ${p}`);
    console.error(`\nCheck the plugin page for the correct name, or add it to NON_TOOL_REFS`);
    console.error(`in scripts/verify-tool-names.mjs if it is not a tool reference.\n`);
    process.exit(1);
  }
}
