import { SavedPrompt, PresetRecipe } from "../types";
import { Copy, Trash2, Check, RefreshCw, Bookmark, Sparkles, Plus, X, Search, ChevronDown, Calendar, ArrowDownAZ } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { translationsData } from "../data";

interface LibraryTabProps {
  savedPrompts: SavedPrompt[];
  onLoadPrompt: (prompt: SavedPrompt) => void;
  onDeletePrompt: (id: string) => void;
  onLoadPreset: (preset: PresetRecipe) => void;
  language: "Deutsch" | "English";
  onUpdatePrompt?: (prompt: SavedPrompt) => void;
  onAddPrompt?: (prompt: SavedPrompt) => void;
}

export const presetRecipes: PresetRecipe[] = [
  {
    title: "The Leibovitz Cinematic",
    description: "Reiche Texturen, tiefe Schatten, herrschaftlicher Marokkanischer Kaftan, fotografiert im warmen Licht mit Hasselblad 503CW und Kodak Portra 160.",
    icon: "📷",
    includes: {
      type: true,
      success: true,
      nationality: true,
      role: true,
      age: true,
      camera_type: true,
      camera: true,
      lens: true,
      film: true,
      film_detail: true,
      quality: true,
      traits: true,
      details: true,
      style: true,
      clothing: true,
      cultural: true,
      time_period: true,
      pose: true,
      lighting: true,
      background: true,
      props: true,
      ambiance: true,
      weather: false,
      emotion: true,
      post_processing: true,
      effect: true,
    },
    settings: {
      location: "Studio / Innenaufnahme",
      type: "C41 (Farbe) / C41 (Color)",
      success: "legendär / legendary",
      nationality: "Moroccan",
      role: "Visionär / visionary",
      gender: "Männlich",
      age_range: "reif (40er), erfahren und weise / mature (40s), seasoned and wise",
      camera_type: "Mittelformat / Medium Format",
      camera: "Hasselblad 503CW",
      lens: "Mamiya Sekor C 80mm f/2.8, mittelformatige Fülle und Klarheit / Mamiya Sekor C 80mm f/2.8, medium-format richness and clarity",
      film: "Kodak Portra 160, zarte Pastelltöne mit feinem Korn / Kodak Portra 160, delicate pastels with fine grain",
      film_detail: "mit feinem Korn und gestochen scharfem Detail / with fine grain and crisp detail",
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
      emotion: "ein ruhiger Blick voller innerer Stärke / a calm gaze full of inner strength",
      post_processing_choice: "Ja",
      post_processing: "Selen-Tonung, reiche Purpurtöne und verbesserte Tiefe / selenium toning, rich purples and enhanced depth",
      effect: "Respekt einflößend, beeindruckende Präsenz, Autorität einfangend / commanding respect, impressive presence, capturing authority",
      negative_prompt: "blurry, low quality, distorted, plastic skin, 3d render"
    }
  },
  {
    title: "Peter Lindbergh Monochrom",
    description: "Raue Authentizität, stark kontrastreiches Schwarz-Weiß-Film-Portrait (Kodak Tri-X) auf einer Leica M6 mit einem Summicron Objektiv.",
    icon: "🎞️",
    includes: {
      type: true,
      success: false,
      nationality: false,
      role: true,
      age: true,
      camera_type: true,
      camera: true,
      lens: true,
      film: true,
      film_detail: true,
      quality: true,
      traits: true,
      details: true,
      style: true,
      clothing: true,
      cultural: false,
      time_period: false,
      pose: true,
      lighting: true,
      background: true,
      props: false,
      ambiance: true,
      weather: false,
      emotion: true,
      post_processing: true,
      effect: true,
    },
    settings: {
      location: "Studio / Innenaufnahme",
      type: "Schwarz-Weiß / Black-and-White",
      success: "visionär / visionary",
      nationality: "German",
      role: "Künstler / artist",
      gender: "Weiblich",
      age_range: "jung (20er), energisch und neugierig / young (20s), energetic and curious",
      camera_type: "Kleinbild / 35mm",
      camera: "Leica M6",
      lens: "Leica APO-Summicron-M 50mm f/2 ASPH, gestochen scharf mit cremigem Bokeh / Leica APO-Summicron-M 50mm f2 ASPH, razor-sharp with creamy bokeh",
      film: "Kodak Tri-X 400, kontrastreiches Schwarz-Weiß / Kodak Tri-X 400, high-contrast black-and-white",
      film_detail: "mit starkem Korn für eine raue Textur / with heavy grain for a gritty texture",
      quality: "Galerie: Ausstellungsqualität, hohe Auflösung, Premiumpapier / Galerie: exhibition-grade, high-resolution, premium paper",
      traits: "kreativer Geist, leidenschaftlich und unkonventionell, grenzenlos neugierig / creative spirit, passionate and unconventional, endlessly curious",
      details: "durchdringende blaue Augen mit komplexen Iris-Mustern, sonnengeküsste Haut mit leichten Sommersprossen, zerzaustes kastanienbraunes Haar mit goldenen Highlights, hochdetailliert / piercing blue eyes with intricate iris patterns, sun-kissed skin with faint freckles, tousled chestnut hair with golden highlights, highly detailed",
      style: "Peter Lindbergh: roh, emotional, zeitlos / Peter Lindbergh: raw, emotional, timeless",
      clothing: "schwarzer Blazer über weißem T-Shirt / black blazer over a white t-shirt",
      cultural_element: "keine / none",
      time_period: "Moderne / Modern",
      pose: "sitzend mit leichter Neigung, entspannt doch gefasst / seated with a slight lean, relaxed yet poised",
      lighting: "kontrastreich mit harten Schatten, die Tiefe geben / high-contrast with dark shadows giving depth",
      background: "einfache strukturierte Wand / simple textured wall",
      prop: "mit einer klassischen Kamera in den Händen / holding a vintage rangefinder camera",
      ambiance: "an einem nebligen Morgen in einem Loft-Fenster / in a misty loft window",
      weather: "bedeckter Wintertag mit kühlem Ton / overcast winter day with a cool cast",
      emotion: "ein nachdenklicher Blick in die Ferne / a pensive gaze into the distance",
      post_processing_choice: "Ja",
      post_processing: "Silbergelatine-Druck-Simulation mit feiner Gradierung / silver gelatin print simulation with fine gradation",
      effect: "Ausdrucksstark, unverfälschte Natürlichkeit / expressive, unfiltered organic realism",
      negative_prompt: "makeup, bright colors, saturated, neon, abstract art, flawless skin, polished"
    }
  },
  {
    title: "Yousuf Karsh Monumental",
    description: "Klassisches, hochgradig skulpturales Vintage-Dia-Portrait, reich an Charaktertiefe vor dunklem Samt-Hintergrund.",
    icon: "🕯️",
    includes: {
      type: true,
      success: true,
      nationality: true,
      role: true,
      age: true,
      camera_type: true,
      camera: true,
      lens: true,
      film: true,
      film_detail: true,
      quality: true,
      traits: true,
      details: true,
      style: true,
      clothing: true,
      cultural: true,
      time_period: true,
      pose: true,
      lighting: true,
      background: true,
      props: true,
      ambiance: true,
      weather: false,
      emotion: true,
      post_processing: true,
      effect: true,
    },
    settings: {
      location: "Studio / Innenaufnahme",
      type: "E6 (Dias) / E6 (Slides)",
      success: "herausragend / outstanding",
      nationality: "French",
      role: "Künstler / artist",
      gender: "Weiblich",
      age_range: "mittelalt (30er), zielstrebig und selbstbewusst / middle-aged (30s), driven and confident",
      camera_type: "Großformat / Large Format",
      camera: "Linhof Master Technika Classic",
      lens: "Rodenstock Apo-Sironar-S 150mm f/5.6, großformatige chirurgische Detailtreue / Rodenstock Apo-Sironar-S 150mm f5.6, large-format surgical detail",
      film: "Kodak Ektachrome E100, lebendig und klar mit gestochen scharfem Detail / Kodak Ektachrome E100, vibrant and crisp with razor-sharp detail",
      film_detail: "mit hohem Kontrast und dramatischer Tiefe / with high contrast and dramatic depth",
      quality: "Master: Meisterwerk-Qualität, perfekte Ausführung / Master: masterpiece quality, perfect execution",
      traits: "charismatischer Redner, inspirierend und überzeugend, voller Energie / charismatic speaker, inspiring and persuasive, full of energy",
      details: "tiefe braune Augen mit warmem Glanz, olivfarbene Haut mit feinen Linien, glattes schwarzes Haar mit seidigem Schimmer, markante Gesichtszüge / deep brown eyes with a warm glow, olive skin with fine lines, sleek black hair with a silky sheen, striking features",
      style: "Yousuf Karsh: monumental, charakterstark / Yousuf Karsh: monumental, character-driven",
      clothing: "fließendes Abendkleid in Rubinrot mit Perlen / flowing ruby red evening gown with pearls",
      cultural_element: "chinesisches Qipao mit Drachenmotiv / Chinese qipao with dragon motif",
      time_period: "1930er Art Deco, glamourös und geometrisch / 1930s Art Deco, glamorous and geometric",
      pose: "sitzend mit leichter Neigung, entspannt doch gefasst / seated with a slight lean, relaxed yet poised",
      lighting: "dramatisch aber subtil mit klarem Lichtrand, der Entschlossenheit betont / dramatic yet subtle with a clear light edge emphasizing determination",
      background: "dunkler samtiger Vorhang mit reicher Textur / dark velvety curtain with rich texture",
      prop: "vor einem Spiegel mit goldenem Rahmen / in front of a mirror with a golden frame",
      ambiance: "bei Kerzenschein mit warmer Intimität / by candlelight with warm intimacy",
      weather: "unter bewölktem Himmel with sanftem Licht / under a cloudy sky with gentle light",
      emotion: "ein stolzes Grinsen mit siegreicher Zuversicht / a proud grin with victorious confidence",
      post_processing_choice: "Ja",
      post_processing: "Platin-Tonung, luxuriöse Tiefe und Schärfe / platinum toning, luxurious depth and sharpness",
      effect: "subtile Eleganz, raffinierte Klarheit / subtle elegance, refined clarity",
      negative_prompt: "modern, casual clothing, bad lighting, grainy raw, noise, cell phone picture"
    }
  },
  {
    title: "Richard Avedon Starkness",
    description: "Starkes, emotional tiefgehendes Schwarz-Weiß-Portrait vor weißem Studio-Hintergrund, inspiriert von Richard Avedon. Sensationelle Bildtiefe mit Deardorff Großformat.",
    icon: "🦓",
    includes: {
      type: true, success: true, nationality: false, role: true, age: true,
      camera_type: true, camera: true, lens: true, film: true, film_detail: true,
      quality: true, traits: true, details: true, style: true, clothing: true,
      cultural: false, time_period: false, pose: true, lighting: true,
      background: true, props: false, ambiance: true, weather: false,
      emotion: true, post_processing: true, effect: true
    },
    settings: {
      location: "Studio / Innenaufnahme",
      type: "Schwarz-Weiß / Black-and-White",
      success: "kultig / iconic",
      nationality: "American",
      role: "Denker / thinker",
      gender: "Männlich / Male",
      age_range: "reif (50er) / mature (50s)",
      camera_type: "Großformat / Large Format",
      camera: "Deardorff 8x10, Hölzerner Kunstabzugsklassiker / Deardorff 8x10 wooden grand format view camera",
      lens: "Rodenstock Apo-Sironar-S 150mm f/5.6, großformatige chirurgische Detailtreue / Rodenstock Apo-Sironar-S 150mm f5.6, large-format surgical detail",
      film: "Kodak Tri-X 400, kontrastreiches Schwarz-Weiß / Kodak Tri-X 400, high-contrast black-and-white",
      film_detail: "mit ultrafeinem Silberhalogenid-Lichtspiel / with ultrafine silver halide play of light",
      quality: "Museum: Archivqualität, feinste Details, Platin-Palladium-Druck / Museum: archival quality, finest detail, platinum-palladium print",
      traits: "introvertierter Beobachter, intensive Präsenz mit innerem Feuer / introverted observer, intense presence with inner fire",
      details: "tiefe, sprechende Augenfalten, markante graue Schläfen / deep expressive eye lines, striking gray temples",
      style: "Richard Avedon: minimalistisch, charakterfokussiert / Richard Avedon: minimalist, character-focused",
      clothing: "schlichter schwarzer Rollkragenpullover / simple black turtleneck sweater",
      cultural_element: "keine / none",
      time_period: "Moderne / Modern",
      pose: "direkt in die Linse starrend / staring directly into the lens",
      lighting: "schattenfreies, weiches Frontallicht vor hellem Grund / shadowless, soft frontal wrap light against bright background",
      background: "unberührtes, weiches Studio-Weiß / solid seamless studio white backdrop",
      prop: "keine / none",
      ambiance: "im minimalistischen Studio mit absolutem Fokus / in a minimalist studio with absolute focus",
      weather: "Studio-Licht / Studio lighting",
      emotion: "ein durchdringender, schonungslos ehrlicher Blick / a piercing, relentlessly honest look",
      post_processing_choice: "Ja",
      post_processing: "Platin-Palladium-Druck für maximale Graustufen / platinum-palladium print for unmatched grayscale gradation",
      effect: "Ausdrucksstark, unverfälschte Natürlichkeit / expressive, unfiltered organic realism",
      negative_prompt: "colorful, glowing, soft focus, vignette, shadows, stylized vector, 3d render"
    }
  },
  {
    title: "Vivian Maier Candid Street",
    description: "Straßen-Snapshot im Chicago der 1950er Jahre. Niedriger Blickwinkel einer Rolleiflex TLR, lebendig und historisch intim.",
    icon: "🏙️",
    includes: {
      type: true, success: false, nationality: false, role: true, age: true,
      camera_type: true, camera: true, lens: true, film: true, film_detail: true,
      quality: true, traits: true, details: true, style: true, clothing: true,
      cultural: false, time_period: true, pose: true, lighting: true,
      background: true, props: true, ambiance: true, weather: false,
      emotion: true, post_processing: true, effect: true
    },
    settings: {
      location: "Ausrüstung im Freien / Outdoor gear",
      type: "Schwarz-Weiß / Black-and-White",
      success: "unentdeckt / undiscovered",
      nationality: "American",
      role: "Passant / passerby",
      gender: "Weiblich / Female",
      age_range: "jung (30er) / young (30s)",
      camera_type: "Mittelformat / Medium Format",
      camera: "Rolleiflex 2.8F TLR, Zweiäugige Klassiker / Rolleiflex 2.8F Twin-Lens Reflex camera with Planar lens",
      lens: "Zeiss Planar 80mm f/2.8, legendäre Schärfe / Zeiss Planar 80mm f2.8, legendary sharpness",
      film: "Ilford HP5 Plus, klassische Körnigkeit / Ilford HP5 Plus, classic organic grain",
      film_detail: "mit rauem Straßenkorn und reichen Mitteltönen / with gritty street grain and rich midtones",
      quality: "Archiv: Vintage-Silbergelatineabzug auf Doppelgewicht / Archival: vintage silver gelatin double-weight print",
      traits: "fleißiger Arbeiter, nachdenklich, unbemerkt im Moment / diligent worker, reflective, unnoticed in the moment",
      details: "dezentes Sonnenlicht auf den Wangen, leicht windgepeitschtes Haar / subtle sunlight grazing cheeks, slightly windblown hair",
      style: "Vivian Maier: heimlich, aufmerksam, intim / Vivian Maier: candid, observant, intimate",
      clothing: "grober Wollmantel mit großen Knöpfen / heavy wool overcoat with large buttons",
      cultural_element: "keine / none",
      time_period: "1950er Jahre Nachkriegszeit / 1950s post-war era",
      pose: "im Vorübergehen flüchtig eingefangen / captured fleetly during a brief stride",
      lighting: "natürliches, kontrastreiches Sonnenlicht mit Schattenwurf der Straßenschlucht / natural high-contrast sunlight with street canyon shadows",
      background: "belebte Straßenszene im Chicagoer Distrikt / bustly street scene in downtown Chicago",
      prop: "mit einer Zeitung unter dem Arm / clutching a vintage newspaper under the arm",
      ambiance: "beim Überqueren einer dampfenden Straße / when crossing a steaming street grate",
      weather: "klarer, kühler Herbstnachmittag / crisp, cool autumn afternoon",
      emotion: "ein wehmütiger Blick voller flüchtiger Poesie / a wistful gaze full of fleeting poetry",
      post_processing_choice: "Ja",
      post_processing: "Manuelle Dunkelkammer-Gelatine-Entwicklung / manual darkroom gelatin silver processing",
      effect: "Historische Tiefe, raue Authentizität / historical depth, raw authenticity",
      negative_prompt: "modern, smartphone, high saturation, studio lights, flawless digital rendering"
    }
  },
  {
    title: "Steve McCurry National Geographic",
    description: "Tiefgründiges Portrait mit warmem Licht und unvergesslich leuchtenden Augen auf legendärem Kodachrome 64 Diafilm.",
    icon: "👁️",
    includes: {
      type: true, success: true, nationality: true, role: true, age: true,
      camera_type: true, camera: true, lens: true, film: true, film_detail: true,
      quality: true, traits: true, details: true, style: true, clothing: true,
      cultural: true, time_period: false, pose: true, lighting: true,
      background: true, props: false, ambiance: true, weather: true,
      emotion: true, post_processing: true, effect: true
    },
    settings: {
      location: "Ausrüstung im Freien / Outdoor gear",
      type: "E6 (Dias) / E6 (Slides)",
      success: "weltweit gefeiert / globally acclaimed",
      nationality: "Afghan / Pashtun",
      role: "Wanderer / nomad",
      gender: "Weiblich / Female",
      age_range: "Teenager (15 Jahre alt) / teenager (15 years old)",
      camera_type: "Kleinbild / 35mm",
      camera: "Nikon F3 HP, Profi-Spiegelreflex / Nikon F3 HP high-eyepoint 35mm SLR camera",
      lens: "Nikkor 105mm f/2.5 AI-S, klassisches Portraitobjektiv / Nikkor 105mm f2.5 AI-S, legendary portrait lens",
      film: "Kodak Kodachrome 64, satte Farben und tiefe Rottöne / Kodak Kodachrome 64, rich saturated colors and deep red tones",
      film_detail: "mit dem typisch warmen Schmelz und Farbtiefe der K64 / with the signature warm melt and high color depth of K64",
      quality: "Master: Meisterwerk-Qualität, perfekte Ausführung / Master: masterpiece quality, perfect execution",
      traits: "stolz, kühn, mit unbändigem Lebenswillen / proud, bold, with resilient inner strength",
      details: "leuchtend grüne Augen voller Intensität, wettergegerbte sanfte Haut / piercing green eyes full of intensity, weather-softened skin",
      style: "Steve McCurry: farbintensiv, tiefgründig und erzählend / Steve McCurry: high color saturation, deep storytelling and emotional impact",
      clothing: "traditioneller, rissiger roter Schal locker um den Kopf / traditional worn red shawl draped loosely around head",
      cultural_element: "paschtunische Stickereien / Pashtun style textiles",
      time_period: "Moderne / Modern",
      pose: "aufrecht den Betrachter fixierend / head-on pose staring with utter intensity",
      lighting: "weiches, diffuses Seitenlicht aus einer Zeltöffnung / soft, diffused side light from a tent opening",
      background: "erdiger, verschwommener Lehmwand-Hintergrund in Ocker / earthy, soft-focus ocher mud-wall background",
      prop: "keine / none",
      ambiance: "in einem geflüchteten Lager unter staubigen Bedingungen / inside a dusty refugee camp setting",
      weather: "trocken, heiß und staubig mit warmem Schleier / dry, hot and dusty with a warm atmospheric veil",
      emotion: "ein Blick, der die Seele berührt / an unforgettable soul-piercing gaze",
      post_processing_choice: "Ja",
      post_processing: "K-14 Entwicklungsprozess für Kodachrome / dye-transfer-like K-14 development process",
      effect: "subtile Eleganz, raffinierte Klarheit / subtle elegance, refined clarity",
      negative_prompt: "monochrome, pale skin, white teeth, makeup, studio softbox, flashes, flat digital look"
    }
  },
  {
    title: "Helmut Newton High-Gloss Noir",
    description: "Sinnliche, kopfbetonende Modeästhetik mit harten Ringblitz-Schatten vor luxuriöser urbaner Kulisse.",
    icon: "🕶️",
    includes: {
      type: true, success: true, nationality: false, role: true, age: true,
      camera_type: true, camera: true, lens: true, film: true, film_detail: true,
      quality: true, traits: true, details: true, style: true, clothing: true,
      cultural: false, time_period: true, pose: true, lighting: true,
      background: true, props: true, ambiance: true, weather: false,
      emotion: true, post_processing: true, effect: true
    },
    settings: {
      location: "Studio / Innenaufnahme",
      type: "C41 (Farbe) / C41 (Color)",
      success: "ikonisch mondän / iconically sophisticated",
      nationality: "German",
      role: "Modeschöpfer / fashion designer",
      gender: "Weiblich / Female",
      age_range: "jung (20er), energisch und neugierig / young (20s), energetic and curious",
      camera_type: "Mittelformat / Medium Format",
      camera: "Hasselblad 500C/M, Modulare 6x6-Spiegelreflex / Hasselblad 500C/M modular 6x6 medium format SLR camera",
      lens: "Carl Zeiss Planar 80mm f/2.8, T*-Beschichtung / Carl Zeiss Planar 80mm f2.8 T* lens",
      film: "Fujichrome Provia 100F, kühle elegante Farben / Fujichrome Provia 100F, cool elegant blues and high saturation",
      film_detail: "mit scharfem Kontrast und kaltem Schimmer / with sharp high-contrast glossy look",
      quality: "Galerie: Ausstellungsqualität, hohe Auflösung, Premiumpapier / Galerie: exhibition-grade, high-resolution, premium paper",
      traits: "unabhängig, geheimnisvoll, dominant und unnahbar / independent, mysterious, dominant and aloof",
      details: "stark akzentuierte Wangenknochen, dunkles glattes Haar im Wet-Look / starkly defined cheekbones, dark slicked-back wet-look hair",
      style: "Helmut Newton: provokant, kontrastreich, mondän-erotisch / Helmut Newton: provocative, contrasty, high-fashion noir and power play",
      clothing: "maßgeschneiderter, tief ausgeschnittener schwarzer Smoking / custom-tailored sharp black smoking jacket",
      cultural_element: "keine / none",
      time_period: "1970er Jahre Jetset-Ära / 1970s jetset disco-glam era",
      pose: "selbstbewusst stehend mit stolzer, herrscherhafter Körperhaltung / standing tall with a commanding, authoritative posture",
      lighting: "hartes, direktes Ringblitz-Licht mit ausgeprägtem, schwarzem Haloschatten an der Wand / hard direct camera flash with heavy dark drop-shadow halo",
      background: "Luxus-Appartement in Monaco mit Blick auf das nächtliche Meer / luxury penthouse balcony overlooking Monaco at night",
      prop: "mit einer eleganten Zigarettenspitze / holding a slender black cigarette holder",
      ambiance: "kühl und glamourös im hellen Mondlicht / cool and glamorous under bright moonlight",
      weather: "klare, milde Nacht / clear, mild coastal night",
      emotion: "ein kühler, herausfordernder Blick / a cold, challenging look",
      post_processing_choice: "Ja",
      post_processing: "Cibachrome-Abzug für extreme Farbsättigung / Cibachrome printing process for rich glossy contrast",
      effect: "beeindruckende Präsenz, Autorität / commanding respect, impressive presence",
      negative_prompt: "soft light, warm yellow tones, casual style, family picture, vintage yellowing"
    }
  },
  {
    title: "Henri Cartier-Bresson Decisive",
    description: "Flüchtiger, gestalterisch scharf eingefangener Moment im urbanen Paris. Pure Leica-Spontaneität.",
    icon: "🏃",
    includes: {
      type: true, success: false, nationality: false, role: true, age: true,
      camera_type: true, camera: true, lens: true, film: true, film_detail: true,
      quality: true, traits: true, details: true, style: true, clothing: true,
      cultural: false, time_period: true, pose: true, lighting: true,
      background: true, props: false, ambiance: true, weather: true,
      emotion: true, post_processing: true, effect: true
    },
    settings: {
      location: "Ausrüstung im Freien / Outdoor gear",
      type: "Schwarz-Weiß / Black-and-White",
      success: "historisch / historical",
      nationality: "French",
      role: "Künstler / artist",
      gender: "Männlich / Male",
      age_range: "jung (20er), energisch und neugierig / young (20s), energetic and curious",
      camera_type: "Kleinbild / 35mm",
      camera: "Leica M3, Reiner Messsucher / Leica M3 legendary mechanical rangefinder camera",
      lens: "Leica APO-Summicron-M 50mm f/2 ASPH, gestochen scharf mit cremigem Bokeh / Leica APO-Summicron-M 50mm f2 ASPH, razor-sharp with creamy bokeh",
      film: "Kodak Tri-X 400, kontrastreiches Schwarz-Weiß / Kodak Tri-X 400, high-contrast black-and-white",
      film_detail: "mit sanftem historischem Korn und ausgeprägten Grauwerten / with soft vintage grain and rich scale of grays",
      quality: "Archiv: Vintage-Silbergelatineabzug auf Doppelgewicht / Archival: vintage silver gelatin double-weight print",
      traits: "kreativer Geist, leidenschaftlich und unkonventionell, grenzenlos neugierig / creative spirit, passionate and unconventional, endlessly curious",
      details: "windzerzauste Frisur, flüchtiges Lächeln mitten im Sprung / wind-tousled hair, fleeting smile mid-movement",
      style: "Henri Cartier-Bresson: perfekt komponierter Schnappschuss / Henri Cartier-Bresson: decisive moment",
      clothing: "klassischer wehender Trenchcoat und dunkler Hut / classic floating trench coat and fedora",
      cultural_element: "keine / none",
      time_period: "1940er Jahre Vorkriegszeit / 1940s classic European era",
      pose: "mitten in einer eleganten Gehbewegung eingefangen / captured frozen in the middle of a dynamic stride",
      lighting: "weiches Tageslicht mit wunderschön abgestuften Grauwerten / soft overcast daylight with exquisite silver luminance",
      background: "eine mit Kopfsteinpflaster gepflasterte Straße in Paris mit leichtem Wasserfilm / cobblestone Paris street shiny with a thin layer of puddle water",
      prop: "keine / none",
      ambiance: "beim eleganten Überspringen einer Pfütze / jumping across a large water puddle",
      weather: "bedeckter, regnerischer Nieselwetter-Tag / overcast, misty drizzling day",
      emotion: "fröhliche Unbeschwertheit und Tatkraft / joyful weightlessness and spontaneous energy",
      post_processing_choice: "Ja",
      post_processing: "Kontrollierte Büttenpapier-Barytentwicklung / fine-art fiber baryta paper development in custom chemistry",
      effect: "Unbeschwerte Lebendigkeit, spontaner Geist / carefree liveliness, capturing the spontaneous human spirit",
      negative_prompt: "posed studio image, heavy flash, highly saturated, post 2000s tech"
    }
  },
  {
    title: "Ansel Adams Zone System",
    description: "Monumentale Naturfotografie nach dem berühmten Zone-System für unübertroffenen Tonwertumfang und plastische Schärfe.",
    icon: "⛰️",
    includes: {
      type: true, success: true, nationality: false, role: true, age: false,
      camera_type: true, camera: true, lens: true, film: true, film_detail: true,
      quality: true, traits: false, details: false, style: true, clothing: false,
      cultural: false, time_period: false, pose: false, lighting: true,
      background: true, props: false, ambiance: true, weather: true,
      emotion: false, post_processing: true, effect: true
    },
    settings: {
      location: "Ausrüstung im Freien / Outdoor gear",
      type: "Schwarz-Weiß / Black-and-White",
      success: "erhaben monumental / sublimely monumental",
      nationality: "American",
      role: "Naturforscher / naturalist",
      gender: "Diverse / Non-binary",
      age_range: "keine / none",
      camera_type: "Großformat / Large Format",
      camera: "Sinar P2 8x10, Präzisions-Fachkamera / Sinar P2 studio technical 8x10 monorail camera",
      lens: "Rodenstock Apo-Sironar-S 150mm f/5.6, großformatige chirurgische Detailtreue / Rodenstock Apo-Sironar-S 150mm f5.6, large-format surgical detail",
      film: "Fujifilm Neopan 100 Acros, extrem feines Korn / Fujifilm Neopan 100 Acros, exceptionally fine grain and high reciprocity",
      film_detail: "mit unfassbar reicher Tonalität in Zone I bis Zone X / with unbelievable dynamic tonal scope from Zone I to Zone X",
      quality: "Museum: Archivqualität, feinste Details, Platin-Palladium-Druck / Museum: archival quality, finest detail, platinum-palladium print",
      traits: "geduldig, andächtig, ehrfürchtig die Natur betrachtend / patient, silent, observing nature with reverent awe",
      details: "keine / none",
      style: "Ansel Adams: majestätisches Licht, maximale Tonwertkontrolle / Ansel Adams: zone system landscape",
      clothing: "Robuste Wanderkleidung / sturdy hiking garments",
      cultural_element: "keine / none",
      time_period: "Moderne / Modern",
      pose: "nach vorne blickend / front looking",
      lighting: "spektakuläres Gegenlicht mit leuchtenden Wolkenrändern und tiefen Tälern / spectacular low sun backlighting with glowing rim rays on cliffs",
      background: "majestätische Klippen des Yosemite-Valley mit schneebedeckten Gipfeln / epic, sweeping Yosemite Valley granite cliffs and majestic snowy peaks",
      prop: "keine / none",
      ambiance: "beim spektakulären Durchbruch der Abendsonne nach einem Sturm / when evening sun breaks through massive heavy storm clouds",
      weather: "abziehendes Gewitter mit dramatischen Wolkenschluchten / clearing thunderstorm with towering rainclouds and shafts of light",
      emotion: "ehrfürchtiges, andächtiges Staunen / sublime and reverent silence",
      post_processing_choice: "Ja",
      post_processing: "Manuelle Gradations-Filterung in Pyrocat-HD / meticulous Pyrocat-HD tanning developer processing",
      effect: "Respekt einflößend, beeindruckende Präsenz / commanding respect, impressive majestic presence",
      negative_prompt: "soft gray flat histogram, blurry edges, street scenes, urban, people, color photography"
    }
  },
  {
    title: "Irving Penn Sculptural Gray",
    description: "Moderne, bildhauerische Schlichtheit vor neutralem Vorhang-Eck. Aufgenommen mit Hasselblad für absolute Modegravur.",
    icon: "📐",
    includes: {
      type: true, success: true, nationality: false, role: true, age: true,
      camera_type: true, camera: true, lens: true, film: true, film_detail: true,
      quality: true, traits: true, details: true, style: true, clothing: true,
      cultural: true, time_period: false, pose: true, lighting: true,
      background: true, props: true, ambiance: true, weather: false,
      emotion: true, post_processing: true, effect: true
    },
    settings: {
      location: "Studio / Innenaufnahme",
      type: "Schwarz-Weiß / Black-and-White",
      success: "visionär / visionary",
      nationality: "British",
      role: "Visionär / visionary",
      gender: "Weiblich / Female",
      age_range: "jung (20er), energisch und neugierig / young (20s), energetic and curious",
      camera_type: "Mittelformat / Medium Format",
      camera: "Hasselblad 500C/M, Modulare 6x6-Spiegelreflex / Hasselblad 500C/M modular 6x6 medium format SLR camera",
      lens: "Carl Zeiss Planar 120mm f/4 Macro, unbarmherzige Schärfe / Carl Zeiss Planar 120mm f4 Macro, razor-sharp detail rendering",
      film: "Kodak Plus-X 125, feines Korn und exzellente Lichter / Kodak Plus-X 125, fine-grain panchromatic film with brilliant highlights",
      film_detail: "mit sanftem Übergang in den Schatten und skulpturaler Bildtiefe / with sculptural depth, smooth roll-off into velvet dark shadows",
      quality: "Museum: Archivqualität, feinste Details, Platin-Palladium-Druck / Museum: archival quality, finest detail, platinum-palladium print",
      traits: "stiller Fokus, erhabene Würde, unerschütterliche Haltung / quiet focus, majestic poise, unyielding elegance",
      details: "feine Wimpernzeichnung, zarte kühle Lippenkontur / exceptionally defined eyelashes, delicate cool lips outline",
      style: "Irving Penn: grafisch, minimalistisch, skulpturale Ecke / Irving Penn",
      clothing: "klassischer Tweed-Mantel mit markanten Schultern / classic structured gray tweed coat with bold shoulder pads",
      cultural_element: "keine / none",
      time_period: "1940er Jahre Bauhaus-Stilelemente / 1940s Bauhaus chic style",
      pose: "schräg gelehnt in einer engen Studioecke / leaning elegantly within a narrow, converging angle of V-flat boards",
      lighting: "großes, weiches Nordlicht-Fenster von der Seite / massive, soft north-light window illumination from side",
      background: "neutraler, fleckiger grauer Segeltuch-Hintergrund / simple hand-painted gray mottly canvas background",
      prop: "mit einer einzelnen verwelkten Wildrose / holding a single, delicate withered red rose",
      ambiance: "im kühlen, stillen Tageslichtstudio / inside a quiet, cold natural daylight studio",
      weather: "Studio-Licht / Studio lighting",
      emotion: "kontemplative Stille und tiefe Klarheit / contemplative silence and deep clarity",
      post_processing_choice: "Ja",
      post_processing: "Mehrfach schichtiger Platin-Abzug / multi-layered platinum-palladium emulsion on heavy art paper",
      effect: "subtile Eleganz, raffinierte Klarheit / subtle elegance, refined sculptural clarity",
      negative_prompt: "action, modern street look, neon lights, cluttered background, vibrant colors"
    }
  },
  {
    title: "Sally Mann Gothic Wet Plate",
    description: "Geheimnisvolles Porträt im nassen Kollodion-Verfahren. Unvollkommener Silberglanz und weiche Traumnuancen.",
    icon: "🏺",
    includes: {
      type: true, success: false, nationality: false, role: true, age: true,
      camera_type: true, camera: true, lens: true, film: true, film_detail: true,
      quality: true, traits: true, details: true, style: true, clothing: true,
      cultural: false, time_period: true, pose: true, lighting: true,
      background: true, props: false, ambiance: true, weather: true,
      emotion: true, post_processing: true, effect: true
    },
    settings: {
      location: "Ausrüstung im Freien / Outdoor gear",
      type: "Schwarz-Weiß / Black-and-White",
      success: "melancholisch / melancholic",
      nationality: "American",
      role: "Künstler / artist",
      gender: "Weiblich / Female",
      age_range: "Kindheit / childhood",
      camera_type: "Großformat / Large Format",
      camera: "Graflex Speed Graphic 4x5, Historische Presse-Legende / Graflex Speed Graphic 4x5 vintage press focal-plane camera",
      lens: "Dallmeyer 3B Petzval, historischer Schärfenabfall / Dallmeyer 3B Petzval antique lens with heavy swirl bokeh",
      film: "Unbeschichtete Glasplatte (Kollodion) / Wet plate collodion glass plate negative",
      film_detail: "mit chemischen Flecken, Randverdunkelung und Silbereffekten / with authentic chemical flowmarks, dark vignetting and silver-mirroring",
      quality: "Archiv: Handgemachte Glasplatten-Restoration / Archival: handmade wet plate collodion tintype replication",
      traits: "verträumt, wild und frei, naturverbunden / dreamy, wild and free, deeply connected to woods",
      details: "leicht schmutzige Wangen, weiche blonde Strähnen vor den Augen / sun-dappled skin, soft wispy blonde hair across eyes",
      style: "Sally Mann: düsterer Südstaaten-Gothic-Stil, geheimnisvoll / Sally Mann",
      clothing: "schlichter Leinenhemd, leicht zerrissen / simple raw linen tunic, slightly frayed",
      cultural_element: "keine / none",
      time_period: "Frühes 20. Jahrhundert / Early 20th century",
      pose: "nachdenklich an einen uralten Baum gelehnt / leaning pensively against a mossy old oak tree",
      lighting: "gesprenkeltes Wald-Sonnenlicht, das durch Blätter bricht / dappled wild forest sunlight filtering down through dense leaves",
      background: "überwucherter, üppiger Urwald mit wilden Farnen / overgrown, lush deep-woods riverbank with wild mossy flora",
      prop: "keine / none",
      ambiance: "an einem schwülen Sommertag am Flussufer / on a hot, humid summer afternoon by the riverbank",
      weather: "schwül-heiß mit tief liegendem Dunst / humid and warm with low-lying riverside mist",
      emotion: "ein tiefer, weiser Blick jenseits des Alters / a deep, haunting gaze wise beyond years",
      post_processing_choice: "Ja",
      post_processing: "Direkte Silbernitrat-Fixierung auf geschwärztem Eisen / custom silver-nitrate bath development on black glass",
      effect: "Ausdrucksstark, unverfälschte Natürlichkeit / expressive, unfiltered organic realism with haunting weight",
      negative_prompt: "modern digital camera sharp, color, modern clothing, sunglasses, smiling family snap"
    }
  },
  {
    title: "Robert Capa Gritty Reportage",
    description: "Zeitdokument voller Dynamik und Körnigkeit. Nah am Geschehen auf historischem 35mm-Film.",
    icon: "🎖️",
    includes: {
      type: true, success: false, nationality: false, role: true, age: true,
      camera_type: true, camera: true, lens: true, film: true, film_detail: true,
      quality: true, traits: true, details: true, style: true, clothing: true,
      cultural: false, time_period: true, pose: true, lighting: true,
      background: true, props: true, ambiance: true, weather: true,
      emotion: true, post_processing: true, effect: true
    },
    settings: {
      location: "Ausrüstung im Freien / Outdoor gear",
      type: "Schwarz-Weiß / Black-and-White",
      success: "legendär / legendary",
      nationality: "Spanish",
      role: "Widerstandskämpfer / revolutionary",
      gender: "Männlich / Male",
      age_range: "jung (20er), energisch und neugierig / young (20s), energetic and curious",
      camera_type: "Kleinbild / 35mm",
      camera: "Nikon FM2n, Mechanisches Arbeitstier / Nikon FM2n advanced mechanical shutter SLR camera",
      lens: "Nikkor 105mm f/2.5 AI-S, klassisches Portraitobjektiv / Nikkor 105mm f2.5 AI-S, legendary portrait lens",
      film: "Kodak Tri-X 400, kontrastreiches Schwarz-Weiß / Kodak Tri-X 400, high-contrast black-and-white",
      film_detail: "mit grobem Silberkorn und leichten Bewegungsunschärfen / with heavy cinematic grain and subtle kinetic motion-blur edge",
      quality: "Archiv: Vintage-Silbergelatineabzug auf Doppelgewicht / Archival: historical agency wirephoto gelatin silver print",
      traits: "mutig bis zum Äußersten, konzentriert mit intensivem Atem / brave to the absolute core, intense raw focus during action",
      details: "Staubspritzer auf der Haut, verschwitztes zerzaustes Haar / dirt splatters on cheek, sweat-sheened tousled hair",
      style: "Robert Capa: mitten im Gefecht, erschütternd ehrlich / Robert Capa",
      clothing: "grobe Feldjacke aus schwerer Baumwolle / heavy duty canvas army utility jacket",
      cultural_element: "keine / none",
      time_period: "1940er Spanischer Bürgerkrieg / 1940s epic historical battle era",
      pose: "nach vorn eilend, geduckt über nasses Erdreich / crouching low while dynamic moving across muddy ground",
      lighting: "hartes, dramatisches Mittagslicht unter rauchigem Himmel / harsh overcast midday light under a smoke-filled sky",
      background: "Trümmer und verbrannte Festungsmauern / ruins and shattered masonry layout in background",
      prop: "mit einem historischen Fernglas in den Händen / clutching vintage brass binoculars",
      ambiance: "mitten im dichten Schlachtennebel / inside the heavy fog of historical campaign field",
      weather: "bedeckter Tag mit aschgrauem Wind und Funkenflug / overcast sky with ash-laden wind and smoke embers",
      emotion: "pure Entschlossenheit inmitten des Chaos / raw adrenaline and resolute bravery in chaos",
      post_processing_choice: "Ja",
      post_processing: "Eilig gepresster dpa-Drahtfotodruck / press wirephoto zinc developer bath style",
      effect: "Historische Tiefe, raue Authentizität / historical narrative, raw unedited photojournalism",
      negative_prompt: "clean studio portrait, soft warm light, beauty retouch, smiling look, neon, flawless skin"
    }
  },
  {
    title: "Andy Warhol Polaroid SX-70",
    description: "Kultiges 1970er Jahre Pop-Style Portrait auf analogem Sofortbildpapier mit warmen Vintage-Farbverschiebungen.",
    icon: "🍭",
    includes: {
      type: true, success: true, nationality: false, role: true, age: true,
      camera_type: true, camera: true, lens: true, film: true, film_detail: true,
      quality: true, traits: true, details: true, style: true, clothing: true,
      cultural: false, time_period: true, pose: true, lighting: true,
      background: true, props: true, ambiance: true, weather: false,
      emotion: true, post_processing: true, effect: true
    },
    settings: {
      location: "Studio / Innenaufnahme",
      type: "C41 (Farbe) / C41 (Color)",
      success: "schillernd / flamboyant",
      nationality: "American",
      role: "Künstler / artist",
      gender: "Diverse / Non-binary",
      age_range: "jung (20er), energisch und neugierig / young (20s), energetic and curious",
      camera_type: "Mittelformat / Medium Format",
      camera: "Yashica Mat 124G, Zweiäugige Legende / Yashica Mat 124G twin-lens reflex medium format TLR camera",
      lens: "Zeiss Planar 80mm f/2.8, legendäre Schärfe / Zeiss Planar 80mm f2.8, legendary sharpness",
      film: "Polaroid SX-70 Time-Zero, Sofortbildeffekt / Polaroid SX-70 Time-Zero classic vintage instant film",
      film_detail: "mit warmem Orangestich, verwaschenen Rändern und mattem, weichem Kontrast / with warm orange hue cast, chemical border artifacts and buttery soft contrasts",
      quality: "Archiv: Vintage-Silbergelatineabzug auf Doppelgewicht / Archival: original vintage polaroid print copy preservation",
      traits: "exzentrisch, gelangweilt-cool, kunstbegeistert / eccentrically bored, effortlessly cool, patron of the arts",
      details: "blass geschminkte Lippen, platinblonde Perücke, herabgesetzter Blick / pale silver lipstick, iconic platinum-blonde wig, downwards eye gaze",
      style: "Andy Warhol: Factory Pop-Art, Polaroid-Ästhetik / Andy Warhol",
      clothing: "schwarzer Lederblazer mit breitem Revers / fitted black leather jacket with wide 1970s lapels",
      cultural_element: "keine / none",
      time_period: "1970er Jahre New Yorker Factory / 1970s New York Factory scene",
      pose: "nachlässig den Kopf auf die Hand gestützt / resting jaw lazily on hand in a casual pose",
      lighting: "grelle frontal-harte Blitzbelichtung der SX-70 / harsh direct-in-your-face built-in flash of Polaroid camera",
      background: "minimalistischer, hellblauer Studio-Farbkarton / simple flat sky blue paper backdrop",
      prop: "mit einer klassischen Suppendose im Vordergrund / clutching an iconic vintage soup can in foreground",
      ambiance: "im belebten Studio der New Yorker Factory / inside the crowded Silver Factory loft apartment",
      weather: "Studio-Licht / Studio lighting",
      emotion: "ausdruckslose, gelangweilte Extravaganz / blank, detached nonchalance and passive cool",
      post_processing_choice: "Ja",
      post_processing: "Nostalgischer Polaroid-Entwicklerprozess / vintage chemical color-dye migration action",
      effect: "unverfälschte Natürlichkeit, Vintage-Gefühl / nostalgic vintage appeal, signature pop portraiture touch",
      negative_prompt: "monochrome black and white, dramatic god rays, razor sharp details, modern outdoor view, 3d render"
    }
  }
];

