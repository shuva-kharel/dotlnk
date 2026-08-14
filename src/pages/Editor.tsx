import { useState, useCallback, useEffect, lazy, Suspense } from 'react';
import {
  Plus, Trash2, ArrowUp, ArrowDown, Download, Upload, Eye, X,
  Check, AlertCircle, GripVertical, ArrowLeft,
} from 'lucide-react';
import type { Profile, Theme, LayoutType, SocialKey, LinkIcon } from '@/types/profile';
import { themes, getTheme, applyTheme } from '@/themes';
import { layoutList } from '@/layouts';
import { validateProfile, type ValidationResult } from '@/utils/validateProfile';
import { BackgroundEffects } from '@/components/BackgroundEffects';
import { ProfileSkeleton } from '@/components/ProfileSkeleton';
import { navigate } from '@/utils/router';
import { getLinkIcon } from '@/utils/iconMap';

const ProfileView = lazy(() => import('@/components/Profile').then(m => ({ default: m.ProfileView })));

const socialKeys: SocialKey[] = [
  'github', 'x', 'twitter', 'linkedin', 'instagram', 'youtube',
  'dribbble', 'behance', 'tiktok', 'twitch', 'discord', 'email',
  'website', 'mastodon', 'threads',
];

const linkIcons: LinkIcon[] = [
  'github', 'globe', 'link', 'mail', 'twitter', 'linkedin', 'youtube',
  'instagram', 'dribbble', 'behance', 'book', 'code', 'terminal', 'rocket',
  'star', 'award', 'briefcase', 'music', 'camera', 'pen-tool', 'zap',
  'heart', 'shopping-bag', 'play', 'external-link',
];

const defaultProfile: Profile = {
  username: 'your-username',
  name: 'Your Name',
  bio: 'A short description about yourself',
  avatar: 'https://images.pexels.com/photos/2341350/pexels-photo-2341350.jpeg?auto=compress&cs=tinysrgb&h=300&w=300',
  location: '',
  verified: false,
  theme: 'midnight',
  layout: 'classic',
  socials: { github: '', x: '', linkedin: '' } as Record<SocialKey, string>,
  links: [
    { title: 'My Website', description: 'Visit my personal website', url: 'https://example.com', icon: 'globe' },
  ],
};

