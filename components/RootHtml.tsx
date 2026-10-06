import Link from 'next/link';
import type { ReactNode } from 'react';
import { langs, langLabel, htmlLang, localize, ui, type Lang } from '@/lib/i18n';
import { fraunces, inter } from '@/lib/site';
import LangSwitch from './LangSwitch';

// Idioma automático: só na primeira visita, só nas páginas em português (sem prefixo)
// e só se o visitante ainda não escolheu um idioma. Links compartilhados em /en ou /fr são respeitados.
const detectarIdioma = `(function(){try{
if(document.documentElement.dataset.lang!=='pt')return;
if(localStorage.getItem('lang'))return;
var prefs=navigator.languages&&navigator.languages.length?navigator.languages:[navigator.language];
var want='en';
for(var i=0;i<prefs.length;i++){var c=String(prefs[i]||'').slice(0,2).toLowerCase();if(c==='pt'||c==='en'||c==='fr'){want=c;break;}}
if(want!=='pt')location.replace('/'+want+location.pathname+location.hash);
}catch(e){}})();`;

interface Props {
  lang: Lang;
  children: ReactNode;
}

export default function RootHtml({ lang, children }: Props) {
  const t = ui[lang];
  const home = localize('/', lang);

  return (
    <html lang={htmlLang[lang]} data-lang={lang} className={`${fraunces.variable} ${inter.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: detectarIdioma }} />
      </head>
      <body>
        <header className="topbar">
          <div className="wrap topbar-inner">
            <Link href={home} className="brand">
              Maycon Lemos
            </Link>
            <nav aria-label="Principal">
              <a href={`${home}#cases`}>{t.nav.cases}</a>
              <a href={`${home}#experiencia`}>{t.nav.experiencia}</a>
              <a href={`${home}#como-trabalho`}>{t.nav.comoTrabalho}</a>
              <a href={`${home}#agora`}>{t.nav.agora}</a>
              <a href={`${home}#contato`}>{t.nav.contato}</a>
            </nav>
            <a className="cv-link" href={t.curriculo.arquivo} target="_blank" rel="noopener">
              {t.curriculo.curto}
            </a>
            <LangSwitch
              current={lang}
              label={t.idioma}
              options={langs.map((l) => ({ lang: l, label: langLabel[l], htmlLang: htmlLang[l] }))}
            />
          </div>
        </header>
        <main>{children}</main>
        <footer className="footer">
          <div className="wrap footer-inner">
            <span>© {new Date().getFullYear()} Maycon Lemos</span>
            <span>{t.footer}</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
