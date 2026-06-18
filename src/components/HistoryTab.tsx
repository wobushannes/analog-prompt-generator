import { SavedPrompt } from "../types";
import { Copy, Trash2, Check, Clock, Sparkles, FolderDown, ArrowUpRight, ShieldAlert } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface HistoryTabProps {
  historyPrompts: SavedPrompt[];
  onLoadPrompt: (prompt: SavedPrompt) => void;
  onDeleteHistoryItem: (id: string) => void;
  onClearHistory: () => void;
  onArchiveHistoryItem: (prompt: SavedPrompt) => void;
  language: "Deutsch" | "English";
}

export const HistoryTab = ({
  historyPrompts,
  onLoadPrompt,
  onDeleteHistoryItem,
  onClearHistory,
  onArchiveHistoryItem,
  language,
}: HistoryTabProps) => {
  const isDE = language === "Deutsch";
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showConfirmClear, setShowConfirmClear] = useState(false);
  const [archivedIds, setArchivedIds] = useState<Set<string>>(new Set());

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleArchive = (prompt: SavedPrompt) => {
    onArchiveHistoryItem(prompt);
    setArchivedIds(prev => {
      const next = new Set(prev);
      next.add(prompt.id);
      return next;
    });
  };

  return (
    <div className="space-y-6" id="history-tab-root">
      
      {/* Header section with quick description and clear action */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#141416]/75 border border-white/5 rounded-sm p-4 sm:p-5" id="history-header-box">
        <div>
          <h2 className="text-base font-serif font-black uppercase text-white tracking-widest flex items-center gap-2.5" id="history-header-title">
            <Clock className="w-4 h-4 text-amber-500" id="clock-prefix-icon" />
            <span>{isDE ? "Sitzung & Dunkelkammer-Belichtungen" : "Session Developer History"}</span>
          </h2>
          <p className="text-[11px] text-zinc-400 font-mono mt-1" id="history-header-desc">
            {isDE 
              ? "AUTOMATISCHE CHRONIK DER LETZTEN 10 ENTWICKELTEN PROMPTS" 
              : "AUTO-CAPTURED EXPOSURES LOGGING THE LAST 10 SESSIONS"}
          </p>
        </div>

        {historyPrompts.length > 0 && (
          <div className="relative" id="clear-history-container">
            {!showConfirmClear ? (
              <button
                onClick={() => setShowConfirmClear(true)}
                className="px-3 py-1.5 text-[10px] bg-zinc-950 hover:bg-red-950/40 border border-white/10 hover:border-red-500/30 text-zinc-400 hover:text-red-400 font-mono uppercase tracking-wider rounded-sm transition duration-300"
                id="clear-history-init-btn"
              >
                {isDE ? "Verlauf leeren" : "Clear History"}
              </button>
            ) : (
              <div className="flex items-center gap-2 bg-zinc-950 border border-red-500/30 p-1.5 rounded-sm" id="clear-confirm-wrap">
                <span className="text-[9px] font-mono text-red-400 uppercase tracking-wider px-1.5 flex items-center gap-1" id="confirm-warning-lbl">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  {isDE ? "Sicher?" : "Confirm?"}
                </span>
                <button
                  onClick={() => {
                    onClearHistory();
                    setShowConfirmClear(false);
                  }}
                  className="px-2 py-1 text-[9px] bg-red-600 text-white font-mono uppercase rounded-sm hover:bg-red-500 transition"
                  id="confirm-yes-btn"
                >
                  {isDE ? "Ja" : "Yes"}
                </button>
                <button
                  onClick={() => setShowConfirmClear(false)}
                  className="px-2 py-1 text-[9px] bg-zinc-900 text-zinc-400 font-mono uppercase rounded-sm hover:text-white transition"
                  id="confirm-no-btn"
                >
                  {isDE ? "Nein" : "No"}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Main List */}
      <AnimatePresence mode="popLayout" id="history-items-presence">
        {historyPrompts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center p-12 text-center bg-stone-900/20 border border-dashed border-white/5 rounded-sm"
            id="history-empty-state"
          >
            <div className="w-12 h-12 rounded-full bg-zinc-950 border border-white/5 flex items-center justify-center mb-4 text-zinc-600" id="empty-icon-box">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-sans font-bold text-zinc-300 text-xs uppercase tracking-wider" id="empty-title">
              {isDE ? "Noch keine Chronik vorhanden" : "Developer Log is Empty"}
            </h3>
            <p className="text-[11px] text-zinc-500 max-w-sm mt-1.5 font-mono leading-relaxed" id="empty-body">
              {isDE 
                ? "Bewege Regler und ändere Optionen im Fotostudio. Deine Belichtungen werden hier vollautomatisch aufgezeichnet und für die aktuelle Sitzung gesichert." 
                : "Dial parameters, flip toggle switches, and customize setups in the Studio. Your generated outputs will materialize in this chronological archive automatically."}
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 gap-5" id="history-list-grid">
            {historyPrompts.map((prompt, index) => {
              const isArchived = archivedIds.has(prompt.id);
              
              return (
                <motion.div
                  key={prompt.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: index * 0.04 } }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  layout
                  className="bg-[#0b0b0d] border border-white/10 hover:border-white/20 rounded-sm p-4 sm:p-5 relative group transition-all duration-300"
                  id={`history-card-${prompt.id}`}
                >
                  {/* Floating index & timestamp */}
                  <div className="absolute top-4 right-4 flex items-center gap-2" id="card-top-right">
                    <span className="text-[9px] font-mono px-1.5 py-0.5 bg-zinc-950 border border-white/5 text-zinc-500 rounded-sm" id="card-timestamp">
                      {prompt.createdAt}
                    </span>
                    <span className="text-[9px] font-mono w-4 h-4 flex items-center justify-center bg-zinc-800 text-zinc-400 rounded-full" id="card-index">
                      #{index + 1}
                    </span>
                  </div>

                  {/* Smart auto generated Title */}
                  <div className="mb-3.5" id="card-info-header">
                    <div className="flex items-center gap-1.5" id="card-info-badge-row">
                      <span className="text-[9px] font-mono uppercase text-amber-500 tracking-widest font-bold" id="card-label">
                        {isDE ? "BELICHTUNGSMESSUNG" : "EXPOSURE RECIPE"}
                      </span>
                    </div>
                    <h4 className="text-sm font-serif font-bold text-white tracking-wide mt-1" id="card-title">
                      {prompt.title}
                    </h4>
                  </div>

                  {/* Content Panels: Output & Details */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start" id="card-grid-body">
                    
                    {/* Prompt texts (8 columns on large screens) */}
                    <div className="lg:col-span-8 space-y-3" id="card-prompts-panel">
                      
                      {/* English Primary */}
                      <div className="space-y-1" id="prompt-en-section">
                        <div className="flex justify-between items-center" id="prompt-en-header">
                          <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider" id="en-heading">
                            AI Prompt (English)
                          </span>
                          <button
                            onClick={() => handleCopyText(prompt.englishPrompt, prompt.id + "_en")}
                            className="text-[10px] font-mono text-zinc-500 hover:text-white transition flex items-center gap-1"
                            id={`copy-en-${prompt.id}`}
                          >
                            {copiedId === prompt.id + "_en" ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-400" />
                                <span className="text-emerald-400 font-bold">{isDE ? "Kopiert!" : "Copied!"}</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>{isDE ? "Kopieren" : "Copy"}</span>
                              </>
                            )}
                          </button>
                        </div>
                        <div className="bg-[#040405] border border-white/5 text-xs font-mono text-zinc-300 p-3 rounded-sm leading-relaxed max-h-[100px] overflow-y-auto select-all" id="prompt-en-bubble">
                          {prompt.englishPrompt}
                        </div>
                      </div>

                      {/* German Reference */}
                      {prompt.germanPrompt && (
                        <div className="space-y-1" id="prompt-de-section">
                          <div className="flex justify-between items-center" id="prompt-de-header">
                            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider" id="de-heading">
                              {isDE ? "Deutsche Entwurfs-Einstellung" : "German Reference Layout"}
                            </span>
                            <button
                              onClick={() => handleCopyText(prompt.germanPrompt, prompt.id + "_de")}
                              className="text-[10px] font-mono text-zinc-500 hover:text-white transition flex items-center gap-1"
                              id={`copy-de-${prompt.id}`}
                            >
                              {copiedId === prompt.id + "_de" ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-500" />
                                  <span className="text-emerald-500 font-bold">{isDE ? "Kopiert!" : "Copied!"}</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" />
                                  <span>{isDE ? "Kopieren" : "Copy"}</span>
                                </>
                              )}
                            </button>
                          </div>
                          <div className="bg-[#040405]/70 border border-white/5 text-xs text-zinc-400 p-2.5 rounded-sm max-h-[80px] overflow-y-auto" id="prompt-de-bubble">
                            {prompt.germanPrompt}
                          </div>
                        </div>
                      )}

                      {/* Negative Prompt */}
                      {prompt.negativePrompt && (
                        <div className="text-[10px] font-mono text-stone-500 flex items-center gap-2" id="prompt-negative-bubble">
                          <span className="font-bold text-red-950 bg-red-400/10 border border-red-500/15 px-1 rounded-[2px]">NEG:</span>
                          <span className="truncate">{prompt.negativePrompt}</span>
                        </div>
                      )}
                    </div>

                    {/* Metadata tags and actionable operations (4 columns) */}
                    <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-4 border-t lg:border-t-0 lg:border-l border-white/5 pt-4 lg:pt-0 lg:pl-4 self-stretch" id="card-metadata-panel">
                      
                      {/* Active Parameters Overview */}
                      <div id="metadata-tags-wrap">
                        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-2" id="meta-heading">
                          {isDE ? "Foto-Eigenschaften" : "Physical Emulsion"}
                        </span>
                        
                        <div className="flex flex-wrap gap-1.5" id="meta-tags-container">
                          {prompt.tags && prompt.tags.map((tag) => (
                            <span 
                              key={tag} 
                              className="text-[9px] font-mono bg-zinc-950 border border-white/5 text-zinc-400 px-2 py-0.5 rounded-[2px]"
                              id={`tag-hist-${tag}`}
                            >
                              {tag}
                            </span>
                          ))}
                          <span className="text-[9px] font-mono bg-amber-500/5 border border-amber-500/10 text-amber-500/80 px-2 py-0.5 rounded-[2px]" id="count-hist">
                            {Object.values(prompt.includes).filter(Boolean).length} {isDE ? "Aktiv" : "Active"}
                          </span>
                        </div>
                      </div>

                      {/* Button actions for specific history items */}
                      <div className="flex flex-wrap lg:flex-nowrap gap-2 pt-2" id="action-btn-row">
                        {/* Load in Studio */}
                        <button
                          onClick={() => onLoadPrompt(prompt)}
                          className="flex-1 min-w-[120px] px-3 py-2 text-[10px] bg-white text-black font-semibold uppercase tracking-wider rounded-sm hover:bg-neutral-200 transition flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                          id={`load-hist-${prompt.id}`}
                        >
                          <ArrowUpRight className="w-3.5 h-3.5" />
                          <span>{isDE ? "Im Studio laden" : "Load in Studio"}</span>
                        </button>

                        {/* Archive permanently */}
                        <button
                          disabled={isArchived}
                          onClick={() => handleArchive(prompt)}
                          className={`flex-1 min-w-[95px] px-3 py-2 text-[10px] border font-mono uppercase tracking-wider rounded-sm flex items-center justify-center gap-1.5 transition ${
                            isArchived 
                              ? "bg-zinc-900 border-emerald-500/30 text-emerald-400 cursor-default" 
                              : "bg-zinc-950 border-white/10 hover:border-white/30 text-zinc-300 hover:text-white cursor-pointer"
                          }`}
                          id={`archive-hist-${prompt.id}`}
                        >
                          {isArchived ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span>{isDE ? "Gesichert" : "Archived"}</span>
                            </>
                          ) : (
                            <>
                              <FolderDown className="w-3.5 h-3.5 text-zinc-500 hover:text-white" />
                              <span>{isDE ? "Archivieren" : "Archive"}</span>
                            </>
                          )}
                        </button>

                        {/* Trash */}
                        <button
                          onClick={() => onDeleteHistoryItem(prompt.id)}
                          className="px-2.5 py-2 border border-white/5 bg-zinc-950 text-zinc-500 hover:text-red-400 hover:border-red-500/30 rounded-sm transition flex items-center justify-center cursor-pointer"
                          title={isDE ? "Eintrag entfernen" : "Remove entry"}
                          id={`delete-hist-${prompt.id}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                    </div>

                  </div>

                </motion.div>
              );
            })}
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
