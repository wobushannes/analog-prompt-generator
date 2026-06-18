export interface SavedPrompt {
  id: string;
  title: string;
  createdAt: string;
  germanPrompt: string;
  englishPrompt: string;
  negativePrompt: string;
  settings: Record<string, string>;
  includes: Record<string, boolean>;
  category?: string; // e.g. "Schwarz-Weiß", "Vintage", "Lomografie", "Porträt analog", "Landschaft analog"
  tags?: string[];   // user custom tags e.g. "Kornstruktur", "Lichtlecks"
}

export interface PresetRecipe {
  title: string;
  description: string;
  icon: string;
  settings: Record<string, string>;
  includes: Record<string, boolean>;
}
