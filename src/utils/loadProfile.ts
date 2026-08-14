import type { Profile } from '@/types/profile';
import { validateProfile } from '@/utils/validateProfile';

const USERNAME_RE = /^[a-zA-Z0-9_-]+$/;
const MAX_USERNAME = 30;

export function isValidUsername(username: string): boolean {
  if (!username || username.length > MAX_USERNAME) return false;
  return USERNAME_RE.test(username);
}

export type LoadResult =
  | { status: 'ok'; profile: Profile }
  | { status: 'not_found' }
  | { status: 'invalid'; errors: string[] }
  | { status: 'error'; message: string };

export async function loadProfile(username: string): Promise<LoadResult> {
  if (!isValidUsername(username)) return { status: 'not_found' };

  try {
    const res = await fetch(`/data/${username}.json`);
    if (!res.ok) return { status: 'not_found' };
    const data = await res.json();
    const validation = validateProfile(data);
    if (!validation.valid) {
      console.warn(`[dotlnk] Profile "${username}" has validation errors:`, validation.errors);
      return { status: 'invalid', errors: validation.errors };
    }
    return { status: 'ok', profile: data as Profile };
  } catch {
    return { status: 'error', message: 'Failed to load profile.' };
  }
}
