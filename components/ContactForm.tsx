'use client';

import { useState } from 'react';
import { waLink } from '@/lib/data';
import Button from './Button';

type Kind = 'contact' | 'career';

const empty = { name: '', phone: '', email: '', business: '', role: '', message: '', website: '' };

/** Contact / career application form. Posts to /api/lead. */
export default function ContactForm({ kind = 'contact', roles = [] }: { kind?: Kind; roles?: string[] }) {
  const [v, setV] = useState(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof typeof empty, string>>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const id = (k: string) => `${kind}-${k}`;

  const validate = () => {
    const e: typeof errors = {};
    if (v.name.trim().length < 2) e.name = 'Please enter your name.';
    if (!/^[+\d][\d\s-]{7,15}$/.test(v.phone.trim())) e.phone = 'Please enter a valid phone number.';
    if (kind === 'career' ? !/^\S+@\S+\.\S+$/.test(v.email) : v.email && !/^\S+@\S+\.\S+$/.test(v.email)) e.email = 'Please enter a valid email.';
    if (v.message.trim().length < 10) e.message = kind === 'career' ? 'Tell us a little about yourself.' : 'Tell us a little about what you need.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setStatus('sending');
    try {
      const res = await fetch('/api/lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type: kind, ...v }) });
      if (!res.ok) throw new Error(String(res.status));
      setStatus('done');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'done') {
    return (
      <div className="form-done" role="status">
        <span className="state ok">RECEIVED</span>
        <h3>Thank you, {v.name.split(' ')[0]}.</h3>
        <p>{kind === 'career' ? 'We read every application and reply within a week.' : 'We’ll get back to you within one working day.'}</p>
      </div>
    );
  }

  const input = (k: keyof typeof empty, label: string, o: { type?: string; optional?: boolean; auto?: string } = {}) => (
    <div className="field">
      <label htmlFor={id(k)}>
        {label} {o.optional && <span className="opt">(optional)</span>}
      </label>
      <input
        id={id(k)}
        className="input"
        type={o.type ?? 'text'}
        autoComplete={o.auto}
        value={v[k]}
        aria-invalid={!!errors[k]}
        aria-describedby={errors[k] ? `${id(k)}-err` : undefined}
        onChange={(e) => setV((s) => ({ ...s, [k]: e.target.value }))}
      />
      {errors[k] && (
        <span className="field-err" id={`${id(k)}-err`}>
          {errors[k]}
        </span>
      )}
    </div>
  );

  return (
    <form className="form" onSubmit={submit} noValidate>
      <div className="form-row">
        {input('name', 'Your name', { auto: 'name' })}
        {input('phone', 'Phone / WhatsApp', { type: 'tel', auto: 'tel' })}
      </div>
      <div className="form-row">
        {input('email', 'Email', { type: 'email', optional: kind !== 'career', auto: 'email' })}
        {kind === 'career' ? (
          <div className="field">
            <label htmlFor={id('role')}>Area of interest</label>
            <select id={id('role')} className="select" value={v.role} onChange={(e) => setV((s) => ({ ...s, role: e.target.value }))}>
              <option value="">Any / not sure</option>
              {roles.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          </div>
        ) : (
          input('business', 'Business name', { optional: true, auto: 'organization' })
        )}
      </div>
      <div className="field">
        <label htmlFor={id('message')}>{kind === 'career' ? 'Why Sparsh Magic? (and a link to your CV or LinkedIn)' : 'How can we help?'}</label>
        <textarea
          id={id('message')}
          className="textarea"
          value={v.message}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? `${id('message')}-err` : undefined}
          onChange={(e) => setV((s) => ({ ...s, message: e.target.value }))}
        />
        {errors.message && (
          <span className="field-err" id={`${id('message')}-err`}>
            {errors.message}
          </span>
        )}
      </div>
      <div className="hp" aria-hidden="true">
        <label htmlFor={id('website')}>Website</label>
        <input id={id('website')} tabIndex={-1} autoComplete="off" value={v.website} onChange={(e) => setV((s) => ({ ...s, website: e.target.value }))} />
      </div>
      {status === 'error' && (
        <p className="form-status err" role="alert">
          We couldn’t send that just now. Please try again, or{' '}
          <a className="text-link" href={waLink()}>
            message us on WhatsApp
          </a>
          .
        </p>
      )}
      <div>
        <Button type="submit" variant="lime" arrow disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : kind === 'career' ? 'Send application' : 'Send message'}
        </Button>
      </div>
    </form>
  );
}
