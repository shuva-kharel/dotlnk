import type { Theme } from "@/types/theme";

export const midnight: Theme = {
  id: "midnight",
  name: "Midnight",
  category: "Dark",
  description: "Deep black with subtle blue accents and glass cards",
  fonts: {
    heading: '"Space Grotesk", sans-serif',
    body: '"Inter", sans-serif',
    mono: '"JetBrains Mono", monospace',
  },
  colors: {
    bg: "#080b14",
    bgAlt: "#0d1220",
    text: "#c7d0e0",
    textMuted: "#6b7491",
    textHeading: "#f0f4ff",
    accent: "#4b8dff",
    accentSoft: "rgba(75,141,255,0.12)",
    card: "rgba(20,27,45,0.6)",
    cardHover: "rgba(28,37,61,0.8)",
    border: "rgba(75,141,255,0.15)",
  },
  card: {
    radius: "20px",
    border: "1px solid var(--lf-border)",
    shadow: "0 8px 32px rgba(0,0,0,0.4)",
    padding: "20px 24px",
    blur: "14px",
  },
  background: {
    type: "glow",
    accentGlow:
      "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(75,141,255,0.18), transparent 70%)",
    layers:
      "radial-gradient(ellipse 60% 50% at 20% 110%, rgba(75,141,255,0.08), transparent 70%)",
  },
  linkHover: { scale: "1.02", translateY: "-2px" },
  transitions: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
};

export const aurora: Theme = {
  id: "aurora",
  name: "Aurora",
  category: "Neon",
  description: "Animated aurora gradients with glowing cards",
  fonts: {
    heading: '"Space Grotesk", sans-serif',
    body: '"Inter", sans-serif',
  },
  colors: {
    bg: "#06080f",
    bgAlt: "#0a0e1a",
    text: "#d4e0f0",
    textMuted: "#7a8aa8",
    textHeading: "#ffffff",
    accent: "#22d3ee",
    accentSoft: "rgba(34,211,238,0.12)",
    card: "rgba(15,22,38,0.55)",
    cardHover: "rgba(20,30,50,0.75)",
    border: "rgba(34,211,238,0.2)",
  },
  card: {
    radius: "20px",
    border: "1px solid var(--lf-border)",
    shadow: "0 8px 40px rgba(34,211,238,0.08), 0 2px 8px rgba(0,0,0,0.4)",
    padding: "20px 24px",
    blur: "16px",
  },
  background: {
    type: "aurora",
    speed: "18s",
    layers:
      "radial-gradient(at 20% 30%, rgba(34,211,238,0.25) 0px, transparent 50%), radial-gradient(at 80% 20%, rgba(168,85,247,0.22) 0px, transparent 50%), radial-gradient(at 60% 80%, rgba(59,130,246,0.2) 0px, transparent 50%)",
  },
  linkHover: { scale: "1.02", translateY: "-2px" },
  transitions: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
};

export const cyberpunk: Theme = {
  id: "cyberpunk",
  name: "Cyberpunk",
  category: "Neon",
  description: "Neon pink and cyan on dark futuristic surfaces",
  fonts: {
    heading: '"Orbitron", "Space Grotesk", sans-serif',
    body: '"Rajdhani", "Inter", sans-serif',
  },
  colors: {
    bg: "#0a0014",
    bgAlt: "#12001f",
    text: "#e0b0ff",
    textMuted: "#8a6bb0",
    textHeading: "#ff2dd4",
    accent: "#00f0ff",
    accentSoft: "rgba(255,45,212,0.12)",
    card: "rgba(18,0,31,0.7)",
    cardHover: "rgba(26,0,45,0.9)",
    border: "rgba(255,45,212,0.3)",
  },
  card: {
    radius: "4px",
    border: "1px solid var(--lf-border)",
    shadow: "0 0 20px rgba(255,45,212,0.15), 0 0 40px rgba(0,240,255,0.05)",
    padding: "18px 22px",
    blur: "8px",
  },
  background: {
    type: "grid",
    layers:
      "linear-gradient(rgba(255,45,212,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.04) 1px, transparent 1px)",
    accentGlow:
      "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(255,45,212,0.15), transparent 70%)",
  },
  linkHover: { scale: "1.01", translateY: "-1px" },
  transitions: "all 0.2s cubic-bezier(0.16,1,0.3,1)",
};

