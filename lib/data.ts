/**
 * Single source of truth for site content.
 * Company facts come from the Sparsh Magic redesign blueprint. Where the
 * blueprint gives a range (e.g. 198–342+ founders), the latest figure is used.
 */

export const site = {
  name: 'Sparsh Magic',
  legalName: 'SPARSH MAGIC LLP',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.sparshmagic.com',
  tagline: 'India’s #1 Team Productivity Expert',
  mission: 'Creating Happy Business by Empowering People.',
  founded: 2016,
  teamSize: '11–50',
  heroHeadline: 'Fix lazy team culture. Forever.',
  heroSub:
    'No more chasing teams. No more daily instructions. Just smooth systems, focused execution and founder freedom.',
  email: 'info@sparshmagic.com',
  founderEmail: 'rupak@sparshmagic.com',
  phones: ['+91 96309 21905', '+91 90390 09180', '+91 91099 04752', '+91 98067 78048'],
  /** Number used for WhatsApp links (digits only, with country code). */
  whatsapp: '919630921905',
  locations: [
    {
      type: 'Head Office',
      lines: ['33 Ashirwad Villas, Nipania', 'Indore, Madhya Pradesh, India'],
      mapQuery: '33 Ashirwad Villas, Nipania, Indore, Madhya Pradesh',
    },
    {
      type: 'Corporate Office',
      lines: ['315 Shagun Arcade, Rasoma Square', 'Vijay Nagar, Indore 452010'],
      mapQuery: '315 Shagun Arcade, Rasoma Square, Vijay Nagar, Indore 452010',
    },
  ],
  /** Replace '#' with the real profile URLs. */
  social: [
    { label: 'LinkedIn', href: '#' },
    { label: 'Instagram', href: '#' },
    { label: 'YouTube', href: '#' },
    { label: 'Facebook', href: '#' },
    { label: 'X (Twitter)', href: '#' },
  ],
} as const;

