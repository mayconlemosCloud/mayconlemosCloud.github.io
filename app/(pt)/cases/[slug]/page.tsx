import CasePage from '@/components/CasePage';
import { getCases, slugs } from '@/lib/cases';
import { pageMetadata } from '@/lib/site';

type Params = Promise<{ slug: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const c = getCases('pt').find((x) => x.slug === slug)!;
  return pageMetadata('pt', `/cases/${slug}/`, `${c.titulo} · Maycon Lemos`, c.resumo);
}

export default async function Page({ params }: { params: Params }) {
  const { slug } = await params;
  return <CasePage lang="pt" slug={slug} />;
}
