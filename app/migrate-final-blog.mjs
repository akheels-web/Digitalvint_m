
import { createClient } from '@sanity/client';

const token = process.argv[2];
if (!token) {
  console.error('❌ Usage: node migrate-final-blog.mjs <SANITY_WRITE_TOKEN>');
  process.exit(1);
}

const client = createClient({
  projectId: 'x6r02qtl',
  dataset: 'production',
  apiVersion: '2024-03-12',
  token,
  useCdn: false,
});

const postBody = {
  _type: 'post',
  _id: 'how-local-businesses-hyderabad-get-more-customers-online-2026',
  title: 'How Local Businesses in Hyderabad Can Get More Customers Online in 2026',
  slug: { _type: 'slug', current: 'how-local-businesses-hyderabad-get-more-customers-online-2026' },
  snippet: 'A no-fluff, 2026-accurate guide for Hyderabad business owners — covering AI search, Google Business Profile, WhatsApp, paid ads, and the exact steps that separate businesses getting 50+ leads a month from those getting none.',
  author: 'Digital Vint Team',
  date: '2026-04-16',
  readTime: '10 min read',
  category: 'Marketing',
  tags: ['Local SEO', 'Google Business Profile', 'WhatsApp Marketing', 'Google Ads', 'AI Search', 'Hyderabad', 'Small Business'],
  aiSummary: [
    '91% of Hyderabad consumers now use Google before making a purchase decision.',
    'AI search (ChatGPT, Perplexity) has changed how customers discover local businesses forever.',
    'WhatsApp is now the #1 sales channel for local businesses ahead of phone calls.',
    'A ₹10,000/month Google Ads budget can generate 40–80 qualified leads when done right.',
  ],
  content: [
    block('p', 'Let\'s say a potential customer in Banjara Hills needs an interior designer. Right now, in 2026, here\'s what they do: they open ChatGPT, type "best interior designer near me Hyderabad", get three instant recommendations — and call the first name. Not Google\'s first result. Not a Facebook ad. An AI answer.'),
    block('p', 'If your business isn\'t structured to be discovered by AI engines, Google Maps, and mobile search simultaneously, you are invisible to a growing segment of your best potential customers. And that window is closing faster than most business owners realise.'),
    block('p', 'This guide is for Hyderabad business owners who are done with generic advice and want a concrete 2026 playbook — no fluff, no outdated tactics, no one-size-fits-all strategies that don\'t account for how our local market actually works.'),
    
    block('h2', 'The 2026 Reality: How Hyderabad Customers Find Businesses'),
    block('p', 'Before we talk about what to do, you need to understand what\'s already happening. The customer discovery journey in Hyderabad has split into three parallel paths in 2026:'),
    
    block('p', '📊 61% Start on Google Maps or Google Search on mobile.'),
    block('p', '🤖 24% Use AI tools (ChatGPT, Perplexity, Gemini) for service recommendations.'),
    block('p', '📱 15% Discover through Instagram Reels or YouTube Shorts before searching.'),
    
    block('p', 'That 24% using AI tools? It was effectively 0% in 2023. It\'s growing by the month. And the businesses that get cited in AI answers are not necessarily the biggest or the oldest — they\'re the ones with the most structured, crawlable, and authoritative digital presence.'),
    
    callout('info', 'Strategic Mindset', 'Your Google Business Profile is now more valuable than your website homepage. For local businesses, it is the first and sometimes only impression a customer gets before deciding to call you.'),
    
    block('h2', 'Step 1: Your Google Business Profile is Your Storefront — Treat It That Way'),
    block('p', 'Most Hyderabad business owners created a Google Business Profile two years ago, put their address and phone number in, and never touched it again. This is equivalent to leaving your actual shop dark, locked, and signage-free.'),
    block('p', 'In 2026, an active, fully optimised Google Business Profile is one of the highest-ROI investments a local business can make — and it costs nothing except your time.'),
    
    callout('success', '✅ The 2026 GBP Optimisation Checklist', '• All categories selected (primary + up to 9 secondary)\n• Business hours accurate including holiday hours\n• 20+ high-quality photos (interior, exterior, team, products/work)\n• Products or Services section fully populated\n• Posts published weekly (think of it like Instagram for Google)\n• Q&A section actively managed\n• Reply to every review — positive and negative — within 24 hours\n• WhatsApp number linked and messaging enabled'),
    
    block('p', 'One number that should motivate you: businesses with 4.5+ star ratings and 50+ reviews on Google receive 7x more website clicks than competitors with fewer than 10 reviews, according to 2025 BrightLocal data. In Hyderabad\'s competitive market — especially for restaurants, salons, clinics, and real estate — that gap is definitive.'),
    block('p', 'The review velocity strategy that works in 2026: Build a simple WhatsApp message template. After every completed project or service, send: "Hi [Name], thanks for choosing us! If you\'re happy with the results, a quick Google review helps us a lot. Here\'s the link: [direct review link]." That\'s it. Just a timely, personal ask.'),
    
    block('h2', 'Step 2: Your Website Must Earn Enquiries, Not Just Look Good'),
    block('p', 'At Digital Vint, we review dozens of Hyderabad business websites every month. The most common failure we see is a beautiful website that converts zero visitors into enquiries. Beautiful design is necessary — but it\'s not sufficient.'),
    
    block('h3', '❌ What Website Loses Customers'),
    bulletList([
      'Loads in 5+ seconds on mobile',
      'No clear phone number or WhatsApp button',
      'Generic "About Us" with no proof',
      'Contact form buried at the bottom',
      'No real client photos or results'
    ]),
    
    block('h3', '✅ Website That Generates Leads'),
    bulletList([
      'Loads under 2 seconds on mobile',
      'WhatsApp button visible at all times',
      'Specific outcomes, client names, photos',
      'CTA above the fold on every page',
      'Before/after results or case studies'
    ]),
    
    block('p', 'The most important single element on your website in 2026? A sticky WhatsApp button. Hyderabad consumers have been conditioned to expect instant, conversational responses. Make the path from "I\'m interested" to "I\'m talking to someone" as short as possible.'),
    block('p', 'Page speed is non-negotiable in 2026. If your Largest Contentful Paint (LCP) is above 2.5 seconds, you are actively being penalised in search rankings.'),
    
    block('h2', 'Step 3: Local SEO in 2026 — What\'s Changed, What Still Works'),
    block('p', 'Local SEO in 2026 is simultaneously simpler (the fundamentals haven\'t changed) and more complex (AI search has added a new layer).'),
    
    block('h3', 'What Still Works Exactly as It Did'),
    bulletList([
      'NAP consistency — Name, Address, and Phone identical everywhere',
      'Local keyword targeting — specific areas like Banjara Hills or Madhapur',
      'Backlinks from local sources — directories and local event sponsorships',
      'On-page SEO basics — proper H1 tags and meta descriptions'
    ]),
    
    callout('info', '🤖 AI Search Visibility', 'When a Hyderabad resident asks ChatGPT or Perplexity for a recommendation, it searches the web in real-time and cites specific sources. To be cited, your website needs: clear service descriptions, FAQ sections with real questions local customers ask, and mentions from third-party review sites. This is called AI SEO — and it\'s the fastest growing source of discovery in 2026.'),
    
    block('h2', 'Step 4: Google Ads — The Fastest Route to Enquiries When Done Right'),
    block('p', 'The honest answer: yes, if the setup is right — and almost always no, if you set it up yourself using Google\'s automated suggestions.'),
    
    callout('info', 'Budget ROI', 'A ₹10,000/month budget managed correctly generates 40–80 qualified leads for local service businesses in Hyderabad. Managed correctly means: Radius targeting, aggressive negative keywords, and landing pages that match search intent.'),
    
    block('h3', 'What "Managed Correctly" Actually Means'),
    bulletList([
      'Hyper-local targeting — Radius targeting saves 30–40% budget waste',
      'Negative keywords — Exclude "free", "jobs", "salary"',
      'Landing pages — Send visitors to a relevant page, not the homepage',
      'Call extensions — Tap to call or message directly from the ad',
      'Conversion tracking — Knowing exactly which keyword works'
    ]),
    
    block('h2', 'Step 5: WhatsApp as a Sales Channel — Not Just Communication'),
    block('p', 'In 2026, the businesses winning with WhatsApp use it proactively as a structured sales pipeline.'),
    
    callout('success', 'WhatsApp Business Checklist', '• Business profile complete with hours and website\n• Quick replies for top 5 common questions\n• Auto-reply message for after-hours\n• Labels to categorize New Enquiry, Follow-up, Won, Lost\n• Broadcast lists for past clients'),
    
    block('h2', 'Step 6: Short-Form Video — The Trust Builder That Works in Hyderabad'),
    block('p', 'YouTube Shorts and Instagram Reels have become the most cost-effective brand awareness tools. You don\'t need a production team. You need a phone and something worth showing.'),
    block('p', 'The content that works: Before and After, Process Videos, 1-minute Tips, and Client Reactions. Aim for 3 Reels/Shorts per week. Consistency beats quality every time in 2026.'),
    
    block('h2', 'The Hyderabad Business Owner\'s 30-Day Quick Start Plan'),
    
    block('h3', 'Week 1 — Foundation'),
    block('p', 'Fully complete your Google Business Profile. Request 5 reviews. Set up WhatsApp Business.'),
    
    block('h3', 'Week 2 — Website Audit'),
    block('p', 'Speed check. Add a sticky WhatsApp button. Ensure CTA is above the fold.'),
    
    block('h3', 'Week 3 — Content Starts'),
    block('p', 'Post first 3 Instagram Reels. Create a Google Business post.'),
    
    block('h3', 'Week 4 — Paid Amplification'),
    block('p', 'Launch a small, radius-targeted Google Ads campaign for your best service.'),
    
    block('h2', 'What Separates Businesses Getting 50+ Leads Per Month from Those Getting None'),
    block('p', 'It\'s almost never the product quality — it\'s the consistency and structure of their digital presence. Winners have 50+ reviews, a fast site, at least one paid channel, and consistent social presence. These are learnable systems. Start today.'),
    
    callout('success', 'Get Your Free Audit', 'We offer a free digital presence audit for Hyderabad businesses — covering your Google visibility, website performance, and top 3 quick wins. WhatsApp +91 93917 95320 to get started.')
  ]
};

// Portable Text Helpers
function block(style, text) {
  return {
    _type: 'block',
    _key: Math.random().toString(36).slice(2, 10),
    style,
    children: [{ _type: 'span', _key: Math.random().toString(36).slice(2, 5), marks: [], text }],
    markDefs: []
  };
}

function bulletList(items) {
  return items.map(item => ({
    _type: 'block',
    _key: Math.random().toString(36).slice(2, 10),
    style: 'normal',
    listItem: 'bullet',
    level: 1,
    children: [{ _type: 'span', _key: Math.random().toString(36).slice(2, 5), marks: [], text: item }],
    markDefs: []
  }));
}

function callout(type, title, text) {
  return {
    _type: 'callout',
    _key: Math.random().toString(36).slice(2, 10),
    type, // 'info', 'warning', 'success'
    title,
    text
  };
}

postBody.content = postBody.content.flat();

async function run() {
  console.log('🚀 Migrating CORRECT Full-Length Post to Sanity...');
  const result = await client.createOrReplace(postBody);
  console.log('✅ Successfully published full article:', result._id);
}

run().catch(err => console.error('❌ Failed:', err));
