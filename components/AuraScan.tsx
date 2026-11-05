'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { levels, pillars, waLink } from '@/lib/data';
import { allQuestions, healthBand, profileOptions, scorePillars, steps, systemHealth, weakest, type Answers } from '@/lib/aura';
import Button from './Button';

type Profile = { industry?: string; teamSize?: string };
type Contact = { name: string; phone: string; email: string; business: string; city: string; website: string };

const STEP_LABELS = ['Profile', ...steps.map((s) => s.title), 'Your report'];
const TOTAL_INPUTS = 2 + allQuestions.length;

export default function AuraScan() {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<Profile>({});
  const [answers, setAnswers] = useState<Answers>({});
  const [contact, setContact] = useState<Contact>({ name: '', phone: '', email: '', business: '', city: '', website: '' });
  const [errors, setErrors] = useState<Partial<Record<keyof Contact, string>>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const headRef = useRef<HTMLHeadingElement>(null);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    headRef.current?.focus({ preventScroll: true });
    const top = headRef.current?.closest('.aura')?.getBoundingClientRect().top ?? 0;
    if (top < 80) window.scrollBy({ top: top - 100, behavior: 'smooth' });
  }, [step, status]);

  const answered = (profile.industry ? 1 : 0) + (profile.teamSize ? 1 : 0) + Object.keys(answers).length;
  const progress = status === 'done' ? 1 : step === STEP_LABELS.length - 1 ? 1 : answered / TOTAL_INPUTS;
  const filled = Math.round(progress * 49);

  const scores = useMemo(() => scorePillars(answers), [answers]);
  const health = systemHealth(scores);
  const band = healthBand(health);
  const leaks = weakest(scores, 2);

  const qStep = step >= 1 && step <= steps.length ? steps[step - 1] : null;
  const canNext = step === 0 ? !!(profile.industry && profile.teamSize) : qStep ? qStep.questions.every((q) => answers[q.id] !== undefined) : true;

  const validate = () => {
    const e: typeof errors = {};
    if (contact.name.trim().length < 2) e.name = 'Please enter your name.';
    if (!/^[+\d][\d\s-]{7,15}$/.test(contact.phone.trim())) e.phone = 'Please enter a valid phone number.';
    if (contact.email && !/^\S+@\S+\.\S+$/.test(contact.email)) e.email = 'Please check this email address.';
    if (contact.business.trim().length < 2) e.business = 'Please enter your business name.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setStatus('sending');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'aura',
          ...contact,
          profile,
          answers,
          scores: scores.map((s) => ({ pillar: s.name, level: s.level })),
          health,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus('done');
    } catch {
      setStatus('error');
    }
  };

  const field = (k: keyof Contact, label: string, opts: { type?: string; optional?: boolean; auto?: string } = {}) => (
    <div className="field">
      <label htmlFor={`aura-${k}`}>
        {label} {opts.optional && <span className="opt">(optional)</span>}
      </label>
      <input
        id={`aura-${k}`}
        className="input"
        type={opts.type ?? 'text'}
        autoComplete={opts.auto}
        value={contact[k]}
        aria-invalid={!!errors[k]}
        aria-describedby={errors[k] ? `aura-${k}-err` : undefined}
        onChange={(e) => setContact((c) => ({ ...c, [k]: e.target.value }))}
      />
      {errors[k] && (
        <span className="field-err" id={`aura-${k}-err`}>
          {errors[k]}
        </span>
      )}
    </div>
  );

  return (
    <div className={`aura${status === 'done' ? ' ordered' : ''}`}>
      {/* ---------- progress matrix ---------- */}
      <div className="aura-prog" aria-label={`Scan progress ${Math.round(progress * 100)} percent`} role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress * 100)}>
        <div className="ap-grid" aria-hidden="true">
          {Array.from({ length: 49 }, (_, i) => (
            <i key={i} className={i < filled ? (i === filled - 1 && status !== 'done' ? 'hot' : 'on') : ''} />
          ))}
        </div>
        <div className="ap-meta">
          <span className="ap-pct">{Math.round(progress * 100)}%</span>
          <ol className="ap-steps">
            {STEP_LABELS.map((l, i) => (
              <li key={l} className={i < step || status === 'done' ? 'done' : i === step ? 'cur' : ''}>
                <span>{String(i + 1).padStart(2, '0')}</span> {l}
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* ---------- body ---------- */}
      <div className="aura-card">
        {status === 'done' ? (
          <div className="aura-done">
            <div className="p-head">
              <div className="p-title">
                AURA Scan<b>{contact.business || 'Your business'}</b>
              </div>
              <span className="state ok">ORDER</span>
            </div>
            <h2 ref={headRef} tabIndex={-1} className="aura-h">
              Scan received. Your system health report is on its way.
            </h2>
            <p className="aura-sub">
              Thank you, {contact.name.split(' ')[0]}. The Sparsh Magic team will review your answers and call you within one working day to book your
              debrief.
            </p>
            <ol className="next-steps">
              <li>
                <b>Review</b>We study your answers against 342+ MSME patterns.
              </li>
              <li>
                <b>Debrief call</b>A 30-minute call to walk through your 49-point map.
              </li>
              <li>
                <b>Your first fix</b>You leave with the one change to make this week.
              </li>
            </ol>
            <div className="btn-row">
              <Button href={waLink(`Hi Sparsh Magic, I just completed my AURA Scan for ${contact.business}. My system health score is ${health}/100.`)} variant="lime" arrow>
                Message us on WhatsApp
              </Button>
              <Button href="/framework" variant="ghost">
                Read about MAP49™
              </Button>
            </div>
          </div>
        ) : step === 0 ? (
          <div>
            <span className="aura-k">Step 01 · Profile</span>
            <h2 ref={headRef} tabIndex={-1} className="aura-h">
              Tell us about your business.
            </h2>
            <fieldset className="q">
              <legend>Which industry are you in?</legend>
              <div className="opts chipset">
                {profileOptions.industry.map((o) => (
                  <label key={o} className="opt-chip">
                    <input type="radio" name="industry" value={o} checked={profile.industry === o} onChange={() => setProfile((p) => ({ ...p, industry: o }))} />
                    <span>{o}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <fieldset className="q">
              <legend>How many people are on your team?</legend>
              <div className="opts opts-4">
                {profileOptions.teamSize.map((o) => (
                  <label key={o} className="opt">
                    <input type="radio" name="teamSize" value={o} checked={profile.teamSize === o} onChange={() => setProfile((p) => ({ ...p, teamSize: o }))} />
                    <span className="opt-in">
                      <b>{o}</b>
                      <small>people</small>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          </div>
        ) : qStep ? (
          <div>
            <span className="aura-k">
              Step {String(step + 1).padStart(2, '0')} · {qStep.title}
            </span>
            <h2 ref={headRef} tabIndex={-1} className="aura-h">
              {qStep.intro}
            </h2>
            {qStep.questions.map((q) => (
              <fieldset key={q.id} className="q">
                <legend>{q.prompt}</legend>
                <div className="opts">
                  {q.options.map((o, i) => (
                    <label key={o.label} className="opt">
                      <input
                        type="radio"
                        name={q.id}
                        value={o.score}
                        checked={answers[q.id] === o.score}
                        onChange={() => setAnswers((a) => ({ ...a, [q.id]: o.score }))}
                      />
                      <span className="opt-in">
                        <span className="opt-k">{String.fromCharCode(65 + i)}</span>
                        <b>{o.label}</b>
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
            ))}
          </div>
        ) : (
          <div>
            <span className="aura-k">Step {String(step + 1).padStart(2, '0')} · Your report</span>
            <h2 ref={headRef} tabIndex={-1} className="aura-h">
              Your system health, at a glance.
            </h2>
            <div className="report">
              <div className="rep-score dark">
                <span className="rep-lab">System health</span>
                <span className="rep-num">
                  {health}
                  <small>/100</small>
                </span>
                <span className={`rep-band ${band.tone}`}>{band.label}</span>
                <div className="rep-matrix" aria-label="Your level on each MAP49 pillar">
                  {scores.map((s) => (
                    <div key={s.key} className="rep-row">
                      <span className="rep-name">{s.name}</span>
                      <span className="rep-cells" aria-label={`${s.name}: level ${s.level} of 7, ${levels[s.level - 1].name}`}>
                        {levels.map((_, c) => (
                          <i key={c} className={c < s.level ? (c >= 5 ? 'hot' : 'on') : ''} />
                        ))}
                      </span>
                      <span className="rep-lv">L{s.level}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rep-leaks">
                <h3>Your two biggest leaks</h3>
                {leaks.map((l) => (
                  <div key={l.key} className="leak">
                    <span className="leak-k">P{pillars.findIndex((p) => p.key === l.key) + 1}</span>
                    <div>
                      <b>
                        {l.name} · L{l.level} {levels[l.level - 1].name}
                      </b>
                      <p>
                        <span className="muted">First fix:</span> {l.fixHint}
                      </p>
                    </div>
                  </div>
                ))}
                <div className="locked" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                  <em>Full 49-point report unlocks in your debrief</em>
                </div>
              </div>
            </div>

            <form className="form aura-form" onSubmit={submit} noValidate>
              <h3>Where should we send your full report?</h3>
              <div className="form-row">
                {field('name', 'Your name', { auto: 'name' })}
                {field('phone', 'Phone / WhatsApp', { type: 'tel', auto: 'tel' })}
              </div>
              <div className="form-row">
                {field('business', 'Business name', { auto: 'organization' })}
                {field('email', 'Email', { type: 'email', optional: true, auto: 'email' })}
              </div>
              {field('city', 'City', { optional: true, auto: 'address-level2' })}
              <div className="hp" aria-hidden="true">
                <label htmlFor="aura-website">Website</label>
                <input id="aura-website" tabIndex={-1} autoComplete="off" value={contact.website} onChange={(e) => setContact((c) => ({ ...c, website: e.target.value }))} />
              </div>
              {status === 'error' && (
                <p className="form-status err" role="alert">
                  We couldn’t send that just now. Please try again, or{' '}
                  <a className="text-link" href={waLink(`Hi Sparsh Magic, I'd like my AURA Scan report. Score: ${health}/100.`)}>
                    send it on WhatsApp
                  </a>
                  .
                </p>
              )}
              <div className="aura-submit">
                <Button type="submit" variant="lime" arrow disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending…' : 'Get my full report'}
                </Button>
                <small className="muted">We only use these details to contact you about your scan.</small>
              </div>
            </form>
          </div>
        )}

        {status !== 'done' && (
          <div className="aura-nav">
            <button type="button" className="back" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>
              ← Back
            </button>
            {step < STEP_LABELS.length - 1 && (
              <Button onClick={() => canNext && setStep((s) => s + 1)} disabled={!canNext} arrow>
                {step === STEP_LABELS.length - 2 ? 'See my report' : 'Next'}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
