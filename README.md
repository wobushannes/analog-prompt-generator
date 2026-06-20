# Silver & Graphite – Analog Darkroom Prompt Studio

A masterfully crafted, high-precision TypeScript & React workbench designed to generate hyper-detailed, physical-emulsion prompts for modern AI image generators (such as Midjourney v6, Flux.1, and Stable Diffusion).

Styled in an elegant, monochromatic **"Cosmic-Slate / Silver & Graphite"** aesthetic, this application targets photographers, digital artists, and AI prompt designers seeking to command the meticulous look and feel of real analog photography.

---

## 🎨 Creative Philosophy & Visual Paradigm

- **Tactile Darkroom Aura**: Crafted with a deep, low-fatigue slate and silver palette, thin borders (`border-white/10`), frosted-glass backdrops, and interactive transitions that mimic traditional processing.
- **Typographic Depth**: Contemporary "Inter" sans-serif layout titles paired with technical "JetBrains Mono" metadata gauges and graceful serifs for fine-art selection menus.
- **Architectural Flow**: Works perfectly across both widescreen desktops and compact mobile portrait views. Generous touch targets (min-44px) prevent miss-clicks, with fluid layout animations driven by React Motion.

---

## ⚡ The 13 Quick Developer Profiles (Instant Analogue Presets)

Located right in the sidebar layout for instant access, the studio comes preloaded with **13 historic, chemistry-accurate Master Presets** modeled after the world's most influential photographers:

1. 📸 **The Leibovitz Cinematic (Annie Leibovitz)**
   - *Vibe*: Rich, deep theatrical studio portraits with painterly shadow depth and majestic tones.
   - *Gear*: Hasselblad 503CW paired with Kodak Portra 160.
2. 🎞️ **Peter Lindbergh Monochrom (Peter Lindbergh)**
   - *Vibe*: Raw, emotive black-and-white realism. Unretouched, pure human presence.
   - *Gear*: Leica M6 Classic paired with high-contrast Kodak Tri-X 400.
3. 🕯️ **Yousuf Karsh Monumental (Yousuf Karsh)**
   - *Vibe*: Highly sculpted, high-density chiaroscuro lighting on dark velvet backdrops.
   - *Gear*: Linhof Master Technika 4x5 on vibrant Kodak Ektachrome E100 slides.
4. 🦓 **Richard Avedon Starkness (Richard Avedon)**
   - *Vibe*: Piercing, head-on portraits against seamless white backdrops with no distracting shadows.
   - *Gear*: Deardorff 8x10 Large Format wooden camera with Kodak Tri-X 400.
5. 🏙️ **Vivian Maier Candid Street (Vivian Maier)**
   - *Vibe*: Intimate 1950s Chicago street snapshots, waist-level perspective with gritty city shadows.
   - *Gear*: Rolleiflex 2.8F Twin-Lens Reflex on Ilford HP5 Plus.
6. 👁️ **Steve McCurry National Geographic (Steve McCurry)**
   - *Vibe*: Saturated, emotional storytelling with glowing, soul-piercing eyes against blurred landscapes.
   - *Gear*: Nikon F3 HP on the legendary, warm Kodachrome 64 slide film.
7. 🕶️ **Helmut Newton High-Gloss Noir (Helmut Newton)**
   - *Vibe*: Provocative, high-fashion storytelling. Hard direct camera-flash halos and luxurious balconies.
   - *Gear*: Hasselblad 500C/M on sleek, cool Fujichrome Provia 100F slides.
8. 🏃 **Henri Cartier-Bresson Decisive (Henri Cartier-Bresson)**
   - *Vibe*: Spontaneous street geometry. Fluid, wind-tousled coats reflecting off wet Parisian cobblestones.
   - *Gear*: Leica M3 rangefinder with Kodak Tri-X 400.