// Helper to pull Multilingual texts from "Deutsch / English" format
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

// Highly precise local prompt compile engine to render newly generated variations instantly
function compileVariationPrompt(settings: Record<string, string>, includes: Record<string, boolean>, lang: "Deutsch" | "English"): string {
  const isDE = lang === "Deutsch";
  const isOutdoor = (settings.location || "").toLowerCase().includes("outdoor") || (settings.location || "").toLowerCase().includes("außen");
  const isBW = (settings.type || "").toLowerCase().includes("weiß") || (settings.type || "").toLowerCase().includes("white") || (settings.type || "").toLowerCase().includes("monochrom");

  let prefixKey = "prompt_prefix_color";
  if (isOutdoor) {
    prefixKey = isBW ? "prompt_prefix_outdoor_bw" : "prompt_prefix_outdoor_color";
  } else {
    prefixKey = isBW ? "prompt_prefix_bw" : "prompt_prefix_color";
  }
  const prefix = translationsData[lang][prefixKey as keyof typeof translationsData["Deutsch"]] || "Portrait";

  const parts: string[] = [];
  parts.push(getLangText(settings.gender || "Männlich / Male", lang));

  if (includes.success && settings.success) {
    parts.push(getLangText(settings.success, lang));
  }
  if (includes.nationality && settings.nationality) {
    parts.push(getLangText(settings.nationality, lang));
  }
  if (includes.role && settings.role) {
    parts.push(getLangText(settings.role, lang));
  }

  let base = prefix;
  if (parts.length > 0) {
    const joinedParts = parts.join(" ");
    const ofPhrase = translationsData[lang]["prompt_of"] || "of a";
    base = `${prefix} ${ofPhrase} ${joinedParts}`;
  }

  const detailList: string[] = [];
  if (includes.age && settings.age_range) {
    detailList.push(getLangText(settings.age_range, lang));
  }
  if (includes.traits && settings.traits) {
    detailList.push(getLangText(settings.traits, lang));
  }
  if (includes.details && settings.details) {
    detailList.push(getLangText(settings.details, lang));
  }
  if (includes.pose && settings.pose) {
    detailList.push(getLangText(settings.pose, lang));
  }

  if (detailList.length > 0) {
    base += `, ${detailList.join(", ")}`;
  }

  const techList: string[] = [];
  if (includes.camera && settings.camera) {
    techList.push(getLangText(settings.camera, lang));
  }
  if (includes.lens && settings.lens) {
    techList.push(getLangText(settings.lens, lang));
  }

  if (techList.length > 0) {
    const capturedWithLabel = translationsData[lang]["prompt_captured_with"] || "captured with";
    base += `, ${capturedWithLabel} ${techList.join(" ")}`;
  }

  if (includes.film && settings.film) {
    const onLabel = translationsData[lang]["prompt_on"] || "on";
    base += ` ${onLabel} ${getLangText(settings.film, lang)}`;
  }

  if (includes.film_detail && settings.film_detail) {
    base += `, ${getLangText(settings.film_detail, lang)}`;
  }

  if (includes.quality && settings.quality) {
    base += `, ${getLangText(settings.quality, lang)}`;
  }

  if (includes.style && settings.style) {
    const styleLabel = translationsData[lang]["prompt_style"] || "Style:";
    base += `. ${styleLabel} ${getLangText(settings.style, lang)}`;
  }

  const apparel: string[] = [];
  if (includes.clothing && settings.clothing) {
    apparel.push(getLangText(settings.clothing, lang));
  }
  if (includes.cultural && settings.cultural_element) {
    apparel.push(getLangText(settings.cultural_element, lang));
  }

  if (apparel.length > 0) {
    const andLabel = translationsData[lang]["prompt_and"] || "and";
    const wearingLabel = translationsData[lang]["prompt_wearing"] || "wearing";
    base += `. ${wearingLabel} ${apparel.join(` ${andLabel} `)}`;
  }

  if (includes.time_period && settings.time_period) {
    const inLabel = translationsData[lang]["prompt_in"] || "in";
    base += `, ${inLabel} ${getLangText(settings.time_period, lang)}`;
  }

  if (includes.lighting && settings.lighting) {
    base += `, ${getLangText(settings.lighting, lang)}`;
  }

  if (includes.background && settings.background) {
    const bgLabel = translationsData[lang]["prompt_background"] || "Background:";
    base += `. ${bgLabel} ${getLangText(settings.background, lang)}`;
  }

  if (includes.props && settings.prop) {
    const propLabel = translationsData[lang]["prompt_prop"] || "Prop:";
    base += `. ${propLabel} ${getLangText(settings.prop, lang)}`;
  }

  if (includes.ambiance && settings.ambiance) {
    const ambLabel = translationsData[lang]["prompt_ambiance"] || "Ambiance:";
    base += `. ${ambLabel} ${getLangText(settings.ambiance, lang)}`;
  }

  if (isOutdoor && includes.weather && settings.weather) {
    base += `. ${getLangText(settings.weather, lang)}`;
  }

  if (includes.emotion && settings.emotion) {
    const exprLabel = translationsData[lang]["prompt_expression"] || "Expression:";
    base += `. ${exprLabel} ${getLangText(settings.emotion, lang)}`;
  }

  const postProcApply = settings.post_processing_choice === "yes" || settings.post_processing_choice === "Ja" || settings.post_processing_choice === "yes / yes";
  if (includes.post_processing && postProcApply && settings.post_processing) {
    const processedLabel = translationsData[lang]["prompt_post_processed"] || "post-processed with";
    base += `. ${processedLabel} ${getLangText(settings.post_processing, lang)}`;
  }

  if (includes.effect && settings.effect) {
    const effLabel = translationsData[lang]["prompt_effect"] || "Overall effect:";
    base += `. ${effLabel} ${getLangText(settings.effect, lang)}`;
  }

  return base;
}

