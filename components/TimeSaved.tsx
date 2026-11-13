'use client';

import { useState } from 'react';

/** Before/after bar for founder hours spent chasing the team each day. */
export default function TimeSaved() {
  const [on, setOn] = useState(false);
  return (
    <div className={`ts${on ? ' on' : ''}`}>
      <button type="button" className="toggle light" aria-pressed={on} onClick={() => setOn((o) => !o)}>
        <span>Show founder time saved</span>
        <span className="sw" aria-hidden="true" />
      </button>
      <div className="ts-rows" aria-live="polite">
        <div className="ts-row">
          <span className="ts-lab">Before MAP49</span>
          <span className="ts-bar before">
            <i />
          </span>
          <b>4+ hrs / day</b>
        </div>
        <div className="ts-row">
          <span className="ts-lab">After MAP49</span>
          <span className="ts-bar after">
            <i />
          </span>
          <b>{on ? '< 1 hr / day' : '—'}</b>
        </div>
        <p className="ts-sum">
          {on ? (
            <>
              That’s roughly <b className="mark">60+ hours a month</b> back for strategy, sales and family.
            </>
          ) : (
            'Founders typically spend 4+ hours a day chasing their team.'
          )}
        </p>
        <p className="note">Illustrative, based on the typical founder pattern Sparsh Magic sees in its scans.</p>
      </div>
    </div>
  );
}
