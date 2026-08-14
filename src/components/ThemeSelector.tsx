import { useState } from 'react';
import { Check, Search } from 'lucide-react';
import type { Theme } from '@/types/profile';
import { themes, themeCategories, type ThemeFilter } from '@/themes';
import { ThemePreview } from './ThemePreview';

interface ThemeSelectorProps {
  selectedId: string;
  onSelect: (theme: Theme) => void;
}

export function ThemeSelector({ selectedId, onSelect }: ThemeSelectorProps) {
  const [filter, setFilter] = useState<ThemeFilter>('All');
  const [query, setQuery] = useState('');

  const filtered = themes.filter((t) => {
    if (filter !== 'All' && t.category !== filter) return false;
    if (query && !t.name.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="w-full">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2
          className="text-xl font-bold sm:text-2xl"
          style={{ color: 'var(--lf-text-heading)', fontFamily: 'var(--lf-font-heading)' }}
        >
          Choose your theme
        </h2>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--lf-text-muted)]" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search themes..."
              className="h-9 w-36 rounded-lg border bg-transparent pl-9 pr-3 text-sm outline-none transition-colors focus:border-[var(--lf-accent)] sm:w-44"
              style={{ borderColor: 'var(--lf-border)', color: 'var(--lf-text)' }}
            />
          </div>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {themeCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className="rounded-full px-3.5 py-1.5 text-sm font-medium transition-all duration-300"
            style={{
              background: filter === cat ? 'var(--lf-accent)' : 'var(--lf-card)',
              color: filter === cat ? '#fff' : 'var(--lf-text-muted)',
              border: `1px solid ${filter === cat ? 'var(--lf-accent)' : 'var(--lf-border)'}`,
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        {filtered.map((theme) => {
          const isSelected = theme.id === selectedId;
          return (
            <button
              key={theme.id}
              onClick={() => onSelect(theme)}
              className="group relative overflow-hidden rounded-2xl text-left transition-all duration-300"
              style={{
                border: `2px solid ${isSelected ? 'var(--lf-accent)' : 'transparent'}`,
                boxShadow: isSelected ? '0 0 20px var(--lf-accent-soft)' : 'none',
              }}
            >
              <ThemePreview theme={theme} />

              <div className="flex items-center justify-between px-3 pb-3 pt-1">
                <div>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: 'var(--lf-text-heading)' }}
                  >
                    {theme.name}
                  </p>
                  <p className="text-[11px]" style={{ color: 'var(--lf-text-muted)' }}>
                    {theme.category}
                  </p>
                </div>
                {isSelected && (
                  <div
                    className="flex h-6 w-6 items-center justify-center rounded-full"
                    style={{ background: 'var(--lf-accent)' }}
                  >
                    <Check size={14} className="text-white" strokeWidth={3} />
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="py-12 text-center text-sm" style={{ color: 'var(--lf-text-muted)' }}>
          No themes match "{query}"
        </p>
      )}
    </div>
  );
}
