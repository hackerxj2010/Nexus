"use client";

import { ClaudeLogo } from "@/components/icons/ClaudeLogo";
import { InputBox } from "@/components/InputBox";
import { Pen, Book, Code, Coffee, DivideIcon as Drive } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { useI18n } from "@/lib/i18n";

interface HomeViewProps {
  onSendMessage: (msg: string) => void;
}

export function HomeView({ onSendMessage }: HomeViewProps) {
  const { t } = useI18n();
  const suggestions = [
    { icon: <Pen size={15} />, label: t("write_email") },
    { icon: <Book size={15} />, label: t("summarize") },
    { icon: <Code size={15} />, label: t("code_react") },
    {
      icon: <Drive size={15} />,
      label: t("analyze_drive"),
      color: "#4285F4",
    },
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 gap-10 w-full h-full">
      <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
        <div className="flex items-center gap-4 mb-4 animate-in fade-in zoom-in duration-500">
          <div className="w-12 h-12 bg-[#da7756]/10 rounded-2xl flex items-center justify-center border border-[#da7756]/20">
            <ClaudeLogo size={24} />
          </div>
        </div>

        <h1 className="text-[32px] font-serif text-[#e8e6e3] mb-8 tracking-tight animate-in slide-in-from-bottom-2 fade-in duration-700">
          {t("greeting")}
        </h1>

        <div className="w-full animate-in slide-in-from-bottom-4 fade-in duration-700 delay-100 relative z-20">
          <InputBox onSend={onSendMessage} compact={false} />
        </div>

        <div className="flex gap-3 flex-wrap justify-center mt-10 animate-in slide-in-from-bottom-6 fade-in duration-1000 delay-200">
          {suggestions.map((s, i) => (
            <button
              key={i}
              className="flex items-center gap-2.5 px-4 py-2 border border-[#262626] rounded-xl text-[#999] text-[13.5px] font-medium bg-[#1a1a1a] hover:bg-[#222] hover:border-[#333] hover:text-[#ccc] transition-all shadow-sm group"
            >
              {s.color ? (
                <span
                  style={{ color: s.color }}
                  className="opacity-80 group-hover:opacity-100 transition-opacity"
                >
                  {s.icon}
                </span>
              ) : (
                <span className="text-[#666] group-hover:text-[#888] transition-colors">
                  {s.icon}
                </span>
              )}
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
