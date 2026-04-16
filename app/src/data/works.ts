export interface WorkStat {
  label: string;
  value: string;
}

export interface WorkItem {
  id: number;
  slug: string;
  title: string;
  client: string;
  category: string;
  logo: string;
  description: string;
  challenge: string;
  solution: string;
  image: string;
  tags: string[];
  stats: WorkStat[];
  link: string;
  year: string;
  location: string;
}

export const worksData: WorkItem[] = [
  {
    id: 1,
    slug: 'zaid-book-depot',
    title: 'Zaid Book Depot',
    client: 'Zaid Book Depot',
    category: 'E-Commerce',
    location: 'Hyderabad, India',
    year: '2024',
    logo: 'https://zugkwxy0oqkvrsu5.public.blob.vercel-storage.com/zaid%20book%20depot.webp',
    description: 'We built a user-friendly eCommerce website for Zaid Book Depot, an online bookstore offering a wide range of academic and general books. The platform ensures smooth browsing, easy checkout, and a seamless shopping experience.',
    challenge: 'Zaid Book Depot had an established offline presence but zero online sales channel. Students and parents had no way to browse or order books online, and the business was losing customers to larger e-commerce platforms.',
    solution: 'We built a full Shopify store with a clean, category-driven product structure, integrated Razorpay for UPI and card payments, and implemented a fast mobile checkout flow. We also set up basic product SEO so individual book pages could rank on Google.',
    image: 'https://zugkwxy0oqkvrsu5.public.blob.vercel-storage.com/zaid%20book%20depot.webp',
    tags: ['Shopify', 'E-Commerce', 'UX Design', 'Razorpay'],
    stats: [
      { label: 'Online Traffic Growth', value: '+150%' },
      { label: 'Checkout Conversion Rate', value: '+85%' },
      { label: 'Mobile Orders', value: '70%+' },
    ],
    link: '#',
  },
  {
    id: 2,
    slug: 'the-observer-post',
    title: 'The Observer Post',
    client: 'The Observer Post',
    category: 'News Portal',
    location: 'Hyderabad, India',
    year: '2023',
    logo: 'https://zugkwxy0oqkvrsu5.public.blob.vercel-storage.com/the%20observer%20post.webp',
    description: 'We developed a clean and fast-loading news website for The Observer Post, ensuring easy navigation and real-time content updates for a seamless reading experience.',
    challenge: 'The Observer Post needed a modern news platform that could handle frequent content updates, support multiple categories, and load fast enough to retain readers who immediately bounce from slow news sites.',
    solution: 'We built a custom WordPress site with an optimised theme, category-based navigation, and Google AMP pages for fast mobile loading. We also structured metadata for Google News submission and implemented schema markup for article rich results.',
    image: 'https://zugkwxy0oqkvrsu5.public.blob.vercel-storage.com/the%20observer%20post.webp',
    tags: ['WordPress', 'Custom CMS', 'SEO', 'Google News'],
    stats: [
      { label: 'Organic Traffic Growth', value: '+200%' },
      { label: 'Reader Engagement', value: '+120%' },
      { label: 'Page Load Speed', value: '<1.5s' },
    ],
    link: '#',
  },
  {
    id: 3,
    slug: 'treasure-jewelry',
    title: 'Treasure Jewelry',
    client: 'Treasure',
    category: 'E-Commerce',
    location: 'Hyderabad, India',
    year: '2024',
    logo: 'https://zugkwxy0oqkvrsu5.public.blob.vercel-storage.com/treasure.webp',
    description: 'We built an elegant and responsive website for Treasure, a jewelry brand, highlighting their collections with stunning visuals and a smooth shopping experience.',
    challenge: 'Treasure had beautiful products but an outdated website that failed to convey the premium feel of the brand. The high bounce rate meant they were losing potential buyers before they even viewed a product.',
    solution: 'We redesigned the entire online experience — from a rich product gallery with zoom and hover interactions, to a streamlined checkout flow. We also added WhatsApp enquiry integration for customers who preferred to buy with a personal touch.',
    image: 'https://zugkwxy0oqkvrsu5.public.blob.vercel-storage.com/treasure.webp',
    tags: ['React', 'E-Commerce', 'UI/UX Design', 'WhatsApp Integration'],
    stats: [
      { label: 'Online Sales Growth', value: '+180%' },
      { label: 'Bounce Rate Reduction', value: '-40%' },
      { label: 'WhatsApp Enquiries/Month', value: '80+' },
    ],
    link: '#',
  },
  {
    id: 4,
    slug: 'agha-perfumes',
    title: 'Agha Perfumes',
    client: 'Agha Perfumes',
    category: 'Brand Website',
    location: 'Hyderabad, India',
    year: '2023',
    logo: 'https://zugkwxy0oqkvrsu5.public.blob.vercel-storage.com/agha%20perfumes.webp',
    description: 'Digital Vint delivered a beautiful, responsive brand website for Agha Perfumes with smooth animations and a design that perfectly captures the luxury feel of the brand.',
    challenge: 'Agha Perfumes is a premium fragrance brand that needed a digital presence that matched its luxury positioning. Their existing presence was limited to social media, with no dedicated website to capture leads or tell the brand story.',
    solution: 'We designed and built a brand-first website with cinematic scroll animations, a full product showcase, and a WhatsApp-first enquiry flow. The result was a site that felt like a luxury brand destination while being fully optimised for mobile.',
    image: 'https://zugkwxy0oqkvrsu5.public.blob.vercel-storage.com/agha%20perfumes.webp',
    tags: ['Web Design', 'Branding', 'Animation', 'Mobile-First'],
    stats: [
      { label: 'Lead Enquiries Growth', value: '+250%' },
      { label: 'Average Page Load', value: '0.8s' },
      { label: 'Mobile Traffic Share', value: '82%' },
    ],
    link: '#',
  },
  {
    id: 5,
    slug: 'psyke-tech',
    title: 'Psyke Tech',
    client: 'Psyke',
    category: 'Corporate / SaaS',
    location: 'Hyderabad, India',
    year: '2024',
    logo: 'https://zugkwxy0oqkvrsu5.public.blob.vercel-storage.com/psyke.webp',
    description: 'From design to deployment, everything was smooth. The website looks stunning and functions flawlessly — a clean, fast corporate site that converted visitors into qualified leads.',
    challenge: 'Psyke Tech is a technology company that needed to communicate complex offerings in a way that non-technical buyers could understand and act on. Their previous site was dense and failed to generate any incoming leads.',
    solution: 'We rearchitected the site around a problem → solution storytelling flow. Clear service sections, outcome-focused copywriting, and a prominent contact CTA above the fold. We used Next.js for fast page loads and SEO performance.',
    image: 'https://zugkwxy0oqkvrsu5.public.blob.vercel-storage.com/psyke.webp',
    tags: ['Next.js', 'Corporate', 'SEO', 'Lead Generation'],
    stats: [
      { label: 'Qualified Lead Signups', value: '+300%' },
      { label: 'Customer Retention', value: '+90%' },
      { label: 'Bounce Rate Reduction', value: '-55%' },
    ],
    link: '#',
  },
  {
    id: 6,
    slug: 'based-matrimony',
    title: 'Based Matrimony',
    client: 'Based Matrimony',
    category: 'Web Application',
    location: 'Hyderabad, India',
    year: '2023',
    logo: 'https://ui-avatars.com/api/?name=BM&background=0D0D12&color=fff&size=128&font-size=0.4',
    description: 'The team brought our vision to life with a vibrant and user-focused matrimony platform. Excellent design sense and execution — built for the modern Muslim marriage market.',
    challenge: 'Based Matrimony needed a fully custom matchmaking web application — not a templated site. The platform required real-time match browsing, profile management, and a privacy-first design for a sensitive category.',
    solution: 'We built a full-stack web application with React on the frontend and Node.js on the backend, with real-time filtering and a match algorithm. Privacy controls were built in from day one — no photos visible without verified login.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80',
    tags: ['React', 'Node.js', 'Real-time', 'Web Application'],
    stats: [
      { label: 'Registered Users Growth', value: '+500%' },
      { label: 'Successful Matches', value: '+400%' },
      { label: 'Daily Active Sessions', value: '2,000+' },
    ],
    link: '#',
  },
];
