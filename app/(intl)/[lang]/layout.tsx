import type { ReactNode } from 'react';
import RootHtml from '@/components/RootHtml';
import type { Lang } from '@/lib/i18n';
import '../../globals.css';

// Português fica na raiz (app/(pt)); aqui só os idiomas com prefixo.
export const dynamicParams = false;

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'fr' }];
}

export default async function Layout({ children, params }: { children: ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return <RootHtml lang={lang as Lang}>{children}</RootHtml>;
}
