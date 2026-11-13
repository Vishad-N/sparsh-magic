import type { Metadata } from 'next';
import { PageHero } from '@/components/Blocks';
import { site } from '@/lib/data';
import Backdrop from '@/components/Backdrop';
import { bd } from '@/lib/backdrops';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Terms for using the Sparsh Magic website and AURA Scan.',
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <>
      <PageHero crumbs={[{ label: 'Terms' }]} backdrop={bd.legal.hero} eyebrow="Legal" title="Terms of use" lead={`The basics of using this website, operated by ${site.legalName}, Indore.`} />
      <section className="sec-tight" style={{ paddingTop: 0 }}>
        <Backdrop items={bd.legal.body} />
        <div className="prose wrap wrap-narrow">
          <h2>Using this site</h2>
          <p>You may use this website to learn about Sparsh Magic and to contact us. Please don’t misuse the forms or attempt to disrupt the site.</p>
          <h2>The AURA Scan</h2>
          <p>The AURA Scan gives an indicative view based on your answers. It is not a full assessment, and its score is a starting point for a conversation, not professional advice.</p>
          <h2>Results and figures</h2>
          <p>Figures such as cost reduction and profit increase are reported averages across client engagements. Individual results depend on each business and on implementation.</p>
          <h2>Intellectual property</h2>
          <p>MAP49, the AURA Scan and the content of this site belong to Sparsh Magic. Please ask before reproducing them.</p>
          <h2>Contact</h2>
          <p>
            Questions about these terms: <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
          <p className="byline">These terms are a starting draft and should be reviewed by the Sparsh Magic team before publication.</p>
        </div>
      </section>
    </>
  );
}
