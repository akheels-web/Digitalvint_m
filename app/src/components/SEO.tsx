import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  article?: boolean;
}

const SEO = ({ 
  title = "Digital Vint | Best Digital Marketing Agency in Hyderabad | SEO & Web Development",
  description = "Digital Vint creates high‑converting websites that turn visitors into customers. Trusted by 200+ brands, we offer expert web design, custom development, and digital marketing services in Hyderabad. Get a free quote today!",
  keywords = "digital marketing agency hyderabad, seo services hyderabad, web development hyderabad, social media marketing, digital marketing telangana, best digital marketing company hyderabad, website design hyderabad, online marketing agency",
  image = "https://digitalvint.com/og-image.jpg",
  article = false
}: SEOProps) => {
  const location = useLocation();
  const currentUrl = `https://digitalvint.com${location.pathname}`;
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Digital Vint - Digital Marketing Agency',
    url: 'https://digitalvint.com',
    description: 'Award-winning digital marketing agency in Hyderabad offering SEO, web development, social media marketing, and complete digital solutions.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://digitalvint.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Digital Vint',
    alternateName: 'Digital Vint Marketing Agency',
    url: 'https://digitalvint.com',
    logo: 'https://digitalvint.com/wp-content/uploads/2024/09/DV-White-2048x569.png',
    description: 'Leading digital marketing agency in Hyderabad specializing in SEO, web development, and social media marketing.',
    foundingDate: '2018',
    founders: [
      {
        '@type': 'Person',
        name: 'Digital Vint Team',
      },
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Banjara Hills',
      addressLocality: 'Hyderabad',
      addressRegion: 'Telangana',
      postalCode: '500034',
      addressCountry: 'IN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-93917-95320',
      contactType: 'sales',
      availableLanguage: ['English', 'Hindi', 'Telugu'],
    },
    sameAs: [
      'https://www.facebook.com/digitalvint',
      'https://www.instagram.com/digitalvint',
      'https://www.linkedin.com/company/digitalvint',
      'https://twitter.com/digitalvint',
    ],
    areaServed: [
      {
        '@type': 'City',
        name: 'Hyderabad',
      },
      {
        '@type': 'State',
        name: 'Telangana',
      },
      {
        '@type': 'Country',
        name: 'India',
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Digital Marketing Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'SEO Services',
            description: 'Search engine optimization to improve your website ranking',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Web Development',
            description: 'Custom website design and development',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Social Media Marketing',
            description: 'Complete social media management and advertising',
          },
        },
      ],
    },
  };

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Digital Vint',
    image: 'https://digitalvint.com/og-image.jpg',
    '@id': 'https://digitalvint.com',
    url: 'https://digitalvint.com',
    telephone: '+91-93917-95320',
    priceRange: '₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Banjara Hills',
      addressLocality: 'Hyderabad',
      addressRegion: 'Telangana',
      postalCode: '500034',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 17.4123,
      longitude: 78.4486,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '10:00',
        closes: '14:00',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '182',
    },
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Digital Marketing',
    provider: {
      '@type': 'Organization',
      name: 'Digital Vint',
    },
    areaServed: {
      '@type': 'City',
      name: 'Hyderabad',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Digital Marketing Packages',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Starter Package',
            description: 'Perfect for small businesses starting their digital journey',
          },
          price: '8000',
          priceCurrency: 'INR',
          priceValidUntil: '2026-12-31',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Growth Package',
            description: 'Ideal for growing businesses seeking expansion',
          },
          price: '18000',
          priceCurrency: 'INR',
          priceValidUntil: '2026-12-31',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Agency Package',
            description: 'Complete solution for enterprises and agencies',
          },
          price: '35000',
          priceCurrency: 'INR',
          priceValidUntil: '2026-12-31',
        },
      ],
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://digitalvint.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Services',
        item: 'https://digitalvint.com/#services',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Our Process',
        item: 'https://digitalvint.com/#process',
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Contact',
        item: 'https://digitalvint.com/#contact',
      },
    ],
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Digital Vint" />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />
      
      {/* Language and Region */}
      <html lang="en-IN" />
      <meta name="language" content="English" />
      <meta name="geo.region" content="IN-TG" />
      <meta name="geo.placename" content="Hyderabad" />
      <meta name="geo.position" content="17.4123;78.4486" />
      <meta name="ICBM" content="17.4123, 78.4486" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={article ? "article" : "website"} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:site_name" content="Digital Vint" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={currentUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      
      {/* Mobile Optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      <meta name="theme-color" content="#000000" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="Digital Vint" />
      
      {/* Verification Tags (placeholder - replace with actual values) */}
      <meta name="google-site-verification" content="your-google-verification-code" />
      <meta name="msvalidate.01" content="your-bing-verification-code" />
      
      {/* Preconnect for Performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(serviceSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
      
      {/* Additional SEO Meta Tags */}
      <meta name="revisit-after" content="7 days" />
      <meta name="rating" content="general" />
      <meta name="distribution" content="global" />
      <meta name="coverage" content="Worldwide" />
      <meta name="target" content="all" />
      <meta name="HandheldFriendly" content="True" />
      <meta name="MobileOptimized" content="320" />
      
      {/* PWA Manifest */}
      <link rel="manifest" href="/manifest.json" />
      
      {/* Favicon */}
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="alternate icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      
      {/* Alternate Languages */}
      <link rel="alternate" hrefLang="en-in" href="https://digitalvint.com" />
      <link rel="alternate" hrefLang="x-default" href="https://digitalvint.com" />
    </Helmet>
  );
};

export default SEO;
