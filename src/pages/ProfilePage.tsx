import { useEffect, useState, useCallback } from 'react';
import type { Profile, Theme } from '@/types/profile';
import { loadProfile, type LoadResult } from '@/utils/loadProfile';
import { getTheme, applyTheme } from '@/themes';
import { BackgroundEffects } from '@/components/BackgroundEffects';
import { ProfileView } from '@/components/Profile';
import { ProfileSkeleton } from '@/components/ProfileSkeleton';
import { ProfileError } from '@/components/ProfileError';

export function ProfilePage({ username }: { username: string }) {
  const [result, setResult] = useState<LoadResult>({ status: 'ok', profile: null as unknown as Profile });
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<Theme>(getTheme());

  const load = useCallback(() => {
    let active = true;
    setLoading(true);
    loadProfile(username).then((r) => {
      if (!active) return;
      setResult(r);
      setLoading(false);
      if (r.status === 'ok') {
        const t = getTheme(r.profile.theme);
        setTheme(t);
        applyTheme(t);
      }
    });
    return () => { active = false; };
  }, [username]);

  useEffect(() => load(), [load]);

  if (loading) {
    return (
      <>
        <BackgroundEffects theme={theme} />
        <ProfileSkeleton />
      </>
    );
  }

  if (result.status === 'not_found') {
    return <ProfileError type="not_found" username={username} theme={theme} />;
  }

  if (result.status === 'invalid') {
    return <ProfileError type="invalid" username={username} theme={theme} errors={result.errors} />;
  }

  if (result.status === 'error') {
    return <ProfileError type="error" username={username} theme={theme} onRetry={load} />;
  }

  return (
    <>
      <BackgroundEffects theme={theme} />
      <ProfileView profile={result.profile} theme={theme} />
    </>
  );
}
