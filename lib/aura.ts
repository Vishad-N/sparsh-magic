import { industries, pillars, type PillarKey } from './data';

/**
 * AURA Scan: question set and scoring.
 * Each option scores 0 (weakest) to 3 (strongest). A pillar's level on the
 * 7-level ladder is derived from the scores of the questions mapped to it.
 */

export type Option = { label: string; score: number };
export type Question = {
  id: string;
  prompt: string;
  hint?: string;
  pillars: PillarKey[];
  options: Option[];
};
export type Step = {
  id: string;
  title: string;
  intro: string;
  questions: Question[];
};

const four = (a: string, b: string, c: string, d: string): Option[] => [
  { label: a, score: 3 },
  { label: b, score: 2 },
  { label: c, score: 1 },
  { label: d, score: 0 },
];

export const profileOptions = {
  industry: [...industries.map((i) => i.title), 'Other'],
  teamSize: ['10–25', '26–50', '51–150', '150+'],
};

export const steps: Step[] = [
  {
    id: 'load',
    title: 'Founder load',
    intro: 'How much of the business runs through you today?',
    questions: [
      {
        id: 'followups',
        prompt: 'How many follow-ups do you send your team on a normal day?',
        pillars: ['ownership', 'rhythm'],
        options: four('0–5', '6–15', '16–30', '30+'),
      },
      {
        id: 'away',
        prompt: 'If you were away for a week with no phone, the business would…',
        pillars: ['ownership', 'solving'],
        options: four('Run normally', 'Slow down a little', 'Stall on key decisions', 'Basically stop'),
      },
    ],
  },
  {
    id: 'clarity',
    title: 'Clarity & ownership',
    intro: 'Does everyone know what they own?',
    questions: [
      {
        id: 'roles',
        prompt: 'How many of your people can state their main result in one line?',
        pillars: ['clarity'],
        options: four('All of them', 'Most of them', 'Some of them', 'Very few'),
      },
      {
        id: 'problems',
        prompt: 'When a problem comes up, your team usually…',
        pillars: ['solving', 'ownership'],
        options: four('Solves it and informs you', 'Brings options and a recommendation', 'Brings you the problem', 'Waits for you to notice'),
      },
    ],
  },
  {
    id: 'rhythm',
    title: 'Rhythm & numbers',
    intro: 'Does the business have a heartbeat that runs without you?',
    questions: [
      {
        id: 'reviews',
        prompt: 'How do team review meetings happen?',
        pillars: ['rhythm'],
        options: four('Weekly, run by the team', 'Weekly, run by me', 'Irregular, when there’s a problem', 'We don’t have them'),
      },
      {
        id: 'monitor',
        prompt: 'Can you see the health of the business on one page every day?',
        pillars: ['metrics'],
        options: four('Yes, updated automatically', 'Yes, but I compile it', 'Partly, across many sheets', 'No'),
      },
    ],
  },
  {
    id: 'people',
    title: 'Growth & rewards',
    intro: 'Do your best people stay, and are they rewarded for results?',
    questions: [
      {
        id: 'retention',
        prompt: 'In the last 12 months, your best performers…',
        pillars: ['growth'],
        options: four('All stayed', 'One left', 'Several left', 'We have constant churn'),
      },
      {
        id: 'incentives',
        prompt: 'Incentives and recognition are mostly tied to…',
        pillars: ['rewards'],
        options: four('Measured output', 'A mix of output and seniority', 'Seniority or tenure', 'No clear structure'),
      },
    ],
  },
];

export const allQuestions = steps.flatMap((s) => s.questions);

export type Answers = Record<string, number>;

export type PillarScore = { key: PillarKey; name: string; level: number; fixHint: string };

/** Level 1–7 per pillar. Pillars without an answer default to level 1. */
export function scorePillars(answers: Answers): PillarScore[] {
  return pillars.map((p) => {
    const qs = allQuestions.filter((q) => q.pillars.includes(p.key) && answers[q.id] !== undefined);
    const avg = qs.length ? qs.reduce((sum, q) => sum + answers[q.id], 0) / qs.length : 0;
    const level = 1 + Math.round((avg / 3) * 6);
    return { key: p.key, name: p.name, level, fixHint: p.fixHint };
  });
}

/** System health 0–100: average pillar level mapped onto the ladder. */
export function systemHealth(scores: PillarScore[]): number {
  const avg = scores.reduce((s, p) => s + p.level, 0) / scores.length;
  return Math.round(((avg - 1) / 6) * 100);
}

export function weakest(scores: PillarScore[], n = 2): PillarScore[] {
  return [...scores].sort((a, b) => a.level - b.level).slice(0, n);
}

export function healthBand(health: number) {
  if (health >= 75) return { label: 'Self-driven', tone: 'good' as const };
  if (health >= 50) return { label: 'Routine, with gaps', tone: 'mid' as const };
  if (health >= 25) return { label: 'Founder-reliant', tone: 'low' as const };
  return { label: 'Founder-driven', tone: 'low' as const };
}
