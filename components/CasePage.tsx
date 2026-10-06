import { notFound } from 'next/navigation';
import { getCases } from '@/lib/cases';
import type { Lang } from '@/lib/i18n';

// Os cases não têm mais página própria: o endereço antigo só redireciona para o repositório,
// para não quebrar links já compartilhados.
export default function CasePage({ lang, slug }: { lang: Lang; slug: string }) {
  const c = getCases(lang).find((x) => x.slug === slug);
  if (!c) notFound();

  return (
    <>
      <meta httpEquiv="refresh" content={`0; url=${c.repo}`} />
      <meta name="robots" content="noindex" />
      <p className="wrap" style={{ padding: '64px 0' }}>
        <a className="link-arrow" href={c.repo}>
          {c.titulo} ↗
        </a>
      </p>
    </>
  );
}
