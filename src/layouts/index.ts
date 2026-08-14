import type { Profile, LayoutType } from '@/types/profile';

export const layoutList: { id: LayoutType; name: string; description: string }[] = [
  { id: 'classic', name: 'Classic', description: 'Centered avatar, name, and stacked link cards' },
  { id: 'cards', name: 'Cards', description: 'Links displayed as a grid of compact cards' },
  { id: 'compact', name: 'Compact', description: 'Minimal text-only links with a divider' },
  { id: 'terminal', name: 'Terminal', description: 'Terminal-style with command prompts' },
  { id: 'grid', name: 'Grid', description: 'Two-column grid of icon tiles' },
  { id: 'featured', name: 'Featured', description: 'Large featured link on top, then stacked links' },
];

export function getLayout(profile: Profile): LayoutType {
  return profile.layout ?? 'classic';
}
