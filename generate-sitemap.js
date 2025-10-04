import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream, readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { staticRoutes } from './src/routes.js';

// Fix __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load cars.json
let carsDataRaw = JSON.parse(
  readFileSync(path.join(__dirname, './src/data/cars.json'), 'utf-8')
);
const carsData = Array.isArray(carsDataRaw) ? carsDataRaw : carsDataRaw.cars || [];

// Slugify utility to normalize strings for URLs
function slugify(str) {
  if (!str) return '';
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-') // Replace spaces/special chars with hyphens
    .replace(/(^-|-$)+/g, '');   // Remove leading/trailing hyphens
}

// Collect all unique URLs ensuring unique URL slugs and unique cars by id
function collectUrls() {
  const urls = [];
  urls.push(...staticRoutes.map(r => r.path));

  const seenFull = new Set();  // To track uniqueness including id
  const seenSlug = new Set();  // To track unique URL slugs

  carsData.forEach(c => {
    const brandSlug = slugify(c.brand);
    const carSlug = slugify(c.name);
    const modelSlug = slugify(c.model);

    const fullKey = `${c.id}-${brandSlug}-${carSlug}-${modelSlug}`;
    const slugKey = `${brandSlug}-${carSlug}-${modelSlug}`;

    if (!seenFull.has(fullKey)) {
      seenFull.add(fullKey);

      if (!seenSlug.has(slugKey)) {
        seenSlug.add(slugKey);
        urls.push(`/cars/${brandSlug}/${carSlug}/${modelSlug}`);
      }
    }
  });

  return urls;
}

// Generate sitemap file in ./public/sitemap.xml
async function generate() {
  const hostname = 'https://93cars.com';
  const sitemap = new SitemapStream({ hostname });
  const writeStream = createWriteStream('./public/sitemap.xml');
  sitemap.pipe(writeStream);

  const urls = collectUrls();
  console.log('Total unique URLs:', urls.length);
  urls.forEach(u => console.log(u));

  urls.forEach(url =>
    sitemap.write({ url, changefreq: 'daily', priority: 0.8 })
  );

  sitemap.end();
  await streamToPromise(sitemap);
  console.log('✅ sitemap.xml generated in ./public');
}

generate().catch(console.error);
