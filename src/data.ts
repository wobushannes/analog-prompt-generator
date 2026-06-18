export interface PromptOptions {
  defaults: {
    location: string;
    type: string;
    type_include: string;
    success: string;
    success_include: string;
    nationality: string;
    nationality_include: string;
    role: string;
    role_include: string;
    gender: string;
    gender_include: string;
    age_range: string;
    age_include: string;
    camera_type: string;
    camera_type_include: string;
    camera: string;
    camera_include: string;
    lens: string;
    lens_include: string;
    film: string;
    film_include: string;
    film_detail: string;
    film_detail_include: string;
    quality: string;
    quality_include: string;
    traits: string;
    traits_include: string;
    details: string;
    details_include: string;
    style: string;
    style_include: string;
    clothing: string;
    clothing_include: string;
    cultural_element: string;
    cultural_include: string;
    time_period: string;
    time_period_include: string;
    pose: string;
    pose_include: string;
    lighting: string;
    lighting_include: string;
    background: string;
    background_include: string;
    prop: string;
    prop_include: string;
    ambiance: string;
    ambiance_include: string;
    weather: string;
    weather_include: string;
    emotion: string;
    emotion_include: string;
    post_processing_choice: string;
    post_processing: string;
    post_processing_include: string;
    effect: string;
    effect_include: string;
    negative_prompt: string;
    // New defaults for themes
    genre: string;
    street_subject: string;
    street_subject_include: string;
    landscape_subject: string;
    landscape_subject_include: string;
    season: string;
    season_include: string;
    time_of_day: string;
    time_of_day_include: string;
    camera_elevation: string;
    camera_elevation_include: string;
    object_subject: string;
    object_subject_include: string;
    expired_paper: string;
    expired_paper_include: string;
    expired_film: string;
    expired_film_include: string;
    free_text: string;
    free_text_include: string;
  };
  portrait_types: string[];
  camera_types_by_portrait_type: Record<string, string[]>;
  cameras: Record<string, string[]>;
  films: Record<string, string[]>;
  lenses: Record<string, string[]>;
  film_details: string[];
  quality_levels: string[];
  success_levels: string[];
  roles: string[];
  subject_traits: string[];
  subject_details: string[];
  styles: string[];
  mens_clothing: string[];
  womens_clothing: string[];
  lighting: string[];
  backgrounds: string[];
  props: string[];
  ambiance: string[];
  age_range: string[];
  effects: string[];
  post_processing: string[];
  poses: string[];
  cultural_elements: string[];
  time_periods: string[];
  weather_conditions: string[];
  emotional_depth: string[];
  
  // NEW GENRE SPECIFIC OPTION LISTS
  landscape_subjects: string[];
  street_subjects: string[];
  seasons: string[];
  times_of_day: string[];
  camera_elevations: string[];
  object_subjects: string[];
  expired_papers: string[];
  expired_films: string[];
}

