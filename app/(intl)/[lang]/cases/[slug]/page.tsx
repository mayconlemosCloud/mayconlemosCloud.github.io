import CasePage from '@/components/CasePage';
import { getCases, slugs } from '@/lib/cases';
import type { Lang } from '@/lib/i18n';
import { pageMetadata } from '@/lib/site';

type Params = Promise<{ lang: string; slug: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { lang, slug } = await params;
  const c = getCases(lang as Lang).find((x) => x.slug === slug)!;
  return pageMetadata(lang as Lang, `/cases/${slug}/`, `${c.titulo} · Maycon Lemos`, c.resumo);
}

export default async function Page({ params }: { params: Params }) {
  const { lang, slug } = await params;
  return <CasePage lang={lang as Lang} slug={slug} />;
}
