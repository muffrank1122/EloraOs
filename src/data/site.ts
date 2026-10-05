export const SITE = {
  name: 'Elora',
  brand: 'EloraOS',
  url: 'https://eloraos.com',
  locale: 'en_US',
  themeColor: '#0b0e16',
  title: 'Elora — Private, Local AI Companion for Windows PCs',
  description:
    'Elora is a private AI companion that runs on your Windows PC. She sees your screen, hears you, remembers what matters and speaks English and Roman Urdu.',
  ogImage: '/og/elora-og.jpg',
  ogImageAlt: 'Elora, the on-device AI companion, in her glass workspace above a night-time city.',
  screenshot: '/og/elora-workspace.jpg',
  logo: '/icons/icon-512.png',
  // Set both before launch (see README → Before launch).
  // signupAction: the URL your email-list provider gives you for a plain HTML form POST.
  signupAction: '',
  contactEmail: '',
} as const;

/** Used in the SoftwareApplication structured data. Every item must stay true of the product. */
export const FEATURES = [
  'Runs locally on Windows through Ollama — no cloud needed for chat, speech recognition or reasoning',
  'Push-to-talk voice with about one second to text, and barge-in: talk over her and she stops',
  'English, Roman Urdu or both in the same conversation',
  'Dated, layered memory: working memory, searchable timeline, facts and semantic recall',
  'Continuous background mind: perceive every ~5 s, reason every ~30 s, reflect every ~5 min',
  'Reads screen text for context; screen text is never treated as a command',
  'Around 70 built-in actions plus MCP tools, with visible approval for risky actions',
  'Reminders and dates computed in code, in your time zone',
  'Glass HUD workspace, command center, or a lip-synced 3D avatar',
] as const;

export const NAV = [
  { href: '/', label: 'Overview' },
  { href: '/how-it-works/', label: 'How it works' },
  { href: '/privacy/', label: 'Privacy' },
  { href: '/faq/', label: 'FAQ' },
] as const;

/** Measured by tools/intelligence_score.py against Elora's live brain database. */
export const SCORECARD = {
  date: '2026-10-04',
  dateLabel: '4 Oct 2026',
  overall: 4.6,
  axes: [
    { name: 'Knowledge', question: 'Does she know things?', score: 2.5 },
    { name: 'Retention', question: 'Does experience become knowledge?', score: 1.7 },
    { name: 'Judgment', question: 'Does she decide well?', score: 2.3 },
    { name: 'Learning', question: 'Does she improve?', score: 8.0 },
    { name: 'Initiative', question: 'Does she act unprompted, usefully?', score: 5.5 },
    { name: 'Grounding', question: 'Is she right?', score: 7.7 },
    { name: 'Expression', question: 'Can she say it well?', score: null },
  ],
} as const;
