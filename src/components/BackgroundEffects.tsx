import { useEffect, useMemo, useRef } from 'react';
import type { Theme } from '@/types/profile';

export function BackgroundEffects({ theme }: { theme: Theme }) {
  const matrixRef = useRef<HTMLDivElement>(null);
  const reduced = useRef(window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--lf-bg-layers', theme.background.layers ?? '');
    root.style.setProperty('--lf-bg-glow', theme.background.accentGlow ?? '');
    root.style.setProperty('--lf-bg-speed', theme.background.speed ?? '20s');
  }, [theme]);

  const matrixCols = useMemo(() => {
    if (theme.background.type !== 'matrix') return null;
    if (reduced.current) return null;
    const cols: { left: number; delay: number; duration: number; chars: string }[] = [];
    const count = 18;
    for (let i = 0; i < count; i++) {
      const chars = Array.from({ length: 20 }, () =>
        String.fromCharCode(0x30a0 + Math.floor(Math.random() * 96))
      ).join('\n');
      cols.push({
        left: (i / count) * 100 + Math.random() * 3,
        delay: Math.random() * 8,
        duration: 6 + Math.random() * 8,
        chars,
      });
    }
    return cols;
  }, [theme]);

  return (
    <>
      <div
        className={[
          'fixed inset-0 z-0 pointer-events-none',
          theme.background.type === 'aurora' ? 'lf-bg-aurora' : '',
          theme.background.type === 'grid' ? 'lf-bg-grid' : '',
          theme.background.type === 'scanlines' ? 'lf-bg-scanlines' : '',
          theme.background.type === 'glow' ? 'lf-bg-glow' : '',
          theme.background.type === 'noise' ? 'lf-bg-noise' : '',
          theme.background.type === 'matrix' ? 'lf-bg-matrix' : '',
        ].join(' ')}
        style={
          theme.background.type === 'animated-gradient'
            ? { background: theme.background.layers ?? '', backgroundSize: '300% 300%' }
            : undefined
        }
      />

      {theme.background.type === 'animated-gradient' && !reduced.current && (
        <div
          className="fixed inset-0 z-0 pointer-events-none lf-bg-animated-gradient"
          style={{ background: theme.background.layers ?? '', backgroundSize: '300% 300%' }}
        />
      )}

      {matrixCols && (
        <div ref={matrixRef} className="lf-matrix-rain">
          {matrixCols.map((col, i) => (
            <div
              key={i}
              className="lf-matrix-col"
              style={{
                left: `${col.left}%`,
                animationDelay: `${col.delay}s`,
                animationDuration: `${col.duration}s`,
                whiteSpace: 'pre',
              }}
            >
              {col.chars}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
