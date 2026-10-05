// Generates the social preview card and app icons in public/.
// Run after changing src/assets/elora-workspace.jpg or public/favicon.svg:  npm run assets
import sharp from 'sharp';
import { mkdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = new URL('../', import.meta.url);
const out = (p) => fileURLToPath(new URL(`public/${p}`, root));
const src = (p) => fileURLToPath(new URL(p, root));

await mkdir(out('og'), { recursive: true });
await mkdir(out('icons'), { recursive: true });

/* Social card: 1200×630 ------------------------------------------------- */
const W = 1200;
const H = 630;
const overlay = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="fade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#0b0e16" stop-opacity="0.94"/>
      <stop offset="0.5" stop-color="#0b0e16" stop-opacity="0.72"/>
      <stop offset="1" stop-color="#0b0e16" stop-opacity="0.05"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#fade)"/>
  <g transform="translate(72 92)">
    <path d="M12 2.5l8.2 4.75v9.5L12 21.5l-8.2-4.75v-9.5z" transform="scale(2)" fill="none" stroke="#00f2fe" stroke-width="1.8" stroke-linejoin="round"/>
    <path d="M12 7.2l4.2 2.4v4.8L12 16.8l-4.2-2.4V9.6z" transform="scale(2)" fill="#00f2fe"/>
    <text x="64" y="34" font-family="Segoe UI, Arial, sans-serif" font-size="30" font-weight="700" letter-spacing="9" fill="#e0fdff">ELORA</text>
  </g>
  <text x="72" y="290" font-family="Segoe UI, Arial, sans-serif" font-size="68" font-weight="700" fill="#e0fdff" letter-spacing="-1.5">Not in the cloud.</text>
  <text x="72" y="370" font-family="Segoe UI, Arial, sans-serif" font-size="68" font-weight="700" fill="#00f2fe" letter-spacing="-1.5">Right here with you.</text>
  <text x="72" y="448" font-family="Segoe UI, Arial, sans-serif" font-size="27" fill="#b9cacb">The private AI companion that runs on your Windows PC.</text>
  <g transform="translate(72 512)">
    <rect width="252" height="44" rx="22" fill="#0b0e16" fill-opacity="0.8" stroke="#64ff92" stroke-opacity="0.45"/>
    <circle cx="26" cy="22" r="6" fill="#64ff92"/>
    <text x="44" y="29" font-family="Consolas, monospace" font-size="19" fill="#64ff92" letter-spacing="1">ON-DEVICE · LOCAL</text>
  </g>
  <text x="${W - 72}" y="${H - 42}" text-anchor="end" font-family="Consolas, monospace" font-size="20" fill="#8a9a9b" letter-spacing="2">ELORAOS.COM</text>
</svg>`);

await sharp(src('src/assets/elora-workspace.jpg'))
  .resize(W, H, { fit: 'cover', position: 'centre' })
  .composite([{ input: overlay }])
  .jpeg({ quality: 84, mozjpeg: true })
  .toFile(out('og/elora-og.jpg'));

/* Icons ----------------------------------------------------------------- */
const svg = await readFile(out('favicon.svg'));
const icon = (size) => sharp(svg, { density: Math.ceil((72 * size) / 24) }).resize(size, size);

await icon(48).png().toFile(out('favicon-48.png'));
await icon(192).png().toFile(out('icons/icon-192.png'));
await icon(512).png().toFile(out('icons/icon-512.png'));

// Apple touch + maskable: the mark inset on a full-bleed background (no rounded corners, no transparency).
const padded = async (size, inset, file) => {
  const mark = await icon(Math.round(size * (1 - inset * 2))).png().toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: '#0b0e16' } })
    .composite([{ input: mark, gravity: 'centre' }])
    .png()
    .toFile(out(file));
};
await padded(180, 0.08, 'apple-touch-icon.png');
await padded(512, 0.12, 'icons/icon-512-maskable.png');

console.log('Assets written to public/.');
