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
import { createClient } from '@sanity/client';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const distDir = join(__dirname, 'dist');

// Setup Sanity Client for Build
const sanityClient = createClient({
  projectId: 'x6r02qtl',
  dataset: 'production',
  apiVersion: '2024-03-12',
  useCdn: false, // Must be false to ensure fresh data at build time
});

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
    path: '/faq',
    title: 'Frequently Asked Questions — Digital Vint Hyderabad',
    description: 'Answers to common questions about Digital Vint\'s digital marketing, web design, SEO, and Google Ads services in Hyderabad. No jargon, just straight answers.',
    schema: {
      "@type": "FAQPage",
      "url": "https://digitalvint.com/faq",
      "name": "Digital Vint FAQ"
    }
  },
  {
    path: '/services/website-designing',
    title: 'Lead-Generating Business Websites in Hyderabad | Digital Vint',
    description: 'We design fast, mobile-friendly websites that help local businesses turn visitors into enquiries, calls, and WhatsApp messages.',
    schema: {
      "@type": ["Service", "FAQPage"],
      "name": "Lead-Generating Business Websites",
      "provider": { "@type": "Organization", "name": "Digital Vint", "url": "https://digitalvint.com" },
      "areaServed": "Hyderabad",
      "description": "Fast, mobile-friendly websites that help local businesses turn visitors into enquiries, calls, and WhatsApp messages.",
      "url": "https://digitalvint.com/services/website-designing",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How much does a business website cost in Hyderabad?",
          "acceptedAnswer": { "@type": "Answer", "text": "Website costs vary based on features, ranging from ₹35,000 for standard business sites to custom quotes for complex portals." }
        },
        {
          "@type": "Question",
          "name": "Do you design mobile-friendly websites?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes, every website we build is 100% mobile-responsive and optimized for fast loading on Indian networks." }
        }
      ]
    }
  },
  {
    path: '/services/seo-optimization',
    title: 'Local SEO & Online Visibility in Hyderabad | Digital Vint',
    description: 'We help your business appear on Google when nearby customers search for your services, driving consistent local traffic and leads.',
    schema: {
      "@type": ["Service", "FAQPage"],
      "name": "Local SEO & Online Visibility",
      "provider": { "@type": "Organization", "name": "Digital Vint", "url": "https://digitalvint.com" },
      "areaServed": "Hyderabad",
      "description": "Google Rankings, Google Business Profile, and local keyword targeting to attract nearby customers.",
      "url": "https://digitalvint.com/services/seo-optimization",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How long does SEO take to show results in Hyderabad?",
          "acceptedAnswer": { "@type": "Answer", "text": "Local SEO typically starts showing noticeable improvements in map rankings and organic traffic within 3 to 6 months depending on competition." }
        },
        {
          "@type": "Question",
          "name": "Do you manage Google Business Profiles?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes, Google Business Profile optimization is a core part of our local SEO strategy to maximize local visibility." }
        }
      ]
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
  // ─── Case Studies ─────────────────────────────────────────────────────────────
  {
    path: '/works/zaid-book-depot',
    title: 'Zaid Book Depot Case Study — +150% Traffic, +85% Conversion | Digital Vint',
    description: 'How Digital Vint built a Shopify e-commerce store for Zaid Book Depot in Hyderabad, resulting in 150% traffic growth and 85% higher checkout conversion rates.',
    schema: {
      "@type": "CreativeWork",
      "name": "Zaid Book Depot — E-Commerce Case Study",
      "creator": { "@type": "Organization", "name": "Digital Vint" },
      "about": { "@type": "Organization", "name": "Zaid Book Depot", "location": "Hyderabad, India" },
      "description": "Shopify e-commerce store delivering +150% traffic growth and +85% checkout conversion for an online bookstore in Hyderabad.",
      "url": "https://digitalvint.com/works/zaid-book-depot"
    }
  },
  {
    path: '/works/the-observer-post',
    title: 'The Observer Post Case Study — +200% Traffic | Digital Vint',
    description: 'How Digital Vint built a fast-loading news portal for The Observer Post, achieving 200% organic traffic growth and 120% improvement in reader engagement.',
    schema: {
      "@type": "CreativeWork",
      "name": "The Observer Post — News Portal Case Study",
      "creator": { "@type": "Organization", "name": "Digital Vint" },
      "about": { "@type": "Organization", "name": "The Observer Post", "location": "Hyderabad, India" },
      "description": "Custom WordPress news portal achieving +200% organic traffic and +120% reader engagement for a Hyderabad news publication.",
      "url": "https://digitalvint.com/works/the-observer-post"
    }
  },
  {
    path: '/works/treasure-jewelry',
    title: 'Treasure Jewelry Case Study — +180% Sales, 80+ Monthly Enquiries | Digital Vint',
    description: 'How Digital Vint redesigned the Treasure Jewelry website, delivering 180% more online sales and 80+ WhatsApp enquiries per month for a Hyderabad jewelry brand.',
    schema: {
      "@type": "CreativeWork",
      "name": "Treasure Jewelry — E-Commerce Case Study",
      "creator": { "@type": "Organization", "name": "Digital Vint" },
      "about": { "@type": "Organization", "name": "Treasure Jewelry", "location": "Hyderabad, India" },
      "description": "Premium jewelry e-commerce redesign achieving +180% online sales and 80+ WhatsApp enquiries per month.",
      "url": "https://digitalvint.com/works/treasure-jewelry"
    }
  },
  {
    path: '/works/agha-perfumes',
    title: 'Agha Perfumes Case Study — +250% Leads, 0.8s Load | Digital Vint',
    description: 'How Digital Vint built a luxury brand website for Agha Perfumes in Hyderabad — resulting in 250% more lead enquiries and a sub-second page load time.',
    schema: {
      "@type": "CreativeWork",
      "name": "Agha Perfumes — Brand Website Case Study",
      "creator": { "@type": "Organization", "name": "Digital Vint" },
      "about": { "@type": "Organization", "name": "Agha Perfumes", "location": "Hyderabad, India" },
      "description": "Luxury perfume brand website with cinematic animations achieving +250% lead enquiries and 0.8s page load speed.",
      "url": "https://digitalvint.com/works/agha-perfumes"
    }
  },
  {
    path: '/works/psyke-tech',
    title: 'Psyke Tech Case Study — +300% Leads, -55% Bounce Rate | Digital Vint',
    description: 'How Digital Vint redesigned Psyke Tech\'s corporate website to generate 300% more qualified signups and reduce bounce rate by 55%.',
    schema: {
      "@type": "CreativeWork",
      "name": "Psyke Tech — Corporate Website Case Study",
      "creator": { "@type": "Organization", "name": "Digital Vint" },
      "about": { "@type": "Organization", "name": "Psyke Tech", "location": "Hyderabad, India" },
      "description": "Corporate SaaS website achieving +300% qualified lead signups and -55% bounce rate reduction.",
      "url": "https://digitalvint.com/works/psyke-tech"
    }
  },
  {
    path: '/works/based-matrimony',
    title: 'Based Matrimony Case Study — +500% Users | Digital Vint',
    description: 'How Digital Vint built a full-stack matrimony web application for Based Matrimony, growing registered users by 500% and successful matches by 400%.',
    schema: {
      "@type": "CreativeWork",
      "name": "Based Matrimony — Web Application Case Study",
      "creator": { "@type": "Organization", "name": "Digital Vint" },
      "about": { "@type": "Organization", "name": "Based Matrimony", "location": "Hyderabad, India" },
      "description": "Full-stack matrimony platform achieving +500% registered users and +400% successful matches.",
      "url": "https://digitalvint.com/works/based-matrimony"
    }
  },
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