export const terminal: Theme = {
  id: "terminal",
  name: "Terminal",
  category: "Retro",
  description: "Green monospace on black with terminal aesthetics",
  fonts: {
    heading: '"JetBrains Mono", monospace',
    body: '"JetBrains Mono", monospace',
    mono: '"JetBrains Mono", monospace',
  },
  colors: {
    bg: "#0a0e0a",
    bgAlt: "#0d120d",
    text: "#5fa83f",
    textMuted: "#4a7a32",
    textHeading: "#8eff6b",
    accent: "#8eff6b",
    accentSoft: "rgba(142,255,107,0.1)",
    card: "rgba(13,20,13,0.7)",
    cardHover: "rgba(18,28,18,0.9)",
    border: "rgba(95,168,63,0.25)",
  },
  card: {
    radius: "2px",
    border: "1px solid var(--lf-border)",
    shadow: "none",
    padding: "16px 20px",
  },
  background: {
    type: "scanlines",
    layers:
      "repeating-linear-gradient(0deg, rgba(95,168,63,0.03) 0px, transparent 2px, transparent 4px)",
    accentGlow:
      "radial-gradient(ellipse 90% 60% at 50% 50%, rgba(95,168,63,0.06), transparent 70%)",
  },
  linkHover: { scale: "1", translateY: "0" },
  transitions: "all 0.15s linear",
};

export const ocean: Theme = {
  id: "ocean",
  name: "Ocean",
  category: "Dark",
  description: "Deep blue with cyan accents and soft gradients",
  fonts: {
    heading: '"Space Grotesk", sans-serif',
    body: '"Inter", sans-serif',
  },
  colors: {
    bg: "#061a2e",
    bgAlt: "#082544",
    text: "#b8d6f0",
    textMuted: "#6b9bc0",
    textHeading: "#e8f4ff",
    accent: "#22d3ee",
    accentSoft: "rgba(34,211,238,0.12)",
    card: "rgba(12,40,70,0.6)",
    cardHover: "rgba(16,52,92,0.8)",
    border: "rgba(34,211,238,0.15)",
  },
  card: {
    radius: "24px",
    border: "1px solid var(--lf-border)",
    shadow: "0 8px 32px rgba(0,20,40,0.5)",
    padding: "20px 24px",
    blur: "12px",
  },
  background: {
    type: "gradient",
    layers:
      "linear-gradient(180deg, #061a2e 0%, #082544 50%, #061a2e 100%), radial-gradient(ellipse 70% 50% at 50% 0%, rgba(34,211,238,0.12), transparent 70%)",
  },
  linkHover: { scale: "1.02", translateY: "-2px" },
  transitions: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
};

export const sunset: Theme = {
  id: "sunset",
  name: "Sunset",
  category: "Dark",
  description: "Warm orange, pink, and purple gradient skies",
  fonts: {
    heading: '"Space Grotesk", sans-serif',
    body: '"Inter", sans-serif',
  },
  colors: {
    bg: "#1a0a14",
    bgAlt: "#2a1018",
    text: "#f0d8d0",
    textMuted: "#b88a80",
    textHeading: "#fff5f0",
    accent: "#ff7a59",
    accentSoft: "rgba(255,122,89,0.14)",
    card: "rgba(40,18,28,0.6)",
    cardHover: "rgba(52,24,36,0.8)",
    border: "rgba(255,122,89,0.2)",
  },
  card: {
    radius: "22px",
    border: "1px solid var(--lf-border)",
    shadow: "0 8px 32px rgba(20,5,10,0.5)",
    padding: "20px 24px",
    blur: "12px",
  },
  background: {
    type: "animated-gradient",
    speed: "22s",
    layers: "linear-gradient(135deg, #1a0a14, #2d0f1f, #1f1028, #2a0a18)",
    accentGlow:
      "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255,122,89,0.2), transparent 70%)",
  },
  linkHover: { scale: "1.02", translateY: "-2px" },
  transitions: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
};

