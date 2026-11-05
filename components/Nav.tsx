'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { navLinks } from '@/lib/data';
import Logo from './Logo';
import Button from './Button';
import Icon from './Icon';

const isActive = (path: string, href: string) => (href === '/' ? path === '/' : path === href || path.startsWith(href + '/'));

export default function Nav() {
  const path = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [path]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  let n = 0;
  return (
    <>
      <header className={`nav${scrolled || open ? ' scrolled' : ''}`}>
        <div className="wrap nav-in">
          <Logo />
          <nav aria-label="Primary">
            <ul className="nav-links">
              {navLinks.map((l) => {
                const active = isActive(path, l.href) || !!l.children?.some((c) => isActive(path, c.href));
                return (
                  <li key={l.href} className={l.children ? 'has-sub' : undefined}>
                    <Link href={l.href} aria-current={active ? 'page' : undefined}>
                      {l.label}
                      {l.children && <Icon name="caret" size={10} className="caret" />}
                    </Link>
                    {l.children && (
                      <ul className="sub">
                        {l.children.map((c, i) => (
                          <li key={c.href}>
                            <Link href={c.href} aria-current={path === c.href ? 'page' : undefined}>
                              {c.label} <span>0{i + 1}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
          <Button href="/aura" size="sm" arrow className="nav-cta">
            Start AURA Scan
          </Button>
          <button
            className="burger"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mnav"
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>
      <nav className={`mnav${open ? ' open' : ''}`} id="mnav" aria-label="Mobile" aria-hidden={!open}>
        {navLinks.map((l) => (
          <div key={l.href}>
            <Link href={l.href} tabIndex={open ? 0 : -1} aria-current={isActive(path, l.href) ? 'page' : undefined}>
              {l.label} <span>0{++n}</span>
            </Link>
            {l.children && (
              <div className="msub">
                {l.children
                  .filter((c) => c.href !== l.href)
                  .map((c) => (
                    <Link key={c.href} href={c.href} tabIndex={open ? 0 : -1} aria-current={path === c.href ? 'page' : undefined}>
                      {c.label}
                    </Link>
                  ))}
              </div>
            )}
          </div>
        ))}
        <Button href="/aura" variant="lime" arrow>
          Start AURA Scan
        </Button>
      </nav>
    </>
  );
}