export function Editor() {
  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [theme, setTheme] = useState<Theme>(getTheme('midnight'));
  const [showImport, setShowImport] = useState(false);
  const [importText, setImportText] = useState('');
  const [importError, setImportError] = useState('');
  const [validation, setValidation] = useState<ValidationResult>({ valid: true, errors: [] });
  const [exported, setExported] = useState(false);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    setValidation(validateProfile(profile));
  }, [profile]);

  const updateProfile = useCallback((updates: Partial<Profile>) => {
    setProfile((p) => ({ ...p, ...updates }));
  }, []);

  const updateSocial = useCallback((key: SocialKey, value: string) => {
    setProfile((p) => ({ ...p, socials: { ...(p.socials ?? {}), [key]: value } as Record<SocialKey, string> }));
  }, []);

  const updateLink = useCallback((index: number, updates: Partial<Profile['links'][0]>) => {
    setProfile((p) => ({
      ...p,
      links: p.links.map((l, i) => i === index ? { ...l, ...updates } : l),
    }));
  }, []);

  const addLink = useCallback(() => {
    setProfile((p) => ({
      ...p,
      links: [...p.links, { title: 'New Link', url: 'https://', icon: 'link' }],
    }));
  }, []);

  const removeLink = useCallback((index: number) => {
    setProfile((p) => ({ ...p, links: p.links.filter((_, i) => i !== index) }));
  }, []);

  const moveLink = useCallback((index: number, dir: -1 | 1) => {
    setProfile((p) => {
      const links = [...p.links];
      const target = index + dir;
      if (target < 0 || target >= links.length) return p;
      [links[index], links[target]] = [links[target], links[index]];
      return { ...p, links };
    });
  }, []);

  const handleThemeChange = useCallback((themeId: string) => {
    updateProfile({ theme: themeId });
    setTheme(getTheme(themeId));
  }, [updateProfile]);

  const handleExport = useCallback(() => {
    const json = JSON.stringify(profile, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${profile.username || 'profile'}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setExported(true);
    setTimeout(() => setExported(false), 2000);
  }, [profile]);

  const handleImport = useCallback(() => {
    setImportError('');
    try {
      const data = JSON.parse(importText);
      const result = validateProfile(data);
      if (!result.valid) {
        setImportError(result.errors.join(' '));
        return;
      }
      setProfile(data as Profile);
      const t = getTheme((data as Profile).theme);
      setTheme(t);
      applyTheme(t);
      setShowImport(false);
      setImportText('');
    } catch {
      setImportError('Invalid JSON syntax.');
    }
  }, [importText]);

  const handleFileImport = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result as string);
        const result = validateProfile(data);
        if (!result.valid) {
          setImportError(result.errors.join(' '));
          setShowImport(true);
          return;
        }
        setProfile(data as Profile);
        const t = getTheme((data as Profile).theme);
        setTheme(t);
        applyTheme(t);
      } catch {
        setImportError('Invalid JSON file.');
        setShowImport(true);
      }
    };
    reader.readAsText(file);
  }, []);

  return (
    <>
      <BackgroundEffects theme={theme} />

      {/* Editor nav */}
      <nav className="sticky top-0 z-50 backdrop-blur-md" style={{ background: 'color-mix(in srgb, var(--lf-bg) 80%, transparent)', borderBottom: '1px solid var(--lf-border)' }}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/')} className="flex items-center gap-2 transition-colors hover:text-[var(--lf-accent)]" style={{ color: 'var(--lf-text-muted)' }}>
              <ArrowLeft size={16} />
              <span className="text-sm font-medium hidden sm:inline">Back</span>
            </button>
            <span className="text-base font-bold" style={{ color: 'var(--lf-text-heading)', fontFamily: 'var(--lf-font-heading)' }}>
              Profile Editor
            </span>
            {validation.valid ? (
              <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--lf-accent)' }}>
                <Check size={12} /> Valid
              </span>
            ) : (
              <span className="flex items-center gap-1 text-xs" style={{ color: '#f59e0b' }}>
                <AlertCircle size={12} /> {validation.errors.length} issue{validation.errors.length > 1 ? 's' : ''}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:scale-105 cursor-pointer lf-card">
              <Upload size={14} />
              <span className="hidden sm:inline">Import</span>
              <input type="file" accept=".json" className="hidden" onChange={handleFileImport} />
            </label>
            <button onClick={() => setShowImport(true)} className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:scale-105 lf-card">
              <Eye size={14} />
              <span className="hidden sm:inline">Paste JSON</span>
            </button>
            <button onClick={handleExport} className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold transition-all hover:scale-105" style={{ background: 'var(--lf-accent)', color: '#fff' }}>
              {exported ? <Check size={14} /> : <Download size={14} />}
              <span className="hidden sm:inline">{exported ? 'Exported' : 'Export'}</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:py-8">
        <div className="grid gap-6 lg:grid-cols-[1fr,1fr] lg:gap-8">
          {/* LEFT: Config */}
          <div className="space-y-5">
            {/* Basic info */}
            <Section title="Profile">
              <Field label="Name">
                <input type="text" value={profile.name} onChange={(e) => updateProfile({ name: e.target.value })} className={inputClass} style={inputStyle} />
              </Field>
              <Field label="Username">
                <input type="text" value={profile.username} onChange={(e) => updateProfile({ username: e.target.value })} className={inputClass} style={inputStyle} />
              </Field>
              <Field label="Bio">
                <textarea value={profile.bio} onChange={(e) => updateProfile({ bio: e.target.value })} rows={2} className={inputClass} style={inputStyle} />
              </Field>
              <Field label="Avatar URL">
                <input type="text" value={profile.avatar} onChange={(e) => updateProfile({ avatar: e.target.value })} className={inputClass} style={inputStyle} />
              </Field>
              <Field label="Location">
                <input type="text" value={profile.location ?? ''} onChange={(e) => updateProfile({ location: e.target.value })} className={inputClass} style={inputStyle} />
              </Field>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={profile.verified ?? false} onChange={(e) => updateProfile({ verified: e.target.checked })} className="h-4 w-4 rounded" />
                <span className="text-sm" style={{ color: 'var(--lf-text)' }}>Verified badge</span>
              </label>
            </Section>

            {/* Theme + Layout */}
            <Section title="Design">
              <Field label="Theme">
                <select value={profile.theme ?? 'midnight'} onChange={(e) => handleThemeChange(e.target.value)} className={inputClass} style={inputStyle}>
                  {themes.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
                </select>
              </Field>
              <Field label="Layout">
                <select value={profile.layout ?? 'classic'} onChange={(e) => updateProfile({ layout: e.target.value as LayoutType })} className={inputClass} style={inputStyle}>
                  {layoutList.map((l) => <option key={l.id} value={l.id}>{l.name}</option>)}
                </select>
              </Field>
              <p className="text-xs" style={{ color: 'var(--lf-text-muted)' }}>
                {layoutList.find((l) => l.id === (profile.layout ?? 'classic'))?.description}
              </p>
            </Section>

            {/* Socials */}
            <Section title="Social Links">
              <div className="grid grid-cols-2 gap-3">
                {socialKeys.map((key) => (
                  <Field key={key} label={key}>
                    <input
                      type="text"
                      placeholder={key === 'email' ? 'you@example.com' : 'https://'}
                      value={profile.socials?.[key] ?? ''}
                      onChange={(e) => updateSocial(key, e.target.value)}
                      className={inputClass}
                      style={inputStyle}
                    />
                  </Field>
                ))}
              </div>
            </Section>

            {/* Links */}
            <Section title="Links">
              <div className="space-y-3">
                {profile.links.map((link, i) => (
                  <div key={i} className="rounded-xl p-4" style={{ background: 'var(--lf-card)', border: '1px solid var(--lf-border)' }}>
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-xs font-semibold" style={{ color: 'var(--lf-text-muted)' }}>Link {i + 1}</span>
                      <div className="flex items-center gap-1">
                        <button onClick={() => moveLink(i, -1)} disabled={i === 0} className="flex h-7 w-7 items-center justify-center rounded-md transition-colors hover:bg-[var(--lf-accent-soft)] disabled:opacity-30" style={{ color: 'var(--lf-text-muted)' }}>
                          <ArrowUp size={13} />
                        </button>
                        <button onClick={() => moveLink(i, 1)} disabled={i === profile.links.length - 1} className="flex h-7 w-7 items-center justify-center rounded-md transition-colors hover:bg-[var(--lf-accent-soft)] disabled:opacity-30" style={{ color: 'var(--lf-text-muted)' }}>
                          <ArrowDown size={13} />
                        </button>
                        <button onClick={() => removeLink(i)} className="flex h-7 w-7 items-center justify-center rounded-md transition-colors hover:bg-red-500/10" style={{ color: '#ef4444' }}>
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <input type="text" placeholder="Title" value={link.title} onChange={(e) => updateLink(i, { title: e.target.value })} className={inputClass} style={inputStyle} />
                      <input type="text" placeholder="Description" value={link.description ?? ''} onChange={(e) => updateLink(i, { description: e.target.value })} className={inputClass} style={inputStyle} />
                      <input type="text" placeholder="URL" value={link.url} onChange={(e) => updateLink(i, { url: e.target.value })} className={inputClass} style={inputStyle} />
                      <div className="flex items-center gap-2">
                        <select value={link.icon ?? 'link'} onChange={(e) => updateLink(i, { icon: e.target.value as LinkIcon })} className={`${inputClass} flex-1`} style={inputStyle}>
                          {linkIcons.map((ic) => <option key={ic} value={ic}>{ic}</option>)}
                        </select>
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ background: 'var(--lf-accent-soft)' }}>
                          {(() => { const Icon = getLinkIcon(link.icon); return <Icon size={16} className="text-[var(--lf-accent)]" />; })()}
                        </div>
                      </div>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={link.featured ?? false} onChange={(e) => updateLink(i, { featured: e.target.checked })} className="h-4 w-4 rounded" />
                        <span className="text-xs" style={{ color: 'var(--lf-text-muted)' }}>Featured link</span>
                      </label>
                    </div>
                  </div>
                ))}
                <button onClick={addLink} className="flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all hover:scale-[1.01] lf-card">
                  <Plus size={16} />
                  Add Link
                </button>
              </div>
            </Section>

            {/* Validation errors */}
            {!validation.valid && (
              <div className="rounded-xl p-4" style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)' }}>
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle size={15} style={{ color: '#f59e0b' }} />
                  <span className="text-sm font-semibold" style={{ color: '#f59e0b' }}>Validation issues</span>
                </div>
                <ul className="space-y-1">
                  {validation.errors.map((err, i) => (
                    <li key={i} className="text-xs" style={{ color: 'var(--lf-text-muted)' }}>• {err}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* RIGHT: Live preview */}
          <div className="lg:sticky lg:top-20 lg:h-[calc(100vh-6rem)] lg:overflow-y-auto">
            <div className="mb-3 flex items-center gap-2">
              <Eye size={15} className="text-[var(--lf-accent)]" />
              <span className="text-sm font-semibold" style={{ color: 'var(--lf-text-heading)' }}>Live Preview</span>
            </div>
            <div className="overflow-hidden rounded-2xl" style={{ border: '1px solid var(--lf-border)', boxShadow: 'var(--lf-card-shadow)' }}>
              <div className="max-h-[70vh] overflow-y-auto sm:max-h-[600px]">
                <Suspense fallback={<ProfileSkeleton />}>
                  <ProfileView profile={profile} theme={theme} />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Import modal */}
      {showImport && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Import JSON">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm lf-anim-fade-in" onClick={() => setShowImport(false)} />
          <div className="relative w-full max-w-lg overflow-hidden rounded-2xl lf-anim-scale-in" style={{ background: 'var(--lf-bg-alt)', border: '1px solid var(--lf-border)', boxShadow: '0 24px 80px rgba(0,0,0,0.5)' }}>
            <div className="flex items-center justify-between border-b px-5 py-4" style={{ borderColor: 'var(--lf-border)' }}>
              <h2 className="text-base font-semibold" style={{ color: 'var(--lf-text-heading)', fontFamily: 'var(--lf-font-heading)' }}>Import JSON</h2>
              <button onClick={() => setShowImport(false)} aria-label="Close" className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-[var(--lf-card)]" style={{ color: 'var(--lf-text-muted)' }}>
                <X size={18} />
              </button>
            </div>
            <div className="p-5">
              <textarea
                value={importText}
                onChange={(e) => setImportText(e.target.value)}
                placeholder='Paste profile JSON here...'
                rows={12}
                className="w-full rounded-xl p-3 text-xs outline-none transition-colors focus:border-[var(--lf-accent)]"
                style={{ background: 'var(--lf-card)', border: '1px solid var(--lf-border)', color: 'var(--lf-text)', fontFamily: 'var(--lf-font-mono)' }}
              />
              {importError && (
                <div className="mt-3 flex items-start gap-2 rounded-lg p-3" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)' }}>
                  <AlertCircle size={14} className="flex-shrink-0 mt-0.5" style={{ color: '#ef4444' }} />
                  <span className="text-xs" style={{ color: '#ef4444' }}>{importError}</span>
                </div>
              )}
              <button
                onClick={handleImport}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all hover:scale-[1.02]"
                style={{ background: 'var(--lf-accent)', color: '#fff' }}
              >
                <Upload size={15} />
                Load Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const inputClass = 'w-full rounded-lg px-3 py-2 text-sm outline-none transition-colors focus:border-[var(--lf-accent)]';
const inputStyle: React.CSSProperties = { background: 'var(--lf-card)', border: '1px solid var(--lf-border)', color: 'var(--lf-text)' };

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="lf-card p-5">
      <h3 className="mb-4 text-sm font-bold uppercase tracking-wider" style={{ color: 'var(--lf-accent)' }}>{title}</h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium" style={{ color: 'var(--lf-text-muted)' }}>{label}</span>
      {children}
    </label>
  );
}