export const minimal: Theme = {
  id: "minimal",
  name: "Minimal",
  category: "Minimal",
  description: "Clean white with black text, ultra-refined",
  fonts: {
    heading: '"Inter", sans-serif',
    body: '"Inter", sans-serif',
  },
  colors: {
    bg: "#fafafa",
    bgAlt: "#ffffff",
    text: "#444444",
    textMuted: "#999999",
    textHeading: "#111111",
    accent: "#111111",
    accentSoft: "rgba(17,17,17,0.06)",
    card: "#ffffff",
    cardHover: "#f5f5f5",
    border: "rgba(0,0,0,0.08)",
  },
  card: {
    radius: "16px",
    border: "1px solid var(--lf-border)",
    shadow: "0 2px 8px rgba(0,0,0,0.04)",
    padding: "20px 24px",
  },
  background: {
    type: "solid",
    layers: "",
  },
  linkHover: { scale: "1.01", translateY: "-1px" },
  transitions: "all 0.25s cubic-bezier(0.16,1,0.3,1)",
};

export const paper: Theme = {
  id: "paper",
  name: "Paper",
  category: "Light",
  description: "Off-white editorial with paper card aesthetic",
  fonts: {
    heading: '"Fraunces", serif',
    body: '"Inter", sans-serif',
  },
  colors: {
    bg: "#f4f1ea",
    bgAlt: "#ebe6da",
    text: "#4a4640",
    textMuted: "#8a857c",
    textHeading: "#2a2520",
    accent: "#9a6b3f",
    accentSoft: "rgba(154,107,63,0.1)",
    card: "#fdfbf7",
    cardHover: "#f8f4ec",
    border: "rgba(42,37,32,0.1)",
  },
  card: {
    radius: "12px",
    border: "1px solid var(--lf-border)",
    shadow: "0 1px 3px rgba(42,37,32,0.06), 0 4px 12px rgba(42,37,32,0.04)",
    padding: "20px 24px",
  },
  background: {
    type: "noise",
    layers: "",
  },
  linkHover: { scale: "1.01", translateY: "-1px" },
  transitions: "all 0.25s ease",
};

export const glass: Theme = {
  id: "glass",
  name: "Glass",
  category: "Light",
  description: "Glassmorphism with blurred translucent surfaces",
  fonts: {
    heading: '"Space Grotesk", sans-serif',
    body: '"Inter", sans-serif',
  },
  colors: {
    bg: "#dee5f0",
    bgAlt: "#c9d4e8",
    text: "#3a4555",
    textMuted: "#7a8499",
    textHeading: "#1a2030",
    accent: "#4b8dff",
    accentSoft: "rgba(75,141,255,0.1)",
    card: "rgba(255,255,255,0.5)",
    cardHover: "rgba(255,255,255,0.65)",
    border: "rgba(255,255,255,0.6)",
  },
  card: {
    radius: "20px",
    border: "1px solid var(--lf-border)",
    shadow: "0 8px 32px rgba(30,40,60,0.1)",
    padding: "20px 24px",
    blur: "20px",
  },
  background: {
    type: "aurora",
    speed: "25s",
    layers:
      "radial-gradient(at 20% 20%, rgba(75,141,255,0.35) 0px, transparent 50%), radial-gradient(at 80% 30%, rgba(236,72,153,0.25) 0px, transparent 50%), radial-gradient(at 50% 80%, rgba(34,211,238,0.25) 0px, transparent 50%)",
  },
  linkHover: { scale: "1.02", translateY: "-2px" },
  transitions: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
};

