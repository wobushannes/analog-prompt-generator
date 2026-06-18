import React, { useState } from "react";
import { Sliders, Plus, Check, ShieldAlert, Trash2 } from "lucide-react";
import { PromptOptions } from "../data";

interface InventoryManagerProps {
  options: PromptOptions;
  onUpdateOptions: (newOptions: PromptOptions) => void;
  language: "Deutsch" | "English";
}

export const InventoryManagerTab = ({
  options,
  onUpdateOptions,
  language
}: InventoryManagerProps) => {
  const [selectedMainCat, setSelectedMainCat] = useState<string>("cameras");
  const [newVal, setNewVal] = useState<string>("");
  const [selectedSubCat, setSelectedSubCat] = useState<string>("");
  const [actionSuccess, setActionSuccess] = useState<boolean>(false);

  const isDE = language === "Deutsch";

  // Categories translation mapping
  const categoryLabels: Record<string, string> = {
    portrait_types: isDE ? "Porträt-Klassifizierungen" : "Portrait Typologies",
    cameras: isDE ? "Kamera-Gehäuse" : "Camera Vault",
    films: isDE ? "Film-Emulsionen" : "Film Stocks",
    lenses: isDE ? "Objektive & Glas" : "Lenses & Glass",
    styles: isDE ? "Meisterfotografen Stile" : "Photography Master Styles",
    mens_clothing: isDE ? "Herren-Kleidung" : "Men's Clothing styles",
    womens_clothing: isDE ? "Damen-Kleidung" : "Women's Clothing styles",
    lighting: isDE ? "Licht-Setups" : "Creative lighting Setups",
    backgrounds: isDE ? "Bildhintergründe" : "Background Scenery",
    props: isDE ? "Requisiten & Gegenstände" : "Storytelling Props",
    ambiance: isDE ? "Atmosphären & Stimmungen" : "Ambiance & Moods",
    effects: isDE ? "Fotografische Gesamteffekte" : "Overall Photo Effects",
    post_processing: isDE ? "Labor-Entwicklungs-Optionen" : "Darkroom Processes",
    cultural_elements: isDE ? "Kulturelle Einflüsse" : "Cultural Accents",
    time_periods: isDE ? "Epochen & Dekaden" : "Periods & Decades",
    weather_conditions: isDE ? "Wetterbühnen" : "Weather Scenes",
    expired_papers: isDE ? "Überlagerte Fotopapiere (Expired Paper)" : "Expired Photo Papers",
    expired_films: isDE ? "Überlagerte Filmemulsionen (Expired Film)" : "Expired Film Stocks",
    object_subjects: isDE ? "Objekt- / Sachmotive" : "Object Still Life Subjects",
    landscape_subjects: isDE ? "Landschafts-Motive" : "Scenic Landscape Subjects",
    street_subjects: isDE ? "Strassenfotografie-Szenen" : "Street Candid Scenes"
  };

  const getCleanLabel = (text: string) => {
    if (!text) return "";
    if (text.includes(" / ")) {
      const parts = text.split(" / ");
      return isDE ? parts[0].trim() : parts[1].trim();
    }
    return text;
  };

  const isNested = ["cameras", "films", "lenses"].includes(selectedMainCat);

  // Available subcategories for nested lists
  const availableSubCats = isNested 
    ? Object.keys(options[selectedMainCat as "cameras" | "films" | "lenses"] || {}) 
    : [];

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVal.trim()) return;

    const updated = { ...options };

    if (isNested) {
      if (!selectedSubCat) return;
      const targetDict = updated[selectedMainCat as "cameras" | "films" | "lenses"];
      
      if (targetDict[selectedSubCat]) {
        // Prevent duplicate
        if (!targetDict[selectedSubCat].includes(newVal.trim())) {
          targetDict[selectedSubCat] = [...targetDict[selectedSubCat], newVal.trim()];
        }
      } else {
        targetDict[selectedSubCat] = [newVal.trim()];
      }
    } else {
      const arr = updated[selectedMainCat as keyof PromptOptions];
      if (Array.isArray(arr)) {
        if (!arr.includes(newVal.trim())) {
          (updated as any)[selectedMainCat] = [...arr, newVal.trim()];
        }
      }
    }

    onUpdateOptions(updated);
    setNewVal("");
    setActionSuccess(true);
    setTimeout(() => {
      setActionSuccess(false);
    }, 2500);
  };

  const handleDeleteItem = (itemToDelete: string, subCatName?: string) => {
    const updated = { ...options };

    if (isNested && subCatName) {
      const targetDict = updated[selectedMainCat as "cameras" | "films" | "lenses"];
      if (targetDict[subCatName]) {
        targetDict[subCatName] = targetDict[subCatName].filter(item => item !== itemToDelete);
      }
    } else {
      const arr = updated[selectedMainCat as keyof PromptOptions];
      if (Array.isArray(arr)) {
        (updated as any)[selectedMainCat] = arr.filter(item => item !== itemToDelete);
      }
    }

    onUpdateOptions(updated);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="inventory-tab">
      {/* Col 1: Category Selector + Entry Add Form */}
      <div className="lg:col-span-5 space-y-6" id="add-inventory-panel">
        <div className="bg-[#18181c] border border-stone-800 rounded-xl p-6 shadow-xl" id="add-inventory-card">
          <div className="flex items-center gap-2 mb-4" id="inventory-header">
            <Sliders className="w-5 h-5 text-amber-500" id="inventory-sliders-icon" />
            <h3 className="text-lg font-serif font-semibold text-white" id="inventory-title">
              {isDE ? "Optionen-Katalog erweitern" : "Add Custom Equipment"}
            </h3>
          </div>
          <p className="text-xs text-stone-400 mb-6" id="inventory-desc">
            {isDE 
              ? "Ergänze eigene Kameras, Objektive, Lieblingsemulsionen oder Stimmungsattribute. Diese stehen sofort im Editor zur Verfügung."
              : "Inject bespoke machinery, specific custom lenses, experimental film chemistry, or niche ambiance modifiers instantly."}
          </p>

          <form onSubmit={handleAddItem} className="space-y-4" id="inventory-form">
            {/* Main Category */}
            <div id="main-cat-selector">
              <label className="block text-xs font-mono uppercase text-stone-400 mb-1.5" id="main-cat-lbl">
                {isDE ? "Hauptkategorie" : "Aperture Category"}
              </label>
              <select
                value={selectedMainCat}
                onChange={(e) => {
                  setSelectedMainCat(e.target.value);
                  setNewVal("");
                  // auto select first subcat if nested
                  const isNowNested = ["cameras", "films", "lenses"].includes(e.target.value);
                  if (isNowNested) {
                    const keys = Object.keys(options[e.target.value as "cameras" | "films" | "lenses"] || {});
                    setSelectedSubCat(keys[0] || "");
                  }
                }}
                className="w-full bg-stone-900 border border-stone-800 text-stone-200 text-sm rounded-lg px-3.5 py-2.5 focus:border-amber-500 focus:outline-none transition"
                id="main-cat-dropdown"
              >
                {Object.keys(categoryLabels).map((key) => (
                  <option key={key} value={key}>
                    {categoryLabels[key]}
                  </option>
                ))}
              </select>
            </div>

            {/* Sub Category for Nested */}
            {isNested && (
              <div id="sub-cat-selector">
                <label className="block text-xs font-mono uppercase text-stone-400 mb-1.5" id="sub-cat-lbl">
                  {isDE ? "Unterkategorie / Film-Kameratyp" : "Target Format Group"}
                </label>
                <select
                  value={selectedSubCat}
                  onChange={(e) => setSelectedSubCat(e.target.value)}
                  className="w-full bg-stone-900 border border-stone-800 text-stone-200 text-sm rounded-lg px-3.5 py-2.5 focus:border-amber-500 focus:outline-none transition"
                  id="sub-cat-dropdown"
                >
                  {availableSubCats.map((sc) => (
                    <option key={sc} value={sc}>
                      {getCleanLabel(sc)}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Input Value */}
            <div id="entry-value-wrap">
              <label className="block text-xs font-mono uppercase text-stone-400 mb-1.5" id="entry-value-lbl">
                {isDE ? "Wert (zweispaltig empfohlen, z.B. 'Zonensystem / Zone System')" : "Value Nominee (Bilingual 'German / English' recommended)"}
              </label>
              <input
                type="text"
                required
                placeholder={isDE ? "z.B. Leica CL / Leica CL Pocket" : "e.g. Vintage Fomapan 200 / Retro Fomapan 200"}
                value={newVal}
                onChange={(e) => setNewVal(e.target.value)}
                className="w-full bg-stone-900 border border-stone-800 text-stone-200 text-sm rounded-lg px-4 py-2.5 focus:border-amber-500 focus:outline-none placeholder-stone-600 transition"
                id="entry-value-input"
              />
            </div>

            {/* Success state info */}
            {actionSuccess && (
              <div className="p-3 bg-green-950/20 border border-green-900/40 rounded-lg text-xs text-green-400 flex items-center gap-2" id="action-success-alert">
                <Check className="w-4 h-4" id="success-check-icon" />
                <span>
                  {isDE ? "Erfolgreich hinzugefügt u. gesichert!" : "Item successfully registered & deployed!"}
                </span>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-400 text-stone-950 text-sm font-semibold rounded-lg py-3 flex items-center justify-center gap-2 transition shadow-lg shadow-amber-500/10 cursor-pointer"
              id="add-item-btn"
            >
              <Plus className="w-4 h-4" id="add-item-icon" />
              <span>{isDE ? "Neu aufnehmen" : "Commit to Catalogue"}</span>
            </button>
          </form>
        </div>

        {/* Safety Note */}
        <div className="bg-stone-900/40 border border-stone-850 p-4 rounded-xl flex gap-3 text-stone-400 text-xs leading-relaxed" id="safety-note-wrap">
          <ShieldAlert className="w-5 h-5 text-amber-500/60 shrink-0 mt-0.5" id="safety-warning-icon" />
          <p id="safety-warning-text">
            {isDE 
              ? "Änderungen werden lokal in deinem Browser gelöscht, wenn du den Cache leerst. Du kannst aber jederzeit eigene Modifikationen hinzufügen."
              : "Updates are saved to HTML5 LocalStorage, remaining active within this browser space even upon page reloads."}
          </p>
        </div>
      </div>

      {/* Col 2: Inventory browser & Deleter */}
      <div className="lg:col-span-7" id="view-inventory-panel">
        <div className="bg-[#18181c] border border-stone-800 rounded-xl p-6 shadow-xl h-full flex flex-col" id="view-inventory-card">
          <h3 className="text-lg font-serif font-semibold text-white mb-1" id="view-inventory-title">
            {isDE ? "Aktuelles Inventar durchsuchen" : "Option Reservoir Catalogue"}
          </h3>
          <p className="text-xs text-stone-400 mb-4 border-b border-stone-850 pb-3" id="view-inventory-subtitle">
            {isDE 
              ? `Kategorie: ${categoryLabels[selectedMainCat]} - Tippe, um Einträge anzusehen oder zu löschen`
              : `Viewing: ${categoryLabels[selectedMainCat]}`}
          </p>

          <div className="flex-1 overflow-y-auto max-h-[500px] space-y-2 pr-2" id="inventory-list-container">
            {isNested ? (
              // Nested category rendering
              availableSubCats.map((subcat) => {
                const arr = options[selectedMainCat as "cameras" | "films" | "lenses"][subcat] || [];
                if (arr.length === 0) return null;
                return (
                  <div key={subcat} className="space-y-1.5" id={`nested-subcat-group-${subcat}`}>
                    <h4 className="text-xs font-mono text-amber-500 tracking-wider uppercase mt-3 mb-1" id={`nested-subcat-title-${subcat}`}>
                      ({getCleanLabel(subcat)})
                    </h4>
                    {arr.map((item, index) => (
                      <div 
                        key={index} 
                        className="flex items-center justify-between p-2 bg-stone-900 hover:bg-stone-850 border border-stone-850 hover:border-stone-800 rounded text-xs text-stone-300 transition"
                        id={`nested-item-${subcat}-${index}`}
                      >
                        <span className="truncate select-all" id={`nested-item-text-${subcat}-${index}`}>{getCleanLabel(item)}</span>
                        <button
                          onClick={() => handleDeleteItem(item, subcat)}
                          className="p-1 text-stone-500 hover:text-red-400 transition"
                          title={isDE ? "Diesen Eintrag löschen" : "Purge record"}
                          id={`nested-item-delete-${subcat}-${index}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" id={`nested-item-delete-icon-${subcat}-${index}`} />
                        </button>
                      </div>
                    ))}
                  </div>
                );
              })
            ) : (
              // Flat category rendering
              (options[selectedMainCat as keyof PromptOptions] as string[] || []).map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-2.5 bg-stone-900 hover:bg-stone-850 border border-stone-850 hover:border-stone-800 rounded text-xs text-stone-300 transition"
                  id={`flat-item-${index}`}
                >
                  <span className="truncate select-all" id={`flat-item-text-${index}`}>{getCleanLabel(item)}</span>
                  <button
                    onClick={() => handleDeleteItem(item)}
                    className="p-1 text-stone-500 hover:text-red-400 transition"
                    title={isDE ? "Diesen Eintrag löschen" : "Purge record"}
                    id={`flat-item-delete-${index}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" id={`flat-item-delete-icon-${index}`} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
