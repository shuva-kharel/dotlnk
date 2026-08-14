import { useEffect, useState, useCallback } from "react";
import {
  ArrowRight,
  Sparkles,
  Palette,
  Code2,
  Share2,
  Zap,
  Link2,
  Orbit,
  Network,
  Fingerprint,
  Terminal,
  AtSign,
  Github,
  FileJson,
  PenTool,
  Globe,
  Check,
  GitBranch,
  Mail,
  Download,
  Layout,
  Eye,
  QrCode,
  Shield,
  Package,
  Lock,
} from "lucide-react";
import type { Theme } from "@/types/profile";
import { themes, getTheme, applyTheme } from "@/themes";
import { layoutList } from "@/layouts";
import { BackgroundEffects } from "@/components/BackgroundEffects";
import { ThemePreview } from "@/components/ThemePreview";
import { ThemeSelector } from "@/components/ThemeSelector";
import { navigate } from "@/utils/router";

const GITHUB_URL = "https://github.com/shuva-kharel/dotlnk";
const TEMPLATE_URL = "/data/template.json";
const SUBMIT_EMAIL = "admin@shuvakharel.com.np";

const demoProfiles = [
  {
    username: "shuva",
    name: "Shuva Kharel",
    desc: "Cybersecurity • Linux",
    themeId: "glass",
  },
  {
    username: "alex",
    name: "Alex Rivera",
    desc: "Photographer",
    themeId: "minimal",
  },
  {
    username: "maya",
    name: "Maya Chen",
    desc: "Digital Artist",
    themeId: "sunset",
  },
  {
    username: "dev",
    name: "Dev Patel",
    desc: "Software Engineer",
    themeId: "terminal",
  },
];

