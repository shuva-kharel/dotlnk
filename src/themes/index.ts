import type { Theme } from '@/types/theme';
import {
  midnight, aurora, cyberpunk, terminal, ocean, sunset,
  minimal, paper, glass, amoled, forest, retro, synthwave, sakura, matrix,
} from './definitions';

export const themes: Theme[] = [
  midnight, aurora, cyberpunk, terminal, ocean, sunset,
  minimal, paper, glass, amoled, forest, retro, synthwave, sakura, matrix,
];

const themeMap = new Map<string, Theme>(themes.map((t) => [t.id, t]));

export const defaultTheme = midnight;

export function getTheme(id?: string): Theme {
  if (id && themeMap.has(id)) return themeMap.get(id)!;
  return defaultTheme;
}

export const themeCategories = ['All', 'Dark', 'Light', 'Neon', 'Minimal', 'Retro'] as const;
export type ThemeFilter = (typeof themeCategories)[number];

export function applyTheme(theme: Theme, root: HTMLElement = document.documentElement) {
  const c = theme.colors;
  const cv = theme.card;
  const r = root;
  r.style.setProperty('--lf-bg', c.bg);
  r.style.setProperty('--lf-bg-alt', c.bgAlt ?? c.bg);
  r.style.setProperty('--lf-text', c.text);
  r.style.setProperty('--lf-text-muted', c.textMuted);
  r.style.setProperty('--lf-text-heading', c.textHeading);
  r.style.setProperty('--lf-accent', c.accent);
  r.style.setProperty('--lf-accent-soft', c.accentSoft);
  r.style.setProperty('--lf-card', c.card);
  r.style.setProperty('--lf-card-hover', c.cardHover);
  r.style.setProperty('--lf-border', c.border);
  r.style.setProperty('--lf-radius', cv.radius);
  r.style.setProperty('--lf-card-border', cv.border);
  r.style.setProperty('--lf-card-shadow', cv.shadow);
  r.style.setProperty('--lf-card-padding', cv.padding);
  r.style.setProperty('--lf-card-blur', cv.blur ?? '0px');
  r.style.setProperty('--lf-hover-scale', theme.linkHover.scale);
  r.style.setProperty('--lf-hover-y', theme.linkHover.translateY);
  r.style.setProperty('--lf-transition', theme.transitions);
  r.style.setProperty('--lf-font-heading', theme.fonts.heading);
  r.style.setProperty('--lf-font-body', theme.fonts.body);
  r.style.setProperty('--lf-font-mono', theme.fonts.mono ?? theme.fonts.body);
  r.setAttribute('data-theme', theme.id);
  r.style.fontFamily = theme.fonts.body;
  r.style.background = c.bg;
  r.style.color = c.text;
}
