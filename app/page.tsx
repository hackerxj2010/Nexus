"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { HomeView } from "@/components/views/HomeView";
import { ChatView } from "@/components/views/ChatView";
import { DiscussionsView } from "@/components/views/DiscussionsView";
import { ProjectsView } from "@/components/views/ProjectsView";
import { SearchModal } from "@/components/SearchModal";
import { SettingsPanel } from "@/components/SettingsPanel";
import { CustomizeView } from "@/components/views/CustomizeView";
import { conversations, dummyMessages } from "@/lib/data";

import { ArtifactsView } from "@/components/views/ArtifactsView";

export default function Page() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [currentView, setCurrentView] = useState("home"); // home, chat, discussions, projects
  const [activeConvId, setActiveConvId] = useState<number | null>(null);

  const [showSearch, setShowSearch] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [artifactPanel, setArtifactPanel] = useState<{ code: string; title: string; language: string; } | null>(null);

  const [chatMessages, setChatMessages] = useState<any[]>([]);

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
  }, []);

  const handleNewChat = () => {
    setActiveConvId(null);
    setChatMessages([]);
    setCurrentView("home");
  };

  const handleSelectConversation = (conv: any) => {
    setActiveConvId(conv.id);
    // Load some dummy messages if present, or fallback
    setChatMessages(dummyMessages);
    setCurrentView("chat");
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

    // Add user message
    const newMsg = { id: Date.now(), role: "user", content: text };
    setChatMessages((prev) => [...prev, newMsg]);

    // Switch to chat view if in home
    if (currentView === "home") {
      setCurrentView("chat");
    }

    try {
      // Create a simulated AI stream feeling, but eventually replacing by real api call
      setChatMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: "model", content: "..." },
      ]);

      const res = await fetch("/api/gemini/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: text }),
      });

      if (!res.ok) {
        throw new Error("Erreur de l'API");
      }

      const data = await res.json();

      setChatMessages((prev) =>
        prev.map((msg) =>
          msg.content === "..." ? { ...msg, content: data.text } : msg,
        ),
      );
    } catch (err) {
      console.error(err);
      setChatMessages((prev) =>
        prev.map((msg) =>
          msg.content === "..."
            ? {
                ...msg,
                content:
                  "Désolé, une erreur s'est produite lors de la connexion au modèle.",
              }
            : msg,
        ),
      );
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
      />

      <main className="flex-1 flex flex-col min-w-0 bg-[#141414] overflow-hidden relative selection:bg-[#444] selection:text-white">
        {currentView === "home" && (
          <HomeView onSendMessage={handleSendMessage} />
        )}

        {currentView === "chat" && (
          <ChatView
            messages={chatMessages}
            onSendMessage={handleSendMessage}
            activeConv={
              activeConvId
                ? conversations.find((c) => c.id === activeConvId) || {
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
