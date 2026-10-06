import Home from '@/components/Home';
import { ui, type Lang } from '@/lib/i18n';
import { pageMetadata } from '@/lib/site';

type Params = Promise<{ lang: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const lang = (await params).lang as Lang;
  return pageMetadata(lang, '/', ui[lang].meta.title, ui[lang].meta.description);
}

export default async function Page({ params }: { params: Params }) {
  const lang = (await params).lang as Lang;
  return <Home lang={lang} />;
}
