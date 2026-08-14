export type SocialKey =
  | "github"
  | "x"
  | "twitter"
  | "linkedin"
  | "instagram"
  | "youtube"
  | "dribbble"
  | "behance"
  | "tiktok"
  | "twitch"
  | "discord"
  | "email"
  | "website"
  | "mastodon"
  | "threads";

export type LinkIcon =
  | "github"
  | "linkedin"
  | "medium"
  | "tryhackme"
  | "globe"
  | "link"
  | "mail"
  | "twitter"
  | "youtube"
  | "instagram"
  | "dribbble"
  | "behance"
  | "book"
  | "code"
  | "terminal"
  | "rocket"
  | "star"
  | "award"
  | "briefcase"
  | "music"
  | "camera"
  | "pen-tool"
  | "zap"
  | "heart"
  | "shopping-bag"
  | "play"
  | "external-link";

export interface SocialLink {
  key: SocialKey;
  url: string;
}

export interface ProfileLink {
  title: string;
  description?: string;
  url: string;
  icon?: LinkIcon;
  thumbnail?: string;
  featured?: boolean;
}

export type LayoutType =
  | "classic"
  | "cards"
  | "compact"
  | "terminal"
  | "grid"
  | "featured";

export interface Profile {
  username: string;
  name: string;
  bio: string;
  avatar: string;
  location?: string;
  verified?: boolean;
  theme?: string;
  layout?: LayoutType;
  socials?: Partial<Record<SocialKey, string>>;
  links: ProfileLink[];
}

export type ThemeCategory = "Dark" | "Light" | "Neon" | "Minimal" | "Retro";

export interface Theme {
  id: string;
  name: string;
  category: ThemeCategory;
  description: string;
  fonts: {
    heading: string;
    body: string;
    mono?: string;
  };
  colors: {
    bg: string;
    bgAlt?: string;
    text: string;
    textMuted: string;
    textHeading: string;
    accent: string;
    accentSoft: string;
    card: string;
    cardHover: string;
    border: string;
  };
  card: {
    radius: string;
    border: string;
    shadow: string;
    padding: string;
    blur?: string;
  };
  background: {
    type:
      | "solid"
      | "gradient"
      | "animated-gradient"
      | "aurora"
      | "grid"
      | "matrix"
      | "scanlines"
      | "glow"
      | "noise"
      | "dots";
    layers?: string;
    speed?: string;
    accentGlow?: string;
  };
  linkHover: {
    scale: string;
    translateY: string;
  };
  transitions: string;
}
