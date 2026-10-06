import type { Metadata } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import { langs, htmlLang, localize, type Lang } from './i18n';

export const siteUrl = 'https://mayconlemoscloud.github.io';

export const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-fraunces',
  display: 'swap',
});

export const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-inter',
  display: 'swap',
});

/** Metadados comuns: canonical, hreflang por idioma e Open Graph. */
export function pageMetadata(lang: Lang, path: string, title: string, description: string): Metadata {
  const languages = Object.fromEntries(langs.map((l) => [htmlLang[l], localize(path, l)]));
  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    icons: { icon: '/favicon.png' },
    alternates: {
      canonical: localize(path, lang),
      languages: { ...languages, 'x-default': path },
    },
    openGraph: {
      title,
      description,
      type: 'website',
      locale: htmlLang[lang].replace('-', '_'),
      images: ['/fotos/cena1-bracos-cruzados-bege.webp'],
    },
    twitter: { card: 'summary_large_image' },
  };
}
