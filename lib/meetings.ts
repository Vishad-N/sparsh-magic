/**
 * Client Meetings gallery data. Photos come from https://www.sparshmagic.com/client-meetings/
 * (pre-resized webp in /public/meetings). The source gives no captions or client names, so
 * alt text describes the setting only. To add a photo, drop a webp in /public/meetings and
 * append a row; the first WALLS * PER_WALL landscape photos fill the 3D room.
 */
export type Meeting = { src: string; w: number; h: number; alt: string };

const rows: [string, number, number, string][] = [
  ['01', 1100, 619, 'Sparsh Magic team members at a client event, exchanging an award'],
  ['02', 1100, 619, 'Team members in conversation with clients at an expo floor'],
  ['03', 1100, 619, 'Team and clients talking at a Sparsh Magic booth'],
  ['04', 1100, 619, 'Two Sparsh Magic team members with a visitor at an expo'],
  ['05', 1100, 619, 'Team members meeting clients at a trade-show stand'],
  ['06', 1100, 619, 'A bouquet being presented on stage at a client event'],
  ['07', 1100, 619, 'Team and clients standing together at an expo booth'],
  ['08', 1100, 619, 'Two attendees in conversation at an industry event'],
  ['09', 1100, 733, 'Team members greeting clients beside the Sparsh Magic display'],
  ['10', 1100, 733, 'A team member explaining the system to a client at the booth'],
  ['11', 1100, 733, 'Two team members smiling for a photo at an event'],
  ['12', 1100, 733, 'A visitor in discussion with a team member at the expo'],
  ['13', 1100, 733, 'Team members and visitors talking at a stand'],
  ['14', 1100, 733, 'A speaker addressing a large seated audience'],
  ['15', 1100, 733, 'A founder speaking at a leadership programme in a banquet hall'],
  ['16', 1100, 733, 'The audience at a Sparsh Magic leadership programme'],
  ['17', 1100, 733, 'A presenter at the Leadership Empowerment Programme'],
  ['18', 1100, 733, 'Participants seated at round tables in a training hall'],
  ['19', 1100, 733, 'A facilitator on stage with participants at tables'],
  ['20', 508, 1100, 'Participants standing and talking during a workshop break'],
  ['21', 1100, 508, 'A small group working through a case at a meeting table'],
  ['22', 508, 1100, 'Team members gathered beside a meeting room'],
  ['23', 1100, 508, 'A one-to-one client meeting at a desk'],
  ['24', 1100, 494, 'A group of participants and team members posing in a hall'],
  ['25', 1100, 619, 'Participants at a workshop in a hotel conference room'],
  ['26', 1100, 619, 'A client workshop in progress'],
  ['27', 1100, 493, 'Workshop participants seated in a banquet hall'],
  ['28', 1100, 493, 'A group discussion at a client workshop'],
  ['29', 1100, 494, 'Team members facilitating a table exercise'],
  ['30', 1100, 494, 'Participants seated in a conference room'],
  ['31', 1100, 619, 'A founder presenting to a seated group'],
  ['32', 1100, 494, 'Participants and a facilitator around a long table'],
  ['33', 619, 1100, 'A whiteboard exercise at a client workshop'],
  ['34', 619, 1100, 'A facilitator at the whiteboard during a session'],
  ['35', 619, 1100, 'Participants gathered around a whiteboard'],
];

export const meetings: Meeting[] = rows.map(([n, w, h, alt]) => ({ src: `/meetings/${n}.webp`, w, h, alt }));

export const WALLS = 6;
export const PER_WALL = 4;
export const wallTitles = ['Expo floor', 'Booth days', 'On stage', 'Leadership programme', 'Round tables', 'Workshops'];

/** The first 24 landscape photos, four to a wall. */
const landscape = meetings.filter((m) => m.w > m.h);
export const walls: Meeting[][] = Array.from({ length: WALLS }, (_, i) => landscape.slice(i * PER_WALL, (i + 1) * PER_WALL));
