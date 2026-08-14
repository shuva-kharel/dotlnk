import { BadgeCheck, MapPin, Terminal as TerminalIcon, ExternalLink, ChevronRight } from 'lucide-react';
import type { Profile, Theme, LayoutType } from '@/types/profile';
import { SocialIcons } from '@/components/SocialIcons';
import { LinkCard } from '@/components/LinkCard';
import { getLinkIcon } from '@/utils/iconMap';

interface LayoutProps {
  profile: Profile;
  theme: Theme;
}

function ProfileHeader({ profile, center = true }: { profile: Profile; center?: boolean }) {
  return (
    <div className={`flex flex-col ${center ? 'items-center text-center' : 'items-start'}`}>
      <div className="relative mb-5">
        <img
          src={profile.avatar}
          alt={`${profile.name}'s avatar`}
          className="h-24 w-24 rounded-full object-cover sm:h-28 sm:w-28"
          style={{ border: '3px solid var(--lf-border)', boxShadow: '0 0 30px var(--lf-accent-soft)' }}
        />
        {profile.verified && (
          <div className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full" style={{ background: 'var(--lf-accent)' }}>
            <BadgeCheck size={18} className="text-white" strokeWidth={2.5} />
          </div>
        )}
      </div>
      <h1 className="text-2xl font-bold sm:text-3xl" style={{ color: 'var(--lf-text-heading)', fontFamily: 'var(--lf-font-heading)' }}>
        {profile.name}
      </h1>
      <p className="mt-1 text-sm" style={{ color: 'var(--lf-text-muted)' }}>@{profile.username}</p>
    </div>
  );
}

function Bio({ profile, center = true }: { profile: Profile; center?: boolean }) {
  if (!profile.bio) return null;
  return (
    <p className={`mt-4 max-w-sm text-base lf-anim-fade-up ${center ? 'text-center' : ''}`} style={{ animationDelay: '0.1s', color: 'var(--lf-text)', lineHeight: 1.6 }}>
      {profile.bio}
    </p>
  );
}

function Location({ profile, center = true }: { profile: Profile; center?: boolean }) {
  if (!profile.location) return null;
  return (
    <div className={`mt-3 flex items-center gap-1.5 text-sm lf-anim-fade-up ${center ? 'justify-center' : ''}`} style={{ animationDelay: '0.15s', color: 'var(--lf-text-muted)' }}>
      <MapPin size={14} />
      <span>{profile.location}</span>
    </div>
  );
}

function Socials({ profile }: { profile: Profile }) {
  if (!profile.socials) return null;
  return (
    <div className="mt-6 lf-anim-fade-up" style={{ animationDelay: '0.2s' }}>
      <SocialIcons socials={profile.socials} />
    </div>
  );
}

function Footer() {
  return (
    <footer className="mt-12 flex items-center gap-1.5 text-xs lf-anim-fade-in" style={{ animationDelay: '0.8s', color: 'var(--lf-text-muted)' }}>
      <span>Powered by</span>
      <a href="/" className="font-semibold transition-colors duration-300 hover:text-[var(--lf-accent)]" style={{ color: 'var(--lf-text-heading)' }}>
        dotlnk
      </a>
    </footer>
  );
}

/* 1. CLASSIC */
function ClassicLayout({ profile }: LayoutProps) {
  const featured = profile.links.filter((l) => l.featured);
  const regular = profile.links.filter((l) => !l.featured);
  return (
    <>
      <ProfileHeader profile={profile} />
      <Bio profile={profile} />
      <Location profile={profile} />
      <Socials profile={profile} />
      {featured.length > 0 && (
        <div className="mt-8 flex w-full flex-col gap-3">
          {featured.map((link, i) => <LinkCard key={`f-${i}`} {...link} index={i} />)}
        </div>
      )}
      {regular.length > 0 && (
        <div className="mt-3 flex w-full flex-col gap-3">
          {regular.map((link, i) => <LinkCard key={`r-${i}`} {...link} index={featured.length + i} />)}
        </div>
      )}
      <Footer />
    </>
  );
}

