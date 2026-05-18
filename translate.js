const fs = require('fs');
let content = fs.readFileSync('components/InputBox.tsx', 'utf8');

const mapping = {
  'Ajouter des fichiers ou des ph...': 'add_files_short',
  'Ajouter au projet': 'add_to_project',
  'Connecteurs': 'connectors',
  'Recherche Web': 'web_search',
  'Utiliser le style': 'use_style',
  'Retour': 'go_back_short',
  'Projets récents': 'recent_projects',
  'Par vous': 'by_you',
  'Vos connecteurs': 'your_connectors',
  'Ajouter un connecteur': 'add_connector',
  'Normal': 'style_normal',
  'Apprentissage': 'style_learning',
  'Concis': 'style_concise',
  'Explicatif': 'style_explanatory',
  'Opus 4.7': 'opus_4_7',
  'Sonnet 3.5': 'sonnet_3_5',
  'Haiku 4.5': 'haiku_4_5',
  'Écrire un message...': 'write_message',
  'Comment puis-je vous aider ?': 'how_can_i_help'
};

const frTranslations = {
  'add_files_short': 'Ajouter des fichiers ou des ph...',
  'add_to_project': 'Ajouter au projet',
  'connectors': 'Connecteurs',
  'web_search': 'Recherche Web',
  'use_style': 'Utiliser le style',
  'go_back_short': 'Retour',
  'recent_projects': 'Projets récents',
  'by_you': 'Par vous',
  'your_connectors': 'Vos connecteurs',
  'add_connector': 'Ajouter un connecteur',
  'style_normal': 'Normal',
  'style_learning': 'Apprentissage',
  'style_concise': 'Concis',
  'style_explanatory': 'Explicatif',
  'opus_4_7': 'Opus 4.7',
  'sonnet_3_5': 'Sonnet 3.5',
  'haiku_4_5': 'Haiku 4.5',
  'write_message': 'Écrire un message...',
  'how_can_i_help': 'Comment puis-je vous aider ?'
};

const enTranslations = {
  'add_files_short': 'Add files or ph...',
  'add_to_project': 'Add to project',
  'connectors': 'Connectors',
  'web_search': 'Web search',
  'use_style': 'Use style',
  'go_back_short': 'Back',
  'recent_projects': 'Recent projects',
  'by_you': 'By you',
  'your_connectors': 'Your connectors',
  'add_connector': 'Add connector',
  'style_normal': 'Normal',
  'style_learning': 'Learning',
  'style_concise': 'Concise',
  'style_explanatory': 'Explanatory',
  'opus_4_7': 'Opus 4.7',
  'sonnet_3_5': 'Sonnet 3.5',
  'haiku_4_5': 'Haiku 4.5',
  'write_message': 'Write a message...',
  'how_can_i_help': 'How can I help you?'
};

Object.keys(mapping).forEach(k => {
  const v = mapping[k];
  // Replace string occurrences in code
  const regex = new RegExp('"' + k.replace(/\?/g, '\\\\?') + '"', 'g');
  content = content.replace(regex, 't("' + v + '")');
});

content = content.replace(/>Retour</g, '>{t("go_back_short")}<');
content = content.replace(/>Projets récents</g, '>{t("recent_projects")}<');
content = content.replace(/>Vos compétences</g, '>{t("your_skills")}<');
content = content.replace(/>Par vous</g, '>{t("by_you")}<');
content = content.replace(/>Vos connecteurs</g, '>{t("your_connectors")}<');
content = content.replace(/>Gérer</g, '>{t("manage")}<');
content = content.replace(/>Démarrer un projet</g, '>{t("start_project")}<');
content = content.replace(/>Ajouter un connecteur</g, '>{t("add_connector")}<');
content = content.replace(/>Pensée adaptative</g, '>{t("adaptive_thought")}<');
content = content.replace(/>Mettre à niveau</g, '>{t("upgrade_short")}<');

// Replace map of styles
content = content.replace(/\[\s*t\("style_normal"\),\s*t\("style_learning"\),\s*t\("style_concise"\),\s*t\("style_explanatory"\)\s*\]/, "['style_normal', 'style_learning', 'style_concise', 'style_explanatory']");
content = content.replace(/\["Normal",\s*"Apprentissage",\s*"Concis",\s*"Explicatif"\]/, "['style_normal', 'style_learning', 'style_concise', 'style_explanatory']");
// Replace {s} with {t(s)} in map correctly
content = content.replace(/key=\{s\}/g, 'key={s}');
content = content.replace(/>\s*\{s\}\s*<\/button>/g, '>{t(s)}</button>');

content = content.replace(/>Plus de modèles /g, '>{t("more_models")} ');

// Remove dynamic parsing for free messages, it spans multiple lines. We'll use a basic replace:
const msgBlockRegex = /Vous n'avez plus de.*?\n.*?messages.*?\n.*?gratuits jusqu'à 21:10\./gsi;
content = content.replace(msgBlockRegex, "{t('out_of_messages_2110')}");

fs.writeFileSync('components/InputBox.tsx', content);

let i18nContent = fs.readFileSync('lib/i18n.tsx', 'utf8');
const i18nFrMatches = i18nContent.match(/fr:\s*({[\s\S]*?}),\n  en:/);
const i18nEnMatches = i18nContent.match(/en:\s*({[\s\S]*?})\n};/);

if (i18nFrMatches && i18nEnMatches) {
  let frObj = JSON.parse(i18nFrMatches[1]);
  let enObj = JSON.parse(i18nEnMatches[1]);
  Object.assign(frObj, frTranslations, {'out_of_messages_2110': "Vous n'avez plus de messages gratuits jusqu'à 21h10", "plus_de_modeles": "Plus de modèles", "opus_4_7": "Opus 4.7", "sonnet_3_5": "Sonnet 3.5", "haiku_4_5": "Haiku 4.5", "adaptive_thought": "Pensée adaptative", "web_search": "Recherche Web", "more_models": "Plus de modèles"});
  Object.assign(enObj, enTranslations, {'out_of_messages_2110': "You're out of free messages until 9:10 PM", "plus_de_modeles": "More models", "opus_4_7": "Opus 4.7", "sonnet_3_5": "Sonnet 3.5", "haiku_4_5": "Haiku 4.5", "adaptive_thought": "Adaptive thought", "web_search": "Web search", "more_models": "More models"});
  
  i18nContent = i18nContent.replace(i18nFrMatches[1], JSON.stringify(frObj, null, 4));
  i18nContent = i18nContent.replace(i18nEnMatches[1], JSON.stringify(enObj, null, 4));
  fs.writeFileSync('lib/i18n.tsx', i18nContent);
}

