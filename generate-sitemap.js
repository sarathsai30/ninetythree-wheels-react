import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream, readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { staticRoutes } from './src/routes.js';

// Fix __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load cars.json safely
let carsDataRaw;
try {
  carsDataRaw = JSON.parse(readFileSync(path.join(__dirname, './src/data/cars.json'), 'utf-8'));
} catch (err) {
  console.error('Error reading cars.json:', err);
  carsDataRaw = [];
}
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

// Collect car URLs ensuring unique slugs
function collectCarUrls() {
  const urls = [];
  const seenSlug = new Set();

  carsData.forEach(c => {
    const brandSlug = slugify(c.brand);
    const carSlug = slugify(c.name);
    const modelSlug = slugify(c.model);
    const slugKey = `${brandSlug}-${carSlug}-${modelSlug}`;

    if (!seenSlug.has(slugKey)) {
      seenSlug.add(slugKey);
      urls.push(`/cars/${brandSlug}/${carSlug}/${modelSlug}`);
    }
  });

  return urls;
}

// Generate sitemap for static routes
async function generateStaticSitemap() {
  const hostname = 'https://93cars.com';
  const sitemap = new SitemapStream({ hostname });
  const writeStream = createWriteStream(path.join(__dirname, 'public', 'sitemap_static.xml'));
  sitemap.pipe(writeStream);

  staticRoutes.forEach(route => {
    sitemap.write({ url: route.path, changefreq: 'daily', priority: 0.8 });
  });

  sitemap.end();
  await streamToPromise(sitemap);

  console.log('✅ sitemap-static.xml for static routes generated');
}

// Generate sitemap for car URLs
async function generateCarSitemap() {
  const hostname = 'https://93cars.com';
  const sitemap = new SitemapStream({ hostname });
  const writeStream = createWriteStream(path.join(__dirname, 'public', 'sitemap_cars.xml'));
  sitemap.pipe(writeStream);

  const carUrls = collectCarUrls();

  carUrls.forEach(path =>
    sitemap.write({ url: `${hostname}${path}`, changefreq: 'daily', priority: 0.8 })
  );

  sitemap.end();
  await streamToPromise(sitemap);

  console.log('✅ sitemap-cars.xml for car URLs generated');
}

// Generate sitemap index to reference above sitemaps
async function generateSitemapIndex() {
  const sitemapIndexContent = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://93cars.com/sitemap_static.xml</loc>
  </sitemap>
  <sitemap>
    <loc>https://93cars.com/sitemap_cars.xml</loc>
  </sitemap>
</sitemapindex>`;

  const indexPath = path.join(__dirname, 'public', 'sitemap_index.xml');
  await new Promise((resolve, reject) => {
    const writeStream = createWriteStream(indexPath);
    writeStream.write(sitemapIndexContent);
    writeStream.end();
    writeStream.on('finish', resolve);
    writeStream.on('error', reject);
  });

  console.log('✅ sitemap-index.xml generated referencing static and cars sitemaps');
}

async function generateAllSitemaps() {
  await generateStaticSitemap();
  await generateCarSitemap();
  await generateSitemapIndex();
}

generateAllSitemaps().catch(console.error);
