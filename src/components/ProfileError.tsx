import { useEffect } from 'react';
import { Compass, AlertTriangle, WifiOff, ArrowLeft, RotateCcw, FileJson } from 'lucide-react';
import type { Theme } from '@/types/profile';
import { applyTheme } from '@/themes';
import { BackgroundEffects } from '@/components/BackgroundEffects';
import { navigate } from '@/utils/router';

interface ProfileErrorProps {
  type: 'not_found' | 'invalid' | 'error';
  username?: string;
  theme?: Theme;
  errors?: string[];
  onRetry?: () => void;
}

export function ProfileError({ type, username, theme, errors, onRetry }: ProfileErrorProps) {
  const fallbackTheme = theme ?? (() => {
    const t = (() => {
      // get default theme without circular import
      return { id: 'midnight', name: 'Midnight', colors: { bg: '#080b14', text: '#c7d0e0', textHeading: '#f0f4ff', textMuted: '#6b7491', accent: '#4b8dff', accentSoft: 'rgba(75,141,255,0.12)', card: 'rgba(20,27,45,0.6)', cardHover: 'rgba(28,37,61,0.8)', border: 'rgba(75,141,255,0.15)', bgAlt: '#0d1220' } } as unknown as Theme;
    })();
    return t;
  })();

  useEffect(() => { applyTheme(fallbackTheme); }, [fallbackTheme]);

  const config = {
    not_found: {
      icon: Compass,
      title: 'Profile not found.',
      subtitle: `The identity you're looking for doesn't exist on this dotlnk instance.`,
    },
    invalid: {
      icon: AlertTriangle,
      title: 'Profile unavailable.',
      subtitle: 'This profile contains invalid configuration.',
    },
    error: {
      icon: WifiOff,
      title: 'Unable to load profile.',
      subtitle: 'Something went wrong while loading this profile.',
    },
  };

  const { icon: Icon, title, subtitle } = config[type];

  return (
    <>
      <BackgroundEffects theme={fallbackTheme} />
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <div
          className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl lf-anim-scale-in"
          style={{ background: 'var(--lf-accent-soft)' }}
        >
          <Icon size={36} className="text-[var(--lf-accent)]" />
        </div>

        <h1
          className="text-3xl font-bold lf-anim-fade-up sm:text-4xl"
          style={{ color: 'var(--lf-text-heading)', fontFamily: 'var(--lf-font-heading)' }}
        >
          {title}
        </h1>

        <p
          className="mt-3 max-w-sm text-base lf-anim-fade-up"
          style={{ animationDelay: '0.1s', color: 'var(--lf-text-muted)' }}
        >
          {subtitle}
        </p>

        {username && type === 'not_found' && (
          <p className="mt-1 text-sm lf-anim-fade-up" style={{ animationDelay: '0.12s', color: 'var(--lf-text)' }}>
            <span className="font-mono">@{username}</span>
          </p>
        )}

        {errors && errors.length > 0 && (
          <div className="mt-5 max-w-sm rounded-xl p-4 text-left lf-anim-fade-up" style={{ animationDelay: '0.15s', background: 'var(--lf-card)' }}>
            <ul className="space-y-1">
              {errors.map((err, i) => (
                <li key={i} className="flex items-start gap-2 text-xs" style={{ color: 'var(--lf-text-muted)' }}>
                  <span style={{ color: 'var(--lf-accent)' }}>•</span>
                  <span>{err}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-8 flex flex-col gap-3 lf-anim-fade-up sm:flex-row" style={{ animationDelay: '0.2s' }}>
          <button
            onClick={() => navigate('/')}
            className="flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-300 hover:scale-105"
            style={{ background: 'var(--lf-accent)', color: '#fff' }}
          >
            <ArrowLeft size={16} />
            Go Home
          </button>
          {type === 'error' && onRetry ? (
            <button
              onClick={onRetry}
              className="flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-300 hover:scale-105 lf-card"
            >
              <RotateCcw size={16} />
              Try Again
            </button>
          ) : (
            <a
              href="/data/template.json"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-300 hover:scale-105 lf-card"
            >
              <FileJson size={16} />
              Create a Profile
            </a>
          )}
        </div>
      </div>
    </>
  );
}
