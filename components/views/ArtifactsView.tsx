"use client";

import {
  Grid,
  Eye,
  Clock,
  Download,
  ArrowRight,
  Component,
} from "lucide-react";
import { useState } from "react";
import { useI18n } from '@/lib/i18n';

export function ArtifactsView() {
    const { t } = useI18n();
const artifacts = [
    {
      id: 1,
      title: "Gemini Clone - JSX",
      type: "React Component",
      date: "Il y a 2h",
      views: 42,
    },
    {
      id: 2,
      title: "Landing Page Hero",
      type: "HTML/CSS",
      date: "Hier",
      views: 12,
    },
    {
      id: 3,
      title: "Data Visualization",
      type: "React Component",
      date: "Il y a 3 j",
      views: 104,
    },
    {
      id: 4,
      title: "Markdown Editor",
      type: "React Component",
      date: "Semaine dernière",
      views: 15,
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto w-full p-10 bg-[#141414]">
      <div className="max-w-5xl mx-auto animate-in fade-in duration-300">
        <h2 className="font-serif text-[28px] font-medium text-[#e8e6e3] mb-3">
          Artéfacts
        </h2>
        <p className="text-[#666] text-[14px] mb-8">
          Tous vos composants et documents générés
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {artifacts.map((a) => (
            <div
              key={a.id}
              className="group bg-[#1a1a1a] border border-[#262626] rounded-2xl p-5 hover:bg-[#1e1e1e] hover:border-[#333] transition-all cursor-pointer flex flex-col min-h-[160px] relative overflow-hidden shadow-sm"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                  {a.type === "HTML/CSS" ? (
                    <Grid size={20} />
                  ) : (
                    <Component size={20} />
                  )}
                </div>
                <div className="flex gap-2">
                  <button className="text-[#555] opacity-0 group-hover:opacity-100 transition-opacity hover:text-[#ccc]">
                    <Download size={16} />
                  </button>
                  <button className="text-[#555] opacity-0 group-hover:opacity-100 transition-opacity hover:text-[#ccc]">
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>

              <h3 className="text-[#e8e6e3] font-medium text-[15px] mb-1 group-hover:text-white transition-colors">
                {a.title}
              </h3>
              <p className="text-[#666] text-[13px] mb-auto">{a.type}</p>

              <div className="flex items-center gap-4 text-[12px] text-[#555] mt-4 pt-4 border-t border-[#222]">
                <span className="flex items-center gap-1.5">
                  <Clock size={12} /> {a.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Eye size={12} /> {a.views}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
