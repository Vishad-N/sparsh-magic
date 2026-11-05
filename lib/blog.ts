/**
 * Blog content as typed content files. Titles and dates come from the
 * original Sparsh Magic blog; body copy is written fresh for the new site.
 */

export type Block =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'quote'; text: string }
  | { type: 'ul'; items: string[] };

export type Post = {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  body: Block[];
};

export const posts: Post[] = [
  {
    slug: 'transformative-power-employee-empowerment',
    title: 'The Transformative Power of Employee Empowerment in Business',
    date: '2023-12-14',
    category: 'Accountability',
    excerpt: 'Empowerment isn’t a speech. It’s a set of decisions you stop making, so your team can start.',
    body: [
      { type: 'p', text: 'Most founders say they want an empowered team. Then, at 9:15 every morning, they send twelve WhatsApp messages asking whether the work is done. The intent is real. The system says the opposite.' },
      { type: 'p', text: 'Empowerment is not a mood you create in a meeting. It is the specific list of decisions a person is allowed to make without asking you, plus the numbers that tell them whether those decisions worked.' },
      { type: 'h2', text: 'Start with decision rights, not motivation' },
      { type: 'p', text: 'Write down the twenty decisions you made last week. Next to each one, write the name of the person who should have made it. For most MSMEs, more than half of those decisions belong below the founder.' },
      { type: 'ul', items: ['Approving a small refund or replacement', 'Re-sequencing the day’s dispatch', 'Choosing which lead to call first', 'Deciding when to escalate a machine fault'] },
      { type: 'p', text: 'Hand those decisions over formally. Tell the team, in writing, what they own and where the limit is. Then resist taking them back the first time something goes slightly wrong.' },
      { type: 'h2', text: 'Make results visible' },
      { type: 'p', text: 'People can only take ownership of what they can see. A one-page monitor with five numbers, updated by the team, does more for empowerment than any workshop. When the number moves, the owner knows before you do.' },
      { type: 'quote', text: 'You don’t need better people. You need better systems they can run.' },
      { type: 'h2', text: 'What changes for the founder' },
      { type: 'p', text: 'Within a few weeks, the questions you get change. Instead of “what should I do?”, you start hearing “here are two options, I recommend this one.” That is what empowerment looks like on a Tuesday morning.' },
    ],
  },
  {
    slug: 'hiring-maze',
    title: 'The Hiring Maze: What to Do When Hiring Becomes a Bottleneck',
    date: '2023-12-12',
    category: 'Talent',
    excerpt: 'If you’re always hiring, the problem may not be the market. It may be what happens after day one.',
    body: [
      { type: 'p', text: 'Many founders describe hiring as a maze: endless interviews, offers that fall through, and new joiners who leave within months. The instinct is to hire faster. The better question is why people leave.' },
      { type: 'h2', text: 'The back-to-zero cycle' },
      { type: 'p', text: 'Every time a trained person leaves, the business goes back to zero on that role. Training time, mistakes and lost customers all repeat. Over a year, this quietly becomes one of the biggest costs in an MSME.' },
      { type: 'h2', text: 'Three fixes before you post another job' },
      { type: 'ul', items: ['Give every role a one-line outcome and a scorecard from day one.', 'Assign a named buddy who owns the new joiner’s first 30 days.', 'Show a visible skill ladder, so people can see a future beyond the job they were hired for.'] },
      { type: 'p', text: 'Good people stay where they can see how they are doing and where they are going. When both are clear, retention goes up and the hiring maze gets much shorter.' },
      { type: 'h2', text: 'Grow leaders from inside' },
      { type: 'p', text: 'The most expensive hire is the senior one brought in because nobody inside was ready. Successor mapping for every critical role costs a few hours and saves lakhs in premium hiring later.' },
    ],
  },
  {
    slug: 'eei-employee-engagement-index',
    title: 'EEI Employee Engagement Index: Unveiling the Power of Employee Engagement',
    date: '2023-12-08',
    category: 'Measurement',
    excerpt: 'Engagement can be measured. Here is how the Employee Engagement Index turns a feeling into a number.',
    body: [
      { type: 'p', text: 'Founders often sense when a team is disengaged: slower replies, more absences, fewer ideas. But a sense is hard to act on. The Employee Engagement Index (EEI) turns that sense into a number you can track.' },
      { type: 'h2', text: 'What EEI measures' },
      { type: 'p', text: 'EEI looks at how clearly people understand their role, whether they feel their work is seen, whether they can grow, and whether they trust how decisions are made. Each is scored, and the scores are tracked over time.' },
      { type: 'ul', items: ['Role clarity', 'Recognition of effort', 'Growth visibility', 'Trust in decisions', 'Two-way communication'] },
      { type: 'h2', text: 'Why it matters for profit' },
      { type: 'p', text: 'Engaged teams make fewer mistakes, stay longer and serve customers better. Since even a small lift in customer retention can multiply profit, engagement is not a “soft” metric. It sits upstream of the P&L.' },
      { type: 'quote', text: 'What gets measured gets owned.' },
      { type: 'p', text: 'Run EEI every quarter, share the results honestly with the team, and pick one area to fix at a time. The trend matters more than any single score.' },
    ],
  },
  {
    slug: 'employee-productivity',
    title: 'Employee Productivity: Opening the Possibility',
    date: '2023-11-21',
    category: 'Productivity',
    excerpt: 'Productivity isn’t about working longer. It’s about removing the friction that makes good work hard.',
    body: [
      { type: 'p', text: 'When output is low, the usual response is pressure: longer hours, tighter supervision, more follow-ups. It works for a week. Then the team settles back to the old pace, now more tired.' },
      { type: 'h2', text: 'Look for friction, not effort' },
      { type: 'p', text: 'In most MSMEs, people lose hours to waiting: for approvals, for material, for information, for the founder. Removing those waits lifts productivity without asking anyone to work harder.' },
      { type: 'ul', items: ['Map where work waits for a decision.', 'Give the decision to the person closest to the work.', 'Put the information they need on one page.', 'Review the waits weekly and remove one at a time.'] },
      { type: 'h2', text: 'Make productivity easy to carry out' },
      { type: 'p', text: 'The goal is a system where doing the right thing is the easy thing. Clear outcomes, owned tasks, a steady rhythm and visible numbers do that. When the system is right, productivity stops being a fight.' },
      { type: 'p', text: 'That is the possibility: a team that delivers more, with less stress, and a founder who finally gets time back.' },
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

export const readMinutes = (post: Post) => {
  const words = post.body
    .map((b) => (b.type === 'ul' ? b.items.join(' ') : b.text))
    .join(' ')
    .split(/\s+/).length;
  return Math.max(2, Math.round(words / 200));
};

export const formatDate = (iso: string) =>
  new Date(iso + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

export const sortedPosts = () => [...posts].sort((a, b) => b.date.localeCompare(a.date));
