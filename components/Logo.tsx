import Link from 'next/link';

export function LogoMark() {
  return (
    <span className="logo-mark" aria-hidden="true">
      {Array.from({ length: 9 }, (_, i) => (
        <i key={i} />
      ))}
    </span>
  );
}

export default function Logo() {
  return (
    <Link className="logo" href="/" aria-label="Sparsh Magic home">
      <LogoMark />
      <span>
        Sparsh Magic<small>MAP49™ System</small>
      </span>
    </Link>
  );
}
