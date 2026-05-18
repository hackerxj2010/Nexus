"use client";

import { MessageSquare, Search } from "lucide-react";
import { useI18n } from '@/lib/i18n';
import { conversations } from "@/lib/data";

interface DiscussionsViewProps {
  onSelectConv: (conv: any) => void;
  onNewConv: () => void;
}

export function DiscussionsView({
  onSelectConv,
  onNewConv,
}: DiscussionsViewProps) {
    const { t } = useI18n();
return (
    <div className="flex-1 p-10 max-w-4xl mx-auto w-full animate-in fade-in duration-300">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-serif text-3xl font-medium text-[#e8e6e3]">
          Discussions
        </h2>
        <div className="flex gap-2.5">
          <button className="bg-transparent border border-[#2a2a2a] hover:bg-[#1a1a1a] text-[#888] transition-colors rounded-lg px-3.5 py-1.5 text-[13px]">
            Sélectionner des conversations
          </button>
          <button
            onClick={onNewConv}
            className="bg-[#e8e6e3] hover:bg-white text-[#111] transition-colors rounded-lg px-3.5 py-1.5 text-[13px] font-medium"
          >
            Nouvelle conversation
          </button>
        </div>
      </div>

      <div className="bg-[#1e1e1e] rounded-xl border border-[#222] p-2 flex items-center gap-2 mb-6 focus-within:border-[#444] transition-all">
        <Search size={16} className="text-[#555] ml-2" />
        <input
          placeholder={t("search_conversations")}
          className="bg-transparent border-none text-[#ccc] text-[13.5px] outline-none flex-1 py-1"
        />
      </div>

      <div className="flex flex-col">
        {conversations.map((c) => (
          <button
            key={c.id}
            onClick={() => onSelectConv(c)}
            className="w-full flex items-center justify-between py-4 border-b border-[#1f1f1f] hover:bg-[#1a1a1a] transition-colors text-left px-2"
          >
            <span className="text-[#e8e6e3] text-[14px] truncate flex-1 pr-6">
              {c.title}
            </span>
            <span className="text-[#555] text-[12px] whitespace-nowrap">
              {c.time}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
