export const conversations = [
  {
    id: 1,
    title: "Correction et amélioration d'application agent temps",
    time: "il y a 1 heure",
  },
  {
    id: 2,
    title: "Building a unified AI coding agent from multiple frameworks",
    time: "il y a 8 heures",
  },
  { id: 3, title: "React UI recreation", time: "hier" },
  {
    id: 4,
    title: "Architecture d'agent ultra-puissant dépassant Claude Code",
    time: "avant-hier",
  },
  { id: 5, title: "Create a 3d low poly sportbike...", time: "il y a 3 jours" },
  {
    id: 6,
    title: "Modèle IA gratuit le plus puissant",
    time: "il y a 4 jours",
  },
  { id: 7, title: "Atteindre 20/20 en mathématiques", time: "il y a 4 jours" },
  { id: 8, title: "Greeting", time: "il y a 4 jours" },
];

export const favorites = [
  { id: 10, title: "Building a multi-role AI agent arc..." },
  { id: 11, title: "Compare openclaw, agent-zero f..." },
];

export const projects = [
  { id: 20, name: "hire", tag: "bug" },
  { id: 21, name: "My Research Notes", tag: "" },
  { id: 22, name: "Code Review", tag: "" },
];

export const dummyMessages = [
  {
    id: 1,
    role: "user",
    content: "Bonjour Claude, peux-tu m'aider à créer une application ?",
  },
  {
    id: 2,
    role: "assistant",
    content:
      "Bien sûr ! Je suis là pour vous aider à créer votre application. Quel type d'application souhaitez-vous développer ? Avez-vous une technologie particulière en tête, comme React, Node.js ou Python ?",
  },
  {
    id: 3,
    role: "user",
    content: "Crée-moi un clone simple de Gemini avec React.",
  },
  {
    id: 4,
    role: "assistant",
    content:
      'Voici un clone de l\'interface de Gemini en React avec Tailwind CSS.\n\n<div class="open-artifact-btn bg-[#1a1a1a] border border-[#2a2a2a] p-4 rounded-xl cursor-pointer hover:bg-[#222] transition-colors flex items-center gap-4 mt-4">\n  <div class="bg-blue-500/20 text-blue-400 p-2 rounded-lg">\n    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>\n  </div>\n  <div>\n    <div class="text-white font-medium">Gemini clone - JSX</div>\n    <div class="text-[#888] text-sm">React UI Component</div>\n  </div>\n</div>',
  },
];