// Sophisticated custom local synonym swapper to enrich generated output variations
function replaceSynonymsInText(text: string): string {
  if (!text) return text;
  
  const isSlash = text.includes(" / ");
  const parts = isSlash ? text.split(" / ") : [text];
  
  const deSynonyms: Record<string, string> = {
    "visionärer Anführer": "resoluter Kameramann-Pionier mit stoischem Blick",
    "kreativer Geist": "avantgardistischer Rebell mit poetischem Temperament",
    "ruhiger Denker": "versunkener Intellektueller voller tiefer Gedankengänge",
    "sanfter Träumer": "sensibler Ästhet mit einem melancholischen Glanz",
    "charismatischer Redner": "charismatischer Schauspieler mit fesselnder Präsenz",
    "durchdringende blaue Augen": "saphirblaue, glasklare Augen voller kühnem Fokus",
    "tiefe braune Augen": "warme bernsteinfarbene, reiche Augen mit Bernstein-Glanz",
    "smaragdgrüne Augen": "jade-grüne Augen wie geschliffene Edelsteine",
    "haselnussbraune Augen": "rehbraune, geheimnisvolle Augen voll tiefer Wärme",
    "schwarzer Blazer": "klassische, weiche schwarze Tweed-Jacke",
    "fließendes Abendkleid": "maßgeschneiderter, seidenartiger Satin-Umhang",
    "dreiteiliger Anthrazit-Anzug": "feiner, zweireihiger Wollmantel im Vintage-Schnitt"
  };

  const enSynonyms: Record<string, string> = {
    "visionary leader": "resolute cinematic pioneer with a stoic look",
    "creative spirit": "avant-garde rebel with poetic temperament",
    "quiet thinker": "absorbed intellectual full of deep contemplation",
    "gentle dreamer": "sensitive aesthetician with a melancholic sheen",
    "charismatic speaker": "charismatic protagonist with captivating presence",
    "piercing blue eyes": "sapphire blue, crystal clear eyes full of bold focus",
    "deep brown eyes": "warm amber, rich eyes with golden-flecked detail",
    "emerald green eyes": "jade-green eyes like polished gemstones",
    "hazel eyes": "doe-eyed, mysterious deep hazel pools",
    "black blazer": "classic soft black charcoal tweed jacket",
    "flowing ruby red evening gown": "tailored silk satin draped cape",
    "three-piece charcoal suit": "fine wool double-breasted vintage overcoat"
  };

  let deResult = parts[0];
  let enResult = parts.length > 1 ? parts[1] : parts[0];

  for (const [key, replacement] of Object.entries(deSynonyms)) {
    if (parts[0].toLowerCase().includes(key.toLowerCase())) {
      const reg = new RegExp(key, "gi");
      deResult = deResult.replace(reg, replacement);
    }
  }

  for (const [key, replacement] of Object.entries(enSynonyms)) {
    if (enResult.toLowerCase().includes(key.toLowerCase())) {
      const reg = new RegExp(key, "gi");
      enResult = enResult.replace(reg, replacement);
    }
  }

  return isSlash ? `${deResult} / ${enResult}` : enResult;
}

