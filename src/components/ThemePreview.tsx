import type { Theme } from '@/types/profile';

export function ThemePreview({ theme, size = 'md' }: { theme: Theme; size?: 'sm' | 'md' }) {
  const avatarSize = size === 'sm' ? 'h-8 w-8' : 'h-10 w-10';
  const titleSize = size === 'sm' ? 'h-2.5' : 'h-3';
  const lineWidth = size === 'sm' ? 'w-14' : 'w-20';
  const cardH = size === 'sm' ? 'h-5' : 'h-6';

  return (
    <div
      className="flex flex-col items-center gap-1.5 rounded-xl p-3"
      style={{
        background: theme.colors.bg,
        fontFamily: theme.fonts.body,
        minHeight: size === 'sm' ? 90 : 110,
      }}
    >
      <div
        className={`${avatarSize} rounded-full`}
        style={{
          background: `linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.cardHover})`,
          border: `2px solid ${theme.colors.border}`,
        }}
      />
      <div className={`${titleSize} ${lineWidth} rounded-full`} style={{ background: theme.colors.textHeading }} />
      <div className="h-1.5 w-10 rounded-full" style={{ background: theme.colors.textMuted, opacity: 0.6 }} />
      <div
        className={`mt-1 flex w-full flex-col gap-1`}
      >
        {[0, 1].map((i) => (
          <div
            key={i}
            className={`${cardH} w-full rounded-md`}
            style={{
              background: theme.colors.card,
              border: `1px solid ${theme.colors.border}`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
