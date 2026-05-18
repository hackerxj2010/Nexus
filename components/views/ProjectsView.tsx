"use client";

import { Folder, Plus, ArrowLeft, Search, ChevronDown } from "lucide-react";
import { useI18n } from '@/lib/i18n';
import { projects } from "@/lib/data";
import { useState, useEffect } from "react";
import { ProjectDetailView } from "./ProjectDetailView";

export function ProjectsView() {
    const { t } = useI18n();
const [view, setView] = useState<"list" | "create" | "detail">("list");
  const [selectedProject, setSelectedProject] = useState<any>(null);
  
  useEffect(() => {
    const handleNav = (e: any) => {
      const { action, id } = e.detail || {};
      if (action === "create") {
         setView("create");
      } else if (id !== undefined) {
         const p = projects.find(x => x.id === id) || projects[0];
         setSelectedProject(p);
         setView("detail");
      }
    };
    
    window.addEventListener("project-navigation", handleNav);
    if ((window as any)._projectNav) {
       handleNav({ detail: (window as any)._projectNav });
       delete (window as any)._projectNav;
    }
    
    return () => window.removeEventListener("project-navigation", handleNav);
  }, []);

  const handleCreateProject = () => {
     // Just mock for now, activate detail view with a new project state
     setSelectedProject({ ...projects[0], id: 999, name: "Nouveau Projet" });
     setView("detail");
  };

  if (view === "create") {
    return (
      <div className="flex-1 p-10 max-w-3xl mx-auto w-full animate-in fade-in duration-300">
        <button
          onClick={() => setView("list")}
          className="text-[#888] hover:text-[#ccc] mb-6 flex items-center gap-2 text-[13px] transition-colors"
        >
          <ArrowLeft size={16} /> Retour
        </button>

        <h2 className="font-serif text-[28px] font-medium text-[#e8e6e3] mb-8">
          Créer un projet personnel
        </h2>

        <div className="space-y-6 max-w-2xl">
          <div>
            <label className="block text-[14px] text-[#e8e6e3] mb-2 font-medium">
              Sur quoi travaillez-vous ?
            </label>
            <input
              autoFocus
              type="text"
              placeholder="Nommez votre projet"
              className="w-full bg-[#1e1e1e] border border-[#3a7bd5] rounded-xl px-4 py-3 text-[#ccc] text-[14px] outline-none shadow-[0_0_0_1px_rgba(58,123,213,0.3)] transition-all"
            />
          </div>

          <div>
            <label className="block text-[14px] text-[#e8e6e3] mb-2 font-medium">
              Qu&apos;essayez-vous de faire ?
            </label>
            <textarea
              placeholder={t("describe_project")}
              className="w-full bg-[#1e1e1e] border border-[#333] rounded-xl px-4 py-3 text-[#ccc] text-[14px] outline-none focus:border-[#555] transition-colors min-h-[140px] resize-none"
            />
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button 
              onClick={() => setView("list")}
              className="bg-transparent border border-[#444] hover:bg-[#222] text-[#ccc] px-5 py-2.5 rounded-lg text-[13.5px] font-medium transition-colors"
            >
              Annuler
            </button>
            <button 
              onClick={handleCreateProject}
              className="bg-white hover:bg-[#e8e6e3] text-black px-5 py-2.5 rounded-lg text-[13.5px] font-medium transition-colors">
              Créer un projet
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (view === "detail" && selectedProject) {
    return <ProjectDetailView project={selectedProject} onBack={() => setView("list")} />;
  }

  return (
    <div className="flex-1 p-10 max-w-5xl mx-auto w-full animate-in fade-in duration-300">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-serif text-3xl font-medium text-[#e8e6e3]">
          Projets
        </h2>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-3 py-1.5 bg-[#1e1e1e] border border-[#333] hover:bg-[#2a2a2a] rounded-lg text-[13px] text-[#ccc] transition-colors">
            Trier par <div className="text-[#eee] flex items-center gap-1 ml-1">Activité <ChevronDown size={14} className="text-[#888]"/></div>
          </button>
          <button 
            onClick={() => setView("create")}
            className="bg-white text-black px-4 py-1.5 rounded-lg text-[13px] font-medium hover:bg-[#e8e6e3] transition-colors"
          >
            Nouveau projet
          </button>
        </div>
      </div>

      <div className="relative mb-8 max-w-full">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666]" />
        <input 
          placeholder={t("search_projects")} 
          className="w-full bg-[#1e1e1e] border border-transparent rounded-xl pl-12 pr-4 py-3.5 text-[15px] text-[#ccc] focus:border-[#333] outline-none transition-colors"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {[{
          id: 1, name: "hire pittman", description: "ddbdbd", updatedAt: "il y a 16 minutes", hasGithubFile: true
        }, {
          id: 2, name: "hire", description: "bug", updatedAt: "il y a 6 mois"
        }, {
          id: 3, name: "How to use Claude", description: "An example project that also doubles as a how-to guide for using Claude. Chat with it to learn more about how to get the most out of chatting with Claude!", updatedAt: "il y a 10 mois", tag: "Projet exemple"
        }].map((p) => (
          <button
            key={p.id}
            onClick={() => { setSelectedProject(p); setView('detail'); }}
            className="bg-[#1a1a1a] border border-[#2a2a2a] hover:bg-[#222] transition-colors rounded-xl p-5 text-left flex flex-col items-start min-h-[160px] group"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="text-[#e8e6e3] text-[15px] font-medium group-hover:underline decoration-[#444] underline-offset-4">{p.name}</div>
              {p.tag && (
                <div className="text-[11px] bg-[#222] text-[#888] px-2 py-0.5 rounded border border-[#333]">
                  {p.tag}
                </div>
              )}
            </div>
            
            {p.description && (
              <p className="text-[13.5px] text-[#888] line-clamp-3 mb-4 leading-relaxed">
                {p.description}
              </p>
            )}
            
            <div className="text-[12px] text-[#555] mt-auto">
              Mis.e.s à jour à {p.updatedAt}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
