/**
 * post-build-ssg.mjs
 *
 * A zero-dependency post-build script that duplicates index.html into
 * pre-rendered route HTML files. This ensures AI crawlers (GPTBot, ClaudeBot,
 * PerplexityBot, Google-Extended) receive meaningful HTML with static meta,
 * Schema.org JSON-LD, and Open Graph tags — even without executing JavaScript.
 *
 * How it works:
 * 1. After `npm run build`, we read the built `dist/index.html`
 * 2. We inject route-specific <title>, <meta description>, and JSON-LD
 * 3. We write each route as a standalone HTML file (e.g. dist/blog/index.html)
 *
 * This means:
 * - Vercel serves /blog → dist/blog/index.html (rich HTML)
 * - React Router then hydrates and takes over on the client
 * - Zero user-visible difference — but AI crawlers get real content
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const distDir = join(__dirname, 'dist');

// ─── Route Definitions ───────────────────────────────────────────────────────
// Add or remove routes here as your site grows.
const routes = [
  {
    path: '/',
    title: 'Digital Vint — Digital Marketing & Web Design Agency in Hyderabad',
    description: 'Digital Vint is a results-driven digital marketing agency in Hyderabad. We help local businesses attract leads, rank on Google, and grow online through websites, SEO, and paid ads.',
    schema: {
      "@type": "WebPage",
      "@id": "https://digitalvint.com/#webpage",
      "url": "https://digitalvint.com/",
      "name": "Digital Vint — Digital Marketing & Web Design Agency in Hyderabad",
      "description": "We help local businesses in Hyderabad attract customers, generate leads, and grow online."
    }
  },
  {
    path: '/blog',
    title: 'Blog — Digital Marketing Insights | Digital Vint Hyderabad',
    description: 'Expert articles on local SEO, web design, Google Ads, and digital marketing strategies for businesses in Hyderabad and across India.',
    schema: {
      "@type": "Blog",
      "@id": "https://digitalvint.com/blog#webpage",
      "url": "https://digitalvint.com/blog",
      "name": "Digital Vint Blog — Marketing Insights for Local Businesses",
      "description": "Expert articles on local SEO, web design, Google Ads, and digital marketing for businesses in India."
    }
  },
  {
    path: '/services/website-designing',
    title: 'Lead-Generating Business Websites in Hyderabad | Digital Vint',
    description: 'We design fast, mobile-friendly websites that help local businesses turn visitors into enquiries, calls, and WhatsApp messages.',
    schema: {
      "@type": "Service",
      "name": "Lead-Generating Business Websites",
      "provider": { "@type": "Organization", "name": "Digital Vint", "url": "https://digitalvint.com" },
      "areaServed": "Hyderabad",
      "description": "Fast, mobile-friendly websites that help local businesses turn visitors into enquiries, calls, and WhatsApp messages.",
      "url": "https://digitalvint.com/services/website-designing"
    }
  },
  {
    path: '/services/seo-optimization',
    title: 'Local SEO & Online Visibility in Hyderabad | Digital Vint',
    description: 'We help your business appear on Google when nearby customers search for your services, driving consistent local traffic and leads.',
    schema: {
      "@type": "Service",
      "name": "Local SEO & Online Visibility",
      "provider": { "@type": "Organization", "name": "Digital Vint", "url": "https://digitalvint.com" },
      "areaServed": "Hyderabad",
      "description": "Google Rankings, Google Business Profile, and local keyword targeting to attract nearby customers.",
      "url": "https://digitalvint.com/services/seo-optimization"
    }
  },
  {
    path: '/services/performance-marketing',
    title: 'Paid Ads for Faster Leads in Hyderabad | Digital Vint',
    description: 'We run targeted Google and social media ads to help local businesses get immediate enquiries and grow faster.',
    schema: {
      "@type": "Service",
      "name": "Paid Ads for Faster Leads",
      "provider": { "@type": "Organization", "name": "Digital Vint", "url": "https://digitalvint.com" },
      "areaServed": "Hyderabad",
      "description": "Targeted Google Ads and social media campaigns generating immediate, high-quality enquiries.",
      "url": "https://digitalvint.com/services/performance-marketing"
    }
  },
  {
    path: '/services/ecommerce-solutions',
    title: 'E-Commerce for Local Businesses in Hyderabad | Digital Vint',
    description: 'We build simple, scalable online stores for businesses in Hyderabad ready to sell products online with UPI and Indian payment support.',
    schema: {
      "@type": "Service",
      "name": "E-Commerce for Local & Growing Businesses",
      "provider": { "@type": "Organization", "name": "Digital Vint", "url": "https://digitalvint.com" },
      "areaServed": "Hyderabad",
      "description": "Simple, scalable online stores built on Shopify and WooCommerce with UPI payment integrations.",
      "url": "https://digitalvint.com/services/ecommerce-solutions"
    }
  },
  {
    path: '/faq',
    title: 'Frequently Asked Questions — Digital Vint Hyderabad',
    description: 'Answers to common questions about Digital Vint\'s digital marketing and web design services in Hyderabad.',
    schema: {
      "@type": "FAQPage",
      "url": "https://digitalvint.com/faq",
      "name": "Digital Vint FAQ"
    }
  }
];

// ─── Helper ───────────────────────────────────────────────────────────────────
function injectRouteMetaIntoHtml(baseHtml, route) {
  const canonicalUrl = `https://digitalvint.com${route.path}`;

  // Inject title
  let html = baseHtml.replace(
    /<title>.*?<\/title>/,
    `<title>${route.title}</title>`
  );

  // Inject/replace description meta
  html = html.replace(
    /<meta name="description" content=".*?" \/>/,
    `<meta name="description" content="${route.description}" />`
  );

  // Inject/replace canonical
  html = html.replace(
    /<link rel="canonical" href=".*?" \/>/,
    `<link rel="canonical" href="${canonicalUrl}" />`
  );

  // Replace OG tags
  html = html.replace(/(<meta property="og:url" content=").*?(" \/>)/, `$1${canonicalUrl}$2`);
  html = html.replace(/(<meta property="og:title" content=").*?(" \/>)/, `$1${route.title}$2`);
  html = html.replace(/(<meta property="og:description" content=").*?(" \/>)/, `$1${route.description}$2`);

  // Replace Twitter tags
  html = html.replace(/(<meta name="twitter:url" content=").*?(" \/>)/, `$1${canonicalUrl}$2`);
  html = html.replace(/(<meta name="twitter:title" content=").*?(" \/>)/, `$1${route.title}$2`);
  html = html.replace(/(<meta name="twitter:description" content=").*?(" \/>)/, `$1${route.description}$2`);

  // Inject route-specific JSON-LD (appended before </head>)
  const routeSchema = `
  <script type="application/ld+json">
  ${JSON.stringify({ "@context": "https://schema.org", ...route.schema }, null, 2)}
  </script>`;

  html = html.replace('</head>', `${routeSchema}\n</head>`);

  return html;
}

// ─── Main ─────────────────────────────────────────────────────────────────────
const baseHtml = readFileSync(join(distDir, 'index.html'), 'utf-8');
let successCount = 0;

for (const route of routes) {
  if (route.path === '/') {
    // Root is already index.html — just re-write with injected meta
    const rootHtml = injectRouteMetaIntoHtml(baseHtml, route);
    writeFileSync(join(distDir, 'index.html'), rootHtml, 'utf-8');
    console.log(`✅ / → dist/index.html`);
    successCount++;
    continue;
  }

  // Create directory and write index.html for nested routes
  const routeDir = join(distDir, ...route.path.split('/').filter(Boolean));
  if (!existsSync(routeDir)) {
    mkdirSync(routeDir, { recursive: true });
  }

  const routeHtml = injectRouteMetaIntoHtml(baseHtml, route);
  writeFileSync(join(routeDir, 'index.html'), routeHtml, 'utf-8');
  console.log(`✅ ${route.path} → dist${route.path}/index.html`);
  successCount++;
}

console.log(`\n🚀 SSG pre-rendering complete: ${successCount}/${routes.length} routes pre-rendered.`);
console.log(`   AI crawlers will now receive static HTML with full meta tags and JSON-LD schema.`);
