export interface Faq {
  q: string;
  /** Plain text: used both on the page and in the FAQPage structured data. */
  a: string;
}

export const FAQS: Faq[] = [
  {
    q: 'What is Elora?',
    a: 'Elora is a private, local-first AI companion for Windows. She runs on your own PC, sees what is on your screen, listens when you hold to talk, remembers what matters with dated memories, and can act for you — set reminders, manage tasks, search files and automate the browser. She talks with you in English, Roman Urdu or a mix of both.',
  },
  {
    q: 'Does Elora work without the cloud?',
    a: 'Yes. Chat, speech recognition and reasoning run on local models through Ollama on your PC. The internet is only needed to download the models and for optional features you switch on yourself, such as a cloud voice or online research. Every outbound request passes through a single network guard.',
  },
  {
    q: 'What hardware does Elora need?',
    a: 'Windows 10 or 11, a graphics card with 4 GB of memory (Elora is tuned on a GTX 1650) and at least 16 GB of RAM — 32 GB is more comfortable. The chat model stays fully on the GPU while speech recognition, voice and embeddings run on the CPU.',
  },
  {
    q: 'Does Elora run on macOS or Linux?',
    a: 'Not today. Elora is built and tested for Windows 10 and 11 first, because she relies on Windows features for screen context, audio and desktop actions.',
  },
  {
    q: 'Which AI models does Elora use?',
    a: 'Local models served by Ollama. The default chat model is Llama 3.2 3B with a tuned configuration that keeps every layer on a 4 GB GPU — about 54 tokens per second on a GTX 1650. Speech recognition uses Whisper models on your PC, and voices come from Kokoro and Piper. Models are swappable: change one and Elora keeps her memory and personality.',
  },
  {
    q: 'Can Elora understand Roman Urdu?',
    a: 'Yes. She follows you between English and Roman Urdu in the same conversation, and understands phrases like "yaad dilana 5 baje", "agle juma" or "parson". Dates such as these are calculated in code, not guessed by the model. Urdu and Hindi speech recognition is supported through IndicWhisper.',
  },
  {
    q: 'Is Elora always listening?',
    a: 'No. Voice is push-to-talk: you click and hold the mic button while you speak, and only what you say while holding is transcribed. Transcription takes about a second and happens on your PC.',
  },
  {
    q: 'Does Elora read my screen? What about banking and passwords?',
    a: 'Elora periodically reads the text on your screen and which app is in front so she can help in context. That text is treated as untrusted: it can be remembered and searched but never becomes an instruction she follows. Banking, password and health pages drop to minimal observation, a privacy mode pauses perception entirely, and one key hides her instantly.',
  },
  {
    q: 'Can Elora take actions on my computer?',
    a: 'Yes. She has around 70 built-in actions — reminders, tasks, memory, files, research and browser automation — plus any tools you add through the Model Context Protocol (MCP). Everything passes through one risk policy, and anything risky waits for your visible approval.',
  },
  {
    q: 'Where is my data stored, and can I delete it?',
    a: 'On your PC. Conversations, the timeline of what she has seen and her memories live in a local SQLite database and a local vector index (ChromaDB) in Elora\'s data folder. You can inspect it, and one command wipes it completely.',
  },
  {
    q: 'Does Elora remember everything forever?',
    a: 'No, on purpose. Every fact is stored with a date so old information never reads as current, and each night Elora consolidates what she learned and runs a forgetting pass that lets go of low-value memories.',
  },
  {
    q: 'How is Elora different from ChatGPT or Copilot?',
    a: 'Cloud assistants live on someone else\'s servers and wait in a tab until you ask. Elora lives on your PC: she keeps running in the background, notices what you are doing, keeps her memory locally, and can act on your desktop — with your conversations staying on your own hardware.',
  },
  {
    q: 'When can I get Elora, and how much will it cost?',
    a: 'Elora is in active development. Leave your email on this site and we will send one message when the first public build for Windows is ready. Pricing has not been announced yet.',
  },
];
