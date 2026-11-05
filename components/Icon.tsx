import type { IconName } from '@/lib/data';

type Name =
  | IconName
  | 'pulse'
  | 'people'
  | 'clock'
  | 'chart'
  | 'linkedin'
  | 'instagram'
  | 'youtube'
  | 'facebook'
  | 'x'
  | 'whatsapp'
  | 'phone'
  | 'mail'
  | 'pin'
  | 'caret';

const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;

export default function Icon({ name, size = 24, className }: { name: Name; size?: number; className?: string }) {
  const p = { width: size, height: size, viewBox: '0 0 24 24', 'aria-hidden': true, className, focusable: false } as const;
  switch (name) {
    case 'factory':
      return <svg {...p} {...stroke}><path d="M3 21V10l6 4V10l6 4V5h6v16z" /><path d="M7 21v-3M12 21v-3M17 21v-3" /></svg>;
    case 'store':
      return <svg {...p} {...stroke}><path d="M4 9l1.5-5h13L20 9" /><path d="M4 9h16v2a3 3 0 01-5.3 2 3 3 0 01-5.4 0A3 3 0 014 11z" /><path d="M5 13v8h14v-8" /></svg>;
    case 'dumbbell':
      return <svg {...p} {...stroke}><path d="M6.5 6.5v11M17.5 6.5v11M3 9.5v5M21 9.5v5M6.5 12h11" /></svg>;
    case 'utensils':
      return <svg {...p} {...stroke}><path d="M7 3v8a2 2 0 01-4 0V3M5 11v10M17 21V3c-2.5 1-4 3.5-4 7v4h4" /></svg>;
    case 'truck':
      return <svg {...p} {...stroke}><path d="M2 6h11v10H2zM13 10h4l4 3v3h-8" /><circle cx="6" cy="18" r="2" /><circle cx="17" cy="18" r="2" /></svg>;
    case 'health':
      return <svg {...p} {...stroke}><rect x="3" y="3" width="18" height="18" rx="5" /><path d="M12 8v8M8 12h8" /></svg>;
    case 'briefcase':
      return <svg {...p} {...stroke}><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2M3 13h18" /></svg>;
    case 'rupee':
      return <svg {...p} {...stroke}><path d="M6 4h12M6 9h12M9 4c3.5 0 6 1.5 6 5s-2.5 5-6 5H7l8 7" /></svg>;
    case 'shirt':
      return <svg {...p} {...stroke}><path d="M8 3l4 2 4-2 5 4-3 3v11H6V10L3 7z" /></svg>;
    case 'chip':
      return <svg {...p} {...stroke}><rect x="6" y="6" width="12" height="12" rx="2" /><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" /></svg>;
    case 'plane':
      return <svg {...p} {...stroke}><path d="M10 14l-7-3 2-2 8 1 5-5a2 2 0 013 3l-5 5 1 8-2 2-3-7-3 3v3l-2 1-1-3-3-1 1-2h3z" /></svg>;
    case 'pulse':
      return <svg {...p} {...stroke}><path d="M4 12h6l2-6 2 12 2-6h4" /></svg>;
    case 'people':
      return <svg {...p} {...stroke}><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20c.8-3.5 3.4-5.5 6.5-5.5s5.7 2 6.5 5.5M16 4.5a3.5 3.5 0 010 7M18.5 14.8c1.6.9 2.6 2.6 3 5.2" /></svg>;
    case 'clock':
      return <svg {...p} {...stroke}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>;
    case 'chart':
      return <svg {...p} {...stroke}><path d="M4 19V9M10 19V5M16 19v-7M22 19H2" /></svg>;
    case 'phone':
      return <svg {...p} {...stroke}><path d="M5 3h4l2 5-2.5 1.5a11 11 0 006 6L16 13l5 2v4a2 2 0 01-2 2A17 17 0 013 5a2 2 0 012-2" /></svg>;
    case 'mail':
      return <svg {...p} {...stroke}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>;
    case 'pin':
      return <svg {...p} {...stroke}><path d="M12 21s-7-6.2-7-12a7 7 0 0114 0c0 5.8-7 12-7 12z" /><circle cx="12" cy="9" r="2.5" /></svg>;
    case 'caret':
      return <svg {...p} {...stroke} strokeWidth={2.5}><path d="M6 9l6 6 6-6" /></svg>;
    case 'linkedin':
      return <svg {...p} fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.2c0-1.3 0-2.9-1.8-2.9s-2.1 1.4-2.1 2.8V21h-4z" /></svg>;
    case 'instagram':
      return <svg {...p} {...stroke}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>;
    case 'youtube':
      return <svg {...p} fill="currentColor"><path d="M21.6 7.2a2.7 2.7 0 00-1.9-1.9C18 4.8 12 4.8 12 4.8s-6 0-7.7.5a2.7 2.7 0 00-1.9 1.9C2 8.9 2 12 2 12s0 3.1.4 4.8a2.7 2.7 0 001.9 1.9c1.7.5 7.7.5 7.7.5s6 0 7.7-.5a2.7 2.7 0 001.9-1.9c.4-1.7.4-4.8.4-4.8s0-3.1-.4-4.8zM10 15.1V8.9l5.2 3.1z" /></svg>;
    case 'facebook':
      return <svg {...p} fill="currentColor"><path d="M14 8.5V6.8c0-.8.2-1.3 1.4-1.3H17V2.3A21 21 0 0014.6 2C12.2 2 10.6 3.5 10.6 6.2v2.3H8V12h2.6v10H14V12h2.7l.4-3.5z" /></svg>;
    case 'x':
      return <svg {...p} fill="currentColor"><path d="M17.8 3h3.1l-6.8 7.8L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.3-8.3L2 3h6.4l4.4 5.8zm-1.1 16.2h1.7L7.4 4.7H5.6z" /></svg>;
    case 'whatsapp':
      return <svg {...p} fill="currentColor"><path d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm5.3 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .5l-.3.5-.4.5c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.5.1.6-.1l.9-1c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.5.3.1.2.1.7-.1 1.3z" /></svg>;
    default:
      return null;
  }
}
