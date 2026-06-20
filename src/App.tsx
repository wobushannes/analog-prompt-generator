import { useState, useEffect, useCallback } from "react";
import { 
  promptOptionsData, 
  translationsData, 
  PromptOptions 
} from "./data";
import { SavedPrompt, PresetRecipe } from "./types";
import { LibraryTab, presetRecipes } from "./components/LibraryTab";
import { InventoryManagerTab } from "./components/InventoryManagerTab";
import { HistoryTab } from "./components/HistoryTab";
import { StudioWizard } from "./components/StudioWizard";
import { StudioDialog } from "./components/StudioDialog";
import { 
  Camera, 
  Layers, 
  Sliders, 
  Bookmark, 
  BookOpen, 
  Copy, 
  Check, 
  RefreshCw, 
  Save, 
  Sparkles, 
  Settings, 
  ChevronDown, 
  History, 
  Workflow, 
  Languages, 
  AlertCircle,
  FolderLock
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

function getLangText(text: string, lang: "Deutsch" | "English"): string {
  if (!text) return "";
  if (text.includes(" / ")) {
    const parts = text.split(" / ");
    return lang === "Deutsch" ? parts[0].trim() : parts[1].trim();
  }
  // Robust translation fallbacks for legacy/direct gender selections
  if (text === "Männlich") return lang === "Deutsch" ? "Männlich" : "Male";
  if (text === "Weiblich") return lang === "Deutsch" ? "Weiblich" : "Female";
  if (text === "Diverse") return lang === "Deutsch" ? "Diverse" : "Non-binary";
  if (text === "Male") return lang === "Deutsch" ? "Männlich" : "Male";
  if (text === "Female") return lang === "Deutsch" ? "Weiblich" : "Female";
  return text;
}

function getShortDisplay(text: string, lang: "Deutsch" | "English"): string {
  const part = getLangText(text, lang);
  if (!part) return "";
  // Split using common delimiters like comma, colon, semicolon, or parenthesis
  const delimiters = [",", ":", ";", " - "];
  for (const delim of delimiters) {
    if (part.includes(delim)) {
      return part.split(delim)[0].trim();
    }
  }
  return part;
}

export default function App() {
  const [language, setLanguage] = useState<"Deutsch" | "English">("Deutsch");
  const isDE = language === "Deutsch";
  const [activeTab, setActiveTab ] = useState<"studio" | "archive" | "history" | "inventory">("studio");
  
  // Theme/Genre Selection State
  const [genre, setGenre] = useState<"portrait" | "landscape" | "objects">(() => {
    const stored = localStorage.getItem("analog_prompt_genre");
    if (stored === "regular") return "objects";
    return (stored as any) || "portrait";
  });

  // Studio UI mode State: console (tactile) vs clicker (baukasten) vs dialog (geführter dialog)
  const [studioMode, setStudioMode] = useState<"console" | "clicker" | "dialog">(() => {
    const stored = localStorage.getItem("analog_prompt_studio_mode");
    return (stored as any) || "console";
  });

  // Save genre/studioMode states to localStorage when updated
  useEffect(() => {
    localStorage.setItem("analog_prompt_genre", genre);
  }, [genre]);

  useEffect(() => {
    localStorage.setItem("analog_prompt_studio_mode", studioMode);
  }, [studioMode]);

  // Custom expandable options
  const [options, setOptions] = useState<PromptOptions>(() => {
    const stored = localStorage.getItem("analog_prompt_options_v2");
    if (stored) {
      try { return JSON.parse(stored); } catch (e) { /* ignore */ }
    }
    return promptOptionsData;
  });
  // Settings selections
  const [settings, setSettings] = useState<Record<string, string>>(() => {
    const defaults = promptOptionsData.defaults;
    // Attempt to read from localStorage if possible
    const stored = localStorage.getItem("analog_prompt_settings_v3");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return { ...defaults, ...parsed };
      } catch (e) { /* ignore */ }
    }
    // Falling back to fine-tuned defaults
    return {
      ...defaults,
      location: "Studio / Innenaufnahme",
      type: "C41 (Farbe) / C41 (Color)",
      success: "legendär / legendary",
      nationality: "Moroccan",
      role: "Visionär / visionary",
      gender: "Männlich / Male",
      age_range: "reif (40er), erfahren und weise / mature (40s), seasoned and wise",
      camera_type: "Mittelformat / Medium Format",
      camera: "Mamiya RZ67 Pro II",
      lens: "Mamiya Sekor C 80mm f/2.8, mittelformatige Fülle und Klarheit / Mamiya Sekor C 80mm f/2.8, medium-format richness and clarity",
      film: "Kodak Portra 160, zarte Pastelltöne mit feinem Korn / Kodak Portra 160, delicate pastels with fine grain",
      film_detail: "mit starkem Korn für eine raue Textur / with heavy grain for a gritty texture",
      quality: "Museum: Archivqualität, feinste Details, Platin-Palladium-Druck / Museum: archival quality, finest detail, platinum-palladium print",
      traits: "visionärer Anführer, intensiver Fokus mit stiller Stärke, strategischer Denker / visionary leader, intense focus with quiet strength, strategic thinker",
      details: "durchdringende blaue Augen mit komplexen Iris-Mustern, sonnengeküsste Haut mit leichten Sommersprossen, zerzaustes kastanienbraunes Haar mit goldenen Highlights, hochdetailliert / piercing blue eyes with intricate iris patterns, sun-kissed skin with faint freckles, tousled chestnut hair with golden highlights, highly detailed",
      style: "Annie Leibovitz: reiche Texturen, filmische Tiefe / Annie Leibovitz: rich textures, cinematic depth",
      clothing: "dreiteiliger Anthrazit-Anzug mit Seidenkrawatte / three-piece charcoal suit with a silk tie",
      cultural_element: "marokkanischer Kaftan mit aufwendiger Stickerei / Moroccan kaftan with intricate embroidery",
      time_period: "1920er Flapper, jazzig und kühn / 1920s flapper, jazzy and bold",
      pose: "sitzend mit leichter Neigung, entspannt doch gefasst / seated with a slight lean, relaxed yet poised",
      lighting: "dramatisch aber subtil mit klarem Lichtrand, der Entschlossenheit betont / dramatic yet subtle with a clear light edge emphasizing determination",
      background: "weicher grauer Farbverlauf mit rauchigem Dunst / soft gray gradient with a smoky haze",
      prop: "neben einem Stapel ledergebundener Bücher / next to a stack of leather-bound books",
      ambiance: "an einem regnerischen Nachmittag mit weichem, diffusem Glanz / on a rainy afternoon with soft, diffused glow",
      weather: "im strömenden Regen mit glitzernden Reflexionen / shot in pouring rain with glistening reflections",
      emotion: "Augen, die mit unausgesprochener Wut lodern / eyes blazing with unspoken fury",
      post_processing_choice: "yes",
      post_processing: "Selen-Tonung, reiche Purpurtöne und verbesserte Tiefe / selenium toning, rich purples and enhanced depth",
      effect: "Respekt einflößend, beeindruckende Präsenz, Autorität einfangend / commanding respect, impressive presence, capturing authority",
      negative_prompt: "blurry, low quality, distorted, extra limbs, bad digital render, smooth plastic look, 3d, airbrushed skin",
      free_text: ""
    };
  });

  // Save settings on change
  useEffect(() => {
    localStorage.setItem("analog_prompt_settings_v3", JSON.stringify(settings));
  }, [settings]);

  // Checkbox inclusions state
  const [includes, setIncludes] = useState<Record<string, boolean>>(() => {
    const defaultInclusions: Record<string, boolean> = {};
    const defaults = promptOptionsData.defaults;
    Object.keys(defaults).forEach((key) => {
      if (key.endsWith("_include")) {
        const fieldName = key.replace("_include", "");
        defaultInclusions[fieldName] = (defaults[key as keyof typeof defaults] === "yes");
      }
    });
    // Add additional fields not ending in include explicitly
    defaultInclusions["location"] = true;
    defaultInclusions["gender"] = true;
    defaultInclusions["nationality"] = true;
    defaultInclusions["age"] = true;
    defaultInclusions["camera"] = true;
    defaultInclusions["lens"] = true;
    defaultInclusions["film"] = true;
    defaultInclusions["film_detail"] = true;
    defaultInclusions["quality"] = true;
    defaultInclusions["style"] = true;
    defaultInclusions["clothing"] = true;
    defaultInclusions["cultural"] = true;
    defaultInclusions["time_period"] = true;
    defaultInclusions["pose"] = true;
    defaultInclusions["lighting"] = true;
    defaultInclusions["background"] = true;
    defaultInclusions["props"] = true;
    defaultInclusions["ambiance"] = true;
    defaultInclusions["weather"] = true;
    defaultInclusions["emotion"] = true;
    defaultInclusions["post_processing"] = true;
    defaultInclusions["effect"] = true;
    defaultInclusions["success"] = true;
    defaultInclusions["role"] = true;
    defaultInclusions["details"] = true;
    return defaultInclusions;
  });

  // Stored favorites state
  const [savedPrompts, setSavedPrompts] = useState<SavedPrompt[]>(() => {
    const stored = localStorage.getItem("analog_saved_prompts_v2");
    if (stored) {
      try { return JSON.parse(stored); } catch (e) { /* ignore */ }
    }
    return [];
  });

  // Session history state (last 10 generated/compiled prompts)
  const [historyPrompts, setHistoryPrompts] = useState<SavedPrompt[]>(() => {
    const stored = localStorage.getItem("analog_prompt_history_v2");
    if (stored) {
      try { return JSON.parse(stored); } catch (e) { /* ignore */ }
    }
    return [];
  });

  // Notification overlays
  const [copiedEnglish, setCopiedEnglish] = useState<boolean>(false);
  const [copiedGerman, setCopiedGerman] = useState<boolean>(false);
  const [copiedMarkdown, setCopiedMarkdown] = useState<boolean>(false);
  const [saveModalOpen, setSaveModalOpen] = useState<boolean>(false);
  const [customTitle, setCustomTitle] = useState<string>("");
  const [saveCategory, setSaveCategory] = useState<string>("Porträt analog");
  const [saveTagsString, setSaveTagsString] = useState<string>("");

  // Step-by-Step clicker wizard state
  const [wizardStep, setWizardStep] = useState<number>(0);
  
  // Guided Dialog conversational state
  const [dialogStep, setDialogStep] = useState<number>(0);
  const [dialogLog, setDialogLog] = useState<Array<{ sender: "bot" | "user"; text: string }>>([]);

  // Save changes to LocalStorage on updates
  const handleUpdateOptions = (newOpts: PromptOptions) => {
    setOptions(newOpts);
    localStorage.setItem("analog_prompt_options_v2", JSON.stringify(newOpts));
  };

  useEffect(() => {
    localStorage.setItem("analog_saved_prompts_v2", JSON.stringify(savedPrompts));
  }, [savedPrompts]);

  useEffect(() => {
    localStorage.setItem("analog_prompt_history_v2", JSON.stringify(historyPrompts));
  }, [historyPrompts]);

  // Handle dynamic dropdown filter updates matching PyQt hierarchy
  // 1. Portrait type selection alters camera type list
  const handlePortraitTypeChange = (pType: string) => {
    const targetTypes = options.camera_types_by_portrait_type[pType] || [];
    const firstCamType = targetTypes[0] || "Kleinbild / 35mm";
    
    // Update camera type, trigger cascading gear update
    setSettings(prev => {
      const updated = { ...prev, type: pType, camera_type: firstCamType };
      
      // Determine camera list for this camera type
      const cams = options.cameras[firstCamType] || [];
      const firstCam = cams[0] || "Unknown Camera";
      updated.camera = firstCam;
      
      // Determine lenses list
      const lensesList = options.lenses[firstCamType] || [];
      updated.lens = lensesList[0] || "No lens available";

      // Determine film according to process context
      let firstFilm = "Unknown Film";
      if (pType === "Schwarz-Weiß / Black-and-White") {
        const swFilms = options.films[firstCamType] || [];
        firstFilm = swFilms[0] || "Default B&W Film";
      } else if (pType === "C41 (Farbe) / C41 (Color)") {
        firstFilm = options.films["c41"]?.[0] || "Default C41 Film";
      } else if (pType === "E6 (Dias) / E6 (Slides)") {
        firstFilm = options.films["e6"]?.[0] || "Default E6 Film";
      } else if (pType === "Polaroid / Polaroid") {
        firstFilm = options.films["Polaroid"]?.[0] || "Default Polaroid Film";
      } else if (pType === "Expired / Expired") {
        firstFilm = options.films["expired"]?.[0] || "Default Expired Film";
      } else if (pType === "Experimental / Experimental") {
        firstFilm = options.films["experimental"]?.[0] || "Default Experimental Film";
      }
      updated.film = firstFilm;

      return updated;
    });
  };

  const handleCameraTypeChange = (camType: string) => {
    setSettings(prev => {
      const updated = { ...prev, camera_type: camType };
      
      const cams = options.cameras[camType] || [];
      updated.camera = cams[0] || "Unknown Camera";

      const lensesList = options.lenses[camType] || [];
      updated.lens = lensesList[0] || "No lens available";

      // Update film for general formats if in black and white mode
      if (prev.type === "Schwarz-Weiß / Black-and-White") {
        const swFilms = options.films[camType] || [];
        updated.film = swFilms[0] || "Default B&W Film";
      }

      return updated;
    });
  };

  const handleGenderChange = (newGender: string) => {
    setSettings(prev => {
      const updated = { ...prev, gender: newGender };
      // Switch clothing list automatically
      if (newGender.includes("Männlich") || newGender.includes("Male")) {
        updated.clothing = options.mens_clothing[0];
      } else {
        updated.clothing = options.womens_clothing[0];
      }
      return updated;
    });
  };

  // Compile real-time prompt builders
  const compilePrompt = (lang: "Deutsch" | "English") => {
    const isOutdoor = settings.location?.toLowerCase().includes("outdoor") || settings.location?.toLowerCase().includes("außen") || genre === "landscape";
    const isBW = settings.type?.toLowerCase().includes("weiß") || settings.type?.toLowerCase().includes("white") || settings.type?.toLowerCase().includes("monochrom");

    if (lang === "Deutsch") {
      // 🎞️ MIDJOURNEY / TAG-TOKEN STYLE (Always in English, as requested)
      const tags: string[] = [];
      
      if (genre === "portrait") {
        tags.push(isBW ? "authentic raw black-and-white analog portrait photography" : "authentic professional color analog portrait photography");
        
        let subjectStr = "";
        const parts: string[] = [];
        parts.push(getLangText(settings.gender, "English"));
        if (includes.success) parts.push(getLangText(settings.success, "English"));
        if (includes.nationality && settings.nationality) parts.push(getLangText(settings.nationality, "English"));
        if (includes.role) parts.push(getLangText(settings.role, "English"));
        if (parts.length > 0) subjectStr = parts.join(" ");
        if (subjectStr) tags.push(subjectStr);
        
        if (includes.age) tags.push(getLangText(settings.age_range, "English"));
        if (includes.traits) tags.push(getLangText(settings.traits, "English"));
        if (includes.details) tags.push(getLangText(settings.details, "English"));
        if (includes.pose) tags.push(getLangText(settings.pose, "English"));
        
        const apparel: string[] = [];
        if (includes.clothing) apparel.push(getLangText(settings.clothing, "English"));
        if (includes.cultural) apparel.push(getLangText(settings.cultural_element, "English"));
        if (apparel.length > 0) tags.push(`wearing ${apparel.join(" and ")}`);
        
        if (includes.time_period) tags.push(`in the ${getLangText(settings.time_period, "English")}`);
        if (includes.emotion) tags.push(`with expression of ${getLangText(settings.emotion, "English")}`);
        
        if (settings.free_text && settings.free_text.trim() !== "") {
          tags.push(settings.free_text.trim());
        }
      } else if (genre === "landscape") {
        tags.push(isBW ? "fine-art black and white atmospheric landscape photography" : "breathtaking fine-art color scenic landscape photography");
        if (includes.landscape_subject && settings.landscape_subject) {
          tags.push(getLangText(settings.landscape_subject, "English"));
        }
        if (settings.free_text && settings.free_text.trim() !== "") {
          tags.push(`capturing ${settings.free_text.trim()}`);
        }
      } else { // objects
        tags.push(isBW ? "monochromatic fine-art still life studio object photography" : "high-detail analog still life object photography");
        if (includes.object_subject && settings.object_subject) {
          tags.push(getLangText(settings.object_subject, "English"));
        }
        if (settings.free_text && settings.free_text.trim() !== "") {
          tags.push(settings.free_text.trim());
        }
      }

      // Context extensions for Landscape and Objects
      if (genre !== "portrait") {
        if (includes.season && settings.season) tags.push(`season: ${getLangText(settings.season, "English")}`);
        if (includes.time_of_day && settings.time_of_day) tags.push(`time of day: ${getLangText(settings.time_of_day, "English")}`);
        if (includes.camera_elevation && settings.camera_elevation) tags.push(`elevation view: ${getLangText(settings.camera_elevation, "English")}`);
      }

      // Technical Gear & Film Info
      if (includes.camera && settings.camera) tags.push(`camera: ${getLangText(settings.camera, "English")}`);
      if (includes.lens && settings.lens) tags.push(`lens: ${getLangText(settings.lens, "English")}`);
      
      if (includes.expired_film && settings.expired_film) {
        tags.push(`vintage expired film: ${getLangText(settings.expired_film, "English")}`);
      } else if (includes.film && settings.film) {
        let filmBase = getLangText(settings.film, "English");
        if (includes.film_detail && settings.film_detail) {
          filmBase += `, ${getLangText(settings.film_detail, "English")}`;
        }
        tags.push(`film base: ${filmBase}`);
      } else if (includes.film_detail && settings.film_detail) {
        tags.push(getLangText(settings.film_detail, "English"));
      }

      // Enlarging Paper & Style details
      if (includes.expired_paper && settings.expired_paper) {
        tags.push(`expired photography paper: ${getLangText(settings.expired_paper, "English")}`);
      } else if (includes.quality && settings.quality) {
        tags.push(`printed raw archival: ${getLangText(settings.quality, "English")}`);
      }

      if (includes.style && settings.style) tags.push(`photographer influence: ${getLangText(settings.style, "English")}`);
      if (includes.lighting && settings.lighting) tags.push(`lighting setting: ${getLangText(settings.lighting, "English")}`);
      
      if (genre === "portrait" || genre === "objects") {
        if (includes.background && settings.background) tags.push(`studio backdrop: ${getLangText(settings.background, "English")}`);
        if (includes.props && settings.prop) tags.push(`props: ${getLangText(settings.prop, "English")}`);
      }

      if (includes.ambiance && settings.ambiance) tags.push(`ambiance: ${getLangText(settings.ambiance, "English")}`);
      if (isOutdoor && includes.weather && settings.weather && (genre === "portrait" || genre === "landscape")) {
        tags.push(`weather condition: ${getLangText(settings.weather, "English")}`);
      }

      const postProcApply = settings.post_processing_choice === "yes" || settings.post_processing_choice === "Ja" || settings.post_processing_choice === "yes / yes";
      if (includes.post_processing && postProcApply && settings.post_processing) {
        tags.push(`darkroom chemical processing: ${getLangText(settings.post_processing, "English")}`);
      }

      if (includes.effect && settings.effect) {
        tags.push(`visual effect: ${getLangText(settings.effect, "English")}`);
      }

      // Add high-end tactile photographic raw token boosters
      tags.push("raw photography", "100% film aesthetics", "organic texture detail", "depth of field");

      return tags.map(t => t.trim()).filter(Boolean).join(", ");
    }

    // 🌸 FLUX.1 / SDXL NATURAL DESCRIPTIVE STYLE (Always in English, lang === "English")
    let base = "";

    if (genre === "portrait") {
      let prefixKey = "prompt_prefix_color";
      if (isOutdoor) {
        prefixKey = isBW ? "prompt_prefix_outdoor_bw" : "prompt_prefix_outdoor_color";
      } else {
        prefixKey = isBW ? "prompt_prefix_bw" : "prompt_prefix_color";
      }
      const prefix = translationsData["English"][prefixKey as keyof typeof translationsData["English"]] || "A portrait";

      const parts: string[] = [];
      parts.push(getLangText(settings.gender, "English"));

      if (includes.success) {
        parts.push(getLangText(settings.success, "English"));
      }
      if (includes.nationality && settings.nationality) {
        parts.push(getLangText(settings.nationality, "English"));
      }
      if (includes.role) {
        parts.push(getLangText(settings.role, "English"));
      }

      // INTEGRATE FREE TEXT AS A NATURAL CLAUSE
      if (settings.free_text && settings.free_text.trim() !== "") {
        parts.push(settings.free_text.trim());
      }

      base = prefix;
      if (parts.length > 0) {
        const joinedParts = parts.join(" ");
        const ofPhrase = translationsData["English"]["prompt_of"] || "of a";
        base = `${prefix} ${ofPhrase} ${joinedParts}`;
      }

      const detailList: string[] = [];
      if (includes.age) {
        detailList.push(getLangText(settings.age_range, "English"));
      }
      if (includes.traits) {
        detailList.push(getLangText(settings.traits, "English"));
      }
      if (includes.details) {
        detailList.push(getLangText(settings.details, "English"));
      }
      if (includes.pose) {
        detailList.push(getLangText(settings.pose, "English"));
      }

      if (detailList.length > 0) {
        base += `, ${detailList.join(", ")}`;
      }

      const apparel: string[] = [];
      if (includes.clothing) {
        apparel.push(getLangText(settings.clothing, "English"));
      }
      if (includes.cultural) {
        apparel.push(getLangText(settings.cultural_element, "English"));
      }

      if (apparel.length > 0) {
        const andLabel = translationsData["English"]["prompt_and"] || "and";
        const wearingLabel = translationsData["English"]["prompt_wearing"] || "wearing";
        base += `. ${wearingLabel} ${apparel.join(` ${andLabel} `)}`;
      }

      if (includes.time_period) {
        const inLabel = translationsData["English"]["prompt_in"] || "in the";
        base += `, ${inLabel} ${getLangText(settings.time_period, "English")}`;
      }

      if (includes.emotion) {
        const exprLabel = translationsData["English"]["prompt_expression"] || "Expression:";
        base += `. ${exprLabel} ${getLangText(settings.emotion, "English")}`;
      }

      // INTEGRATE FREE TEXT FOR PORTRAIT
      if (settings.free_text && settings.free_text.trim() !== "") {
        base += `, describing: ${settings.free_text.trim()}`;
      }

    } else if (genre === "landscape") {
      const landscapeTitle = isBW 
        ? "Atmospheric black-and-white scenic landscape photography"
        : "Majestic fine-art scenic landscape photography";
      
      base = landscapeTitle;
      
      const ofLabel = "showing";
      if (includes.landscape_subject && settings.landscape_subject) {
        base += ` ${ofLabel} ${getLangText(settings.landscape_subject, "English")}`;
      }

      // INTEGRATE FREE TEXT FOR LANDSCAPE
      if (settings.free_text && settings.free_text.trim() !== "") {
        base += `, capturing ${settings.free_text.trim()}`;
      }

    } else if (genre === "objects") {
      const stillLifeTitle = isBW
        ? "Fine-art black-and-white still life studio photography"
        : "High-detail studio still life object photography";
      
      base = stillLifeTitle;

      const capturingLabel = "capturing";
      if (includes.object_subject && settings.object_subject) {
        base += ` ${capturingLabel} ${getLangText(settings.object_subject, "English")}`;
      }

      // INTEGRATE FREE TEXT FOR OBJECTS
      if (settings.free_text && settings.free_text.trim() !== "") {
        base += `, describing: ${settings.free_text.trim()}`;
      }
    }

    // SHARED CONTEXT-SENSITIVE EXTENSIONS FOR LANDSCAPE & OBJECTS (Seasons, Times of day, Perspectives)
    if (genre !== "portrait") {
      const partsContext: string[] = [];
      if (includes.season && settings.season) {
        partsContext.push(getLangText(settings.season, "English"));
      }
      if (includes.time_of_day && settings.time_of_day) {
        partsContext.push(getLangText(settings.time_of_day, "English"));
      }
      if (partsContext.length > 0) {
        const transitionPhrase = ", set in";
        base += `${transitionPhrase} ${partsContext.join(" during ")}`;
      }
      
      if (includes.camera_elevation && settings.camera_elevation) {
        const viewPhrase = ", shot from a";
        base += `${viewPhrase} ${getLangText(settings.camera_elevation, "English")}`;
      }
    }

    // SHARED HARDWARE & LAB TECHNICALS (GEAR, FILM, DEVELOPER, PAPERS, LIGHTING)
    const techList: string[] = [];
    if (includes.camera && settings.camera) {
      techList.push(getLangText(settings.camera, "English"));
    }
    if (includes.lens && settings.lens) {
      techList.push(getLangText(settings.lens, "English"));
    }

    if (techList.length > 0) {
      const capturedWithLabel = translationsData["English"]["prompt_captured_with"] || "captured with";
      base += `, ${capturedWithLabel} ${techList.join(" ")}`;
    }

    // EXPIRED FILM OR STOCK FILM
    if (includes.expired_film && settings.expired_film) {
      const onLabel = translationsData["English"]["prompt_on"] || "on";
      base += ` ${onLabel} vintage expired film: ${getLangText(settings.expired_film, "English")}`;
    } else if (includes.film && settings.film) {
      const onLabel = translationsData["English"]["prompt_on"] || "on";
      base += ` ${onLabel} ${getLangText(settings.film, "English")}`;
    }

    if (includes.film_detail && settings.film_detail) {
      base += `, ${getLangText(settings.film_detail, "English")}`;
    }

    // EXPIRED PAPER OR QUALITY LEVEL
    if (includes.expired_paper && settings.expired_paper) {
      const paperLabel = "enlarged on historic expired silver-gelatin paper:";
      base += `, ${paperLabel} ${getLangText(settings.expired_paper, "English")}`;
    } else if (includes.quality && settings.quality) {
      base += `, printed as an archival ${getLangText(settings.quality, "English")}`;
    }

    if (includes.style && settings.style) {
      const styleLabel = translationsData["English"]["prompt_style"] || "Style:";
      base += `. ${styleLabel} ${getLangText(settings.style, "English")}`;
    }

    if (includes.lighting && settings.lighting) {
      base += `, under ${getLangText(settings.lighting, "English")}`;
    }

    if (genre === "portrait" || genre === "objects") {
      if (includes.background && settings.background) {
        const bgLabel = translationsData["English"]["prompt_background"] || "Background:";
        base += `. ${bgLabel} ${getLangText(settings.background, "English")}`;
      }

      if (includes.props && settings.prop) {
        const propLabel = translationsData["English"]["prompt_prop"] || "Prop:";
        base += `. ${propLabel} ${getLangText(settings.prop, "English")}`;
      }
    }

    if (includes.ambiance && settings.ambiance) {
      const ambLabel = translationsData["English"]["prompt_ambiance"] || "Ambiance:";
      base += `. ${ambLabel} ${getLangText(settings.ambiance, "English")}`;
    }

    if (isOutdoor && includes.weather && settings.weather && (genre === "portrait" || genre === "landscape")) {
      base += `. ${getLangText(settings.weather, "English")}`;
    }

    const postProcApply = settings.post_processing_choice === "yes" || settings.post_processing_choice === "Ja" || settings.post_processing_choice === "yes / yes";
    if (includes.post_processing && postProcApply && settings.post_processing) {
      const processedLabel = translationsData["English"]["prompt_post_processed"] || "processed with";
      base += `. ${processedLabel} ${getLangText(settings.post_processing, "English")}`;
    }

    if (includes.effect && settings.effect) {
      const effLabel = translationsData["English"]["prompt_effect"] || "Overall effect:";
      base += `. ${effLabel} ${getLangText(settings.effect, "English")}`;
    }

    return base.trim();
  };

  const englishPromptValue = compilePrompt("English");
  const germanPromptValue = compilePrompt("Deutsch");

  const addCurrentPromptToHistory = useCallback(() => {
    if (!englishPromptValue || englishPromptValue.trim() === "") return;

    setHistoryPrompts(prev => {
      // Check if it matches the most recent history item to avoid infinite duplication
      if (prev.length > 0 && prev[0].englishPrompt === englishPromptValue) {
        return prev;
      }

      // Generate a smart, readable title for the prompt based on camera and film
      const cameraShort = settings.camera ? settings.camera.split(",")[0] : "";
      const filmShort = settings.film ? settings.film.split(",")[0] : "";
      const typeShort = settings.type ? settings.type.split(" / ")[0] : "";
      
      let generatedTitle = `${typeShort}`;
      if (cameraShort) generatedTitle += ` • ${cameraShort}`;
      if (filmShort) generatedTitle += ` • ${filmShort}`;
      if (!generatedTitle) generatedTitle = isDE ? "Generierter Prompt" : "Generated Prompt";

      const newHistoryItem: SavedPrompt = {
        id: "hist_" + Date.now().toString() + "_" + Math.floor(Math.random() * 1000),
        title: generatedTitle,
        createdAt: new Date().toLocaleTimeString(language === "Deutsch" ? "de-DE" : "en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit"
        }),
        englishPrompt: englishPromptValue,
        germanPrompt: germanPromptValue,
        negativePrompt: settings.negative_prompt || "",
        settings: { ...settings },
        includes: { ...includes },
        category: settings.type.split(" / ")[0] || "Porträt analog",
        tags: [
          settings.camera_type ? settings.camera_type.split(" / ")[0] : "",
          cameraShort,
          filmShort
        ].filter(Boolean)
      };

      // Keep only top 10 items
      return [newHistoryItem, ...prev].slice(0, 10);
    });
  }, [englishPromptValue, germanPromptValue, settings, includes, language, isDE]);

  // Auto-record to history with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      addCurrentPromptToHistory();
    }, 2000);

    return () => clearTimeout(timer);
  }, [englishPromptValue, addCurrentPromptToHistory]);

  const handleCopyPrompt = (text: string, isEn: boolean) => {
    navigator.clipboard.writeText(text);
    if (isEn) {
      setCopiedEnglish(true);
      setTimeout(() => setCopiedEnglish(false), 2000);
    } else {
      setCopiedGerman(true);
      setTimeout(() => setCopiedGerman(false), 2000);
    }
    // Record immediately to history on manual action
    addCurrentPromptToHistory();
  };

  const handleCopyAsMarkdown = () => {
    let md = `### 🎞️ Analog-Studio Prompt Recipe\n\n`;
    
    md += `**Prompt (English):**\n\`\`\`\n${englishPromptValue}\n\`\`\`\n\n`;
    
    if (settings.negative_prompt) {
      md += `**Negative Prompt:**\n\`\`\`\n${settings.negative_prompt}\n\`\`\`\n\n`;
    }
    
    md += `#### ⚙️ Technical Metadata & Recipe:\n`;
    md += `- **Genre:** ${genre.toUpperCase()} (${getLangText(genre, "English")})\n`;
    md += `- **Camera System:** ${getLangText(settings.camera, "English")}\n`;
    md += `- **Optics / Glass:** ${getLangText(settings.lens, "English")}\n`;
    
    if (includes.expired_film && settings.expired_film) {
      md += `- **Film Base:** Vintage Expired Film: ${getLangText(settings.expired_film, "English")}\n`;
    } else if (includes.film && settings.film) {
      md += `- **Film Base:** ${getLangText(settings.film, "English")}${includes.film_detail && settings.film_detail ? ` (${getLangText(settings.film_detail, "English")})` : ""}\n`;
    }
    
    if (settings.post_processing) {
      md += `- **Darkroom Chemistry:** ${getLangText(settings.post_processing, "English")}\n`;
    }
    
    if (includes.expired_paper && settings.expired_paper) {
      md += `- **Photo Paper Stock:** Vintage Expired Paper: ${getLangText(settings.expired_paper, "English")}\n`;
    } else if (includes.quality && settings.quality) {
      md += `- **Photo Paper Stock:** Archival ${getLangText(settings.quality, "English")}\n`;
    }
    
    // Scene composition
    md += `\n#### 🎨 Scene composition:\n`;
    if (genre === "portrait") {
      if (settings.gender) md += `- **Subject Gender:** ${getLangText(settings.gender, "English")}\n`;
      if (includes.nationality && settings.nationality) md += `- **Ethnicity/Nationality:** ${getLangText(settings.nationality, "English")}\n`;
      if (includes.role && settings.role) md += `- **Subject Role:** ${getLangText(settings.role, "English")}\n`;
      if (settings.age_range) md += `- **Age Range:** ${getLangText(settings.age_range, "English")}\n`;
      if (settings.traits) md += `- **Key Traits:** ${getLangText(settings.traits, "English")}\n`;
      if (settings.details) md += `- **Anatomical Focus:** ${getLangText(settings.details, "English")}\n`;
      if (settings.pose) md += `- **Pose Style:** ${getLangText(settings.pose, "English")}\n`;
      if (settings.clothing) md += `- **Attire/Clothing:** ${getLangText(settings.clothing, "English")}\n`;
      if (settings.time_period) md += `- **Era / Epoch:** ${getLangText(settings.time_period, "English")}\n`;
      if (settings.emotion) md += `- **Expression:** ${getLangText(settings.emotion, "English")}\n`;
    } else if (genre === "landscape") {
      if (settings.landscape_subject) md += `- **Topographic Main:** ${getLangText(settings.landscape_subject, "English")}\n`;
      if (includes.season && settings.season) md += `- **Seasonality:** ${getLangText(settings.season, "English")}\n`;
      if (includes.time_of_day && settings.time_of_day) md += `- **Time of Day:** ${getLangText(settings.time_of_day, "English")}\n`;
      if (includes.camera_elevation && settings.camera_elevation) md += `- **Bower Elevation:** ${getLangText(settings.camera_elevation, "English")}\n`;
    } else { // objects
      if (settings.object_subject) md += `- **Primary Object:** ${getLangText(settings.object_subject, "English")}\n`;
      if (includes.background && settings.background) md += `- **Studio Backdrop:** ${getLangText(settings.background, "English")}\n`;
      if (includes.props && settings.prop) md += `- **Ambient Prop:** ${getLangText(settings.prop, "English")}\n`;
    }

    // Other details
    if (settings.style) md += `- **Photographic Style/Vibe:** ${getLangText(settings.style, "English")}\n`;
    if (settings.lighting) md += `- **Lighting setup:** ${getLangText(settings.lighting, "English")}\n`;
    if (settings.ambiance) md += `- **Atmosphere/Ambiance:** ${getLangText(settings.ambiance, "English")}\n`;
    if (settings.weather) md += `- **Weather details:** ${getLangText(settings.weather, "English")}\n`;
    if (settings.effect) md += `- **Overall aesthetic mood:** ${getLangText(settings.effect, "English")}\n`;
    
    md += `\n---\n*Generated with **[Analog-Studio Prompt Builder](${window.location.href})** – Precision Analog Photo Crafting Studio for AI Generative Models.*`;

    navigator.clipboard.writeText(md);
    setCopiedMarkdown(true);
    setTimeout(() => setCopiedMarkdown(false), 2000);
    
    addCurrentPromptToHistory();
  };

  // Preset loading handler
  const handleLoadPreset = (preset: PresetRecipe) => {
    setSettings(prev => ({
      ...prev,
      ...preset.settings
    }));

    // Reconstruct inclusions map safely
    setIncludes(prev => {
      const updated = { ...prev };
      Object.keys(preset.includes).forEach((key) => {
        updated[key] = preset.includes[key];
      });
      return updated;
    });

    // Notify user
    setActiveTab("studio");
  };

  const handleLoadSavedPrompt = (saved: SavedPrompt) => {
    setSettings(prev => ({
      ...prev,
      ...saved.settings
    }));
    setIncludes(prev => ({
      ...prev,
      ...saved.includes
    }));
    setActiveTab("studio");
  };

  const handleUpdatePrompt = (updatedPrompt: SavedPrompt) => {
    setSavedPrompts(prev => prev.map(p => p.id === updatedPrompt.id ? updatedPrompt : p));
  };

  const autoDetectCategory = (): string => {
    const typeStr = (settings.type || "").toLowerCase();
    const filmStr = (settings.film || "").toLowerCase();
    const cameraStr = (settings.camera || "").toLowerCase();
    const styleStr = (settings.style || "").toLowerCase();
    const locStr = (settings.location || "").toLowerCase();

    if (typeStr.includes("schwarz") || typeStr.includes("black") || filmStr.includes("tri-x") || filmStr.includes("hp5") || filmStr.includes("acros") || filmStr.includes("delta")) {
      return "Schwarz-Weiß";
    }
    if (typeStr.includes("polaroid") || filmStr.includes("polaroid") || styleStr.includes("vintage") || cameraStr.includes("polaroid")) {
      return "Vintage";
    }
    if (styleStr.includes("lomo") || styleStr.includes("lomography") || cameraStr.includes("lomo")) {
      return "Lomografie";
    }
    if (locStr.includes("außenaufnahme") || locStr.includes("outdoor") || locStr.includes("landschaft") || locStr.includes("landscape")) {
      return "Landschaft analog";
    }
    return "Porträt analog";
  };

  const handleOpenSaveModal = () => {
    setCustomTitle("");
    const detected = autoDetectCategory();
    setSaveCategory(detected);
    
    // Suggest some initial tags based on active camera and film!
    const suggestedTags: string[] = [];
    if (settings.camera) {
      const cam = getLangText(settings.camera, "English").split(" ")[0];
      if (cam && cam.length > 2) {
        suggestedTags.push(cam);
      }
    }
    if (settings.film) {
      const filmName = getLangText(settings.film, "English").split(",")[0];
      if (filmName && filmName.length > 2) {
        suggestedTags.push(filmName.replace(/フィルム|film|胶片/gi, "").trim());
      }
    }
    if (settings.type.toLowerCase().includes("schwarz") || settings.type.toLowerCase().includes("black")) {
      suggestedTags.push("Schwarz-Weiß");
    }
    setSaveTagsString(suggestedTags.join(", "));
    setSaveModalOpen(true);
  };

  const handleSavePromptToArchiv = () => {
    if (!customTitle.trim()) return;

    const parsedTags = saveTagsString
      .split(",")
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const newSaved: SavedPrompt = {
      id: Date.now().toString(),
      title: customTitle,
      createdAt: new Date().toLocaleDateString(language === "Deutsch" ? "de-DE" : "en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }),
      germanPrompt: germanPromptValue,
      englishPrompt: englishPromptValue,
      negativePrompt: settings.negative_prompt,
      settings: { ...settings },
      includes: { ...includes },
      category: saveCategory,
      tags: parsedTags
    };

    setSavedPrompts(prev => [newSaved, ...prev]);
    setSaveModalOpen(false);
    setCustomTitle("");
    setSaveTagsString("");
  };

  const handleDeleteSavedPrompt = (id: string) => {
    setSavedPrompts(prev => prev.filter(p => p.id !== id));
  };

  const activeInclusionsCount = Object.values(includes).filter(Boolean).length;

  const isOutdoor = settings.location.toLowerCase().includes("outdoor") || settings.location.toLowerCase().includes("außen");

  return (
    <div className="min-h-screen bg-[#050505] text-[#e5e5e5] font-sans antialiased text-sm select-none relative" id="app-viewport">
      <div className="grain-overlay" id="grain-layer"></div>
      {/* Upper retro glass header */}
      <header className="border-b border-white/10 bg-[#050505] sticky top-0 z-40" id="main-header">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-4" id="header-container">
          {/* Logo & Minimalist Lens icon */}
          <div className="flex items-center gap-3.5" id="header-left">
            <div className="w-8 h-8 bg-white flex items-center justify-center rounded-sm shrink-0" id="header-logo-icon">
              <div className="w-4 h-4 rounded-full border-2 border-black"></div>
            </div>
            
            <div>
              <div className="flex items-center gap-2.5" id="title-tag-row">
                <h1 className="text-lg font-light tracking-[0.2em] uppercase text-white" id="app-headline">
                  SILVER & <span className="font-bold">GRAPHITE</span>
                </h1>
                <span className="text-[10px] font-mono tracking-widest bg-white/5 border border-white/15 text-zinc-400 px-2.5 py-0.5 rounded-sm uppercase" id="tag-badge">
                  Analog Archive
                </span>
              </div>
              <p className="text-[10px] font-mono text-zinc-500 tracking-wider mt-0.5 uppercase" id="app-sub-headline">
                {isDE ? "Kreativer Prompt-Generator für Porträtfotografie" : "Advanced Image Generator Studio"}
              </p>
            </div>
          </div>

          {/* Quick-Stats & Language Selection */}
          <div className="flex items-center gap-4 shrink-0" id="header-right">
            {/* Navigation Tabs bar */}
            <nav className="flex items-center flex-wrap sm:flex-nowrap gap-1 sm:gap-0 bg-zinc-950 border border-white/10 rounded-sm p-1 text-xs" id="nav-tabs">
              <button
                onClick={() => setActiveTab("studio")}
                className={`px-3 py-1.5 sm:px-3.5 rounded-sm font-mono tracking-widest text-[10px] uppercase transition duration-300 flex items-center gap-1.5 ${activeTab === "studio" ? "bg-white text-black font-bold" : "text-zinc-500 hover:text-white"}`}
                id="tab-studio-btn"
              >
                <Camera className="w-3.5 h-3.5" id="tab-studio-icon" />
                <span>{isDE ? "Fotostudio" : "Studio"}</span>
              </button>
              <button
                onClick={() => setActiveTab("archive")}
                className={`px-3 py-1.5 sm:px-3.5 rounded-sm font-mono tracking-widest text-[10px] uppercase transition duration-300 flex items-center gap-1.5 relative ${activeTab === "archive" ? "bg-white text-black font-bold" : "text-zinc-500 hover:text-white"}`}
                id="tab-archive-btn"
              >
                <Bookmark className="w-3.5 h-3.5" id="tab-archive-icon" />
                <span>{isDE ? "Archiv" : "Library"}</span>
                {savedPrompts.length > 0 && (
                  <span className={`absolute -top-1 -right-1 text-[9px] font-mono w-4 h-4 rounded-full flex items-center justify-center p-0.5 border ${activeTab === "archive" ? "bg-[#050505] text-white border-white/10" : "bg-white text-black border-zinc-950"}`} id="archive-count-tag">
                    {savedPrompts.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab("history")}
                className={`px-3 py-1.5 sm:px-3.5 rounded-sm font-mono tracking-widest text-[10px] uppercase transition duration-300 flex items-center gap-1.5 relative ${activeTab === "history" ? "bg-white text-black font-bold" : "text-zinc-500 hover:text-white"}`}
                id="tab-history-btn"
              >
                <History className="w-3.5 h-3.5 text-amber-500" id="tab-history-icon" />
                <span>{isDE ? "Chronik" : "History"}</span>
                {historyPrompts.length > 0 && (
                  <span className={`absolute -top-1 -right-1 text-[9px] font-mono w-4 h-4 rounded-full flex items-center justify-center p-0.5 border ${activeTab === "history" ? "bg-[#050505] text-white border-white/10" : "bg-white text-black border-zinc-950"}`} id="history-count-tag">
                    {historyPrompts.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab("inventory")}
                className={`px-3 py-1.5 sm:px-3.5 rounded-sm font-mono tracking-widest text-[10px] uppercase transition duration-300 flex items-center gap-1.5 ${activeTab === "inventory" ? "bg-white text-black font-bold" : "text-zinc-500 hover:text-white"}`}
                id="tab-inventory-btn"
              >
                <Settings className="w-3.5 h-3.5" id="tab-inventory-icon" />
                <span>{isDE ? "Inventar" : "Custom"}</span>
              </button>
            </nav>

            {/* Language Switcher Button */}
            <button
              onClick={() => setLanguage(l => l === "Deutsch" ? "English" : "Deutsch")}
              className="px-3.5 py-2 border border-white/10 bg-zinc-950 text-zinc-400 hover:bg-white hover:text-black rounded-sm flex items-center gap-1.5 transition text-[10px] font-mono uppercase tracking-widest cursor-pointer"
              title={isDE ? "Auf English umstellen" : "Switch format to German"}
              id="lang-switch-btn"
            >
              <Languages className="w-3.5 h-3.5" id="lang-icon" />
              <span>{isDE ? "EN" : "DE"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main app body */}
      <main className="max-w-7xl mx-auto px-4 py-8" id="main-content-layout">
        <AnimatePresence mode="wait" id="tab-animation-presence">
          {activeTab === "studio" && (
            <motion.div 
              key="studio-key" 
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.15 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              id="studio-tab-body"
            >
              {/* STUDIO DASHBOARD HEADER: MODE AND SCENARIO TABS */}
              <div className="lg:col-span-12" id="studio-controls-header">
                <div className="bg-[#141416]/90 border border-stone-850 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
                  {/* LEFT: SCNARIO CHOOSER */}
                  <div className="flex flex-col gap-1.5 w-full md:w-auto" id="genre-selector-block">
                    <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
                      {isDE ? "1. SZENARIO AUSWÄHLEN (THEME)" : "1. SELECT SCENARIO"}
                    </span>
                    <div className="flex bg-stone-950 border border-stone-800 rounded-lg p-1 gap-1" id="genre-tabs">
                      <button
                        onClick={() => setGenre("portrait")}
                        className={`px-4 py-2 rounded-md font-mono text-[11px] uppercase tracking-wider transition ${genre === "portrait" ? "bg-amber-500 text-black font-bold" : "text-stone-400 hover:text-white"}`}
                        id="genre-tab-portrait"
                      >
                        👤 {isDE ? "Porträt" : "Portrait"}
                      </button>
                      <button
                        onClick={() => setGenre("landscape")}
                        className={`px-4 py-2 rounded-md font-mono text-[11px] uppercase tracking-wider transition ${genre === "landscape" ? "bg-amber-500 text-black font-bold" : "text-stone-400 hover:text-white"}`}
                        id="genre-tab-landscape"
                      >
                        ⛰️ {isDE ? "Landschaft" : "Landscape"}
                      </button>
                      <button
                        onClick={() => setGenre("objects")}
                        className={`px-4 py-2 rounded-md font-mono text-[11px] uppercase tracking-wider transition ${genre === "objects" ? "bg-amber-500 text-black font-bold" : "text-stone-400 hover:text-white"}`}
                        id="genre-tab-objects"
                      >
                        📦 {isDE ? "Objekte / Sach" : "Objects"}
                      </button>
                    </div>
                  </div>

                  {/* RIGHT: BEDIENMODUS CHOOSER */}
                  <div className="flex flex-col gap-1.5 w-full md:w-auto" id="mode-selector-block">
                    <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">
                      {isDE ? "2. BEDIENMODUS AUSWÄHLEN" : "2. SELECT CONTROL MODE"}
                    </span>
                    <div className="flex bg-stone-950 border border-stone-800 rounded-lg p-1 gap-1" id="mode-tabs">
                      <button
                        onClick={() => setStudioMode("console")}
                        className={`px-4 py-2 rounded-md font-mono text-[11px] uppercase tracking-wider transition ${studioMode === "console" ? "bg-white text-black font-bold" : "text-stone-400 hover:text-white"}`}
                        id="mode-tab-console"
                      >
                        🎛️ {isDE ? "Hauptformular" : "Console"}
                      </button>
                      <button
                        onClick={() => setStudioMode("clicker")}
                        className={`px-4 py-2 rounded-md font-mono text-[11px] uppercase tracking-wider transition ${studioMode === "clicker" ? "bg-white text-black font-bold" : "text-stone-400 hover:text-white"}`}
                        id="mode-tab-wizard"
                      >
                        ⚡ {isDE ? "Wizard" : "Wizard"}
                      </button>
                      <button
                        onClick={() => setStudioMode("dialog")}
                        className={`px-4 py-2 rounded-md font-mono text-[11px] uppercase tracking-wider transition ${studioMode === "dialog" ? "bg-white text-black font-bold" : "text-stone-400 hover:text-white"}`}
                        id="mode-tab-dialog"
                      >
                        💬 {isDE ? "Dialog-Führer" : "Interactive"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Left Column: Parameter Selection (7 Cols on Desktop) */}
              <div className="lg:col-span-7 space-y-6" id="parameters-column">
                {studioMode === "clicker" && (
                  <StudioWizard
                    language={language}
                    options={options}
                    settings={settings}
                    setSettings={setSettings}
                    includes={includes}
                    setIncludes={setIncludes}
                    genre={genre}
                    setGenre={setGenre}
                    getLangText={getLangText}
                  />
                )}

                {studioMode === "dialog" && (
                  <StudioDialog
                    language={language}
                    options={options}
                    settings={settings}
                    setSettings={setSettings}
                    includes={includes}
                    setIncludes={setIncludes}
                    genre={genre}
                    setGenre={setGenre}
                    getLangText={getLangText}
                  />
                )}

                {studioMode === "console" && (
                  <div className="bg-[#141416]/90 border border-stone-850 rounded-xl p-5 sm:p-6 shadow-xl" id="parameter-sheet">
                  {/* Category Header */}
                  <div className="flex items-center justify-between border-b border-stone-850 pb-4 mb-6" id="params-header">
                    <div>
                      <h2 className="text-base font-serif font-bold text-white uppercase tracking-wider" id="params-title">
                        {isDE ? "Labor-Parameter" : "Darkroom Configurations"}
                      </h2>
                      <p className="text-[11px] text-stone-500 font-mono mt-0.5" id="params-subtitle">
                        {isDE ? "AKTIVE PARAMETER FÜR BELICHTUNG u. CHEMIE" : "DIAL PARAMETERS TO COMPILE EMULSION"}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono text-stone-400" id="params-stats">
                      <span className="px-2 py-0.5 bg-stone-900 border border-stone-800 text-amber-500/90 rounded font-semibold" id="params-frames-badge">
                        {activeInclusionsCount} / 26
                      </span>
                      <span>{isDE ? "aktivierte Bild-Körner" : "activated components"}</span>
                    </div>
                  </div>

                  {/* Settings grid grouped by category cards */}
                  <div className="space-y-6" id="groups-container">
                    
                    {/* SYSTEM-WIDE NARRATIVE FREE-TEXT FIELD */}
                    <div className="bg-amber-500/5 border border-amber-500/10 rounded-lg p-3.5" id="general-free-text-card">
                      <div className="flex items-center justify-between mb-1.5" id="free-text-hdr">
                        <label className="block text-[11px] font-mono text-amber-500 uppercase tracking-widest font-bold" id="free-text-lbl">
                          ✍️ {isDE ? "Individuelle Freitext-Beschreibung (Zusatz)" : "Scenic Free-text description (Narrative)"}
                        </label>
                        <input
                          type="checkbox"
                          checked={includes.free_text}
                          onChange={(e) => setIncludes(prev => ({ ...prev, free_text: e.target.checked }))}
                          className="w-4 h-4 accent-amber-500 shrink-0 cursor-pointer"
                          id="free-text-checkbox"
                        />
                      </div>
                      <textarea
                        value={settings.free_text || ""}
                        onChange={(e) => setSettings(prev => ({ ...prev, free_text: e.target.value }))}
                        placeholder={isDE ? "Optional: Gebe hier freie kreative Stichworte ein (z.B. 'lächelnd auf einer Holzbank', 'Spiegelungen auf dem nassen Tisch' ...)" : "Type clear custom parameters (e.g. 'with raindrops splashed on face', 'smiling and joyful' ...)"}
                        className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-stone-200 font-sans text-xs focus:border-amber-500 focus:outline-none min-h-[50px] resize-none"
                        id="general-free-text-textarea"
                      />
                    </div>
                    
                    {/* GROUP 1: GEAR AND OPTICS */}
                    <div className="bg-stone-900/40 border border-stone-850/60 rounded-xl p-4 space-y-4" id="group-gear">
                      <h3 className="text-stone-300 font-serif font-black text-xs uppercase tracking-widest border-b border-stone-850/75 pb-1.5 flex items-center gap-2" id="gear-group-title">
                        <Camera className="w-3.5 h-3.5 text-amber-500" id="gear-group-icon" />
                        <span>Kamera & Optik-Hardware</span>
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="gear-group-inputs">
                        {/* Portrait-Type Selector */}
                        <div className="relative group" id="portrait-type-group">
                          <label className="block text-[11px] font-mono text-stone-400 uppercase tracking-wider mb-1.5" id="p-type-lbl">
                            {isDE ? "Porträt-Verfahren / Typ" : "Portrait Chemistry"}
                          </label>
                          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full min-w-0" id="p-type-control">
                            <select
                              value={settings.type}
                              onChange={(e) => handlePortraitTypeChange(e.target.value)}
                              className="flex-1 min-w-0 bg-stone-900/90 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-200 font-serif focus:border-amber-500 focus:outline-none truncate"
                              id="p-type-dropdown"
                            >
                              {options.portrait_types.map((t) => (
                                <option key={t} value={t}>{getLangText(t, language)}</option>
                              ))}
                            </select>
                            <input
                              type="checkbox"
                              checked={includes.type}
                              onChange={(e) => setIncludes(prev => ({ ...prev, type: e.target.checked }))}
                              className="w-4 h-4 accent-amber-500 shrink-0 cursor-pointer"
                              title={isDE ? "Im Prompt berücksichtigen" : "Include in final string"}
                              id="p-type-checkbox"
                            />
                          </div>
                        </div>

                        {/* Camera format (Camera type in original) */}
                        <div id="camera-format-group">
                          <label className="block text-[11px] font-mono text-stone-400 uppercase tracking-wider mb-1.5" id="cam-format-lbl">
                            {isDE ? "Kameraformat / Sensor" : "Camera format"}
                          </label>
                          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full min-w-0" id="cam-format-control">
                            <select
                              value={settings.camera_type}
                              onChange={(e) => handleCameraTypeChange(e.target.value)}
                              className="flex-1 min-w-0 bg-stone-900/90 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-200 font-serif focus:border-amber-500 focus:outline-none truncate"
                              id="cam-format-dropdown"
                            >
                              {(options.camera_types_by_portrait_type[settings.type] || []).map((ct) => (
                                <option key={ct} value={ct}>{getLangText(ct, language)}</option>
                              ))}
                            </select>
                            <input
                              type="checkbox"
                              checked={includes.camera_type}
                              onChange={(e) => setIncludes(prev => ({ ...prev, camera_type: e.target.checked }))}
                              className="w-4 h-4 accent-amber-500 shrink-0 cursor-pointer"
                              id="cam-format-checkbox"
                            />
                          </div>
                        </div>

                        {/* Specific Camera Model */}
                        <div id="camera-model-group">
                          <label className="block text-[11px] font-mono text-stone-400 uppercase tracking-wider mb-1.5" id="cam-model-lbl">
                            {isDE ? "Kameragehäuse" : "Camera Chassis"}
                          </label>
                          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full min-w-0" id="cam-model-control">
                            <select
                              value={settings.camera}
                              onChange={(e) => setSettings(prev => ({ ...prev, camera: e.target.value }))}
                              className="flex-1 min-w-0 bg-stone-900/90 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-200 font-serif focus:border-amber-500 focus:outline-none truncate"
                              id="cam-model-dropdown"
                            >
                              {(options.cameras[settings.camera_type] || []).map((c) => (
                                <option key={c} value={c}>{getLangText(c, language)}</option>
                              ))}
                            </select>
                            <input
                              type="checkbox"
                              checked={includes.camera}
                              onChange={(e) => setIncludes(prev => ({ ...prev, camera: e.target.checked }))}
                              className="w-4 h-4 accent-amber-500 shrink-0 cursor-pointer"
                              id="cam-model-checkbox"
                            />
                          </div>
                        </div>

                        {/* Objective Lens */}
                        <div id="lens-group">
                          <label className="block text-[11px] font-mono text-stone-400 uppercase tracking-wider mb-1.5" id="lens-lbl">
                            {isDE ? "Analoges Objektiv" : "Grounded Lens"}
                          </label>
                          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full min-w-0" id="lens-control">
                            <select
                              value={settings.lens}
                              onChange={(e) => setSettings(prev => ({ ...prev, lens: e.target.value }))}
                              className="flex-1 min-w-0 bg-stone-900/90 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-200 font-serif focus:border-amber-500 focus:outline-none truncate"
                              id="lens-dropdown"
                            >
                              {(options.lenses[settings.camera_type] || []).map((l) => (
                                <option key={l} value={l} title={getLangText(l, language)}>{getLangText(l, language)}</option>
                              ))}
                            </select>
                            <input
                              type="checkbox"
                              checked={includes.lens}
                              onChange={(e) => setIncludes(prev => ({ ...prev, lens: e.target.checked }))}
                              className="w-4 h-4 accent-amber-500 shrink-0 cursor-pointer"
                              id="lens-checkbox"
                            />
                          </div>
                        </div>
                      </div>

                      {/* EXTRA DETAILED GEAR PREVIEW - SOLVES ULTRA-LONG LABELS ISSUE */}
                      <div className="bg-[#050505] border border-stone-850 p-3 rounded-lg text-xs leading-normal mt-3" id="gear-selected-preview">
                        <span className="text-amber-500 font-mono text-[9px] uppercase font-bold block mb-1">EQUIPMENT DETAIL VIEW:</span>
                        <div className="text-stone-300 font-serif text-[11px] leading-relaxed">
                          📸 <span className="font-bold text-white">{getLangText(settings.camera, language)}</span> <br />
                          🔍 <span className="text-stone-400">{getLangText(settings.lens, language)}</span> <br />
                          🎞️ <span className="text-stone-400">{getLangText(settings.film, language)}</span>
                        </div>
                      </div>
                    </div>

                    {/* GROUP 2: PORTRAIT CANDIDATE (SUBJECT) */}
                    {genre === "portrait" && (
                    <div className="bg-stone-900/40 border border-stone-850/60 rounded-xl p-4 space-y-4" id="group-subject">
                      <h3 className="text-stone-300 font-serif font-black text-xs uppercase tracking-widest border-b border-stone-850/75 pb-1.5 flex items-center gap-2" id="subject-group-title">
                        <Workflow className="w-3.5 h-3.5 text-amber-500" id="subject-group-icon" />
                        <span>Subjekt & Physis</span>
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="subject-group-inputs">
                        {/* Gender */}
                        <div id="gender-group">
                          <label className="block text-[11px] font-mono text-stone-400 uppercase tracking-wider mb-1.5" id="gender-lbl">
                            {isDE ? "Geschlecht / Identität" : "Gender / Identity"}
                          </label>
                          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full min-w-0" id="gender-control">
                            <select
                              value={settings.gender}
                              onChange={(e) => handleGenderChange(e.target.value)}
                              className="flex-1 min-w-0 bg-stone-900/90 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-200 font-serif focus:border-amber-500 focus:outline-none truncate"
                              id="gender-dropdown"
                            >
                              <option value="Männlich / Male">{isDE ? "Männlich" : "Male"}</option>
                              <option value="Weiblich / Female">{isDE ? "Weiblich" : "Female"}</option>
                            </select>
                            <input
                              type="checkbox"
                              checked={includes.gender}
                              onChange={(e) => setIncludes(prev => ({ ...prev, gender: e.target.checked }))}
                              className="w-4 h-4 accent-amber-500 shrink-0 cursor-pointer"
                              id="gender-checkbox"
                            />
                          </div>
                        </div>

                        {/* Age range */}
                        <div id="age-group">
                          <label className="block text-[11px] font-mono text-stone-400 uppercase tracking-wider mb-1.5" id="age-lbl">
                            {isDE ? "Altersspanne / Reife" : "Age structure"}
                          </label>
                          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full min-w-0" id="age-control">
                            <select
                              value={settings.age_range}
                              onChange={(e) => setSettings(prev => ({ ...prev, age_range: e.target.value }))}
                              className="flex-1 min-w-0 bg-stone-900/90 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-200 font-serif focus:border-amber-500 focus:outline-none truncate"
                              id="age-dropdown"
                            >
                              {options.age_range.map((a) => (
                                <option key={a} value={a}>{getLangText(a, language)}</option>
                              ))}
                            </select>
                            <input
                              type="checkbox"
                              checked={includes.age}
                              onChange={(e) => setIncludes(prev => ({ ...prev, age: e.target.checked }))}
                              className="w-4 h-4 accent-amber-500 shrink-0 cursor-pointer"
                              id="age-checkbox"
                            />
                          </div>
                        </div>

                        {/* Status (Success Level) */}
                        <div id="status-group">
                          <label className="block text-[11px] font-mono text-stone-400 uppercase tracking-wider mb-1.5" id="status-lbl">
                            {isDE ? "Status / Strahlkraft" : "Presence status"}
                          </label>
                          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full min-w-0" id="status-control">
                            <select
                              value={settings.success}
                              onChange={(e) => setSettings(prev => ({ ...prev, success: e.target.value }))}
                              className="flex-1 min-w-0 bg-stone-900/90 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-200 font-serif focus:border-amber-500 focus:outline-none truncate"
                              id="status-dropdown"
                            >
                              {options.success_levels.map((s) => (
                                <option key={s} value={s}>{getLangText(s, language)}</option>
                              ))}
                            </select>
                            <input
                              type="checkbox"
                              checked={includes.success}
                              onChange={(e) => setIncludes(prev => ({ ...prev, success: e.target.checked }))}
                              className="w-4 h-4 accent-amber-500 shrink-0 cursor-pointer"
                              id="status-checkbox"
                            />
                          </div>
                        </div>

                        {/* Nationality / Origin */}
                        <div id="nationality-group">
                          <label className="block text-[11px] font-mono text-stone-400 uppercase tracking-wider mb-1.5" id="nationality-lbl">
                            {isDE ? "Nationalität / Identität" : "Nationality background"}
                          </label>
                          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full min-w-0" id="nationality-control">
                            <input
                              type="text"
                              value={settings.nationality}
                              onChange={(e) => setSettings(prev => ({ ...prev, nationality: e.target.value }))}
                              className="flex-1 min-w-0 bg-stone-900/90 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-200 font-serif focus:border-amber-500 focus:outline-none truncate"
                              id="nationality-input"
                            />
                            <input
                              type="checkbox"
                              checked={includes.nationality}
                              onChange={(e) => setIncludes(prev => ({ ...prev, nationality: e.target.checked }))}
                              className="w-4 h-4 accent-amber-500 shrink-0 cursor-pointer"
                              id="nationality-checkbox"
                            />
                          </div>
                        </div>

                        {/* Active Role / Position */}
                        <div id="role-group">
                          <label className="block text-[11px] font-mono text-stone-400 uppercase tracking-wider mb-1.5" id="role-lbl">
                            {isDE ? "Berufung / Persona" : "Role / Archetype"}
                          </label>
                          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full min-w-0" id="role-control">
                            <select
                              value={settings.role}
                              onChange={(e) => setSettings(prev => ({ ...prev, role: e.target.value }))}
                              className="flex-1 min-w-0 bg-stone-900/90 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-200 font-serif focus:border-amber-500 focus:outline-none truncate"
                              id="role-dropdown"
                            >
                              {options.roles.map((r) => (
                                <option key={r} value={r}>{getLangText(r, language)}</option>
                              ))}
                            </select>
                            <input
                              type="checkbox"
                              checked={includes.role}
                              onChange={(e) => setIncludes(prev => ({ ...prev, role: e.target.checked }))}
                              className="w-4 h-4 accent-amber-500 shrink-0 cursor-pointer"
                              id="role-checkbox"
                            />
                          </div>
                        </div>

                        {/* Subject Traits */}
                        <div id="traits-group">
                          <label className="block text-[11px] font-mono text-stone-400 uppercase tracking-wider mb-1.5" id="traits-lbl">
                            {isDE ? "Charaktereigenschaften" : "Identity Traits"}
                          </label>
                          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full min-w-0" id="traits-control">
                            <select
                              value={settings.traits}
                              onChange={(e) => setSettings(prev => ({ ...prev, traits: e.target.value }))}
                              className="flex-1 min-w-0 bg-stone-900/90 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-200 font-serif focus:border-amber-500 focus:outline-none truncate"
                              id="traits-dropdown"
                            >
                              {options.subject_traits.map((tr) => (
                                <option key={tr} value={tr} title={getLangText(tr, language)}>{getLangText(tr, language)}</option>
                              ))}
                            </select>
                            <input
                              type="checkbox"
                              checked={includes.traits}
                              onChange={(e) => setIncludes(prev => ({ ...prev, traits: e.target.checked }))}
                              className="w-4 h-4 accent-amber-500 shrink-0 cursor-pointer"
                              id="traits-checkbox"
                            />
                          </div>
                        </div>

                        {/* Subject physiological details */}
                        <div className="md:col-span-2" id="details-group">
                          <label className="block text-[11px] font-mono text-stone-400 uppercase tracking-wider mb-1.5" id="details-lbl">
                            {isDE ? "Physische Details (Mimik, Haut, Augen)" : "Gaze & Face specifics"}
                          </label>
                          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full min-w-0" id="details-control">
                            <select
                              value={settings.details}
                              onChange={(e) => setSettings(prev => ({ ...prev, details: e.target.value }))}
                              className="flex-1 min-w-0 bg-stone-900/90 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-200 font-serif focus:border-amber-500 focus:outline-none truncate"
                              id="details-dropdown"
                            >
                              {options.subject_details.map((sd) => (
                                <option key={sd} value={sd} title={getLangText(sd, language)}>{getLangText(sd, language)}</option>
                              ))}
                            </select>
                            <input
                              type="checkbox"
                              checked={includes.details}
                              onChange={(e) => setIncludes(prev => ({ ...prev, details: e.target.checked }))}
                              className="w-4 h-4 accent-amber-500 shrink-0 cursor-pointer"
                              id="details-checkbox"
                            />
                          </div>
                        </div>

                        {/* Expressive emotion */}
                        <div className="md:col-span-2" id="emotion-group">
                          <label className="block text-[11px] font-mono text-stone-400 uppercase tracking-wider mb-1.5" id="emotion-lbl">
                            {isDE ? "Emotionale Aura & Ausdruck" : "Facial Expression / Aura"}
                          </label>
                          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full min-w-0" id="emotion-control">
                            <select
                              value={settings.emotion}
                              onChange={(e) => setSettings(prev => ({ ...prev, emotion: e.target.value }))}
                              className="flex-1 min-w-0 bg-stone-900/90 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-200 font-serif focus:border-amber-500 focus:outline-none truncate"
                              id="emotion-dropdown"
                            >
                              {options.emotional_depth.map((ed) => (
                                <option key={ed} value={ed}>{getLangText(ed, language)}</option>
                              ))}
                            </select>
                            <input
                              type="checkbox"
                              checked={includes.emotion}
                              onChange={(e) => setIncludes(prev => ({ ...prev, emotion: e.target.checked }))}
                              className="w-4 h-4 accent-amber-500 shrink-0 cursor-pointer"
                              id="emotion-checkbox"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    )}

                    {/* GROUP 2B: LANDSCAPE SPECIFIC FIELDS */}
                    {genre === "landscape" && (
                    <div className="bg-stone-900/40 border border-stone-850/60 rounded-xl p-4 space-y-4" id="group-landscape-subject">
                      <h3 className="text-stone-300 font-serif font-black text-xs uppercase tracking-widest border-b border-stone-850/75 pb-1.5 flex items-center gap-2" id="landscape-group-title">
                        <Workflow className="w-3.5 h-3.5 text-amber-500" id="landscape-group-icon" />
                        <span>Landschafts-Szenen & Natur</span>
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="landscape-group-inputs">
                        {/* Landscape Subject */}
                        <div id="landscape-subject-group">
                          <label className="block text-[11px] font-mono text-stone-400 uppercase tracking-wider mb-1.5" id="landscape-sub-lbl">
                            {isDE ? "Hauptmotiv / Landschaftstyp" : "Landscape Theme"}
                          </label>
                          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full min-w-0" id="landscape-sub-control">
                            <select
                              value={settings.landscape_subject}
                              onChange={(e) => setSettings(prev => ({ ...prev, landscape_subject: e.target.value }))}
                              className="flex-1 min-w-0 bg-stone-900/90 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-200 font-serif focus:border-amber-500 focus:outline-none truncate"
                              id="landscape-sub-dropdown"
                            >
                              {options.landscape_subjects.map((ls) => (
                                <option key={ls} value={ls}>{getLangText(ls, language)}</option>
                              ))}
                            </select>
                            <input
                              type="checkbox"
                              checked={includes.landscape_subject}
                              onChange={(e) => setIncludes(prev => ({ ...prev, landscape_subject: e.target.checked }))}
                              className="w-4 h-4 accent-amber-500 shrink-0 cursor-pointer"
                              id="landscape-sub-checkbox"
                            />
                          </div>
                        </div>

                        {/* Season */}
                        <div id="season-group">
                          <label className="block text-[11px] font-mono text-stone-400 uppercase tracking-wider mb-1.5" id="season-lbl">
                            {isDE ? "Saison / Jahreszeit" : "Season"}
                          </label>
                          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full min-w-0" id="season-control">
                            <select
                              value={settings.season}
                              onChange={(e) => setSettings(prev => ({ ...prev, season: e.target.value }))}
                              className="flex-1 min-w-0 bg-stone-900/90 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-200 font-serif focus:border-amber-500 focus:outline-none truncate"
                              id="season-dropdown"
                            >
                              {options.seasons.map((se) => (
                                <option key={se} value={se}>{getLangText(se, language)}</option>
                              ))}
                            </select>
                            <input
                              type="checkbox"
                              checked={includes.season}
                              onChange={(e) => setIncludes(prev => ({ ...prev, season: e.target.checked }))}
                              className="w-4 h-4 accent-amber-500 shrink-0 cursor-pointer"
                              id="season-checkbox"
                            />
                          </div>
                        </div>

                        {/* Time of Day */}
                        <div id="time-group">
                          <label className="block text-[11px] font-mono text-stone-400 uppercase tracking-wider mb-1.5" id="time-day-lbl">
                            {isDE ? "Tageszeit" : "Time of Day"}
                          </label>
                          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full min-w-0" id="time-day-control">
                            <select
                              value={settings.time_of_day}
                              onChange={(e) => setSettings(prev => ({ ...prev, time_of_day: e.target.value }))}
                              className="flex-1 min-w-0 bg-stone-900/90 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-200 font-serif focus:border-amber-500 focus:outline-none truncate"
                              id="time-day-dropdown"
                            >
                              {options.times_of_day.map((td) => (
                                <option key={td} value={td}>{getLangText(td, language)}</option>
                              ))}
                            </select>
                            <input
                              type="checkbox"
                              checked={includes.time_of_day}
                              onChange={(e) => setIncludes(prev => ({ ...prev, time_of_day: e.target.checked }))}
                              className="w-4 h-4 accent-amber-500 shrink-0 cursor-pointer"
                              id="time-day-checkbox"
                            />
                          </div>
                        </div>

                        {/* Elevation */}
                        <div id="elevation-group">
                          <label className="block text-[11px] font-mono text-stone-400 uppercase tracking-wider mb-1.5" id="elevation-lbl">
                            {isDE ? "Kamerahöhe / Perspektive" : "Bower Elevation"}
                          </label>
                          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full min-w-0" id="elevation-control">
                            <select
                              value={settings.camera_elevation}
                              onChange={(e) => setSettings(prev => ({ ...prev, camera_elevation: e.target.value }))}
                              className="flex-1 min-w-0 bg-stone-900/90 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-200 font-serif focus:border-amber-500 focus:outline-none truncate"
                              id="elevation-dropdown"
                            >
                              {options.camera_elevations.map((el) => (
                                <option key={el} value={el}>{getLangText(el, language)}</option>
                              ))}
                            </select>
                            <input
                              type="checkbox"
                              checked={includes.camera_elevation}
                              onChange={(e) => setIncludes(prev => ({ ...prev, camera_elevation: e.target.checked }))}
                              className="w-4 h-4 accent-amber-500 shrink-0 cursor-pointer"
                              id="elevation-checkbox"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    )}

                    {/* GROUP 2C: OBJECTS SPECIFIC FIELDS */}
                    {genre === "objects" && (
                    <div className="bg-stone-900/40 border border-stone-850/60 rounded-xl p-4 space-y-4" id="group-objects-subject">
                      <h3 className="text-stone-300 font-serif font-black text-xs uppercase tracking-widest border-b border-stone-850/75 pb-1.5 flex items-center gap-2" id="objects-group-title">
                        <Workflow className="w-3.5 h-3.5 text-amber-500" id="objects-group-icon" />
                        <span>Objekt, Sach-Details & Studio</span>
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="objects-group-inputs">
                        {/* Object Subject */}
                        <div id="object-subject-group">
                          <label className="block text-[11px] font-mono text-stone-400 uppercase tracking-wider mb-1.5" id="object-sub-lbl">
                            {isDE ? "Hauptobjekt / Motiv" : "Primary Object"}
                          </label>
                          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full min-w-0" id="object-sub-control">
                            <select
                              value={settings.object_subject}
                              onChange={(e) => setSettings(prev => ({ ...prev, object_subject: e.target.value }))}
                              className="flex-1 min-w-0 bg-stone-900/90 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-200 font-serif focus:border-amber-500 focus:outline-none truncate"
                              id="object-sub-dropdown"
                            >
                              {options.object_subjects.map((os) => (
                                <option key={os} value={os}>{getLangText(os, language)}</option>
                              ))}
                            </select>
                            <input
                              type="checkbox"
                              checked={includes.object_subject}
                              onChange={(e) => setIncludes(prev => ({ ...prev, object_subject: e.target.checked }))}
                              className="w-4 h-4 accent-amber-500 shrink-0 cursor-pointer"
                              id="object-sub-checkbox"
                            />
                          </div>
                        </div>

                        {/* Background */}
                        <div id="obj-backdrop-group">
                          <label className="block text-[11px] font-mono text-stone-400 uppercase tracking-wider mb-1.5" id="obj-backdrop-lbl">
                            {isDE ? "Hintergrund / Studio-Backdrop" : "Studio Fabric Backdrop"}
                          </label>
                          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full min-w-0" id="obj-backdrop-control">
                            <select
                              value={settings.background}
                              onChange={(e) => setSettings(prev => ({ ...prev, background: e.target.value }))}
                              className="flex-1 min-w-0 bg-stone-900/90 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-200 font-serif focus:border-amber-500 focus:outline-none truncate"
                              id="obj-backdrop-dropdown"
                            >
                              {options.backgrounds.map((bg) => (
                                <option key={bg} value={bg}>{getLangText(bg, language)}</option>
                              ))}
                            </select>
                            <input
                              type="checkbox"
                              checked={includes.background}
                              onChange={(e) => setIncludes(prev => ({ ...prev, background: e.target.checked }))}
                              className="w-4 h-4 accent-amber-500 shrink-0 cursor-pointer"
                              id="obj-backdrop-checkbox"
                            />
                          </div>
                        </div>

                        {/* Prop */}
                        <div id="obj-prop-group">
                          <label className="block text-[11px] font-mono text-stone-400 uppercase tracking-wider mb-1.5" id="obj-prop-lbl">
                            {isDE ? "Requisite / Beistellwerk" : "Secondary Prop"}
                          </label>
                          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full min-w-0" id="obj-prop-control">
                            <select
                              value={settings.prop}
                              onChange={(e) => setSettings(prev => ({ ...prev, prop: e.target.value }))}
                              className="flex-1 min-w-0 bg-stone-900/90 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-200 font-serif focus:border-amber-500 focus:outline-none truncate"
                              id="obj-prop-dropdown"
                            >
                              {options.props.map((pr) => (
                                <option key={pr} value={pr}>{getLangText(pr, language)}</option>
                              ))}
                            </select>
                            <input
                              type="checkbox"
                              checked={includes.props}
                              onChange={(e) => setIncludes(prev => ({ ...prev, props: e.target.checked }))}
                              className="w-4 h-4 accent-amber-500 shrink-0 cursor-pointer"
                              id="obj-prop-checkbox"
                            />
                          </div>
                        </div>

                        {/* Lighting */}
                        <div id="obj-lighting-group">
                          <label className="block text-[11px] font-mono text-stone-400 uppercase tracking-wider mb-1.5" id="obj-lighting-lbl">
                            {isDE ? "Ausleuchtungsdesign" : "Lighting Design"}
                          </label>
                          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full min-w-0" id="obj-lighting-control">
                            <select
                              value={settings.lighting}
                              onChange={(e) => setSettings(prev => ({ ...prev, lighting: e.target.value }))}
                              className="flex-1 min-w-0 bg-[#161618] border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-200 font-serif focus:border-amber-500 focus:outline-none truncate"
                              id="obj-lighting-dropdown"
                            >
                              {options.lighting.map((li) => (
                                <option key={li} value={li}>{getLangText(li, language)}</option>
                              ))}
                            </select>
                            <input
                              type="checkbox"
                              checked={includes.lighting}
                              onChange={(e) => setIncludes(prev => ({ ...prev, lighting: e.target.checked }))}
                              className="w-4 h-4 accent-amber-500 shrink-0 cursor-pointer"
                              id="obj-lighting-checkbox"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    )}

                    {/* GROUP 3: EMULSION & PRINT LABORATORY */}
                    <div className="bg-stone-900/40 border border-stone-850/60 rounded-xl p-4 space-y-4" id="group-chemical">
                      <h3 className="text-stone-300 font-serif font-black text-xs uppercase tracking-widest border-b border-stone-850/75 pb-1.5 flex items-center gap-2" id="chemical-group-title">
                        <History className="w-3.5 h-3.5 text-amber-500" id="chemical-group-icon" />
                        <span>Emulsion & Dunkelkammer</span>
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="chemical-group-inputs">
                        {/* Film emulsion based dynamically */}
                        <div id="film-group">
                          <label className="block text-[11px] font-mono text-stone-400 uppercase tracking-wider mb-1.5" id="film-lbl">
                            {isDE ? "Filmemulsion (Film Stock)" : "Film Emulsion"}
                          </label>
                          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full min-w-0" id="film-control">
                            <select
                              value={settings.film}
                              onChange={(e) => setSettings(prev => ({ ...prev, film: e.target.value }))}
                              className="flex-1 min-w-0 bg-stone-900/90 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-200 font-serif focus:border-amber-500 focus:outline-none truncate"
                              id="film-dropdown"
                            >
                              {/* Evaluated dynamically in gear selection, but safe list here */}
                              {((settings.type === "Schwarz-Weiß / Black-and-White" 
                                  ? options.films[settings.camera_type] 
                                  : settings.type === "C41 (Farbe) / C41 (Color)" 
                                    ? options.films["c41"] 
                                    : settings.type === "E6 (Dias) / E6 (Slides)"
                                      ? options.films["e6"]
                                      : settings.type === "Polaroid / Polaroid"
                                        ? options.films["Polaroid"]
                                        : settings.type === "Expired / Expired"
                                          ? options.films["expired"]
                                          : options.films["experimental"]
                                ) || []).map((f) => (
                                  <option key={f} value={f} title={getLangText(f, language)}>{getLangText(f, language)}</option>
                              ))}
                            </select>
                            <input
                              type="checkbox"
                              checked={includes.film}
                              onChange={(e) => setIncludes(prev => ({ ...prev, film: e.target.checked }))}
                              className="w-4 h-4 accent-amber-500 shrink-0 cursor-pointer"
                              id="film-checkbox"
                            />
                          </div>
                        </div>

                        {/* Film detail / Grain texture */}
                        <div id="film-detail-group">
                          <label className="block text-[11px] font-mono text-stone-400 uppercase tracking-wider mb-1.5" id="film-detail-lbl">
                            {isDE ? "Körnungsgrad / Korn-Tiefe" : "Salt-grain Density"}
                          </label>
                          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full min-w-0" id="film-detail-control">
                            <select
                              value={settings.film_detail}
                              onChange={(e) => setSettings(prev => ({ ...prev, film_detail: e.target.value }))}
                              className="flex-1 min-w-0 bg-stone-900/90 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-200 font-serif focus:border-amber-500 focus:outline-none truncate"
                              id="film-detail-dropdown"
                            >
                              {options.film_details.map((fd) => (
                                <option key={fd} value={fd}>{getLangText(fd, language)}</option>
                              ))}
                            </select>
                            <input
                              type="checkbox"
                              checked={includes.film_detail}
                              onChange={(e) => setIncludes(prev => ({ ...prev, film_detail: e.target.checked }))}
                              className="w-4 h-4 accent-amber-500 shrink-0 cursor-pointer"
                              id="film-detail-checkbox"
                            />
                          </div>
                        </div>

                        {/* Apply lab chemical processing choice */}
                        <div id="lab-processing-choice-group">
                          <label className="block text-[11px] font-mono text-stone-400 uppercase tracking-wider mb-1.5" id="lab-processing-choice-lbl">
                            {isDE ? "Fotochemie-Verschiebung?" : "Tweak chemical wash?"}
                          </label>
                          <select
                            value={settings.post_processing_choice}
                            onChange={(e) => setSettings(prev => ({ ...prev, post_processing_choice: e.target.value }))}
                            className="w-full min-w-0 bg-stone-900/90 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-200 font-serif focus:border-amber-500 focus:outline-none truncate"
                            id="lab-processing-choice-dropdown"
                          >
                            <option value="yes">{isDE ? "Ja" : "Yes"}</option>
                            <option value="no">{isDE ? "Nein" : "No"}</option>
                          </select>
                        </div>

                        {/* Chemical Post-processing / Toning */}
                        <div id="post-processing-group">
                          <label className="block text-[11px] font-mono text-stone-400 uppercase tracking-wider mb-1.5" id="post-processing-lbl">
                            {isDE ? "Edeldruck / Tonung" : "Lab Bleach & Tones"}
                          </label>
                          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full min-w-0" id="post-processing-control">
                            <select
                              disabled={settings.post_processing_choice === "no"}
                              value={settings.post_processing}
                              onChange={(e) => setSettings(prev => ({ ...prev, post_processing: e.target.value }))}
                              className="flex-1 min-w-0 bg-stone-900/90 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-200 font-serif focus:border-amber-500 focus:outline-none disabled:opacity-40 truncate"
                              id="post-processing-dropdown"
                            >
                              {options.post_processing.map((pp) => (
                                <option key={pp} value={pp}>{getLangText(pp, language)}</option>
                              ))}
                            </select>
                            <input
                              type="checkbox"
                              checked={includes.post_processing}
                              onChange={(e) => setIncludes(prev => ({ ...prev, post_processing: e.target.checked }))}
                              className="w-4 h-4 accent-amber-500 shrink-0 cursor-pointer"
                              id="post-processing-checkbox"
                            />
                          </div>
                        </div>

                        {/* Expired Film selection */}
                        <div id="expired-film-group">
                          <label className="block text-[11px] font-mono text-stone-400 uppercase tracking-wider mb-1.5" id="expired-film-lbl">
                            ⏳ {isDE ? "Überlagerter Film (Expired Stock)" : "Expired Film Stock"}
                          </label>
                          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full min-w-0" id="expired-film-control">
                            <select
                              value={settings.expired_film || ""}
                              onChange={(e) => setSettings(prev => ({ ...prev, expired_film: e.target.value }))}
                              className="flex-1 min-w-0 bg-stone-900/90 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-200 font-serif focus:border-amber-500 focus:outline-none truncate"
                              id="expired-film-dropdown"
                            >
                              <option value="">{isDE ? "-- Kein überlagerter Film --" : "-- No Expired Film (Use Stock) --"}</option>
                              {options.expired_films.map((ef) => (
                                <option key={ef} value={ef}>{getLangText(ef, language)}</option>
                              ))}
                            </select>
                            <input
                              type="checkbox"
                              checked={includes.expired_film}
                              onChange={(e) => setIncludes(prev => ({ ...prev, expired_film: e.target.checked }))}
                              className="w-4 h-4 accent-amber-500 shrink-0 cursor-pointer"
                              id="expired-film-checkbox"
                            />
                          </div>
                        </div>

                        {/* Expired Paper selection */}
                        <div id="expired-paper-group">
                          <label className="block text-[11px] font-mono text-stone-400 uppercase tracking-wider mb-1.5" id="expired-paper-lbl">
                            ⏳ {isDE ? "Überlagertes Papier (Expired Paper)" : "Expired Enlarging Paper"}
                          </label>
                          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full min-w-0" id="expired-paper-control">
                            <select
                              value={settings.expired_paper || ""}
                              onChange={(e) => setSettings(prev => ({ ...prev, expired_paper: e.target.value }))}
                              className="flex-1 min-w-0 bg-stone-900/90 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-200 font-serif focus:border-amber-500 focus:outline-none truncate"
                              id="expired-paper-dropdown"
                            >
                              <option value="">{isDE ? "-- Kein überlagertes Papier --" : "-- No Expired Paper (Standard Print) --"}</option>
                              {options.expired_papers.map((ep) => (
                                <option key={ep} value={ep}>{getLangText(ep, language)}</option>
                              ))}
                            </select>
                            <input
                              type="checkbox"
                              checked={includes.expired_paper}
                              onChange={(e) => setIncludes(prev => ({ ...prev, expired_paper: e.target.checked }))}
                              className="w-4 h-4 accent-amber-500 shrink-0 cursor-pointer"
                              id="expired-paper-checkbox"
                            />
                          </div>
                        </div>

                        {/* Prints / Archival archival level */}
                        <div className="md:col-span-2" id="quality-group">
                          <label className="block text-[11px] font-mono text-stone-400 uppercase tracking-wider mb-1.5" id="quality-lbl">
                            {isDE ? "Abzugs-Druckverfahren u. Qualität" : "Photo Print / Exhibition archival"}
                          </label>
                          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full min-w-0" id="quality-control">
                            <select
                              value={settings.quality}
                              onChange={(e) => setSettings(prev => ({ ...prev, quality: e.target.value }))}
                              className="flex-1 min-w-0 bg-stone-900/90 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-200 font-serif focus:border-amber-500 focus:outline-none truncate"
                              id="quality-dropdown"
                            >
                              {options.quality_levels.map((ql) => (
                                <option key={ql} value={ql} title={getLangText(ql, language)}>{getLangText(ql, language)}</option>
                              ))}
                            </select>
                            <input
                              type="checkbox"
                              checked={includes.quality}
                              onChange={(e) => setIncludes(prev => ({ ...prev, quality: e.target.checked }))}
                              className="w-4 h-4 accent-amber-500 shrink-0 cursor-pointer"
                              id="quality-checkbox"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* GROUP 4: STYLE & AMBIENCE SCENARIO */}
                    <div className="bg-stone-900/40 border border-stone-850/60 rounded-xl p-4 space-y-4" id="group-ambiance">
                      <h3 className="text-stone-300 font-serif font-black text-xs uppercase tracking-widest border-b border-stone-850/75 pb-1.5 flex items-center gap-2" id="ambiance-group-title">
                        <BookOpen className="w-3.5 h-3.5 text-amber-500" id="ambiance-group-icon" />
                        <span>Klamotten, Ära & Lichtmischung</span>
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="ambiance-group-inputs">
                        {/* Photographer Art influence style */}
                        <div id="photographer-style-group">
                          <label className="block text-[11px] font-mono text-stone-400 uppercase tracking-wider mb-1.5" id="photographer-style-lbl">
                            {isDE ? "Maestro Fotografen-Stil" : "Maestro Master Style"}
                          </label>
                          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full min-w-0" id="photographer-style-control">
                            <select
                              value={settings.style}
                              onChange={(e) => setSettings(prev => ({ ...prev, style: e.target.value }))}
                              className="flex-1 min-w-0 bg-stone-900/90 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-200 font-serif focus:border-amber-500 focus:outline-none truncate"
                              id="photographer-style-dropdown"
                            >
                              {options.styles.map((s) => (
                                <option key={s} value={s} title={getLangText(s, language)}>{getLangText(s, language)}</option>
                              ))}
                            </select>
                            <input
                              type="checkbox"
                              checked={includes.style}
                              onChange={(e) => setIncludes(prev => ({ ...prev, style: e.target.checked }))}
                              className="w-4 h-4 accent-amber-500 shrink-0 cursor-pointer"
                              id="photographer-style-checkbox"
                            />
                          </div>
                        </div>

                        {/* Location */}
                        <div id="location-group">
                          <label className="block text-[11px] font-mono text-stone-400 uppercase tracking-wider mb-1.5" id="location-lbl">
                            {isDE ? "Bühnen-Hintergrundtyp" : "Studio / Outdoor Setting"}
                          </label>
                          <select
                            value={settings.location}
                            onChange={(e) => setSettings(prev => ({ ...prev, location: e.target.value }))}
                            className="w-full min-w-0 bg-stone-900/90 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-200 font-serif focus:border-amber-500 focus:outline-none truncate"
                            id="location-dropdown"
                          >
                            <option value="Studio / Innenaufnahme">{isDE ? "Studio / Innenaufnahme" : "Studio / Indoor"}</option>
                            <option value="Außenaufnahme / Outdoor">{isDE ? "Außenaufnahme / Outdoor" : "Outdoor"}</option>
                          </select>
                        </div>

                        {/* Attire base clothing */}
                        <div id="attire-group">
                          <label className="block text-[11px] font-mono text-stone-400 uppercase tracking-wider mb-1.5" id="attire-lbl">
                            {isDE ? "Kleidungsstil" : "Apparel & Garment"}
                          </label>
                          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full min-w-0" id="attire-control">
                            <select
                              value={settings.clothing}
                              onChange={(e) => setSettings(prev => ({ ...prev, clothing: e.target.value }))}
                              className="flex-1 min-w-0 bg-stone-900/90 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-200 font-serif focus:border-amber-500 focus:outline-none truncate"
                              id="attire-dropdown"
                            >
                              {/* Selected according to gender */}
                              {((settings.gender?.includes("Männlich") || settings.gender?.includes("Male")
                                  ? options.mens_clothing 
                                  : options.womens_clothing
                                ) || []).map((cl) => (
                                  <option key={cl} value={cl} title={getLangText(cl, language)}>{getLangText(cl, language)}</option>
                              ))}
                            </select>
                            <input
                              type="checkbox"
                              checked={includes.clothing}
                              onChange={(e) => setIncludes(prev => ({ ...prev, clothing: e.target.checked }))}
                              className="w-4 h-4 accent-amber-500 shrink-0 cursor-pointer"
                              id="attire-checkbox"
                            />
                          </div>
                        </div>

                        {/* Cultural Element */}
                        <div id="cultural-group">
                          <label className="block text-[11px] font-mono text-stone-400 uppercase tracking-wider mb-1.5" id="cultural-lbl">
                            {isDE ? "Kultureller Einfluss" : "Cultural Element"}
                          </label>
                          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full min-w-0" id="cultural-control">
                            <select
                              value={settings.cultural_element}
                              onChange={(e) => setSettings(prev => ({ ...prev, cultural_element: e.target.value }))}
                              className="flex-1 min-w-0 bg-stone-900/90 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-200 font-serif focus:border-amber-500 focus:outline-none truncate"
                              id="cultural-dropdown"
                            >
                              {options.cultural_elements.map((ce) => (
                                <option key={ce} value={ce} title={getLangText(ce, language)}>{getLangText(ce, language)}</option>
                              ))}
                            </select>
                            <input
                              type="checkbox"
                              checked={includes.cultural}
                              onChange={(e) => setIncludes(prev => ({ ...prev, cultural: e.target.checked }))}
                              className="w-4 h-4 accent-amber-500 shrink-0 cursor-pointer"
                              id="cultural-checkbox"
                            />
                          </div>
                        </div>

                        {/* Time Period Era */}
                        <div id="era-group">
                          <label className="block text-[11px] font-mono text-stone-400 uppercase tracking-wider mb-1.5" id="era-lbl">
                            {isDE ? "Zeitepoche / Dekade" : "Vintage Era"}
                          </label>
                          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full min-w-0" id="era-control">
                            <select
                              value={settings.time_period}
                              onChange={(e) => setSettings(prev => ({ ...prev, time_period: e.target.value }))}
                              className="flex-1 min-w-0 bg-stone-900/90 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-200 font-serif focus:border-amber-500 focus:outline-none truncate"
                              id="era-dropdown"
                            >
                              {options.time_periods.map((tp) => (
                                <option key={tp} value={tp}>{getLangText(tp, language)}</option>
                              ))}
                            </select>
                            <input
                              type="checkbox"
                              checked={includes.time_period}
                              onChange={(e) => setIncludes(prev => ({ ...prev, time_period: e.target.checked }))}
                              className="w-4 h-4 accent-amber-500 shrink-0 cursor-pointer"
                              id="era-checkbox"
                            />
                          </div>
                        </div>

                        {/* Body Pose */}
                        <div id="pose-group">
                          <label className="block text-[11px] font-mono text-stone-400 uppercase tracking-wider mb-1.5" id="pose-lbl">
                            {isDE ? "Körper-Pose / Stance" : "Subject Stance"}
                          </label>
                          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full min-w-0" id="pose-control">
                            <select
                              value={settings.pose}
                              onChange={(e) => setSettings(prev => ({ ...prev, pose: e.target.value }))}
                              className="flex-1 min-w-0 bg-stone-900/90 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-200 font-serif focus:border-amber-500 focus:outline-none truncate"
                              id="pose-dropdown"
                            >
                              {options.poses.map((p) => (
                                <option key={p} value={p} title={getLangText(p, language)}>{getLangText(p, language)}</option>
                              ))}
                            </select>
                            <input
                              type="checkbox"
                              checked={includes.pose}
                              onChange={(e) => setIncludes(prev => ({ ...prev, pose: e.target.checked }))}
                              className="w-4 h-4 accent-amber-500 shrink-0 cursor-pointer"
                              id="pose-checkbox"
                            />
                          </div>
                        </div>

                        {/* Lighting design */}
                        <div id="lighting-group">
                          <label className="block text-[11px] font-mono text-stone-400 uppercase tracking-wider mb-1.5" id="lighting-lbl">
                            {isDE ? "Beleuchtungskonzept" : "Lighting Setup"}
                          </label>
                          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full min-w-0" id="lighting-control">
                            <select
                              value={settings.lighting}
                              onChange={(e) => setSettings(prev => ({ ...prev, lighting: e.target.value }))}
                              className="flex-1 min-w-0 bg-stone-900/90 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-200 font-serif focus:border-amber-500 focus:outline-none truncate"
                              id="lighting-dropdown"
                            >
                              {options.lighting.map((li) => (
                                <option key={li} value={li} title={getLangText(li, language)}>{getLangText(li, language)}</option>
                              ))}
                            </select>
                            <input
                              type="checkbox"
                              checked={includes.lighting}
                              onChange={(e) => setIncludes(prev => ({ ...prev, lighting: e.target.checked }))}
                              className="w-4 h-4 accent-amber-500 shrink-0 cursor-pointer"
                              id="lighting-checkbox"
                            />
                          </div>
                        </div>

                        {/* Backdrops background */}
                        <div id="backdrop-group">
                          <label className="block text-[11px] font-mono text-stone-400 uppercase tracking-wider mb-1.5" id="backdrop-lbl">
                            {isDE ? "Hintergrundkulisse" : "Background Backdrop"}
                          </label>
                          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full min-w-0" id="backdrop-control">
                            <select
                              value={settings.background}
                              onChange={(e) => setSettings(prev => ({ ...prev, background: e.target.value }))}
                              className="flex-1 min-w-0 bg-stone-900/90 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-200 font-serif focus:border-amber-500 focus:outline-none truncate"
                              id="backdrop-dropdown"
                            >
                              {options.backgrounds.map((bg) => (
                                <option key={bg} value={bg} title={getLangText(bg, language)}>{getLangText(bg, language)}</option>
                              ))}
                            </select>
                            <input
                              type="checkbox"
                              checked={includes.background}
                              onChange={(e) => setIncludes(prev => ({ ...prev, background: e.target.checked }))}
                              className="w-4 h-4 accent-amber-500 shrink-0 cursor-pointer"
                              id="backdrop-checkbox"
                            />
                          </div>
                        </div>

                        {/* Prop */}
                        <div id="prop-group">
                          <label className="block text-[11px] font-mono text-stone-400 uppercase tracking-wider mb-1.5" id="prop-lbl">
                            {isDE ? "Erzählerische Requisite" : "Storytelling Prop"}
                          </label>
                          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full min-w-0" id="prop-control">
                            <select
                              value={settings.prop}
                              onChange={(e) => setSettings(prev => ({ ...prev, prop: e.target.value }))}
                              className="flex-1 min-w-0 bg-stone-900/90 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-200 font-serif focus:border-amber-500 focus:outline-none truncate"
                              id="prop-dropdown"
                            >
                              {options.props.map((p) => (
                                <option key={p} value={p} title={getLangText(p, language)}>{getLangText(p, language)}</option>
                              ))}
                            </select>
                            <input
                              type="checkbox"
                              checked={includes.prop}
                              onChange={(e) => setIncludes(prev => ({ ...prev, props: e.target.checked }))}
                              className="w-4 h-4 accent-amber-500 shrink-0 cursor-pointer"
                              id="prop-checkbox"
                            />
                          </div>
                        </div>

                        {/* Ambiance */}
                        <div id="ambiance-group">
                          <label className="block text-[11px] font-mono text-stone-400 uppercase tracking-wider mb-1.5" id="ambiance-lbl">
                            {isDE ? "Atmosphärische Stimmung" : "Ambiance & Warmth"}
                          </label>
                          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full min-w-0" id="ambiance-control">
                            <select
                              value={settings.ambiance}
                              onChange={(e) => setSettings(prev => ({ ...prev, ambiance: e.target.value }))}
                              className="flex-1 min-w-0 bg-stone-900/90 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-200 font-serif focus:border-amber-500 focus:outline-none truncate"
                              id="ambiance-dropdown"
                            >
                              {options.ambiance.map((am) => (
                                <option key={am} value={am} title={getLangText(am, language)}>{getLangText(am, language)}</option>
                              ))}
                            </select>
                            <input
                              type="checkbox"
                              checked={includes.ambiance}
                              onChange={(e) => setIncludes(prev => ({ ...prev, ambiance: e.target.checked }))}
                              className="w-4 h-4 accent-amber-500 shrink-0 cursor-pointer"
                              id="ambiance-checkbox"
                            />
                          </div>
                        </div>

                        {/* Weather - Conditioned */}
                        <div id="weather-group">
                          <label className="block text-[11px] font-mono text-stone-400 uppercase tracking-wider mb-1.5" id="weather-lbl">
                            {isDE ? "Wetterbedingungen" : "Outdoor Weather"}
                          </label>
                          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full min-w-0" id="weather-control">
                            <select
                              disabled={!isOutdoor}
                              value={settings.weather}
                              onChange={(e) => setSettings(prev => ({ ...prev, weather: e.target.value }))}
                              className="flex-1 min-w-0 bg-stone-900/90 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-200 font-serif focus:border-amber-500 focus:outline-none disabled:opacity-40 truncate"
                              id="weather-dropdown"
                            >
                              {options.weather_conditions.map((wc) => (
                                <option key={wc} value={wc}>{getLangText(wc, language)}</option>
                              ))}
                            </select>
                            <input
                              disabled={!isOutdoor}
                              type="checkbox"
                              checked={includes.weather}
                              onChange={(e) => setIncludes(prev => ({ ...prev, weather: e.target.checked }))}
                              className="w-4 h-4 accent-amber-500 shrink-0 cursor-pointer disabled:opacity-45"
                              id="weather-checkbox"
                            />
                          </div>
                        </div>

                        {/* Photographic Overall Effect */}
                        <div id="photo-effect-group">
                          <label className="block text-[11px] font-mono text-stone-400 uppercase tracking-wider mb-1.5" id="photo-effect-lbl">
                            {isDE ? "Fotografischer Gesamteffekt" : "Overall Photo Look"}
                          </label>
                          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full min-w-0" id="photo-effect-control">
                            <select
                              value={settings.effect}
                              onChange={(e) => setSettings(prev => ({ ...prev, effect: e.target.value }))}
                              className="flex-1 min-w-0 bg-stone-900/90 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-200 font-serif focus:border-amber-500 focus:outline-none truncate"
                              id="photo-effect-dropdown"
                            >
                              {options.effects.map((ef) => (
                                <option key={ef} value={ef} title={getLangText(ef, language)}>{getLangText(ef, language)}</option>
                              ))}
                            </select>
                            <input
                              type="checkbox"
                              checked={includes.effect}
                              onChange={(e) => setIncludes(prev => ({ ...prev, effect: e.target.checked }))}
                              className="w-4 h-4 accent-amber-500 shrink-0 cursor-pointer"
                              id="photo-effect-checkbox"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* NEGATIVE PROMPT MANUAL AREA */}
                    <div className="bg-stone-900/40 border border-stone-850/60 rounded-xl p-4" id="group-negative">
                      <label className="block text-[11px] font-mono text-red-400 uppercase tracking-wider mb-2" id="neg-prompt-lbl">
                        {isDE ? "Auszuschließende Bildelemente (Negative Prompt)" : "Negative Prompt - Exclude artifacts"}
                      </label>
                      <input
                        type="text"
                        value={settings.negative_prompt}
                        onChange={(e) => setSettings(prev => ({ ...prev, negative_prompt: e.target.value }))}
                        className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3.5 py-2.5 text-stone-300 font-mono text-xs focus:border-amber-500 focus:outline-none"
                        id="neg-prompt-input"
                      />
                    </div>
                  </div>
                </div>
                )}
              </div>

              {/* Right Column: Dynamic Realtime Compilation Dashboard (5 Cols on Desktop) */}
              <div className="lg:col-span-12 xl:col-span-5 lg:sticky lg:top-24 space-y-6" id="compilation-column">
                
                {/* Live Output Card */}
                <div className="bg-[#0c0c0e] border border-white/10 rounded-sm p-5 sm:p-6 shadow-2xl relative overflow-hidden" id="output-board">
                  
                  {/* Prompt Preview Header */}
                  <div className="mb-4" id="output-header">
                    <div className="flex items-center justify-between" id="output-title-row">
                      <div className="flex items-center gap-2" id="output-badge-wrap">
                        <Sparkles className="w-5 h-5 text-white anim-pulse animate-pulse" id="output-sparkles-icon" />
                        <h3 className="font-sans font-bold uppercase tracking-wider text-white text-sm" id="output-title">
                          {isDE ? "Echtzeit-Dunkelkammer" : "Real-time Developer"}
                        </h3>
                      </div>

                      <span className="text-[10px] font-mono tracking-widest text-zinc-400 font-bold px-2 py-0.5 bg-zinc-950 border border-white/10 rounded-sm" id="exposure-status-badge">
                        READY // EXPOSED
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 mt-1" id="output-subtitle">
                      {isDE ? "Kopiere den generierten Prompt direkt in Midjourney, Flux oder Stable Diffusion." : "Directly extract the fully exposed photographic parameters."}
                    </p>
                  </div>

                  {/* Realtime Outputs */}
                  <div className="space-y-4" id="output-textareas">
                    
                    {/* PRIMARY MIDJOURNEY PROMPT (ENGLISH) */}
                    <div className="relative group" id="output-english-block">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1.5" id="en-block-header">
                        <span className="text-[11px] font-mono text-white uppercase tracking-widest font-bold" id="en-block-title">
                          {isDE ? "Flux & SDXL-Stil (Englisch - Ausführlich)" : "Flux & SDXL Style (English - Descriptive)"}
                        </span>
                        
                        <div className="flex items-center gap-2" id="en-block-actions">
                          {/* Copy as Markdown Button */}
                          <button
                            onClick={handleCopyAsMarkdown}
                            className="px-2.5 py-1 text-[10px] border border-amber-500/20 hover:border-amber-500/50 bg-amber-950/20 hover:bg-amber-500 hover:text-black font-mono uppercase tracking-wider text-amber-500 hover:text-black rounded-sm transition duration-300 flex items-center gap-1.5 cursor-pointer"
                            id="copy-md-btn"
                            title={isDE ? "Mit technischen Metadaten kopieren" : "Copy prompt with all technical metadata"}
                          >
                            {copiedMarkdown ? (
                              <>
                                <Check className="w-3.5 h-3.5 animate-bounce" id="md-copied-icon" />
                                <span className="font-semibold" id="md-copied-lbl">{isDE ? "MD Kopiert!" : "MD Copied!"}</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5 text-amber-500 transition-colors" id="md-copy-icon" />
                                <span id="md-copy-lbl">{isDE ? "Als Markdown" : "Copy Markdown"}</span>
                              </>
                            )}
                          </button>

                          <button
                            onClick={() => handleCopyPrompt(englishPromptValue, true)}
                            className="px-2.5 py-1 text-[10px] border border-white/10 hover:border-white/30 bg-zinc-950 hover:bg-white hover:text-black font-mono uppercase tracking-wider text-zinc-300 rounded-sm transition duration-300 flex items-center gap-1.5 cursor-pointer"
                            id="copy-en-btn"
                          >
                            {copiedEnglish ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-zinc-400 animate-bounce" id="en-copied-icon" />
                                <span className="text-zinc-300 font-semibold" id="en-copied-lbl">{isDE ? "Kopiert!" : "Copied!"}</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5 text-zinc-500 transition-colors" id="en-copy-icon" />
                                <span id="en-copy-lbl">{isDE ? "Prompt kopieren" : "Copy Prompt"}</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="bg-[#050505] border border-white/10 p-4 rounded-sm text-xs font-mono text-zinc-200 leading-relaxed tracking-wide min-h-[140px] select-all max-h-[220px] overflow-y-auto" id="en-prompt-p">
                        {englishPromptValue}
                      </div>
                    </div>

                    {/* GERMAN COMPARATIVE PREVIEW (IF SIGNIFICANTLY DIFFERENT) */}
                    <div className="relative" id="output-german-block">
                      <div className="flex items-center justify-between mb-1.5" id="de-block-header">
                        <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest font-bold" id="de-block-title">
                          {isDE ? "Midjourney & SD1.5-Stil (Englisch - Tag/Token)" : "Midjourney & SD1.5 Style (English - Tag/Token)"}
                        </span>

                        <button
                          onClick={() => handleCopyPrompt(germanPromptValue, false)}
                          className="px-2.5 py-1 text-[10px] border border-white/10 hover:border-white/35 bg-[#050505] text-zinc-400 hover:text-white rounded-sm transition flex items-center gap-1.5"
                          id="copy-de-btn"
                        >
                          {copiedGerman ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-zinc-300" id="de-copied-icon" />
                              <span className="text-zinc-300 font-semibold" id="de-copied-lbl">{isDE ? "Kopiert!" : "Copied!"}</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-zinc-500" id="de-copy-icon" />
                              <span id="de-copy-lbl">{isDE ? "Kopieren" : "Copy"}</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="bg-[#050505]/60 border border-white/10 p-3.5 rounded-sm text-xs text-zinc-400 leading-relaxed min-h-[60px] max-h-[120px] overflow-y-auto" id="de-prompt-p">
                        {germanPromptValue}
                      </div>
                    </div>

                    {/* NEGATIVE PROMPT EXPORT */}
                    {settings.negative_prompt && (
                      <div id="output-neg-block">
                        <div className="flex items-center justify-between mb-1" id="neg-block-header">
                          <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider" id="neg-block-title">
                            Negative Prompt
                          </span>

                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(settings.negative_prompt);
                            }}
                            className="text-[10px] font-mono uppercase text-zinc-500 hover:text-white"
                            id="copy-neg-btn"
                          >
                            {isDE ? "Kopieren" : "Copy"}
                          </button>
                        </div>
                        <p className="bg-zinc-950/45 border border-white/10 px-3 py-2 rounded-sm text-zinc-400 font-mono text-[11px] truncate" id="neg-prompt-p">
                          {settings.negative_prompt}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Actions Area */}
                  <div className="mt-6 pt-5 border-t border-white/10 flex gap-3" id="output-actions">
                    <button
                      onClick={handleOpenSaveModal}
                      className="flex-1 bg-white text-black hover:bg-zinc-200 text-xs font-bold py-3.5 rounded-sm flex items-center justify-center gap-2 transition duration-300 uppercase tracking-widest cursor-pointer"
                      id="save-to-library-btn"
                    >
                      <Save className="w-4 h-4" id="save-icon" />
                      <span>{isDE ? "In Archiv ablegen" : "Archive Configuration"}</span>
                    </button>
                  </div>
                </div>

                {/* Quick Recipes panel in sidebar */}
                <div className="bg-[#0c0c0e] border border-white/10 rounded-sm p-4" id="quick-recipes-sidebar-panel">
                  <h4 className="text-xs font-mono uppercase tracking-widest mb-3 border-b border-white/10 pb-2 flex items-center justify-between gap-1.5 text-zinc-400" id="quick-recipes-title">
                    <div className="flex items-center gap-1.5">
                      <History className="w-3.5 h-3.5 text-amber-500 animate-pulse" id="quick-recipes-icon" />
                      <span>{isDE ? "Schnelle Entwickler-Profile" : "Quick Developer Profiles"}</span>
                    </div>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 bg-zinc-950 border border-white/5 text-amber-500/80 rounded-[2px]" id="quick-recipes-count">
                      13 Presets
                    </span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-1.5 max-h-[380px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-zinc-800" id="quick-recipes-grid">
                    {presetRecipes.map((preset, idx) => {
                      // Compact hardware + film representation for subtitle
                      let cameraShorthand = "";
                      try {
                        if (preset.settings.camera) {
                          const cam = preset.settings.camera.replace(" Classic", "").replace(" Messsucher", "").replace(" SLR", "").replace(" TLR", "");
                          const camFirstWords = cam.split(" ").slice(0, 2).join(" ");
                          
                          if (preset.settings.film) {
                            const filmShort = preset.settings.film.split(",")[0].replace(" film", "").replace("Film", "").replace(" Diafilm", "").trim();
                            const filmWords = filmShort.split(" ").slice(0, 2).join(" ");
                            cameraShorthand = `${camFirstWords} & ${filmWords}`;
                          } else {
                            cameraShorthand = camFirstWords;
                          }
                        } else {
                          cameraShorthand = "Analog Recipe";
                        }
                      } catch (e) {
                        cameraShorthand = "Master Preset";
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => handleLoadPreset(preset)}
                          className="w-full text-left p-2 border border-white/5 hover:border-amber-500/30 bg-zinc-950/60 hover:bg-zinc-900/90 rounded-sm transition-all duration-300 cursor-pointer flex items-center gap-2 group"
                          id={`recipe-quick-${idx}`}
                          title={preset.description}
                        >
                          <span className="text-base shrink-0 select-none group-hover:scale-110 transition-transform duration-300" id={`recipe-quick-icon-${idx}`}>
                            {preset.icon || "📷"}
                          </span>
                          <div className="min-w-0 flex-1" id={`recipe-quick-info-${idx}`}>
                            <span className="text-xs font-sans font-bold text-zinc-300 group-hover:text-white truncate block transition-colors" id={`recipe-quick-title-${idx}`}>
                              {preset.title}
                            </span>
                            <span className="text-[9px] font-mono text-zinc-500 group-hover:text-amber-500/80 truncate block mt-0.5 tracking-wide uppercase transition-colors" id={`recipe-quick-shorthand-${idx}`}>
                              {cameraShorthand}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {activeTab === "archive" && (
            <motion.div 
              key="archive-key" 
              initial={{ opacity: 0, scale: 0.98 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.98 }}
              className="w-full"
              id="archive-tab-body"
            >
              <LibraryTab 
                savedPrompts={savedPrompts}
                onLoadPrompt={handleLoadSavedPrompt}
                onDeletePrompt={handleDeleteSavedPrompt}
                onLoadPreset={handleLoadPreset}
                language={language}
                onUpdatePrompt={handleUpdatePrompt}
                onAddPrompt={(p) => setSavedPrompts(prev => [p, ...prev])}
              />
            </motion.div>
          )}

          {activeTab === "history" && (
            <motion.div 
              key="history-key" 
              initial={{ opacity: 0, scale: 0.98 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.98 }}
              className="w-full"
              id="history-tab-body"
            >
              <HistoryTab 
                historyPrompts={historyPrompts}
                onLoadPrompt={handleLoadSavedPrompt}
                onDeleteHistoryItem={(id) => setHistoryPrompts(prev => prev.filter(item => item.id !== id))}
                onClearHistory={() => setHistoryPrompts([])}
                onArchiveHistoryItem={(p) => setSavedPrompts(prev => [{ ...p, id: "fav_" + Date.now().toString() }, ...prev])}
                language={language}
              />
            </motion.div>
          )}

          {activeTab === "inventory" && (
            <motion.div 
              key="inventory-key" 
              initial={{ opacity: 0, scale: 0.98 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.98 }}
              className="w-full"
              id="inventory-tab-body"
            >
              <InventoryManagerTab 
                options={options}
                onUpdateOptions={handleUpdateOptions}
                language={language}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Save Prompt Modal Overlay */}
      <AnimatePresence id="modal-presence">
        {saveModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#000000]/85 backdrop-blur-sm" id="save-modal-overlay">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md bg-[#0c0c0e] border border-white/10 rounded-sm p-5 sm:p-6 shadow-2xl relative"
              id="save-modal-container"
            >
              <h3 className="text-sm font-sans font-bold uppercase tracking-widest text-white mb-2" id="save-modal-title">
                {isDE ? "In Favoriten archivieren" : "Secure configurations"}
              </h3>
              <p className="text-xs text-zinc-400 mb-4 font-sans" id="save-modal-desc">
                {isDE 
                  ? "Vergib einen passenden Namen, um die Kamera-Einstellungen und das Filmkorn-Profil später mit einem Klick laden zu können."
                  : "Preserve the active analog formulas under a custom catalog identifier for streamlined future reuse."}
              </p>

              <div className="space-y-4" id="save-modal-body">
                <div id="modal-title-input-wrap">
                  <label className="block text-[10px] font-mono uppercase text-zinc-500 tracking-widest mb-1.5" id="modal-input-lbl">
                    {isDE ? "Bezeichnung des Motivs" : "Blueprint Formula Title"}
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={40}
                    placeholder={isDE ? "z.B. Marokkanische Dynastie 1920er" : "e.g. Vintage Riviera Sunset"}
                    value={customTitle}
                    onChange={(e) => setCustomTitle(e.target.value)}
                    className="w-full bg-[#050505] border border-white/10 rounded-sm px-4 py-2.5 text-zinc-200 text-xs focus:border-white/30 focus:outline-none placeholder-zinc-700 font-mono"
                    id="modal-title-input"
                  />
                </div>

                <div id="modal-category-input-wrap">
                  <label className="block text-[10px] font-mono uppercase text-zinc-500 tracking-widest mb-1.5" id="modal-category-lbl">
                    {isDE ? "Fotografie-Stil / Kategorie" : "Photography Style / Category"}
                  </label>
                  <select
                    value={saveCategory}
                    onChange={(e) => setSaveCategory(e.target.value)}
                    className="w-full bg-[#050505] border border-white/10 rounded-sm px-3 py-2.5 text-zinc-200 text-xs focus:border-white/30 focus:outline-none font-mono"
                    id="modal-category-input"
                  >
                    <option value="Schwarz-Weiß">{isDE ? "Schwarz-Weiß" : "Black & White (B&W)"}</option>
                    <option value="Vintage">Vintage</option>
                    <option value="Lomografie">Lomografie</option>
                    <option value="Porträt analog">Porträt analog</option>
                    <option value="Landschaft analog">Landschaft analog</option>
                  </select>
                </div>

                <div id="modal-tags-input-wrap">
                  <label className="block text-[10px] font-mono uppercase text-zinc-500 tracking-widest mb-1.5" id="modal-tags-lbl">
                    {isDE ? "Kreative Filter-Tags (Kommagetrennt)" : "Creative Filter Tags (Comma-separated)"}
                  </label>
                  <input
                    type="text"
                    placeholder={isDE ? "z.B. Kornstruktur, Lichtlecks, Leica, Kodak" : "e.g. grain, light leaks, Leica, Kodak"}
                    value={saveTagsString}
                    onChange={(e) => setSaveTagsString(e.target.value)}
                    className="w-full bg-[#050505] border border-white/10 rounded-sm px-4 py-2.5 text-zinc-200 text-xs focus:border-white/30 focus:outline-none placeholder-zinc-700 font-mono"
                    id="modal-tags-input"
                  />
                  <p className="text-[9px] text-zinc-500 mt-1 font-mono">
                    {isDE 
                      ? "Tipp: Nutze 'Kornstruktur', 'Lichtlecks', 'Analog', 'Großformat', etc."
                      : "Tip: Use tags for granular organization like 'grain', 'light leaks', 'Leica'."}
                  </p>
                </div>

                <div className="flex gap-3 pt-2" id="modal-actions-wrap">
                  <button
                    onClick={() => {
                      setSaveModalOpen(false);
                      setCustomTitle("");
                      setSaveTagsString("");
                    }}
                    className="flex-1 border border-white/10 hover:border-white/20 hover:bg-zinc-900/40 text-zinc-400 hover:text-zinc-300 text-xs font-semibold py-3 rounded-sm transition cursor-pointer"
                    id="modal-cancel-btn"
                  >
                    {isDE ? "Abbrechen" : "Cancel"}
                  </button>
                  <button
                    onClick={handleSavePromptToArchiv}
                    disabled={!customTitle.trim()}
                    className="flex-1 bg-white hover:bg-zinc-200 text-black text-xs font-bold py-3 rounded-sm transition disabled:opacity-30 disabled:hover:bg-white cursor-pointer"
                    id="modal-submit-btn"
                  >
                    {isDE ? "Sichern" : "Preserve"}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Tactile footer lines */}
      <footer className="border-t border-white/10 bg-[#050505] py-6 mt-16 text-center text-xs text-zinc-500 font-mono" id="app-footer">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4" id="footer-container">
          <p id="footer-copyright" className="tracking-wide">
            © 2026 SILVER & GRAPHITE. {isDE ? "Alle Rechte vorbehalten. Fotografisches Labor-Verfahren." : "All rights reserved. Professional Emulsion Matrix."}
          </p>
          <div className="flex items-center gap-4 text-[10px] tracking-widest" id="footer-links">
            <span id="footer-link-1">MIDJOURNEY</span>
            <span id="footer-link-2">FLUX.1</span>
            <span id="footer-link-3">SDXL EMULATION</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
