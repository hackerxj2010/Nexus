"use client";

import { Search, X, MessageSquare, Folder } from "lucide-react";
import { useI18n } from '@/lib/i18n';
import { useState, useEffect } from "react";
import { conversations, projects } from "@/lib/data";

interface SearchModalProps {
  onClose: () => void;
  onSelect: (conv: any) => void;
}

export function SearchModal({ onClose, onSelect }: SearchModalProps) {
    const { t } = useI18n();
const [q, setQ] = useState("");

  // Combine all items for searching
  const allItems = [
    ...conversations.map(c => ({ ...c, type: 'chat' })),
    ...projects.map(p => ({ id: p.id, title: p.name, time: "", type: 'project' }))
  ];
  const filtered = q
    ? allItems.filter((c) => c.title.toLowerCase().includes(q.toLowerCase()))
    : allItems;

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-start justify-center pt-[15vh] backdrop-blur-[1px] animate-in fade-in duration-200"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-[#1e1e1e] rounded-xl w-full max-w-2xl border border-[#2a2a2a] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex items-center px-4 py-3 border-b border-[#242424] gap-3">
          <Search size={18} className="text-[#666]" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t("search_discussions_projects")}
            className="flex-1 bg-transparent border-none text-[#e8e6e3] text-[15px] outline-none"
          />
          <button
            onClick={onClose}
            className="text-[#666] hover:text-[#ccc] transition-colors p-1"
          >
            <X size={16} />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto scrollbar-hide py-2">
          {filtered.length === 0 && (
            <div className="text-center py-8 text-[#666] text-sm">
              {t("no_results")}
            </div>
          )}
          {filtered.map((c, i) => (
            <button
              key={`${c.type}-${c.id}`}
              onClick={() => {
                onSelect(c);
                onClose();
              }}
              className="w-full flex items-center gap-4 px-4 py-3 hover:bg-[#242424] focus:bg-[#2a2a2a] transition-colors text-left border-b border-[#1a1a1a]/50 outline-none group"
            >
              {c.type === 'project' ? (
                 <Folder size={16} className="text-[#666] shrink-0" />
              ) : (
                 <MessageSquare size={16} className="text-[#666] shrink-0" />
              )}
              <span className="flex-1 text-[14px] text-[#ccc] truncate group-hover:text-white transition-colors">
                {c.title}
              </span>
              <span className="text-[12px] text-[#555] shrink-0">
                {c.time || t("enter")}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