9. ⛰️ **Ansel Adams Zone System (Ansel Adams)**
   - *Vibe*: Majestic, hyper-sharp landscapes utilizing custom exposure zones for breathtaking tone spans.
   - *Gear*: Sinar P2 8x10 monorail camera loaded with fine-grain Fujifilm Neopan 100 Acros.
10. 📐 **Irving Penn Sculptural Gray (Irving Penn)**
    - *Vibe*: Minimalist, graphic geometry. Subject is posed inside a narrow gray corner under soft north-light window glow.
    - *Gear*: Hasselblad 500C/M on fine-grain Kodak Plus-X 125.
11. 🏺 **Sally Mann Gothic Wet Plate (Sally Mann)**
    - *Vibe*: Haunting Southern Gothic wet-plate collodion portraits, complete with silver-mirroring stains and soft Petzval swirl bokeh.
    - *Gear*: Graflex Speed Graphic 4x5 vintage press camera processed on direct wet glass plates.
12. 🎖️ **Robert Capa Gritty Reportage (Robert Capa)**
    - *Vibe*: Dynamic, historical photojournalism. Kinetic motion, thick silver-halide grain and splattered mud.
    - *Gear*: Nikon FM2n capturing active historical events on raw Kodak Tri-X.
13. 🍭 **Andy Warhol Polaroid SX-70 (Andy Warhol)**
    - *Vibe*: Flamboyant, flat-flash pop art of the 1970s Factory scene. Decayed cream borders and vintage orange color shifts.
    - *Gear*: Yashica Mat 124G TLR outputting onto instant Polaroid SX-70 Time-Zero.

---

## ⚡ Real-Time Dual Prompt Compiler Engines

The darkroom automatically compiles two distinct mathematical prompt strategies in parallel:

### 1. Flux & SDXL Style (Natural Language Prosaic)
- **Concept**: Highly expressive English sentences weaving hardware, lenses, and ambient characteristics together organically (e.g., *"A stunning analog portrait shot using a classic medium format camera to capture the fine silver-halide grain..."*).
- **Target**: Built for modern LLM-driven diffusion models that require conversational context to establish depth.

### 2. Midjourney & SD1.5 Style (Token-Tag Matrix)
- **Concept**: Highly dense, tag-spaced, tokenized keyword prompt structures emphasizing parameters, lighting modifiers, and custom execution parameters (e.g., `portrait, raw analogue photo, Hasselblad 500C/M, volumetric side lighting, 8k --ar 4:5 --v 6.0`).
- **Target**: Built for classic generation models requiring explicit algorithmic weighting.

---

## ⏱️ Historical Exposure Log & Comparative Diff Analyzer

The app features an advanced session-level chronological log:
- **Automatic Auto-Saves**: Logs up to your last 10 darkroom experiments.
- **Mechanical Parameter Shift Display**: Detects and highlights modified camera, lens, style, or film adjustments side-by-side with semantic color feedback (Red for removed items, Emerald for added).
- **LCS Differential Comparison**: Integrates a highly responsive, custom-programmed Longest Common Subsequence (LCS) algorithmic analyzer to highlight character/word-level changes between any two compiled prompts.

---

## 🚀 Setting Up the Studio Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Boot up Development Server (with Hot Reloading)
```bash
npm run dev
```

### 3. Build Production Bundles
```bash
npm run build
```

The compiled SPA static assets will print cleanly into the `/dist` directory, fully optimized for fast static deployment.

---

## ⚖️ Disclaimer & Contact

> [!WARNING]
> **No Support Offered (Kein Support)**  
> This code is provided **strictly "as is" without warranty or supportive SLA** of any kind. You are fully encouraged to fork, tinker, break, and rebuild this workbench as you see fit.
>
> However, I love seeing what people create with this! If you run into creative problems, want to share some synthesized masterpiece layouts, or just want to network and talk shop:
> - **Feel free to send a Direct Message (DM) anytime!** Let's connect over fine-art design.