/* 2. CARDS */
function CardsLayout({ profile }: LayoutProps) {
  return (
    <>
      <ProfileHeader profile={profile} />
      <Bio profile={profile} />
      <Location profile={profile} />
      <Socials profile={profile} />
      <div className="mt-8 grid w-full grid-cols-2 gap-3">
        {profile.links.map((link, i) => {
          const Icon = getLinkIcon(link.icon);
          return (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="lf-link-card group lf-anim-fade-up flex-col items-start gap-2 p-4"
              style={{ animationDelay: `${0.3 + i * 0.06}s`, ...(link.featured ? { borderColor: 'var(--lf-accent)' } : {}) }}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ background: 'var(--lf-accent-soft)' }}>
                <Icon size={18} className="text-[var(--lf-accent)]" />
              </div>
              <h3 className="truncate text-sm font-semibold" style={{ color: 'var(--lf-text-heading)', fontFamily: 'var(--lf-font-heading)' }}>
                {link.title}
              </h3>
              {link.description && <p className="truncate text-xs" style={{ color: 'var(--lf-text-muted)' }}>{link.description}</p>}
            </a>
          );
        })}
      </div>
      <Footer />
    </>
  );
}

/* 3. COMPACT */
function CompactLayout({ profile }: LayoutProps) {
  return (
    <>
      <ProfileHeader profile={profile} />
      <Bio profile={profile} />
      <Socials profile={profile} />
      <div className="mt-8 w-full lf-anim-fade-up" style={{ animationDelay: '0.25s' }}>
        <div className="mb-3 h-px" style={{ background: 'var(--lf-border)' }} />
        {profile.links.map((link, i) => {
          const Icon = getLinkIcon(link.icon);
          return (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 py-3 transition-all duration-200 hover:translate-x-1 lf-anim-fade-up"
              style={{ animationDelay: `${0.3 + i * 0.05}s`, borderBottom: i < profile.links.length - 1 ? '1px solid var(--lf-border)' : 'none' }}
            >
              <Icon size={16} className="flex-shrink-0 text-[var(--lf-text-muted)] transition-colors group-hover:text-[var(--lf-accent)]" />
              <span className="flex-1 text-sm font-medium" style={{ color: 'var(--lf-text)' }}>{link.title}</span>
              <ChevronRight size={14} className="flex-shrink-0 text-[var(--lf-text-muted)] opacity-0 transition-opacity group-hover:opacity-100" />
            </a>
          );
        })}
      </div>
      <Footer />
    </>
  );
}