export const amoled: Theme = {
  id: "amoled",
  name: "AMOLED",
  category: "Minimal",
  description: "Pure black with crisp monochrome accents",
  fonts: {
    heading: '"Space Grotesk", sans-serif',
    body: '"Inter", sans-serif',
  },
  colors: {
    bg: "#000000",
    bgAlt: "#050505",

    // Main readable text
    text: "#e5e5e5",
    textMuted: "#888888",
    textHeading: "#ffffff",

    // Accent should NOT be pure white if components use
    // accent for buttons and interactive elements
    accent: "#a3a3a3",
    accentSoft: "rgba(255,255,255,0.08)",

    // Cards
    card: "#0a0a0a",
    cardHover: "#141414",

    // Borders
    border: "rgba(255,255,255,0.12)",
  },

  card: {
    radius: "16px",
    border: "1px solid var(--lf-border)",
    shadow: "none",
    padding: "20px 24px",
  },

  background: {
    type: "solid",
    layers: "",
  },

  linkHover: {
    scale: "1.01",
    translateY: "-1px",
  },

  transitions: "all 0.2s ease",
};

export const forest: Theme = {
  id: "forest",
  name: "Forest",
  category: "Dark",
  description: "Dark green with natural earthy tones",
  fonts: {
    heading: '"Space Grotesk", sans-serif',
    body: '"Inter", sans-serif',
  },
  colors: {
    bg: "#0a1410",
    bgAlt: "#0f1f17",
    text: "#a8c4b0",
    textMuted: "#6b8a72",
    textHeading: "#d4e8d8",
    accent: "#5ca874",
    accentSoft: "rgba(92,168,116,0.12)",
    card: "rgba(15,31,23,0.6)",
    cardHover: "rgba(20,40,30,0.8)",
    border: "rgba(92,168,116,0.18)",
  },
  card: {
    radius: "18px",
    border: "1px solid var(--lf-border)",
    shadow: "0 8px 32px rgba(0,10,5,0.5)",
    padding: "20px 24px",
    blur: "10px",
  },
  background: {
    type: "glow",
    accentGlow:
      "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(92,168,116,0.12), transparent 70%)",
    layers:
      "radial-gradient(ellipse 60% 50% at 80% 100%, rgba(92,168,116,0.06), transparent 70%)",
  },
  linkHover: { scale: "1.02", translateY: "-2px" },
  transitions: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
};

export const retro: Theme = {
  id: "retro",
  name: "Retro",
  category: "Retro",
  description: "80s/90s inspired with CRT effects and pixel vibes",
  fonts: {
    heading: '"VT323", "JetBrains Mono", monospace',
    body: '"VT323", "JetBrains Mono", monospace',
  },
  colors: {
    bg: "#1a1030",
    bgAlt: "#241a44",
    text: "#d4b8ff",
    textMuted: "#9080c0",
    textHeading: "#ffcc00",
    accent: "#ff44aa",
    accentSoft: "rgba(255,68,170,0.12)",
    card: "rgba(36,26,68,0.7)",
    cardHover: "rgba(48,34,88,0.9)",
    border: "rgba(255,68,170,0.25)",
  },
  card: {
    radius: "8px",
    border: "2px solid var(--lf-border)",
    shadow: "4px 4px 0 rgba(255,68,170,0.3)",
    padding: "16px 20px",
  },
  background: {
    type: "scanlines",
    layers:
      "repeating-linear-gradient(0deg, rgba(255,204,0,0.02) 0px, transparent 3px, transparent 6px)",
    accentGlow:
      "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(255,68,170,0.1), transparent 70%)",
  },
  linkHover: { scale: "1", translateY: "-2px" },
  transitions: "all 0.15s cubic-bezier(0.16,1,0.3,1)",
};