export const promptOptionsData: PromptOptions = {
  defaults: {
    location: "Studio / Innenaufnahme",
    type: "C41 (Farbe) / C41 (Color)",
    type_include: "yes",
    success: "legendär / legendary",
    success_include: "yes",
    nationality: "Moroccan / Moroccan",
    nationality_include: "yes",
    role: "Visionär / visionary",
    role_include: "yes",
    gender: "Männlich / Male",
    gender_include: "yes",
    age_range: "reif (40er), erfahren / mature (40s), seasoned",
    age_include: "yes",
    camera_type: "Mittelformat / Medium Format",
    camera_type_include: "yes",
    camera: "Mamiya RZ67 Pro II, Mittelformat / Mamiya RZ67 Pro II, medium format",
    camera_include: "yes",
    lens: "Mamiya Sekor Z 110mm f/2.8, Porträt-Kompression / Mamiya Sekor Z 110mm f/2.8, portrait compression",
    lens_include: "yes",
    film: "Kodak Portra 160, zarte Töne / Kodak Portra 160, delicate skin tones",
    film_include: "yes",
    film_detail: "feines biologisches Filmkorn / fine organic film grain texture",
    film_detail_include: "yes",
    quality: "Platinum-Palladium Handkontaktkopie auf Bütten / Platinum-palladium handcontact print on heavy cotton paper",
    quality_include: "yes",
    traits: "intensiver Fokus mit stiller Stärke / intense focus with quiet strength",
    traits_include: "yes",
    details: "durchdringende blaue Augen, leicht gebräunte Haut / piercing blue eyes, slightly tanned skin",
    details_include: "yes",
    style: "Annie Leibovitz: dramatische Tiefe / Annie Leibovitz: dramatic scenic depth",
    style_include: "yes",
    clothing: "dreiteiliger Tweed-Anzug in Anthrazit / classic three-piece charcoal tweed suit",
    clothing_include: "yes",
    cultural_element: "marokkanischer Kaftan mit Goldstickerei / Moroccan kaftan with intricate gold embroidery",
    cultural_include: "yes",
    time_period: "1920er Flapper, jazzig / 1920s flapper, jazzy era",
    time_period_include: "yes",
    pose: "sitzend mit leichter Neigung / seated with a slight relaxed lean",
    pose_include: "yes",
    lighting: "dramatisch mit klarem Lichtrand / dramatic rim lighting",
    lighting_include: "yes",
    background: "weicher neutraler Studio-Hintergrund / soft neutral gradient studio backdrop",
    background_include: "yes",
    prop: "neben einem Stapel ledergebundener Bücher / next to a pile of leather-bound books",
    prop_include: "yes",
    ambiance: "goldenes, sanft diffuses Scheinwerferlicht / golden, softly diffused spotlight glow",
    ambiance_include: "yes",
    weather: "im strömenden Regen gedreht / shot in heavy pouring rain",
    weather_include: "yes",
    emotion: "stiller Blick voller Entschlossenheit / quiet gaze full of determination",
    emotion_include: "yes",
    post_processing_choice: "yes",
    post_processing: "Rodinal chemische Graustufen-Entwicklung / Rodinal acutance chemical development process",
    post_processing_include: "yes",
    effect: "erhabene klassische Ausstrahlung / sublime classical museum presence",
    effect_include: "yes",
    negative_prompt: "blurry, low quality, digital renderer, plastic look, smooth 3d CGI skin, airbrushed",
    
    // Genre specific defaults
    genre: "portrait / portrait",
    street_subject: "geschäftiges Straßencafé im herbstlichen Paris / a bustling sidewalk cafe in autumn Paris",
    street_subject_include: "yes",
    landscape_subject: "schroffe Klippen vor stürmischem Ozean / rugged cliffs facing a stormy ocean",
    landscape_subject_include: "yes",
    season: "Herbst: goldene Blätter und Nebeldunst / Autumn: golden leaves and morning mist",
    season_include: "yes",
    time_of_day: "Goldene Stunde (Kurz vor Sonnenuntergang) / Golden hour (just before sunset)",
    time_of_day_include: "yes",
    camera_elevation: "Augenhöhe (Natürlicher Blick) / Eye-level view (natural perspective)",
    camera_elevation_include: "yes",
    object_subject: "antike mechanische Schreibmaschine auf Holztisch / antique mechanical typewriter resting on a dark walnut wood table",
    object_subject_include: "yes",
    expired_paper: "Agfa Brovira (Abgelaufen 1978), harter Silberkontrast mit Gelbschleier / Agfa Brovira vintage cold-tone paper, expired in 1978, dramatic warm fog with silver bronzing in deep blacks",
    expired_paper_include: "no",
    expired_film: "Kodak Tri-X (Abgelaufen 1975), extremes biologisches Rußkorn / Kodak Tri-X dynamic panchromatic manual film, expired in 1975, immense organic soot grain",
    expired_film_include: "no",
    free_text: "",
    free_text_include: "yes"
  },
  portrait_types: [
    "Schwarz-Weiß / Black-and-White",
    "C41 (Farbe) / C41 (Color)",
    "E6 (Dias) / E6 (Slides)",
    "Polaroid / Polaroid",
    "Expired / Expired",
    "Experimental / Experimental"
  ],
  camera_types_by_portrait_type: {
    "Schwarz-Weiß / Black-and-White": [
      "Kleinbild / 35mm",
      "Mittelformat / Medium Format",
      "Großformat / Large Format",
      "Fachkameras / Technical Cameras",
      "Studiokameras / Studio Cameras",
      "Feldkameras / Field Cameras",
      "Lochkameras / Pinhole Cameras",
      "Panoramakameras / Panoramic Cameras",
      "Spiegelreflex / SLR",
      "Messsucher / Rangefinder"
    ],
    "C41 (Farbe) / C41 (Color)": [
      "Kleinbild / 35mm",
      "Mittelformat / Medium Format",
      "Großformat / Large Format",
      "Spiegelreflex / SLR",
      "Kompaktkameras / Compact Cameras",
      "Systemkameras / Mirrorless"
    ],
    "E6 (Dias) / E6 (Slides)": [
      "Kleinbild / 35mm",
      "Mittelformat / Medium Format",
      "Großformat / Large Format",
      "Spiegelreflex / SLR",
      "Messsucher / Rangefinder"
    ],
    "Polaroid / Polaroid": [
      "Polaroid",
      "Sofortbildkameras / Instant Cameras"
    ],
    "Expired / Expired": [
      "Kleinbild / 35mm",
      "Mittelformat / Medium Format",
      "Großformat / Large Format",
      "Spiegelreflex / SLR",
      "Kompaktkameras / Compact Cameras"
    ],
    "Experimental / Experimental": [
      "Kleinbild / 35mm",
      "Mittelformat / Medium Format",
      "Großformat / Large Format",
      "Lochkameras / Pinhole Cameras",
      "Spielzeugkameras / Toy Cameras"
    ]
  },
  cameras: {
    "Kleinbild / 35mm": [
      "Leica M6 Classic, Messsucher / Leica M6 Classic mechanical rangefinder camera",
      "Nikon F3 HP, Profi-Spiegelreflex / Nikon F3 HP high-eyepoint 35mm SLR camera",
      "Leica M3, Reiner Messsucher / Leica M3 legendary mechanical rangefinder camera",
      "Nikon FM2n, Mechanisches Arbeitstier / Nikon FM2n advanced mechanical shutter SLR camera",
      "Contax G2, High-End Autofokus / Contax G2 luxury autofocus titanium rangefinder",
      "Rollei 35S, Taschenpräzision Zeiss-Sonnar / Rollei 35S compact pocket camera with Sonnar optics",
      "Olympus OM-1, Kompakte Spiegelreflex / Olympus OM-1 compact mechanical SLR camera",
      "Canon AE-1 Program, Einsteigerlegende / Canon AE-1 Program classic 1980s SLR camera",
      "Minolta X-700, Reportage-Spezialistin / Minolta X-700 street photography SLR",
      "Contax T2, Premium Titankompakte / Contax T2 luxury compact titanium camera with Carl Zeiss",
      "Nikon F6, Letzte Profi-SLR / Nikon F6 premium modern automated 35mm SLR camera",
      "Leica M10 Monochrom, Luxus-Schwarzweiß / Leica M10 Monochrom high-resolution digital black and white rangefinder"
    ],
    "Mittelformat / Medium Format": [
      "Hasselblad 500C/M, Modulare 6x6-Spiegelreflex / Hasselblad 500C/M modular 6x6 medium format SLR camera",
      "Mamiya RZ67 Pro II, Rollfilm-Studiotier / Mamiya RZ67 Pro II professional 6x7 medium format camera",
      "Pentax 67 II, Massive Spiegelreflex / Pentax 67 II heavyweight slr medium format camera",
      "Rolleiflex 2.8F TLR, Zweiäugige Klassiker / Rolleiflex 2.8F Twin-Lens Reflex camera with Planar lens",
      "Contax 645 AF, Porträtsieger mit Zeiss-Optik / Contax 645 AF high-performance medium format camera",
      "Mamiya 7 II, Handliche 6x7-Messsucher / Mamiya 7 II light chassis medium format rangefinder",
      "Plaubel Makina 67, Faltbare Pracht / Plaubel Makina 67 folding camera with Nikkor 80mm",
      "Hasselblad 503CW, Perfektioniertes 6x6 / Hasselblad 503CW advanced mechanical 120 film camera",
      "Yashica Mat 124G, Zweiäugige Legende / Yashica Mat 124G twin-lens reflex medium format TLR camera",
      "Fuji GSW690 III, Weitwinkel Riesen-Negativ / Fuji GSW690 III wide angle 6x9 landscape camera"
    ],
    "Großformat / Large Format": [
      "Linhof Master Technika Classic 4x5, Aluminium-Handwerk / Linhof Master Technika 4x5 field camera",
      "Sinar P2 8x10, Präzisions-Fachkamera / Sinar P2 studio technical 8x10 monorail camera",
      "Deardorff 8x10, Hölzerner Kunstabzugsklassiker / Deardorff 8x10 wooden grand format view camera",
      "Chamonix 45N-2, Teakholz-Leichtbau / Chamonix 45N-2 modern carbon-fiber and teakwood field camera",
      "Toyo-Field 45AII, Laufboden-Klassiker / Toyo-Field 45AII heavy metal folding field view camera",
      "Wista 45DX, Hölzerne Landschaftsoptik / Wista 45DX classic hand-carved cherrywood field camera",
      "Arca-Swiss F-Metric 4x5, Technische Kamera / Arca-Swiss F-Metric highly functional technical view camera"
    ],
    "Fachkameras / Technical Cameras": [
      "Arca-Swiss F-Line Metric 4x5, Studio-Präzision / Arca-Swiss F-Line Metric view camera",
      "Linhof Technikardan 45, Faltenbalg-Kombination / Linhof Technikardan 45 pocketable monorail technical camera",
      "Toyo VX125, Flexibles Studio-Arbeitstier / Toyo VX125 versatile technical camera"
    ],
    "Studiokameras / Studio Cameras": [
      "Sinar P3 Studio, Digitale Feinverstellung / Sinar P3 Studio technical high precision digital camera",
      "Gibellini Studio 11x14, Monumentaler Riesenbalg / Gibellini Studio 11x14 ultimate large scale darkroom camera",
      "Deardorff 11x14, Historische Atelierkamera / Deardorff 11x14 vintage studio portrait camera"
    ],
    "Feldkameras / Field Cameras": [
      "Intrepid 4x5 Mk4, Ultraleichter 3D-Druck / Intrepid 4x5 lightweight birch plywood field camera",
      "Shen-Hao HZX45-IIA, Bewährter Laufboden / Shen-Hao HZX45 teakwood field master camera",
      "Chamonix 045F-2, Extrem flexibler Teak-Kompaktling / Chamonix 045F-2 folding wooden camera"
    ],
    "Polaroid": [
      "Polaroid SX-70, Spiegelreflex-Falter / Polaroid SX-70 folding single-lens reflex instant camera",
      "Polaroid Land Camera 195, Reine manuelle Kontrolle / Polaroid Land Camera 195 fully manual instant camera",
      "Polaroid Land Camera 250, Messsucher-Klassiker / Polaroid Land Camera 250 bellows rangefinder instant camera",
      "Polaroid 600 Close-Up, Alltags-Klicker / Polaroid 600 instant camera with integrated closeup lens",
      "Polaroid Big Shot, Ikonische Porträtkamera / Polaroid Big Shot plastic rigid-body portrait instant camera"
    ],
    "Sofortbildkameras / Instant Cameras": [
      "Polaroid SX-70, Faltbarer Klassiker / Polaroid SX-70 instant model",
      "Fuji Instax 300 Wide, Breitbild-Sofortdruck / Fuji Instax 300 Wide print instant system",
      "Fuji Instax Mini 90 Neo Classic, Retro-Sofortbild / Fuji Instax Mini 90 Neo Classic retro direct camera"
    ],
    "Lochkameras / Pinhole Cameras": [
      "Zero Image 2000 6x6, Teakholz-Unikat / Zero Image 2000 handcrafted wooden 6x6 pinhole camera",
      "RealitySoSubtle 4x5, Präzisions-Aluminium-Weitwinkel / RealitySoSubtle 4x5 anodized aluminium pinhole camera",
      "Ondu 6x12 Multiformat, Holzleckerbissen / Ondu 6x12 multiformat wooden panoramic pinhole camera"
    ],
    "Panoramakameras / Panoramic Cameras": [
      "Linhof Technorama 617S III, Gigantische 6x17-Breite / Linhof Technorama 617S III professional panoramic camera",
      "Hasselblad XPan II, Doppelkopf-Kleinbild-Panorama / Hasselblad XPan II dual-format 35mm panoramic rangefinder",
      "Widelux F7, Schwenkobjektiv-Kult / Widelux F7 swinging-lens 35mm kinetic panorama camera"
    ],
    "Spiegelreflex / SLR": [
      "Nikon F3 HP, Dauerbrenner / Nikon F3 HP high-eyepoint SLR",
      "Canon New F-1, Unverwüstliche Systemkamera / Canon F-1 mechanical SLR masterpiece",
      "Pentax LX, Wetterversiegelte Luxusklasse / Pentax LX legendary weather-sealed SLR with mechanical backup"
    ],
    "Messsucher / Rangefinder": [
      "Leica M6, Reportage-Legende / Leica M6 manual focus rangefinder camera",
      "Zeiss Ikon ZM, Extrabreiter Sucher / Zeiss Ikon ZM rangefinder with wide 0.74x viewfinder",
      "Voigtländer Bessa R4M, Weitwinkel-Messsucher / Voigtländer Bessa R4M mechanical wide-angle rangefinder"
    ],
    "Kompaktkameras / Compact Cameras": [
      "Yashica T4, Scharfes Tessar-Objektiv / Yashica T4 compact camera with Carl Zeiss Tessar f3.5",
      "Olympus Stylus Epic Mju-II, Wetterfestes Kult-Ei / Olympus Mju II 35mm f2.8 pocket camera",
      "Nikon 28Ti, Analoges Zeigerinstrument / Nikon 28Ti luxury titanium compact with analog clockwork dials"
    ],
    "Systemkameras / Mirrorless": [
      "Hasselblad X1D II 50C, Stilvolles Digital-Mittelformat / Hasselblad X1D II 50C digital medium format camera",
      "Fujifilm GFX 100S, Riesensensor / Fujifilm GFX 100S high-resolution medium format digital backup",
      "Sony A7R V, Extrem detailreich / Sony A7R V high resolution full-frame digital camera"
    ],
    "Spielzeugkameras / Toy Cameras": [
      "Holga 120N, Plastik-Vignettierungs-Kult / Holga 120N plastic medium format toy camera with heavy light leaks",
      "Diana F+, Sanfter Traum-Look / Diana F+ 120 medium format blue-plastic dream camera with strobe"
    ]
  },
  films: {
    "Kleinbild / 35mm": [
      "Kodak Tri-X 400, Harter Kontrast schwarz-weiß / Kodak Tri-X 400 movie-grade heavy contrast raw film",
      "Ilford HP5 Plus 400, Strukturierter Graustufen-Klassiker / Ilford HP5 Plus 400 highly versatile silver gelatin film",
      "Fujifilm Neopan Acros 100, Extreme Detail-Schwarzweißschärfe / Fujifilm Neopan Acros 100 fine grain panchromatic print",
      "CineStill 800T, Filmische Halations-Lichtkränze / CineStill 800T tungsten-balanced cinema film with red halation",
      "Kodak Portra 400, Beliebtester warmer Porträtzopf / Kodak Portra 400 professional pastel portrait negative film",
      "Kodak Gold 200, Goldene Alltagstöne / Kodak Gold 200 rich warm golden-hour saturated consumer film",
      "CineStill 400D, Warme harmonische Farben / CineStill 400D cinematic daylight-balanced color film",
      "Ilford Delta 3200, Reiches sichtbares Silberkorn / Ilford Delta 3200 high-speed hyper-grain atmospheric film",
      "Kodak Ektar 100, Höchste Farbsättigung / Kodak Ektar 100 saturated vivid color landscape-quality film"
    ],
    "Mittelformat / Medium Format": [
      "Kodak Portra 160, Traumhafte Hautfarben / Kodak Portra 160 extremely delicate natural skin tone standard",
      "Kodak Portra 400, Reiches Kontrast-Farbspiel / Kodak Portra 400 professional high latitude medium format film",
      "Fujifilm Velvia 50, Unglaublich satte Naturfarben / Fujifilm Velvia 50 ultra-vibrant legendary chrome landscape slide film",
      "Ilford HP5 Plus 400, Edles klares Graustufen-Sortiment / Ilford HP5 Plus 400 classic medium-format reportage silver",
      "Kodak Tri-X 400, Körniges Schwarz-Weiß / Kodak Tri-X 400 panchromatic rich black standard",
      "Kodak Ektachrome E100, Kühler feiner Diafilm / Kodak Ektachrome E100 razor-sharp saturated slide reversal film",
      "Fuji Pro 400H, Luftige Pastelle und kühles Türkis / Fuji Pro 400H pastel-green airy medium format portrait film",
      "Ilford Delta 100, Ultrascharfe Detailauflösung / Ilford Delta 100 fine grain tabular grain precision emulsion"
    ],
    "Großformat / Large Format": [
      "Kodak Tri-X 320, Großer Detailreichtum / Kodak Tri-X 320 professional sheet film with deep midtone latitude",
      "Ilford Delta 100, Raufaserfreie Schärfe / Ilford Delta 100 modern T-grain large format monochrome sheet film",
      "Kodak T-Max 100, Flachkristall-Schärfe / Kodak T-Max 100 panchromatic film with infinite resolving power",
      "Fuji Velvia 100, Extreme Farbtransparenz / Fuji Velvia 100 high saturation landscape chrome sheet film",
      "Bergger Pancro 400, Doppelschichtige Silbertiefe / Bergger Pancro 400 silver-rich dense dual-emulsion sheet film"
    ],
    "Fachkameras / Technical Cameras": [
      "Kodak T-Max 100, Unübertroffen feines Korn / Kodak T-Max 100 fine grain positive copy",
      "Adox CMS 20 II, Höchstauflösender Dokumentenfilm / Adox CMS 20 II orthochromatic micro-graphic ultimate resolution film",
      "Rollei Ortho 25, Stark kontrastierter lithografischer Film / Rollei Ortho 25 high contrast orthochromatic film"
    ],
    "Studiokameras / Studio Cameras": [
      "Kodak Portra 160, Glatte Hautverläufe / Kodak Portra 160 professional studio color negative",
      "Ilford FP4 Plus 125, Gutmütige Graustufen / Ilford FP4 Plus 125 robust latitude fine-detail portrait stock",
      "Fuji Astia 100F, Ausgewogene neutrale Dias / Fuji Astia 100F natural skin-tone professional slide film"
    ],
    "Feldkameras / Field Cameras": [
      "Fujifilm Velvia 50, Für herbstliche Wälder / Fujifilm Velvia 50 landscape chrome",
      "Kodak Tri-X 320, Plastischer Kontrast / Kodak Tri-X 320 high latitude outdoor standard",
      "Rollei Infrared 400, Traumhafte weiße Baumwipfel / Rollei Infrared 400 wood-effect highlight infrared film"
    ],
    "Polaroid": [
      "Polaroid i-Type Color, Moderner Original-Sofortdruck / Polaroid i-Type Color rich-edge modern instant film",
      "Polaroid 600 Monochrome, Kühler Vintage-Schwarzweißton / Polaroid 600 Monochrome chemistry nostalgic direct monochrome",
      "Fuji FP-100C, Die verblasste Trennbildlegende / Fuji FP-100C legendary peel-apart glossy packfilm"
    ],
    "Sofortbildkameras / Instant Cameras": [
      "Polaroid 600 Color, Ikonische Farb-Sofortbilder / Polaroid 600 Color classic instant film stock",
      "Fuji Instax Wide, Helle stabile Naturfarben / Fuji Instax Wide direct film"
    ],
    "c41": [
      "Kodak Portra 400, Der Branchenstandard / Kodak Portra 400 professional portrait emulsion",
      "Kodak Gold 200, Warm schwebende Vintage-Sonne / Kodak Gold 200 warm yellow consumer film chemistry",
      "Kodak Ektar 100, Scharf wie Glas und farbintensiv / Kodak Ektar 100 super fine grain deep-saturated color film",
      "Fuji Superia 400, Grünstichige kühle Natürlichkeit / Fuji Superia 400 vivid green matrix consumer film",
      "Lomography Metropolis, Desaturierter Urban-Look / Lomography Metropolis desaturated high contrast color negative film"
    ],
    "e6": [
      "Kodak Ektachrome E100, Kristallines Realitäts-Glas / Kodak Ektachrome E100 vivid color slide reversal film",
      "Fujifilm Velvia 50, Übersättigte lebhafte Pracht / Fujifilm Velvia 50 high saturation positive slide transparency",
      "Fujifilm Provia 100F, Neutrale professionelle Dia-Präzision / Fujifilm Provia 100F natural chrome reversal film"
    ],
    "expired": [
      "Kodak Gold (Abgelaufen 1992), Warme Magentastiche / Kodak Gold 100 expired in 1992, nostalgic yellow-magenta shift, organic mold dust",
      "Fuji Superia (Abgelaufen 1998), Verblasste Grüntöne / Fuji Superia 400 expired in 1998, high-contrast faded green shadows",
      "Kodak Vericolor III (Abgelaufen 1984), Sanfter Pastellhauch / Kodak Vericolor III vintage expired sheet film, beautiful pale orange tone"
    ],
    "experimental": [
      "Lomography LomoChrome Purple, Grün wird zu Violett / Lomography LomoChrome Purple surreal color-shifted color negative",
      "Revolog Kolor, Zufällige Neoneffekte u. Lichtlecks / Revolog Kolor pre-exposed with colorful spectrum lights and leaks",
      "Revolog Tesla, Organische Blitzwolken auf Zelluloid / Revolog Tesla pre-exposed electric lightning patterns"
    ]
  },
  lenses: {
    "Kleinbild / 35mm": [
      "Leica Summilux-M 35mm f/1.4 ASPH, Phänomenale Portal-Schärfe / Leica Summilux-M 35mm f1.4 ASPH legendary high-contrast lens",
      "Leica APO-Summicron-M 50mm f/2 ASPH, Unübertroffenes Detailglas / Leica APO-Summicron-M 50mm f2 ASPH clinically sharp rangefinder lens",
      "Leica Noctilux-M 50mm f/0.95, Traumhafte Schärfentiefe / Leica Noctilux-M 50mm f0.95 dream-like ultra-thin razor focal plane and heavy vignetting",
      "Nikon Nikkor 50mm f/1.2 AIS, Weicher Schimmer bei Offenblende / Nikon Nikkor 50mm f1.2 AIS fast prime classic with glowing wide-open halation",
      "Zeiss Planar T* 50mm f/1.4, Dreidimensionaler Kontrast / Carl Zeiss Planar T* 50mm f1.4 lens with rich structural contrast",
      "Rollei HFT Planar 50mm f/1.8, Vintage-Schärfenzeichnung / Rollei HFT Planar 50mm f1.8 smooth multi-coated lens",
      "Voigtländer Nokton 40mm f/1.2, Kompakte Lichtstärke / Voigtländer Nokton 40mm f1.2 bright portrait glass"
    ],
    "Mittelformat / Medium Format": [
      "Mamiya Sekor Z 110mm f/2.8, Absolute Porträtlegende / Mamiya Sekor Z 110mm f2.8 pin-sharp portrait lens with creamy background melt",
      "Pentax 67 105mm f/2.4, Legendäres 3D-Bokeh / Pentax 67 105mm f2.4 iconic shallow depth of field medium-format lens",
      "Carl Zeiss Planar 80mm f/2.8 (Hasselblad), Goldstandard / Carl Zeiss Planar 80mm f2.8 legendary 6x6 studio optics",
      "Carl Zeiss 110mm f/2 Planar (Contax 645), Unfassbare Weichheit / Carl Zeiss 110mm f2 Planar contax medium format portrait king",
      "Rolleiflex Heidosmat & Tessar, Klassische TLR-Zweistimmigkeit / Rolleiflex Heidosmat and Carl Zeiss Tessar f3.5 dual lens setup",
      "Mamiya Sekor C 80mm f/1.9, Lichtstärkste Mittelformatlinse / Mamiya Sekor C 80mm f1.9 ultra-fast vintage medium format lens"
    ],
    "Großformat / Large Format": [
      "Rodenstock Apo-Sironar-S 150mm f/5.6, Klinische Detail-Chirurgie / Rodenstock Apo-Sironar-S 150mm f5.6 high-fidelity standard sheet lens",
      "Schneider Super-Symmar XL 110mm f/5.6, Extrem kontraststark / Schneider Super-Symmar XL 110mm f5.6 ultimate sharpness large format optics",
      "Goerz Dagor 12-inch f/6.8, Ikonischer weicher Übergang / Goerz Dagor 300mm f6.8 vintage double-anastigmat lens representing classic transitions",
      "Nikon Nikkor-W 210mm f/5.6, Symmetrischer Klassiker / Nikon Nikkor-W 210mm f5.6 large format medium telephoto lens"
    ],
    "Fachkameras / Technical Cameras": [
      "Rodenstock HR Digaron-S 60mm f/4, Speziell für Planfilm / Rodenstock HR Digaron-S 60mm f4 high-resolution technical view lens",
      "Schneider Apo-Digitar 120mm f/5.6, Rasiermesserscharf / Schneider Apo-Digitar 120mm f5.6 macro landscape view lens"
    ],
    "Studiokameras / Studio Cameras": [
      "Voigtländer Heliar 300mm f/4.5, Berühmte historische Weichzeichung / Voigtländer Heliar 300mm f4.5 vintage soft-focus studio portrait lens",
      "Schneider Xenotar 150mm f/2.8, Atemberaubende Offenblendenplastizität / Schneider Xenotar 150mm f2.8 ultra-bright medium grand-format lens"
    ],
    "Feldkameras / Field Cameras": [
      "Nikkor-M 300mm f/9, Platzsparende Tele-Präzision / Nikkor-M 300mm f9 compact lightweight large-format outdoor lens",
      "Fujinon W 125mm f/5.6, Breiter Weitwinkel / Fujinon W 125mm f5.6 landscape wide view lens"
    ],
    "Polaroid": [
      "Polaroid SX-70 Glass-Triplet 116mm f/8, Sanfte Weichheit / Polaroid SX-70 glass-triplet 116mm f8 instant optics",
      "Polaroid 195 Tominon 114mm f/3.8, Manuelles Bokeh-Monster / Polaroid 195 Tominon 114mm f3.8 rare Japanese fast instant glass"
    ],
    "Sofortbildkameras / Instant Cameras": [
      "Polaroid 600 Standardlinse, Scharf u. Einfach / Polaroid 600 rigid plastic lens",
      "Fuji Instax 90 f/12.7, Einfache Reiseoptik / Fuji Instax 90 compact instant snapshot lens"
    ],
    "Lochkameras / Pinhole Cameras": [
      "Zero Image f/138 Pinhole-Schlitz, Maximale Beugungsunschärfe / Zero Image custom pinhole brass aperture f138 and infinite perspective depth",
      "RealitySoSubtle 0.2mm Laserbohrung, Unglaublich atmosphärisch / laser-drilled ultra-fine 0.2mm precision pinhole with nostalgic vignette"
    ],
    "Panoramakameras / Panoramic Cameras": [
      "Rodenstock Apo-Grandagon 55mm f/4.5, Verzerrungsfreie Breite / Rodenstock Apo-Grandagon 55mm f4.5 distortion-free extreme wide-angle lens",
      "Zeiss Planar 45mm f/2 (XPan), Rasiermesserscharfe Panorama-Sensation / Carl Zeiss Hasselblad 45mm f2 panoramic lens"
    ],
    "Spiegelreflex / SLR": [
      "Nikon Nikkor 85mm f/1.4 AIS, Handgezeichnete Porträtästhetik / Nikon Nikkor 85mm f1.4 AIS legendary manual focus portrait lens",
      "Olympus Zuiko 50mm f/1.2, Charaktervolles cremiges Bokeh / Olympus Zuiko Auto-S 50mm f1.2 ultra-bright light gatherer"
    ],
    "Messsucher / Rangefinder": [
      "Leitz Summicron 50mm f/2 Collapsible, Historischer pastelliger Glanz / Leitz Summicron 50mm f2 collapsible classic pre-war vintage lens glow",
      "Voigtländer Nokton 35mm f/1.4, Klassisch-kompakter Vintage-Vibe / Voigtländer Nokton 35mm f1.4 classical vintage-character rendering lens"
    ],
    "Kompaktkameras / Compact Cameras": [
      "Zeiss Sonnar 38mm f/2.8, Legendäre T2-Optik / Carl Zeiss Sonnar 38mm f2.8 superb high contrast lens",
      "Ricoh GR GR-Lens 28mm f/2.8, Legendäre Reportageoptik / Ricoh GR 28mm f2.8 razor-sharp multi-coated classic prime"
    ],
    "Systemkameras / Mirrorless": [
      "Sony FE 50mm f/1.2 GM, Klinisch perfekt / Sony FE 50mm f1.2 G-Master modern digital clinical lens",
      "Hasselblad XCD 80mm f/1.9, Unübertroffene Brillanz / Hasselblad XCD 80mm f1.9 digital medium format razor optics"
    ],
    "Spielzeugkameras / Toy Cameras": [
      "Holga 60mm Plastic Lens f/8, Unschärfe an den Rändern / Holga 60mm f8 soft focus single-element plastic toy lens"
    ]
  },
  film_details: [
    "feines glattes Silbersalz-Korn / fine smooth silver-halide organic grain texture",
    "starkes, grobes, ausdrucksstarkes Filmkorn / heavy gritty and raw expressive film grain texture",
    "flaches rauschfreies Flachkristall-Korn / flat tabular crystal fine-grain emulsion look",
    "charakteristische rote Halations-Kränze um Lichter / noticeable warm red halation glow around light sources",
    "verblichene Vintage-Kornstruktur mit leichter Patina / faded low-contrast vintage grain structure with slight patina",
    "leicht zerkratztes Zelluloid mit feinen Fussel-Strukturen / dust and fine hairs on light emulsion scratches",
    "sauberes digitales Korn mit exzellenter Kantensteilheit / crisp high-resolution scan pattern with sharp grain transitions"
  ],
  quality_levels: [
    "Platinum-Palladium Handkontaktkopie auf Bütten / Platinum-palladium handcontact print on heavy cotton paper, incredible tone depth",
    "Silbergelatine handabgezogen auf Barytkarton / Silver-gelatin handprinted in darkroom on heavy double-weight fiber-based baryta paper",
    "Cyanotypie handabgezogen auf Arches-Aquarellkarton / Cyanotype handmade sun-print, deep prussian blue tones on heavy textured rag paper",
    "Albuminpapier-Druck mit historischer warmbrauner Note / Albumen print, historic albumenized silver chloride print on thin paper with warm sepia glow",
    "Cibachrome (Ilfochrome) extrem glänzendes Meister-Diaabzug / Cibachrome ultra-high gloss direct positive transparency print with maximum color vibrancy",
    "Pigment-Fineline-Druck auf Hahnemühle Museum Etching / Giclee museum-quality archival pigment print on Hahnemühle cotton paper",
    "Carbon-Pigment-Transfer Handabzug mit 3D-Relief / Carbon transfer pigment print with rich dimensional thickness in dark zones"
  ],
  success_levels: [
    "visionär / visionary",
    "ikonisch / iconic",
    "legendär / legendary",
    "meisterhaft / masterful",
    "bahnbrechend / groundbreaking",
    "pionierhaft / pioneering",
    "weltoffen / worldly and respected"
  ],
  roles: [
    "Künstler / artist",
    "Unternehmer / entrepreneur",
    "Visionär / visionary",
    "Schriftsteller / writer",
    "Wissenschaftler / scientist",
    "Pionier / pioneer",
    "Architekt / architect",
    "Philosoph / philosopher",
    "Aktivist / activist",
    "Handwerker / craftsman and thinker",
    "Alchemist / alchemist of light",
    "Wanderer / modern nomad",
    "Komponist / composer"
  ],
  subject_traits: [
    "stiller Blick voller Stolz u. Gelassenheit / quiet look of pride and serene calmness",
    "durchdringender intensiver Fokus und stolze Ruhe / piercing intense focus with proud majestic stillness",
    "melancholisch wacher Geist, zerzaust und kreativ / melancholic vigilant mind, raw chaotic creativity",
    "sanftes, unaufgeregtes Charisma voller Lebensweisheit / soft unhurried charisma, rich in quiet wisdom",
    "unbeugsame Abenteuerlust, wettergegerbt und willensstark / uncompromising adventurous expression, resilient and weathered"
  ],
  subject_details: [
    "komplexe feine Falten um die Augen, tiefmütige Ausstrahlung / complex dry wrinkles around the eyes, deep-set thoughtful posture",
    "wettergegerbte Haut mit feinen Poren, rasiermesserscharf / weathered skin with beautiful fine pores, razor-sharp photographic clarity",
    "porzellanartige Hautstruktur mit weichen Schlagschatten / translucent porcelain skin texture with soft sliding shadows",
    "ausgeprägte Bartstoppeln, feucht schimmernde Augen / prominent sharp facial stubble, moist glinting in the dark irises",
    "unordentliches welliges Haar mit feinen grauen Strähnen / messy wavy hair with individual silver strands standing out in light"
  ],
  styles: [
    "Annie Leibovitz: theatralisches Licht, tiefe Texturen / Annie Leibovitz style, theatrical cinematic lighting, high texture detail",
    "Peter Lindbergh: rohe Emotionen, ungeschminkte Wahrheit / Peter Lindbergh style, raw high-contrast emotional realism, timeless fashion",
    "Richard Avedon: minimaler weißer Hintergrund, brutaler Fokus / Richard Avedon style, harsh minimalist white backdrop, high-tonal studio flash portraiture",
    "Henri Cartier-Bresson: der entscheidende Sekundenbruchteil / Henri Cartier-Bresson style, street split-second candid slice-of-life timing",
    "Irving Penn: skulpturale Körperlichkeit, makellose Stille / Irving Penn style, sculptural fine-art studio setup, pristine composition",
    "Yousuf Karsh: heroisches Charakterlicht, tiefdunkle Schatten / Yousuf Karsh style, monumental character lighting, high-contrast spotlight sculpting",
    "Steve McCurry: überbordende Farbkraft, erzählerische Blicke / Steve McCurry style, rich color world with narrative depth, warm cultural storytelling",
    "Ansel Adams: epische, hyper-strukturierte Zonen-Tiefe / Ansel Adams zone-system styling, high dynamic range rich microcontrast, majestic scale",
    "Vivian Maier: ehrliche Straßenszenen, heimlicher Sucher / Vivian Maier style, candid daily routine, street-corner reflections",
    "Helmut Newton: kühne Eleganz, provokativer Kontrast / Helmut Newton style, bold direct flash high-fashion provocation"
  ],
  mens_clothing: [
    "Vintage Tweed-Wollweste, lockeres weißes Leinenhemd / vintage wool tweed vest over a loose white linen shirt",
    "schwerer dunkelgrauer Wollmantel mit Schal / thick dark gray double-breasted wool overcoat with cashmere scarf",
    "maßgeschneiderter Smoking aus schwarzem Samt / bespoke midnight blue velvet dinner jacket and bow tie",
    "abgenutzte dunkelbraune Lederjacke über einfachem T-Shirt / distressed dark-brown leather bomber jacket",
    "grober handgestrickter Rollkragenpullover / chunky hand-knit fisherman turtleneck sweater in cream wool",
    "klassischer Trenchcoat mit aufgestelltem Kragen / iconic khaki trench coat with turned-up collars"
  ],
  womens_clothing: [
    "schwarzer Seiden-Rollkragenpullover, scharfe Schnittlinien / elegant tight black silk turtleneck with sharp outlines",
    "Vintage-Wollkleid mit aufwendiger Spitzenborte / vintage-inspired structure wool dress with delicate lace detailing",
    "schwebendes Kleid aus fließendem Chiffon / ethereal flowing silk chiffon gown",
    "maßgeschneiderter anspruchsvoller Hosenanzug / tailored power-shoulder charcoal pantsuit",
    "grobe rustikale Leinentunika, dezenter Schmuck / rustic handmade linen tunic with minimal bronze necklaces",
    "schwere Lederjacke mit asymmetrischem Reißverschluss / classic asymmetric dark motorcycle leather jacket"
  ],
  lighting: [
    "Rembrandt-Licht mit dem charakteristischen Lichttreieck / classic Rembrandt lighting setup with a prominent warm triangle on cheek",
    "weiches von der Seite einfallendes Tageslicht / natural soft side window light with fine shadow fall-off",
    "hartes vorderseitiges Ringblitzlicht mit dramatischer Vignette / direct ring-flash shadow-free hard illumination",
    "goldenes schmeichelndes Sonnenlicht der Gegenlichtstunde / warm back-lit sunset rim light, cinematic lens flares",
    "mystisches gedämpftes Kerzenlicht mit warmem Flackern / flickering single candle illumination, rich warm amber shadows",
    "kühles, schwaches, diffuses Mondlicht / cool pale moonlight glow with high silver reflections on wet surfaces",
    "theatralischer Spotlight-Spot direkt von oben / dramatic overhead spotlight creating high dramatic shadows"
  ],
  backgrounds: [
    "rauchiger, strukturierter dunkelgrauer Hintergrund / smoky hand-painted dark gray canvas studio drop",
    "unscharfe Stadtschlucht mit glitzernden Lichtern / beautiful creamy bokeh of urban street lights in rain",
    "düsteres Holzgetäfel eines alten Ateliers / dark wood-paneled walls of a historic library studio",
    "raue Betonwand mit feinen Rissen und Flechten / industrial raw concrete texture with cracks and water damage",
    "weichgezeichnetes Laubdach im Nebel / soft out-of-focus forest canopy under morning fog",
    "minimalistischer, schneidend weißer Fotohintergrund / pristine high-key stark white infinite studio setting"
  ],
  props: [
    "eine filigrane historische Messingkamera in der Hand / holding an antique brass mechanical camera",
    "eine brennende Zigarette mit dünnem Rauchfaden / holding a burning cigarette with a fine wisp of blue smoke",
    "ein Stapel vergilbter handgeschriebener Briefe / holding a stack of yellowed handwritten historical letters",
    "eine vintage Brille mit runden Gläsern auf der Nase / wearing vintage round wire-rimmed spectacles",
    "ein Fernglas aus Messing um den Hals / leather-strapped vintage brass binoculars around the neck"
  ],
  ambiance: [
    "nostalgische Melancholie eines regnerischen Sonntags / nostalgic melancholy of a foggy rainy Sunday",
    "geheimnisvolle Konzentration eines nächtlichen Ateliers / mysterious dark quietude of a midnight workshop",
    "warme Vertrautheit einer historischen Bibliotheksstube / warm intellectual luxury of a historic library nook",
    "rohe Abenteuerlust einer windigen Bergkuppe / raw windy freshness of a highland mountain ridge",
    "surreale Ruhe einer verlassenen Fabrikhalle / painterly stillness of an abandoned industrial loft"
  ],
  age_range: [
    "jung (20er), voller Neugierde und Frische / young adult (20s), full of curious energy and hope",
    "reif (40er), charakterstark und erfahren / mature (40s), seasoned character with fine sharp lines",
    "weise gealtert (70er), voller Lebenserfahrung / old-age wisdom (70s), weathered deep storytelling wrinkles",
    "zeitlos, alterslos faszinierend / timeless, ageless striking features with classical proportions"
  ],
  effects: [
    "ausdrucksstarker Lith-Print mit verblockten Tiefen / graphic lithographic photo print style with high-contrast borders",
    "Selen-Donung mit kühlen Schatten und purpurner Dichte / selenium-toned archival print color profile, rich shadow depth",
    "Sepia-Tonung der Frühtage der Fotografie / warm gold-toned sepia print vintage appearance",
    "klassischer Silbergelatine-Dunkelkammerkontrast / silver-gelatin pristine manual darkroom enlargement look",
    "Cyanotypie-Blau mit sandfarbenen Rändern / cyanotype blueprint style with organic brush borders"
  ],
  post_processing: [
    "Historischer Lith-Entwickler (Lith-Auszugsprozess mit infektiöser Entwicklung) / historical Lith development (infectious high-contrast black shadows, warm chalky highlights, and graphic grain borders)",
    "Nasse Kollodium-Glasplatte (historisches nasses Kollodion-Verfahren) / Wet plate collodion silver-dye glass plate process with dramatic silvering, edge artifacts, and chemical stains",
    "Vandyke Brown (historischer Eisensilber-Braundruck auf Baumwollkarton) / Vandyke Brown historic contact process (deep hand-coated chocolate-amber shadows and natural brushmargins)",
    "Platin-Palladium-Edeldruck (Handbeschichteter Platinabzug für weiche Tonskalen) / Platinum-palladium hand-coated contact print (tactile cotton textures, infinite gray scale transitions)",
    "Cyanotypie-Blaudruck (Edeldruck-Zitronensäurebad für tiefe Indigo-Blautöne) / Cyanotype contact blueprint process (pristine Berlin blue shades, hand-painted liquid borders, and textured paper fibers)",
    "Albumin-Eiweiß-Silberabzug (Klassischer Seidenglanz von 1850) / Albumen print historic paper process (warm cream yellow albumin sheen and soft shadow richness)",
    "Salzdruck-Verfahren (Talbotypie Salzpapier-Handabzug von 1840) / Salted paper print historic process from 1840 (matte organic surface, reddish-brown tones, and soft detail)",
    "Argentyper (Experimentelle physische Silberkrustenabsetzung) / Argentyper experimental physical silver crystallization (raw metallic luster and edge irregularities)",
    "Rodinal-Entwickler, kornbetont u. rasiermesserscharf / developer chemistry: Rodinal (para-aminophenol) for enhanced grain outline and maximum acutance",
    "Kodak D-76, ausgewogen und neutral / developer chemistry: Kodak D-76 (hydroquinone-metol) gold-standard balanced grain and grey spectrum",
    "Kodak HC-110, extrem satte Kontraste / developer chemistry: Kodak HC-110 liquid concentrate for rich chemical blacks and high contrast",
    "PMK Pyro gerbende Lichtertrennung / developer chemistry: PMK Pyro stain chemistry for unique green-yellow shadow modulation and vintage lights",
    "Pyrocat-HD 3D-Kantenwirkung / developer chemistry: Pyrocat-HD staining developer for incredible three-dimensional microcontrast",
    "C-41 Labor-Maschinenentwicklung / chemical lab process: state-of-the-art C-41 color machine development with neutral color fidelity",
    "E-6 Labor-Diaentwicklung / chemical lab process: professional E-6 reversal multi-bath slide development for vibrant glow",
    "ECN-2 Hollywood-Kinoentwicklung / chemical lab process: Kodak ECN-2 motion-picture process with soft movie print curve",
    "Bayer-Muster Digitalentwicklung / development: standard digital camera sensor conversion with high-end color grading"
  ],
  poses: [
    "direkter, unerschütterlicher Blick in die Linse / looking directly into the camera lens with unwavering focus",
    "Dreiviertel-Porträt, nachdenklich zur Seite blickend / three-quarter profile looking thoughtfully off-camera",
    "aufgestütztes Kinn auf der Hand, konzentriert / chin resting on hand with an intellectual posture",
    "im Profil stehend, den Kragen hochgeschlagen / standing in full profile with a turned-up scarf collar",
    "entspannt angelehnt, die Arme verschränkt / leaning comfortably against a post with folded arms"
  ],
  cultural_elements: [
    "traditioneller irischer Tweed-Schal / authentic heavy Irish green tweed scarf",
    "japanischer minimalistischer Kimono / traditional indigo-dyed Japanese cotton folk kimono",
    "marokkanische kunstvoll bestickte Djellaba / Moroccan wool djellaba with fine tribal embroidery details",
    "nordische dicke Fjäll-Strickweste / heavy hand-knit Scandinavian wool sweater with traditional patterns",
    "bayerischer wetterfester Lodenmantel / Tyrolean wilderness traditional wool loden jacket"
  ],
  time_periods: [
    "Klassische Moderne der 1920er / Roaring 1920s jazz age, flapper style, art deco luxury",
    "Goldene Filmära der 1950er / Cinematic 1950s film-noir aesthetic, dramatic film studio lighting",
    "Kühne Revolution der 1970er / Bohemian 1970s seventies style, polaroid warmth, soft flare",
    "Minimalistische Ästhetik der 1990er / Grungy peak-90s minimalism, desaturated high contrast commercial style",
    "Zeitlose Gegenwart / contemporary modern timeless photojournalism"
  ],
  weather_conditions: [
    "dichter kühler Hochlandnebel / blanket of cool heavy highland fog",
    "leicht fallender, glitzernder Dauerschnee / light glittering powdery snowfall",
    "strömenender Regen mit reflektierendem Asphalt / heavy pouring rain with glistening street puddles",
    "aufziehendes dramatisches Gewitter, windgepeitscht / incoming thunderstorm with dramatic dark cloud formations",
    "strahlender Sonnenschein mit harscher Lichtwirkung / bright midday summer sun with direct contrast lines"
  ],
  emotional_depth: [
    "stille Melancholie in den Augenwinkeln / a touch of quiet melancholia in the corners of eyes",
    "stolze Gelassenheit einer weisen Person / proud self-assured serene clarity of a master mind",
    "durchdringende Entschlossenheit / piercing look of fierce and absolute determination",
    "sanfte, verträumte Nachdenklichkeit / soft dreamy thoughtfulness, deep inner contemplation",
    "historisch gealtertes Vermächtnis / weathered look carrying a heavy historic legacy"
  ],

  // NEW THEMATIC INVENTORIES
  landscape_subjects: [
    "schroffe Klippen vor stürmischem Ozean / rugged granite cliffs facing a wild stormy ocean with rising spray",
    "nebelverhangener Kiefernwald im herbstlichen Hochland / fog-draped towering pine forest in the wet autumn highlands",
    "majestätische Alpengipfel mit eisigen Gletschern / majestic snowcapped alpine peaks with massive jagged icy glaciers under a sharp sky",
    "goldene Sanddünen der Wüste bei windigem Wetter / sweeping golden desert sand dunes moving in the wind under a low-lying sun",
    "glasklarer Bergsee mit perfekter Wald-Spiegelung / crystal-clear mountain lake with perfect glassy reflection of dense pine woods",
    "mystische moosbedeckte Vulkankrater in Island / otherworldly moss-covered volcanic craters in Iceland with small steam vents",
    "einsame Felskante mit verwittertem altem Leuchtturm / lonely wave-battered cliff featuring a weathered brick lighthouse at dawn",
    "tiefe Schlucht mit reißendem Bergfluss im Nebel / deep geologic canyon with a rushing turquoise mountain river in heavy mist",
    "malerisches Feld voller Lavendel unter sanfter Sonne / rolling rows of violet lavender fields in Provence during sunrise",
    "arktische Tundra unter schimmerndem Polarlicht / barren subarctic tundra plains beneath shimmering green curtain aurora borealis"
  ],
  street_subjects: [
    "einsamer Fußgänger unter nasser Straßenlaterne / a lonely pedestrian in a trenchcoat walking under a wet streetlamp at night",
    "geschäftiges Straßencafé im herbstlichen Paris / a bustling crowded sidewalk cafe in Paris with autumn leaves on tables",
    "historische Straßenbahn in den engen Gassen Lissabons / a vintage yellow tram squealing through the narrow stone-paved alleys of Lisbon",
    "ein alter Mann liest Zeitung auf einer Parkbank / an elderly grandfather reading a vintage newspaper on a peaceful park bench",
    "spielende Kinder im glitzernden Wasser eines Hydranten / children playing in the splash of a high-pressure fire hydrant in Brooklyn",
    "nächtlicher Marktstand in den engen Gassen von Tokio / a tiny atmospheric market stall in the neon-lit backalleys of Tokyo in rain",
    "Straßenmusiker mit verwitterter Geige im U-Bahn-Schacht / street musician playing a weathered violin near a tiled dark subway entrance",
    "Spiegelung von Art-Deco-Häusern in einer Asphaltpfütze / beautiful reflection of historic art-deco buildings in a dark puddle on asphalt",
    "Fischhändler preist lautstark frische Ware an / fishmonger shouting praise for fresh catch in a busy outdoor fish market",
    "cinematisches gelbes Taxi fährt vorbei im Regen / a classic yellow cab driving fast on wet reflecting streets zoom panning"
  ],
  seasons: [
    "Frühling: blühende Kirschbäume und zartes Grün / Spring: blooming cherry blossoms, soft pink petals, and wet tender foliage",
    "Sommer: flirrende Hitze, blauer Himmel, sattes Licht / Summer: shimmering heatwaves, intense direct vertical sunlight, rich green plants",
    "Herbst: goldene Laubwälder, erdiger feuchter Boden / Autumn: golden-brown falling leaves, wet earth, and heavy early morning mist",
    "Winter: unberührter Altschnee, gefrorene Äste und Eis / Winter: pristine deep snow cover, frozen branches, frost patterns, and cold clear air"
  ],
  times_of_day: [
    "Goldene Stunde (Kurz vor Sonnenuntergang) / Golden hour sunset with soft long shadows and warm orange light",
    "Blaue Stunde (Kurz nach Sonnenuntergang) / Blue hour twilight with an ambient dark blue sky and glowing street lamps",
    "Morgengrauen (Sanftes, diffuses Erwachen) / Early dawn with soft pale morning mist and cool diffused light",
    "Mittagssonne (Harte Schatten, strahlende Sättigung) / Brand midday light with harsh vertical shadows and extreme high-contrast",
    "Mitternacht (Spärliches, hartes Kunstlicht) / Midnight darkness with high-contrast ambient streetlights and dark skies",
    "Mondschein-Nacht (Silberner Glanz) / Moonlit night with a bright full moon casting a soft silver glow over surfaces"
  ],
  camera_elevations: [
    "Froschperspektive (Blick von unten) / Low-angle shot looking up, emphasizing massive scale and sweeping grandeur",
    "Augenhöhe (Realer, dokumentarischer Blick) / Balanced eye-level view, natural human perspective for reportage",
    "Vogelperspektive (Erhöhte Kamerasicht) / High-angle shot looking down, mapping out the scene's spatial details",
    "Luftaufnahme / Drohnen-Perspektive / Sweep aerial drone perspective, expansive high-altitude overview mapping"
  ],
  object_subjects: [
    "antike mechanische Schreibmaschine auf Holztisch / antique mechanical typewriter resting on a dark walnut wood table",
    "verstaubte vintage Handkamera mit Balg / dusty vintage folding bellows camera inside an old storage drawer",
    "eine einzelne, welke weiße Rose in Apothekerflasche / a single wilted white rose in a brown glass apothecary bottle",
    "historisches Taschenuhrwerk mit Zahnrädern / intricate gears of a historic open-faced pocket watch",
    "alte ledergebundene Bücher u. eine brennende Kerze / a stack of weathered leather-bound books next to a flickering beeswax candle",
    "handgemachtes Keramikgefäß im weichen Seitenlicht / organic handmade ceramic vase caught in a soft side spotlight",
    "paar abgetragene alte Lederstiefel auf Dielen / a pair of scuffed vintage leather worker boots on rustic wood floorboards",
    "rostiger Eisenschlüssel auf rauem Granitstein / a heavy rusty iron key resting on coarse natural granite",
    "eine halbe, reife Feige auf handgefertigtem Leinen / a halved ripe dark fig on textured hand-spun linen fabric",
    "historischer Globus aus Messing im Halbdunkel / vintage brass table globe on a stand showing old world cartography lines"
  ],
  expired_papers: [
    "Agfa Brovira (Abgelaufen 1978), harter Silberkontrast mit Gelbschleier / Agfa Brovira vintage cold-tone paper, expired in 1978, dramatic warm fog with silver bronzing in deep blacks",
    "Kodak Royal (Abgelaufen 1989), samtige Sättigung mit organischen Altersrändern / Kodak Royal premium color paper, expired in 1989, warm cream whites and unpredictable developer streaks",
    "Orwo Baryt (Abgelaufen 1982), raue Oberfläche und ungleichmäßiges Grauspektrum / Orwo classic double-weight baryta fiber paper, expired in 1982, gritty gray transitions and yellowed paper margins",
    "Guilleminot Bromure (Abgelaufen 1965), weiche, malerische Silbereffekte / Guilleminot Bromide French vintage paper, expired in 1965, romantic silver haze and dramatic edge yellowing",
    "Ilford Galerie (Abgelaufen 1995), abgeflachter Kontrast mit silbrigem Glanz / Ilford Galerie premium paper, expired in 1995, subtle vintage oxidation with light-leak clouding",
    "Leonar Baryt (Abgelaufen 1971), extreme Warmton-Ausbleichung / Leonar cream warm-tone baryta paper, expired in 1971, solarized borders and intense chemical aging marks",
    "Foma Fomaspeed (Abgelaufen 1990), grünbrauner Schleier u. kontrastarme Mitteltöne / Fomaspeed warm-tone classic resin-coated paper, expired in 1990, muddy green-brown highlights"
  ],
  expired_films: [
    "Kodak Tri-X 400 (Abgelaufen 1975), extremes biologisches Rußkorn und unberechenbare Verwaschungen / Kodak Tri-X dynamic panchromatic manual film, expired in 1975, immense organic soot grain and unpredictable density stains",
    "Fuji Superia 400 (Abgelaufen 1996), feuchtes Moosgrün in den Schatten u. verblasste Rottöne / Fuji Superia 400 consumer color stock, expired in 1996, shifted mossy green shadows and low dynamic range portrait colors",
    "Kodachrome 64 (Abgelaufen 1982), magische Rotverschiebungen u. dichte Vintage-Dunkelkammerfarben / Kodachrome 64 classic reversal film, expired in 1982, deep bronze-red color cast and intense historical grain structure",
    "Ferrania P30 (Abgelaufen 1968), tiefe, fast opake Kohleschatten u. raues Filmkorn / Ferrania P30 cinematic high-silver black-and-white stock, expired in 1968, dramatic ink-black values and extreme contrast",
    "Agfacolor CT 18 (Abgelaufen 1972), sandfarbene Sättigung mit blaugrünem Abzweig / Agfacolor CT 18 vintage slide stock, expired in 1972, faded warm yellows and cold cyan-green cross-process style shift",
    "Kodak Ektachrome 200 (Abgelaufen 1985), ausgeblichene Himmelstöne u. Magenta-Schatten / Kodak Ektachrome 200 slide stock, expired in 1985, desaturated pastel sky blues and deep violet-magenta shaded areas",
    "Ansco Super Hypan (Abgelaufen 1961), roher, grobkörniger Silberglanz des Jazz-Alters / Ansco Super Hypan legendary ultra-speed press film, expired in 1961, extreme charcoal-like texture and faded edge light-leaks"
  ]
};

