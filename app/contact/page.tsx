import type { Metadata } from 'next';
import Button from '@/components/Button';
import ContactForm from '@/components/ContactForm';
import Divider from '@/components/Divider';
import Icon from '@/components/Icon';
import { PageHero } from '@/components/Blocks';
import { mapLink, site, tel, waLink } from '@/lib/data';
import { bd } from '@/lib/backdrops';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Contact Sparsh Magic in Indore. Call ${site.phones[0]}, email ${site.email}, or visit our head and corporate offices.`,
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Contact' }]}
        backdrop={bd.contact.hero}
        eyebrow="Contact"
        title={
          <>
            Talk to a human.
            <br />
            <span className="purple">Then let the system talk.</span>
          </>
        }
        lead="Call, WhatsApp, email or drop by one of our Indore offices. Or start with the AURA Scan and we’ll come to you with your results."
      >
        <div className="btn-row rv" style={{ ['--rd' as string]: '.18s' }}>
          <Button href={waLink('Hi Sparsh Magic, I would like to talk about my team.')} variant="lime" arrow>
            WhatsApp us
          </Button>
          <Button href="/aura" variant="ghost">
            Start AURA Scan
          </Button>
        </div>
      </PageHero>

      <Divider variant="scan" />

      <section className="sec-tight">
        <div className="wrap contact-grid">
          <div className="c-info">
            <div className="c-block rv">
              <span className="c-ic" aria-hidden="true">
                <Icon name="phone" size={20} />
              </span>
              <div>
                <h2>Phone</h2>
                {site.phones.map((p) => (
                  <a key={p} href={tel(p)}>
                    {p}
                  </a>
                ))}
              </div>
            </div>
            <div className="c-block rv">
              <span className="c-ic" aria-hidden="true">
                <Icon name="mail" size={20} />
              </span>
              <div>
                <h2>Email</h2>
                <a href={`mailto:${site.email}`}>{site.email}</a>
                <a href={`mailto:${site.founderEmail}`}>{site.founderEmail}</a>
                <small>For founder enquiries</small>
              </div>
            </div>
            {site.locations.map((l) => (
              <div key={l.type} className="c-block rv">
                <span className="c-ic" aria-hidden="true">
                  <Icon name="pin" size={20} />
                </span>
                <div>
                  <h2>{l.type}</h2>
                  <address>
                    {l.lines.map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </address>
                  <a className="text-link" href={mapLink(l.mapQuery)} target="_blank" rel="noopener noreferrer">
                    Open in Maps →
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="form-card rv">
            <h2 className="h3">Send us a message</h2>
            <p className="muted" style={{ margin: '8px 0 22px' }}>
              We reply within one working day.
            </p>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
