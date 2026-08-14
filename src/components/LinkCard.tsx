import { Link as LinkIcon, ExternalLink } from "lucide-react";
import { getLinkIcon } from "@/utils/iconMap";
import type { LinkIcon as LinkIconName } from "@/types/profile";

interface LinkCardProps {
  title: string;
  url: string;
  description?: string;
  icon?: LinkIconName;
  thumbnail?: string;
  featured?: boolean;
  index: number;
}

export function LinkCard({
  title,
  url,
  description,
  icon,
  thumbnail,
  featured,
  index,
}: LinkCardProps) {
  const Icon = icon ? getLinkIcon(icon) : LinkIcon;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="lf-link-card group lf-anim-fade-up"
      style={{
        animationDelay: `${0.3 + index * 0.07}s`,
        ...(featured
          ? {
              borderColor: "var(--lf-accent)",
              boxShadow:
                "0 0 30px var(--lf-accent-soft), var(--lf-card-shadow)",
            }
          : {}),
      }}
    >
      {thumbnail ? (
        <img
          src={thumbnail}
          alt=""
          className="h-12 w-12 rounded-lg object-cover flex-shrink-0"
          loading="lazy"
        />
      ) : (
        <div
          className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg"
          style={{ background: "var(--lf-accent-soft)" }}
        >
          <Icon size={20} className="text-[var(--lf-accent)]" />
        </div>
      )}

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3
            className="truncate text-base font-semibold"
            style={{
              color: "var(--lf-text-heading)",
              fontFamily: "var(--lf-font-heading)",
            }}
          >
            {title}
          </h3>

          {featured && (
            <span
              className="flex-shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
              style={{
                background: "var(--lf-accent-soft)",
                color: "var(--lf-accent)",
              }}
            >
              Featured
            </span>
          )}
        </div>

        {description && (
          <p
            className="mt-0.5 truncate text-sm"
            style={{ color: "var(--lf-text-muted)" }}
          >
            {description}
          </p>
        )}
      </div>

      <ExternalLink
        size={16}
        className="flex-shrink-0 text-[var(--lf-text-muted)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
    </a>
  );
}
