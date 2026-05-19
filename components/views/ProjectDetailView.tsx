"use client";

import { useState, useRef, useEffect } from "react";
import { useI18n } from '@/lib/i18n';
import { ArrowLeft, MoreVertical, Star, Lock, Plus, Paperclip, AlignLeft, Github, Info, Search, X, Copy, Grid, Code, Check, ExternalLink, Download, Maximize2, Tv, Smartphone, Laptop, RotateCw, Sparkles, Layers, Volume2, Play } from "lucide-react";
import { InputBox } from "@/components/InputBox";

interface CodeFile {
  name: string;
  size: string;
  content: string;
  language: string;
  isGithub?: boolean;
}

export function ProjectDetailView({ project, onBack }: { project: any, onBack: () => void }) {
  const { t } = useI18n();
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [showTextModal, setShowTextModal] = useState(false);
  const [showGithubModal, setShowGithubModal] = useState(false);
  const [showInstructionsModal, setShowInstructionsModal] = useState(false);
  const [showFullscreenSandbox, setShowFullscreenSandbox] = useState(false);

  // Simulator & Apple Show & Code states
  const [sandboxDevice, setSandboxDevice] = useState<"desktop" | "iphone" | "appleshow">("iphone");
  const [iphoneLandscape, setIphoneLandscape] = useState(false);
  const [iphoneTheme, setIphoneTheme] = useState<"dark" | "natural" | "white" | "desert">("dark");
  const [sandboxScale, setSandboxScale] = useState<number>(0.92);
  const [interactiveClicks, setInteractiveClicks] = useState(0);
  const [sparks, setSparks] = useState<{ id: number; x: number; y: number; color: string }[]>([]);

  const triggerSparks = () => {
    setInteractiveClicks(prev => prev + 1);
    const colors = ["#ffbd2e", "#ff5f56", "#27c93f", "#3a7bd5", "#a855f7", "#ec4899", "#10b981", "#fbbf24"];
    const newSparks = Array.from({ length: 18 }).map((_, idx) => ({
      id: Math.random() + idx,
      x: Math.random() * 240 - 120, // Scatter spread
      y: Math.random() * -180 - 30, // Spark upwards motion
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
    setSparks(newSparks);
    setTimeout(() => {
      setSparks([]);
    }, 1200);
  };

  // Text content modal state
  const [textTitle, setTextTitle] = useState("");
  const [textContent, setTextContent] = useState("");

  // GitHub Modal state
  const [githubFiles, setGithubFiles] = useState([
    { name: "agent", size: "76%", checked: true },
    { name: "assets", size: "<1%", checked: false },
    { name: "cron", size: "6%", checked: false },
    { name: "datagen-config-examples", size: "<1%", checked: false },
    { name: "docker", size: "<1%", checked: false },
    { name: "environments", size: "25%", checked: false },
    { name: "gateway", size: "173%", checked: false }
  ]);
  const [addedGithubFiles, setAddedGithubFiles] = useState<typeof githubFiles>([]);

  // Project files state
  const [projectFiles, setProjectFiles] = useState<CodeFile[]>(() => {
    if (project?.hasGithubFile) {
      return [
        {
          name: "index.html",
          size: "1.4 KB",
          language: "html",
          content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Beautiful Dashboard</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gradient-to-br from-indigo-900 via-slate-900 to-blue-950 text-white min-h-screen flex items-center justify-center p-6 font-sans">
    <div class="bg-slate-900/80 border border-slate-800 p-8 rounded-2xl shadow-2xl max-w-sm w-full text-center space-y-6 backdrop-blur-md">
        <div class="inline-flex p-3 bg-indigo-500/10 text-indigo-400 rounded-xl relative">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-xl bg-indigo-400 opacity-20 left-0 top-0"></span>
            <svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        </div>
        <div class="space-y-2">
            <h1 class="text-xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Applet Loaded Already!</h1>
            <p class="text-slate-400 text-sm leading-relaxed">Your custom dashboard is live in this sandbox. Customize this HTML file directly in the Project Detail View!</p>
        </div>
        <div class="pt-4">
            <button class="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2.5 px-4 rounded-xl font-medium transition-colors shadow-lg shadow-indigo-500/20">
                Explore Dashboard
            </button>
        </div>
    </div>
</body>
</html>`,
          isGithub: true
        },
        {
          name: "badge.svg",
          size: "620 B",
          language: "svg",
          content: `<svg width="180" height="180" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#4f46e5;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#06b6d4;stop-opacity:1" />
    </linearGradient>
  </defs>
  <circle cx="120" cy="120" r="100" fill="url(#grad1)" />
  <path d="M120 60L145 110L200 118L160 157L170 212L120 186L70 212L80 157L40 118L95 110L120 60Z" fill="white" />
  <circle cx="120" cy="120" r="10" fill="none" stroke="white" stroke-width="2" />
</svg>`,
          isGithub: true
        },
        {
          name: "utils.js",
          size: "420 B",
          language: "javascript",
          content: `export function formatBytes(bytes, decimals = 2) {
  if (!+bytes) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return \`\${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} \${sizes[i]}\`;
}`,
          isGithub: true
        }
      ];
    }
    return [];
  });

  const [selectedFile, setSelectedFile] = useState<CodeFile | null>(null);
  const [previewTab, setPreviewTab] = useState<"code" | "preview">("code");
  const [sidebarDevice, setSidebarDevice] = useState<"desktop" | "iphone">("iphone");
  const [copiedFile, setCopiedFile] = useState(false);

  const handleUpdateFileContent = (name: string, newContent: string) => {
    setProjectFiles(prev => prev.map(f => f.name === name ? { ...f, content: newContent, size: `${(newContent.length / 1024).toFixed(1)} KB` } : f));
    setSelectedFile(prev => prev && prev.name === name ? { ...prev, content: newContent, size: `${(newContent.length / 1024).toFixed(1)} KB` } : prev);
  };

  const hasFiles = project?.hasGithubFile || addedGithubFiles.length > 0 || projectFiles.length > 0;

  const toggleGithubFile = (index: number) => {
    const newFiles = [...githubFiles];
    newFiles[index].checked = !newFiles[index].checked;
    setGithubFiles(newFiles);
  };

  const handleAddGithubFiles = () => {
    const selected = githubFiles.filter(f => f.checked);
    setAddedGithubFiles(selected);
    
    // Also parse and populate these as actual previewable CodeFile objects
    const newAdded: CodeFile[] = selected.map(file => {
      let language = "javascript";
      let content = `// Source code for ${file.name}\n\nexport default function ${file.name.replace(/\.[a-zA-Z0-9]+$/, "")}() {\n  console.log("Hello from ${file.name}!");\n}`;
      if (file.name.endsWith(".html") || file.name.endsWith(".htm")) {
        language = "html";
        content = `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="utf-8">\n  <title>${file.name}</title>\n  <script src="https://cdn.tailwindcss.com"></script>\n</head>\n<body class="bg-slate-900 text-white font-sans p-6 flex flex-col items-center justify-center min-h-screen">\n  <h2 class="text-xl font-semibold mb-4 text-[#3a7bd5]">Rendered template: ${file.name}</h2>\n  <p class="text-slate-400">Successfully fetched and previewed from repository.</p>\n</body>\n</html>`;
      } else if (file.name.endsWith(".svg")) {
        language = "svg";
        content = `<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">\n  <circle cx="50" cy="50" r="40" fill="#3a7bd5" />\n  <text x="50" y="55" font-size="20" font-family="sans-serif" text-anchor="middle" fill="white">SVG</text>\n</svg>`;
      } else if (file.name.endsWith(".css")) {
        language = "css";
        content = `/* Stylesheet for ${file.name} */\nbody {\n  margin: 0;\n  padding: 0;\n}`;
      }
      
      return {
        name: file.name,
        size: file.size,
        content: content,
        language: language,
        isGithub: true
      };
    });

    setProjectFiles(prev => [...newAdded, ...prev]);
    setShowGithubModal(false);
  };

  const handleAddTextContent = () => {
    if (!textTitle.trim() || !textContent.trim()) return;

    // Detect language from title extension
    const extMatch = /\.([a-zA-Z0-9]+)$/.exec(textTitle.trim());
    let lang = "plaintext";
    if (extMatch) {
      const ext = extMatch[1].toLowerCase();
      if (ext === "html" || ext === "htm") lang = "html";
      else if (ext === "svg") lang = "svg";
      else if (ext === "js" || ext === "jsx") lang = "jsx";
      else if (ext === "ts" || ext === "tsx") lang = "typescript";
      else if (ext === "css") lang = "css";
      else if (ext === "json") lang = "json";
      else if (ext === "md") lang = "markdown";
    }

    const newFile: CodeFile = {
      name: textTitle,
      size: `${(textContent.length / 1024).toFixed(1)} KB`,
      content: textContent,
      language: lang,
      isGithub: false
    };

    setProjectFiles(prev => [newFile, ...prev]);
    setSelectedFile(newFile);
    setPreviewTab(lang === "html" || lang === "svg" ? "preview" : "code");
    
    // Reset form & close modal
    setTextTitle("");
    setTextContent("");
    setShowTextModal(false);
  };

  const handleCopyFileContent = () => {
    if (selectedFile) {
      navigator.clipboard.writeText(selectedFile.content);
      setCopiedFile(true);
      setTimeout(() => setCopiedFile(false), 2000);
    }
  };

  const addMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (addMenuRef.current && !addMenuRef.current.contains(event.target as Node)) {
        setShowAddMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex-1 flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden bg-[#141414] animate-in slide-in-from-right-4 duration-300">
      
      {/* Left Column (Main Chat Area) */}
      <div className="flex-1 flex flex-col p-6 lg:p-10 lg:overflow-y-auto scrollbar-hide max-w-4xl mx-auto w-full">
        <button
          onClick={onBack}
          className="text-[#888] hover:text-[#ccc] mb-6 flex items-center gap-2 text-[13px] transition-colors self-start"
        >
          <ArrowLeft size={14} /> Tous les projets
        </button>

        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="font-serif text-[32px] font-medium text-[#e8e6e3] leading-tight mb-2">
              {project?.name || "Projet sans nom"}
            </h1>
            <p className="text-[#888] text-[14px]">
              {project?.description || "ddbdbd"}
            </p>
          </div>
          <div className="flex items-center gap-2 text-[#888]">
            <button className="p-2 hover:bg-[#2a2a2a] rounded-lg transition-colors hover:text-[#ccc]">
              <MoreVertical size={18} />
            </button>
            <button className="p-2 hover:bg-[#2a2a2a] rounded-lg transition-colors hover:text-[#ccc]">
              <Star size={18} />
            </button>
          </div>
        </div>

        <div className="mb-4">
          <InputBox onSend={() => {}} />
        </div>

        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-[18px] p-8 text-center text-[#888] text-[14.5px] mt-2">
          Démarrez une conversation pour organiser les<br/>échanges et réutiliser les connaissances du projet.
        </div>
      </div>

      {/* Right Column (Sidebar panels) */}
      <div className="w-full lg:w-[340px] lg:shrink-0 xl:w-[420px] bg-[#141414] lg:overflow-y-auto scrollbar-hide py-6 lg:py-10 px-6 lg:pr-10 lg:pl-2">
        
        {/* Memory Panel */}
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-t-xl p-5 border-b-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-[#e8e6e3] text-[14px] font-medium">{t("memory")}</h3>
            <span className="flex items-center gap-1.5 px-2 py-1 rounded-md border border-[#333] text-[11px] text-[#888]">
              <Lock size={10} /> Vous uniquement
            </span>
          </div>
          <p className="text-[#666] text-[13px] leading-relaxed">
            La mémoire du projet s&apos;affichera ici après quelques conversations.
          </p>
        </div>
        <div className="h-px bg-[#2a2a2a] w-full"></div>

        {/* Instructions Panel */}
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] p-5 border-y-0 relative group">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-[#e8e6e3] text-[14px] font-medium">{t("instructions")}</h3>
            <button 
              onClick={() => setShowInstructionsModal(true)}
              className="text-[#888] hover:text-[#e8e6e3] transition-colors p-1"
            >
              <Plus size={16} />
            </button>
          </div>
          <p className="text-[#666] text-[13px] leading-relaxed">
            Ajouter des instructions pour personnaliser les réponses de Claude.
          </p>
        </div>
        <div className="h-px bg-[#2a2a2a] w-full"></div>

        {/* Files Panel */}
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-b-xl p-5 relative">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#e8e6e3] text-[14px] font-medium">{t("files")}</h3>
            
            <div className="relative" ref={addMenuRef}>
              <button 
                onClick={() => setShowAddMenu(!showAddMenu)}
                className="text-[#888] hover:text-[#e8e6e3] transition-colors p-1 relative z-10"
              >
                <Plus size={16} />
              </button>
              
              {showAddMenu && (
                <div className="absolute right-0 top-6 w-[240px] bg-[#212121] border border-[#333] rounded-xl shadow-2xl py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <button className="w-full flex items-center gap-3 px-3.5 py-2.5 text-[13.5px] text-[#ccc] hover:bg-[#2a2a2a] transition-colors">
                    <Paperclip size={15} className="text-[#888]" /> Importer depuis l&apos;appareil
                  </button>
                  <button 
                    onClick={() => { setShowAddMenu(false); setShowTextModal(true); }}
                    className="w-full flex items-center gap-3 px-3.5 py-2.5 text-[13.5px] text-[#ccc] hover:bg-[#2a2a2a] transition-colors"
                  >
                    <AlignLeft size={15} className="text-[#888]" /> Ajouter du contenu textuel
                  </button>
                  <button 
                    onClick={() => { setShowAddMenu(false); setShowGithubModal(true); }}
                    className="w-full flex items-center justify-between px-3.5 py-2.5 text-[13.5px] text-[#ccc] hover:bg-[#2a2a2a] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                       <Github size={15} className="text-[#888]" /> GitHub
                    </div>
                  </button>
                  <button className="w-full flex items-center justify-between px-3.5 py-2.5 text-[13.5px] text-[#ccc] hover:bg-[#2a2a2a] transition-colors">
                    <div className="flex items-center gap-3">
                       {/* SVG for Google Drive */}
                       <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#888]"><polygon points="12 2 2 22 22 22 12 2"></polygon></svg>
                       Drive
                    </div>
                    <ArrowLeft size={14} className="text-[#555] rotate-180" />
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* File item or Empty State */}
          {hasFiles ? (
             <div>
                <div className="w-full bg-[#333] rounded-full h-1.5 mb-2 overflow-hidden">
                  <div className="bg-[#3a7bd5] h-1.5 rounded-full" style={{ width: "76%" }}></div>
                </div>
                <div className="flex items-center justify-between mb-6">
                   <div className="text-[12px] text-[#888]">76 % de la capacité du projet utilisée</div>
                   <Info size={12} className="text-[#888]" />
                </div>
                
                <div className="flex flex-col gap-2 max-h-[420px] overflow-y-auto scrollbar-thin pr-1">
                  {projectFiles.map((file, i) => (
                    <button 
                      key={i} 
                      onClick={() => {
                        setSelectedFile(file);
                        setPreviewTab(file.language === "html" || file.language === "svg" ? "preview" : "code");
                      }}
                      className={`text-left border rounded-lg p-3 inline-flex flex-col gap-1 w-full transition-all group/file ${
                        selectedFile?.name === file.name 
                          ? 'border-[#3a7bd5] bg-[#22242b] ring-1 ring-[#3a7bd5]/20' 
                          : 'border-[#333] bg-[#212121] hover:border-[#444]'
                      }`}
                    >
                      <div className="text-[13px] text-[#ccc] font-medium truncate flex items-center justify-between w-full">
                        <span className="truncate group-hover/file:text-white transition-colors">{file.name}</span>
                        <span className="text-[9px] text-[#666] uppercase bg-black/40 px-1 py-0.5 rounded ml-1 font-mono">{file.language}</span>
                      </div>
                      <div className="text-[11px] text-[#888]">{file.size}</div>
                      <div className="flex items-center gap-1.5 mt-1 bg-[#141414] px-2 py-0.5 rounded-md self-start text-[#aaa] text-[10px] border border-[#333] font-mono">
                         <Github size={10} /> {file.isGithub ? "GITHUB" : "FILE"}
                      </div>
                    </button>
                  ))}
                </div>
             </div>
          ) : (
            <div className="bg-[#212121] rounded-xl border border-[#2a2a2a] p-6 flex flex-col items-center justify-center text-center">
              <div className="opacity-60 mb-3 flex relative">
                <div className="w-10 h-12 bg-[#2a2a2a] rounded-md border border-[#444] absolute -left-6 -rotate-12"></div>
                <div className="w-10 h-12 bg-[#2a2a2a] rounded-md border border-[#444] absolute -right-6 rotate-12"></div>
                <div className="w-10 h-12 bg-[#333] rounded-md border border-[#555] relative z-10 flex items-center justify-center">
                   <Plus size={14} className="text-[#888]" />
                </div>
              </div>
              <p className="text-[#666] text-[12px] max-w-[200px]">
                Ajoutez des PDF, des documents ou autres textes à référencer dans ce projet.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* File Preview Pane (Third Column, mirrors Artifact panel) */}
      {selectedFile && (
        <>
          {/* Mobile overlay backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 xl:hidden animate-in fade-in duration-300"
            onClick={() => setSelectedFile(null)}
          />
          <div className="w-full sm:w-[500px] md:w-[600px] xl:w-[650px] fixed xl:relative inset-y-0 right-0 z-[60] xl:z-40 border-l border-[#2a2a2a] flex flex-col bg-[#141414] animate-in slide-in-from-right-3 duration-300 shadow-2xl shrink-0">
          <div className="flex items-center px-4 py-2 border-b border-[#2a2a2a] bg-[#1a1a1a]">
            <div className="flex gap-2">
              <button 
                onClick={() => setPreviewTab('preview')}
                className={`px-3.5 py-1.5 text-[13px] rounded-md transition-colors font-medium ${previewTab === 'preview' ? 'bg-[#2a2a2a] text-[#ccc] border border-[#333] shadow-sm' : 'text-[#888] hover:text-[#ccc] hover:bg-[#222]'}`}
              >
                {t("preview") || "Aperçu"}
              </button>
              <button 
                onClick={() => setPreviewTab('code')}
                className={`px-3.5 py-1.5 text-[13px] rounded-md transition-colors font-medium ${previewTab === 'code' ? 'bg-[#2a2a2a] text-[#ccc] border border-[#333] shadow-sm' : 'text-[#888] hover:text-[#ccc] hover:bg-[#222]'}`}
              >
                {t("code") || "Code"}
              </button>
            </div>

            <div className="flex-1" />

            <div className="flex items-center gap-1.5">
              {/* Launcher/Fullscreen Button */}
              {(selectedFile.language === 'html' || selectedFile.language === 'svg') && (
                <button 
                  onClick={() => setShowFullscreenSandbox(true)}
                  className="text-[#3a7bd5] hover:text-white bg-[#3a7bd5]/10 hover:bg-[#3a7bd5] rounded-md px-2.5 py-1.5 text-[12px] flex items-center gap-1.5 transition-all border border-[#3a7bd5]/20 font-medium"
                  title="Lancer le site dans un bac à sable en plein écran"
                >
                  <Maximize2 size={13} />
                  <span>Bac à sable</span>
                </button>
              )}

              {/* Download File */}
              <button 
                onClick={() => {
                  const blob = new Blob([selectedFile.content], { type: "text/plain;charset=utf-8" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = selectedFile.name;
                  a.click();
                }}
                className="text-[#888] hover:text-[#ccc] hover:bg-[#2a2a2a] rounded-md px-2 py-1.5 text-[12px] flex items-center gap-1 transition-colors"
                title="Télécharger ce fichier"
              >
                <Download size={13} />
              </button>

              <button 
                onClick={handleCopyFileContent}
                className="text-[#888] hover:text-[#ccc] hover:bg-[#2a2a2a] rounded-md px-2 py-1.5 text-[12px] flex items-center gap-1 transition-colors"
              >
                {copiedFile ? <Check size={13} className="text-green-500" /> : <Copy size={13} />}
                <span>{copiedFile ? (t("copied") || "Copié") : (t("copy") || "Copier")}</span>
              </button>
            </div>

            <div className="w-px h-4 bg-[#333] mx-2"></div>

            <button
              onClick={() => setSelectedFile(null)}
              className="text-[#888] hover:text-[#ccc] hover:bg-[#2a2a2a] rounded-md transition-colors p-1.5"
            >
              <X size={16} />
            </button>
          </div>
          
          <div className="bg-[#1e1e1e] flex items-center justify-between px-4 py-2 border-b border-[#242424] shrink-0 select-none">
            <span className="text-[12px] text-[#888] font-mono truncate mr-2">
              {selectedFile.name}
            </span>
            
            <div className="flex items-center gap-3">
              {/* Sidebar Device select */}
              {previewTab === 'preview' && (selectedFile.language === 'html' || selectedFile.language === 'svg') && (
                <div className="flex items-center bg-[#111] border border-[#333] p-0.5 rounded-md gap-0.5 shrink-0">
                  <button 
                    onClick={() => setSidebarDevice("desktop")}
                    className={`p-1 rounded text-[10px] font-semibold flex items-center gap-1 transition-all ${sidebarDevice === 'desktop' ? 'bg-[#333] text-white' : 'text-[#666] hover:text-[#999]'}`}
                    title="Aperçu Desktop complet"
                  >
                    <Laptop size={11} />
                  </button>
                  <button 
                    onClick={() => setSidebarDevice("iphone")}
                    className={`p-1 rounded text-[10px] font-semibold flex items-center gap-1 transition-all ${sidebarDevice === 'iphone' ? 'bg-[#3a7bd5] text-white' : 'text-[#666] hover:text-[#999]'}`}
                    title="Simulateur iPhone"
                  >
                    <Smartphone size={11} />
                  </button>
                </div>
              )}
              <span className="text-[10px] text-emerald-500 font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                En direct
              </span>
            </div>
          </div>
          
          <div className="flex-1 p-0 overflow-hidden relative">
            {previewTab === 'code' ? (
              <div className="w-full h-full flex flex-col bg-[#1e1e1e]">
                <div className="flex-1 flex overflow-hidden">
                  <div className="w-10 bg-[#1a1a1a] select-none text-right pr-2 py-5 text-[11px] font-mono text-[#555] flex flex-col gap-0.5 leading-6 border-r border-[#242424]/60 overflow-hidden shrink-0">
                    {Array.from({ length: Math.max(15, (selectedFile.content.match(/\n/g) || []).length + 1) }).map((_, idx) => (
                      <span key={idx}>{idx + 1}</span>
                    ))}
                  </div>
                  <textarea
                    value={selectedFile.content}
                    onChange={(e) => handleUpdateFileContent(selectedFile.name, e.target.value)}
                    className="flex-1 bg-transparent text-[#d4d4d4] p-4 text-[13px] font-mono whitespace-pre outline-none focus:ring-0 resize-none scrollbar-thin leading-6 w-full h-full"
                    spellCheck="false"
                  />
                </div>
              </div>
            ) : (
              <div className="w-full h-full bg-[#07090d] relative flex items-center justify-center p-4 overflow-auto select-none">
                {selectedFile.language === 'html' || selectedFile.language === 'svg' ? (
                  sidebarDevice === 'iphone' ? (
                    /* Scaled iPhone simulator frame inside details sidebar panel */
                    <div 
                      className="transition-all duration-300 relative shadow-[0_20px_50px_rgba(0,0,0,0.85)] shrink-0"
                      style={{
                        transform: 'scale(0.68)',
                        transformOrigin: 'center center',
                        width: '340px',
                        height: '670px',
                      }}
                    >
                      {/* Case buttons */}
                      <div className="absolute bg-neutral-600 left-[-3px] top-[75px] w-[3px] h-[24px] rounded-l-sm" />
                      <div className="absolute bg-neutral-600 left-[-3px] top-[115px] w-[3px] h-[45px] rounded-l-sm" />
                      <div className="absolute bg-neutral-600 left-[-3px] top-[175px] w-[3px] h-[45px] rounded-l-sm" />
                      <div className="absolute bg-neutral-600 right-[-3px] top-[135px] w-[3px] h-[65px] rounded-r-sm" />

                      {/* Phone exterior frame */}
                      <div className="w-full h-full rounded-[45px] border-8 border-[#1c1d1f] bg-black relative flex flex-col overflow-hidden">
                        <div className="absolute inset-0 border border-white/5 rounded-[36px] pointer-events-none z-10" />

                        {/* Screen */}
                        <div className="flex-1 bg-white relative flex flex-col overflow-hidden rounded-[36px]">
                          {/* Top Status Bar */}
                          <div className="h-8 px-5 bg-black text-white flex items-center justify-between text-[11px] font-semibold shrink-0 select-none z-20">
                            <span className="font-mono text-white/90">09:41</span>
                            <div className="absolute left-1/2 -translate-x-1/2 top-1.5 w-[90px] h-[18px] bg-black rounded-full flex items-center justify-center pointer-events-none">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            </div>
                            <div className="flex items-center gap-1.5 text-white/80">
                              <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24"><path d="M12 21l-12-12c5.52-5.52 14.48-5.52 20 0l-8 12zm0-18C8.55 3 5.4 4.3 3 6.43l9 9 9-9C18.6 4.3 15.45 3 12 3z" /></svg>
                              <div className="w-3.5 h-2 border border-white/60 rounded-[2px] p-0.5 flex items-center"><div className="bg-emerald-400 h-full w-[95%] rounded-[1px]" /></div>
                            </div>
                          </div>

                          {/* App Web view Content iframe */}
                          <div className="flex-1 relative bg-white">
                            <iframe 
                              className="w-full h-full border-none bg-white font-sans text-black"
                              srcDoc={selectedFile.content}
                              title="Code Preview Mobile"
                              sandbox="allow-scripts"
                            />
                          </div>
                          
                          {/* ios home slider */}
                          <div className="absolute bottom-1 w-[100px] h-[3.5px] bg-[#1a1a1a]/80 left-1/2 -translate-x-1/2 rounded-full pointer-events-none" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Classic Desktop iframe view */
                    <iframe 
                      className="w-full h-full border-none bg-white font-sans text-black"
                      srcDoc={selectedFile.content}
                      title="Code Preview"
                      sandbox="allow-scripts"
                    />
                  )
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-black p-8 bg-[#1e1e1e] relative">
                    <div className="w-full h-full border-2 border-dashed border-[#333] rounded-3xl flex flex-col items-center justify-center bg-[#1a1a1a]/55 p-6">
                      <div className="w-16 h-16 bg-blue-500/10 text-[#3a7bd5] rounded-2xl flex items-center justify-center mb-6 border border-[#3a7bd5]/20">
                        <Grid size={32} />
                      </div>
                      <h3 className="text-xl font-bold mb-3 tracking-tight text-[#e8e6e3] text-center">
                        {selectedFile.name}
                      </h3>
                      <p className="text-[#888] text-center max-w-sm mb-6 text-sm leading-relaxed">
                        {t("interactive_not_available", { lang: selectedFile.language })}
                      </p>
                      <button 
                        onClick={() => setPreviewTab('code')}
                        className="bg-[#2a2a2a] text-[#ccc] border border-[#333] px-5 py-2.5 rounded-xl font-medium shadow-md hover:bg-[#333] transition-colors"
                      >
                        {t("voir_le_code")}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </>
    )}

      {/* Modals */}
      {showTextModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#1e1e1e] border border-[#333] rounded-[18px] w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#2a2a2a]">
              <h2 className="text-[18px] font-medium text-[#e8e6e3]">{t("add_text_content")}</h2>
              <button onClick={() => setShowTextModal(false)} className="text-[#888] hover:text-[#ccc] transition-colors p-1">
                <X size={18} />
              </button>
            </div>
            
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-[13px] text-[#ccc] mb-1.5">Titre <span className="text-[#da7756]">*</span></label>
                <input 
                  type="text" 
                  value={textTitle}
                  onChange={(e) => setTextTitle(e.target.value)}
                  placeholder={t("name_content")} 
                  className="w-full bg-transparent border border-[#3a7bd5] rounded-xl px-3.5 py-2.5 text-[#e8e6e3] text-[14px] outline-none shadow-[0_0_0_1px_rgba(58,123,213,0.3)] transition-all"
                />
              </div>
              
              <div>
                <label className="block text-[13px] text-[#e8e6e3] mb-1.5">Contenu <span className="text-[#da7756]">*</span></label>
                <textarea 
                  value={textContent}
                  onChange={(e) => setTextContent(e.target.value)}
                  placeholder={t("type_paste_content")} 
                  className="w-full bg-[#1e1e1e] border border-[#333] rounded-xl px-3.5 py-3 text-[#e8e6e3] text-[14px] outline-none focus:border-[#555] transition-colors min-h-[220px] resize-none"
                />
              </div>
            </div>

            <div className="px-6 py-4 border-t border-[#2a2a2a] flex justify-end gap-3 bg-[#1a1a1a]">
              <button 
                onClick={() => {
                  setShowTextModal(false);
                  setTextTitle("");
                  setTextContent("");
                }}
                className="px-4 py-2 border border-[#444] rounded-lg text-[#ccc] text-[13.5px] hover:bg-[#222] transition-colors"
              >
                Annuler
              </button>
              <button 
                onClick={handleAddTextContent}
                disabled={!textTitle.trim() || !textContent.trim()}
                className="bg-white hover:bg-[#e8e6e3] disabled:opacity-50 text-black px-4 py-2 rounded-lg text-[13.5px] font-medium transition-colors"
              >
                Ajouter du contenu
              </button>
            </div>
          </div>
        </div>
      )}

      {showInstructionsModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#1e1e1e] border border-[#333] rounded-[18px] w-full max-w-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-6">
              <h2 className="text-[20px] font-medium text-[#e8e6e3] mb-2">Définir les instructions du projet</h2>
              <p className="text-[13.5px] text-[#888] mb-6">
                Fournissez à Claude des instructions et des informations pertinentes pour les conversations dans {project?.name || 'ce projet'}. Cela fonctionnera conjointement avec vos instructions du profil et le style sélectionné dans un chat.
              </p>
              
              <textarea 
                placeholder="Réfléchir étape par étape et démontrer le raisonnement pour les problèmes complexes. Utiliser des exemples concrets." 
                className="w-full bg-[#1e1e1e] border border-[#3a7bd5] rounded-xl px-4 py-3 text-[#e8e6e3] text-[14px] outline-none shadow-[0_0_0_1px_rgba(58,123,213,0.2)] transition-all min-h-[300px] resize-none"
              />
            </div>

            <div className="px-6 py-4 border-t border-[#2a2a2a] flex justify-end gap-3 bg-[#1a1a1a]">
              <button 
                onClick={() => setShowInstructionsModal(false)}
                className="px-4 py-2 border border-[#444] rounded-lg text-[#ccc] text-[13.5px] hover:bg-[#222] transition-colors"
              >
                Annuler
              </button>
              <button className="bg-[#aaa] text-[#111] px-4 py-2 rounded-lg text-[13.5px] font-medium transition-colors opacity-80">
                Enregistrer les instructions
              </button>
            </div>
          </div>
        </div>
      )}

      {showGithubModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#1e1e1e] border border-[#333] rounded-[18px] w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col h-[600px]">
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#2a2a2a]">
              <div>
                 <h2 className="text-[18px] font-medium text-[#e8e6e3]">Add content from GitHub</h2>
                 <p className="text-[13px] text-[#888] mt-1">Select the files you would like to add to this project</p>
              </div>
              <button onClick={() => setShowGithubModal(false)} className="text-[#888] hover:text-[#ccc] border border-[#444] p-1.5 rounded-lg transition-colors">
                <X size={16} />
              </button>
            </div>
            
            <div className="p-4 flex-1 overflow-hidden flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex-1 bg-[#141414] border border-[#333] rounded-lg flex items-center px-3 py-2">
                   <Github size={16} className="text-[#ccc] mr-2" />
                   <span className="text-[#ccc] text-[13.5px]">hackerxj2010 / <span className="text-[#fff]">hermes-agent</span></span>
                   <ChevronDown size={14} className="text-[#555] ml-2" />
                </div>
                <button className="p-2 border border-[#333] rounded-lg hover:bg-[#2a2a2a] text-[#888]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                </button>
                <button className="p-2 border border-[#333] rounded-lg hover:bg-[#2a2a2a] text-[#888]">
                   <Search size={16} />
                </button>
                <button 
                  onClick={handleAddGithubFiles}
                  className="bg-white hover:bg-[#e8e6e3] text-black px-4 py-2 rounded-lg text-[13px] font-medium ml-4 transition-colors"
                >
                  Ajouter des fichiers
                </button>
              </div>

              <div className="flex-1 border border-[#333] rounded-lg overflow-y-auto bg-[#1a1a1a]">
                <div 
                  className="px-4 py-3 border-b border-[#2a2a2a] flex items-center gap-3 cursor-pointer"
                  onClick={() => {
                    const allChecked = githubFiles.every(f => f.checked);
                    setGithubFiles(githubFiles.map(f => ({ ...f, checked: !allChecked })));
                  }}
                >
                   <div className={`w-4 h-4 rounded border flex items-center justify-center ${githubFiles.every(f => f.checked) ? 'border-[#3a7bd5] bg-[#3a7bd5]' : githubFiles.some(f => f.checked) ? 'border-[#3a7bd5] bg-[#3a7bd5]' : 'border-[#555] bg-transparent'}`}>
                     {githubFiles.some(f => f.checked) && (
                       githubFiles.every(f => f.checked) 
                         ? <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                         : <div className="w-2 h-2 bg-black rounded-sm"></div>
                     )}
                   </div>
                   <span className="text-[#e8e6e3] text-[14px]">hermes-agent</span>
                </div>
                
                {githubFiles.map((item, i) => (
                  <div 
                    key={i} 
                    className={`px-4 py-3 border-b border-[#2a2a2a] flex items-center justify-between hover:bg-[#222] cursor-pointer ${item.checked ? 'bg-[#1e2330]' : ''}`}
                    onClick={() => toggleGithubFile(i)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${item.checked ? 'border-[#3a7bd5] bg-[#3a7bd5]' : 'border-[#555] bg-transparent'}`}>
                        {item.checked && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                      </div>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-[#3a7bd5]"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
                      <span className="text-[#ccc] text-[13px]">{item.name}</span>
                    </div>
                    <span className="text-[#666] text-[13px]">{item.size}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {showFullscreenSandbox && selectedFile && (
        <div className="fixed inset-0 bg-[#0f1115] z-[200] flex flex-col font-sans select-none animate-in fade-in zoom-in-95 duration-200">
          {/* Top Bar Simulated Chrome */}
          <div className="bg-[#16191f] h-12 border-b border-[#262b35] flex items-center px-4 justify-between shrink-0">
            {/* Left Hand Dots */}
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setShowFullscreenSandbox(false)}
                className="w-3 h-3 rounded-full bg-[#ff5f56] hover:brightness-110 active:scale-95 transition-all" 
                title="Fermer le bac à sable"
              />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
              <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
              <span className="text-[12px] text-[#8e9aa8] font-mono ml-4 truncate max-w-[150px] md:max-w-none">
                Claude Interactive Workspace {"—"} Sandbox Simulator
              </span>
            </div>

            {/* Address Bar */}
            <div className="hidden md:flex items-center gap-2 bg-[#0d0f12] border border-[#222730] px-3.5 py-1.5 rounded-lg text-xs font-mono w-[380px] lg:w-[480px] text-[#6b7b90] truncate justify-between">
              <span className="truncate">https://claude.build/sandbox/{selectedFile.name}</span>
              <span className="text-[10px] text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded">SSL sécurisé</span>
            </div>

            {/* Close Button */}
            <button 
              onClick={() => setShowFullscreenSandbox(false)}
              className="text-[#8e9aa8] hover:text-white hover:bg-[#222730] p-1.5 rounded-lg transition-colors border border-transparent hover:border-[#2a303c]"
            >
              <X size={16} />
            </button>
          </div>

          {/* Tab bar for Files */}
          <div className="bg-[#12141c] border-b border-[#212631] px-4 py-1.5 flex items-center justify-between shrink-0 overflow-x-auto scrollbar-none gap-4 select-none">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
              {projectFiles.map(file => (
                <button
                  key={file.name}
                  onClick={() => {
                    setSelectedFile(file);
                  }}
                  className={`px-3 py-1.5 text-xs rounded-md font-mono flex items-center gap-1.5 transition-all shrink-0 ${
                    selectedFile.name === file.name 
                      ? 'bg-[#1d222e] text-blue-400 border border-[#3a7bd5]/30' 
                      : 'text-[#616c7c] hover:bg-[#181d28]/60 hover:text-[#e2e8f0]'
                  }`}
                >
                  <Code size={11} className={selectedFile.name === file.name ? "text-blue-400" : "text-[#616c7c]"} />
                  <span>{file.name}</span>
                  <span className="text-[9px] opacity-40 uppercase bg-black/40 px-1 rounded">{file.language}</span>
                </button>
              ))}
            </div>

            {/* Premium Selector device mode */}
            <div className="flex items-center gap-1 bg-[#090a0f] border border-[#212631] p-1 rounded-lg shrink-0">
               <button
                 onClick={() => setSandboxDevice("desktop")}
                 className={`p-1 px-3 rounded-md text-[11px] font-medium transition-all flex items-center gap-1.5 ${sandboxDevice === 'desktop' ? 'bg-[#2b3548] text-white border border-[#333d52]' : 'text-[#8e9aa8] hover:text-white'}`}
                 title="Aperçu classique plein écran de bureau"
               >
                 <Laptop size={12} />
                 <span className="hidden sm:inline">Bureau</span>
               </button>

               <button
                 onClick={() => setSandboxDevice("iphone")}
                 className={`p-1 px-3 rounded-md text-[11px] font-semibold transition-all flex items-center gap-1.5 ${sandboxDevice === 'iphone' ? 'bg-[#3a7bd5] text-white border border-[#3a7bd5]/40 shadow-sm' : 'text-[#8e9aa8] hover:text-white'}`}
                 title="Simulateur iPhone interactif"
               >
                 <Smartphone size={12} />
                 <span>iPhone Sim</span>
               </button>

               <button
                 onClick={() => setSandboxDevice("appleshow")}
                 className={`p-1 px-3 rounded-md text-[11px] font-semibold transition-all flex items-center gap-1.5 ${sandboxDevice === 'appleshow' ? 'bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-white shadow-md border border-amber-500/20' : 'text-[#8e9aa8] hover:text-white'}`}
                 title="Mode Presentation de démonstration Apple"
               >
                 <Tv size={12} className="text-amber-400 animate-pulse" />
                 <span className="flex items-center gap-0.5"><Sparkles size={11} className="text-amber-300" /> Apple Presentation</span>
               </button>
            </div>
          </div>

          {/* Double split workspace panel */}
          <div className="flex-1 flex min-h-0 bg-[#0d0f12] relative overflow-hidden">
            
            {/* Background Particles Container for Apple Sparkles Showcase */}
            {sparks.length > 0 && (
              <div className="absolute inset-0 pointer-events-none z-[190] overflow-hidden">
                {sparks.map(s => (
                  <div 
                    key={s.id}
                    className="absolute rounded-full animate-bounce flex items-center justify-center pointer-events-none"
                    style={{
                      left: `calc(50% + ${s.x}px)`,
                      top: `calc(50% + ${s.y}px)`,
                      width: "12px",
                      height: "12px",
                      backgroundColor: s.color,
                      boxShadow: `0 0 16px 4px ${s.color}`,
                      opacity: 0.9,
                      transform: 'scale(1.5)',
                      transition: "all 1.1s cubic-bezier(0.25, 1, 0.5, 1)"
                    }}
                  >
                    <Sparkles size={10} className="text-white scale-75" />
                  </div>
                ))}
              </div>
            )}

            {/* DESIGN PATHWAY 1: STANDARD SIDE-BY-SIDE EDITOR & INTERACTIVE PREVIEWS */}
            {sandboxDevice !== "appleshow" ? (
              <>
                {/* Editor Half */}
                <div className="w-[45%] flex flex-col border-r border-[#212631] min-w-[360px] shrink-0">
                  <div className="bg-[#151922] px-4 py-2 border-b border-[#212631] flex items-center justify-between text-xs text-[#6e7d95] font-mono">
                    <span className="flex items-center gap-1.5">
                      <Code size={12} className="text-blue-400" />
                      <span>Éditeur de Code Source</span>
                    </span>
                    <span className="text-emerald-500 animate-pulse flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      Modifié en temps réel
                    </span>
                  </div>
                  <div className="flex-1 flex overflow-hidden">
                    {/* Visual Line Numbers */}
                    <div className="w-12 bg-[#12151e] select-none text-right pr-3.5 py-5 text-[11px] font-mono text-[#434d5d] flex flex-col gap-0.5 leading-6 border-r border-[#212631]/60 overflow-hidden shrink-0">
                      {Array.from({ length: Math.max(30, (selectedFile.content.match(/\n/g) || []).length + 1) }).map((_, idx) => (
                        <span key={idx}>{idx + 1}</span>
                      ))}
                    </div>
                    {/* Content text area */}
                    <textarea
                      value={selectedFile.content}
                      onChange={(e) => handleUpdateFileContent(selectedFile.name, e.target.value)}
                      className="flex-1 bg-transparent text-[#e2e8f0] p-5 text-[13.5px] font-mono whitespace-pre outline-none focus:ring-0 resize-none scrollbar-thin leading-6 w-full h-full select-text"
                      spellCheck="false"
                    />
                  </div>
                </div>

                {/* Live Preview Display Half */}
                <div className="flex-1 flex flex-col min-w-0 bg-[#07090d]">
                  {sandboxDevice === "desktop" ? (
                    /* Classic Desktop Chrome */
                    <div className="w-full h-full flex flex-col">
                      <div className="bg-[#151922] px-4 py-2 border-b border-[#212631] flex items-center justify-between text-xs text-[#6e7d95] font-mono shrink-0 select-none">
                        <span>Navigateur d&apos;Aperçu Interactif (Bureau)</span>
                        <span className="text-blue-400 font-semibold">Bac à Sable Sécurisé</span>
                      </div>
                      <div className="flex-1 relative bg-white">
                        {selectedFile.language === 'html' || selectedFile.language === 'svg' ? (
                          <iframe 
                            className="w-full h-full border-none bg-white font-sans text-black"
                            srcDoc={selectedFile.content}
                            title="Fullscreen Live Preview"
                            sandbox="allow-scripts"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center text-black p-8 bg-[#1e1e1e] relative">
                            <div className="w-full h-full border-2 border-dashed border-[#222730] rounded-3xl flex flex-col items-center justify-center bg-[#151922] p-6">
                              <div className="w-16 h-16 bg-blue-500/10 text-[#3a7bd5] rounded-2xl flex items-center justify-center mb-6 border border-[#3a7bd5]/20">
                                <Grid size={32} />
                              </div>
                              <h3 className="text-xl font-bold mb-3 tracking-tight text-[#e2e8f0] text-center">
                                {t("preview")} - {selectedFile.name}
                              </h3>
                              <p className="text-[#888] text-center max-w-sm mb-6 text-sm leading-relaxed">
                                {t("preview_only_html_svg")}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    /* High Fidelity Ported iPhone Simulator Sandbox */
                    <div className="w-full h-full flex flex-col relative select-none">
                      {/* Top control sub-bar */}
                      <div className="bg-[#151922] px-4 py-2 border-b border-[#212631] flex flex-wrap items-center justify-between text-xs text-[#6e7d95] shrink-0 select-none gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-white">iPhone 16 Pro Max (Live Simulator)</span>
                        </div>
                        <div className="flex items-center gap-3">
                          {/* Tilt control */}
                          <button 
                            onClick={() => setIphoneLandscape(!iphoneLandscape)}
                            className="flex items-center gap-1.5 px-2 py-1 rounded bg-[#1e232f] hover:bg-[#2e3648] text-white hover:text-blue-400 border border-[#2f3747] transition-all font-mono"
                            title="Alterner Orientation"
                          >
                            <RotateCw size={12} className={iphoneLandscape ? "rotate-90 text-blue-400 transition-transform" : "transition-transform"} />
                            <span>{iphoneLandscape ? "Paysage" : "Portrait"}</span>
                          </button>

                          {/* Finish/Color theme */}
                          <div className="flex items-center gap-1 bg-black/40 p-1 rounded border border-[#232935]">
                            {(["dark", "natural", "white", "desert"] as const).map(theme => (
                              <button
                                key={theme}
                                onClick={() => setIphoneTheme(theme)}
                                className={`w-3 h-3 rounded-full transition-all ${iphoneTheme === theme ? 'ring-2 ring-blue-500 scale-110' : 'opacity-60 hover:opacity-100'}`}
                                style={{
                                  backgroundColor: 
                                    theme === 'dark' ? '#1c1d1f' : 
                                    theme === 'natural' ? '#8a857b' : 
                                    theme === 'white' ? '#f1f0ec' : '#d1bdad'
                                }}
                                title={`Titanium ${theme}`}
                              />
                            ))}
                          </div>

                          {/* Scale size */}
                          <div className="flex items-center gap-1">
                             <input 
                               type="range" 
                               min="0.5" 
                               max="1.4" 
                               step="0.05" 
                               value={sandboxScale}
                               onChange={(e) => setSandboxScale(parseFloat(e.target.value))}
                               className="w-14 accent-blue-500 h-1 cursor-col-resize"
                             />
                             <span className="font-mono text-[9px] w-8 text-right">{Math.round(sandboxScale * 100)}%</span>
                          </div>
                        </div>
                      </div>

                      {/* Simulator Frame Area with Scaler */}
                      <div className="flex-1 overflow-auto flex items-center justify-center p-6 bg-[#090b0e] relative">
                         {/* Golden Glow Accent */}
                         <div className="absolute right-0 top-0 w-80 h-80 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
                         <div className="absolute left-0 bottom-0 w-80 h-80 bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />

                         <div 
                           className="transition-all duration-300 relative shadow-[0_25px_80px_-15px_rgba(0,0,0,0.95)] shrink-0 flex items-center justify-center"
                           style={{
                             transform: `scale(${sandboxScale})`,
                             transformOrigin: 'center center',
                             width: iphoneLandscape ? '730px' : '345px',
                             height: iphoneLandscape ? '345px' : '730px',
                           }}
                         >
                            {/* Case buttons */}
                            <div className={`absolute bg-[#666] transition-all ${iphoneLandscape ? 'top-[-3px] left-[75px] w-[24px] h-[3px] rounded-t-sm' : 'left-[-3px] top-[75px] w-[3px] h-[24px] rounded-l-sm'}`} />
                            <div className={`absolute bg-[#666] transition-all ${iphoneLandscape ? 'top-[-3px] left-[115px] w-[45px] h-[3px] rounded-t-sm' : 'left-[-3px] top-[115px] w-[3px] h-[45px] rounded-l-sm'}`} />
                            <div className={`absolute bg-[#666] transition-all ${iphoneLandscape ? 'top-[-3px] left-[175px] w-[45px] h-[3px] rounded-t-sm' : 'left-[-3px] top-[175px] w-[3px] h-[45px] rounded-l-sm'}`} />
                            <div className={`absolute bg-[#666] transition-all ${iphoneLandscape ? 'bottom-[-3px] left-[135px] w-[65px] h-[3px] rounded-b-sm' : 'right-[-3px] top-[135px] w-[3px] h-[65px] rounded-r-sm'}`} />

                            {/* Bezel frame container */}
                            <div 
                              className="w-full h-full rounded-[48px] border-[10px] bg-black relative flex flex-col overflow-hidden select-none"
                              style={{
                                borderColor: 
                                  iphoneTheme === 'dark' ? '#1c1d1f' : 
                                  iphoneTheme === 'natural' ? '#8a857b' : 
                                  iphoneTheme === 'white' ? '#f1f0ec' : '#d1bdad'
                              }}
                            >
                              {/* Inner bezel highlight ring */}
                              <div className="absolute inset-0 border border-white/5 rounded-[38px] pointer-events-none z-10" />

                              {/* Screen display core */}
                              <div className="flex-1 bg-white relative flex flex-col overflow-hidden rounded-[38px]">
                                 
                                 {/* iOS top status bar */}
                                 <div className={`h-8 px-5 bg-black text-white items-center justify-between text-[11px] font-semibold shrink-0 select-none z-20 ${iphoneLandscape ? 'hidden' : 'flex'}`}>
                                    <span className="font-mono text-white/90">14:02</span>
                                    {/* Dynamic Island Capsule */}
                                    <div className="absolute left-1/2 -translate-x-1/2 top-1.5 w-[90px] h-[20px] bg-black rounded-full flex items-center justify-end px-2 gap-1 z-30 transition-all group/island hover:h-[30px] hover:w-[120px] duration-300">
                                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                      <span className="text-[7.5px] text-emerald-400 font-mono hidden group-hover/island:inline">Actif</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-white/80">
                                      <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M12 21l-12-12c5.52-5.52 14.48-5.52 20 0l-8 12zm0-18C8.55 3 5.4 4.3 3 6.43l9 9 9-9C18.6 4.3 15.45 3 12 3z" /></svg>
                                      <div className="w-4 h-2.5 border border-white/60 rounded-[3px] p-0.5 flex items-center"><div className="bg-emerald-400 h-full w-[95%] rounded-[1px]" /></div>
                                    </div>
                                 </div>

                                 {/* Web App Frame */}
                                 <div className="flex-1 relative bg-white overflow-hidden">
                                   {selectedFile.language === 'html' || selectedFile.language === 'svg' ? (
                                     <iframe 
                                       className="w-full h-full border-none bg-white select-text font-sans text-black"
                                       srcDoc={selectedFile.content}
                                       title="iPhone Embed Simulator"
                                       sandbox="allow-scripts"
                                     />
                                   ) : (
                                     <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-[#1a1a1a] text-white select-none">
                                        <Layers size={24} className="text-blue-400 mb-2" />
                                        <span className="text-xs font-mono truncate max-w-full px-4">{selectedFile.name}</span>
                                        <p className="text-[10px] text-neutral-400 mt-1 max-w-[190px] text-center">Cette vue requiert un site complet de format HTML.</p>
                                     </div>
                                   )}
                                 </div>

                                 {/* iOS Home Indicator bottom line bar */}
                                 <div className={`absolute bottom-1.5 left-1/2 -translate-x-1/2 w-[110px] h-[4px] bg-[#222]/80 rounded-full z-20 pointer-events-none ${iphoneLandscape ? 'hidden' : 'block'}`} />
                              </div>
                            </div>
                         </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              /* DESIGN PATHWAY 2: PREMIUM THEATRICS APPLE PRESENTATION SHOWROOM */
              <div className="flex-1 flex flex-col lg:flex-row bg-[#08090d] select-none text-white overflow-y-auto">
                 {/* Left Half: iPhone Mockup Float Showcase */}
                 <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gradient-to-br from-[#10121a] to-[#040507] border-b lg:border-b-0 lg:border-r border-[#212631] relative min-h-[500px]">
                    <div className="absolute top-4 left-6 flex items-center gap-2">
                       <span className="text-[10px] uppercase tracking-widest text-[#6e7d95] font-semibold flex items-center gap-1">
                         <Sparkles size={11} className="text-amber-400" /> Apple Presentation Showroom
                       </span>
                    </div>

                    {/* Stage Shadow Ground Circle */}
                    <div className="absolute bottom-10 w-[70%] h-10 bg-black/60 blur-3xl rounded-full scale-y-50 pointer-events-none" />

                    <div 
                      className="relative transition-all duration-500 scale-[0.88] hover:scale-95 duration-500 hover:-translate-y-2 cursor-pointer relative"
                      onClick={triggerSparks}
                      title="Cliquez sur le téléphone pour tester des interactions et envoyer des étincelles !"
                    >
                      {/* Floating Indicator banner */}
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-full text-[10px] font-semibold font-sans animate-bounce whitespace-nowrap z-20">
                        ⚡️ {"Appuyez pour interagir & Jouer"} ⚡️
                      </div>

                      {/* Case buttons */}
                      <div className="absolute bg-[#666] left-[-3px] top-[75px] w-[3px] h-[24px] rounded-l-sm" />
                      <div className="absolute bg-[#666] left-[-3px] top-[115px] w-[3px] h-[45px] rounded-l-sm" />
                      <div className="absolute bg-[#666] left-[-3px] top-[175px] w-[3px] h-[45px] rounded-l-sm" />
                      <div className="absolute bg-[#666] right-[-3px] top-[135px] w-[3px] h-[65px] rounded-r-sm" />

                      {/* iPhone Bezel natural wood tone or Dark Titanium */}
                      <div className="w-[335px] h-[680px] rounded-[48px] border-[10px] border-[#8a857b] bg-black relative flex flex-col overflow-hidden shadow-[0_35px_90px_-15px_rgba(0,0,0,0.95)]">
                         <div className="absolute inset-0 border border-white/5 rounded-[38px] pointer-events-none z-10" />

                         {/* Screen */}
                         <div className="flex-1 bg-white relative flex flex-col overflow-hidden rounded-[38px]">
                           {/* Status bar */}
                           <div className="h-8 px-5 bg-black text-white flex items-center justify-between text-[11px] font-semibold shrink-0 select-none z-20">
                              <span className="font-mono text-white/90">09:41</span>
                              <div className="absolute left-1/2 -translate-x-1/2 top-1.5 w-[90px] h-[20px] bg-black rounded-full flex items-center justify-end px-2 gap-1 z-30">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              </div>
                              <div className="flex items-center gap-1.5 text-white/80">
                                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M12 21l-12-12c5.52-5.52 14.48-5.52 20 0l-8 12zm0-18C8.55 3 5.4 4.3 3 6.43l9 9 9-9C18.6 4.3 15.45 3 12 3z" /></svg>
                                <div className="w-4 h-2.5 border border-white/60 rounded-[3px] p-0.5 flex items-center"><div className="bg-emerald-400 h-full w-[95%] rounded-[1px]" /></div>
                              </div>
                           </div>

                           {/* Embedded frame */}
                           <div className="flex-1 relative bg-white">
                             {selectedFile.language === 'html' || selectedFile.language === 'svg' ? (
                               <iframe 
                                 className="w-full h-full border-none bg-white font-sans text-black"
                                 srcDoc={selectedFile.content}
                                 title="iPhone Showcase Simulator"
                                 sandbox="allow-scripts"
                               />
                             ) : (
                               <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-[#111] text-white">
                                  <Layers size={24} className="text-amber-500 mb-2" />
                                  <span className="text-xs font-mono">{selectedFile.name}</span>
                                  <p className="text-[10px] text-neutral-400 mt-1">Sélectionnez index.html pour le rendu.</p>
                               </div>
                             )}
                           </div>
                           
                           {/* ios home bar */}
                           <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-[110px] h-[4px] bg-[#1a1a1a]/70 rounded-full z-20 pointer-events-none" />
                         </div>
                      </div>
                    </div>
                 </div>

                 {/* Right Half: Apple Store Specification Console & Live Code Inspector */}
                 <div className="flex-1 flex flex-col p-8 lg:p-10 justify-between gap-6 overflow-y-auto max-w-2xl bg-[#0b0c10]">
                    <div className="space-y-6">
                       <div className="space-y-2">
                          <span className="text-xs font-serif italic text-amber-400 tracking-wider">Showroom Spécifications</span>
                          <h2 className="text-3xl font-bold tracking-tight text-white font-serif">{project?.name || "Workspace Applet"}{" — "}Apple Edition</h2>
                          <p className="text-[#8e9aa8] text-[13.5px] leading-relaxed">
                             Un environnement de bac à sable haut de gamme qui simule l&apos;exécution matérielle de votre application. Modifiez le code source en direct et visualisez le rendu instantanément.
                          </p>
                       </div>

                       {/* Bento Style Specification Cards */}
                       <div className="grid grid-cols-2 gap-4">
                          {/* Card 1 */}
                          <div className="bg-[#12151e] border border-[#212631]/80 rounded-[18px] p-4 space-y-2 relative overflow-hidden group/card hover:border-amber-500/30 transition-colors">
                             <div className="text-[11px] font-mono text-amber-400 uppercase tracking-widest">ÉCRAN</div>
                             <div className="text-lg font-bold text-white">Super Retina XDR</div>
                             <p className="text-xs text-[#6e7d95]">Liquid 120Hz, contraste infini de format responsive.</p>
                             <div className="absolute right-[-10px] bottom-[-10px] opacity-[0.03] group-hover/card:opacity-[0.08] transition-opacity">
                                <Smartphone size={90} className="text-white" />
                             </div>
                          </div>

                          {/* Card 2 */}
                          <div className="bg-[#12151e] border border-[#212631]/80 rounded-[18px] p-4 space-y-2 relative overflow-hidden group/card hover:border-green-500/30 transition-colors">
                             <div className="text-[11px] font-mono text-emerald-400 uppercase tracking-widest">PERFORMANCE</div>
                             <div className="text-lg font-bold text-white">A18 Pro Octa-Core</div>
                             <p className="text-xs text-[#6e7d95]">Simulateur matériel accéléré sur Cloud Run.</p>
                             <div className="absolute right-[-10px] bottom-[-10px] opacity-[0.03] group-hover/card:opacity-[0.08] transition-opacity">
                                <Sparkles size={90} className="text-white" />
                             </div>
                          </div>

                          {/* Card 3 */}
                          <div className="bg-[#12151e] border border-[#212631]/80 rounded-[18px] p-4 space-y-2 col-span-2 hover:border-[#3a7bd5]/30 transition-colors">
                             <div className="flex items-center justify-between">
                                <div className="text-[11px] font-mono text-blue-400 uppercase tracking-widest">{t("compilation_metrics")}</div>
                                <span className="bg-blue-500/10 border border-blue-500/20 text-blue-400 px-2 py-0.5 rounded text-[10px] font-mono">INTEGRITY SUCCESS</span>
                             </div>
                             <div className="grid grid-cols-3 gap-2 pt-1">
                                <div>
                                   <div className="text-xs text-[#6e7d95]">{t("file_active")}</div>
                                   <div className="text-sm font-semibold truncate font-mono text-[#ccc]">{selectedFile.name}</div>
                                </div>
                                <div>
                                   <div className="text-xs text-[#6e7d95]">{t("langage")}</div>
                                   <div className="text-sm font-semibold uppercase font-mono text-[#ccc]">{selectedFile.language}</div>
                                </div>
                                <div>
                                   <div className="text-xs text-[#6e7d95]">{t("taille")}</div>
                                   <div className="text-sm font-semibold font-mono text-[#ccc]">{selectedFile.size}</div>
                                </div>
                             </div>
                          </div>
                       </div>

                       {/* Interactive Click Test Console Suite */}
                       <div className="bg-gradient-to-r from-[#1b1915] to-[#12151e] border border-amber-500/15 rounded-2xl p-5 space-y-3 relative overflow-hidden">
                          <div className="flex items-start justify-between gap-4">
                             <div>
                                <h4 className="text-[14px] font-bold text-amber-400 flex items-center gap-1.5 leading-tight">
                                   <Volume2 size={14} /> {t("interactive_evaluation_bench")}
                                </h4>
                                <p className="text-xs text-[#6e7d95] mt-1">
                                   {t("click_below_to_simulate")}
                                </p>
                             </div>
                             <div className="text-right">
                                <div className="text-[10px] font-mono text-[#6e7d95]">INTERACTIONS</div>
                                <div className="text-2xl font-bold font-mono text-white tracking-tight">{interactiveClicks}</div>
                             </div>
                          </div>

                          <div className="flex items-center gap-3">
                             <button 
                               onClick={triggerSparks}
                               className="bg-white hover:bg-neutral-200 text-black px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 shadow-lg active:scale-95"
                             >
                                <Play size={12} fill="black" /> 
                                <span>{t("simulate_screen_touch")}</span>
                             </button>
                             <div className="text-[11px] text-[#6e7d95] font-mono truncate">
                                {interactiveClicks > 0 
                                  ? `[TEST] Sim_Input event #${interactiveClicks} successfully dispatched on scope ${selectedFile.name}`
                                  : t("ready_to_send_interactions")
                                }
                             </div>
                          </div>
                       </div>
                    </div>

                    {/* Integrated mini script editor so they can edit on the fly */}
                    <div className="bg-[#0f1118] border border-[#212631] rounded-2xl overflow-hidden flex flex-col h-[200px] hover:border-blue-500/20 transition-all shadow-inner">
                       <div className="bg-[#151922] px-3.5 py-1.5 border-b border-[#212631] flex items-center justify-between text-[11px] font-mono text-[#6e7d95]">
                          <span>{t("micro_editor_live", { name: selectedFile.name })}</span>
                          <span className="text-blue-400 flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-blue-400 animate-ping"></span> Live</span>
                       </div>
                       <textarea 
                         value={selectedFile.content}
                         onChange={(e) => handleUpdateFileContent(selectedFile.name, e.target.value)}
                         className="flex-1 bg-transparent text-[#ccc] p-4 text-[12px] font-mono leading-relaxed outline-none focus:ring-0 resize-none scrollbar-thin overflow-y-auto"
                         spellCheck="false"
                         placeholder={t("modify_code_here")}></textarea></div></div></div>)}

          </div>
        </div>
      )}
    </div>
  );
}

function ChevronDown({className, size}: {className?: string, size?: number}) {
  return <svg width={size||24} height={size||24} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
}