// High Fidelity exposure settings formulas
const VARIATION_FORMULAS = [
  {
    key: "monochrome_grit",
    themeNameDE: "Monochromes Filmkorn (Hinterhof-Brutalismus)",
    themeNameEN: "Retro Monochromatic Grit",
    descriptionDE: "Raue Schwarz-Weiß-Ästhetik der 80er im High-Key-Drahtgitter-Look.",
    descriptionEN: "High-contrast granular B&W film simulation optimized for hard side-shadowing.",
    category: "Schwarz-Weiß",
    tags: ["Schwarz-Weiß", "Retro", "Brutalismus", "Kodak Tri-X"],
    modifier: (s: Record<string, string>, inc: Record<string, boolean>) => {
      s.type = "Schwarz-Weiß / Black-and-White";
      s.camera_type = "Kleinbild / 35mm";
      s.camera = "Leica M6";
      s.lens = "Leica APO-Summicron-M 50mm f/2 ASPH, gestochen scharf mit cremigem Bokeh / Leica APO-Summicron-M 50mm f2 ASPH, razor-sharp with creamy bokeh";
      s.film = "Kodak Tri-X 400, kontrastreiches Schwarz-Weiß / Kodak Tri-X 400, high-contrast black-and-white";
      s.film_detail = "mit starkem Korn für eine raue Textur / with heavy grain for a gritty texture";
      s.lighting = "hartes direktes Licht mit starken Kontraste / harsh direct light with bold contrasts";
      s.style = "Peter Lindbergh: roh, emotional, zeitlos / Peter Lindbergh: raw, emotional, timeless";
      s.post_processing = "Schwarz-Weiß-Konvertierung, hoher Kontrast und Klarheit / black-and-white conversion, high contrast and clarity";
      
      inc.type = true;
      inc.camera = true;
      inc.lens = true;
      inc.film = true;
      inc.film_detail = true;
      inc.lighting = true;
      inc.style = true;
      inc.post_processing = true;
    }
  },
  {
    key: "vintage_polaroid",
    themeNameDE: "Verblichenes SX-70 Polaroid (Nostalgie-Schimmer)",
    themeNameEN: "Faded SX-70 Polaroid Patina",
    descriptionDE: "Sofortbild-Patina mit weichem Abbildungscharakter und warmen Farblecks.",
    descriptionEN: "Tender, faded retro instant print textures with vintage light leaks.",
    category: "Vintage",
    tags: ["Vintage", "Polaroid", "Lichtlecks", "Warme Töne"],
    modifier: (s: Record<string, string>, inc: Record<string, boolean>) => {
      s.type = "Polaroid / Polaroid";
      s.camera_type = "Polaroid";
      s.camera = "Polaroid SX-70";
      s.lens = "Polaroid SX-70 integrierte Linse, weicher Fokus mit Vintage-Charme / Polaroid SX-70 integrated lens, soft focus with vintage charm";
      s.film = "Polaroid Originals SX-70 Film, sanfter Fokus mit cremigen Tönen / Polaroid Originals SX-70 Film, soft focus with creamy tones";
      s.film_detail = "mit warmen Tönen für nostalgische Stimmung / with warm tones for nostalgic mood";
      s.lighting = "goldenes Stundenlicht mit warmem Glanz / golden hour light with a warm glow";
      s.style = "Vivian Maier: intim, alltägliche Poesie / Vivian Maier: intimate, everyday poetry";
      s.post_processing = "Sepia-Tonung, warme Brauntöne mit nostalgischem Flair / sepia toning, warm browns with nostalgic flair";
      s.quality = "Vintage: Retro-Qualität, authentische Patina / Vintage: retro quality, authentic patina";
      
      inc.type = true;
      inc.camera = true;
      inc.lens = true;
      inc.film = true;
      inc.film_detail = true;
      inc.lighting = true;
      inc.style = true;
      inc.post_processing = true;
      inc.quality = true;
    }
  },
  {
    key: "lomo_saturated",
    themeNameDE: "Analoge Lomografie (Sättigungs-Verzerrung)",
    themeNameEN: "Saturated Lomography Shift",
    descriptionDE: "Dramatisch bunte Farbstiche mit starker Vignette im Plastik-Retro-Look.",
    descriptionEN: "High-saturation cross-processed slide film visual signatures.",
    category: "Lomografie",
    tags: ["Lomografie", "Sättigung", "Cross-Prozess", "Farbstich"],
    modifier: (s: Record<string, string>, inc: Record<string, boolean>) => {
      s.type = "Experimental / Experimental";
      s.camera_type = "Spielzeugkameras / Toy Cameras";
      s.camera = "Lomo LC-A+";
      s.lens = "Holga Pinhole Lens, weich und experimentell / Holga Pinhole Lens, soft and experimental";
      s.film = "Lomography Color Negative 400, kreative Farbverschiebungen / Lomography Color Negative 400, creative color shifts";
      s.film_detail = "mit unvorhersehbaren Effekten für Experimente / with unpredictable effects for experiments";
      s.lighting = "hartes direktes Licht mit starken Kontraste / harsh direct light with bold contrasts";
      s.post_processing = "Cross-Prozess-Entwicklung, extreme Farbverschiebungen / cross-process developing, extreme color shifts";
      s.style = "Nan Goldin: intim, rohe Emotionen / Nan Goldin: intimate, raw emotions";
      s.quality = "Experimental: Unkonventionelle Qualität, kreative Artefakte / Experimental: unconventional quality, creative artifacts";

      inc.type = true;
      inc.camera = true;
      inc.lens = true;
      inc.film = true;
      inc.film_detail = true;
      inc.lighting = true;
      inc.post_processing = true;
      inc.style = true;
      inc.quality = true;
    }
  },
  {
    key: "medium_format_studio",
    themeNameDE: "Mittelformat-Atelier (Leibovitz-Kompensation)",
    themeNameEN: "Archival Medium Format Elegance",
    descriptionDE: "Luxuriöse Hauttöne und plastische Details des klassischen Studio-Porträts.",
    descriptionEN: "Delicate pastels and clinical detail on legendary 6x7 medium format camera.",
    category: "Porträt analog",
    tags: ["Mittelformat", "Atelier", "Porträt", "Cremiges Bokeh"],
    modifier: (s: Record<string, string>, inc: Record<string, boolean>) => {
      s.type = "C41 (Farbe) / C41 (Color)";
      s.camera_type = "Mittelformat / Medium Format";
      s.camera = "Hasselblad 503CW";
      s.lens = "Mamiya Sekor C 80mm f/2.8, mittelformatige Fülle und Klarheit / Mamiya Sekor C 80mm f/2.8, medium-format richness and clarity";
      s.film = "Kodak Portra 160, zarte Pastelltöne mit feinem Korn / Kodak Portra 160, delicate pastels with fine grain";
      s.film_detail = "mit feinem Korn und gestochen scharfem Detail / with fine grain and crisp detail";
      s.lighting = "dramatisch aber subtil mit klarem Lichtrand, der Entschlossenheit betont / dramatic yet subtle with a clear light edge emphasizing determination";
      s.style = "Annie Leibovitz: reiche Texturen, filmische Tiefe / Annie Leibovitz: rich textures, cinematic depth";
      s.post_processing = "Platin-Tonung, luxuriöse Tiefe und Schärfe / platinum toning, luxurious depth and sharpness";
      s.quality = "Museum: Archivqualität, feinste Details, Platin-Palladium-Druck / Museum: archival quality, finest detail, platinum-palladium print";

      inc.type = true;
      inc.camera = true;
      inc.lens = true;
      inc.film = true;
      inc.film_detail = true;
      inc.lighting = true;
      inc.style = true;
      inc.post_processing = true;
      inc.quality = true;
    }
  },
  {
    key: "landscape_velvia",
    themeNameDE: "Epic Wide Velvia (Outdoor-Erhabenheit)",
    themeNameEN: "Epic Wide Velvia Splendor",
    descriptionDE: "Extremer Reichtum an Farben und Kontrasten der Natur vor Panoramakulisse.",
    descriptionEN: "Oversaturated colors and surgical focus on historical wide-field slide film.",
    category: "Landschaft analog",
    tags: ["Großformat", "Landschaft", "Fujifilm Velvia", "Natur-Schimmer"],
    modifier: (s: Record<string, string>, inc: Record<string, boolean>) => {
      s.location = "Außenaufnahme / Outdoor";
      s.type = "E6 (Dias) / E6 (Slides)";
      s.camera_type = "Großformat / Large Format";
      s.camera = "Linhof Master Technika Classic";
      s.lens = "Rodenstock Apo-Sironar-S 150mm f/5.6, großformatige chirurgische Detailtreue / Rodenstock Apo-Sironar-S 150mm f5.6, large-format surgical detail";
      s.film = "Fujifilm Velvia 50, übersättigte Farben für Landschaften / Fujifilm Velvia 50, oversaturated colors for landscapes";
      s.film_detail = "mit hohem Kontrast und dramatischer Tiefe / with high contrast and dramatic depth";
      s.lighting = "goldenes Stundenlicht mit warmem Glanz / golden hour light with a warm glow";
      s.background = "sanfter Strand mit Wellen im Hintergrund / gentle beach with waves in the background";
      s.style = "Ansel Adams: episch, dramatische Landschaften / Ansel Adams: epic, dramatic landscapes";
      s.quality = "Fine Art: Künstlerische Qualität, subtile Nuancen / Fine Art: artistic quality, subtle nuances";

      inc.type = true;
      inc.camera = true;
      inc.lens = true;
      inc.film = true;
      inc.film_detail = true;
      inc.lighting = true;
      inc.background = true;
      inc.style = true;
      inc.quality = true;
    }
  },
  {
    key: "cinematic_tungsten",
    themeNameDE: "Cinematic Cinestill (Halation-Effekt)",
    themeNameEN: "Cinematic Tungsten Neon Night",
    descriptionDE: "Filmische Lichttöne der Filmgeschichte dank Tungsten-Balance für Nachtlichter.",
    descriptionEN: "Cyberpunk halations and cooling tones on high-speed movie theater film.",
    category: "Porträt analog",
    tags: ["Cinestill 800T", "Kino-Schick", "Lichtlecks", "Nacht-Neon"],
    modifier: (s: Record<string, string>, inc: Record<string, boolean>) => {
      s.location = "Studio / Innenaufnahme";
      s.type = "C41 (Farbe) / C41 (Color)";
      s.camera_type = "Kleinbild / 35mm";
      s.camera = "Canon AE-1";
      s.lens = "Zeiss Planar T* 50mm f/1.4, klassische Schärfe und Kontrast / Zeiss Planar T* 50mm f1.4, classic sharpness and contrast";
      s.film = "Cinestill 800T, filmische Töne mit Tungsten-Balance / Cinestill 800T, cinematic tones with tungsten balance";
      s.film_detail = "mit warmen Tönen für nostalgische Stimmung / with warm tones for nostalgic mood";
      s.lighting = "dramatisch aber subtil mit klarem Lichtrand, der Entschlossenheit betont / dramatic yet subtle with a clear light edge emphasizing determination";
      s.background = "industrielle Ziegelwand mit roher Textur / industrial brick wall with raw texture";
      s.style = "Helmut Newton: provokativ, glamourös / Helmut Newton: provocative, glamorous";
      s.post_processing = "Selen-Tonung, reiche Purpurtöne und verbesserte Tiefe / selenium toning, rich purples and enhanced depth";

      inc.type = true;
      inc.camera = true;
      inc.lens = true;
      inc.film = true;
      inc.film_detail = true;
      inc.lighting = true;
      inc.background = true;
      inc.style = true;
      inc.post_processing = true;
    }
  }
];