/* 4. TERMINAL */
function TerminalLayout({ profile }: LayoutProps) {
  return (
    <div className="w-full" style={{ fontFamily: 'var(--lf-font-mono)' }}>
      <div className="lf-anim-fade-up">
        <p className="text-sm" style={{ color: 'var(--lf-text-muted)' }}>
          <span style={{ color: 'var(--lf-accent)' }}>$</span> whoami
        </p>
        <p className="mt-1 text-lg font-bold" style={{ color: 'var(--lf-text-heading)' }}>{profile.name}</p>
        {profile.bio && <p className="mt-1 text-sm" style={{ color: 'var(--lf-text-muted)' }}># {profile.bio}</p>}
        {profile.location && <p className="text-sm" style={{ color: 'var(--lf-text-muted)' }}># {profile.location}</p>}
      </div>

      {profile.socials && (
        <div className="mt-5 lf-anim-fade-up" style={{ animationDelay: '0.15s' }}>
          <SocialIcons socials={profile.socials} />
        </div>
      )}

      <div className="mt-6 lf-anim-fade-up" style={{ animationDelay: '0.2s' }}>
        <p className="text-sm" style={{ color: 'var(--lf-text-muted)' }}>
          <span style={{ color: 'var(--lf-accent)' }}>$</span> cat links.txt
        </p>
        <div className="mt-2 flex flex-col gap-2">
          {profile.links.map((link, i) => {
            const Icon = getLinkIcon(link.icon);
            return (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded p-2 transition-all duration-200 hover:translate-x-1 lf-anim-fade-up"
                style={{ animationDelay: `${0.3 + i * 0.06}s`, background: 'var(--lf-card)', border: '1px solid var(--lf-border)' }}
              >
                <Icon size={15} className="flex-shrink-0 text-[var(--lf-accent)]" />
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium" style={{ color: 'var(--lf-text)' }}>{link.title}</span>
                  {link.description && <p className="truncate text-xs" style={{ color: 'var(--lf-text-muted)' }}>{link.description}</p>}
                </div>
                <ExternalLink size={13} className="flex-shrink-0 text-[var(--lf-text-muted)] opacity-0 group-hover:opacity-100" />
              </a>
            );
          })}
        </div>
      </div>

      <div className="mt-8 lf-anim-fade-up" style={{ animationDelay: '0.5s' }}>
        <p className="text-sm" style={{ color: 'var(--lf-text-muted)' }}>
          <span style={{ color: 'var(--lf-accent)' }}>$</span> <span className="animate-pulse">_</span>
        </p>
      </div>

      <Footer />
    </div>
  );
}

/* 5. GRID */
function GridLayout({ profile }: LayoutProps) {
  return (
    <>
      <ProfileHeader profile={profile} />
      <Bio profile={profile} />
      <Socials profile={profile} />
      <div className="mt-8 grid w-full grid-cols-2 gap-3 sm:grid-cols-3">
        {profile.links.map((link, i) => {
          const Icon = getLinkIcon(link.icon);
          return (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3 p-5 lf-link-card lf-anim-fade-up"
              style={{ animationDelay: `${0.3 + i * 0.06}s`, flexDirection: 'column', ...(link.featured ? { borderColor: 'var(--lf-accent)' } : {}) }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl transition-transform group-hover:scale-110" style={{ background: 'var(--lf-accent-soft)' }}>
                <Icon size={22} className="text-[var(--lf-accent)]" />
              </div>
              <span className="truncate text-sm font-semibold text-center" style={{ color: 'var(--lf-text-heading)', fontFamily: 'var(--lf-font-heading)' }}>
                {link.title}
              </span>
            </a>
          );
        })}
      </div>
      <Footer />
    </>
  );
}

/* 6. FEATURED */
function FeaturedLayout({ profile }: LayoutProps) {
  const featured = profile.links.filter((l) => l.featured);
  const regular = profile.links.filter((l) => !l.featured);
  return (
    <>
      <ProfileHeader profile={profile} />
      <Bio profile={profile} />
      <Location profile={profile} />
      <Socials profile={profile} />

      {featured.length > 0 && (
        <div className="mt-8 flex w-full flex-col gap-4">
          {featured.map((link, i) => {
            const Icon = getLinkIcon(link.icon);
            return (
              <a
                key={`f-${i}`}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-3 p-6 lf-link-card lf-anim-fade-up"
                style={{ animationDelay: `${0.3 + i * 0.1}s`, flexDirection: 'column', borderColor: 'var(--lf-accent)', boxShadow: '0 0 40px var(--lf-accent-soft), var(--lf-card-shadow)' }}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl" style={{ background: 'var(--lf-accent-soft)' }}>
                  <Icon size={26} className="text-[var(--lf-accent)]" />
                </div>
                <div>
                  <span className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider" style={{ background: 'var(--lf-accent-soft)', color: 'var(--lf-accent)' }}>Featured</span>
                  <h3 className="mt-2 text-lg font-bold" style={{ color: 'var(--lf-text-heading)', fontFamily: 'var(--lf-font-heading)' }}>{link.title}</h3>
                  {link.description && <p className="mt-1 text-sm" style={{ color: 'var(--lf-text-muted)' }}>{link.description}</p>}
                </div>
              </a>
            );
          })}
        </div>
      )}

      {regular.length > 0 && (
        <div className="mt-3 flex w-full flex-col gap-3">
          {regular.map((link, i) => <LinkCard key={`r-${i}`} {...link} index={featured.length + i} />)}
        </div>
      )}
      <Footer />
    </>
  );
}

const layoutRenderers: Record<LayoutType, (props: LayoutProps) => JSX.Element> = {
  classic: ClassicLayout,
  cards: CardsLayout,
  compact: CompactLayout,
  terminal: TerminalLayout,
  grid: GridLayout,
  featured: FeaturedLayout,
};

export function LayoutRenderer({ profile, theme }: LayoutProps) {
  const layout = profile.layout ?? 'classic';
  const Renderer = layoutRenderers[layout] ?? ClassicLayout;
  return <Renderer profile={profile} theme={theme} />;
}
