# Analog-Studio Prompt Builder – Professional Photographic Formula Console for AI Image Generators

Welcome to the **Analog-Studio Prompt Builder** ([GitHub Repository](https://github.com/wobushannes/analog-prompt-generator)), an exquisite and highly-tactile offline prompt synthesis workbench designed specifically to construct pristine, high-fidelity analog photography recipes for modern generative AI design models (including **Flux.1**, **Midjourney v6**, **Stable Diffusion XL/SD3**, and **Pony-based checkpoints**).

This responsive, premium, dark-studio dashboard completely untangles the complex nomenclature of physical photographic systems, bringing genuine vintage and historical camera hardware, lenses, expired film stocks, darkroom chemical baths, and coarse-grain papers directly to your digital workspace.

---

## 🎨 Why Use Analog-Studio prompts on Civitai?

Generative models are incredibly sensitive to authentic photographic tokens. When you write standard prompts like `"film photo, ultra-detailed, portrait"`, current models yield generic, high-contrast, cartoonish digital outputs. 

**Analog-Studio** solves this by injecting physically-authentic keywords and structural clauses:
*   **Optics Matching**: Linhof Master Technika 4x5, Hasselblad 500C, or Leica M3 paired with their correct historical lenses (e.g. Rodenstock Apo-Sironar-S 150mm, Zeiss Planar 80mm f/2.8).
*   **Morbid Chemistry**: True decayed chemical behavior including actual expired film stocks (like expired 1975 Kodak Tri-X or vintage 1989 Agfachrome) and expired enlarging papers (Agfa Brovira 1978, Guilleminot Bromure, Orwo Baryt) to introduce organic soot grains, mold stains, and unpredictable density shifts.
*   **Historic Print Processes**: Hand-coated Vandyke brown, classic cyanotypes, wet-plate collodion, and Lith printing to synthesize unparalleled tonal depth.

---

## 🔥 Key Product Features

### 1. Three Precision Crafting Domains
*   **Portrait (Porträt)**: Build intricate subject personas with age range, traits, anatomical focus, period wardrobe (e.g., 1920s jazz, flapper, retro), expression, and specific poses.
*   **Landscape (Landschaft)**: Choose topographical themes, seasonal settings, precise times of day (dawn, celestial twilight), and weather configurations.
*   **Objects & Still Life**: Configure primary objects, studio fabric backdrops, secondary props, and specific studio lighting setups.

### 2. Dual-Paradigm Orchestration Modes
*   **The Tactile Wizard (StudioWizard)**: Walk through a step-by-step panel sequence of options. Clean selectors, toggle checkboxes for inclusions, and immediate output updates.
*   **The Conversational Alchemist (StudioDialog)**: Answer interactive, step-by-step questions inside an offline dialog coach. Enter your own customized overrides or tap on fast predefined suggestion chips.

### 3. Integrated "Copy as Markdown" Feature
Easily paste your amazing creations directly on Civitai, Discord, or prompt sharing sites with the **Copy as Markdown** button. It outputs a beautifully formatted block with all technical metadata (camera, lens, film stock, paper type, negative prompt) included automatically!

---

## ⚙️ How to Install & Run the Studio Dashboard Locally

You can run this beautiful workbench completely offline on your own machine. It has zero external server dependencies, protecting your privacy.

### Prerequisites
Make sure you have **Node.js (v18 or higher)** installed on your operating system.

### Step-by-Step Local Deployment

1.  **Extract or Clone the Repository**:
    Clone the official repository or extract your downloaded archive file:
    ```bash
    git clone https://github.com/wobushannes/analog-prompt-generator.git
    cd analog-prompt-generator
    ```

2.  **Install Required Dependencies**:
    Run the standard npm installation tool to populate the package tree:
    ```bash
    npm install
    ```

3.  **Launch the Development Studio Server**:
    Start the ultra-fast Vite dev manager:
    ```bash
    npm run dev
    ```

4.  **Access the Console in Your Web Browser**:
    Open your web browser and navigate to:
    ```
    http://localhost:3000
    ```
    *(If port 3000 is occupied, the console will safely bind to the next available port shown in your terminal shell).*

5.  **Compile the Standalone Static App** (Optional):
    If you want to package the app as a single static webpage that you can open locally from anywhere with no terminal needed:
    ```bash
    npm run build
    ```
    Vite will generate a bundled, optimized build inside the `/dist` directory. You can host this folder on any static provider (e.g. GitHub Pages) or simply open `dist/index.html` on your desktop.

---

## ⚠️ Model Limitations & Custom Trained Hardware

Because standard base models (like SDXL, SD 1.5, or even Flux.1) are not always perfectly or accurately trained on real historical camera hardware, obscure medium/large format lenses, or complex darkroom developer chemical combinations, you may experience occasional aesthetic deviations from true physical chemistry. 

To bridge this gap and achieve authentic grain, true historical accuracy, and tactile physical emulsions, specialized custom training is often necessary. You can find high-fidelity, customized custom LoRAs and photographic checkpoints trained specifically on these physical formulas and gear over on my profile:
👉 **[wobushannes325 on Civitai](https://civitai.com/user/wobushannes325/models)**

---

## 💡 Pro Tips for Civitai Posts
*   **Share Your Full Markdown Recipe**: AI enthusiasts love seeing the exact analog setup. Always use the *Copy as Markdown* button to format your shared images!
*   **Fine-Tune Weightings**: Some Stable Diffusion checkpoints need stronger attention weights for expired items. (e.g. `(expired film stock Kodak Tri-X:1.2)`) can help punch the granular look.
*   **Contrast Settings**: When using historic developers like *Pyrogallol* or *Vandyke*, adjust your image editor contrast or use a high dynamic range (HDR) LORA for maximum authenticity.

---
*Crafted for the Civitai AI Art Community. Bring organic film nostalgia back to digital generation!*
