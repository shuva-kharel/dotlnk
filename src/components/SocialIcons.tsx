import {
  Github,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Dribbble,
  Twitch,
  Mail,
  Globe,
  MessageCircle,
  Music2,
  Hash,
  Aperture,
} from "lucide-react";
import type { SocialKey } from "@/types/profile";

const iconMap: Record<SocialKey, typeof Github> = {
  github: Github,
  x: Twitter,
  twitter: Twitter,
  linkedin: Linkedin,
  instagram: Instagram,
  youtube: Youtube,
  dribbble: Dribbble,
  behance: Aperture,
  tiktok: Music2,
  twitch: Twitch,
  discord: MessageCircle,
  email: Mail,
  website: Globe,
  mastodon: Hash,
  threads: Hash,
};

const labelMap: Record<SocialKey, string> = {
  github: "GitHub",
  x: "X",
  twitter: "Twitter",
  linkedin: "LinkedIn",
  instagram: "Instagram",
  youtube: "YouTube",
  dribbble: "Dribbble",
  behance: "Behance",
  tiktok: "TikTok",
  twitch: "Twitch",
  discord: "Discord",
  email: "Email",
  website: "Website",
  mastodon: "Mastodon",
  threads: "Threads",
};

export function SocialIcons({
  socials,
}: {
  socials: Partial<Record<SocialKey, string>>;
}) {
  const entries = Object.entries(socials).filter(
    ([, url]) => Boolean(url)
  ) as [SocialKey, string][];

  if (entries.length === 0) return null;

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {entries.map(([key, url]) => {
        const Icon = iconMap[key];
        const href = key === "email" ? `mailto:${url}` : url;

        return (
          <a
            key={key}
            href={href}
            target={key === "email" ? undefined : "_blank"}
            rel={key === "email" ? undefined : "noopener noreferrer"}
            aria-label={labelMap[key]}
            title={labelMap[key]}
            className="group flex h-11 w-11 items-center justify-center rounded-xl lf-card transition-[transform,border-color,background] duration-300 hover:scale-110 hover:border-[var(--lf-accent)]"
            style={{ padding: 0, boxShadow: "none" }}
          >
            <Icon
              size={18}
              className="text-[var(--lf-text-muted)] transition-colors duration-300 group-hover:text-[var(--lf-accent)]"
            />
          </a>
        );
      })}
    </div>
  );
}