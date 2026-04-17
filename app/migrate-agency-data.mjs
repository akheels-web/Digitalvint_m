import { createClient } from '@sanity/client';
import axios from 'axios';
import dotenv from 'dotenv';
import { worksData } from './src/data/works.js';
import { servicesData } from './src/data/services.js';
import { testimonialsData } from './src/data/testimonials.js';
import { clientsData } from './src/data/clients.js';

dotenv.config();

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || 'x6r02qtl',
  dataset: 'production',
  useCdn: false,
  token: process.env.SANITY_AUTH_TOKEN, 
  apiVersion: '2023-05-03',
});

async function uploadImageFromUrl(url) {
  if (!url || url.includes('ui-avatars.com')) return null;
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data);
    const asset = await client.assets.upload('image', buffer, {
      filename: url.split('/').pop(),
    });
    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id,
      },
    };
  } catch (error) {
    console.error(`Failed to upload image: ${url}`, error.message);
    return null;
  }
}

async function migrateWorks() {
  console.log('--- Migrating Portfolio (Works) ---');
  for (const work of worksData) {
    const mainImage = await uploadImageFromUrl(work.image);
    
    const doc = {
      _type: 'caseStudy',
      _id: `work-${work.slug}`,
      title: work.title,
      slug: { _type: 'slug', current: work.slug },
      location: work.location || 'Hyderabad, India',
      year: work.year,
      description: work.description,
      challenge: work.challenge,
      solution: work.solution,
      mainImage: mainImage,
      results: work.stats.map(s => ({
        _key: Math.random().toString(36).substring(7),
        metric: s.value,
        label: s.label
      })),
      tags: work.tags,
      websiteUrl: work.link === '#' ? undefined : work.link,
    };

    try {
      await client.createOrReplace(doc);
      console.log(`✅ Migrated Work: ${work.title}`);
    } catch (err) {
      console.error(`❌ Failed to migrate Work: ${work.title}`, err.message);
    }
  }
}

async function migrateServices() {
  console.log('\n--- Migrating Services ---');
  for (const service of servicesData) {
    const mainImage = await uploadImageFromUrl(service.image);
    
    const doc = {
      _type: 'service',
      _id: `service-${service.slug}`,
      number: service.number,
      title: service.title,
      slug: { _type: 'slug', current: service.slug },
      description: service.description,
      features: service.features,
      iconName: typeof service.icon === 'string' ? service.icon : service.slug, 
      imageUrl: service.image, // fallback
      mainImage: mainImage,
      color: service.color,
      longContent: service.longContent, 
    };

    try {
      await client.createOrReplace(doc);
      console.log(`✅ Migrated Service: ${service.title}`);
    } catch (err) {
      console.error(`❌ Failed to migrate Service: ${service.title}`, err.message);
    }
  }
}

async function migrateTestimonials() {
  console.log('\n--- Migrating Testimonials ---');
  for (const t of testimonialsData) {
    const avatar = await uploadImageFromUrl(t.image);
    const doc = {
      _type: 'testimonial',
      _id: `testimonial-${t.id}`,
      name: t.name,
      designation: t.role,
      company: t.company,
      quote: t.content,
      rating: t.rating,
      avatar: avatar,
    };
    try {
      await client.createOrReplace(doc);
      console.log(`✅ Migrated Testimonial: ${t.name}`);
    } catch (err) {
      console.error(`❌ Failed to migrate Testimonial: ${t.name}`, err.message);
    }
  }
}

async function migrateClients() {
  console.log('\n--- Migrating Client Logos ---');
  for (const c of clientsData) {
    const logo = await uploadImageFromUrl(c.logoUrl);
    const doc = {
      _type: 'clientLogo',
      _id: `client-${c.name.toLowerCase().replace(/\s+/g, '-')}`,
      name: c.name,
      initials: c.initials,
      logo: logo,
      isActive: true,
    };
    try {
      await client.createOrReplace(doc);
      console.log(`✅ Migrated Client: ${c.name}`);
    } catch (err) {
      console.error(`❌ Failed to migrate Client: ${c.name}`, err.message);
    }
  }
}

async function migrateSiteSettings() {
  console.log('\n--- Initializing Site Settings ---');
  const doc = {
    _type: 'siteSettings',
    _id: 'siteSettings',
    agencyName: 'Digital Vint',
    description: 'Digital Marketing & Web Design Agency in Hyderabad. We help local businesses turn visitors into customers through high-converting websites and SEO.',
    address: 'Hyderabad, India',
    phone: '+91 XXXXX XXXXX',
    email: 'hello@digitalvint.com',
    whatsappNumber: '91XXXXXXXXXX',
    socialLinks: [
      { _key: '1', platform: 'Instagram', url: 'https://instagram.com/digitalvint' },
      { _key: '2', platform: 'LinkedIn', url: 'https://linkedin.com/company/digitalvint' },
    ],
  };
  try {
    await client.createOrReplace(doc);
    console.log('✅ Initialized Site Settings');
  } catch (err) {
    console.error('❌ Failed to initialize Site Settings', err.message);
  }
}

async function migrateCTAs() {
  console.log('\n--- Initializing Marketing CTAs ---');
  const ctas = [
    {
      _type: 'cta',
      _id: 'cta-free-audit',
      title: 'Free SEO Audit',
      heading: 'Is your website losing customers?',
      subheading: 'Get a free high-level SEO audit and discover how you can grow your traffic by 200%.',
      buttonText: 'Get My Free Audit',
      buttonLink: '/contact',
      variant: 'premium',
    },
    {
      _type: 'cta',
      _id: 'cta-book-call',
      title: 'Book a Strategy Call',
      heading: 'Ready to scale your business?',
      subheading: 'Schedule a 15-minute discovery call to see how we can help you hit your revenue goals.',
      buttonText: 'Book My Call',
      buttonLink: '/contact',
      variant: 'premium',
    }
  ];
  for (const cta of ctas) {
    try {
      await client.createOrReplace(cta);
      console.log(`✅ Created CTA: ${cta.title}`);
    } catch (err) {
      console.error(`❌ Failed to create CTA: ${cta.title}`, err.message);
    }
  }
}

async function main() {
  await migrateWorks();
  await migrateServices();
  await migrateTestimonials();
  await migrateClients();
  await migrateSiteSettings();
  await migrateCTAs();
  console.log('\n🌟 Complete Agency Migration Finished! Your Studio is now fully loaded.');
}

main();