export const translationsData = {
  Deutsch: {
    prompt_prefix_outdoor_bw: "Ein Schwarz-Weiß-Außenporträt",
    prompt_prefix_outdoor_color: "Ein farbiges Außenporträt",
    prompt_prefix_bw: "Ein Schwarz-Weiß-Porträt",
    prompt_prefix_color: "Ein farbiges Porträt",
    prompt_of: "von",
    prompt_and: "und",
    prompt_wearing: "bekleidet mit",
    prompt_in: "in",
    prompt_expression: "Ausdruck:",
    prompt_captured_with: "aufgenommen mit",
    prompt_on: "auf",
    prompt_style: "Stil:",
    prompt_background: "Hintergrund:",
    prompt_prop: "Requisite:",
    prompt_ambiance: "Stimmung:",
    prompt_post_processed: "nachbearbeitet mit",
    prompt_effect: "Gesamtwirkung:",
  },
  English: {
    prompt_prefix_outdoor_bw: "A black-and-white outdoor portrait",
    prompt_prefix_outdoor_color: "A color outdoor portrait",
    prompt_prefix_bw: "A black-and-white portrait",
    prompt_prefix_color: "A color portrait",
    prompt_of: "of a",
    prompt_and: "and",
    prompt_wearing: "wearing",
    prompt_in: "in the",
    prompt_expression: "Expression:",
    prompt_captured_with: "captured with",
    prompt_on: "on",
    prompt_style: "Style:",
    prompt_background: "Background:",
    prompt_prop: "Prop:",
    prompt_ambiance: "Ambiance:",
    prompt_post_processed: "processed with",
    prompt_effect: "Overall effect:",
  }
};
