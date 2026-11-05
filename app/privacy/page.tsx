import type { Metadata } from 'next';
import { PageHero } from '@/components/Blocks';
import { site } from '@/lib/data';
import Backdrop from '@/components/Backdrop';
import { bd } from '@/lib/backdrops';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Sparsh Magic collects and uses the information you share with us.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero crumbs={[{ label: 'Privacy' }]} backdrop={bd.legal.hero} eyebrow="Legal" title="Privacy policy" lead={`How ${site.legalName} handles the information you share with us.`} />
      <section className="sec-tight" style={{ paddingTop: 0 }}>
        <Backdrop items={bd.legal.body} />
        <div className="prose wrap wrap-narrow">
          <h2>What we collect</h2>
          <p>When you fill in the AURA Scan, contact form or career form, we collect what you enter: typically your name, phone number, email, business name, and your answers to the scan questions.</p>
          <h2>How we use it</h2>
          <ul>
            <li>To contact you about your enquiry, scan results or application.</li>
            <li>To prepare your AURA system health report and debrief.</li>
            <li>To improve our diagnostic, using answers in aggregate and without identifying you.</li>
          </ul>
          <p>We do not sell your information, and we do not share it with third parties for their own marketing.</p>
          <h2>How long we keep it</h2>
          <p>We keep enquiry and scan data for as long as needed to serve you, and delete it on request.</p>
          <h2>Your choices</h2>
          <p>
            You can ask us to see, correct or delete your information at any time by writing to <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
          <h2>Cookies</h2>
          <p>This website does not use advertising or tracking cookies.</p>
          <p className="byline">This is a summary policy and should be reviewed by the Sparsh Magic team before publication.</p>
        </div>
      </section>
    </>
  );
}
