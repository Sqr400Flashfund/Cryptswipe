import { Container, PageHero } from "./blocks";

export interface LegalSection {
  h: string;
  p: string[];
}

export function LegalPage({ title, updated, intro, sections }: { title: string; updated: string; intro: string; sections: LegalSection[] }) {
  return (
    <>
      <PageHero crumbs={[{ name: title }]} title={title} intro={intro} />
      <section className="py-16">
        <Container className="grid gap-12 lg:grid-cols-[240px_1fr]">
          <nav aria-label="On this page" className="hidden lg:block">
            <ol className="sticky top-24 space-y-2 text-sm text-subtle">
              {sections.map((s, i) => (
                <li key={s.h}><a href={`#s-${i + 1}`} className="hover:text-foreground">{i + 1}. {s.h}</a></li>
              ))}
            </ol>
          </nav>
          <div className="prose-cs max-w-3xl">
            <p className="text-sm text-subtle">Last updated {updated}. This document is a working draft and will be finalised by counsel before launch.</p>
            {sections.map((s, i) => (
              <section key={s.h} aria-labelledby={`s-${i + 1}`}>
                <h2 id={`s-${i + 1}`} className="scroll-mt-24">{i + 1}. {s.h}</h2>
                {s.p.map((p) => <p key={p}>{p}</p>)}
              </section>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