export function Home() {
  const [previewTheme, setPreviewTheme] = useState<Theme>(getTheme("aurora"));
  const [cycleIdx, setCycleIdx] = useState(0);
  const [cycling, setCycling] = useState(true);
  const [showFullSelector, setShowFullSelector] = useState(false);

  useEffect(() => {
    applyTheme(previewTheme);
  }, [previewTheme]);

  useEffect(() => {
    if (!cycling) return;
    const interval = setInterval(() => {
      setCycleIdx((i) => {
        const next = (i + 1) % themes.length;
        setPreviewTheme(themes[next]);
        return next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [cycling]);

  const handleSelectTheme = useCallback((t: Theme) => {
    setCycling(false);
    setPreviewTheme(t);
  }, []);

  return (
    <>
      <BackgroundEffects theme={previewTheme} />

      <div className="relative z-10">
        <Nav />
        <Hero
          previewTheme={previewTheme}
          cycling={cycling}
          onToggleCycle={() => setCycling((c) => !c)}
        />
        <ThemeShowcase
          previewTheme={previewTheme}
          onSelect={handleSelectTheme}
          showAll={showFullSelector}
          onShowAll={() => setShowFullSelector(true)}
        />
        <LayoutShowcase />
        <HowItWorks />
        <EditorShowcase />
        <MakeItYours />
        <PrivacySection />
        <GitHubCTA />
        <DemoProfiles />
        <Footer />
      </div>
    </>
  );
}

function Nav() {
  return (
    <nav
      className="sticky top-0 z-50 backdrop-blur-md"
      style={{
        background: "color-mix(in srgb, var(--lf-bg) 75%, transparent)",
        borderBottom: "1px solid var(--lf-border)",
      }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2"
        >
          <div
            className="flex h-8 w-8 items-center justify-center rounded-lg"
            style={{ background: "var(--lf-accent)" }}
          >
            <Fingerprint size={18} className="text-white" fill="white" />
          </div>
          <span
            className="text-lg font-bold"
            style={{
              color: "var(--lf-text-heading)",
              fontFamily: "var(--lf-font-heading)",
            }}
          >
            dotlnk
          </span>
        </button>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/editor")}
            className="hidden sm:flex items-center gap-1.5 text-sm transition-colors hover:text-[var(--lf-accent)]"
            style={{ color: "var(--lf-text-muted)" }}
          >
            <Eye size={16} /> Editor
          </button>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 text-sm transition-colors hover:text-[var(--lf-accent)]"
            style={{ color: "var(--lf-text-muted)" }}
          >
            <Github size={16} /> GitHub
          </a>
          <button
            onClick={() => navigate("/shuva")}
            className="rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-300 hover:scale-105"
            style={{ background: "var(--lf-accent)", color: "#fff" }}
          >
            View Demo
          </button>
        </div>
      </div>
    </nav>
  );
}

function Hero({
  previewTheme,
  cycling,
  onToggleCycle,
}: {
  previewTheme: Theme;
  cycling: boolean;
  onToggleCycle: () => void;
}) {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-12 pb-20 sm:px-6 sm:pt-20 sm:pb-28">
      <div className="grid items-center gap-10 lg:grid-cols-[1.1fr,0.9fr] lg:gap-16">
        <div className="text-center lg:text-left">
          <div
            className="mb-5 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium lf-anim-fade-up"
            style={{
              background: "var(--lf-accent-soft)",
              color: "var(--lf-accent)",
            }}
          >
            <Sparkles size={13} />
            15 themes • 6 layouts • JSON-powered
          </div>

          <h1
            className="text-4xl font-bold leading-[1.1] tracking-tight lf-anim-fade-up sm:text-5xl lg:text-6xl"
            style={{
              animationDelay: "0.05s",
              color: "var(--lf-text-heading)",
              fontFamily: "var(--lf-font-heading)",
            }}
          >
            Your identity,
            <br />
            <span style={{ color: "var(--lf-accent)" }}>configured.</span>
          </h1>

          <p
            className="mx-auto mt-5 max-w-md text-base lf-anim-fade-up sm:text-lg lg:mx-0"
            style={{
              animationDelay: "0.1s",
              color: "var(--lf-text-muted)",
              lineHeight: 1.6,
            }}
          >
            A lightweight, open and customizable profile platform powered by
            simple JSON. No database, no backend — just data and design.
          </p>

          <div
            className="mt-8 flex flex-col items-center gap-3 lf-anim-fade-up sm:flex-row lg:justify-start"
            style={{ animationDelay: "0.15s" }}
          >
            <button
              onClick={() => navigate("/shuva")}
              className="group flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition-all duration-300 hover:scale-105 sm:w-auto"
              style={{ background: "var(--lf-accent)", color: "#fff" }}
            >
              Explore a Profile
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full rounded-xl px-6 py-3.5 text-sm font-semibold transition-all duration-300 hover:scale-105 sm:w-auto lf-card"
            >
              Build Your Own
            </a>
          </div>

          <p
            className="mt-4 text-xs lf-anim-fade-up"
            style={{ animationDelay: "0.2s", color: "var(--lf-text-muted)" }}
          >
            Clone it. Customize it. Or just create a profile.
          </p>
        </div>

        {/* Interactive preview card */}
        <div
          className="flex justify-center lg:justify-end lf-anim-scale-in"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="w-full max-w-sm">
            <div
              className="relative overflow-hidden rounded-3xl p-6"
              style={{
                background: previewTheme.colors.bg,
                border: `1px solid ${previewTheme.colors.border}`,
                boxShadow: `0 20px 60px rgba(0,0,0,0.3), 0 0 40px ${previewTheme.colors.accentSoft}`,
                fontFamily: previewTheme.fonts.body,
              }}
            >
              <div className="flex flex-col items-center text-center">
                <div
                  className="h-20 w-20 rounded-full"
                  style={{
                    background: `linear-gradient(135deg, ${previewTheme.colors.accent}, ${previewTheme.colors.cardHover})`,
                    border: `3px solid ${previewTheme.colors.border}`,
                    boxShadow: `0 0 20px ${previewTheme.colors.accentSoft}`,
                  }}
                />
                <h3
                  className="mt-4 text-xl font-bold"
                  style={{
                    color: previewTheme.colors.textHeading,
                    fontFamily: previewTheme.fonts.heading,
                  }}
                >
                  Preview User
                </h3>
                <p
                  className="mt-0.5 text-sm"
                  style={{ color: previewTheme.colors.textMuted }}
                >
                  @preview
                </p>
                <p
                  className="mt-3 text-sm"
                  style={{ color: previewTheme.colors.text }}
                >
                  This is how your profile looks.
                </p>

                <div className="mt-5 flex w-full flex-col gap-2.5">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 rounded-xl p-3.5"
                      style={{
                        background: previewTheme.colors.card,
                        border: `1px solid ${previewTheme.colors.border}`,
                        borderRadius: previewTheme.card.radius,
                      }}
                    >
                      <div
                        className="h-8 w-8 rounded-lg"
                        style={{ background: previewTheme.colors.accentSoft }}
                      />
                      <div className="flex-1">
                        <div
                          className="h-2.5 w-20 rounded-full"
                          style={{
                            background: previewTheme.colors.textHeading,
                          }}
                        />
                        <div
                          className="mt-1.5 h-2 w-28 rounded-full"
                          style={{
                            background: previewTheme.colors.textMuted,
                            opacity: 0.5,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span
                  className="text-xs font-semibold"
                  style={{ color: previewTheme.colors.accent }}
                >
                  {previewTheme.name}
                </span>
                <button
                  onClick={onToggleCycle}
                  className="flex items-center gap-1.5 text-[11px] transition-opacity hover:opacity-80"
                  style={{ color: previewTheme.colors.textMuted }}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${cycling ? "animate-pulse" : ""}`}
                    style={{
                      background: cycling
                        ? previewTheme.colors.accent
                        : previewTheme.colors.textMuted,
                    }}
                  />
                  {cycling ? "Cycling" : "Paused"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ThemeShowcase({
  previewTheme,
  onSelect,
  showAll,
  onShowAll,
}: {
  previewTheme: Theme;
  onSelect: (t: Theme) => void;
  showAll: boolean;
  onShowAll: () => void;
}) {
  const visible = showAll ? themes : themes.slice(0, 6);

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <SectionHeading
        eyebrow="Theme Engine"
        title="A theme system that feels different"
        subtitle="Each theme changes colors, typography, card shapes, backgrounds, animations, and even fonts. Hover to preview, click to select."
      />

      <div className="mt-10">
        {showAll ? (
          <ThemeSelector selectedId={previewTheme.id} onSelect={onSelect} />
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
            {visible.map((theme, i) => (
              <button
                key={theme.id}
                onClick={() => {
                  onSelect(theme);
                  onShowAll();
                }}
                className="group relative overflow-hidden rounded-2xl text-left transition-all duration-300 hover:-translate-y-1 lf-anim-fade-up"
                style={{
                  animationDelay: `${i * 0.05}s`,
                  border: `2px solid ${previewTheme.id === theme.id ? "var(--lf-accent)" : "transparent"}`,
                }}
              >
                <ThemePreview theme={theme} />
                <div className="px-3 pb-3 pt-1">
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "var(--lf-text-heading)" }}
                  >
                    {theme.name}
                  </p>
                  <p
                    className="text-[11px]"
                    style={{ color: "var(--lf-text-muted)" }}
                  >
                    {theme.category}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}

        {!showAll && (
          <div className="mt-8 text-center">
            <button
              onClick={onShowAll}
              className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-300 hover:scale-105 lf-card"
            >
              <Palette size={16} />
              View all {themes.length} themes
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function LayoutShowcase() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <SectionHeading
        eyebrow="Layouts"
        title="Six ways to present yourself"
        subtitle="Themes control how your profile looks. Layouts control how it's structured. Mix and match freely."
      />
      <div className="mt-12 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {layoutList.map((layout, i) => (
          <div
            key={layout.id}
            className="lf-card p-5 transition-all duration-300 hover:-translate-y-1 lf-anim-fade-up"
            style={{ animationDelay: `${i * 0.07}s` }}
          >
            <div
              className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl"
              style={{ background: "var(--lf-accent-soft)" }}
            >
              <Layout size={18} className="text-[var(--lf-accent)]" />
            </div>
            <h3
              className="text-sm font-bold"
              style={{
                color: "var(--lf-text-heading)",
                fontFamily: "var(--lf-font-heading)",
              }}
            >
              {layout.name}
            </h3>
            <p
              className="mt-1 text-xs leading-relaxed"
              style={{ color: "var(--lf-text-muted)" }}
            >
              {layout.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      icon: FileJson,
      step: "01",
      title: "Write your JSON",
      desc: "Create a simple JSON file with your name, bio, socials, and links. No database, no signup.",
    },
    {
      icon: Palette,
      step: "02",
      title: "Pick a theme & layout",
      desc: "Choose from 15 themes and 6 layouts. Each combination is a completely different visual identity.",
    },
    {
      icon: Share2,
      step: "03",
      title: "Share your link",
      desc: "Deploy and share lnk.shuvakharel.com.np/username. QR codes built in for easy sharing.",
    },
  ];

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <SectionHeading
        eyebrow="How It Works"
        title="Three steps to your profile"
        subtitle="From zero to live in minutes — no servers, no databases, no complexity."
      />
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {steps.map((s, i) => (
          <div
            key={s.step}
            className="relative lf-anim-fade-up"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="lf-card p-7 h-full">
              <div className="flex items-center justify-between">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ background: "var(--lf-accent-soft)" }}
                >
                  <s.icon size={22} className="text-[var(--lf-accent)]" />
                </div>
                <span
                  className="text-3xl font-bold opacity-20"
                  style={{
                    color: "var(--lf-text-heading)",
                    fontFamily: "var(--lf-font-heading)",
                  }}
                >
                  {s.step}
                </span>
              </div>
              <h3
                className="mt-5 text-lg font-semibold"
                style={{
                  color: "var(--lf-text-heading)",
                  fontFamily: "var(--lf-font-heading)",
                }}
              >
                {s.title}
              </h3>
              <p
                className="mt-2 text-sm leading-relaxed"
                style={{ color: "var(--lf-text-muted)" }}
              >
                {s.desc}
              </p>
            </div>
            {i < steps.length - 1 && (
              <div className="hidden md:block absolute top-1/2 -right-3 z-10 h-6 w-6 -translate-y-1/2">
                <ArrowRight size={20} className="text-[var(--lf-border)]" />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function EditorShowcase() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
        <div>
          <SectionHeading
            eyebrow="Local Editor"
            title="Build your profile in the browser"
            subtitle="A full profile editor that runs entirely on your device. No login, no server, no data leaves your browser."
            align="left"
          />
          <ul className="mt-8 space-y-3">
            {[
              { icon: Eye, text: "Live preview updates as you type" },
              {
                icon: Palette,
                text: "Switch between all 15 themes and 6 layouts instantly",
              },
              { icon: Download, text: "Export your profile as a JSON file" },
              { icon: Code2, text: "Import existing JSON to edit it further" },
              {
                icon: QrCode,
                text: "Every profile gets a built-in QR share button",
              },
            ].map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 lf-anim-fade-up"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div
                  className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full"
                  style={{ background: "var(--lf-accent)" }}
                >
                  <item.icon size={11} className="text-white" />
                </div>
                <span className="text-sm" style={{ color: "var(--lf-text)" }}>
                  {item.text}
                </span>
              </li>
            ))}
          </ul>
          <button
            onClick={() => navigate("/editor")}
            className="group mt-8 flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition-all duration-300 hover:scale-105 lf-anim-fade-up"
            style={{
              animationDelay: "0.4s",
              background: "var(--lf-accent)",
              color: "#fff",
            }}
          >
            <Eye size={16} />
            Try the Editor
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>
        </div>

        {/* Editor mockup */}
        <div
          className="lf-card overflow-hidden p-0 lf-anim-scale-in"
          style={{ animationDelay: "0.15s" }}
        >
          <div
            className="flex items-center gap-2 border-b px-4 py-3"
            style={{ borderColor: "var(--lf-border)" }}
          >
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-red-400/60" />
              <div className="h-3 w-3 rounded-full bg-yellow-400/60" />
              <div className="h-3 w-3 rounded-full bg-green-400/60" />
            </div>
            <span
              className="ml-2 text-xs font-medium"
              style={{
                color: "var(--lf-text-muted)",
                fontFamily: "var(--lf-font-mono)",
              }}
            >
              dotlnk / editor
            </span>
          </div>
          <div className="grid grid-cols-2 gap-0">
            {/* Left panel */}
            <div
              className="border-r p-4 space-y-3"
              style={{ borderColor: "var(--lf-border)" }}
            >
              <div
                className="text-[10px] font-bold uppercase tracking-wider"
                style={{ color: "var(--lf-accent)" }}
              >
                Profile
              </div>
              <div
                className="h-7 rounded"
                style={{ background: "var(--lf-card)" }}
              />
              <div
                className="h-7 rounded"
                style={{ background: "var(--lf-card)" }}
              />
              <div
                className="text-[10px] font-bold uppercase tracking-wider"
                style={{ color: "var(--lf-accent)" }}
              >
                Theme
              </div>
              <div
                className="h-7 rounded"
                style={{ background: "var(--lf-card)" }}
              />
              <div
                className="text-[10px] font-bold uppercase tracking-wider"
                style={{ color: "var(--lf-accent)" }}
              >
                Links
              </div>
              <div
                className="h-7 rounded"
                style={{ background: "var(--lf-card)" }}
              />
              <div
                className="h-7 rounded"
                style={{ background: "var(--lf-card)" }}
              />
              <div
                className="flex items-center justify-center gap-1.5 rounded h-7 text-[10px] font-semibold"
                style={{
                  background: "var(--lf-accent-soft)",
                  color: "var(--lf-accent)",
                }}
              >
                <PenTool size={10} /> Add Link
              </div>
            </div>
            {/* Right preview */}
            <div className="p-4 flex flex-col items-center text-center gap-2">
              <div
                className="h-12 w-12 rounded-full"
                style={{
                  background: `linear-gradient(135deg, var(--lf-accent), var(--lf-card-hover))`,
                }}
              />
              <div
                className="h-2.5 w-16 rounded-full"
                style={{ background: "var(--lf-text-heading)" }}
              />
              <div
                className="h-2 w-12 rounded-full"
                style={{ background: "var(--lf-text-muted)", opacity: 0.5 }}
              />
              <div className="mt-2 w-full space-y-1.5">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="h-6 rounded-lg"
                    style={{
                      background: "var(--lf-card)",
                      border: "1px solid var(--lf-border)",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MakeItYours() {
  const customItems = [
    "Themes",
    "Branding",
    "Profile layouts",
    "JSON profiles",
    "Colors",
    "Fonts",
    "Components",
    "Features",
  ];

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <SectionHeading
        eyebrow="Make it yours"
        title="Make it yours."
        subtitle="dotlnk is open source and built to be customized. Create your own profile, customize the design, and make dotlnk your own."
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-8">
        {/* Method 1: Clone */}
        <div className="lf-card p-7 lf-anim-fade-up">
          <div className="mb-4 flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl"
              style={{ background: "var(--lf-accent-soft)" }}
            >
              <GitBranch size={20} className="text-[var(--lf-accent)]" />
            </div>
            <div>
              <p
                className="text-[11px] font-bold uppercase tracking-wider"
                style={{ color: "var(--lf-accent)" }}
              >
                Option A
              </p>
              <h3
                className="text-lg font-semibold"
                style={{
                  color: "var(--lf-text-heading)",
                  fontFamily: "var(--lf-font-heading)",
                }}
              >
                Build your own
              </h3>
            </div>
          </div>

          <p
            className="text-sm leading-relaxed"
            style={{ color: "var(--lf-text-muted)" }}
          >
            Head over to GitHub, clone the dotlnk repository, customize it
            however you want, and deploy your own instance.
          </p>

          <div
            className="my-5 rounded-xl p-4"
            style={{ background: "var(--lf-bg-alt)" }}
          >
            <div
              className="flex flex-col items-center gap-1.5 text-center"
              style={{ fontFamily: "var(--lf-font-mono)" }}
            >
              {[
                "GitHub",
                "Clone",
                "Customize",
                "Deploy",
                "Your own dotlnk",
              ].map((step, i, arr) => (
                <div key={step} className="flex flex-col items-center">
                  <span
                    className="text-xs font-medium"
                    style={{
                      color:
                        i === arr.length - 1
                          ? "var(--lf-accent)"
                          : "var(--lf-text)",
                    }}
                  >
                    {step}
                  </span>
                  {i < arr.length - 1 && (
                    <span style={{ color: "var(--lf-text-muted)" }}>↓</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <p
            className="mb-3 text-xs font-medium"
            style={{ color: "var(--lf-text-muted)" }}
          >
            Customize everything:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {customItems.map((item) => (
              <span
                key={item}
                className="rounded-md px-2 py-1 text-[11px] font-medium"
                style={{
                  background: "var(--lf-accent-soft)",
                  color: "var(--lf-accent)",
                }}
              >
                {item}
              </span>
            ))}
          </div>

          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-6 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-300 hover:scale-[1.02]"
            style={{ background: "var(--lf-accent)", color: "#fff" }}
          >
            <Github size={16} />
            Clone from GitHub
            <ArrowRight
              size={15}
              className="transition-transform group-hover:translate-x-1"
            />
          </a>
        </div>

        {/* Method 2: Submit a profile */}
        <div
          className="lf-card p-7 lf-anim-fade-up"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="mb-4 flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl"
              style={{ background: "var(--lf-accent-soft)" }}
            >
              <PenTool size={20} className="text-[var(--lf-accent)]" />
            </div>
            <div>
              <p
                className="text-[11px] font-bold uppercase tracking-wider"
                style={{ color: "var(--lf-accent)" }}
              >
                Option B
              </p>
              <h3
                className="text-lg font-semibold"
                style={{
                  color: "var(--lf-text-heading)",
                  fontFamily: "var(--lf-font-heading)",
                }}
              >
                Just want a profile?
              </h3>
            </div>
          </div>

          <p
            className="text-sm leading-relaxed"
            style={{ color: "var(--lf-text-muted)" }}
          >
            Use the profile template, fill in your information, and send it to
            us. We'll add your profile to the public dotlnk instance.
          </p>

          <div
            className="my-5 rounded-xl p-4"
            style={{ background: "var(--lf-bg-alt)" }}
          >
            <div
              className="flex flex-col items-center gap-1.5 text-center"
              style={{ fontFamily: "var(--lf-font-mono)" }}
            >
              {[
                "template.json",
                "Fill it out",
                "Email to admin",
                "Profile goes live",
              ].map((step, i, arr) => (
                <div key={step} className="flex flex-col items-center">
                  <span
                    className="text-xs font-medium"
                    style={{
                      color:
                        i === arr.length - 1
                          ? "var(--lf-accent)"
                          : "var(--lf-text)",
                    }}
                  >
                    {step}
                  </span>
                  {i < arr.length - 1 && (
                    <span style={{ color: "var(--lf-text-muted)" }}>↓</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div
            className="mb-4 rounded-lg p-3 text-xs"
            style={{
              background: "var(--lf-bg-alt)",
              color: "var(--lf-text-muted)",
            }}
          >
            <p className="font-medium" style={{ color: "var(--lf-text)" }}>
              How it works:
            </p>
            <ol className="mt-1.5 space-y-1 pl-4">
              <li>
                1. Open{" "}
                <a
                  href={TEMPLATE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                  style={{ color: "var(--lf-accent)" }}
                >
                  /data/template.json
                </a>
              </li>
              <li>2. Copy the template and fill in your info</li>
              <li>
                3. Save it as your username (e.g.{" "}
                <span style={{ color: "var(--lf-text)" }}>shuva.json</span>)
              </li>
              <li>4. Email it to {SUBMIT_EMAIL}</li>
            </ol>
          </div>

          <div className="flex flex-col gap-2.5 sm:flex-row">
            <a
              href={TEMPLATE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-1 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-300 hover:scale-[1.02]"
              style={{ background: "var(--lf-accent)", color: "#fff" }}
            >
              <Download size={15} />
              Get the Template
              <ArrowRight
                size={15}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
            <a
              href={`mailto:${SUBMIT_EMAIL}`}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-300 hover:scale-[1.02] lf-card"
            >
              <Mail size={15} />
              Submit Your Profile
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function PrivacySection() {
  const points = [
    {
      icon: Github,
      label: "Open source",
      desc: "Full source on GitHub — clone, read, modify.",
    },
    {
      icon: Zap,
      label: "Static-first",
      desc: "No server runtime. Just files and a fast frontend.",
    },
    {
      icon: Package,
      label: "Self-hostable",
      desc: "Deploy your own instance in minutes.",
    },
    {
      icon: FileJson,
      label: "JSON-powered",
      desc: "Profiles are simple JSON files. No databases.",
    },
    {
      icon: Lock,
      label: "No account required",
      desc: "No login, no signup, no SaaS account needed.",
    },
    {
      icon: Shield,
      label: "No tracking by default",
      desc: "No analytics, no cookies, no tracking scripts.",
    },
  ];

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <SectionHeading
        eyebrow="Privacy First"
        title="Your profile shouldn't need a database."
        subtitle="dotlnk keeps things simple: static files, JSON profiles, and a frontend you control."
      />
      <div className="mt-12 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {points.map((p, i) => (
          <div
            key={p.label}
            className="lf-card p-5 lf-anim-fade-up"
            style={{ animationDelay: `${i * 0.06}s` }}
          >
            <div
              className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg"
              style={{ background: "var(--lf-accent-soft)" }}
            >
              <p.icon size={16} className="text-[var(--lf-accent)]" />
            </div>
            <h3
              className="text-sm font-bold"
              style={{
                color: "var(--lf-text-heading)",
                fontFamily: "var(--lf-font-heading)",
              }}
            >
              {p.label}
            </h3>
            <p
              className="mt-1 text-xs leading-relaxed"
              style={{ color: "var(--lf-text-muted)" }}
            >
              {p.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function GitHubCTA() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="lf-card overflow-hidden p-0 lf-anim-scale-in">
        <div className="flex flex-col items-center gap-6 p-10 text-center sm:p-16">
          <div
            className="flex h-16 w-16 items-center justify-center rounded-2xl"
            style={{ background: "var(--lf-accent-soft)" }}
          >
            <Github size={32} className="text-[var(--lf-accent)]" />
          </div>
          <div>
            <h2
              className="text-2xl font-bold tracking-tight sm:text-3xl"
              style={{
                color: "var(--lf-text-heading)",
                fontFamily: "var(--lf-font-heading)",
              }}
            >
              Get dotlnk
            </h2>
            <p
              className="mx-auto mt-3 max-w-md text-sm"
              style={{ color: "var(--lf-text-muted)", lineHeight: 1.6 }}
            >
              Clone the repository, customize it, and deploy your own instance.
              Or just star it and come back later.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition-all duration-300 hover:scale-105"
              style={{ background: "var(--lf-accent)", color: "#fff" }}
            >
              <Github size={16} />
              View on GitHub
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
            <button
              onClick={() => navigate("/editor")}
              className="flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition-all duration-300 hover:scale-105 lf-card"
            >
              <Eye size={16} />
              Try the Editor
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function DemoProfiles() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <SectionHeading
        eyebrow="Example Profiles"
        title="See it in action"
        subtitle="Four demo profiles, each showcasing a different theme and personality."
      />
      <div className="mt-12 grid gap-4 sm:grid-cols-2 sm:gap-5">
        {demoProfiles.map((p, i) => {
          const theme = getTheme(p.themeId);
          return (
            <button
              key={p.username}
              onClick={() => navigate(`/${p.username}`)}
              className="group relative overflow-hidden rounded-2xl text-left transition-all duration-300 hover:-translate-y-1 lf-anim-fade-up"
              style={{
                animationDelay: `${i * 0.08}s`,
                border: `1px solid var(--lf-border)`,
              }}
            >
              <div
                className="flex items-center gap-4 p-5"
                style={{ background: "var(--lf-card)" }}
              >
                <div
                  className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full text-lg font-bold"
                  style={{
                    background: `linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.cardHover})`,
                    color: "#fff",
                    fontFamily: theme.fonts.heading,
                  }}
                >
                  {p.name.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <h3
                    className="truncate text-base font-semibold"
                    style={{ color: "var(--lf-text-heading)" }}
                  >
                    {p.name}
                  </h3>
                  <p
                    className="truncate text-sm"
                    style={{ color: "var(--lf-text-muted)" }}
                  >
                    {p.desc}
                  </p>
                  <span
                    className="mt-1 inline-block text-[11px] font-medium"
                    style={{ color: theme.colors.accent }}
                  >
                    {theme.name} theme
                  </span>
                </div>
                <ArrowRight
                  size={18}
                  className="flex-shrink-0 text-[var(--lf-text-muted)] transition-transform group-hover:translate-x-1"
                />
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t" style={{ borderColor: "var(--lf-border)" }}>
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-10 sm:px-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex items-center gap-2">
            <div
              className="flex h-7 w-7 items-center justify-center rounded-lg"
              style={{ background: "var(--lf-accent)" }}
            >
              <Fingerprint size={15} className="text-white" fill="white" />
            </div>
            <span
              className="font-bold"
              style={{
                color: "var(--lf-text-heading)",
                fontFamily: "var(--lf-font-heading)",
              }}
            >
              dotlnk
            </span>
          </div>
          <p className="text-sm" style={{ color: "var(--lf-text-muted)" }}>
            Your identity, configured.
          </p>
        </div>

        <div
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm"
          style={{ color: "var(--lf-text-muted)" }}
        >
          <button
            onClick={() => navigate("/shuva")}
            className="transition-colors hover:text-[var(--lf-accent)]"
          >
            Demo
          </button>
          <button
            onClick={() => navigate("/editor")}
            className="transition-colors hover:text-[var(--lf-accent)]"
          >
            Editor
          </button>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 transition-colors hover:text-[var(--lf-accent)]"
          >
            <Github size={14} /> GitHub
          </a>
          <a
            href={TEMPLATE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[var(--lf-accent)]"
          >
            Template
          </a>
          <a
            href={`mailto:${SUBMIT_EMAIL}`}
            className="transition-colors hover:text-[var(--lf-accent)]"
          >
            Submit Profile
          </a>
        </div>

        <p
          className="text-xs"
          style={{ color: "var(--lf-text-muted)", opacity: 0.7 }}
        >
          Open source. Built to be yours.
        </p>
      </div>
    </footer>
  );
}

function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  align?: "center" | "left";
}) {
  return (
    <div
      className={
        align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"
      }
    >
      <p
        className="mb-3 text-xs font-bold uppercase tracking-wider"
        style={{ color: "var(--lf-accent)" }}
      >
        {eyebrow}
      </p>
      <h2
        className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl"
        style={{
          color: "var(--lf-text-heading)",
          fontFamily: "var(--lf-font-heading)",
        }}
      >
        {title}
      </h2>
      <p
        className="mt-3 text-base"
        style={{ color: "var(--lf-text-muted)", lineHeight: 1.6 }}
      >
        {subtitle}
      </p>
    </div>
  );
}
