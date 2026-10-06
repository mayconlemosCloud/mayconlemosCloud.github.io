import Home from '@/components/Home';
import { ui } from '@/lib/i18n';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata('pt', '/', ui.pt.meta.title, ui.pt.meta.description);

export default function Page() {
  return <Home lang="pt" />;
}
