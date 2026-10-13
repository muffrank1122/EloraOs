export const SITE = {
  name: 'Elora',
  brand: 'EloraOS',
  url: 'https://eloraos.com',
  locale: 'en_US',
  themeColor: '#0b0e16',
  title: 'Elora — Your Local-First AI Companion for Windows',
  description:
    'Meet Elora: a local-first Windows AI companion with voice, memory and desktop actions. English and Roman Urdu, with optional cloud and Google connections.',
  ogImage: '/og/elora-og.jpg',
  ogImageAlt: 'Illustration of Elora, a local-first Windows AI companion, in a futuristic workspace.',
  logo: '/icons/icon-512.png',
  contentUpdated: '2026-10-13',
  contentUpdatedLabel: '13 October 2026',
  contactEmail: '',
} as const;

/** Used in the SoftwareApplication structured data. Every item must stay true of the product. */
export const FEATURES = [
  'Runs locally on Windows through Ollama — no cloud needed for chat, speech recognition or reasoning',
  'Push-to-talk voice, optional wake-word listening, and interruptible replies',
  'Optional GroqCloud speech recognition, chat and voice, enabled separately with local fallback',
  'English, Roman Urdu or both in the same conversation',
  'Dated, layered memory: working memory, searchable timeline, facts and semantic recall',
  'Continuous background mind: perceive every ~5 s, reason every ~30 s, reflect every ~5 min',
  'Reads screen text for context; screen text is never treated as a command',
  'Built-in actions and MCP integrations with approval gates for risky operations',
  'Optional owner-directed Windows desktop control; screen text can go to Groq, screenshots stay local',
  'Optional Gmail, Google Calendar and Drive connection through OAuth; writes require approval',
  'Reminders and dates computed in code, in your time zone',
  'Glass HUD workspace, command center, or a lip-synced 3D avatar',
] as const;

export const NAV = [
  { href: '/', label: 'Overview' },
  { href: '/capabilities/', label: 'Capabilities' },
  { href: '/how-it-works/', label: 'How it works' },
  { href: '/privacy/', label: 'Privacy' },
  { href: '/faq/', label: 'FAQ' },
] as const;

/** Historical snapshot from the product README, not a current benchmark. Do not refresh its date without a new measured report. */
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
