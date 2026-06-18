import React, { useState, useEffect, useRef } from "react";
import { PromptOptions } from "../data";
import { Send, RotateCcw, AlertTriangle } from "lucide-react";

interface StudioDialogProps {
  language: "Deutsch" | "English";
  options: PromptOptions;
  settings: Record<string, string>;
  setSettings: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  includes: Record<string, boolean>;
  setIncludes: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  genre: "portrait" | "landscape" | "objects";
  setGenre: (g: "portrait" | "landscape" | "objects") => void;
  getLangText: (text: string, lang: "Deutsch" | "English") => string;
}

interface ChatMessage {
  id: string;
  sender: "alchemist" | "photographer";
  text: string;
}

export const StudioDialog: React.FC<StudioDialogProps> = ({
  language,
  options,
  settings,
  setSettings,
  includes,
  setIncludes,
  genre,
  setGenre,
  getLangText
}) => {
  const isDE = language === "Deutsch";
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [dialogStep, setDialogStep] = useState<number>(0);
  const [customInput, setCustomInput] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize the conversation
  const initializeChat = () => {
    setMessages([
      {
        id: "msg_init",
        sender: "alchemist",
        text: isDE
          ? "Willkommen im Fotolabor. Ich bin dein analoger Meister-Präger. Lass uns gemeinsam dein Motiv planen. Welches Szenario (Thema) schwebt dir vor?"
          : "Welcome to the darkroom. I am your analog master printer. Let's plan your composition together. Which scenario (genre) are we shooting today?"
      }
    ]);
    setDialogStep(0);
  };

  useEffect(() => {
    if (messages.length === 0) {
      initializeChat();
    }
  }, [language]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Proceed to next question based on user response
  const handleAnswer = (choiceLabel: string, choiceRawValue: string, isCustomText: boolean = false) => {
    // 1. Append user statement to chat
    const userMsgId = "user_" + Date.now();
    setMessages(prev => [
      ...prev,
      {
        id: userMsgId,
        sender: "photographer",
        text: choiceLabel
      }
    ]);

    // 2. Determine side effects depending on dialogStep and advance to next question
    let replyText = "";
    let nextStep = dialogStep + 1;

    setTimeout(() => {
      if (dialogStep === 0) {
        // SCENARIO SELECTION
        const matchedGenre = choiceRawValue as "portrait" | "landscape" | "objects";
        setGenre(matchedGenre);
        
        const genreLabel = isDE 
          ? (matchedGenre === "portrait" ? "Porträts" : matchedGenre === "landscape" ? "Landschaften" : "Sachfotos u. Objekte")
          : matchedGenre;
        
        replyText = isDE
          ? `Hervorragend! Wir widmen uns dem Thema: ${genreLabel}. Welches Motiv oder freie Beschreibung soll die Linse einfangen? (Tippe unten einen Freitext oder wähle eine Option)`
          : `Excellent! We are exposing a ${genreLabel} scene. What central subject should we describe? (Type custom text below or tap a quick pill)`;

      } else if (dialogStep === 1) {
        // SUBJECT SELECTION
        if (isCustomText) {
          setSettings(prev => ({ ...prev, free_text: choiceRawValue }));
          setIncludes(prev => ({ ...prev, free_text: true }));
        } else {
          if (genre === "portrait") {
            setSettings(prev => ({ ...prev, role: choiceRawValue }));
            setIncludes(prev => ({ ...prev, role: true }));
          } else if (genre === "landscape") {
            setSettings(prev => ({ ...prev, landscape_subject: choiceRawValue }));
            setIncludes(prev => ({ ...prev, landscape_subject: true }));
          } else {
            setSettings(prev => ({ ...prev, object_subject: choiceRawValue }));
            setIncludes(prev => ({ ...prev, object_subject: true }));
          }
        }

        replyText = isDE
          ? "Ein starker Blickpunkt! Nun zu der Hardware: Welches Kameraformat bzw. welche Kameragröße soll das Bildkorn definieren?"
          : "An impressive center-point! Now for the gear: Which mechanical camera format fits best?";

      } else if (dialogStep === 2) {
        // CAMERA FORMAT SELECTION
        setSettings(prev => {
          const updated = { ...prev, camera_type: choiceRawValue };
          const cams = options.cameras[choiceRawValue] || [];
          updated.camera = cams[0] || "Default Camera";
          const lenses = options.lenses[choiceRawValue] || [];
          updated.lens = lenses[0] || "Default Lens";
          const listFilms = options.films[choiceRawValue] || [];
          updated.film = listFilms[0] || "Default Film";
          return updated;
        });

        replyText = isDE
          ? `Wunderbar, ein ${choiceLabel}-Format. Welcher photographische Film-Look soll uns die Farben (oder Graustufen) liefern? Wir können auch abgelaufene (expired) Vintage-Filme nehmen.`
          : `Indeed, a classic ${choiceLabel} system. What film emulsion will capture this? We can also expose old expired vintage stocks.`;

      } else if (dialogStep === 3) {
        // FILM / EMULSION SELECTION
        if (choiceRawValue === "expired") {
          setIncludes(prev => ({ ...prev, expired_film: true, film: false }));
          setSettings(prev => ({ ...prev, expired_film: options.expired_films[0] }));
        } else if (options.expired_films.includes(choiceRawValue)) {
          setIncludes(prev => ({ ...prev, expired_film: true, film: false }));
          setSettings(prev => ({ ...prev, expired_film: choiceRawValue }));
        } else {
          setIncludes(prev => ({ ...prev, expired_film: false, film: true }));
          setSettings(prev => ({ ...prev, film: choiceRawValue }));
        }

        replyText = isDE
          ? "Sehr ästhetisch. Für den letzten Feinschliff: Welches Chemie-Entwicklerbad oder welchen historischen Edeldruck (wie Lith, Vandyke oder nasses Kollodium) wünschst du im Dunkelkammer-Becken?"
          : "Highly aesthetic. Finally, which darkroom chemical bath or historic print process (like Lith, Vandyke, or wet-plate) shall I prepare?";

      } else if (dialogStep === 4) {
        // DEVELOPER CHEMISTRY SELECTION
        setSettings(prev => ({ ...prev, post_processing: choiceRawValue }));
        setIncludes(prev => ({ ...prev, post_processing: true }));

        replyText = isDE
          ? "Einzigartiges Entwickler-Verfahren! Und der finale Abzug: Auf welche Papier-Emulsion soll das Bild gebannt werden? Wir haben erlesene abgelaufene Papiere (wie Agfa Brovira, Guilleminot Bromure) oder feine Archivpapiere."
          : "Exquisite development process! Finally the print: which paper emulsion or photographic paper stock should we project this on? We have vintage expired papers and premium archival backings.";

      } else if (dialogStep === 5) {
        // PAPER EMULSION SELECTION (saves to expired_paper or quality level)
        if (options.expired_papers.includes(choiceRawValue)) {
          setSettings(prev => ({ ...prev, expired_paper: choiceRawValue }));
          setIncludes(prev => ({ ...prev, expired_paper: true, quality: false }));
        } else {
          setSettings(prev => ({ ...prev, quality: choiceRawValue }));
          setIncludes(prev => ({ ...prev, quality: true, expired_paper: false }));
        }

        replyText = isDE
          ? "Die chemischen Synthesen sind vollzogen! Der Prompt ist vollbelichtet, fixiert und trocken. Du findest deine fertige Prompt-Schnittstelle in der rechten Spalte einsatzbereit!"
          : "The chemical reactions are complete! The emulsion is fully exposed, fixed, and dried. You can extract your fully-resolved Prompt on the right panel!";
      }

      setMessages(prev => [
        ...prev,
        {
          id: "bot_" + Date.now(),
          sender: "alchemist",
          text: replyText
        }
      ]);
      setDialogStep(nextStep);
    }, 600);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;
    
    const text = customInput.trim();
    setCustomInput("");
    handleAnswer(text, text, true);
  };

  return (
    <div className="bg-[#141416]/95 border border-stone-850 rounded-xl p-4 sm:p-5 shadow-xl flex flex-col h-[520px]" id="dialog-sheet">
      {/* Bot Header info */}
      <div className="flex items-center justify-between border-b border-stone-850 pb-3 mb-3 shrink-0" id="dialog-header">
        <div id="dialog-bot-status">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="text-xs font-mono text-zinc-100 uppercase tracking-widest font-bold">
              {isDE ? "Meister-Präger (Alchemist)" : "Darkroom Alchemist"}
            </h3>
          </div>
          <p className="text-[10px] font-mono text-stone-500 mt-0.5">
            {isDE ? "LOKALER EDELDRUCK-GUIDE (OFFLINE)" : "LOCAL PRINTING EXPERT (API-FREE)"}
          </p>
        </div>

        <button
          onClick={initializeChat}
          className="p-1 px-2 border border-stone-800 bg-stone-900 hover:bg-stone-850 text-stone-400 hover:text-white rounded text-[10px] font-mono uppercase tracking-wider flex items-center gap-1.5 transition cursor-pointer"
          id="dialog-reset-btn"
          title={isDE ? "Gespräch neu starten" : "Restart chat"}
        >
          <RotateCcw className="w-3 h-3" />
          <span>{isDE ? "Reset" : "Restart"}</span>
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto mb-4 p-2 space-y-3 scrollbar-none bg-[#0a0a0b] border border-stone-900 rounded-lg" id="dialog-message-list">
        {messages.map((m) => {
          const isAlchemist = m.sender === "alchemist";
          return (
            <div
              key={m.id}
              className={`flex flex-col max-w-[85%] ${isAlchemist ? "mr-auto items-start" : "ml-auto items-end"}`}
            >
              <span className="text-[9px] font-mono text-stone-500 mb-0.5 uppercase tracking-wider">
                {isAlchemist ? (isDE ? "Alchemist" : "Darkroom Master") : (isDE ? "Fotograf" : "You")}
              </span>
              <div
                className={`px-3 py-2 text-xs rounded-lg ${
                  isAlchemist
                    ? "bg-stone-900/90 text-stone-200 font-serif border border-stone-800 rounded-tl-none leading-relaxed"
                    : "bg-amber-500 text-black font-semibold rounded-tr-none leading-relaxed"
                }`}
              >
                {m.text}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestion Options Pills based on dialogStep */}
      <div className="mb-3 shrink-0" id="dialog-options-pills">
        {dialogStep === 0 && (
          <div className="space-y-1">
            <span className="block text-[10px] font-mono text-stone-500 uppercase tracking-widest pl-1 mb-1">
              Select Scenario:
            </span>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => handleAnswer(isDE ? "👤 Porträt" : "👤 Portrait", "portrait")}
                className="bg-stone-900 hover:bg-stone-800 border border-stone-800 rounded px-2.5 py-1.5 text-xs font-serif text-stone-200 transition cursor-pointer"
              >
                👤 {isDE ? "Porträt" : "Portrait"}
              </button>
              <button
                onClick={() => handleAnswer(isDE ? "⛰️ Landschaft" : "⛰️ Landscape", "landscape")}
                className="bg-stone-900 hover:bg-stone-800 border border-stone-800 rounded px-2.5 py-1.5 text-xs font-serif text-stone-200 transition cursor-pointer"
              >
                ⛰️ {isDE ? "Landschaft" : "Landscape"}
              </button>
              <button
                onClick={() => handleAnswer(isDE ? "📦 Objekte" : "📦 Objects", "objects")}
                className="bg-stone-900 hover:bg-stone-800 border border-stone-800 rounded px-2.5 py-1.5 text-xs font-serif text-stone-200 transition cursor-pointer"
              >
                📦 {isDE ? "Objekte / Sach" : "Objects"}
              </button>
            </div>
          </div>
        )}

        {dialogStep === 1 && (
          <div className="space-y-1">
            <span className="block text-[10px] font-mono text-stone-500 uppercase tracking-widest pl-1 mb-1">
              {isDE ? "Optionen zur Vorauswahl:" : "Predefined selections:"}
            </span>
            <div className="flex flex-wrap gap-1.5 scrollbar-none max-h-[85px] overflow-y-auto">
              {genre === "portrait" && options.roles.slice(0, 5).map(r => (
                <button
                  key={r}
                  onClick={() => handleAnswer(getLangText(r, language), r)}
                  className="bg-stone-900 hover:bg-stone-800 border border-stone-800 rounded px-2.5 py-1 text-xs text-stone-300 transition cursor-pointer"
                >
                  {getLangText(r, language)}
                </button>
              ))}

              {genre === "landscape" && options.landscape_subjects.slice(0, 4).map(l => (
                <button
                  key={l}
                  onClick={() => handleAnswer(getLangText(l, language), l)}
                  className="bg-stone-900 hover:bg-stone-800 border border-stone-800 rounded px-2 py-1 text-xs text-stone-300 transition truncate max-w-[170px] cursor-pointer"
                  title={getLangText(l, language)}
                >
                  {getLangText(l, language).split(",")[0]}
                </button>
              ))}

              {genre === "objects" && options.object_subjects.slice(0, 4).map(o => (
                <button
                  key={o}
                  onClick={() => handleAnswer(getLangText(o, language), o)}
                  className="bg-stone-900 hover:bg-stone-800 border border-stone-800 rounded px-2 py-1 text-xs text-stone-300 transition truncate max-w-[170px] cursor-pointer"
                  title={getLangText(o, language)}
                >
                  {getLangText(o, language).split("/")[0]}
                </button>
              ))}
            </div>
          </div>
        )}

        {dialogStep === 2 && (
          <div className="space-y-1">
            <span className="block text-[10px] font-mono text-stone-500 uppercase tracking-widest pl-1 mb-1">
              {isDE ? "Kamera Klasse (Inkl. Polaroid & Spezialsysteme):" : "Kamera Format (Incl. Polaroid & specialty camera classes):"}
            </span>
            <div className="flex flex-wrap gap-1.5 max-h-[110px] overflow-y-auto p-1 bg-stone-900/60 border border-stone-850 rounded">
              {Object.keys(options.cameras).map(ct => (
                <button
                  key={ct}
                  onClick={() => handleAnswer(getLangText(ct, language), ct)}
                  className="bg-stone-950 hover:bg-stone-800 border border-stone-800 rounded px-2.5 py-1 text-xs text-stone-300 font-serif transition cursor-pointer"
                >
                  {getLangText(ct, language)}
                </button>
              ))}
            </div>
          </div>
        )}

        {dialogStep === 3 && (
          <div className="space-y-1">
            <span className="block text-[10px] font-mono text-stone-500 uppercase tracking-widest pl-1 mb-1">
              {isDE ? "Wähle dein Filmmaterial / Emulsion:" : "Select your film stock or emulsion:"}
            </span>
            <div className="flex flex-wrap gap-1.5 max-h-[110px] overflow-y-auto p-1 bg-stone-900/60 border border-stone-850 rounded">
              {/* List specific films for selected camera type (e.g. Polaroid films, Portra, etc.) */}
              {(options.films[settings.camera_type] || []).map(fl => {
                const label = getLangText(fl, language).split(",")[0].trim();
                return (
                  <button
                    key={fl}
                    onClick={() => {
                      setIncludes(prev => ({ ...prev, film: true, expired_film: false }));
                      setSettings(prev => ({ ...prev, film: fl }));
                      handleAnswer(label, fl);
                    }}
                    className="bg-stone-950 hover:bg-stone-800 border border-stone-800 rounded px-2.5 py-1 text-xs text-stone-300 transition cursor-pointer"
                  >
                    🎞️ {label}
                  </button>
                );
              })}
              {/* Also add Option for Expired Film */}
              <button
                onClick={() => {
                  setIncludes(prev => ({ ...prev, expired_film: true, film: false }));
                  setSettings(prev => ({ ...prev, expired_film: options.expired_films[0] }));
                  handleAnswer(isDE ? "⚠️ Überlagerter Film" : "⚠️ Expired Film", "expired");
                }}
                className="bg-stone-950 hover:bg-stone-900 border border-amber-500/30 text-amber-500 rounded px-2.5 py-1 text-xs font-mono transition cursor-pointer"
              >
                ⚠️ {isDE ? "Morbides Filmunikat (Expired)" : "Vintage Expired Film"}
              </button>
            </div>
          </div>
        )}

        {dialogStep === 4 && (
          <div className="space-y-1">
            <span className="block text-[10px] font-mono text-stone-500 uppercase tracking-widest pl-1 mb-1">
              Select Chemistry:
            </span>
            <div className="flex flex-wrap gap-1.5 max-h-[85px] overflow-y-auto scrollbar-none">
              {options.post_processing.map(pp => {
                const label = getLangText(pp, language).split("(")[0].split("/")[0].trim();
                return (
                  <button
                    key={pp}
                    onClick={() => handleAnswer(label, pp)}
                    className="bg-stone-900 hover:bg-stone-800 border border-stone-800 rounded px-2 py-1 text-xs text-stone-300 transition max-w-[200px] truncate cursor-pointer"
                    title={getLangText(pp, language)}
                  >
                    🧪 {label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {dialogStep === 5 && (
          <div className="space-y-1">
            <span className="block text-[10px] font-mono text-amber-500 uppercase tracking-widest pl-1 mb-1">
              {isDE ? "Fotopapier & Edeldruck-Emulsionen:" : "Photo Paper Emulsion Stocks:"}
            </span>
            <div className="flex flex-wrap gap-1.5 max-h-[110px] overflow-y-auto p-1 bg-stone-900/60 border border-stone-850 rounded">
              {/* Expired Papers */}
              {options.expired_papers.map(ep => {
                const label = getLangText(ep, language).split("(")[0].trim();
                return (
                  <button
                    key={ep}
                    onClick={() => handleAnswer(label, ep)}
                    className="bg-stone-950 hover:bg-stone-800 border border-amber-500/20 text-amber-300 rounded px-2.5 py-1 text-xs transition cursor-pointer"
                    title={getLangText(ep, language)}
                  >
                    ⏳ {label}
                  </button>
                );
              })}
              {/* Archival Quality Levels (Albumen, Silver Gelatin, Cyanotypic...) */}
              {options.quality_levels.map(ql => {
                const label = getLangText(ql, language).split("on")[0].split("auf")[0].trim();
                return (
                  <button
                    key={ql}
                    onClick={() => handleAnswer(label, ql)}
                    className="bg-stone-950 hover:bg-stone-800 border border-stone-800 text-stone-300 rounded px-2.5 py-1 text-xs transition cursor-pointer"
                    title={getLangText(ql, language)}
                  >
                    📜 {label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {dialogStep >= 6 && (
          <div className="bg-emerald-500/5 border border-emerald-500/20 p-2.5 rounded text-[11px] font-mono text-emerald-500 text-center animate-pulse">
            {isDE ? "✓ Entwicklung fixiert und trockengelegt." : "✓ Print exposure completed successfully."}
          </div>
        )}
      </div>

      {/* Input Form at Bottom */}
      <form onSubmit={handleCustomSubmit} className="flex gap-2 shrink-0" id="dialog-input-form">
        <input
          disabled={dialogStep >= 6}
          type="text"
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
          placeholder={
            dialogStep >= 6
              ? (isDE ? "Abschluss erreicht." : "Conversation ended.") 
              : (isDE ? "Freie Antwort eingeben u. absenden..." : "Type clear instructions here...")
          }
          className="flex-1 bg-stone-950 border border-stone-800 rounded px-3 py-2 text-stone-300 text-xs focus:outline-none focus:border-amber-500 disabled:opacity-40 font-serif"
          id="dialog-user-text-input"
        />
        <button
          disabled={dialogStep >= 6 || !customInput.trim()}
          type="submit"
          className="bg-amber-500 text-black hover:bg-amber-400 p-2 px-3 rounded flex items-center justify-center transition disabled:opacity-30 disabled:hover:bg-amber-500 cursor-pointer"
          id="dialog-send-btn"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
