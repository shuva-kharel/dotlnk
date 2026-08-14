import type { Profile, LayoutType, SocialKey, LinkIcon } from "@/types/profile";
import { themes } from "@/themes";

const VALID_SOCIAL_KEYS: SocialKey[] = [
  "github",
  "x",
  "twitter",
  "linkedin",
  "instagram",
  "youtube",
  "dribbble",
  "behance",
  "tiktok",
  "twitch",
  "discord",
  "email",
  "website",
  "mastodon",
  "threads",
];

const VALID_LINK_ICONS: LinkIcon[] = [
  "github",
  "linkedin",
  "medium",
  "tryhackme",
  "globe",
  "link",
  "mail",
  "twitter",
  "youtube",
  "instagram",
  "dribbble",
  "behance",
  "book",
  "code",
  "terminal",
  "rocket",
  "star",
  "award",
  "briefcase",
  "music",
  "camera",
  "pen-tool",
  "zap",
  "heart",
  "shopping-bag",
  "play",
  "external-link",
];

const VALID_LAYOUTS: LayoutType[] = [
  "classic",
  "cards",
  "compact",
  "terminal",
  "grid",
  "featured",
];

const USERNAME_RE = /^[a-zA-Z0-9_-]+$/;

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export function validateProfile(data: unknown): ValidationResult {
  const errors: string[] = [];

  if (typeof data !== "object" || data === null) {
    return { valid: false, errors: ["Invalid profile JSON."] };
  }

  const p = data as Record<string, unknown>;

  if (typeof p.username !== "string" || !p.username.trim()) {
    errors.push("Missing required field: username.");
  } else if (!USERNAME_RE.test(p.username) || p.username.length > 30) {
    errors.push("Invalid username format.");
  }

  if (typeof p.name !== "string" || !p.name.trim()) {
    errors.push("Missing required field: name.");
  }

  if (typeof p.bio !== "string") {
    errors.push("Missing required field: bio.");
  }

  if (typeof p.avatar !== "string" || !p.avatar.trim()) {
    errors.push("Missing required field: avatar.");
  }

  if (p.location !== undefined && typeof p.location !== "string") {
    errors.push("Invalid location: must be a string.");
  }

  if (p.verified !== undefined && typeof p.verified !== "boolean") {
    errors.push("Invalid verified: must be a boolean.");
  }

  if (p.theme !== undefined) {
    if (typeof p.theme !== "string" || !themes.some((t) => t.id === p.theme)) {
      errors.push(`Unsupported theme: ${String(p.theme)}.`);
    }
  }

  if (p.layout !== undefined) {
    if (
      typeof p.layout !== "string" ||
      !VALID_LAYOUTS.includes(p.layout as LayoutType)
    ) {
      errors.push(`Unsupported layout: ${String(p.layout)}.`);
    }
  }

  if (p.socials !== undefined) {
    if (typeof p.socials !== "object" || p.socials === null) {
      errors.push("Invalid socials: must be an object.");
    } else {
      for (const [key, val] of Object.entries(p.socials)) {
        if (!VALID_SOCIAL_KEYS.includes(key as SocialKey)) {
          errors.push(`Unknown social key: ${key}.`);
        }
        if (typeof val !== "string") {
          errors.push(`Invalid URL for social "${key}": must be a string.`);
        }
      }
    }
  }

  if (!Array.isArray(p.links)) {
    errors.push("Missing required field: links (must be an array).");
  } else {
    p.links.forEach((link, i) => {
      if (typeof link !== "object" || link === null) {
        errors.push(`Invalid link at index ${i}.`);
        return;
      }
      const l = link as Record<string, unknown>;
      if (typeof l.title !== "string" || !l.title.trim()) {
        errors.push(`Missing title in links[${i}].`);
      }
      if (typeof l.url !== "string" || !l.url.trim()) {
        errors.push(`Missing URL in links[${i}].`);
      } else if (!isValidUrl(l.url)) {
        errors.push(`Invalid URL in links[${i}].`);
      }
      if (l.description !== undefined && typeof l.description !== "string") {
        errors.push(`Invalid description in links[${i}].`);
      }
      if (
        l.icon !== undefined &&
        !VALID_LINK_ICONS.includes(l.icon as LinkIcon)
      ) {
        errors.push(`Unknown icon "${String(l.icon)}" in links[${i}].`);
      }
      if (l.featured !== undefined && typeof l.featured !== "boolean") {
        errors.push(`Invalid featured flag in links[${i}].`);
      }
    });
  }

  return { valid: errors.length === 0, errors };
}

function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return url.startsWith("/") || url.startsWith("mailto:");
  }
}

export function isValidProfile(data: unknown): data is Profile {
  return validateProfile(data).valid;
}