export const synthwave: Theme = {
  id: "synthwave",
  name: "Synthwave",
  category: "Neon",
  description: "Purple and pink neon with a retro grid horizon",
  fonts: {
    heading: '"Orbitron", "Space Grotesk", sans-serif',
    body: '"Rajdhani", "Inter", sans-serif',
  },
  colors: {
    bg: "#1a0a2e",
    bgAlt: "#260f42",
    text: "#d4b8ff",
    textMuted: "#8a7ab0",
    textHeading: "#ff5cf4",
    accent: "#ff5cf4",
    accentSoft: "rgba(255,92,244,0.12)",
    card: "rgba(26,10,46,0.6)",
    cardHover: "rgba(38,15,66,0.8)",
    border: "rgba(255,92,244,0.2)",
  },
  card: {
    radius: "14px",
    border: "1px solid var(--lf-border)",
    shadow: "0 0 30px rgba(255,92,244,0.1), 0 8px 32px rgba(0,0,0,0.4)",
    padding: "20px 24px",
    blur: "8px",
  },
  background: {
    type: "grid",
    layers:
      "linear-gradient(rgba(255,92,244,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,92,244,0.08) 1px, transparent 1px)",
    accentGlow:
      "radial-gradient(ellipse 90% 50% at 50% 100%, rgba(255,92,244,0.2), transparent 70%)",
  },
  linkHover: { scale: "1.01", translateY: "-1px" },
  transitions: "all 0.25s cubic-bezier(0.16,1,0.3,1)",
};

export const sakura: Theme = {
  id: "sakura",
  name: "Sakura",
  category: "Light",
  description: "Soft pink with an elegant Japanese-inspired feel",
  fonts: {
    heading: '"Fraunces", serif',
    body: '"Inter", sans-serif',
  },
  colors: {
    bg: "#fdf2f8",
    bgAlt: "#fce4f0",
    text: "#7a5a6a",
    textMuted: "#b896a8",
    textHeading: "#8b4060",
    accent: "#e8688c",
    accentSoft: "rgba(232,104,140,0.1)",
    card: "rgba(255,255,255,0.7)",
    cardHover: "rgba(255,255,255,0.9)",
    border: "rgba(232,104,140,0.15)",
  },
  card: {
    radius: "24px",
    border: "1px solid var(--lf-border)",
    shadow: "0 8px 32px rgba(232,104,140,0.08)",
    padding: "20px 24px",
    blur: "12px",
  },
  background: {
    type: "glow",
    accentGlow:
      "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(232,104,140,0.12), transparent 70%)",
    layers:
      "radial-gradient(ellipse 50% 40% at 80% 90%, rgba(232,104,140,0.08), transparent 70%)",
  },
  linkHover: { scale: "1.02", translateY: "-2px" },
  transitions: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
};

export const matrix: Theme = {
  id: "matrix",
  name: "Matrix",
  category: "Retro",
  description: "Black with green terminal aesthetic and falling code",
  fonts: {
    heading: '"JetBrains Mono", monospace',
    body: '"JetBrains Mono", monospace',
    mono: '"JetBrains Mono", monospace',
  },
  colors: {
    bg: "#000800",
    bgAlt: "#001200",
    text: "#4a9a3a",
    textMuted: "#2a6a22",
    textHeading: "#00ff41",
    accent: "#00ff41",
    accentSoft: "rgba(0,255,65,0.1)",
    card: "rgba(0,12,0,0.7)",
    cardHover: "rgba(0,20,0,0.9)",
    border: "rgba(0,255,65,0.2)",
  },
  card: {
    radius: "4px",
    border: "1px solid var(--lf-border)",
    shadow: "0 0 12px rgba(0,255,65,0.08)",
    padding: "16px 20px",
  },
  background: {
    type: "matrix",
    layers: "",
    accentGlow:
      "radial-gradient(ellipse 90% 60% at 50% 50%, rgba(0,255,65,0.04), transparent 70%)",
  },
  linkHover: { scale: "1", translateY: "0" },
  transitions: "all 0.15s linear",
};
