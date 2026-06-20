import { SavedPrompt } from "../types";
import { Copy, Trash2, Check, Clock, Sparkles, FolderDown, ArrowUpRight, ShieldAlert, ArrowRight } from "lucide-react";
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

interface DiffPart {
  value: string;
  type: "added" | "removed" | "unchanged";
}

// Compact and high-performance LCS (Longest Common Subsequence) word/token diffing function
function computeWordDiff(oldStr: string, newStr: string): DiffPart[] {
  if (!oldStr) return [{ value: newStr, type: "added" }];
  if (!newStr) return [{ value: oldStr, type: "removed" }];

  // Split by whitespace and punctuation tokens to preserve raw layout and spacing exactly
  const regex = /(\s+)/;
  const oldWords = oldStr.split(regex).filter(Boolean);
  const newWords = newStr.split(regex).filter(Boolean);

  const dp: number[][] = Array.from({ length: oldWords.length + 1 }, () =>
    new Array(newWords.length + 1).fill(0)
  );

  for (let i = 1; i <= oldWords.length; i++) {
    for (let j = 1; j <= newWords.length; j++) {
      if (oldWords[i - 1] === newWords[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  const result: DiffPart[] = [];
  let i = oldWords.length;
  let j = newWords.length;

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && oldWords[i - 1] === newWords[j - 1]) {
      result.unshift({ value: oldWords[i - 1], type: "unchanged" });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      result.unshift({ value: newWords[j - 1], type: "added" });
      j--;
    } else {
      result.unshift({ value: oldWords[i - 1], type: "removed" });
      i--;
    }
  }

  return result;
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
  const [compareIds, setCompareIds] = useState<string[]>([]);

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

  // Safe proxies that maintain comparison state cleanliness
  const handleDeleteItem = (id: string) => {
    setCompareIds(prev => prev.filter(x => x !== id));
    onDeleteHistoryItem(id);
  };

  const handleClearAll = () => {
    setCompareIds([]);
    onClearHistory();
  };

  const toggleCompare = (id: string) => {
    setCompareIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(x => x !== id);
      }
      if (prev.length >= 2) {
        // Roll to make comparing two successive files smooth
        return [prev[1], id];
      }
      return [...prev, id];
    });
  };

  // Find selected prompts for analysis
  const promptA = historyPrompts.find(p => p.id === compareIds[0]);
  const promptB = historyPrompts.find(p => p.id === compareIds[1]);

  // Arrange them chronologically to ensure deletions/additions match historical sequence
  let basePrompt: SavedPrompt | undefined = undefined;
  let targetPrompt: SavedPrompt | undefined = undefined;

  if (promptA && promptB) {
    const idxA = historyPrompts.indexOf(promptA);
    const idxB = historyPrompts.indexOf(promptB);
    if (idxA > idxB) {
      // Index idxA is larger, representing an older item in our newest-first list.
      basePrompt = promptA;
      targetPrompt = promptB;
    } else {
      basePrompt = promptB;
      targetPrompt = promptA;
    }
  }

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
                className="px-3 py-1.5 text-[10px] bg-zinc-950 hover:bg-red-950/40 border border-white/10 hover:border-red-500/30 text-zinc-400 hover:text-red-400 font-mono uppercase tracking-wider rounded-sm transition duration-300 cursor-pointer"
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
                    handleClearAll();
                    setShowConfirmClear(false);
                  }}
                  className="px-2 py-1 text-[9px] bg-red-600 text-white font-mono uppercase rounded-sm hover:bg-red-500 transition cursor-pointer"
                  id="confirm-yes-btn"
                >
                  {isDE ? "Ja" : "Yes"}
                </button>
                <button
                  onClick={() => setShowConfirmClear(false)}
                  className="px-2 py-1 text-[9px] bg-zinc-900 text-zinc-400 font-mono uppercase rounded-sm hover:text-white transition cursor-pointer"
                  id="confirm-no-btn"
                >
                  {isDE ? "Nein" : "No"}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Comparison Assistant & Diff Panel */}
      {compareIds.length === 1 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#101012] border border-dashed border-amber-500/30 rounded-sm p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] font-mono text-zinc-400 shadow-lg"
          id="compare-hint-banner"
        >
          <div className="flex items-center gap-2.5" id="compare-hint-text-box">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span>
              {isDE 
                ? `Vergleich vorbereitet. Wähle nun eine zweite Belichtung aus der Liste unten.`
                : `Exhaustive diff prepared. Now select a second exposure from the chronicle list below.`}
            </span>
          </div>
          <button 
            onClick={() => setCompareIds([])} 
            className="px-2 py-1 bg-zinc-900 border border-white/5 hover:border-zinc-700 text-zinc-500 hover:text-white uppercase text-[9px] tracking-wider rounded-sm transition cursor-pointer"
            id="cancel-compare-btn"
          >
            {isDE ? "Abbrechen" : "Cancel"}
          </button>
        </motion.div>
      )}

      {compareIds.length === 2 && basePrompt && targetPrompt && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: -15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="bg-[#101012] border border-amber-500/40 rounded-sm p-5 space-y-5 shadow-xl relative"
          id="comparison-analyzer-panel"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-3" id="comp-header">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" id="comp-sparkle" />
              <div>
                <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-white" id="comp-title">
                  {isDE ? "Belichtungs-Vergleichs-Analyse" : "Exposure Comparison Analyzer"}
                </h3>
                <p className="text-[10px] text-zinc-400 font-mono mt-0.5" id="comp-sub">
                  {isDE 
                    ? `Vergleich chronologisch geordnet: ${basePrompt.title} ➔ ${targetPrompt.title}`
                    : `Chronological parameter shift: ${basePrompt.title} ➔ ${targetPrompt.title}`}
                </p>
              </div>
            </div>

            <button
              onClick={() => setCompareIds([])}
              className="px-2.5 py-1 text-[9px] font-mono bg-zinc-900 border border-white/5 hover:border-zinc-700 text-zinc-400 hover:text-white uppercase tracking-wider rounded-sm transition cursor-pointer"
              id="close-compare-btn"
            >
              {isDE ? "Vergleich schließen" : "Close Comparison"}
            </button>
          </div>

          {/* Section 1: Settings / Parameter Differences */}
          <div className="space-y-2.5" id="comp-params-section">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block" id="comp-params-title">
              {isDE ? "Geänderte Foto-Parameter (Dunkelkammer-Heuristik)" : "Changed Exposure Parameters (Physical Formula)"}
            </span>
            
            {(() => {
              const allKeys = Array.from(new Set([
                ...Object.keys(basePrompt.settings || {}),
                ...Object.keys(targetPrompt.settings || {})
              ]));
              
              const changedSettings = allKeys.filter(key => {
                const valA = basePrompt!.settings[key];
                const valB = targetPrompt!.settings[key];
                return valA !== valB;
              });

              if (changedSettings.length === 0) {
                return (
                  <p className="text-[11px] text-zinc-500 font-mono py-1 pl-2 border-l border-amber-500/30" id="no-params-changed">
                    {isDE ? "Keine Abweichungen in den physikalischen Parametern festgestellt." : "No mechanical parameter variations detected."}
                  </p>
                );
              }

              return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3" id="comp-params-grid">
                  {changedSettings.map(key => {
                    const valA = basePrompt!.settings[key] || "—";
                    const valB = targetPrompt!.settings[key] || "—";
                    
                    return (
                      <div key={key} className="bg-zinc-950 border border-white/5 rounded-sm p-3 flex flex-col justify-between space-y-1.5" id={`param-diff-${key}`}>
                        <span className="text-[9px] font-mono text-amber-500/80 uppercase tracking-wider block" id={`param-diff-lbl-${key}`}>
                          {key.replace(/_/g, ' ')}
                        </span>
                        <div className="flex items-center gap-2 text-xs font-serif" id={`param-diff-row-${key}`}>
                          <div className="flex-1 text-red-400/90 line-through truncate" title={valA} id={`param-val-old-${key}`}>
                            {valA}
                          </div>
                          <div className="text-zinc-600 font-mono text-[9px] px-1" id={`param-arrow-${key}`}>
                            ➔
                          </div>
                          <div className="flex-1 text-emerald-400 font-medium truncate" title={valB} id={`param-val-new-${key}`}>
                            {valB}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })()}
          </div>

          {/* Section 2: Precise Text Diff Highlighting */}
          <div className="space-y-4" id="comp-text-section">
            
            {/* English Prompt Diff */}
            <div className="space-y-2" id="comp-en-prompt-wrap">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block" id="comp-en-title">
                {isDE ? "Auffällige Prompt-Unterschiede (Englisch - Flux & Midjourney)" : "Synthetic Prompts Word Delta (English - Flux & Midjourney)"}
              </span>
              <div className="bg-[#050507] border border-white/5 rounded-sm p-4 text-[12px] font-mono leading-relaxed max-h-[300px] overflow-y-auto select-all whitespace-pre-wrap shadow-inner" id="comp-en-diff-box">
                {(() => {
                  const wordDiffParts = computeWordDiff(basePrompt.englishPrompt, targetPrompt.englishPrompt);
                  return wordDiffParts.map((part, index) => {
                    if (part.type === "added") {
                      return (
                        <span 
                          key={index} 
                          className="bg-emerald-500/20 text-emerald-300 px-1 rounded-[1px] font-bold border-b border-emerald-500/40 mx-[1px]"
                          id={`diff-item-added-${index}`}
                        >
                          {part.value}
                        </span>
                      );
                    } else if (part.type === "removed") {
                      return (
                        <span 
                          key={index} 
                          className="bg-red-500/20 text-red-400/80 px-1 rounded-[1px] line-through border-b border-red-500/40 opacity-70 mx-[1px]"
                          id={`diff-item-removed-${index}`}
                        >
                          {part.value}
                        </span>
                      );
                    } else {
                      return (
                        <span 
                          key={index} 
                          className="text-zinc-300"
                          id={`diff-item-same-${index}`}
                        >
                          {part.value}
                        </span>
                      );
                    }
                  });
                })()}
              </div>
              <div className="flex items-center gap-4 text-[9px] font-mono text-zinc-500 px-1" id="en-diff-legend">
                <div className="flex items-center gap-1.5" id="legend-removed">
                  <span className="w-2.5 h-2.5 bg-red-500/20 border-b border-red-500/40 rounded-sm inline-block"></span>
                  <span>{isDE ? "Entfernte Tags / Fragmente" : "Removed Tokens / Modifiers"}</span>
                </div>
                <div className="flex items-center gap-1.5" id="legend-added">
                  <span className="w-2.5 h-2.5 bg-emerald-500/20 border-b border-emerald-500/40 rounded-sm inline-block"></span>
                  <span>{isDE ? "Hinzugefügte Tags / Fragmente" : "Added Tokens / Modifiers"}</span>
                </div>
              </div>
            </div>

            {/* German Prompt Diff */}
            {basePrompt.germanPrompt && targetPrompt.germanPrompt && (
              <div className="space-y-2" id="comp-de-prompt-wrap">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block" id="comp-de-title">
                  {isDE ? "Entwurfs-Änderungen (Deutsch)" : "Draft Description Changes (German)"}
                </span>
                <div className="bg-[#050507]/75 border border-white/5 rounded-sm p-3.5 text-xs font-mono leading-relaxed max-h-[150px] overflow-y-auto whitespace-pre-wrap text-zinc-400 shadow-inner" id="comp-de-diff-box">
                  {(() => {
                    const wordDiffParts = computeWordDiff(basePrompt.germanPrompt, targetPrompt.germanPrompt);
                    return wordDiffParts.map((part, index) => {
                      if (part.type === "added") {
                        return (
                          <span 
                            key={index} 
                            className="bg-emerald-500/15 text-emerald-400/90 px-1 rounded-[1px] font-bold border-b border-emerald-500/30 mx-[1px]"
                            id={`diff-de-added-${index}`}
                          >
                            {part.value}
                          </span>
                        );
                      } else if (part.type === "removed") {
                        return (
                          <span 
                            key={index} 
                            className="bg-red-500/15 text-red-400/75 px-1 rounded-[1px] line-through border-b border-red-500/30 opacity-60 mx-[1px]"
                            id={`diff-de-removed-${index}`}
                          >
                            {part.value}
                          </span>
                        );
                      } else {
                        return (
                          <span 
                            key={index} 
                            className="text-zinc-400"
                            id={`diff-de-same-${index}`}
                          >
                            {part.value}
                          </span>
                        );
                      }
                    });
                  })()}
                </div>
              </div>
            )}
          </div>

        </motion.div>
      )}

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
              const isComparing = compareIds.includes(prompt.id);
              
              return (
                <motion.div
                  key={prompt.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: index * 0.04 } }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  layout
                  className={`bg-[#0b0b0d] border rounded-sm p-4 sm:p-5 relative group transition-all duration-300 ${
                    isComparing 
                      ? "border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.06)] bg-[#0f0f12]" 
                      : "border-white/10 hover:border-white/20"
                  }`}
                  id={`history-card-${prompt.id}`}
                >
                  {/* Floating index & timestamp */}
                  <div className="absolute top-4 right-4 flex items-center gap-2" id="card-top-right">
                    <span className="text-[9px] font-mono px-1.5 py-0.5 bg-zinc-950 border border-white/5 text-zinc-500 rounded-sm" id="card-timestamp">
                      {prompt.createdAt}
                    </span>
                    <span className={`text-[9px] font-mono w-4 h-4 flex items-center justify-center rounded-full ${isComparing ? "bg-amber-500 text-black font-bold" : "bg-zinc-800 text-zinc-400"}`} id="card-index">
                      #{index + 1}
                    </span>
                  </div>

                  {/* Smart auto generated Title */}
                  <div className="mb-3.5" id="card-info-header">
                    <div className="flex items-center gap-1.5" id="card-info-badge-row">
                      <span className={`text-[9px] font-mono uppercase tracking-widest font-bold ${isComparing ? "text-amber-400" : "text-amber-500"}`} id="card-label">
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
                            className="text-[10px] font-mono text-zinc-500 hover:text-white transition flex items-center gap-1 cursor-pointer"
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
                              className="text-[10px] font-mono text-zinc-500 hover:text-white transition flex items-center gap-1 cursor-pointer"
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
                      <div className="flex flex-wrap gap-2 pt-2" id="action-btn-row">
                        
                        {/* Load in Studio */}
                        <button
                          onClick={() => onLoadPrompt(prompt)}
                          className="flex-1 min-w-[110px] px-2.5 py-2 text-[10px] bg-white text-black font-semibold uppercase tracking-wider rounded-sm hover:bg-neutral-200 transition flex items-center justify-center gap-1 cursor-pointer shadow-md"
                          id={`load-hist-${prompt.id}`}
                        >
                          <ArrowUpRight className="w-3.5 h-3.5" />
                          <span>{isDE ? "Studio laden" : "Load Studio"}</span>
                        </button>

                        {/* Compare Selector Toggle */}
                        <button
                          onClick={() => toggleCompare(prompt.id)}
                          className={`px-2.5 py-2 text-[10px] uppercase font-mono tracking-wider rounded-sm flex items-center justify-center gap-1.5 transition cursor-pointer ${
                            isComparing
                              ? "bg-amber-500 text-black font-bold border border-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.2)] scale-[1.02]"
                              : "bg-zinc-950 border border-white/10 hover:border-amber-500/30 text-zinc-400 hover:text-amber-500"
                          }`}
                          id={`compare-toggle-${prompt.id}`}
                          title={isDE ? "Diese Belichtung vergleichen" : "Compare this exposure with another"}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${isComparing ? "bg-black animate-pulse" : "bg-zinc-600"}`}></span>
                          <span>{isComparing ? (isDE ? "Vergleich" : "Comparing") : (isDE ? "Vergleich" : "Compare")}</span>
                        </button>

                        {/* Archive permanently */}
                        <button
                          disabled={isArchived}
                          onClick={() => handleArchive(prompt)}
                          className={`px-2.5 py-2 text-[10px] border font-mono uppercase tracking-wider rounded-sm flex items-center justify-center gap-1.5 transition ${
                            isArchived 
                              ? "bg-zinc-900 border-emerald-500/30 text-emerald-400 cursor-default" 
                              : "bg-zinc-950 border-white/10 hover:border-white/30 text-zinc-300 hover:text-white cursor-pointer"
                          }`}
                          id={`archive-hist-${prompt.id}`}
                        >
                          {isArchived ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <FolderDown className="w-3.5 h-3.5 text-zinc-500 hover:text-white" />
                          )}
                        </button>

                        {/* Trash */}
                        <button
                          onClick={() => handleDeleteItem(prompt.id)}
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
