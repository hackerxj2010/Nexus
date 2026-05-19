"use client";

import { ClaudeLogo } from "@/components/icons/ClaudeLogo";
import { InputBox } from "@/components/InputBox";
import {
  ChevronDown,
  Copy,
  ThumbsUp,
  ThumbsDown,
  RefreshCcw,
  X,
  Grid,
  Check,
} from "lucide-react";
import { useEffect, useRef, useState, useMemo } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { useI18n } from "@/lib/i18n";
import { CodeBlock } from "@/components/CodeBlock";

interface Message {
  role: "user" | "assistant" | "model";
  content: string;
}

interface ChatViewProps {
  activeConv: { id: number; title: string } | null;
  messages: Message[];
  artifactPanel: { code: string; title: string; language: string; } | null;
  setArtifactPanel: (panel: { code: string; title: string; language: string; } | null) => void;
  onSendMessage: (msg: string) => void;
  onRegenerate?: (index: number) => void;
}

export function ChatView({
  activeConv,
  messages,
  artifactPanel,
  setArtifactPanel,
  onSendMessage,
  onRegenerate,
}: ChatViewProps) {
  const { t } = useI18n();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (artifactPanel) {
      const preferredTab = (artifactPanel.language === 'html' || artifactPanel.language === 'svg') ? 'preview' : 'code';
      const timer = setTimeout(() => {
        setActiveTab(preferredTab);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [artifactPanel]);

  return (
    <div className="flex-1 flex overflow-hidden">
      <div className="flex-1 flex flex-col h-full relative">
        {/* Chat header */}
        <div className="flex items-center px-6 py-3.5 border-b border-[#1f1f1f] gap-3 bg-[#141414]/95 backdrop-blur-md z-10 sticky top-0 transition-all">
          <span className="text-[14px] text-[#ccc] font-sans truncate max-w-[300px] font-medium tracking-wide">
            {activeConv?.title || t("new_conversation")}
          </span>
          <ChevronDown size={14} className="text-[#555] cursor-pointer hover:text-[#e8e6e3] transition-colors" />
          <div className="flex-1" />
          <button className="text-[#666] p-1.5 hover:text-[#ccc] transition-colors rounded-md">
            <Copy size={15} />
          </button>
          <button className="bg-[#e8e6e3] text-[#111] rounded-lg px-4 py-1.5 text-[13px] font-semibold hover:bg-white transition-colors shadow-sm">
            {t("share")}
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 md:px-10 py-8 scrollbar-hide">
          <div className="max-w-3xl mx-auto flex flex-col gap-10 pb-8">
            {messages.map((msg, i) => (
              <MessageBubble key={i} msg={msg} index={i} onRegenerate={onRegenerate} setArtifactPanel={setArtifactPanel} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input area */}
        <div className="px-4 md:px-10 pb-6 pt-4 flex flex-col items-center bg-[#141414] shrink-0 relative z-30">
          <div className="max-w-3xl w-full">
            <InputBox onSend={onSendMessage} compact={true} />
            <p className="text-[12px] text-[#666] mt-3 text-center tracking-wide">
              {t("claude_warning")}
            </p>
          </div>
        </div>
      </div>

      {/* Artifact panel */}
      {artifactPanel && (
        <>
          {/* Mobile overlay backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs z-30 lg:hidden animate-in fade-in duration-300"
            onClick={() => setArtifactPanel(null)}
          />
          <div className="w-full sm:w-[500px] lg:w-[500px] xl:w-[600px] fixed lg:relative inset-y-0 right-0 z-40 border-l border-[#1f1f1f] flex flex-col bg-[#141414] animate-in slide-in-from-right-2 duration-300 shadow-2xl shrink-0">
          <div className="flex items-center px-4 py-2 border-b border-[#1f1f1f] bg-[#1a1a1a]">
            <div className="flex gap-2">
              <button 
                onClick={() => setActiveTab('preview')}
                className={`px-3.5 py-1.5 text-[13px] rounded-md transition-colors font-medium ${activeTab === 'preview' ? 'bg-[#2a2a2a] text-[#ccc] border border-[#333] shadow-sm' : 'text-[#888] hover:text-[#ccc] hover:bg-[#222]'}`}
              >
                {t("preview")}
              </button>
              <button 
                onClick={() => setActiveTab('code')}
                className={`px-3.5 py-1.5 text-[13px] rounded-md transition-colors font-medium ${activeTab === 'code' ? 'bg-[#2a2a2a] text-[#ccc] border border-[#333] shadow-sm' : 'text-[#888] hover:text-[#ccc] hover:bg-[#222]'}`}
              >
                {t("code")}
              </button>
            </div>

            <div className="flex-1" />

            <button className="text-[#888] hover:text-[#ccc] hover:bg-[#2a2a2a] rounded-md px-2.5 py-1.5 text-[13px] flex items-center gap-1.5 transition-colors">
              <Copy size={13} /> {t("copy")}
            </button>
            <button className="text-[#888] hover:text-[#ccc] hover:bg-[#2a2a2a] rounded-md px-2.5 py-1.5 text-[13px] flex items-center gap-1.5 transition-colors">
              <RefreshCcw size={13} /> {t("publish")}
            </button>

            <div className="w-px h-4 bg-[#333] mx-2"></div>

            <button
              onClick={() => setArtifactPanel(null)}
              className="text-[#888] hover:text-[#ccc] hover:bg-[#2a2a2a] rounded-md transition-colors p-1.5"
            >
              <X size={16} />
            </button>
          </div>
          <div className="bg-[#1e1e1e] flex items-center px-4 py-2.5 border-b border-[#242424]">
            <span className="text-[12.5px] text-[#888] font-mono font-medium truncate">
              {artifactPanel.title}
            </span>
          </div>
          <div className="flex-1 p-0 overflow-hidden relative">
            {activeTab === 'code' ? (
              <div className="w-full h-full overflow-y-auto bg-[#1e1e1e] text-[#d4d4d4] p-6 text-[13px] font-mono whitespace-pre-wrap">
                {artifactPanel.code}
              </div>
            ) : (
              <div className="w-full h-full bg-white relative">
                {artifactPanel.language === 'html' || artifactPanel.language === 'svg' ? (
                  <iframe 
                    className="w-full h-full border-none"
                    srcDoc={artifactPanel.code}
                    title="Preview"
                    sandbox="allow-scripts allow-same-origin"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-black p-8 relative">
                    <div className="w-full h-full border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center bg-gray-50/50">
                      <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-blue-200/50">
                        <Grid size={32} />
                      </div>
                      <h3 className="text-2xl font-bold mb-3 tracking-tight text-gray-800 text-center">
                        {artifactPanel.title}
                      </h3>
                      <p className="text-gray-500 text-center max-w-sm mb-6 text-sm leading-relaxed">
                        Interactive preview for {artifactPanel.language} is not directly supported in the browser without compilation. View the source code.
                      </p>
                      <button 
                        onClick={() => setActiveTab('code')}
                        className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-medium shadow-md shadow-blue-500/20 hover:bg-blue-700 transition-colors"
                      >
                        {t("voir_le_code")}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* Download/Copy overlay */}
            <div className="absolute bottom-6 right-6 flex gap-2">
              <button 
                onClick={() => navigator.clipboard.writeText(artifactPanel.code)}
                className="w-10 h-10 bg-black/5 hover:bg-black/10 backdrop-blur-md border border-black/10 text-black/60 rounded-full flex items-center justify-center shadow-sm transition-all focus:outline-none"
              >
                <Copy size={16} />
              </button>
            </div>
          </div>
        </div>
      </>
    )}
    </div>
  );
}

function MessageBubble({ msg, index, onRegenerate, setArtifactPanel }: { msg: Message | any; index?: number; onRegenerate?: (index: number) => void; setArtifactPanel?: (panel: any) => void }) {
  const { t } = useI18n();
  const isUser = msg.role === "user";
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(msg.content);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const markdownComponents = useMemo(() => ({
    code: (props: any) => (
      <CodeBlock 
        {...props} 
        onOpenInArtifact={(code: string, language: string) => {
          if (setArtifactPanel) {
            setArtifactPanel({
              code,
              title: t("fichier_genere"),
              language
            });
          }
        }} 
      />
    ),
    p: ({ children }: any) => <div className="mb-4 text-[15.5px] leading-relaxed last:mb-0 text-[#d4d4d4] font-sans">{children}</div>,
    a: ({ children, href }: any) => <a href={href} className="text-[#3a7bd5] hover:underline underline-offset-2">{children}</a>,
    ul: ({ children }: any) => <ul className="list-disc pl-5 mb-4 text-[#d4d4d4] space-y-1">{children}</ul>,
    ol: ({ children }: any) => <ol className="list-decimal pl-5 mb-4 text-[#d4d4d4] space-y-1">{children}</ol>,
    li: ({ children }: any) => <li className="pl-1 text-[15.5px] leading-relaxed">{children}</li>,
    h1: ({ children }: any) => <h1 className="text-2xl font-serif font-bold text-[#e8e6e3] mb-4 mt-6">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-xl font-serif font-semibold text-[#e8e6e3] mb-3 mt-5">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-lg font-serif font-medium text-[#e8e6e3] mb-2 mt-4">{children}</h3>,
    div: ({ children, className, ...rest }: any) => {
      const cleanRest = { ...rest };
      delete cleanRest.onClick;
      delete cleanRest.onClickCapture;
      return <div className={className} {...cleanRest}>{children}</div>;
    },
    button: ({ children, className, ...rest }: any) => {
      const cleanRest = { ...rest };
      delete cleanRest.onClick;
      delete cleanRest.onClickCapture;
      return <button className={className} {...cleanRest}>{children}</button>;
    },
    span: ({ children, className, ...rest }: any) => {
      const cleanRest = { ...rest };
      delete cleanRest.onClick;
      delete cleanRest.onClickCapture;
      return <span className={className} {...cleanRest}>{children}</span>;
    },
  }), [setArtifactPanel, t]);

  return (
    <div
      className={`flex w-full group ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`flex flex-col gap-1.5 ${
          isUser ? "items-end w-full max-w-[80%] sm:max-w-[70%]" : "items-start w-full leading-relaxed"
        }`}
      >
        {!isUser && (
          <div className="flex items-center gap-3 mb-1.5 ml-1">
            <div className="w-8 h-8 rounded-xl bg-[#da7756]/15 flex items-center justify-center border border-[#da7756]/30 shadow-sm">
              <ClaudeLogo size={18} />
            </div>
            <span className="text-[14.5px] font-serif font-bold text-[#e8e6e3] tracking-wide">
              Claude
            </span>
          </div>
        )}
        <div
          className={`w-full ${
            isUser
              ? "bg-[#2f2f2f] text-[#f2f2f2] rounded-3xl px-5 py-3 whitespace-pre-wrap border border-[#3a3a3a] text-[15px] font-sans leading-relaxed shadow-sm block"
              : "text-[#e8e6e3] pl-[46px]" // 32px avatar + 14px gap
          }`}
        >
          {isUser ? (
            msg.content
          ) : (
            <div className="markdown-body">
              <Markdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={markdownComponents}
              >
                {msg.content}
              </Markdown>
            </div>
          )}
        </div>
        {!isUser && (
          <div className="flex gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pl-[46px]">
            {/* Copier */}
            <button
              onClick={handleCopy}
              className={`p-1.5 rounded-lg transition-colors border border-transparent hover:border-[#333] flex items-center gap-1 ${
                copied ? "text-green-500 bg-[#2a2a2a]/40" : "text-[#666] hover:text-[#ccc] hover:bg-[#2a2a2a]"
              }`}
              title={t("copier_message")}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
            </button>

            {/* Aimer */}
            <button
              onClick={() => {
                setLiked(!liked);
                setDisliked(false);
              }}
              className={`p-1.5 rounded-lg transition-colors border border-transparent hover:border-[#333] flex items-center gap-1 ${
                liked ? "text-green-500 bg-[#2a2a2a]/60 font-semibold" : "text-[#666] hover:text-[#ccc] hover:bg-[#2a2a2a]"
              }`}
              title={t("aimer_reponse")}
            >
              <ThumbsUp size={14} fill={liked ? "currentColor" : "none"} />
            </button>

            {/* Désaimer */}
            <button
              onClick={() => {
                setDisliked(!disliked);
                setLiked(false);
              }}
              className={`p-1.5 rounded-lg transition-colors border border-transparent hover:border-[#333] flex items-center gap-1 ${
                disliked ? "text-orange-400 bg-[#2a2a2a]/60 font-semibold" : "text-[#666] hover:text-[#ccc] hover:bg-[#2a2a2a]"
              }`}
              title={t("desaimer_reponse")}
            >
              <ThumbsDown size={14} fill={disliked ? "currentColor" : "none"} />
            </button>

            {/* Régénérer */}
            {onRegenerate && index !== undefined && (
              <button
                onClick={() => onRegenerate(index)}
                className="text-[#666] hover:text-[#ccc] hover:bg-[#2a2a2a] p-1.5 rounded-lg transition-on-hover border border-transparent hover:border-[#333]"
                title={t("regenerer_reponse")}
              >
                <RefreshCcw size={14} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
