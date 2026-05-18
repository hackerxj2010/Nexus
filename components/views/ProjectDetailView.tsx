"use client";

import { useState, useRef, useEffect } from "react";
import { useI18n } from '@/lib/i18n';
import { ArrowLeft, MoreVertical, Star, Lock, Plus, Paperclip, AlignLeft, Github, Info, Search, X } from "lucide-react";
import { InputBox } from "@/components/InputBox";

export function ProjectDetailView({ project, onBack }: { project: any, onBack: () => void }) {
  const { t } = useI18n();
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [showTextModal, setShowTextModal] = useState(false);
  const [showGithubModal, setShowGithubModal] = useState(false);
  const [showInstructionsModal, setShowInstructionsModal] = useState(false);

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
  const hasFiles = project?.hasGithubFile || addedGithubFiles.length > 0;

  const toggleGithubFile = (index: number) => {
    const newFiles = [...githubFiles];
    newFiles[index].checked = !newFiles[index].checked;
    setGithubFiles(newFiles);
  };

  const handleAddGithubFiles = () => {
    const selected = githubFiles.filter(f => f.checked);
    setAddedGithubFiles(selected);
    setShowGithubModal(false);
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
    <div className="flex-1 flex overflow-hidden bg-[#141414] animate-in slide-in-from-right-4 duration-300">
      
      {/* Left Column (Main Chat Area) */}
      <div className="flex-1 flex flex-col p-10 overflow-y-auto scrollbar-hide max-w-4xl mx-auto">
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
      <div className="w-[340px] lg:w-[380px] xl:w-[420px] bg-[#141414] overflow-y-auto scrollbar-hide py-10 pr-10 pl-2">
        
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
                
                <div className="flex flex-col gap-2">
                  {project?.hasGithubFile && (
                    <div className="bg-[#212121] border border-[#333] rounded-lg p-3 inline-flex flex-col gap-1 w-full">
                      <div className="text-[13px] text-[#ccc] truncate">hackerxj2010/hermes-agent</div>
                      <div className="text-[11px] text-[#888]">main</div>
                      <div className="flex items-center gap-1.5 mt-1 bg-[#141414] px-2 py-0.5 rounded-md self-start text-[#aaa] text-[10px] border border-[#333]">
                         <Github size={10} /> GITHUB
                      </div>
                    </div>
                  )}
                  {addedGithubFiles.map((file, i) => (
                    <div key={i} className="bg-[#212121] border border-[#333] rounded-lg p-3 inline-flex flex-col gap-1 w-full">
                      <div className="text-[13px] text-[#ccc] truncate">hermes-agent / {file.name}</div>
                      <div className="text-[11px] text-[#888]">{file.size}</div>
                      <div className="flex items-center gap-1.5 mt-1 bg-[#141414] px-2 py-0.5 rounded-md self-start text-[#aaa] text-[10px] border border-[#333]">
                         <Github size={10} /> FILE
                      </div>
                    </div>
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
                  placeholder={t("name_content")} 
                  className="w-full bg-transparent border border-[#3a7bd5] rounded-xl px-3.5 py-2.5 text-[#e8e6e3] text-[14px] outline-none shadow-[0_0_0_1px_rgba(58,123,213,0.3)] transition-all"
                />
              </div>
              
              <div>
                <label className="block text-[13px] text-[#e8e6e3] mb-1.5">Contenu <span className="text-[#da7756]">*</span></label>
                <textarea 
                  placeholder={t("type_paste_content")} 
                  className="w-full bg-[#1e1e1e] border border-[#333] rounded-xl px-3.5 py-3 text-[#e8e6e3] text-[14px] outline-none focus:border-[#555] transition-colors min-h-[220px] resize-none"
                />
              </div>
            </div>

            <div className="px-6 py-4 border-t border-[#2a2a2a] flex justify-end gap-3 bg-[#1a1a1a]">
              <button 
                onClick={() => setShowTextModal(false)}
                className="px-4 py-2 border border-[#444] rounded-lg text-[#ccc] text-[13.5px] hover:bg-[#222] transition-colors"
              >
                Annuler
              </button>
              <button className="bg-white hover:bg-[#e8e6e3] text-black px-4 py-2 rounded-lg text-[13.5px] font-medium transition-colors">
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
    </div>
  );
}

function ChevronDown({className, size}: {className?: string, size?: number}) {
  return <svg width={size||24} height={size||24} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
}
