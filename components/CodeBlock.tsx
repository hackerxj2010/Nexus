"use client";

import { Copy, Code, Check, ExternalLink } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useI18n } from "@/lib/i18n";

export function CodeBlock({ children, className, node, onOpenInArtifact, ...rest }: any) {
  const { t } = useI18n();
  const match = /language-(\w+)/.exec(className || "");
  const language = match?.[1] || "code";
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");

  const codeString = String(children).replace(/\n$/, "");

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const onOpenInArtifactRef = useRef(onOpenInArtifact);
  useEffect(() => {
    onOpenInArtifactRef.current = onOpenInArtifact;
  }, [onOpenInArtifact]);

  // Automatically trigger loading the generated code in the artifact split-pane
  useEffect(() => {
    if (onOpenInArtifactRef.current) {
      // Trigger opening automatically when the component mounts
      onOpenInArtifactRef.current(codeString, language);
    }
  }, [codeString, language]);

  return className ? (
    <div className="rounded-xl overflow-hidden bg-[#181818] border border-[#262626] my-4 shadow-xl font-sans max-w-full md:max-w-xl transition-all">
      {/* Header with Switcher */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#1e1e1e] border-b border-[#262626]">
        <div className="flex items-center gap-1.5 overflow-x-auto selection:bg-transparent">
          <span className="text-xs text-[#aaa] font-mono tracking-wide shrink-0">
            {t("file")} {language.toUpperCase()}
          </span>
          <div className="h-3 w-px bg-[#333] mx-1 mr-2" />
          
          <div className="flex bg-[#121212] p-0.5 rounded-lg border border-[#262626] shrink-0">
            <button
              onClick={() => setActiveTab("preview")}
              className={`px-2.5 py-1 text-[11px] rounded transition-all font-medium ${
                activeTab === "preview"
                  ? "bg-[#2a2a2a] text-[#f5f5f5] shadow-xs"
                  : "text-[#777] hover:text-[#ccc]"
              }`}
            >
              {t("preview")}
            </button>
            <button
              onClick={() => setActiveTab("code")}
              className={`px-2.5 py-1 text-[11px] rounded transition-all font-medium ${
                activeTab === "code"
                  ? "bg-[#2a2a2a] text-[#f5f5f5] shadow-xs"
                  : "text-[#777] hover:text-[#ccc]"
              }`}
            >
              {t("code")}
            </button>
          </div>
        </div>
        <button 
          onClick={handleCopy}
          className="text-[#888] hover:text-[#ccc] transition-colors flex items-center gap-1.5 text-[11px] shrink-0"
        >
          {copied ? <Check size={11} className="text-green-500" /> : <Copy size={11} />} {t("copy")}
        </button>
      </div>
      
      {/* Tab Context Content */}
      {activeTab === "preview" ? (
        <div className="p-5 flex flex-col gap-4">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-400 shrink-0">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <div>
              <h4 className="text-[14px] font-semibold text-[#f5f5f5]">{t("web_app_interactive_preview")}</h4>
              <p className="text-[12px] text-[#8e9aa8] mt-1 leading-relaxed">
                {t("interactive_preview_loaded_desc")}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              if (onOpenInArtifact) {
                onOpenInArtifact(codeString, language);
              }
            }}
            className="w-full py-2 px-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-lg text-xs font-semibold shadow-md shadow-blue-500/15 transition-all flex items-center justify-center gap-2 border border-blue-400/20 active:scale-[0.98]"
          >
            <ExternalLink size={13} />
            {t("view_in_preview_and_code")}
          </button>
        </div>
      ) : (
        <div className="p-4 bg-[#141414] overflow-x-auto max-h-[350px] overflow-y-auto scrollbar-thin text-[#d4d4d4]">
          <pre className="font-mono text-[12px] leading-relaxed whitespace-pre select-text">
            <code {...rest} className={className}>
              {children}
            </code>
          </pre>
        </div>
      )}
    </div>
  ) : (
    <code {...rest} className="bg-[#2a2a2a] text-[#e8e6e3] px-1.5 py-0.5 rounded-md font-mono text-[13.5px]">
      {children}
    </code>
  );
}
