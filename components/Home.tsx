import Image from 'next/image';
import Link from 'next/link';
import { getCases } from '@/lib/cases';
import { ui, links, localize, chips, empresas, prints, whatsappUrl, type Lang } from '@/lib/i18n';
import WhatsAppIcon from './WhatsAppIcon';

function iniciais(nome: string) {
  const partes = nome.split(' ');
  return (partes[0][0] + partes[partes.length - 1][0]).toUpperCase();
}

export default function Home({ lang }: { lang: Lang }) {
  const t = ui[lang];
  const cases = getCases(lang);

  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-text">
            <p className="eyebrow">{t.hero.eyebrow}</p>
            <h1 className="display hero-title">{t.hero.titulo}</h1>
            <p className="hero-sub">{t.hero.sub}</p>
            <div className="hero-cta">
              <a className="btn btn-primary" href="#cases">
                {t.hero.verCases}
              </a>
              <a className="btn" href={t.curriculo.arquivo} target="_blank" rel="noopener">
                {t.curriculo.label}
              </a>
              <a className="btn" href={links.linkedin} target="_blank" rel="noopener">
                LinkedIn
              </a>
              <a className="btn" href={links.github} target="_blank" rel="noopener">
                GitHub
              </a>
            </div>
          </div>
          <div className="hero-photo">
            <div className="photo-block" aria-hidden="true" />
            <Image
              src="/fotos/cena1-bracos-cruzados-bege.webp"
              alt={t.hero.fotoAlt}
              width={559}
              height={1050}
              priority
            />
          </div>
        </div>
      </section>

      <section className="empresas" aria-label={t.empresas.titulo}>
        <p className="empresas-titulo">{t.empresas.titulo}</p>
        <div className="marquee">
          <div className="marquee-track">
            {[...empresas, ...empresas].map((e, i) => (
              <span className="marquee-item" key={i} aria-hidden={i >= empresas.length ? true : undefined}>
                {e.logo ? (
                  <img src={e.logo} alt={e.nome} style={{ height: e.altura }} loading="lazy" />
                ) : (
                  e.nome
                )}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="video">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">{t.video.eyebrow}</p>
            <h2 className="display">{t.video.titulo}</h2>
          </div>
          <div className="video-wrap">
            <video controls preload="none" playsInline poster="/video/apresentacao-poster.jpg">
              <source src="/video/apresentacao.mp4" type="video/mp4" />
            </video>
          </div>
          <p className="video-nota">{t.video.nota}</p>
        </div>
      </section>

      <section className="section" id="cases">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">{t.cases.eyebrow}</p>
            <h2 className="display">{t.cases.titulo}</h2>
          </div>
          <ol className="cases">
            {cases.map((c) => (
              <li className="case" key={c.slug}>
                <Link href={localize(`/cases/${c.slug}/`, lang)} className="case-link">
                  <span className="case-num">{c.numero}</span>
                  <div className="case-body">
                    <h3 className="display case-title">{c.titulo}</h3>
                    <p className="case-resumo">{c.resumo}</p>
                    <div className="case-stack">
                      {c.stack.map((s) => (
                        <span className="chip" key={s}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="case-arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" id="experiencia">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">{t.experiencia.eyebrow}</p>
            <h2 className="display">{t.experiencia.titulo}</h2>
          </div>
          <ol className="exp">
            {t.experiencia.itens.map((e) => (
              <li key={e.periodo}>
                <span className="exp-periodo">{e.periodo}</span>
                <div>
                  <h3 className="exp-empresa">{e.empresa}</h3>
                  <p className="exp-cargo">{e.cargo}</p>
                  <p className="exp-texto">{e.texto}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" id="depoimentos">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">{t.depoimentos.eyebrow}</p>
            <h2 className="display">{t.depoimentos.titulo}</h2>
          </div>
          <div className="recs">
            {t.depoimentos.recomendacoes.map((r) => (
              <figure className="rec" key={r.nome}>
                <blockquote>“{r.texto}”</blockquote>
                <figcaption>
                  <span className="rec-avatar" aria-hidden="true">
                    {iniciais(r.nome)}
                  </span>
                  <span>
                    <strong>{r.nome}</strong>
                    <span className="rec-cargo">{r.cargo}</span>
                  </span>
                  <span className="rec-fonte">LinkedIn</span>
                </figcaption>
              </figure>
            ))}
          </div>
          <a className="link-arrow ver-linkedin" href={links.recomendacoes} target="_blank" rel="noopener">
            {t.depoimentos.verLinkedin} →
          </a>
          <h3 className="retro-titulo">{t.depoimentos.printsTitulo}</h3>
          <div className="prints">
            {prints.map((p, i) => (
              <figure className={p.largura > 900 ? 'print print-largo' : 'print'} key={p.src}>
                <Image src={p.src} alt={t.depoimentos.printsAlt[i]} width={p.largura} height={p.altura} />
                <figcaption>{t.depoimentos.legendas[p.tipo]}</figcaption>
              </figure>
            ))}
          </div>
          <p className="retro-fonte">{t.depoimentos.printsNota}</p>
        </div>
      </section>

      <section className="section" id="formacao">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">{t.formacao.eyebrow}</p>
            <h2 className="display">{t.formacao.titulo}</h2>
          </div>
          <ul className="certs">
            {t.formacao.itens.map((c) => (
              <li className="cert" key={c.titulo}>
                <span className="cert-emissor">{c.emissor}</span>
                <h3 className="cert-titulo">{c.titulo}</h3>
                <p className="cert-detalhe">{c.detalhe}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" id="como-trabalho">
        <div className="wrap split">
          <div className="split-photo">
            <div className="photo-block small" aria-hidden="true" />
            <Image src="/fotos/cena6-notebook.webp" alt={t.comoTrabalho.fotoAlt} width={907} height={1076} />
          </div>
          <div>
            <div className="section-head">
              <p className="eyebrow">{t.comoTrabalho.eyebrow}</p>
              <h2 className="display">{t.comoTrabalho.titulo}</h2>
            </div>
            <div className="principios">
              {t.comoTrabalho.principios.map((p) => (
                <article key={p.titulo}>
                  <h3>{p.titulo}</h3>
                  <p>{p.texto}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="sobre">
        <div className="wrap split reverse">
          <div>
            <div className="section-head">
              <p className="eyebrow">{t.sobre.eyebrow}</p>
              <h2 className="display">{t.sobre.titulo}</h2>
            </div>
            <div className="prose">
              {t.sobre.paragrafos.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            <div className="case-stack">
              {chips.map((c) => (
                <span className="chip" key={c}>
                  {c}
                </span>
              ))}
            </div>
          </div>
          <div className="split-photo">
            <div className="photo-block small" aria-hidden="true" />
            <Image src="/fotos/cena3-jeans-sereno.webp" alt={t.sobre.fotoAlt} width={738} height={1030} />
          </div>
        </div>
      </section>

      <section className="section" id="agora">
        <div className="wrap split">
          <div className="split-photo">
            <div className="photo-block small" aria-hidden="true" />
            <Image src="/fotos/cena5-tablet.webp" alt={t.agora.fotoAlt} width={923} height={1042} />
          </div>
          <div>
            <div className="section-head">
              <p className="eyebrow">{t.agora.eyebrow}</p>
              <h2 className="display">{t.agora.titulo}</h2>
            </div>
            <dl className="agora">
              {t.agora.itens.map((a) => (
                <div key={a.rotulo}>
                  <dt>{a.rotulo}</dt>
                  <dd>{a.texto}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="section contato" id="contato">
        <div className="wrap">
          <p className="eyebrow">{t.contato.eyebrow}</p>
          <h2 className="display contato-title">{t.contato.titulo}</h2>
          <div className="hero-cta">
            <a className="btn btn-whatsapp" href={whatsappUrl(t.whatsapp.mensagem)} target="_blank" rel="noopener">
              <WhatsAppIcon />
              {t.whatsapp.label}
            </a>
            <a className="btn btn-primary" href={links.linkedin} target="_blank" rel="noopener">
              {t.contato.linkedin}
            </a>
            <a className="btn" href={t.curriculo.arquivo} target="_blank" rel="noopener">
              {t.curriculo.label}
            </a>
            <a className="btn" href={links.github} target="_blank" rel="noopener">
              {t.contato.github}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
