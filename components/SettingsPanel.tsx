"use client";

import { useState } from "react";
import { useI18n } from '@/lib/i18n';
import { X } from "lucide-react";

interface SettingsPanelProps {
  onClose: () => void;
}

export function SettingsPanel({ onClose }: SettingsPanelProps) {
    const { t } = useI18n();
const [activeTab, setActiveTab] = useState('general');
  const tabs = [
    { id: 'general', label: t("general") },
    { id: 'account', label: "Compte" },
    { id: 'privacy', label: t("privacy") },
    { id: 'billing', label: "Facturation" },
    { id: 'capabilities', label: t("capabilities") },
    { id: 'connectors', label: "Connecteurs" },
    { id: 'claude_code', label: "Claude Code" },
  ];

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-[#1a1a1a] rounded-[20px] w-full max-w-4xl max-h-[85vh] flex border border-[#2a2a2a] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#666] hover:text-[#ccc] transition-colors p-1"
        >
          <X size={20} />
        </button>

        {/* Sidebar */}
        <div className="w-[220px] border-r border-[#242424] py-6 flex flex-col shrink-0">
          <div className="px-5 pb-5 text-[20px] font-serif font-medium text-[#e8e6e3]">
            {t("settings")}
          </div>
          <div className="flex-1 overflow-y-auto px-2">
            {tabs.map((tab) => (
                <button
                  key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-[13.5px] transition-colors ${
                  activeTab === tab.id
                    ? "bg-[#2a2a2a] text-[#e8e6e3]"
                    : "text-[#888] hover:bg-[#242424] hover:text-[#ccc]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-8 overflow-y-auto bg-[#1a1a1a] scrollbar-hide">
          <div className="max-w-2xl">
            {activeTab === 'general' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
                <div>
                  <h3 className="font-serif text-[18px] text-[#e8e6e3] font-medium mb-6">
                    Profil
                  </h3>
                  <div className="space-y-4">
                    <SettingRow label={t("avatar")} type="avatar" val="J" />
                    <SettingRow label={t("full_name")} type="input" val="Jean" />
                    <SettingRow
                      label="Comment souhaitez-vous que Claude vous appelle ?"
                      type="input"
                      val="Create a prompt for me that say"
                    />
                    <SettingRow
                      label="Quelle est la meilleure description de votre travail ?"
                      type="select"
                      val={t("select")}
                    />
                  </div>
                </div>

                <div>
                  <h3 className="font-serif text-[18px] text-[#e8e6e3] font-medium mb-2">
                    Instructions pour Claude
                  </h3>
                  <p className="text-[12.5px] text-[#666] mb-4">
                    Claude gardera ces éléments à l'esprit dans les chats et
                    Cowork, conformément aux directives d'Anthropic.{" "}
                    <a href="#" className="underline">
                      En savoir plus
                    </a>
                  </p>
                  <textarea
                    placeholder="p. ex. poser des questions de clarification avant de donner des réponses détaillées"
                    className="w-full min-h-[120px] bg-[#242424] border border-[#333] rounded-[10px] p-3 text-[#ccc] text-[13px] resize-y outline-none focus:border-[#555] transition-colors"
                  />
                </div>

                <div>
                  <h3 className="font-serif text-[18px] text-[#e8e6e3] font-medium mb-6">
                    Préférences
                  </h3>
                  <div className="space-y-4">
                    <SettingRow label={t("appearance")} type="toggle" val="Dark" />
                    <SettingRow
                      label={t("chat_font")}
                      type="select"
                      val="Anthropic Serif"
                    />
                    <SettingRow label={t("voice")} type="select" val="Buttery" />
                  </div>
                </div>
              </div>
            )}

            {activeTab !== 'general' &&
              activeTab !== "Compte" &&
              activeTab !== 'privacy' &&
              activeTab !== 'capabilities' && (
                <div className="animate-in fade-in slide-in-from-bottom-2">
                  <h3 className="font-serif text-[24px] text-[#e8e6e3] font-medium mb-6">
                    {activeTab}
                  </h3>
                  <p className="text-[#888] text-[14px]">
                    Settings for {activeTab} will appear here.
                  </p>
                </div>
              )}

            {activeTab === "Compte" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
                <div>
                  <h3 className="font-serif text-[18px] text-[#e8e6e3] font-medium mb-6">
                    Sécurité
                  </h3>
                  <div className="space-y-4">
                    <button className="bg-[#242424] hover:bg-[#2a2a2a] text-[#ccc] border border-[#333] rounded-lg px-4 py-2 text-[13px] font-medium transition-colors w-full text-left">
                      Se déconnecter de tous les appareils
                    </button>
                    <button className="bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 rounded-lg px-4 py-2 text-[13px] font-medium transition-colors w-full text-left">
                      Supprimer votre compte
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="font-serif text-[18px] text-[#e8e6e3] font-medium mb-4">
                    Détails de l'organisation
                  </h3>
                  <div className="flex items-center justify-between py-3 border-b border-[#222]/50">
                    <span className="text-[13.5px] text-[#bbb]">
                      ID d'organisation
                    </span>
                    <span className="text-[13px] text-[#888] font-mono">
                      org_8b9...f2a
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-[#222]/50">
                    <span className="text-[13.5px] text-[#bbb]">
                      Explications rapides aux questions d'informations
                    </span>
                    <span className="text-[13px] text-[#888]">{t("disabled")}</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-serif text-[18px] text-[#e8e6e3] font-medium mb-4">
                    Sessions actives
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-[#1e1e1e] border border-[#242424] rounded-xl">
                      <div>
                        <div className="text-[14px] text-[#ccc] font-medium">
                          Paris, France
                        </div>
                        <div className="text-[12px] text-[#888]">
                          Mac OS • Chrome
                        </div>
                      </div>
                      <div className="text-[12px] text-[#5db075]">Actuelle</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'privacy' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
                <div className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl p-5 relative overflow-hidden">
                  <h3 className="font-serif text-[18px] text-[#e8e6e3] font-medium mb-2 relative z-10">
                    Confidentialité
                  </h3>
                  <p className="text-[13px] text-[#aaa] max-w-[85%] relative z-10 leading-relaxed">
                    Anthropic s'engage à protéger les données. Nous ne formons
                    jamais nos modèles avec les données avec lesquelles vous
                    discutez.
                  </p>
                </div>

                <div>
                  <h3 className="font-serif text-[18px] text-[#e8e6e3] font-medium mb-6">
                    Préférences
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start justify-between py-3 border-b border-[#222]/50 gap-4">
                      <div className="max-w-md">
                        <div className="text-[14px] text-[#ccc] font-medium">
                          Métadonnées de localisation
                        </div>
                        <div className="text-[12px] text-[#888] mt-1">
                          Autoriser l'envoi de l'emplacement approximatif lors
                          de l'utilisation de Claude.
                        </div>
                      </div>
                      <div className="w-10 h-6 bg-[#3a7bd5] rounded-full relative cursor-pointer">
                        <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1"></div>
                      </div>
                    </div>

                    <div className="flex items-start justify-between py-3 border-b border-[#222]/50 gap-4">
                      <div className="max-w-md">
                        <div className="text-[14px] text-[#ccc] font-medium">
                          Aider à améliorer Claude
                        </div>
                        <div className="text-[12px] text-[#888] mt-1">
                          Autoriser l'utilisation des données de discussion pour
                          améliorer directement les modèles.
                        </div>
                      </div>
                      <div className="w-10 h-6 bg-[#333] rounded-full relative cursor-pointer">
                        <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-serif text-[18px] text-[#e8e6e3] font-medium mb-6">
                    Vos données
                  </h3>
                  <div className="space-y-4">
                    <button className="bg-[#242424] hover:bg-[#2a2a2a] text-[#ccc] border border-[#333] rounded-lg px-4 py-2 text-[13px] font-medium transition-colors w-full text-left">
                      Exporter les données
                    </button>
                    <button className="bg-[#242424] hover:bg-[#2a2a2a] text-[#ccc] border border-[#333] rounded-lg px-4 py-2 text-[13px] font-medium transition-colors w-full text-left">
                      Conversations partagées
                    </button>
                    <button className="bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 rounded-lg px-4 py-2 text-[13px] font-medium transition-colors w-full text-left">
                      Supprimer les données
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'capabilities' && (
              <div className="animate-in fade-in slide-in-from-bottom-2">
                <div className="flex gap-4 border-b border-[#242424] mb-8 overflow-x-auto scrollbar-hide pb-2">
                  {[
                    t("memory"),
                    t("general"),
                    "Visuels",
                    "Exécution de code et création de fichiers",
                  ].map((st) => (
                    <button
                      key={st}
                      className="text-[#888] hover:text-[#ccc] text-[13px] font-medium whitespace-nowrap pb-1"
                    >
                      {st}
                    </button>
                  ))}
                </div>

                <div className="space-y-8">
                  <div>
                    <h3 className="font-serif text-[18px] text-[#e8e6e3] font-medium mb-6">
                      Aperçu des capacités
                    </h3>
                    <p className="text-[#aaa] text-[13.5px] leading-relaxed mb-6">
                      Basculez des fonctionnalités avancées pour étendre les
                      capacités de Claude. Certaines fonctionnalités sont en
                      preview limitée.
                    </p>

                    <div className="flex items-start justify-between py-4 border-b border-[#222]/50 gap-4">
                      <div className="max-w-md">
                        <div className="text-[14px] text-[#e8e6e3] font-medium">
                          Exécution de code de création de fichiers
                        </div>
                        <div className="text-[12.5px] text-[#888] mt-1">
                          Autorisez Claude à écrire, exécuter et stocker des
                          fichiers de code dans un environnement d'exécution
                          pour répondre de manière experte à des commandes
                          complexes.
                        </div>
                      </div>
                      <div className="w-10 h-6 bg-[#3a7bd5] rounded-full relative cursor-pointer">
                        <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1"></div>
                      </div>
                    </div>

                    <div className="flex items-start justify-between py-4 border-b border-[#222]/50 gap-4">
                      <div className="max-w-md">
                        <div className="text-[14px] text-[#e8e6e3] font-medium">
                          Artéfacts propulsés par l'IA
                        </div>
                        <div className="text-[12.5px] text-[#888] mt-1">
                          Laissez Claude créer des extraits de code interactifs,
                          des flux de documents ou des visualisations de données
                          de manière transparente.
                        </div>
                      </div>
                      <div className="w-10 h-6 bg-[#3a7bd5] rounded-full relative cursor-pointer">
                        <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingRow({
  label,
  type,
  val,
}: {
  label: string;
  type: string;
  val: string;
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-[#222]/50 gap-4">
      <span className="text-[13.5px] text-[#bbb] leading-snug max-w-[200px]">
        {label}
      </span>

      {type === "avatar" && (
        <div className="w-9 h-9 rounded-full bg-[#3a3a3a] flex items-center justify-center text-[14px] text-[#ccc] font-medium">
          {val}
        </div>
      )}

      {type === "input" && (
        <input
          defaultValue={val}
          className="bg-[#242424] border border-[#333] rounded-lg px-3 py-1.5 text-[#ccc] text-[13px] min-w-[260px] outline-none focus:border-[#555] transition-colors"
        />
      )}

      {type === "select" && (
        <div className="bg-[#242424] border border-[#333] rounded-lg px-3 py-1.5 text-[#bbb] text-[13px] outline-none focus:border-[#555] transition-colors min-w-[180px] flex justify-between items-center cursor-pointer">
          {val}
          <span className="text-[10px] ml-2 opacity-50">▼</span>
        </div>
      )}

      {type === "toggle" && (
        <div className="flex gap-1 bg-[#242424] rounded-lg p-1 border border-[#333]">
          <button className="px-2 py-1 bg-[#444] rounded text-white text-xs">
            A
          </button>
          <button className="px-2 py-1 hover:bg-[#333] rounded text-[#888] text-xs">
            B
          </button>
          <button className="px-2 py-1 hover:bg-[#333] rounded text-[#888] text-xs">
            C
          </button>
        </div>
      )}
    </div>
  );
}
