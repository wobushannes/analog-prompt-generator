# Silver & Graphite – Analog Darkroom Prompt Studio

A highly crafted, professional and responsive TypeScript & React workbench designed for compiling hyper-precise, granular prompt recipes for advanced AI image generators (such as Midjourney v6, Flux.1, and Stable Diffusion).

Styled in an **Elegant Dark / Silver & Graphite** tactile console theme, this workbench focuses specifically on the nuanced, authentic aesthetics of vintage and analog lifestyle portraiture and landscape photography.

---

## 🎨 Design Philosophy & Theme

*   **Tactile Dunkelkammer Aesthetic**: Styled with a monochromatic cosmic-slate palette, ultra-fine white/10 borders, responsive glass backdrops, and interactive grain overlays reminiscent of high-silver-gelatin emulsions.
*   **Aesthetic Pairings**: Clean high-contrast, modern "Inter" sans-serif layout titles paired with "JetBrains Mono" metadata flags and classic serif styling for photographic option selections.
*   **Layout Fluidity**: Designed for desktop precision and mobile elasticity. Built with a responsive grid layout, flex-item clip protections, and scroll boundaries that avoid overlap or overflow.

---

## 🔒 100% Offline & Local Privacy (Uncompromising Architecture)

In accordance with strict security standards, this workbench operates **entirely clientside**. 
*   **No external API calls, third-party libraries, tracking pixels, or AI model endpoints** are utilized.
*   All photographic knowledge, translation engines, variation mutation algorithms, and step-by-step logic sheets are computed on raw offline taxonomies compiled in local TypeScript assets.
*   Your descriptions and crafted presets remain securely protected inside your local sandbox.

---

## ⚙️ Core Capabilities & Advanced Workflows

### 1. Granular Photography Scenarios
The generator is highly optimized for three distinct photographic domains, providing distinct customized parameters and tailored dynamic prompt generation:
*   **Portrait (Porträt)**: Detailed settings for gender, age, facial expressions, attire styles, periods (e.g., 1920s jazz, flapper, classic couture), and anatomical focuses.
*   **Landscape (Landschaft)**: Dedicated selectors for topographic features, vegetation density, specific celestial times, and weather/meteorological conditions.
*   **Objects (Sachfotografie & Stillleben)**: Tailored parameters for texture detailing, object placements, material surfaces (wood, glass, rusted metals), and rustic props.

### 2. Dual-Paradigm Interactive Assistants
Unbelievably versatile interfaces guide both rapid builders and conceptual creators:
*   **The Click-Wizard (StudioWizard)**: A structured step-by-step digital process board. Tap through hardware optics, film emulsions, lighting setups, and paper choices to click together a pristine setup in seconds.
*   **The Conversational Alchemist (StudioDialog)**: A local conversational workflow. Walk through an active chemical sequence chat, answering tailored prompt design questions verbally or via fast predefined suggestion keys.

### 3. Extensive Polaroid & Specialty Formats
We support massive collections of camera systems including:
*   **Instant Polaroid Formats**: SX-70 manual compacts, modern i-Type, 600 Monochrome nostalgic direct, and Fuji FP-100C legendary peel-apart packfilm.
*   **Specialty Hardware**: Linhof Master Technika 4x5, Großformat field bellows cameras, wet-plate glass plates, and toy mechanical optics.

### 4. Raw Emulsions & Paper Chemistry
A massive darkroom suite for developing profile options:
*   **Wet Processes**: Vandyke hand-coated brown, Lith prints, Pyrogallol tanning developers, cyanotype sun-prints, and albumen historic emulsions.
*   **Vintage Aged Paper Stocks**: Agfa Brovira (1978 yellowed silver), Guilleminot Bromure French vintage bromide, Orwo Baryt (1982 coarse gray), and Leonar Baryt (1971 extreme warm-out).

---

## 🛠️ Directory Structure

*   `src/App.tsx`: Main orchestrator, containing prompt compiling formulas, dual-language engines, and scenario forms.
*   `src/data.ts`: Deep photographic database detailing all cameras, films, papers, and processing chemistry translations.
*   `src/components/StudioWizard.tsx`: Step-by-step tactile wizard board with full list navigation.
*   `src/components/StudioDialog.tsx`: Dialog-driven step-by-step master alchemist sheet.
*   `src/types.ts`: Strictly-typed models (`SavedPrompt`, `PresetRecipe`).

---

## 🚀 Setup & Execution

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Developer Workbench
```bash
npm run dev
```

### 3. Compile Production Bundle
```bash
npm run build
```
The application compiles into static files inside the `/dist` directory.
