'use client';

import { usePathname } from 'next/navigation';
import type { Lang } from '@/lib/i18n';

interface Option {
  lang: Lang;
  label: string;
  htmlLang: string;
}

interface Props {
  current: Lang;
  label: string;
  options: Option[];
}

/** Troca de idioma mantendo a página atual e salvando a escolha do visitante. */
export default function LangSwitch({ current, label, options }: Props) {
  const pathname = usePathname() ?? '/';
  const semPrefixo = pathname.replace(/^\/(en|fr)(?=\/|$)/, '') || '/';

  return (
    <div className="lang-switch" role="group" aria-label={label}>
      {options.map((o) => (
        <a
          key={o.lang}
          href={o.lang === 'pt' ? semPrefixo : `/${o.lang}${semPrefixo}`}
          hrefLang={o.htmlLang}
          lang={o.htmlLang}
          aria-current={o.lang === current ? 'true' : undefined}
          onClick={() => {
            try {
              localStorage.setItem('lang', o.lang);
            } catch {}
          }}
        >
          {o.label}
        </a>
      ))}
    </div>
  );
}
