"use client";

import { useState, useEffect, useCallback } from "react";
import { useI18n } from "@/lib/i18n";
import { Sidebar } from "@/components/Sidebar";
import { HomeView } from "@/components/views/HomeView";
import { ChatView } from "@/components/views/ChatView";
import { DiscussionsView } from "@/components/views/DiscussionsView";
import { ProjectsView } from "@/components/views/ProjectsView";
import { SearchModal } from "@/components/SearchModal";
import { SettingsPanel } from "@/components/SettingsPanel";
import { CustomizeView } from "@/components/views/CustomizeView";
import { conversations as staticConversations, dummyMessages, favorites as staticFavorites } from "@/lib/data";

import { ArtifactsView } from "@/components/views/ArtifactsView";

interface ChatMessage {
  id: number;
  role: "user" | "model" | "assistant";
  content: string;
}

interface Conversation {
  id: number;
  title: string;
  time: string;
  isFavorite?: boolean;
  messages: ChatMessage[];
}

export default function Page() {
  const { t } = useI18n();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [currentView, setCurrentView] = useState("home"); // home, chat, discussions, projects
  const [activeConvId, setActiveConvId] = useState<number | null>(null);

  const [showSearch, setShowSearch] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [artifactPanel, setArtifactPanelState] = useState<{ code: string; title: string; language: string; } | null>(null);

  const setArtifactPanel = useCallback((newPanel: { code: string; title: string; language: string; } | null) => {
    setArtifactPanelState((prev) => {
      if (!prev && !newPanel) return null;
      if (prev && newPanel) {
        if (
          prev.code === newPanel.code &&
          prev.language === newPanel.language &&
          prev.title === newPanel.title
        ) {
          return prev;
        }
      }
      return newPanel;
    });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarCollapsed(true);
      }
    };
    handleResize(); // trigger on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Dynamic conversations state, preloaded with a mix of favorites and recent chats from data.ts
  const [conversationsList, setConversationsList] = useState<Conversation[]>(() => {
    const favoriteItems = staticFavorites.map((f) => ({
      id: f.id,
      title: f.title,
      time: t("two_days_ago"),
      isFavorite: true,
      messages: [] as ChatMessage[]
    }));

    const recentItems = staticConversations.map((c) => ({
      id: c.id,
      title: c.title,
      time: c.time,
      isFavorite: false,
      messages: c.id === 1 ? (dummyMessages as ChatMessage[]) : [] as ChatMessage[]
    }));

    return [...favoriteItems, ...recentItems];
  });

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    const handleSwitch = (e: any) => {
      if (e.detail?.view) {
        setCurrentView(e.detail.view);
      }
    };
    window.addEventListener("switch-view", handleSwitch);
    return () => window.removeEventListener("switch-view", handleSwitch);
  }, []);

  // Actions
  useEffect(() => {
    const handleOpenArtifact = (e: any) => {
      const code = e.detail?.code || "";
      const language = e.detail?.language || "jsx";
      setArtifactPanel({
        title: `Artifact - ${language.toUpperCase()}`,
        code: code,
        language: language
      });
    };
    window.addEventListener("open-artifact", handleOpenArtifact);
    return () =>
      window.removeEventListener("open-artifact", handleOpenArtifact);
  }, [setArtifactPanel]);

  const handleNewChat = () => {
    setActiveConvId(null);
    setChatMessages([]);
    setCurrentView("home");
  };

  const handleSelectConversation = (conv: any) => {
    setActiveConvId(conv.id);
    const target = conversationsList.find((c) => c.id === conv.id);
    if (target) {
      setChatMessages(target.messages || []);
    } else {
      setChatMessages([]);
    }
    setCurrentView("chat");
  };

  const handleDeleteConversation = (id: number) => {
    setConversationsList((prev) => prev.filter((c) => c.id !== id));
    if (activeConvId === id) {
      setActiveConvId(null);
      setChatMessages([]);
      setCurrentView("home");
    }
  };

  const handleSearchResult = (item: any) => {
    if (item.type === "project") {
      const detail = { action: "detail", id: item.id };
      (window as any)._projectNav = detail;
      window.dispatchEvent(new CustomEvent("project-navigation", { detail }));
      setCurrentView("projects");
    } else {
      handleSelectConversation(item);
    }
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    let currentConvId = activeConvId;
    let fallbackUpdatedConvs = [...conversationsList];

    // Auto create a conversation if none is active
    if (currentConvId === null) {
      const newId = Date.now();
      const cleanTitle = text.length > 35 ? text.substring(0, 35) + "..." : text;
      const newConv: Conversation = {
        id: newId,
        title: cleanTitle,
        time: "à l'instant",
        isFavorite: false,
        messages: []
      };
      fallbackUpdatedConvs.unshift(newConv);
      currentConvId = newId;
      setActiveConvId(newId);
    }

    const userMsg: ChatMessage = { id: Date.now(), role: "user", content: text };
    const nextMessages = [...chatMessages, userMsg];
    
    setChatMessages(nextMessages);
    setConversationsList(
      fallbackUpdatedConvs.map((c) =>
        c.id === currentConvId ? { ...c, messages: nextMessages } : c
      )
    );

    if (currentView === "home") {
      setCurrentView("chat");
    }

    const thinkingId = Date.now() + 1;
    // Append loading placeholder
    const nextWithThinking = [
      ...nextMessages,
      { id: thinkingId, role: "model" as const, content: "..." }
    ];
    setChatMessages(nextWithThinking);

    try {
      const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
      const res = await fetch(`${baseUrl}/api/gemini/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: text }),
      });

      if (!res.ok) {
        throw new Error("Erreur de l'API");
      }

      const data = await res.json();
      const generatedText = data.text || t("no_response_error");

      setChatMessages((prev) => {
        const finalMsgs = prev.map((msg) =>
          msg.id === thinkingId ? { ...msg, content: generatedText } : msg
        );
        setConversationsList((currentList) =>
          currentList.map((c) =>
            c.id === currentConvId ? { ...c, messages: finalMsgs } : c
          )
        );
        return finalMsgs;
      });
    } catch (err) {
      console.error(err);
      setChatMessages((prev) => {
        const finalErrorMsgs = prev.map((msg) =>
          msg.id === thinkingId
            ? {
                ...msg,
                content: t("connection_error"),
              }
            : msg
        );
        setConversationsList((currentList) =>
          currentList.map((c) =>
            c.id === currentConvId ? { ...c, messages: finalErrorMsgs } : c
          )
        );
        return finalErrorMsgs;
      });
    }
  };

  const handleRegenerateMessage = async (messageIndex: number) => {
    if (messageIndex === 0) return;
    
    // Find the prompt associated with the message before this index
    const userMsg = chatMessages[messageIndex - 1];
    if (!userMsg || userMsg.role !== "user") return;

    const promptText = userMsg.content;
    const prefixMessages = chatMessages.slice(0, messageIndex);
    const thinkingId = Date.now();

    const nextMessages = [
      ...prefixMessages,
      { id: thinkingId, role: "model" as const, content: "..." }
    ];

    setChatMessages(nextMessages);
    setConversationsList((currentList) =>
      currentList.map((c) =>
        c.id === activeConvId ? { ...c, messages: nextMessages } : c
      )
    );

    try {
      const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
      const res = await fetch(`${baseUrl}/api/gemini/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: promptText }),
      });

      if (!res.ok) throw new Error("Erreur");
      const data = await res.json();
      const generatedText = data.text || t("no_response_error");

      setChatMessages((prev) => {
        const finalMsgs = prev.map((msg) =>
          msg.id === thinkingId ? { ...msg, content: generatedText } : msg
        );
        setConversationsList((currentList) =>
          currentList.map((c) =>
            c.id === activeConvId ? { ...c, messages: finalMsgs } : c
          )
        );
        return finalMsgs;
      });
    } catch (err) {
      console.error(err);
      setChatMessages((prev) => {
        const finalErrorMsgs = prev.map((msg) =>
          msg.id === thinkingId ? { ...msg, content: t("generation_error") } : msg
        );
        setConversationsList((currentList) =>
          currentList.map((c) =>
            c.id === activeConvId ? { ...c, messages: finalErrorMsgs } : c
          )
        );
        return finalErrorMsgs;
      });
    }
  };

  return (
    <div className="flex w-full h-screen overflow-hidden bg-[#141414] text-[#e8e6e3] font-sans">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
        currentView={currentView}
        setCurrentView={setCurrentView}
        onNewChat={handleNewChat}
        onSearch={() => setShowSearch(true)}
        onSelectConversation={handleSelectConversation}
        activeConvId={activeConvId}
        onOpenSettings={() => setShowSettings(true)}
        conversationsList={conversationsList}
        onDeleteConversation={handleDeleteConversation}
      />

      <main className="flex-1 flex flex-col min-w-0 bg-[#141414] overflow-hidden relative selection:bg-[#444] selection:text-white">
        {currentView === "home" && (
          <HomeView onSendMessage={handleSendMessage} />
        )}

        {currentView === "chat" && (
          <ChatView
            messages={chatMessages}
            onSendMessage={handleSendMessage}
            onRegenerate={handleRegenerateMessage}
            activeConv={
              activeConvId
                ? conversationsList.find((c) => c.id === activeConvId) || {
                    id: activeConvId,
                    title: "Nouvelle conversation",
                  }
                : { id: 0, title: "Nouvelle conversation" }
            }
            artifactPanel={artifactPanel}
            setArtifactPanel={setArtifactPanel}
          />
        )}

        {currentView === "discussions" && (
          <DiscussionsView
            onSelectConv={handleSelectConversation}
            onNewConv={handleNewChat}
            conversationsList={conversationsList}
          />
        )}

        {currentView === "projects" && <ProjectsView />}

        {currentView === "artifacts" && <ArtifactsView />}

        {currentView === "customize" && <CustomizeView />}
      </main>

      {/* Modals */}
      {showSearch && (
        <SearchModal
          onClose={() => setShowSearch(false)}
          onSelect={handleSearchResult}
        />
      )}

      {showSettings && <SettingsPanel onClose={() => setShowSettings(false)} />}
    </div>
  );
}
