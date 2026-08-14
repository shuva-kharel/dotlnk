import { useState } from 'react';
import { Share2 } from 'lucide-react';
import type { Profile, Theme } from '@/types/profile';
import { LayoutRenderer } from '@/layouts/LayoutRenderer';
import { ShareModal } from './ShareModal';

interface ProfileProps {
  profile: Profile;
  theme: Theme;
}

export function ProfileView({ profile, theme }: ProfileProps) {
  const [showShare, setShowShare] = useState(false);
  const profileUrl = typeof window !== 'undefined' ? window.location.href : `https://lnk.shuvakharel.com.np/${profile.username}`;

  return (
    <>
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-xl flex-col items-center px-4 py-10 sm:py-16">
        {/* Share button */}
        <button
          onClick={() => setShowShare(true)}
          aria-label="Share profile"
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl lf-card transition-all duration-300 hover:scale-110 hover:border-[var(--lf-accent)] sm:right-8 sm:top-8"
          style={{ padding: 0, boxShadow: 'none' }}
        >
          <Share2 size={18} className="text-[var(--lf-text-muted)] transition-colors hover:text-[var(--lf-accent)]" />
        </button>

        <LayoutRenderer profile={profile} theme={theme} />
      </div>

      {showShare && (
        <ShareModal
          url={profileUrl}
          profileName={profile.name}
          onClose={() => setShowShare(false)}
        />
      )}
    </>
  );
}