export const tel = (phone: string) => `tel:${phone.replace(/[^\d+]/g, '')}`;
export const waLink = (text?: string) =>
  `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
export const mapLink = (q: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

/* ---------------- Navigation ---------------- */

export type NavLink = { href: string; label: string; children?: NavLink[] };

export const navLinks: NavLink[] = [
  { href: '/framework', label: 'Framework' },
  { href: '/industries', label: 'Industries' },
  { href: '/results', label: 'Results' },
  {
    href: '/about',
    label: 'About',
    children: [
      { href: '/about', label: 'Our story' },
      { href: '/team', label: 'Team' },
      { href: '/culture', label: 'Culture' },
      { href: '/career', label: 'Career' },
    ],
  },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

export const footerGroups = [
  {
    title: 'System',
    links: [
      { href: '/framework', label: 'MAP49™ Framework' },
      { href: '/results', label: 'Results' },
      { href: '/industries', label: 'Industries' },
      { href: '/aura', label: 'AURA Scan' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/about', label: 'About Rupak Aich' },
      { href: '/team', label: 'Team' },
      { href: '/culture', label: 'Culture' },
      { href: '/career', label: 'Career' },
      { href: '/blog', label: 'Blog' },
    ],
  },
];

/* ---------------- Proof ---------------- */

export const stats = {
  years: '30+',
  msmes: 342,
  employees: 32000,
  profit: 21,
  cost: '9–15',
  revenue: 20,
  productivity: 12,
  salaryRoi: 37,
};

export const benefits = [
  {
    title: 'Plug-&-Play System',
    description: 'So simple even a 10-year-old can follow it, and it delivers 9–15% cost reduction annually.',
    metric: '9–15%',
    metricLabel: 'annual cost reduction',
  },
  {
    title: 'Slash Manpower Cost',
    description: 'Build leadership from within and watch profits jump by 21% and revenue by 20%.',
    metric: '21%',
    metricLabel: 'profit increase',
  },
  {
    title: 'Retain Top Talent',
    description: 'Boost retention and unlock 12% higher productivity. No more back-to-zero hiring cycles.',
    metric: '12%',
    metricLabel: 'higher productivity',
  },
  {
    title: 'Retain Customers, Multiply Profits',
    description: 'A 5% bump in customer retention can trigger 25%–95% profit growth.',
    metric: '25–95%',
    metricLabel: 'profit upside from 5% retention',
  },
  {
    title: 'Every Effort, Measured',
    description: 'Real-time result tracking delivers 37% higher salary ROI. No effort goes unseen.',
    metric: '37%',
    metricLabel: 'higher salary ROI',
  },
];

/* ---------------- MAP49™ ---------------- */

export const map49 = {
  name: 'MAP49™',
  fullName: 'Matrix of Accountability & Productivity 49',
  description:
    'A system that makes productivity easy to carry out. One-page business monitoring. Every person knows where to improve without being pointed out. Profitability improves directly and indirectly.',
  outcomes: ['Self-driven teams', 'Founder freedom', 'Measurable accountability', 'Higher productivity & profits'],
};

export const levels = [
  { name: 'Founder-driven', text: 'Work happens only when the founder pushes it.' },
  { name: 'Instructed', text: 'People act on clear, repeated instructions.' },
  { name: 'Reminded', text: 'Work gets done, with follow-ups.' },
  { name: 'Routine', text: 'A defined process runs most days.' },
  { name: 'Owned', text: 'One named owner delivers the result.' },
  { name: 'Self-driven', text: 'Owners improve the result without being asked.' },
  { name: 'Leads others', text: 'Owners coach the next person up the ladder.' },
];

export type PillarKey =
  | 'clarity'
  | 'ownership'
  | 'rhythm'
  | 'metrics'
  | 'solving'
  | 'growth'
  | 'rewards';

export type Pillar = {
  key: PillarKey;
  name: string;
  promise: string;
  summary: string;
  example: string;
  founderChange: string;
  tools: string[];
  fixHint: string;
};

export const pillars: Pillar[] = [
  {
    key: 'clarity',
    name: 'Clarity',
    promise: 'Every role knows its outcome',
    summary:
      'Each person can state, in one line, what they own and how it is measured. Role scorecards replace vague job descriptions.',
    example:
      'A dispatch executive’s scorecard says “orders out by 4 PM, zero wrong addresses”, not “handle dispatch”.',
    founderChange: 'You stop explaining the same job twice.',
    tools: ['Role scorecards', 'Outcome statements', 'Competency mapping'],
    fixHint: 'Write a one-line outcome for every role and pin it where the work happens.',
  },
  {
    key: 'ownership',
    name: 'Ownership',
    promise: 'One owner per result',
    summary:
      'Every task, process and metric has exactly one name against it. No shared blame and no orphan problems.',
    example: 'Customer complaints have one owner who closes the loop within 24 hours, and everyone knows who it is.',
    founderChange: 'Problems stop landing on your desk by default.',
    tools: ['Ownership charts', 'Escalation rules', 'Process auditing'],
    fixHint: 'List your ten recurring problems and put exactly one name against each.',
  },
  {
    key: 'rhythm',
    name: 'Rhythm',
    promise: 'A cadence that runs itself',
    summary:
      'Daily huddles, weekly reviews and monthly resets that the team runs without the founder in the room.',
    example: 'A 12-minute standing huddle at 9:30 AM, run by a rotating team lead, with three fixed questions.',
    founderChange: 'Meetings happen whether or not you show up.',
    tools: ['Daily huddle', 'Weekly scorecard review', 'Monthly reset'],
    fixHint: 'Start one daily 12-minute huddle that a team member runs, not you.',
  },
  {
    key: 'metrics',
    name: 'Metrics',
    promise: 'Numbers everyone can see',
    summary:
      'A small set of leading indicators per team, visible to everyone and updated by the people doing the work.',
    example: 'A one-page business monitor shows sales, collections, output and attendance by 10 AM every day.',
    founderChange: 'One page tells you where the business stands.',
    tools: ['Business scorecards', 'Performance monitoring', 'One-page monitor'],
    fixHint: 'Pick five numbers that matter and make one page that shows them daily.',
  },
  {
    key: 'solving',
    name: 'Problem-solving',
    promise: 'Bring solutions, not issues',
    summary:
      'A simple format that trains people to arrive with options and a recommendation instead of a complaint.',
    example: '“Machine 3 is down. Option A: shift the job to machine 5 tonight. Option B: outsource. I recommend A.”',
    founderChange: 'You make decisions, not diagnoses.',
    tools: ['Solution format', 'Decision rights', 'Root-cause habit'],
    fixHint: 'Ask for every problem to arrive with two options and one recommendation.',
  },
  {
    key: 'growth',
    name: 'Growth',
    promise: 'A visible path up',
    summary:
      'Skill ladders show each person how to grow, which keeps your best talent from walking out the door.',
    example: 'A junior sales rep can see the three skills that make them a senior, and how each one is checked.',
    founderChange: 'Leaders grow from inside instead of being hired at a premium.',
    tools: ['Skill ladders', 'Leadership development', 'Training & development'],
    fixHint: 'Name a successor for every critical role and the skills they still need.',
  },
  {
    key: 'rewards',
    name: 'Rewards',
    promise: 'Recognition tied to output',
    summary:
      'Incentives and recognition linked to measured results, so high performers win and passengers become visible.',
    example: 'Monthly recognition is decided by the scorecard, not by who was loudest in the review.',
    founderChange: 'Your salary bill starts paying for results.',
    tools: ['Output-linked incentives', 'Employee Engagement Index (EEI)', 'Recognition rituals'],
    fixHint: 'Tie one part of every incentive to a number on the scorecard.',
  },
];

export const specialties = [
  'Employee Engagement Index (EEI)',
  'Performance Monitoring & Measurement',
  'Competency Mapping',
  'Leadership Development',
  'Process Auditing',
  'Business Scorecards',
  'Training & Development',
];

export const howSteps = [
  {
    n: '01',
    when: '5 min',
    title: 'AURA Scan',
    text: 'A short founder diagnostic that shows exactly where accountability leaks in your business today.',
  },
  {
    n: '02',
    when: 'Week 1',
    title: 'Map the 49',
    text: 'Every role is plotted on the MAP49™ matrix. You see who is driving, who is drifting, and why.',
  },
  {
    n: '03',
    when: 'Weeks 2–8',
    title: 'Install the system',
    text: 'Ownership charts, rhythms, scorecards and reward loops go live with your team, guided step by step.',
  },
  {
    n: '04',
    when: 'Ongoing',
    title: 'Self-driven rhythm',
    text: 'The team runs the cadence. You review one page instead of chasing people. Profit compounds.',
  },
];

/* ---------------- Founder & company ---------------- */

export const founder = {
  name: 'Rupak Aich',
  initials: 'RA',
  title: 'India’s Top Trusted Team Productivity Expert',
  role: 'Founder, Sparsh Magic · Creator of MAP49™',
  book: 'How to achieve: 2x Team Accountability with 5x Team Productivity',
  truth: 'You don’t need better people. You need better systems they can run.',
  bio: [
    'Rupak Aich is the mind behind Sparsh Magic. For more than 30 years he has worked hands-on inside Indian businesses, helping founders run and grow them without daily intervention.',
    'He has worked with 342+ founders and MSMEs and more than 32,000 team members across manufacturing, retail, hospitality, finance, healthcare and services. MAP49™ is what those engagements taught him, built into a system.',
    'He is a practitioner, not a motivational speaker. His popular book, “How to achieve: 2x Team Accountability with 5x Team Productivity”, sets out the same thinking: accountability is designed, not demanded.',
  ],
};

/* ---------------- Industries ---------------- */

export type IconName =
  | 'factory'
  | 'store'
  | 'dumbbell'
  | 'utensils'
  | 'truck'
  | 'health'
  | 'briefcase'
  | 'rupee'
  | 'shirt'
  | 'chip'
  | 'plane';

export type Industry = {
  slug: string;
  title: string;
  icon: IconName;
  primary: boolean;
  tags: string[];
  card: string;
  pain: string;
  outcome: string;
  headline: string;
  intro: string;
  pains: { title: string; body: string; cost: string }[];
  mapping: { pillar: PillarKey; title: string; body: string; chips: string[] }[];
  applications: string[];
  kpis: string[];
  caseSlug?: string;
};

export const industries: Industry[] = [
  {
    slug: 'manufacturing',
    title: 'Manufacturing',
    icon: 'factory',
    primary: true,
    tags: ['Manufacturing'],
    card: 'Shift ownership, output targets and quality loops that hold without a supervisor shouting.',
    pain: 'Output depends on who is on shift.',
    outcome: 'Every shift hits the same standard.',
    headline: 'Output that doesn’t depend on who is on shift.',
    intro:
      'Maximise efficiency and productivity. MAP49™ streamlines shop-floor operations, makes supply-chain handoffs owned, and turns improvement areas into measured, bottom-line results.',
    pains: [
      { title: 'Supervisor-dependent output', body: 'The line runs well when one strong supervisor is present and slips when they are not.', cost: 'Costs: inconsistent output' },
      { title: 'Quality caught too late', body: 'Rejections surface at dispatch or at the customer, not at the station that caused them.', cost: 'Costs: rework & returns' },
      { title: 'Unowned downtime', body: 'Machines wait for maintenance, material waits for stores, and nobody owns the gap.', cost: 'Costs: lost machine hours' },
      { title: 'Skilled operators leave', body: 'Your best operators take their know-how with them and the line restarts from zero.', cost: 'Costs: training cycles' },
    ],
    mapping: [
      { pillar: 'clarity', title: 'Station-level scorecards', body: 'Each station has an output and a quality number it owns, visible on the floor.', chips: ['Output / shift', 'First-pass yield'] },
      { pillar: 'ownership', title: 'One owner per stoppage type', body: 'Breakdowns, material shortages and rework each have a named owner and a response time.', chips: ['Downtime owner', 'Escalation in 15 min'] },
      { pillar: 'rhythm', title: 'Shift-start huddle', body: 'A ten-minute huddle at every shift change covers yesterday’s numbers and today’s risks.', chips: ['Shift handover', 'Daily huddle'] },
      { pillar: 'metrics', title: 'One-page plant monitor', body: 'Output, rejection, downtime and attendance on a single page by 10 AM.', chips: ['OEE view', 'Rejection %'] },
      { pillar: 'growth', title: 'Operator skill ladders', body: 'Multi-skilling paths so the line never stops because one person is absent.', chips: ['Skill matrix', 'Successors'] },
    ],
    applications: ['Station-level output and quality scorecards', 'Downtime ownership with response times', 'Operator skill matrix and multi-skilling ladder'],
    kpis: ['Output per shift', 'First-pass yield', 'Downtime hours', 'Rejection rate', 'Attendance'],
    caseSlug: 'precision-manufacturer',
  },
  {
    slug: 'retail',
    title: 'Retail',
    icon: 'store',
    primary: true,
    tags: ['Retail'],
    card: 'Store teams that open, sell, restock and report on their own, across every branch.',
    pain: 'Every branch runs differently.',
    outcome: 'Every store runs the same playbook.',
    headline: 'Every branch, running like the founder is in it.',
    intro:
      'From inventory management to customer engagement, MAP49™ gives store teams a playbook they own, so you can optimise operations, reduce costs and increase revenue across every location.',
    pains: [
      { title: 'Branches run on personality', body: 'The store with the strong manager performs. The others drift, and you can’t tell why.', cost: 'Costs: uneven sales' },
      { title: 'Stock surprises', body: 'Fast movers run out and slow movers pile up because nobody owns the count.', cost: 'Costs: lost sales & dead stock' },
      { title: 'Walk-ins, not conversions', body: 'Footfall comes in but staff wait to be asked instead of selling.', cost: 'Costs: low conversion' },
    ],
    mapping: [
      { pillar: 'clarity', title: 'Store-role scorecards', body: 'Floor, billing and stock roles each own two or three numbers.', chips: ['Conversion', 'Average bill'] },
      { pillar: 'ownership', title: 'Category owners', body: 'Each category has one owner for display, stock level and reorder.', chips: ['Reorder owner', 'Display standard'] },
      { pillar: 'rhythm', title: 'Open-and-close routines', body: 'Checklists run by the team at opening and closing, reviewed weekly.', chips: ['Opening checklist', 'Closing report'] },
      { pillar: 'metrics', title: 'Branch league table', body: 'One page compares every branch on the same five numbers daily.', chips: ['Footfall', 'Stock days'] },
      { pillar: 'rewards', title: 'Conversion-linked incentives', body: 'Recognition follows conversion and average bill, not just attendance.', chips: ['Incentive slab', 'Monthly recognition'] },
    ],
    applications: ['Branch league table on one page', 'Category ownership for stock and display', 'Conversion-linked team incentives'],
    kpis: ['Footfall', 'Conversion rate', 'Average bill value', 'Stock days', 'Shrinkage'],
  },
  {
    slug: 'fitness',
    title: 'Fitness',
    icon: 'dumbbell',
    primary: true,
    tags: ['Fitness'],
    card: 'Trainers and front desk accountable for retention, renewals and member experience.',
    pain: 'Members join, then quietly leave.',
    outcome: 'Renewals become a process, not luck.',
    headline: 'Members who stay, and a team that keeps them.',
    intro:
      'Enhance member engagement, improve operational efficiency and drive revenue growth. MAP49™ turns membership management, follow-ups and marketing into owned routines.',
    pains: [
      { title: 'Silent drop-offs', body: 'Members stop coming in week three and nobody notices until renewal is lost.', cost: 'Costs: churn' },
      { title: 'Trainer-dependent experience', body: 'A member’s experience depends on which trainer they get on which day.', cost: 'Costs: uneven service' },
      { title: 'Leads go cold', body: 'Enquiries are logged but not followed up in time.', cost: 'Costs: wasted marketing spend' },
    ],
    mapping: [
      { pillar: 'ownership', title: 'Member owners', body: 'Every member has one trainer who owns their attendance and renewal.', chips: ['Member owner', 'Attendance alert'] },
      { pillar: 'rhythm', title: 'Weekly retention review', body: 'Fifteen minutes each week on members who missed sessions.', chips: ['Missed-session list', 'Call-back routine'] },
      { pillar: 'metrics', title: 'Club scorecard', body: 'Leads, conversions, attendance and renewals on one page.', chips: ['Lead-to-join', 'Renewal %'] },
      { pillar: 'rewards', title: 'Retention-linked rewards', body: 'Trainers are recognised for members who stay, not only for new sales.', chips: ['Renewal bonus', 'NPS'] },
    ],
    applications: ['Member ownership by trainer', 'Missed-session call-back routine', 'Renewal-linked trainer recognition'],
    kpis: ['Lead-to-join rate', 'Active attendance', 'Renewal rate', 'Member NPS'],
  },
  {
    slug: 'restaurants',
    title: 'Restaurants',
    icon: 'utensils',
    primary: true,
    tags: ['Restaurants', 'Hospitality'],
    card: 'Kitchen and floor running to standard, food cost in control, rush hours calm.',
    pain: 'Service quality swings with the rush.',
    outcome: 'Consistent guest experience, every service.',
    headline: 'The same great service on a Tuesday and a Saturday.',
    intro:
      'Exceptional guest experiences come from consistent operations. MAP49™ streamlines kitchen and floor routines so service delivery holds up through every rush.',
    pains: [
      { title: 'Rush-hour chaos', body: 'Orders pile up, tickets get missed and the owner steps in to firefight.', cost: 'Costs: bad reviews' },
      { title: 'Food cost drift', body: 'Portions, wastage and pilferage creep up because nobody owns them daily.', cost: 'Costs: margin' },
      { title: 'High staff churn', body: 'Trained staff leave for a small raise, and standards reset every few months.', cost: 'Costs: retraining' },
    ],
    mapping: [
      { pillar: 'clarity', title: 'Station standards', body: 'Every kitchen and floor station has a short written standard and a timing target.', chips: ['Ticket time', 'Plating standard'] },
      { pillar: 'ownership', title: 'Shift captains', body: 'One captain per shift owns service flow and escalations.', chips: ['Shift captain', 'Escalation rule'] },
      { pillar: 'metrics', title: 'Daily food-cost check', body: 'Opening and closing stock reconciled daily against sales.', chips: ['Food cost %', 'Wastage log'] },
      { pillar: 'growth', title: 'Staff skill ladders', body: 'Clear steps from helper to commis to chef de partie, so staff can see a future.', chips: ['Skill ladder', 'Cross-training'] },
    ],
    applications: ['Shift captains who own service flow', 'Daily food-cost reconciliation', 'Staff skill ladders that reduce churn'],
    kpis: ['Ticket time', 'Food cost %', 'Table turns', 'Review rating', 'Staff retention'],
  },
  {
    slug: 'distribution',
    title: 'Distribution',
    icon: 'truck',
    primary: false,
    tags: ['Distribution', 'Services'],
    card: 'Sales, collections and dispatch that move without the owner on the phone all day.',
    pain: 'Growth limited by founder bandwidth.',
    outcome: 'A team that grows the territory.',
    headline: 'A distribution business that grows past the founder.',
    intro:
      'Distribution runs on follow-ups: orders, dispatch, collections. MAP49™ puts each of those under an owner with a daily number, so growth no longer depends on the founder’s phone.',
    pains: [
      { title: 'Collections chase', body: 'Outstanding payments only move when the founder calls.', cost: 'Costs: working capital' },
      { title: 'Dispatch errors', body: 'Wrong items and late deliveries damage retailer trust.', cost: 'Costs: repeat orders' },
      { title: 'Sales team waits for direction', body: 'Reps visit the same outlets and wait for targets to be pushed.', cost: 'Costs: territory growth' },
    ],
    mapping: [
      { pillar: 'ownership', title: 'Collection owners', body: 'Every outstanding account has one owner and an ageing target.', chips: ['Ageing report', 'Owner per account'] },
      { pillar: 'metrics', title: 'Daily sales & dues page', body: 'Orders, dispatch accuracy and dues on one page by 10 AM.', chips: ['Dispatch accuracy', 'DSO'] },
      { pillar: 'rhythm', title: 'Beat-plan review', body: 'Weekly review of outlet coverage run by the sales lead.', chips: ['Beat plan', 'New outlets'] },
      { pillar: 'rewards', title: 'Collection-linked incentives', body: 'Incentives paid on collected revenue, not just booked orders.', chips: ['Collected revenue', 'Incentive slab'] },
    ],
    applications: ['Collection ownership with ageing targets', 'Daily sales and dues monitor', 'Collected-revenue incentives'],
    kpis: ['Collected revenue', 'Days sales outstanding', 'Dispatch accuracy', 'Active outlets'],
    caseSlug: 'distributor-171',
  },
  {
    slug: 'healthcare',
    title: 'Healthcare',
    icon: 'health',
    primary: false,
    tags: ['Healthcare', 'Services'],
    card: 'Clinics and diagnostics with front desk, billing and follow-up running to standard.',
    pain: 'Patient experience varies by shift.',
    outcome: 'Reliable patient experience, every visit.',
    headline: 'Patient experience that doesn’t depend on who is at the desk.',
    intro:
      'In clinics and diagnostic centres, small lapses become lost patients. MAP49™ makes front desk, billing and follow-up routines owned and measured.',
    pains: [
      { title: 'Front-desk bottlenecks', body: 'Waiting times and billing errors frustrate patients.', cost: 'Costs: patient loyalty' },
      { title: 'Follow-ups forgotten', body: 'Reports and review appointments are not tracked to closure.', cost: 'Costs: repeat visits' },
      { title: 'Doctor-dependent operations', body: 'Senior doctors spend time on admin decisions.', cost: 'Costs: clinical time' },
    ],
    mapping: [
      { pillar: 'clarity', title: 'Desk standards', body: 'Check-in, billing and report delivery each have a time standard.', chips: ['Wait time', 'Billing accuracy'] },
      { pillar: 'ownership', title: 'Follow-up owners', body: 'Each patient follow-up has a named owner until it is closed.', chips: ['Follow-up closure', 'Owner per patient'] },
      { pillar: 'metrics', title: 'Daily centre monitor', body: 'Footfall, wait times, revenue and pending reports on one page.', chips: ['Pending reports', 'Footfall'] },
      { pillar: 'solving', title: 'Admin decision rights', body: 'Clear rules for what staff decide so doctors stay clinical.', chips: ['Decision rights', 'Escalation rule'] },
    ],
    applications: ['Front-desk time standards', 'Patient follow-up ownership', 'Admin decision rights that free doctors'],
    kpis: ['Average wait time', 'Report turnaround', 'Follow-up closure', 'Patient rating'],
  },
  {
    slug: 'finance',
    title: 'Finance',
    icon: 'rupee',
    primary: false,
    tags: ['Finance', 'Services'],
    card: 'Advisory and wealth teams aligned on clients, pipeline and service standards.',
    pain: 'Client service depends on the partner.',
    outcome: 'A team that owns the client book.',
    headline: 'A client book the whole team owns.',
    intro:
      'In finance and wealth firms, the founder often holds every relationship. MAP49™ spreads ownership across the team so service stays sharp and growth stays on track.',
    pains: [
      { title: 'Partner holds every relationship', body: 'Clients call the founder for everything because nobody else owns them.', cost: 'Costs: founder time' },
      { title: 'Pipeline without rhythm', body: 'Leads and reviews happen when someone remembers.', cost: 'Costs: missed growth' },
      { title: 'Unclear roles', body: 'Operations, advisory and service overlap, so tasks slip through.', cost: 'Costs: client experience' },
    ],
    mapping: [
      { pillar: 'clarity', title: 'Role outcomes', body: 'Advisory, operations and service each own clear client outcomes.', chips: ['Client outcomes', 'Role scorecard'] },
      { pillar: 'ownership', title: 'Relationship owners', body: 'Every client has one relationship owner below the founder.', chips: ['Client owner', 'Review calendar'] },
      { pillar: 'rhythm', title: 'Weekly pipeline review', body: 'The team runs a weekly review of leads, reviews and renewals.', chips: ['Pipeline', 'Client reviews'] },
    ],
    applications: ['Relationship ownership below the founder', 'Weekly pipeline rhythm', 'Role scorecards across advisory and operations'],
    kpis: ['Assets / book growth', 'Client reviews done', 'Lead conversion', 'Client retention'],
    caseSlug: 'wealth-advisory',
  },
  {
    slug: 'services',
    title: 'Services',
    icon: 'briefcase',
    primary: false,
    tags: ['Services', 'Tech', 'Tourism'],
    card: 'Agencies, tech, tourism and professional services delivering on time without escalation.',
    pain: 'Projects slip without the founder.',
    outcome: 'Delivery that runs on a calendar.',
    headline: 'Projects delivered on time without the founder escalating.',
    intro:
      'Service businesses, from tech and agencies to tourism and fashion, sell time and trust. MAP49™ makes delivery, client communication and quality owned by the team.',
    pains: [
      { title: 'Deadlines slip quietly', body: 'Delays are discovered by the client, not by the team.', cost: 'Costs: client trust' },
      { title: 'Founder in every client call', body: 'Clients escalate to the founder because there is no other owner.', cost: 'Costs: founder time' },
      { title: 'Utilisation unknown', body: 'Nobody knows who is overloaded and who is idle.', cost: 'Costs: margin' },
    ],
    mapping: [
      { pillar: 'ownership', title: 'Project owners', body: 'Every project has one delivery owner who communicates with the client.', chips: ['Delivery owner', 'Client update'] },
      { pillar: 'rhythm', title: 'Weekly delivery review', body: 'Status, risks and next steps reviewed weekly by the team.', chips: ['Risk log', 'Status review'] },
      { pillar: 'metrics', title: 'Utilisation page', body: 'One page shows load, on-time delivery and billing.', chips: ['Utilisation', 'On-time %'] },
    ],
    applications: ['Single delivery owner per project', 'Weekly risk and status review', 'Utilisation and on-time monitor'],
    kpis: ['On-time delivery', 'Utilisation', 'Client NPS', 'Billing cycle'],
  },
];

export const getIndustry = (slug: string) => industries.find((i) => i.slug === slug);

/* ---------------- Results & testimonials ---------------- */

export type CaseStudy = {
  slug: string;
  company: string;
  sector: string;
  industrySlug?: string;
  headline: string;
  metric: string;
  metricLabel: string;
  stages: { label: string; title: string; text: string }[];
  quote: string;
  person: string;
  personRole: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: 'distributor-171',
    company: 'S Square Marketing',
    sector: 'Distribution',
    industrySlug: 'distribution',
    headline: '171% growth in two years',
    metric: '171%',
    metricLabel: 'growth in 2 years',
    stages: [
      { label: 'Chaos', title: 'Founder-led growth', text: 'Growth tied to how much the founder could personally follow up.' },
      { label: 'Install', title: 'Ownership & rhythm', text: 'Clear owners, a review rhythm and measured targets for the team.' },
      { label: 'Outcome', title: 'Measured growth', text: '171% business growth over two years with Sparsh Magic.' },
    ],
    quote: 'By our side we have grown in ways we hadn’t even dreamt of. In two years with Rupak we have grown by 171%.',
    person: 'Umesh Agrawal',
    personRole: 'S Square Marketing, Distributor',
  },
  {
    slug: 'precision-manufacturer',
    company: 'Patco Precision',
    sector: 'Manufacturing',
    industrySlug: 'manufacturing',
    headline: 'Five years of questions answered in one session',
    metric: '1 session',
    metricLabel: 'more clarity than 5 years of running it',
    stages: [
      { label: 'Chaos', title: 'Performance in the dark', text: 'The founder lacked a clear view of who was delivering and who was not.' },
      { label: 'Install', title: 'Performance mapping', text: 'Each role mapped against measured outcomes and accountability levels.' },
      { label: 'Outcome', title: 'Clarity to act', text: 'A clear picture of team performance, and what to fix first.' },
    ],
    quote: 'The clarity I got about my team’s performance in one session was more than I got in 5 years of running the business.',
    person: 'Ravindra Patil',
    personRole: 'Patco Precision',
  },
  {
    slug: 'wealth-advisory',
    company: 'A D Naik Wealth',
    sector: 'Finance',
    industrySlug: 'finance',
    headline: 'A team aligned on one direction',
    metric: 'Aligned',
    metricLabel: 'team, on a growth trajectory',
    stages: [
      { label: 'Chaos', title: 'Misaligned roles', text: 'A capable team pulling in different directions.' },
      { label: 'Install', title: 'Shared scorecard', text: 'Roles, outcomes and a shared review rhythm agreed by the team.' },
      { label: 'Outcome', title: 'Growth trajectory', text: 'The team aligned and the business moved onto a growth trajectory.' },
    ],
    quote: 'Team got aligned and we are on growth trajectory.',
    person: 'Nikhil Naik',
    personRole: 'A D Naik Wealth',
  },
];

export const testimonials = [
  { person: 'Radhika Paul', role: 'CEO', text: 'Said most of the team and business issues were solved in the very first visit.' },
  { person: 'Aslam Khan', role: 'Director', text: 'Thanked the team for the MMR sessions and what they changed for the business.' },
];

/* ---------------- Culture, team, career ---------------- */

export const values = [
  { title: 'Integrity', text: 'We say what the numbers say, even when it is uncomfortable.' },
  { title: 'Client outcomes first', text: 'Our work is measured by what changes in your business, not by hours spent.' },
  { title: 'Say it straight', text: 'Genuine, plain conversations. No jargon, no theatre.' },
  { title: 'Learn by doing', text: 'We upskill through real implementation, every week.' },
  { title: 'Make it simple', text: 'If a 10-year-old can’t follow the process, we simplify it again.' },
  { title: 'Two-way communication', text: 'Founders and teams both get heard. Feedback flows up as easily as down.' },
  { title: 'Automate the repeatable', text: 'Humans own judgement. Systems and tools handle repetition.' },
];

export const teamUnits = [
  { initials: 'DX', title: 'Diagnostics & AURA', text: 'Runs the AURA Scan and the first MAP49™ mapping of your business.' },
  { initials: 'IC', title: 'Implementation Coaches', text: 'Install ownership charts, rhythms and scorecards alongside your team.' },
  { initials: 'AN', title: 'Analytics & Scorecards', text: 'Builds the one-page business monitor and keeps the numbers honest.' },
  { initials: 'TD', title: 'Training & Development', text: 'Designs skill ladders and leadership programmes for your people.' },
  { initials: 'CS', title: 'Client Success', text: 'Keeps the system running after go-live and flags drift early.' },
];

export const careerLookFor = [
  { title: 'Ownership', text: 'You finish what you start, and you say so when you can’t.' },
  { title: 'Systems thinking', text: 'You fix the process, not just the problem in front of you.' },
  { title: 'No hand-holding', text: 'You are your own manager. You set the rhythm and keep it.' },
  { title: 'Passion for productivity', text: 'You care about making work easier and fairer for people.' },
];

export const careerAreas = ['Implementation Coach', 'Business Analyst', 'Training Facilitator', 'Client Success'];
