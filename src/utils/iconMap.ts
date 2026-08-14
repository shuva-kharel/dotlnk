import {
  Github,
  Globe,
  Link as LinkIcon,
  Mail,
  Twitter,
  Linkedin,
  Youtube,
  Instagram,
  Dribbble,
  Aperture,
  Book,
  BookOpen,
  Code,
  Terminal,
  Rocket,
  Star,
  Award,
  Briefcase,
  Music,
  Camera,
  PenTool,
  Zap,
  Heart,
  ShoppingBag,
  Play,
  ExternalLink,
  Shield,
} from "lucide-react";

import type { LinkIcon as LinkIconName } from "@/types/profile";

const iconMap: Record<LinkIconName, typeof Globe> = {
  // Brand / platform icons
  github: Github,
  linkedin: Linkedin,
  medium: BookOpen,
  tryhackme: Shield,

  // Generic icons
  globe: Globe,
  link: LinkIcon,
  mail: Mail,
  twitter: Twitter,
  youtube: Youtube,
  instagram: Instagram,
  dribbble: Dribbble,
  behance: Aperture,
  book: Book,
  code: Code,
  terminal: Terminal,
  rocket: Rocket,
  star: Star,
  award: Award,
  briefcase: Briefcase,
  music: Music,
  camera: Camera,
  "pen-tool": PenTool,
  zap: Zap,
  heart: Heart,
  "shopping-bag": ShoppingBag,
  play: Play,
  "external-link": ExternalLink,
};

export function getLinkIcon(icon?: LinkIconName): typeof Globe {
  if (!icon) {
    return LinkIcon;
  }

  return iconMap[icon] ?? LinkIcon;
}

export { iconMap };
