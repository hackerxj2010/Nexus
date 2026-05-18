"use client";

import {
  Plus,
  Mic,
  Send,
  Paperclip,
  Copy,
  Folder,
  Book,
  Grid,
  Globe,
  Pen,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Check,
  Zap,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useI18n } from '@/lib/i18n';

interface InputBoxProps {
  onSend: (msg: string) => void;
  compact?: boolean;
}

export function InputBox({ onSend, compact = false }: InputBoxProps) {
    const { t } = useI18n();
const [input, setInput] = useState("");
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);

  const [showModelMenu, setShowModelMenu] = useState(false);
  const [selectedModel, setSelectedModel] = useState("sonnet_3_5");
  const [adaptiveThought, setAdaptiveThought] = useState(true);
  const [showMoreModels, setShowMoreModels] = useState(false);
  const [webSearchEnabled, setWebSearchEnabled] = useState(false);
  const [isOutOfCredits, setIsOutOfCredits] = useState(false);

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const menuContainerRef = useRef<HTMLDivElement>(null);
  const modelMenuRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuContainerRef.current &&
        !menuContainerRef.current.contains(event.target as Node)
      ) {
        setShowAttachMenu(false);
        setActiveSubMenu(null);
      }
      if (
        modelMenuRef.current &&
        !modelMenuRef.current.contains(event.target as Node)
      ) {
        setShowModelMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const attachMenuItems = [
    {
      id: "files",
      label: t("add_files_short"),
      icon: <Paperclip size={14} />,
    },
    {
      id: "screenshot",
      label: t("take_screenshot"),
      icon: <Copy size={14} />,
    },
    {
      id: "project",
      label: t("add_to_project"),
      icon: <Folder size={14} />,
      hasSub: true,
    },
    {
      id: "skills",
      label: t("skills"),
      icon: <Book size={14} />,
      hasSub: true,
    },
    {
      id: "connectors",
      label: t("connectors"),
      icon: <Grid size={14} />,
      hasSub: true,
    },
    {
      id: "web",
      label: t("web_search"),
      icon: <Globe size={14} />,
      action: "toggle",
    },
    {
      id: "style",
      label: t("use_style"),
      icon: <Pen size={14} />,
      hasSub: true,
    },
  ];

  const goToProject = (action: string, id?: number) => {
    const detail = { action, id };
    (window as any)._projectNav = detail;
    window.dispatchEvent(new CustomEvent("project-navigation", { detail }));
    window.dispatchEvent(new CustomEvent("switch-view", { detail: { view: "projects" }}));
    setActiveSubMenu(null);
    setShowAttachMenu(false);
  };

  const getSubmenuRender = () => {
    switch (activeSubMenu) {
      case "project":
        return (
          <div className="flex flex-col w-full h-full animate-in slide-in-from-right-2 duration-150">
            <button
              onClick={() => setActiveSubMenu(null)}
              className="px-3.5 py-2 flex items-center gap-2 text-[#ccc] hover:text-white transition-colors text-[13px] border-b border-[#2a2a2a] bg-[#1a1a1a]"
            >
              <ChevronLeft size={14} /> {t("go_back_short")}
            </button>
            <div className="p-1">
              <div className="text-[11px] text-[#555] font-semibold uppercase tracking-wider px-2.5 py-2">
                {t("recent_projects")}
              </div>
              <button 
                onClick={() => goToProject("detail", 1)}
                className="w-full flex items-center px-2.5 py-2 text-[13px] text-[#ccc] hover:bg-[#2a2a2a] rounded-lg transition-colors">
                <Folder size={14} className="mr-3 text-[#555]" /> hire
              </button>
              <button 
                onClick={() => goToProject("detail", 2)}
                className="w-full flex items-center px-2.5 py-2 text-[13px] text-[#ccc] hover:bg-[#2a2a2a] rounded-lg transition-colors">
                <Folder size={14} className="mr-3 text-[#555]" /> How to use
              </button>
              <div className="h-px bg-[#2a2a2a] my-1"></div>
              <button 
                onClick={() => goToProject("create")}
                className="w-full flex items-center px-2.5 py-2 text-[13px] text-[#e8e6e3] hover:bg-[#2a2a2a] rounded-lg transition-colors">
                <Plus size={14} className="mr-3" /> {t("start_project")}
              </button>
            </div>
          </div>
        );
      case "skills":
        return (
          <div className="flex flex-col w-full h-full animate-in slide-in-from-right-2 duration-150">
            <button
              onClick={() => setActiveSubMenu(null)}
              className="px-3.5 py-2 flex items-center gap-2 text-[#ccc] hover:text-white transition-colors text-[13px] border-b border-[#2a2a2a] bg-[#1a1a1a]"
            >
              <ChevronLeft size={14} /> Retour
            </button>
            <div className="p-1">
              <div className="text-[11px] text-[#555] font-semibold uppercase tracking-wider px-2.5 py-2">
                Vos compétences
              </div>
              <button className="w-full flex items-center px-2.5 py-2 text-[13px] text-[#ccc] hover:bg-[#2a2a2a] rounded-lg transition-colors justify-between">
                <span className="flex items-center gap-3">
                  <Book size={14} className="text-[#555]" /> skill-creator
                </span>
                <span className="text-[#555] text-[10px]">{t("by_you")}</span>
              </button>
              <div className="h-px bg-[#2a2a2a] my-1"></div>
              <button className="w-full flex items-center px-2.5 py-2 text-[13px] text-[#ccc] hover:bg-[#2a2a2a] rounded-lg transition-colors">
                <Grid size={14} className="mr-3 text-[#555]" /> Gérer
              </button>
            </div>
          </div>
        );
      case "connectors":
        return (
          <div className="flex flex-col w-full h-full animate-in slide-in-from-right-2 duration-150">
            <button
              onClick={() => setActiveSubMenu(null)}
              className="px-3.5 py-2 flex items-center gap-2 text-[#ccc] hover:text-white transition-colors text-[13px] border-b border-[#2a2a2a] bg-[#1a1a1a]"
            >
              <ChevronLeft size={14} /> Retour
            </button>
            <div className="p-1">
              <div className="text-[11px] text-[#555] font-semibold uppercase tracking-wider px-2.5 py-2">
                Vos connecteurs
              </div>
              <button className="w-full flex items-center px-2.5 py-2 text-[13px] text-[#ccc] hover:bg-[#2a2a2a] rounded-lg transition-colors justify-between">
                <span className="flex items-center gap-3">
                  <Folder size={14} className="text-[#4285F4]" /> Google Drive
                </span>
                <span className="text-[#5db075] text-[10px]">{t("connected")}</span>
              </button>
              <div className="h-px bg-[#2a2a2a] my-1"></div>
              <button className="w-full flex items-center px-2.5 py-2 text-[13px] text-[#e8e6e3] hover:bg-[#2a2a2a] rounded-lg transition-colors">
                <Plus size={14} className="mr-3" /> Ajouter un connecteur
              </button>
            </div>
          </div>
        );
      case "style":
        return (
          <div className="flex flex-col w-full h-full animate-in slide-in-from-right-2 duration-150">
            <button
              onClick={() => setActiveSubMenu(null)}
              className="px-3.5 py-2 flex items-center gap-2 text-[#ccc] hover:text-white transition-colors text-[13px] border-b border-[#2a2a2a] bg-[#1a1a1a]"
            >
              <ChevronLeft size={14} /> Retour
            </button>
            <div className="p-1">
              {['style_normal', 'style_learning', 'style_concise', 'style_explanatory'].map((s) => (
                <button
                  key={s}
                  className="w-full flex items-center px-2.5 py-2 text-[13px] text-[#ccc] hover:bg-[#2a2a2a] rounded-lg transition-colors"
                >
                  {t(s)}
                </button>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full relative shadow-lg group">
      <div className="bg-[#212121] rounded-[18px] border border-[#2a2a2a] focus-within:border-[#444] transition-colors relative z-40">
        <div className="px-4 pt-3 pb-1 flex flex-col justify-end min-h-[44px]">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              compact ? t("write_message") : t("how_can_i_help")
            }
            rows={compact ? 2 : 3}
            className="w-full bg-transparent border-none text-[#e8e6e3] text-[15px] resize-none outline-none font-sans leading-relaxed min-h-[48px] max-h-[30vh] overflow-y-auto scrollbar-hide"
          />
        </div>

        <div className="flex items-center justify-between px-2.5 pb-2.5 relative">
          {/* Attach Menu Trigger Container */}
          <div className="flex gap-1 relative" ref={menuContainerRef}>
            <button
              onClick={() => {
                setShowAttachMenu(!showAttachMenu);
                setActiveSubMenu(null);
              }}
              className="text-[#888] hover:text-[#ccc] p-1.5 rounded-lg hover:bg-[#2a2a2a] transition-all"
            >
              <Plus size={18} />
            </button>

            {showAttachMenu && (
              <div
                className="absolute bottom-full left-0 mb-3 bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl w-[280px] z-50 overflow-hidden shadow-2xl animate-in zoom-in-95 duration-100 font-sans flex flex-col"
                style={{ minHeight: "260px" }}
              >
                {!activeSubMenu ? (
                  <div className="p-1 animate-in slide-in-from-left-2 duration-150">
                    {attachMenuItems.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => {
                          if (item.action === "toggle") {
                            e.stopPropagation();
                            if (item.id === "web") {
                              setWebSearchEnabled(!webSearchEnabled);
                            }
                          } else if (item.hasSub) {
                            setActiveSubMenu(item.id);
                          } else {
                            setShowAttachMenu(false);
                          }
                        }}
                        className="w-full flex items-center justify-between px-2.5 py-2 text-[13.5px] transition-colors text-left text-[#ccc] hover:bg-[#2a2a2a] rounded-lg mb-0.5"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-[#888]">{item.icon}</span>
                          <span className="truncate">{item.label}</span>
                        </div>
                        {item.hasSub && (
                          <ChevronRight size={14} className="text-[#555]" />
                        )}
                        {item.action === "toggle" && item.id === "web" && (
                          <div className={`w-8 h-4.5 rounded-full relative transition-colors ${webSearchEnabled ? "bg-[#3a7bd5]" : "bg-[#444]"}`}>
                            <div className={`w-3.5 h-3.5 bg-white rounded-full absolute top-[2px] transition-transform ${webSearchEnabled ? "right-[2px]" : "left-[2px]"}`}></div>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                ) : (
                  getSubmenuRender()
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 relative">
            <div className="relative" ref={modelMenuRef}>
              <button
                onClick={() => setShowModelMenu(!showModelMenu)}
                className="flex items-center gap-1.5 text-[12px] text-[#888] hover:text-[#ccc] transition-colors px-2 py-1 rounded-md hover:bg-[#2a2a2a]"
              >
                {t(selectedModel)} {adaptiveThought && <span className="text-[#3a7bd5] ml-0.5">{t("adaptive_thought")}</span>}
                <ChevronDown size={12} />
              </button>

              {showModelMenu && (
                <div className="absolute bottom-full right-0 mb-3 bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl w-[260px] z-[60] overflow-hidden p-1 shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-100 text-left font-sans">
                  <button 
                    onClick={() => {
                      setSelectedModel("opus_4_7");
                      setShowModelMenu(false);
                    }}
                    className="w-full flex items-center justify-between px-2.5 py-2 text-[13.5px] transition-colors rounded-lg hover:bg-[#2a2a2a] text-[#ccc]"
                  >
                    <span className="flex items-center gap-2">{t("opus_4_7")}</span>
                    {selectedModel === "opus_4_7" ? (
                       <Check size={14} className="text-[#e8e6e3]" />
                    ) : (
                       <span className="text-[#ab9063] text-[10px] uppercase font-semibold">
                         {t("upgrade_short")}
                       </span>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setSelectedModel("sonnet_3_5");
                      setShowModelMenu(false);
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-2 text-[13.5px] hover:bg-[#2a2a2a] rounded-lg transition-colors ${selectedModel === "sonnet_3_5" ? "text-[#e8e6e3]" : "text-[#ccc]"}`}
                  >
                    <span className="flex items-center gap-2">{t("sonnet_3_5")}</span>
                    {selectedModel === "sonnet_3_5" && <Check size={14} className="text-[#e8e6e3]" />}
                  </button>
                  <button
                    onClick={() => {
                      setSelectedModel("haiku_4_5");
                      setShowModelMenu(false);
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-2 text-[13.5px] hover:bg-[#2a2a2a] rounded-lg transition-colors pr-8 ${selectedModel === "haiku_4_5" ? "text-[#e8e6e3]" : "text-[#ccc]"}`}
                  >
                    <span className="flex items-center gap-2">{t("haiku_4_5")}</span>
                    {selectedModel === "haiku_4_5" && <Check size={14} className="text-[#e8e6e3]" />}
                  </button>

                  <div className="h-px bg-[#2a2a2a] my-1 mx-1"></div>

                  <button 
                    onClick={() => setAdaptiveThought(!adaptiveThought)}
                    className="w-full px-2.5 py-2 flex items-center justify-between rounded-lg hover:bg-[#2a2a2a] transition-colors"
                  >
                    <div className="flex items-center gap-2 text-[13px] text-[#ccc]">
                      <Zap size={14} className={adaptiveThought ? "text-[#3a7bd5]" : "text-[#888]"} />
                      {t("adaptive_thought")}
                    </div>
                    <div className={`w-8 h-4.5 rounded-full relative transition-colors ${adaptiveThought ? "bg-[#3a7bd5]" : "bg-[#444]"}`}>
                      <div className={`w-3.5 h-3.5 bg-white rounded-full absolute top-[2px] transition-transform ${adaptiveThought ? "right-[2px]" : "left-[2px]"}`}></div>
                    </div>
                  </button>

                  <div className="h-px bg-[#2a2a2a] my-1 mx-1"></div>
                  
                  {showMoreModels ? (
                    <div className="animate-in fade-in zoom-in-95 duration-150">
                      <button
                        onClick={() => {
                          setSelectedModel("claude_3_opus");
                          setShowModelMenu(false);
                        }}
                        className={`w-full flex items-center justify-between px-2.5 py-2 text-[13.5px] hover:bg-[#2a2a2a] rounded-lg transition-colors pr-8 ${selectedModel === "claude_3_opus" ? "text-[#e8e6e3]" : "text-[#888]"}`}
                      >
                        <span className="flex items-center gap-2">Claude 3 Opus</span>
                        {selectedModel === "claude_3_opus" && <Check size={14} className="text-[#e8e6e3]" />}
                      </button>
                      <button
                        onClick={() => {
                          setSelectedModel("claude_3_sonnet");
                          setShowModelMenu(false);
                        }}
                        className={`w-full flex items-center justify-between px-2.5 py-2 text-[13.5px] hover:bg-[#2a2a2a] rounded-lg transition-colors pr-8 ${selectedModel === "claude_3_sonnet" ? "text-[#e8e6e3]" : "text-[#888]"}`}
                      >
                        <span className="flex items-center gap-2">Claude 3 Sonnet</span>
                        {selectedModel === "claude_3_sonnet" && <Check size={14} className="text-[#e8e6e3]" />}
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => setShowMoreModels(true)}
                      className="w-full flex items-center justify-between px-2.5 py-2 text-[13px] text-[#888] hover:bg-[#2a2a2a] hover:text-[#ccc] rounded-lg transition-colors"
                    >
                      {t("more_models")} <ChevronRight size={14} />
                    </button>
                  )}
                </div>
              )}
            </div>

            <button className="text-[#888] hover:text-[#ccc] p-1 transition-colors rounded-md">
              <Mic size={18} />
            </button>
            <div className="w-px h-4 bg-[#333]"></div>
            <button
              onClick={handleSend}
              className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ml-1 ${
                input.trim()
                  ? "bg-[#e8e6e3] hover:bg-white text-[#111] animate-in zoom-in duration-200"
                  : "bg-[#2a2a2a] text-[#555] cursor-default"
              }`}
            >
              <Send size={13} className="ml-0.5" />
            </button>
          </div>
        </div>
      </div>

      {!compact && isOutOfCredits && (
        <div className="flex justify-between items-center bg-[#1a1a1a] px-3.5 py-2 rounded-b-[18px] border-x border-b border-[#2a2a2a] -mt-2 pt-3">
          <span className="text-[12px] text-[#666]">
            {t('out_of_messages_2110')}
          </span>
          <button className="text-[#ccc] text-[12px] hover:text-white transition-colors">
            {t("upgrade_short")}
          </button>
        </div>
      )}
    </div>
  );
}
