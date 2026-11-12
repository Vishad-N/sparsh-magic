/**
 * "Trusted by Brands": the logos shown on sparshmagic.com, cut out of the
 * original carousel images into one file per brand (public/brand/clients).
 * w/h are the file's intrinsic pixel size.
 */
export type Client = { name: string; file: string; w: number; h: number };

export const clients: Client[] = [
  { name: 'AD Naikwealth', file: 'ad-naikwealth', w: 168, h: 168 },
  { name: 'Workie', file: 'workie', w: 203, h: 85 },
  { name: 'PATCO', file: 'patco', w: 274, h: 42 },
  { name: 'BS Group', file: 'bs-group', w: 158, h: 158 },
  { name: 'Modware', file: 'modware', w: 385, h: 90 },
  { name: 'Oswal Publishers', file: 'oswal-publishers', w: 184, h: 104 },
  { name: 'Kohinoor Mall', file: 'kohinoor-mall', w: 244, h: 78 },
  { name: 'S Square Marketing', file: 's-square-marketing', w: 235, h: 98 },
  { name: 'Taj', file: 'taj', w: 144, h: 125 },
  { name: 'Bamboo Saa', file: 'bamboo-saa', w: 145, h: 146 },
  { name: 'Degree Day', file: 'degree-day', w: 408, h: 84 },
];
