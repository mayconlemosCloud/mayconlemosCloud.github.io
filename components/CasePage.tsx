import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCases } from '@/lib/cases';
import { ui, localize, type Lang } from '@/lib/i18n';

export default function CasePage({ lang, slug }: { lang: Lang; slug: string }) {
  const t = ui[lang].casePage;
  const cases = getCases(lang);
  const idx = cases.findIndex((x) => x.slug === slug);
  if (idx === -1) notFound();
  const c = cases[idx];
  const proximo = cases[(idx + 1) % cases.length];

  return (
    <article className="wrap case-page">
      <Link href={localize('/#cases', lang)} className="voltar">
        {t.todos}
      </Link>

      <header className="case-header">
        <p className="eyebrow">
          {t.case} {c.numero}
        </p>
        <h1 className="display">{c.titulo}</h1>
        <p className="lead">{c.resumo}</p>
        <div className="stack">
          {c.stack.map((s) => (
            <span className="chip" key={s}>
              {s}
            </span>
          ))}
        </div>
        <div className="links">
          <a className="link-arrow" href={c.repo} target="_blank" rel="noopener">
            {t.codigo}
          </a>
          {c.demo && (
            <a className="link-arrow" href={c.demo} target="_blank" rel="noopener">
              {t.demo}
            </a>
          )}
        </div>
      </header>

      {c.resultados && (
        <section className="bloco">
          <h2>{t.resultados}</h2>
          <div className="metricas">
            {c.resultados.map((r) => (
              <div key={r.rotulo}>
                <span className="metrica-valor">{r.valor}</span>
                <span className="metrica-rotulo">{r.rotulo}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="bloco">
        <h2>{t.problema}</h2>
        <p>{c.problema}</p>
      </section>

      <section className="bloco">
        <h2>{t.arquitetura}</h2>
        <ul>
          {c.arquitetura.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      </section>

      <section className="bloco">
        <h2>{t.decisoes}</h2>
        <div className="decisoes">
          {c.decisoes.map((d) => (
            <div key={d.titulo}>
              <h3>{d.titulo}</h3>
              <p>{d.texto}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bloco">
        <h2>{t.aprendizados}</h2>
        <ul>
          {c.aprendizados.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      </section>

      <Link href={localize(`/cases/${proximo.slug}/`, lang)} className="proximo">
        <span className="eyebrow">{t.proximo}</span>
        <span className="display proximo-title">{proximo.titulo} →</span>
      </Link>
    </article>
  );
}