// ─── Main Execution ─────────────────────────────────────────────────────────────
async function main() {
  console.log('Fetching dynamic routes from Sanity...');
  try {
    const posts = await sanityClient.fetch(`*[_type == "post"]{
      "slug": slug.current,
      title,
      snippet,
      "date": publishedAt,
      "imageUrl": image.asset->url
    }`);

    const dynamicRoutes = posts.map(post => ({
      path: `/blog/${post.slug}`,
      title: `${post.title} | Digital Vint Blog`,
      description: post.snippet || `Read ${post.title} on the Digital Vint Blog.`,
      schema: {
        "@type": "Article",
        "headline": post.title,
        "description": post.snippet || `Read ${post.title} on the Digital Vint Blog.`,
        "image": post.imageUrl ? [post.imageUrl] : [],
        "datePublished": post.date,
        "author": { "@type": "Person", "name": "Digital Vint Team" },
        "publisher": { "@type": "Organization", "name": "Digital Vint", "logo": "https://zugkwxy0oqkvrsu5.public.blob.vercel-storage.com/Digitalvint.png" }
      }
    }));

    console.log(`Discovered ${dynamicRoutes.length} dynamic blog posts.`);
    routes.push(...dynamicRoutes);
  } catch (error) {
    console.error('Failed to fetch from Sanity. Proceeding with static routes only.', error);
  }

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
}

main().catch(console.error);
