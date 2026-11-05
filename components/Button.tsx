import Link from 'next/link';
import type { ReactNode } from 'react';

type Variant = 'dark' | 'lime' | 'ghost';

type Common = {
  children: ReactNode;
  variant?: Variant;
  size?: 'md' | 'sm';
  arrow?: boolean;
  block?: boolean;
  className?: string;
};

type AsLink = Common & { href: string; external?: boolean };
type AsButton = Common & {
  href?: undefined;
  type?: 'button' | 'submit';
  onClick?: () => void;
  disabled?: boolean;
};

/**
 * Liquid button. The fill grows from the pointer position; the pointer
 * tracking is a single delegated listener in <SiteEffects />, so this
 * component stays server-renderable.
 */
export default function Button(props: AsLink | AsButton) {
  const { children, variant = 'dark', size = 'md', arrow, block, className = '' } = props;
  const cls = [
    'btn liquid',
    variant === 'lime' && 'btn-lime',
    variant === 'ghost' && 'btn-ghost',
    size === 'sm' && 'btn-sm',
    block && 'btn-block',
    className,
  ]
    .filter(Boolean)
    .join(' ');
  const inner = (
    <>
      {children}
      {arrow && (
        <span className="arr" aria-hidden="true">
          →
        </span>
      )}
    </>
  );

  if (props.href !== undefined) {
    const external = props.external ?? /^(https?:|tel:|mailto:)/.test(props.href);
    if (external) {
      const newTab = props.href.startsWith('http');
      return (
        <a className={cls} href={props.href} {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
          {inner}
        </a>
      );
    }
    return (
      <Link className={cls} href={props.href}>
        {inner}
      </Link>
    );
  }
  return (
    <button className={cls} type={props.type ?? 'button'} onClick={props.onClick} disabled={props.disabled}>
      {inner}
    </button>
  );
}
