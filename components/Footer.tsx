import Link from 'next/link';
import { footerGroups, site, tel } from '@/lib/data';
import { LogoStacked } from './Logo';
import Icon from './Icon';
import Divider from './Divider';
import Wordmark from './Wordmark';

const socialIcon = {
  LinkedIn: 'linkedin',
  Instagram: 'instagram',
  YouTube: 'youtube',
  Facebook: 'facebook',
  'X (Twitter)': 'x',
} as const;

export default function Footer() {
  return (
    <footer className="foot">
      <Divider variant="scan" />
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <LogoStacked />
            <p>
              {site.tagline}. Self-driven team systems for Indian MSME founders. {site.mission}
            </p>
            <div className="socials">
              {site.social.map((s) => (
                <a key={s.label} href={s.href} aria-label={`${s.label} (opens in a new tab)`} target="_blank" rel="noopener noreferrer">
                  <Icon name={socialIcon[s.label]} size={18} />
                </a>
              ))}
            </div>
          </div>
          {footerGroups.map((g) => (
            <div key={g.title}>
              <h4>{g.title}</h4>
              <ul>
                {g.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="contact">
            <h4>Contact</h4>
            <a href={tel(site.phones[0])}>{site.phones[0]}</a>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            {site.locations.map((l) => (
              <address key={l.type}>
                <b>{l.type}</b>
                {l.lines.join(', ')}
              </address>
            ))}
          </div>
        </div>
        <Wordmark />
        <div className="foot-bot">
          <span>
            © {new Date().getFullYear()} {site.legalName}. MAP49 is a trademark of Sparsh Magic.
          </span>
          <span>
            <Link href="/privacy">Privacy</Link> · <Link href="/terms">Terms</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