const ANALOG_CATEGORIES = [
  "Alle",
  "Schwarz-Weiß",
  "Vintage",
  "Lomografie",
  "Porträt analog",
  "Landschaft analog"
];

export const LibraryTab = ({
  savedPrompts,
  onLoadPrompt,
  onDeletePrompt,
  onLoadPreset,
  language,
  onUpdatePrompt,
  onAddPrompt
}: LibraryTabProps) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Filtering list states
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Alle");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "title">("newest");

  // Inline Tag builder state per Saved Prompt Card
  const [newTagVal, setNewTagVal] = useState<string>("");
  const [activeTagInputId, setActiveTagInputId] = useState<string | null>(null);

  // Active variation generator prompt id
  const [activeVariationPromptId, setActiveVariationPromptId] = useState<string | null>(null);
  
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const isDE = language === "Deutsch";

  // Dynamic Tags gatherer
  const allUniqueTags = Array.from(
    new Set(
      savedPrompts.flatMap(p => p.tags || [])
    )
  ).sort();

  // Filter application
  const filteredPrompts = savedPrompts.filter((p) => {
    const promptCategory = p.category || "Porträt analog";

    const matchesSearch = searchQuery === "" || 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.englishPrompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.germanPrompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      promptCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.tags || []).some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === "Alle" || promptCategory === selectedCategory;

    const matchesTags = selectedTags.length === 0 || 
      selectedTags.every(t => (p.tags || []).includes(t));

    return matchesSearch && matchesCategory && matchesTags;
  });

  // Sort application
  const sortedPrompts = [...filteredPrompts].sort((a, b) => {
    if (sortBy === "title") {
      return a.title.localeCompare(b.title);
    }
    const timeA = parseInt(a.id) || 0;
    const timeB = parseInt(b.id) || 0;
    if (sortBy === "oldest") {
      return timeA - timeB;
    }
    return timeB - timeA;
  });

  // Toggle dynamic tag filter
  const handleToggleTagFilter = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  // Add individual tag onto a specific SavedPrompt Card
  const handleAddTagToPrompt = (p: SavedPrompt) => {
    if (!newTagVal.trim() || !onUpdatePrompt) return;
    const cleanTag = newTagVal.trim();
    const tags = p.tags || [];
    if (!tags.includes(cleanTag)) {
      onUpdatePrompt({
        ...p,
        tags: [...tags, cleanTag]
      });
    }
    setNewTagVal("");
    setActiveTagInputId(null);
  };

  // Remove individual tag from a specific SavedPrompt Card
  const handleRemoveTagFromPrompt = (p: SavedPrompt, tagToRemove: string) => {
    if (!onUpdatePrompt) return;
    onUpdatePrompt({
      ...p,
      tags: (p.tags || []).filter(t => t !== tagToRemove)
    });
  };

  // In-place category update on the SavedPrompt card
  const handleChangePromptCategory = (p: SavedPrompt, newCat: string) => {
    if (!onUpdatePrompt) return;
    onUpdatePrompt({
      ...p,
      category: newCat
    });
  };

  // Automated trigger to save variation directly to permanent catalog
  const handleSaveVariationToLibrary = (originalPrompt: SavedPrompt, formula: typeof VARIATION_FORMULAS[number], engPrompt: string, gerPrompt: string) => {
    if (!onAddPrompt) return;
    
    // Extrapolate modified config objects
    const s = { ...originalPrompt.settings };
    const inc = { ...originalPrompt.includes };
    if (s.traits) s.traits = replaceSynonymsInText(s.traits);
    if (s.details) s.details = replaceSynonymsInText(s.details);
    formula.modifier(s, inc);

    const variationTitle = isDE 
      ? `[Variante] ${originalPrompt.title} (${formula.themeNameDE})` 
      : `[Variation] ${originalPrompt.title} (${formula.themeNameEN})`;

    const newPrompt: SavedPrompt = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 4),
      title: variationTitle,
      createdAt: new Date().toLocaleDateString(language === "Deutsch" ? "de-DE" : "en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }),
      englishPrompt: engPrompt,
      germanPrompt: gerPrompt,
      negativePrompt: originalPrompt.negativePrompt,
      settings: s,
      includes: inc,
      category: formula.category,
      tags: [...(originalPrompt.tags || []), ...formula.tags].filter((val, i, array) => array.indexOf(val) === i)
    };

    onAddPrompt(newPrompt);
  };

  return (
    <div className="space-y-6 w-full" id="library-tab">
      {/* Absolute top full-width controls panel */}
      <div className="bg-[#0c0c0e] border border-white/10 rounded-sm p-6 shadow-2xl" id="library-top-controls-card">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5 pb-4 border-b border-white/10" id="library-top-controls-header">
          <div className="flex items-center gap-2.5">
            <Search className="w-5 h-5 text-white" />
            <h3 className="text-sm font-sans font-bold uppercase tracking-widest text-white">
              {isDE ? "Archiv-Filter und Suche" : "Archive Filters & Search"}
            </h3>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[10px] font-mono px-2.5 py-1 bg-zinc-950 border border-white/10 text-zinc-400 rounded-sm uppercase tracking-widest">
              {filteredPrompts.length} / {savedPrompts.length} {isDE ? "Einträge gefiltert" : "Blueprints matched"}
            </span>
            {(searchQuery || selectedCategory !== "Alle" || selectedTags.length > 0) && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("Alle");
                  setSelectedTags([]);
                }}
                className="px-2 py-1 text-[10px] bg-red-950/20 hover:bg-red-950/40 border border-red-500/20 text-red-400 font-mono uppercase tracking-wider rounded-sm transition cursor-pointer flex items-center gap-1.5"
              >
                <X className="w-3 h-3" />
                <span>{isDE ? "Zurücksetzen" : "Reset All"}</span>
              </button>
            )}
          </div>
        </div>

        {/* Triple controls grid: Search input, Category Select, Sort Select */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4" id="library-controls-grid">
          {/* 1. Free-Text Search Input */}
          <div className="md:col-span-6 space-y-1.5">
            <label className="block text-[10px] font-mono uppercase text-zinc-500 tracking-wider">
              {isDE ? "Suche nach Titeln, Kategorien, Tags..." : "Search by Title, Category, Tags or Text..."}
            </label>
            <div className="relative">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-zinc-600" />
              <input
                type="text"
                placeholder={isDE ? "Suche nach Titeln, Begriffen, Tags..." : "Search blueprints, film types, tags..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-950 border border-white/10 rounded-sm pl-10 pr-9 py-2.5 text-zinc-200 text-xs focus:border-white/30 focus:outline-none placeholder-zinc-700 font-mono"
                id="library-search-input"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-3 text-zinc-500 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* 2. Category Select Dropdown */}
          <div className="md:col-span-3 space-y-1.5">
            <label className="block text-[10px] font-mono uppercase text-zinc-500 tracking-wider">
              {isDE ? "Stil-Kategorie" : "Style Category"}
            </label>
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-zinc-950 border border-white/10 rounded-sm px-3.5 py-2.5 text-zinc-300 text-xs focus:border-white/30 focus:outline-none font-mono cursor-pointer appearance-none"
                id="library-category-dropdown"
              >
                {ANALOG_CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === "Alle" && isDE ? "Alle Stile" : cat === "Alle" ? "All Styles" : cat}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-3 top-3.5 text-zinc-500">
                <ChevronDown className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* 3. Sort Order Selector */}
          <div className="md:col-span-3 space-y-1.5">
            <label className="block text-[10px] font-mono uppercase text-zinc-500 tracking-wider">
              {isDE ? "Reihenfolge" : "Sort Order"}
            </label>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full bg-zinc-950 border border-white/10 rounded-sm px-3.5 py-2.5 text-zinc-300 text-xs focus:border-white/30 focus:outline-none font-mono cursor-pointer appearance-none"
                id="library-sort-dropdown"
              >
                <option value="newest">⏱️ {isDE ? "Neueste zuerst" : "Newest first"}</option>
                <option value="oldest">⏳ {isDE ? "Älteste zuerst" : "Oldest first"}</option>
                <option value="title">🔤 {isDE ? "Titel A-Z" : "Title A-Z"}</option>
              </select>
              <div className="pointer-events-none absolute right-3 top-3.5 text-zinc-500">
                <ChevronDown className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Category Filter Pill Buttons */}
        <div className="mt-4 pt-4 border-t border-white/5 flex flex-col gap-2">
          <span className="text-[9px] font-mono uppercase text-zinc-500 tracking-widest">
            {isDE ? "Kategorien-Schnellzugriff" : "Quick Category Selectors"}
          </span>
          <div className="flex flex-wrap gap-1.5" id="library-category-row">
            {ANALOG_CATEGORIES.map((cat) => {
              const count = cat === "Alle" 
                ? savedPrompts.length 
                : savedPrompts.filter(p => (p.category || "Porträt analog") === cat).length;
              const isActive = selectedCategory === cat;
              
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-sm border transition text-[11px] font-mono font-medium flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? "border-white bg-[#e0e0e0] text-black"
                      : "border-white/10 hover:border-white/20 bg-zinc-950 text-zinc-400 hover:text-white"
                  }`}
                  id={`cat-filter-btn-${cat.replace(/\s+/g, "-")}`}
                >
                  <span>{cat === "Alle" && isDE ? "Alle Stile" : cat === "Alle" ? "All Styles" : cat}</span>
                  <span className={`text-[9px] px-1 rounded-sm ${isActive ? "bg-black/10 text-black" : "bg-zinc-900 text-zinc-500"}`}>{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Tags Filter Pill Buttons */}
        {allUniqueTags.length > 0 && (
          <div className="mt-4 pt-4 border-t border-white/5 space-y-2">
            <span className="block text-[9px] font-mono uppercase text-zinc-500 tracking-widest">
              {isDE ? "Nach benutzerdefinierten Tags filtern" : "Filter by Custom Tags"}
            </span>
            <div className="flex flex-wrap gap-1" id="library-tags-filter-bar">
              {allUniqueTags.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                const tagCount = savedPrompts.filter(p => (p.tags || []).includes(tag)).length;
                return (
                  <button
                    key={tag}
                    onClick={() => handleToggleTagFilter(tag)}
                    className={`px-2 py-1 text-[10px] rounded-sm font-mono flex items-center gap-1 transition cursor-pointer border ${
                      isSelected
                        ? "border-amber-500/40 bg-amber-500/10 text-amber-300"
                        : "border-white/5 bg-zinc-950 text-zinc-500 hover:text-zinc-300 hover:border-white/10"
                    }`}
                    id={`tag-filter-${tag}`}
                  >
                    <span>#{tag}</span>
                    <span className="text-[9px] opacity-65">({tagCount})</span>
                  </button>
                );
              })}
              {selectedTags.length > 0 && (
                <button
                  onClick={() => setSelectedTags([])}
                  className="px-2 py-1 text-[9px] rounded-sm font-mono text-zinc-400 hover:text-white transition flex items-center gap-1"
                  id="clear-tags-filters-btn"
                >
                  <X className="w-3 h-3 text-red-500" />
                  <span>{isDE ? "Filter aufheben" : "Clear Tags"}</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Col 1: Preset Recipes (Masters) */}
        <div className="lg:col-span-4" id="master-presets-panel">
          <div className="bg-[#0c0c0e] border border-white/10 rounded-sm p-6 shadow-2xl" id="presets-card">
            <div className="flex items-center gap-2 mb-4" id="presets-header">
              <Sparkles className="w-5 h-5 text-white" id="preset-sparkles-icon" />
              <h3 className="text-sm font-sans font-bold uppercase tracking-widest text-white" id="preset-title">
                {isDE ? "Klassische Analog-Rezepte" : "Master Analog Presets"}
              </h3>
            </div>
            <p className="text-xs text-zinc-400 mb-6 font-sans leading-relaxed" id="preset-desc">
              {isDE 
                ? "Lade meisterhaft zusammengestellte Setups berühmter Stile direkt in das Studio, um mit dem Verfeinern zu beginnen."
                : "Directly load masterfully configured legacy configurations into the control cockpit to benchmark and refine your ideas."}
            </p>

            <div className="space-y-4" id="presets-list">
              {presetRecipes.map((preset, idx) => (
                <div 
                  key={idx} 
                  className="group border border-white/10 hover:border-white/30 bg-zinc-950/40 hover:bg-zinc-950 rounded-sm p-4 transition-all duration-300 cursor-pointer flex flex-col justify-between"
                  onClick={() => onLoadPreset(preset)}
                  id={`preset-item-${idx}`}
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1" id={`preset-head-${idx}`}>
                      <span className="text-xl" id={`preset-icon-${idx}`}>{preset.icon}</span>
                      <h4 className="font-bold text-xs text-zinc-200 uppercase tracking-wider group-hover:text-white transition-colors" id={`preset-name-${idx}`}>
                        {preset.title}
                      </h4>
                    </div>
                    <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed" id={`preset-summary-${idx}`}>
                      {preset.description}
                    </p>
                  </div>
                  <button
                    className="mt-3 text-left text-[10px] font-mono text-zinc-400 uppercase tracking-widest group-hover:text-white flex items-center gap-1.5"
                    id={`preset-load-btn-${idx}`}
                  >
                    <RefreshCw className="w-3 h-3 animate-none group-hover:rotate-45 transition-transform duration-300 text-zinc-500 group-hover:text-white" id={`preset-load-icon-${idx}`} />
                    {isDE ? "In Studio laden" : "Apply to Workspace"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Col 2: Saved Prompts */}
        <div className="lg:col-span-8 space-y-6" id="saved-prompts-panel">
          <div className="bg-[#0c0c0e] border border-white/10 rounded-sm p-6 shadow-2xl" id="saved-prompts-card">
            
            {/* Header Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 border-b border-white/10 pb-4" id="saved-header">
              <div className="flex items-center gap-2.5" id="saved-title-wrap">
                <Bookmark className="w-5 h-5 text-white" id="saved-bookmark-icon" />
                <h3 className="text-sm font-sans font-bold uppercase tracking-widest text-white" id="saved-title">
                  {isDE ? "Gespeicherte Favoriten" : "Personal Portrait Archiv"}
                </h3>
              </div>
              <span className="text-[10px] font-mono px-2.5 py-1 bg-[#050505] border border-white/10 text-zinc-400 rounded-sm uppercase tracking-widest self-start sm:self-auto" id="saved-count-badge">
                {filteredPrompts.length} / {savedPrompts.length} {isDE ? "Einträge" : "Einträge / Vaulted"}
              </span>
            </div>

          {/* Prompts Catalog Container */}
          <AnimatePresence id="saved-prompts-presence">
            {sortedPrompts.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 border border-dashed border-white/10 rounded-sm bg-[#050505]/40"
                id="empty-library-state"
              >
                <p className="text-zinc-500 text-xs mb-2 uppercase tracking-widest font-mono font-bold" id="empty-library-p1">
                  {isDE ? "Keine passenden Negative im Container." : "No blueprints match selection."}
                </p>
                <p className="text-xs text-zinc-600 max-w-sm mx-auto font-sans leading-relaxed" id="empty-library-p2">
                  {isDE 
                    ? "Passe Filterschalter oder Freitextsuche an, um archivierte Dunkelkammer-Profile anzuzeigen." 
                    : "Adjust your filter criteria or query string to search inside of the chemistry vaults."}
                </p>
              </motion.div>
            ) : (
              <div className="space-y-6 max-h-[1000px] overflow-y-auto pr-1" id="saved-prompts-scroller">
                {sortedPrompts.map((p) => {
                  const promptStyleCategory = p.category || "Porträt analog";
                  const variationOpen = activeVariationPromptId === p.id;
                  
                  return (
                    <motion.div 
                      key={p.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="border border-white/10 bg-zinc-950/45 rounded-sm p-4 sm:p-5 hover:border-white/20 transition-all duration-300 relative group"
                      id={`saved-item-${p.id}`}
                    >
                      {/* Top Row: Details & recall button */}
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4 pb-3 border-b border-white/5" id={`saved-item-header-${p.id}`}>
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="font-sans font-bold uppercase tracking-wider text-white text-sm" id={`saved-item-title-${p.id}`}>
                              {p.title}
                            </h4>

                            {/* Dynamic Category Pill (Editable in-place) */}
                            <div className="relative">
                              <select
                                value={promptStyleCategory}
                                onChange={(e) => handleChangePromptCategory(p, e.target.value)}
                                className="bg-[#050505] border border-amber-500/20 text-amber-400 hover:border-amber-500/40 text-[9px] font-mono uppercase px-1.5 py-0.5 rounded-sm focus:outline-none cursor-pointer appearance-none pr-5"
                                id={`card-cat-select-${p.id}`}
                              >
                                <option value="Schwarz-Weiß">🎞️ Schwarz-Weiß</option>
                                <option value="Vintage">📜 Vintage</option>
                                <option value="Lomografie">🌈 Lomografie</option>
                                <option value="Porträt analog">👤 Porträt analog</option>
                                <option value="Landschaft analog">🏞️ Landschaft</option>
                              </select>
                              <ChevronDown className="w-2.5 h-2.5 absolute right-1.5 top-1 pointer-events-none text-amber-500" />
                            </div>
                          </div>
                          
                          <span className="text-[10px] font-mono text-zinc-500 block mt-1 uppercase tracking-wider" id={`saved-item-date-${p.id}`}>
                            {p.createdAt}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2 self-end sm:self-start" id={`saved-item-actions-${p.id}`}>
                          {/* Variations generation trigger sparkles */}
                          <button
                            onClick={() => {
                              setActiveVariationPromptId(activeVariationPromptId === p.id ? null : p.id);
                            }}
                            className={`px-3 py-1.5 rounded-sm border text-[10px] font-mono uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-all duration-300 ${
                              variationOpen
                                ? "border-amber-500/40 bg-amber-500/10 text-amber-300"
                                : "border-white/10 hover:border-white/35 bg-[#050505] text-zinc-300 hover:text-white"
                            }`}
                            id={`saved-item-variations-btn-${p.id}`}
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>{isDE ? "Varianten" : "Variations"}</span>
                          </button>

                          <button
                            onClick={() => onLoadPrompt(p)}
                            className="px-3 py-1.5 rounded-sm border border-white/10 hover:border-white/35 bg-[#050505] text-zinc-300 hover:text-white transition duration-300 text-[10px] font-mono uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
                            title={isDE ? "In das Studio zurückladen" : "Restore to Studio Workspace"}
                            id={`saved-item-load-btn-${p.id}`}
                          >
                            <RefreshCw className="w-3.5 h-3.5 text-zinc-500" id={`saved-item-load-icon-${p.id}`} />
                            <span className="hidden md:inline">{isDE ? "Laden" : "Recall Gear"}</span>
                          </button>
                          
                          <button
                            onClick={() => onDeletePrompt(p.id)}
                            className="p-1.5 rounded-sm border border-white/10 hover:border-red-900/40 bg-zinc-950 hover:bg-neutral-900 text-zinc-500 hover:text-red-400 transition cursor-pointer"
                            title={isDE ? "Aus dem Archiv auflösen" : "Delete blueprint"}
                            id={`saved-item-trash-btn-${p.id}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" id={`saved-item-trash-icon-${p.id}`} />
                          </button>
                        </div>
                      </div>

                      {/* Prompts display grids */}
                      <div className="space-y-3" id={`saved-item-prompts-${p.id}`}>
                        {/* English Prompt */}
                        <div id={`saved-item-en-wrap-${p.id}`}>
                          <div className="flex items-center justify-between mb-1" id={`saved-item-en-header-${p.id}`}>
                            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold" id={`saved-item-en-badge-${p.id}`}>
                              {isDE ? "Midjourney / English Prompt" : "AI Stable Prompt (English)"}
                            </span>
                            <button
                              onClick={() => handleCopy(p.englishPrompt, `${p.id}-en`)}
                              className="text-[10px] font-mono uppercase text-zinc-500 hover:text-white flex items-center gap-1 transition cursor-pointer"
                              id={`saved-item-en-copy-${p.id}`}
                            >
                              {copiedId === `${p.id}-en` ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-zinc-300" id={`saved-item-en-copied-icon-${p.id}`} />
                                  <span className="text-zinc-300 font-medium" id={`saved-item-en-copied-text-${p.id}`}>{isDE ? "Kopiert!" : "Copied!"}</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5 text-zinc-500" id={`saved-item-en-copy-icon-${p.id}`} />
                                  <span id={`saved-item-en-copy-text-${p.id}`}>{isDE ? "Kopieren" : "Copy"}</span>
                                </>
                              )}
                            </button>
                          </div>
                          <p className="text-xs bg-[#050505] border border-white/10 p-3 rounded-sm text-zinc-200 font-mono select-all leading-relaxed whitespace-pre-wrap" id={`saved-item-en-text-${p.id}`}>
                            {p.englishPrompt}
                          </p>
                        </div>

                        {/* German version if translation exists */}
                        {p.germanPrompt !== p.englishPrompt && (
                          <div id={`saved-item-de-wrap-${p.id}`}>
                            <div className="flex items-center justify-between mb-1" id={`saved-item-de-header-${p.id}`}>
                              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest" id={`saved-item-de-badge-${p.id}`}>
                                {isDE ? "Deutsche Übersetzung" : "German Reference Translation"}
                              </span>
                              <button
                                onClick={() => handleCopy(p.germanPrompt, `${p.id}-de`)}
                                className="text-[10px] font-mono uppercase text-zinc-500 hover:text-white flex items-center gap-1 transition cursor-pointer"
                                id={`saved-item-de-copy-${p.id}`}
                              >
                                {copiedId === `${p.id}-de` ? (
                                  <>
                                    <Check className="w-3.5 h-3.5 text-zinc-400" id={`saved-item-de-copied-icon-${p.id}`} />
                                    <span className="text-zinc-300 font-medium" id={`saved-item-de-copied-text-${p.id}`}>{isDE ? "Kopiert!" : "Copied!"}</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3.5 h-3.5 text-zinc-500" id={`saved-item-de-copy-icon-${p.id}`} />
                                    <span id={`saved-item-de-copy-text-${p.id}`}>{isDE ? "Kopieren" : "Copy"}</span>
                                  </>
                                )}
                              </button>
                            </div>
                            <p className="text-xs bg-[#050505]/60 border border-white/10 p-3 rounded-sm text-zinc-400 font-sans leading-relaxed whitespace-pre-wrap max-h-24 overflow-y-auto" id={`saved-item-de-text-${p.id}`}>
                              {p.germanPrompt}
                            </p>
                          </div>
                        )}

                        {/* Negative Prompt */}
                        {p.negativePrompt && (
                          <div id={`saved-item-neg-wrap-${p.id}`}>
                            <div className="flex items-center justify-between mb-1" id={`saved-item-neg-header-${p.id}`}>
                              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider font-bold" id={`saved-item-neg-badge-${p.id}`}>
                                Negative Prompt
                              </span>
                              <button
                                onClick={() => handleCopy(p.negativePrompt, `${p.id}-neg`)}
                                className="text-[10px] font-mono uppercase text-zinc-500 hover:text-white flex items-center gap-1 transition cursor-pointer"
                                id={`saved-item-neg-copy-${p.id}`}
                              >
                                {copiedId === `${p.id}-neg` ? (
                                  <>
                                    <Check className="w-3.5 h-3.5 text-zinc-400" id={`saved-item-neg-copied-icon-${p.id}`} />
                                    <span className="text-zinc-300 font-medium" id={`saved-item-neg-copied-text-${p.id}`}>{isDE ? "Kopiert!" : "Copied!"}</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3.5 h-3.5 text-zinc-500" id={`saved-item-neg-copy-icon-${p.id}`} />
                                    <span id={`saved-item-neg-copy-text-${p.id}`}>{isDE ? "Kopieren" : "Copy"}</span>
                                  </>
                                )}
                              </button>
                            </div>
                            <p className="text-xs bg-zinc-950/45 border border-white/10 p-2.5 rounded-sm text-zinc-400 font-mono truncate" id={`saved-item-neg-text-${p.id}`}>
                              {p.negativePrompt}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Tags area on card */}
                      <div className="mt-4 pt-3.5 border-t border-white/5 flex flex-wrap items-center gap-1.5" id={`card-tags-area-${p.id}`}>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#9e9e9e] mr-1">Tags:</span>
                        {(p.tags || []).map((t) => (
                          <span
                            key={t}
                            className="bg-zinc-900 border border-white/5 text-[10px] font-mono px-2 py-0.5 rounded-sm text-zinc-400 flex items-center gap-1 group/tag"
                            id={`tag-bubble-${p.id}-${t}`}
                          >
                            <span>#{t}</span>
                            <button
                              onClick={() => handleRemoveTagFromPrompt(p, t)}
                              className="text-zinc-600 hover:text-red-400 transition"
                              title={isDE ? "Tag löschen" : "Unassign tag"}
                            >
                              <X className="w-2.5 h-2.5" />
                            </button>
                          </span>
                        ))}

                        {/* Inline Tag Input */}
                        {activeTagInputId === p.id ? (
                          <div className="flex items-center bg-[#050505] border border-white/20 rounded-sm overflow-hidden text-xs">
                            <input
                              type="text"
                              value={newTagVal}
                              onChange={(e) => setNewTagVal(e.target.value)}
                              placeholder={isDE ? "Tag Name..." : "Add label..."}
                              className="w-24 bg-transparent outline-none px-2 py-0.5 text-[10px] font-mono text-white"
                              onKeyPress={(e) => {
                                if (e.key === "Enter") handleAddTagToPrompt(p);
                              }}
                              autoFocus
                              id={`card-tag-text-input-${p.id}`}
                            />
                            <button
                              onClick={() => handleAddTagToPrompt(p)}
                              className="bg-white/10 hover:bg-white text-zinc-400 hover:text-black transition px-1.5 py-0.5 h-full cursor-pointer"
                            >
                              ✓
                            </button>
                            <button
                              onClick={() => {
                                setActiveTagInputId(null);
                                setNewTagVal("");
                              }}
                              className="bg-white/5 hover:bg-red-500/20 text-zinc-500 hover:text-red-400 transition px-1.5 py-0.5 h-full cursor-pointer"
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              setActiveTagInputId(p.id);
                              setNewTagVal("");
                            }}
                            className="bg-[#050505] hover:bg-white hover:text-black transition border border-white/10 hover:border-white text-[10px] font-mono px-2 py-0.5 rounded-sm text-zinc-500 cursor-pointer"
                            id={`add-tag-trigger-${p.id}`}
                          >
                            + Tag
                          </button>
                        )}
                      </div>

                      {/* --- COLLAPSIBLE DRAWER: EXPOSURE VARIATION GENERATOR PANEL --- */}
                      <AnimatePresence id={`variation-presence-${p.id}`}>
                        {variationOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden mt-4 pt-4 border-t border-white/15"
                            id={`darkroom-drawer-${p.id}`}
                          >
                            <div className="flex items-center justify-between mb-4">
                              <h5 className="text-[11px] font-mono tracking-widest text-[#f5af19] uppercase font-bold flex items-center gap-1.5 animate-pulse">
                                <Sparkles className="w-3.5 h-3.5 text-[#f5af19]" />
                                {isDE ? "AUTOMATISCHE BELICHTUNGS-VARIATIONEN (DUNKELKAMMER)" : "AUTOMATED COCKPIT FILM VARIATIONS"}
                              </h5>
                              <span className="text-[8px] font-mono text-zinc-500 bg-zinc-950 px-2 py-0.5 rounded-sm border border-white/5 uppercase">
                                {isDE ? "6 Stile errechnet" : "6 distinct styles"}
                              </span>
                            </div>

                            <p className="text-[11px] text-zinc-400 font-sans mb-4 leading-normal">
                              {isDE 
                                ? "Die Chemie-Simulation hat basierend auf deinem Keyword-Porträt 6 eigenständige analoge Kunst-Variationen entwickelt. Ein Klick kopiert oder archiviert sie permanent."
                                : "The retro processing emulation has auto-compiled 6 tailored analog alternatives with tweaked films, cameras, and synonym replacements."}
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {VARIATION_FORMULAS.map((formula) => {
                                // 1. Copy config
                                const s = { ...p.settings };
                                const inc = { ...p.includes };

                                // 2. Synonym swapping
                                if (s.traits) s.traits = replaceSynonymsInText(s.traits);
                                if (s.details) s.details = replaceSynonymsInText(s.details);

                                // 3. Formula injection
                                formula.modifier(s, inc);

                                // 4. Dynamic compilation
                                const varEnglishPrompt = compileVariationPrompt(s, inc, "English");
                                const varGermanPrompt = compileVariationPrompt(s, inc, "Deutsch");

                                // Unique identifier for copied states
                                const copyKeyEng = `${p.id}-${formula.key}-eng`;
                                const copyKeyGer = `${p.id}-${formula.key}-ger`;

                                return (
                                  <div
                                    key={formula.key}
                                    className="border border-white/5 hover:border-[#f5af19]/25 bg-black/60 p-4 rounded-sm transition duration-300 flex flex-col justify-between"
                                    id={`var-card-${p.id}-${formula.key}`}
                                  >
                                    <div>
                                      <div className="flex items-center justify-between gap-2 mb-1.5">
                                        <span className="text-[11px] font-mono text-white tracking-wide uppercase font-bold font-sans">
                                          {isDE ? formula.themeNameDE : formula.themeNameEN}
                                        </span>
                                        <span className="text-[9px] font-mono text-amber-500 border border-amber-500/20 px-1 py-0.5 rounded-sm bg-amber-500/5">
                                          {formula.category}
                                        </span>
                                      </div>
                                      <p className="text-[11px] text-zinc-400 font-sans leading-normal mb-3">
                                        {isDE ? formula.descriptionDE : formula.descriptionEN}
                                      </p>

                                      <div className="relative mb-3.5">
                                        <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest mb-1 select-none">
                                          {isDE ? "Generierter Prompt (Englisch)" : "Compiled Prompt (English)"}
                                        </div>
                                        <textarea
                                          readOnly
                                          value={varEnglishPrompt}
                                          className="w-full bg-[#050505] border border-white/10 rounded-sm p-2 text-[10px] leading-relaxed text-zinc-300 font-mono resize-none h-20 select-all focus:outline-none"
                                        />
                                      </div>
                                    </div>

                                    <div className="flex gap-2 pt-2 border-t border-white/5">
                                      <button
                                        onClick={() => handleCopy(varEnglishPrompt, copyKeyEng)}
                                        className="flex-1 bg-zinc-950 border border-white/10 hover:border-white/30 text-zinc-300 hover:text-white transition py-1.5 rounded-sm text-[10px] font-mono uppercase tracking-wider flex items-center justify-center gap-1 cursor-pointer"
                                        title={isDE ? "Englischen Prompt kopieren" : "Copy English Prompt"}
                                      >
                                        {copiedId === copyKeyEng ? (
                                          <>
                                            <Check className="w-3 h-3 text-green-400" />
                                            <span>{isDE ? "Kopiert!" : "Copied!"}</span>
                                          </>
                                        ) : (
                                          <>
                                            <Copy className="w-3.5 h-3.5 text-zinc-500" />
                                            <span>{isDE ? "Kopieren" : "Copy"}</span>
                                          </>
                                        )}
                                      </button>

                                      <button
                                        onClick={() => handleSaveVariationToLibrary(p, formula, varEnglishPrompt, varGermanPrompt)}
                                        className="flex-1 bg-white hover:bg-zinc-200 text-black transition py-1.5 rounded-sm text-[10px] font-bold uppercase tracking-wider h-full flex items-center justify-center gap-1 cursor-pointer"
                                        title={isDE ? "In die Bibliothek als neues Rezept sichern" : "Archive in Library as Custom Recipe"}
                                      >
                                        <Plus className="w-3.5 h-3.5" />
                                        <span>{isDE ? "Sichern" : "Preserve"}</span>
                                      </button>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  </div>
  );
};
