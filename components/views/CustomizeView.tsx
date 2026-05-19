"use client";

import { useState } from "react";
import { useI18n } from '@/lib/i18n';
import {
  Search,
  Plus,
  Upload,
  FolderOpen,
  Puzzle,
  FileJson,
  ArrowLeft,
} from "lucide-react";

export function CustomizeView() {
    const { t } = useI18n();
const [activeTab, setActiveTab] = useState<"skills" | "connectors">("skills");
  const [selectedItem, setSelectedItem] = useState<any>(null); // To view details

  if (selectedItem) {
    if (activeTab === "skills") {
      return (
        <SkillDetail
          skill={selectedItem}
          onBack={() => setSelectedItem(null)}
        />
      );
    } else {
      return (
        <ConnectorDetail
          connector={selectedItem}
          onBack={() => setSelectedItem(null)}
        />
      );
    }
  }

  return (
    <div className="flex-1 flex h-full border-l border-[#1f1f1f]">
      {/* Left panel */}
      <div className="w-[280px] bg-[#1a1a1a] border-r border-[#242424] h-full flex flex-col shrink-0">
        <div className="p-6 pb-2">
          <h2 className="font-serif text-2xl font-medium text-[#e8e6e3] mb-6">
            Personnaliser
          </h2>

          <div className="flex flex-col gap-1">
            <button
              onClick={() => setActiveTab("skills")}
              className={`w-full text-left px-3 py-2 rounded-lg text-[14px] transition-colors ${
                activeTab === "skills"
                  ? "bg-[#2a2a2a] text-[#e8e6e3]"
                  : "text-[#888] hover:bg-[#242424] hover:text-[#ccc]"
              }`}
            >
              {t("skills")}
            </button>
            <button
              onClick={() => setActiveTab("connectors")}
              className={`w-full text-left px-3 py-2 rounded-lg text-[14px] transition-colors ${
                activeTab === "connectors"
                  ? "bg-[#2a2a2a] text-[#e8e6e3]"
                  : "text-[#888] hover:bg-[#242424] hover:text-[#ccc]"
              }`}
            >
              {t("connectors")}
            </button>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 bg-[#141414] h-full overflow-y-auto">
        {activeTab === "skills" && (
          <div className="p-10 max-w-5xl mx-auto w-full animate-in fade-in duration-300">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-[20px] font-medium text-[#e8e6e3]">
                Compténces personnelles
              </h3>
              <button className="bg-[#e8e6e3] hover:bg-white text-[#111] transition-colors rounded-lg px-4 py-2 text-[13px] font-medium flex items-center gap-2">
                <Plus size={16} /> Ajouter une compétence
              </button>
            </div>

            <div className="bg-[#1a1a1a] border border-[#242424] rounded-xl overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#242424]">
                    <th className="px-5 py-3 text-[12px] text-[#555] font-medium uppercase tracking-wider">
                      Nom
                    </th>
                    <th className="px-5 py-3 text-[12px] text-[#555] font-medium uppercase tracking-wider">
                      Mise à jour
                    </th>
                    <th className="px-5 py-3 text-[12px] text-[#555] font-medium uppercase tracking-wider text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    className="border-b border-[#242424] hover:bg-[#222] transition-colors cursor-pointer"
                    onClick={() =>
                      setSelectedItem({
                        name: "skill-creator",
                        date: "24 juil. 2024",
                      })
                    }
                  >
                    <td className="px-5 py-4 text-[14px] text-[#ccc] font-medium">
                      skill-creator
                    </td>
                    <td className="px-5 py-4 text-[13px] text-[#888]">
                      24 juil. 2024
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button className="text-[#888] hover:text-[#ccc] text-[13px]">
                        Gérer
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-12">
              <h3 className="text-[20px] font-medium text-[#e8e6e3] mb-6">
                Compétences partagées par d&apos;autres
              </h3>
              <div className="text-[#888] text-[14px] bg-[#1a1a1a] p-8 rounded-xl border border-[#242424] text-center">
                Vous n&apos;avez pas encore ajouté de compétences partagées
              </div>
            </div>
          </div>
        )}

        {activeTab === "connectors" && (
          <div className="p-10 max-w-5xl mx-auto w-full animate-in fade-in duration-300">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-[20px] font-medium text-[#e8e6e3]">
                Connecteurs
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  name: "Google Drive",
                  type: "Web",
                  icon: <Upload size={20} className="text-[#4285F4]" />,
                  connected: true,
                },
                {
                  name: "Gmail",
                  type: "Web",
                  icon: <FolderOpen size={20} className="text-[#EA4335]" />,
                  connected: true,
                },
                {
                  name: "Google Calendar",
                  type: "Web",
                  icon: <Puzzle size={20} className="text-[#34A853]" />,
                  connected: true,
                },
                {
                  name: "Intégration GitHub",
                  type: "Web",
                  icon: <FolderOpen size={20} />,
                  connected: false,
                },
              ].map((c, i) => (
                <div
                  key={i}
                  className="bg-[#1a1a1a] border border-[#242424] rounded-xl flex items-center p-4 gap-4 cursor-pointer hover:bg-[#222]"
                  onClick={() => c.connected && setSelectedItem(c)}
                >
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center bg-[#2a2a2a]`}
                  >
                    {c.icon}
                  </div>
                  <div className="flex-1">
                    <div className="text-[15px] font-medium text-[#ccc]">
                      {c.name}
                    </div>
                    <div className="text-[12px] text-[#888]">{c.type}</div>
                  </div>
                  <div>
                    {c.connected ? (
                      <span className="text-[#888] text-[13px]">{t("connected")}</span>
                    ) : (
                      <button className="bg-[#e8e6e3] hover:bg-white text-[#111] text-[12px] px-3 py-1.5 rounded-lg font-medium">
                        Ajouter
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SkillDetail({ skill, onBack }: { skill: any; onBack: () => void }) {
  const [activeFile, setActiveFile] = useState("SKILL.md");

  return (
    <div className="flex-1 flex flex-col h-full bg-[#141414] animate-in slide-in-from-right-4 duration-300 relative z-10 w-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center px-6 py-4 border-b border-[#1f1f1f] bg-[#1a1a1a] gap-4">
        <button
          onClick={onBack}
          className="text-[#888] hover:text-[#ccc] p-1.5 rounded-md hover:bg-[#2a2a2a]"
        >
          <ArrowLeft size={18} />
        </button>
        <h2 className="text-[18px] font-serif text-[#e8e6e3]">{skill.name}</h2>
        <div className="flex-1" />
        <button className="bg-[#e8e6e3] hover:bg-white text-[#111] font-medium text-[13px] px-3 py-1.5 rounded-md">
          Modifier
        </button>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* File explorer */}
        <div className="w-[260px] bg-[#1a1a1a] border-r border-[#1f1f1f] overflow-y-auto">
          <div className="p-4">
            <div className="text-[11px] text-[#555] font-semibold uppercase tracking-wider mb-2 px-2">
              Fichiers
            </div>
            {["SKILL.md", "metadata.json"].map((f) => (
              <button
                key={f}
                onClick={() => setActiveFile(f)}
                className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-md text-[13px] text-left mb-0.5 ${
                  activeFile === f
                    ? "bg-[#2a2a2a] text-[#ccc]"
                    : "text-[#888] hover:bg-[#242424] hover:text-[#ccc]"
                }`}
              >
                <FileJson
                  size={14}
                  className={activeFile === f ? "text-[#ccc]" : "text-[#555]"}
                />
                {f}
              </button>
            ))}

            <div className="text-[11px] text-[#555] font-semibold uppercase tracking-wider mt-6 mb-2 px-2">
              agents
            </div>
            {["builder.js", "reviewer.js"].map((f) => (
              <button
                key={f}
                onClick={() => setActiveFile(`agents/${f}`)}
                className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-md text-[13px] text-left mb-0.5 ${
                  activeFile === `agents/${f}`
                    ? "bg-[#2a2a2a] text-[#ccc]"
                    : "text-[#888] hover:bg-[#242424] hover:text-[#ccc]"
                }`}
              >
                <FileJson
                  size={14}
                  className={
                    activeFile === `agents/${f}` ? "text-[#ccc]" : "text-[#555]"
                  }
                />
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* File content */}
        <div className="flex-1 bg-[#141414] overflow-y-auto">
          <div className="border-b border-[#242424] bg-[#1a1a1a] flex items-center px-4 py-2">
            <span className="text-[13px] text-[#888]">{activeFile}</span>
          </div>
          <div className="p-6">
            <pre className="text-[#ccc] text-[13px] font-mono whitespace-pre-wrap leading-relaxed">
              {`# ${activeFile}

This is a simulated preview of the file content based on the screenshot.
`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

function ConnectorDetail({
  connector,
  onBack,
}: {
  connector: any;
  onBack: () => void;
}) {
  const { t } = useI18n();
  return (
    <div className="flex-1 flex flex-col h-full bg-[#141414] animate-in slide-in-from-right-4 duration-300 w-full">
      <div className="flex items-center px-6 py-4 border-b border-[#1f1f1f] bg-[#1a1a1a] gap-4">
        <button
          onClick={onBack}
          className="text-[#888] hover:text-[#ccc] p-1.5 rounded-md hover:bg-[#2a2a2a]"
        >
          <ArrowLeft size={18} />
        </button>
        <h2 className="text-[18px] font-serif text-[#e8e6e3]">
          Détails du connecteur
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-10 max-w-4xl mx-auto w-full">
        <div className="flex items-start gap-6 mb-12">
          <div className="w-16 h-16 rounded-xl bg-[#2a2a2a] flex items-center justify-center shrink-0">
            {connector.icon}
          </div>
          <div>
            <h1 className="text-[28px] font-serif text-[#e8e6e3] mb-1">
              {connector.name}
            </h1>
            <div className="text-[14px] text-[#888] mb-4">
              Par Anthropic • {connector.type}
            </div>
            <p className="text-[15px] text-[#ccc] leading-relaxed max-w-2xl">
              Accédez à vos documents et données directement depuis{" "}
              {connector.name}. Connectez votre compte pour permettre à Claude
              de lire et comprendre vos fichiers lors de vos discussions.
            </p>

            <div className="mt-6 flex gap-3">
              <button className="bg-[#2a2a2a] text-[#ccc] px-4 py-2 rounded-lg text-[13px] font-medium hover:bg-[#333] transition-colors border border-[#3a3a3a]">
                Déconnecter
              </button>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-[18px] font-medium text-[#e8e6e3] mb-4">
            {t("permissions")}
          </h3>
          <div className="bg-[#1a1a1a] border border-[#242424] rounded-xl divide-y divide-[#242424]">
            <div className="p-4 flex gap-4">
              <Search className="text-[#888] shrink-0" size={20} />
              <div>
                <div className="text-[14px] text-[#ccc] font-medium mb-1">
                  {t("view_and_download_title")}
                </div>
                <div className="text-[13px] text-[#888]">
                  {t("view_and_download_desc")}
                </div>
              </div>
            </div>
            <div className="p-4 flex gap-4">
              <Upload className="text-[#888] shrink-0" size={20} />
              <div>
                <div className="text-[14px] text-[#ccc] font-medium mb-1">
                  {t("edit_and_create_title")}
                </div>
                <div className="text-[13px] text-[#888]">
                  {t("edit_and_create_desc")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
