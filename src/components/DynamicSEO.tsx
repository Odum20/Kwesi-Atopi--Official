import React, { useEffect } from 'react';
import { Project, HeroContent } from '../types';
import { resolveAssetUrl } from '../lib/resolveAsset';

interface DynamicSEOProps {
  projects: Project[];
  experiments: Project[];
  heroContent: HeroContent;
}

export const DynamicSEO: React.FC<DynamicSEOProps> = ({
  projects,
  experiments,
  heroContent,
}) => {
  useEffect(() => {
    const allWorks = [...projects, ...experiments];
    const canonicalUrl = 'https://www.odum.dev/';
    const profileImage = 'https://res.cloudinary.com/dukipuswv/image/upload/v1790449072/85b8ad62-abb3-405a-9a6f-09880e2e113a_yfttez.png';

    // 1. Dynamic Meta Descriptions
    const metaDesc = heroContent.description || 'Digital workspace and portfolio of Kwesi Odum — Software Engineer & Builder crafting production-grade systems and applications.';
    
    const updateMetaTag = (selector: string, attr: string, value: string) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        if (selector.startsWith('meta[name=')) {
          const name = selector.match(/name="([^"]+)"/)?.[1];
          if (name) el.setAttribute('name', name);
        } else if (selector.startsWith('meta[property=')) {
          const prop = selector.match(/property="([^"]+)"/)?.[1];
          if (prop) el.setAttribute('property', prop);
        }
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };

    updateMetaTag('meta[name="description"]', 'content', metaDesc);
    updateMetaTag('meta[property="og:description"]', 'content', metaDesc);
    updateMetaTag('meta[name="twitter:description"]', 'content', metaDesc);

    // 2. Aggregate Authentic Technologies & Skills from Live Firestore Data
    const liveSkills = Array.from(
      new Set(
        allWorks.flatMap((p) => [
          ...p.tags,
          ...p.technologies,
        ])
      )
    );

    // 3. Build Dynamic Schema.org Graph
    const schemaData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Person',
          '@id': 'https://www.odum.dev/#person',
          name: 'Kwesi Odum',
          alternateName: 'Kwesi Atopi Odum',
          jobTitle: 'Software Engineer & Builder',
          description: metaDesc,
          url: canonicalUrl,
          image: profileImage,
          sameAs: [
            'https://github.com/Odum20',
            'https://www.linkedin.com/in/kwesi-atopi-odum-a70a21366',
            'https://www.tiktok.com/@kokonte9000',
            'https://www.instagram.com/kwesi.odum',
          ],
          knowsAbout: liveSkills.length > 0 ? liveSkills : [
            'Full-Stack Software Engineering',
            'Distributed Systems Architecture',
            'TypeScript',
            'React',
            'Cloud Architecture'
          ],
          hasPart: allWorks.map((work) => ({
            '@type': work.isExperiment ? 'CreativeWork' : 'SoftwareApplication',
            name: work.title,
            description: work.description,
            url: work.liveUrl || work.githubUrl || `https://www.odum.dev/#${work.id}`,
          }))
        },
        {
          '@type': 'ItemList',
          '@id': 'https://www.odum.dev/#portfolio-catalog',
          name: 'Kwesi Odum — Production Software, Systems & Engineering Prototypes',
          description: 'Authentic catalog of software systems, applications, and technical prototypes engineered and deployed by Kwesi Odum.',
          numberOfItems: allWorks.length,
          itemListElement: allWorks.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
              '@type': item.isExperiment ? 'CreativeWork' : 'SoftwareApplication',
              name: item.title,
              description: item.description,
              applicationCategory: item.tags.join(', '),
              operatingSystem: 'Cross-platform, Web, Cloud',
              url: item.liveUrl || item.githubUrl || `https://www.odum.dev/#${item.id}`,
              image: resolveAssetUrl(item.image),
              author: {
                '@id': 'https://www.odum.dev/#person',
              },
              datePublished: item.year || '2026',
              keywords: [...item.tags, ...item.technologies].join(', '),
            },
          })),
        },
        {
          '@type': 'ProfilePage',
          '@id': 'https://www.odum.dev/#profilepage',
          url: canonicalUrl,
          name: 'Kwesi Odum — Software Engineer & Builder',
          mainEntity: {
            '@id': 'https://www.odum.dev/#person',
          },
          description: metaDesc,
        },
      ],
    };

    // 4. Inject or Update Dynamic JSON-LD Script tag in <head>
    let scriptTag = document.getElementById('dynamic-seo-schema') as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'dynamic-seo-schema';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.text = JSON.stringify(schemaData, null, 2);

    // Clean up on unmount (if any)
    return () => {
      // Keep scriptTag intact for search crawlers
    };
  }, [projects, experiments, heroContent]);

  return null;
};
