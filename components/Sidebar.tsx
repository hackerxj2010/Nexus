"use client";

import { useState, useEffect, useRef } from "react";
import { useI18n } from "@/lib/i18n";
import {
  Plus,
  Search,
  MessageSquare,
  Folder,
  Grid,
  Code,
  Briefcase,
  PanelLeft,
  Settings,
  Globe,
  Book,
  Star,
  Upload,
  ChevronRight,
  ArrowLeft,
  Trash2,
} from "lucide-react";
import { ClaudeLogo } from "./icons/ClaudeLogo";
import { favorites, conversations } from "@/lib/data";

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (val: boolean) => void;
  currentView: string;
  setCurrentView: (view: string) => void;
  onNewChat: () => void;
  onSearch: () => void;
  onSelectConversation: (conv: any) => void;
  activeConvId: number | null;
  onOpenSettings: () => void;
  conversationsList?: any[];
  onDeleteConversation?: (id: number) => void;
}

export function Sidebar({
  isCollapsed,
  setIsCollapsed,
  currentView,
  setCurrentView,
  onNewChat,
  onSearch,
  onSelectConversation,
  activeConvId,
  onOpenSettings,
  conversationsList,
  onDeleteConversation,
}: SidebarProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setShowUserMenu(false);
        setShowLanguageMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const { t, lang, setLang } = useI18n();

  const navItems = [
    {
      id: "new",
      icon: <Plus size={16} />,
      label: t("new_conversation"),
      action: onNewChat,
    },
    {
      id: "search",
      icon: <Search size={16} />,
      label: t("search"),
      action: onSearch,
    },
    {
      id: "discussions",
      icon: <MessageSquare size={16} />,
      label: t("discussions"),
      action: () => setCurrentView("discussions"),
    },
    {
      id: "projects",
      icon: <Folder size={16} />,
      label: t("projects"),
      action: () => setCurrentView("projects"),
    },
    {
      id: "artifacts",
      icon: <Grid size={16} />,
      label: t("artifacts"),
      action: () => setCurrentView("artifacts"),
    },
    {
      id: "code",
      icon: <Code size={16} />,
      label: t("code"),
      badge: t("upgrade_short"),
    },
    {
      id: "customize",
      icon: <Briefcase size={16} />,
      label: t("customize"),
      action: () => setCurrentView("customize"),
    },
  ];

  return (
    <div
      className={`bg-[#171717] h-screen flex flex-col border-r border-[#1f1f1f] transition-all duration-200 overflow-hidden relative z-20 ${
        isCollapsed ? "w-[52px] min-w-[52px]" : "w-[260px] min-w-[260px]"
      }`}
    >
      {/* Header */}
      <div
        className={`flex items-center p-3.5 gap-3 ${isCollapsed ? "justify-center" : "justify-between"}`}
      >
        {!isCollapsed && (
          <div className="font-serif text-[16px] font-bold text-[#e8e6e3] tracking-tight">
            Claude
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-[#666] hover:text-[#ccc] p-1 rounded-md hover:bg-[#242424] transition-all flex items-center justify-center shrink-0"
        >
          <PanelLeft size={16} />
        </button>
      </div>

      {/* Main Nav */}
      <div className="px-2 flex-none">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={item.action}
            className={`w-full flex items-center gap-3 py-1.5 px-2.5 rounded-lg text-[#999] hover:bg-[#242424] hover:text-[#e8e6e3] transition-colors mb-0.5 ${
              isCollapsed ? "justify-center" : "justify-start"
            } ${currentView === item.id ? "bg-[#242424] text-[#e8e6e3]" : ""}`}
          >
            <span className="shrink-0">{item.icon}</span>
            {!isCollapsed && (
              <>
                <span className="text-[13.5px] flex-1 text-left truncate">
                  {item.label}
                </span>
                {item.badge && (
                  <span className="text-[10px] bg-[#2d3a2a] text-[#6db368] px-1.5 py-0.5 rounded shrink-0">
                    {item.badge}
                  </span>
                )}
              </>
            )}
          </button>
        ))}
      </div>

      {/* Conversations List */}
      {!isCollapsed && (
        <div className="flex-1 overflow-y-auto px-2 py-2 mt-2 scrollbar-hide">
          <div className="text-[11px] text-[#555] px-2 py-1.5 uppercase tracking-wider font-semibold">
            {t("favorites")}
          </div>
          {(conversationsList ? conversationsList.filter(c => c.isFavorite) : favorites).map((f) => (
            <div
              key={f.id}
              className={`w-full group/item flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[13px] transition-all ${
                activeConvId === f.id
                  ? "bg-[#242424] text-[#e8e6e3]"
                  : "text-[#888] hover:bg-[#242424] hover:text-[#ccc]"
              }`}
            >
              <button
                onClick={() => onSelectConversation(f)}
                className="text-left truncate flex-1 block"
              >
                {f.title}
              </button>
              {onDeleteConversation && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteConversation(f.id);
                  }}
                  className="opacity-0 group-hover/item:opacity-100 p-1 rounded hover:bg-[#333] hover:text-[#da7756] transition-opacity duration-150 shrink-0 ml-1.5"
                  title="Supprimer la conversation"
                >
                  <Trash2 size={12} />
                </button>
              )}
            </div>
          ))}

          <div className="text-[11px] text-[#555] px-2 pt-3 pb-1.5 uppercase tracking-wider font-semibold">
            {t("recent")}
          </div>
          {(conversationsList ? conversationsList.filter(c => !c.isFavorite) : conversations).map((c) => (
            <div
              key={c.id}
              className={`w-full group/item flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[13px] transition-all ${
                activeConvId === c.id
                  ? "bg-[#242424] text-[#e8e6e3]"
                  : "text-[#888] hover:bg-[#242424] hover:text-[#ccc]"
              }`}
            >
              <button
                onClick={() => onSelectConversation(c)}
                className="text-left truncate flex-1 block"
              >
                {c.title}
              </button>
              {onDeleteConversation && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteConversation(c.id);
                  }}
                  className="opacity-0 group-hover/item:opacity-100 p-1 rounded hover:bg-[#333] hover:text-[#da7756] transition-opacity duration-150 shrink-0 ml-1.5"
                  title="Supprimer la conversation"
                >
                  <Trash2 size={12} />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Spacer when collapsed */}
      {isCollapsed && <div className="flex-1" />}

      {/* User Footer */}
      <div className="p-3 border-t border-[#1f1f1f] relative" ref={userMenuRef}>
        <button
          onClick={() => setShowUserMenu(!showUserMenu)}
          className={`w-full flex items-center gap-2.5 p-1 rounded-lg hover:bg-[#242424] transition-colors ${
            isCollapsed ? "justify-center" : "justify-start"
          }`}
        >
          <div className="w-7 h-7 rounded-full bg-[#3a3a3a] flex items-center justify-center text-[12px] text-[#ccc] shrink-0 font-medium">
            J
          </div>
          {!isCollapsed && (
            <div className="text-left flex-1 truncate">
              <div className="text-[13px] text-[#ccc] leading-tight">Jean</div>
              <div className="text-[11px] text-[#555] leading-tight mt-0.5 text-orange-200/60">
                {t("free_plan")}
              </div>
            </div>
          )}
        </button>

        {/* User Context Menu */}
        {showUserMenu && !showLanguageMenu && (
          <div
            className={`absolute bottom-[60px] ${isCollapsed ? "left-[52px]" : "left-3"} bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl w-[240px] z-50 overflow-hidden py-1 shadow-xl animate-in fade-in slide-in-from-bottom-2`}
          >
            <div className="px-4 py-2 text-[12px] text-[#555] border-b border-[#222] mb-1 truncate">
              hackermechatronicrobotengineer@...
            </div>
            {[
              {
                label: t("settings"),
                icon: <Settings size={14} />,
                cmd: "⇧Ctrl,",
                action: () => {
                  onOpenSettings();
                  setShowUserMenu(false);
                },
              },
              {
                label: t("language"),
                icon: <Globe size={14} />,
                hasSub: true,
                action: () => setShowLanguageMenu(true),
              },
              { label: t("help"), icon: <Book size={14} /> },
              {
                label: t("upgrade"),
                icon: <Star size={14} />,
              },
              {
                label: t("apps"),
                icon: <Upload size={14} />,
              },
              { label: t("more"), icon: <ChevronRight size={14} /> },
              { label: t("logout"), icon: <ArrowLeft size={14} /> },
            ].map((item, idx) => (
              <button
                key={idx}
                onClick={item.action}
                className="w-full flex items-center gap-3 px-4 py-2 text-[13px] text-[#ccc] hover:bg-[#2a2a2a] transition-colors text-left"
              >
                <span className="text-[#666]">{item.icon}</span>
                <span className="flex-1 truncate">{item.label}</span>
                {item.hasSub && (
                  <ChevronRight size={14} className="text-[#555]" />
                )}
                {item.cmd && (
                  <span className="text-[10px] text-[#555]">{item.cmd}</span>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Language Submenu */}
        {showLanguageMenu && (
          <div
            className={`absolute bottom-[60px] ${isCollapsed ? "left-[52px]" : "left-3"} bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl w-[200px] z-50 overflow-hidden shadow-xl animate-in fade-in slide-in-from-left-2`}
          >
            <div className="flex flex-col">
              <button
                onClick={() => setShowLanguageMenu(false)}
                className="flex items-center gap-2 px-4 py-2 border-b border-[#222] text-[#888] text-[12px] hover:text-[#ccc] transition-colors"
                style={{ backgroundColor: "#1a1a1a" }}
              >
                <ArrowLeft size={14} /> {t("go_back")}
              </button>
              <div className="py-1">
                <div className="px-4 py-1.5 text-[11px] text-[#555] font-semibold uppercase tracking-wider">
                  {t("current")}
                </div>
                <button className="w-full text-left px-4 py-2 text-[13px] text-[#e8e6e3] bg-[#2a2a2a] flex justify-between items-center">
                  {lang === "fr" ? "Français" : "English (US)"}
                  <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                </button>

                <div className="px-4 py-1.5 text-[11px] text-[#555] font-semibold uppercase tracking-wider mt-2">
                  {t("available")}
                </div>
                {lang !== "en" && (
                  <button 
                    onClick={() => { setLang("en"); setShowLanguageMenu(false); setShowUserMenu(false); }}
                    className="w-full text-left px-4 py-2 text-[13px] text-[#888] hover:bg-[#242424] hover:text-[#ccc] transition-colors"
                  >
                    English (US)
                  </button>
                )}
                {lang !== "fr" && (
                  <button 
                    onClick={() => { setLang("fr"); setShowLanguageMenu(false); setShowUserMenu(false); }}
                    className="w-full text-left px-4 py-2 text-[13px] text-[#888] hover:bg-[#242424] hover:text-[#ccc] transition-colors"
                  >
                    Français
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
