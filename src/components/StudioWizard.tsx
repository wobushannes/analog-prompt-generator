import React, { useState } from "react";
import { PromptOptions } from "../data";
import { Camera, Layers, Sun, Sliders, Check } from "lucide-react";

interface StudioWizardProps {
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

export const StudioWizard: React.FC<StudioWizardProps> = ({
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
  const [step, setStep] = useState<number>(0);

  // Define steps
  const steps = [
    { title: isDE ? "1. Motiv & Szene" : "1. Subject & Scene", icon: Sliders },
    { title: isDE ? "2. Kamera & Optik" : "2. Camera & Lens", icon: Camera },
    { title: isDE ? "3. Emulsion & Abzug" : "3. Film & Print", icon: Layers },
    { title: isDE ? "4. Licht & Look" : "4. Lighting & Finish", icon: Sun }
  ];

  const handleSelectPill = (key: string, value: string, defaultIncludeKey?: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    if (defaultIncludeKey) {
      setIncludes(prev => ({ ...prev, [defaultIncludeKey]: true }));
    } else {
      setIncludes(prev => ({ ...prev, [key]: true }));
    }
  };

  const isSelected = (key: string, value: string) => {
    return settings[key] === value;
  };

  const toggleInclude = (key: string) => {
    setIncludes(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="bg-[#141416]/95 border border-stone-850 rounded-xl p-5 sm:p-6 shadow-xl" id="wizard-sheet">
      {/* Wizard Progress Header */}
      <div className="border-b border-stone-850 pb-5 mb-5" id="wizard-header">
        <h3 className="text-sm font-mono text-stone-400 uppercase tracking-widest mb-3">
          {isDE ? "⚡ KLICKER-BAUKASTEN / STEP-BY-STEP" : "⚡ SCHNELL-ERSTELLUNGS WIZARD"}
        </h3>
        
        {/* Step Tabs Indicators */}
        <div className="grid grid-cols-4 gap-2 text-center" id="wizard-steps-grid">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            const active = step === idx;
            const completed = step > idx;
            return (
              <button
                key={idx}
                onClick={() => setStep(idx)}
                className={`py-2 px-1 rounded flex flex-col sm:flex-row items-center justify-center gap-1.5 transition ${
                  active 
                    ? "bg-amber-500 text-black font-semibold shadow-md" 
                    : completed 
                      ? "bg-stone-900 border border-amber-600/30 text-amber-500" 
                      : "bg-stone-900/40 border border-stone-850 text-stone-500 hover:text-stone-300"
                }`}
                id={`wizard-step-btn-${idx}`}
              >
                <Icon className="w-4 h-4 shrink-0" id={`wizard-step-icon-${idx}`} />
                <span className="text-[10px] font-mono tracking-wider hidden md:inline">{s.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Free Text Addon (Highly accessible across all Wizard steps) */}
      <div className="mb-6 bg-amber-500/5 border border-amber-500/20 rounded-lg p-3.5" id="wizard-freetext-block">
        <span className="block text-[10px] font-mono text-amber-500 uppercase tracking-widest mb-1.5 font-bold">
          ✍️ {isDE ? "FREITEXT DETAILS ZUFÜGEN (Vollwertige freie Promptbeschreibung)" : "ADD SYSTEM FREE-TEXT ACCENT"}
        </span>
        <textarea
          value={settings.free_text || ""}
          onChange={(e) => setSettings(prev => ({ ...prev, free_text: e.target.value }))}
          placeholder={isDE ? "Optional: Gebe freie Stichworte ein (z.B. 'lächelnd auf einer Holzbank', 'Spiegelungen auf dem nassen Tisch' ...)" : "Optional key-phrase details (e.g. 'with rainwater splashing', 'laughing happily' ...)"}
          className="w-full bg-stone-950 border border-stone-800 rounded px-2.5 py-1.5 text-stone-200 font-sans text-xs focus:border-amber-500 focus:outline-none min-h-[50px] resize-none"
          id="wizard-freetext"
        />
      </div>

      {/* Step Contents */}
      <div className="min-h-[290px]" id="wizard-step-container">
        
        {/* STEP 0: SUBJECTS */}
        {step === 0 && (
          <div className="space-y-5" id="wizard-step-0-wrap">
            <div>
              <p className="text-xs text-stone-400 mb-3 font-serif italic text-center">
                {isDE 
                  ? "Wähle das Hauptmerkmal deiner Komposition für das gewählte Szenario:" 
                  : "Specify the central focus and subjects of this scenario:"}
              </p>

              {/* Scenario indicator */}
              <div className="bg-stone-950 border border-stone-850 p-2 text-center rounded text-xs font-mono mb-4 text-stone-300">
                {isDE ? "AKTIVE THEMENWELT:" : "ACTIVE GENRE:"}{" "}
                <span className="text-amber-500 font-bold uppercase">{genre}</span>
              </div>

              {/* PORTRAIT SUBJECT SELECTION */}
              {genre === "portrait" && (
                <div className="space-y-4" id="wizard-portrait-subjects">
                  <div>
                    <span className="block text-[10px] font-mono text-stone-400 uppercase tracking-widest mb-2">
                      {isDE ? "Charakter-Rolle" : "Character Role"}
                    </span>
                    <div className="flex flex-wrap gap-2" id="w-role-pills">
                      {options.roles.slice(0, 8).map(r => (
                        <button
                          key={r}
                          onClick={() => handleSelectPill("role", r, "role")}
                          className={`px-3 py-1.5 rounded text-xs font-serif transition ${
                            isSelected("role", r) ? "bg-amber-500 text-black font-bold" : "bg-stone-900 border border-stone-800 text-stone-300 hover:border-stone-700"
                          }`}
                        >
                          {getLangText(r, language)}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="block text-[10px] font-mono text-stone-400 uppercase tracking-widest mb-2">
                      {isDE ? "Nationalität & Herkunft" : "Nationality Context"}
                    </span>
                    <div className="flex flex-wrap gap-2" id="w-nationality-pills">
                      {options.subject_traits.slice(0, 6).map(t => (
                        <button
                          key={t}
                          onClick={() => handleSelectPill("traits", t, "traits")}
                          className={`px-3 py-1.5 rounded text-xs transition font-mono ${
                            isSelected("traits", t) ? "bg-amber-500 text-black font-semibold" : "bg-stone-900 border border-stone-800 text-stone-400 hover:border-stone-700"
                          }`}
                        >
                          {getLangText(t, language).split(",")[0]}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* LANDSCAPE SUBJECT SELECTION */}
              {genre === "landscape" && (
                <div>
                  <span className="block text-[10px] font-mono text-stone-400 uppercase tracking-widest mb-2">
                    {isDE ? "Natur- & Landschaftsmotiv" : "Natural Scenery Target"}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2" id="w-landscape-pills">
                    {options.landscape_subjects.slice(0, 10).map(sub => (
                      <button
                        key={sub}
                        onClick={() => handleSelectPill("landscape_subject", sub, "landscape_subject")}
                        className={`px-3 py-2.5 rounded text-xs text-left font-serif transition block truncate ${
                          isSelected("landscape_subject", sub) ? "bg-amber-500 text-black font-bold" : "bg-stone-900 border border-stone-800 text-stone-300 hover:border-stone-700"
                        }`}
                      >
                        🗻 {getLangText(sub, language)}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* OBJECTS SUBJECT SELECTION */}
              {genre === "objects" && (
                <div>
                  <span className="block text-[10px] font-mono text-stone-400 uppercase tracking-widest mb-2">
                    {isDE ? "Stillleben u. Gegenstände" : "Still life Object Targets"}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2" id="w-objects-pills">
                    {options.object_subjects.slice(0, 10).map(obj => (
                      <button
                        key={obj}
                        onClick={() => handleSelectPill("object_subject", obj, "object_subject")}
                        className={`px-3 py-2.5 rounded text-xs text-left font-serif transition block truncate ${
                          isSelected("object_subject", obj) ? "bg-amber-500 text-black font-bold" : "bg-stone-900/90 border border-stone-800 text-stone-300 hover:border-stone-700"
                        }`}
                      >
                        📦 {getLangText(obj, language)}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 1: HARDWARE & OPTICS */}
        {step === 1 && (
          <div className="space-y-4" id="wizard-step-1-wrap">
            <div>
              <span className="block text-[10px] font-mono text-stone-400 uppercase tracking-widest mb-1.5">
                {isDE ? "Kameraklasse / Format" : "Camera format class"}
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-[120px] overflow-y-auto pr-1" id="w-camtype-grid">
                {Object.keys(options.cameras).map(ct => (
                  <button
                    key={ct}
                    onClick={() => {
                      setSettings(prev => {
                        const updated = { ...prev, camera_type: ct };
                        const cams = options.cameras[ct] || [];
                        updated.camera = cams[0] || "Default Camera";
                        const lenses = options.lenses[ct] || [];
                        updated.lens = lenses[0] || "Default Lens";
                        const listFilms = options.films[ct] || [];
                        updated.film = listFilms[0] || "Default Film";
                        return updated;
                      });
                    }}
                    className={`px-2 py-2 rounded text-[11px] font-mono transition text-center truncate ${
                      settings.camera_type === ct ? "bg-amber-500 text-black font-bold" : "bg-stone-900 border border-stone-800 text-stone-300 hover:border-stone-700"
                    }`}
                  >
                    {getLangText(ct, language)}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="w-cams-lenses-block">
              <div>
                <span className="block text-[10px] font-mono text-stone-400 uppercase tracking-widest mb-1.5">
                  {isDE ? "Präzises Gehäuse" : "Gehäuse body"}
                </span>
                <select
                  value={settings.camera}
                  onChange={(e) => setSettings(prev => ({ ...prev, camera: e.target.value }))}
                  className="w-full bg-stone-900 border border-stone-800 rounded px-2.5 py-2 text-xs font-serif text-stone-200 focus:outline-none focus:border-amber-500"
                >
                  {(options.cameras[settings.camera_type] || []).map(cam => (
                    <option key={cam} value={cam}>{getLangText(cam, language)}</option>
                  ))}
                </select>
              </div>

              <div>
                <span className="block text-[10px] font-mono text-stone-400 uppercase tracking-widest mb-1.5">
                  {isDE ? "Eingesetzte Linse / Glass" : "Lens Optics"}
                </span>
                <select
                  value={settings.lens}
                  onChange={(e) => setSettings(prev => ({ ...prev, lens: e.target.value }))}
                  className="w-full bg-stone-900 border border-stone-800 rounded px-2.5 py-2 text-xs font-serif text-stone-200 focus:outline-none focus:border-amber-500"
                >
                  {(options.lenses[settings.camera_type] || []).map(ln => (
                    <option key={ln} value={ln}>{getLangText(ln, language)}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* HIGH READABILITY CAPTION PANEL FOR GEAR */}
            <div className="bg-[#050505] border border-stone-850 p-3 rounded text-[11px] font-serif italic text-amber-500/90 leading-normal">
              {isDE ? "Ausgewähltes Equipment:" : "Selected Setup:"} {getLangText(settings.camera || "", language)} • {getLangText(settings.lens || "", language)}
            </div>
          </div>
        )}

        {/* STEP 2: FILM & PAPER CHEMISTRY */}
        {step === 2 && (
          <div className="space-y-4" id="wizard-step-2-wrap">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Ordinary Film Stock */}
              <div>
                <span className="block text-[10px] font-mono text-stone-400 uppercase tracking-widest mb-1.5">
                  {isDE ? "Standard Fotofilm" : "Standard Film stock"}
                </span>
                <select
                  value={settings.film}
                  onChange={(e) => setSettings(prev => ({ ...prev, film: e.target.value }))}
                  className="w-full bg-stone-900 border border-stone-800 rounded px-2.5 py-2 text-xs font-serif text-stone-200 focus:outline-none focus:border-amber-500"
                >
                  {(options.films[settings.camera_type] || []).map(fl => (
                    <option key={fl} value={fl}>{getLangText(fl, language)}</option>
                  ))}
                </select>
              </div>

              {/* Expired Film Choice */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="block text-[10px] font-mono text-stone-400 uppercase tracking-widest">
                    ⚠️ {isDE ? "Überlagerter Film (Alters-Unikat)" : "Vintage Expired Stock"}
                  </span>
                  <input
                    type="checkbox"
                    checked={includes.expired_film}
                    onChange={(e) => setIncludes(prev => ({ ...prev, expired_film: e.target.checked }))}
                    className="w-4 h-4 accent-amber-500 cursor-pointer"
                  />
                </div>
                <select
                  disabled={!includes.expired_film}
                  value={settings.expired_film}
                  onChange={(e) => setSettings(prev => ({ ...prev, expired_film: e.target.value }))}
                  className="w-full bg-stone-900 border border-stone-800 rounded px-2.5 py-2 text-xs font-serif text-stone-200 focus:outline-none focus:border-amber-500 disabled:opacity-30"
                >
                  {options.expired_films.map(ef => (
                    <option key={ef} value={ef}>{getLangText(ef, language)}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Expired baryt paper */}
            <div className="bg-stone-900/60 border border-stone-850 p-3.5 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={includes.expired_paper}
                    onChange={(e) => setIncludes(prev => ({ ...prev, expired_paper: e.target.checked }))}
                    className="w-4 h-4 accent-amber-500 cursor-pointer shrink-0"
                    id="wizard-expired-paper-check"
                  />
                  <span className="block text-[10px] font-mono text-stone-400 uppercase tracking-widest">
                    📜 {isDE ? "Überlagertes Barytpapier für Kontaktabzug" : "Alternative Vintage papers"}
                  </span>
                </div>
              </div>
              <select
                disabled={!includes.expired_paper}
                value={settings.expired_paper}
                onChange={(e) => setSettings(prev => ({ ...prev, expired_paper: e.target.value }))}
                className="w-full bg-stone-900/90 border border-stone-800 rounded px-2.5 py-2 text-xs font-serif text-stone-200 focus:outline-none focus:border-amber-500 disabled:opacity-30"
              >
                {options.expired_papers.map(ep => (
                  <option key={ep} value={ep}>{getLangText(ep, language)}</option>
                ))}
              </select>
            </div>

            {/* HIGH READABILITY CAPTION FOR EMULSIONS */}
            {includes.expired_film && (
              <div className="bg-red-500/5 border border-red-500/20 p-3 rounded text-[11px] font-serif text-amber-500 italic leading-snug">
                ⚠️ {isDE ? "WARNUNG: Chemischer Alters-Farbstich aktiv!" : "WARNING: Unpredictable dynamic chemical decay active!"} <br />
                {getLangText(settings.expired_film || "", language)}
              </div>
            )}
          </div>
        )}

        {/* STEP 3: LIGHT & DARKROOM PROCESSES */}
        {step === 3 && (
          <div className="space-y-4" id="wizard-step-3-wrap">
            <div>
              <span className="block text-[10px] font-mono text-stone-400 uppercase tracking-widest mb-1.5">
                {isDE ? "Dramatisches Licht-Setup" : "Studio & Outdoor Lighting design"}
              </span>
              <select
                value={settings.lighting}
                onChange={(e) => setSettings(prev => ({ ...prev, lighting: e.target.value }))}
                className="w-full bg-stone-900 border border-stone-800 rounded px-2.5 py-2 text-xs font-serif text-stone-200 focus:outline-none focus:border-amber-500"
              >
                {options.lighting.map(li => (
                  <option key={li} value={li}>{getLangText(li, language)}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="block text-[10px] font-mono text-stone-400 uppercase tracking-widest mb-1.5">
                  🧪 {isDE ? "Dunkelkammer-Entwickler-Bäder" : "Darkroom processes & chemical developers"}
                </span>
                <select
                  value={settings.post_processing}
                  onChange={(e) => setSettings(prev => ({ ...prev, post_processing: e.target.value }))}
                  className="w-full bg-stone-900 border border-stone-800 rounded px-2.5 py-2 text-xs font-serif text-stone-200 focus:outline-none focus:border-amber-500"
                >
                  {options.post_processing.map(pp => (
                    <option key={pp} value={pp}>{getLangText(pp, language)}</option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="block text-[10px] font-mono text-stone-400 uppercase tracking-widest">
                    📜 {isDE ? "Edler Museums-Archivabzug" : "Fine-art Archival print"}
                  </span>
                  <input
                    type="checkbox"
                    checked={includes.quality}
                    onChange={(e) => setIncludes(prev => ({ ...prev, quality: e.target.checked }))}
                    className="w-4 h-4 accent-amber-500 cursor-pointer"
                  />
                </div>
                <select
                  disabled={!includes.quality}
                  value={settings.quality}
                  onChange={(e) => setSettings(prev => ({ ...prev, quality: e.target.value }))}
                  className="w-full bg-stone-900 border border-stone-800 rounded px-2.5 py-2 text-xs font-serif text-stone-200 focus:outline-none focus:border-amber-500 disabled:opacity-30"
                >
                  {options.quality_levels.map(ql => (
                    <option key={ql} value={ql}>{getLangText(ql, language)}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* DETAILED PRINT REVIEW */}
            <div className="bg-[#050505] border border-stone-850 p-3 rounded-lg text-xs leading-normal mt-3" id="wizard-print-selected-preview">
              <span className="text-amber-500 font-mono text-[9px] uppercase font-bold block mb-1">🧪 DUNKELKAMMER & PAPIER STATUS:</span>
              <div className="text-stone-300 font-serif text-[11px] leading-relaxed">
                🧪 Dev: <span className="font-bold text-white">{getLangText(settings.post_processing || "", language)}</span> <br />
                {includes.quality && (
                  <>📜 Paper: <span className="text-stone-400">{getLangText(settings.quality || "", language)}</span> <br /></>
                )}
                {includes.expired_paper && (
                  <>⏳ Expired Paper: <span className="text-amber-500/90">{getLangText(settings.expired_paper || "", language)}</span></>
                )}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Navigation Buttons Row */}
      <div className="flex justify-between items-center border-t border-stone-850 pt-4 mt-5" id="wizard-navigation">
        <button
          disabled={step === 0}
          onClick={() => setStep(prev => Math.max(0, prev - 1))}
          className="px-4 py-2 border border-stone-800 bg-stone-900 hover:bg-stone-850 text-stone-300 text-xs font-mono uppercase tracking-widest rounded disabled:opacity-35 transition cursor-pointer"
          id="wizard-prev-btn"
        >
          &larr; {isDE ? "Zurück" : "Prev"}
        </button>

        <span className="text-xs font-mono text-stone-500">
          {isDE ? "Schritt" : "Step"} {step + 1} / 4
        </span>

        {step < 3 ? (
          <button
            onClick={() => setStep(prev => Math.min(3, prev + 1))}
            className="px-4 py-2 bg-white text-black hover:bg-stone-200 text-xs font-mono uppercase tracking-widest rounded font-bold transition cursor-pointer"
            id="wizard-next-btn"
          >
            {isDE ? "Weiter" : "Next"} &rarr;
          </button>
        ) : (
          <div className="text-xs font-mono text-emerald-500 font-bold flex items-center gap-1.5 animate-pulse">
            <Check className="w-4 h-4" />
            <span>{isDE ? "FOTO EXPOSITION BEREIT!" : "EXPOSURE FIXED!"}</span>
          </div>
        )}
      </div>
    </div>
  );
};
