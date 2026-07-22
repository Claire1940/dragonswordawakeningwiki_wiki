"use client";

import { Suspense, lazy } from "react";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Check,
  Crosshair,
  ExternalLink,
  Gamepad2,
  Rocket,
  Route,
  Search,
  Sparkles,
  UserCheck,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import { useMessages } from "next-intl";
import { VideoFeature } from "@/components/home/VideoFeature";
import { LatestGuidesAccordion } from "@/components/home/LatestGuidesAccordion";
import { NativeBannerAd, AdBanner } from "@/components/ads";
// import { SidebarAd } from "@/components/ads/SidebarAd";
import { scrollToSection } from "@/lib/scrollToSection";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import type { ContentItemWithType } from "@/lib/getLatestArticles";

// Lazy load heavy components
const HeroStats = lazy(() => import("@/components/home/HeroStats"));
const FAQSection = lazy(() => import("@/components/home/FAQSection"));
const CTASection = lazy(() => import("@/components/home/CTASection"));

// Loading placeholder
const LoadingPlaceholder = ({ height = "h-64" }: { height?: string }) => (
  <div
    className={`${height} bg-white/5 border border-border rounded-xl animate-pulse`}
  />
);

interface HomePageClientProps {
  latestArticles: ContentItemWithType[];
  locale: string;
}

export default function HomePageClient({
  latestArticles,
  locale,
}: HomePageClientProps) {
  const t = useMessages() as any;
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.dragonswordawakeningwiki.wiki";

  // Structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "DragonSword Awakening Wiki",
        description:
          "Complete DragonSword: Awakening Wiki covering heroes, builds, tier lists, combat, walkthroughs, weapons, bosses, and updates for the anime open world action RPG on Steam.",
        image: {
          "@type": "ImageObject",
          url: `${siteUrl}/images/hero.webp`,
          width: 1920,
          height: 1080,
          caption: "DragonSword: Awakening - Anime Open World Action RPG",
        },
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteUrl}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "DragonSword Awakening Wiki",
        alternateName: "DragonSword: Awakening",
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/android-chrome-512x512.png`,
          width: 512,
          height: 512,
        },
        image: {
          "@type": "ImageObject",
          url: `${siteUrl}/images/hero.webp`,
          width: 1920,
          height: 1080,
          caption: "DragonSword Awakening Wiki - Anime Open World Action RPG",
        },
        sameAs: [
          "https://store.steampowered.com/app/4570720/DragonSword__Awakening/",
          "https://x.com/DSAwakening",
          "https://www.reddit.com/r/DragonSwordAwakening/",
          "https://www.youtube.com/@DragonSwordAwakening",
        ],
      },
      {
        "@type": "VideoGame",
        name: "DragonSword: Awakening",
        gamePlatform: ["PC", "Steam"],
        applicationCategory: "Game",
        genre: ["RPG", "Action", "Open World", "Anime"],
        numberOfPlayers: {
          minValue: 1,
          maxValue: 1,
        },
        offers: {
          "@type": "Offer",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: "https://store.steampowered.com/app/4570720/DragonSword__Awakening/",
        },
      },
      {
        "@type": "VideoObject",
        name: "DragonSword: Awakening - Official Preview Trailer",
        description:
          "Official DragonSword: Awakening preview trailer showcasing the anime-style open world action RPG developed by Hound13.",
        uploadDate: "2026-07-22",
        thumbnailUrl: `${siteUrl}/images/hero.webp`,
        embedUrl: "https://www.youtube.com/embed/bvqGAuu-ZIM",
        url: "https://www.youtube.com/watch?v=bvqGAuu-ZIM",
      },
    ],
  };

  return (
    <div className="home-shell min-h-screen bg-background text-foreground">
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* 左侧广告容器 - Fixed 定位（social bar 已废弃，保持禁用） */}
      {/* <aside
        className="hidden xl:block fixed top-20 w-40 z-10"
        style={{ left: "calc((100vw - 896px) / 2 - 180px)" }}
      >
        <SidebarAd
          type="sidebar-160x300"
          adKey={process.env.NEXT_PUBLIC_AD_SIDEBAR_160X300}
        />
      </aside> */}

      {/* 右侧广告容器 - Fixed 定位（social bar 已废弃，保持禁用） */}
      {/* <aside
        className="hidden xl:block fixed top-20 w-40 z-10"
        style={{ right: "calc((100vw - 896px) / 2 - 180px)" }}
      >
        <SidebarAd
          type="sidebar-160x600"
          adKey={process.env.NEXT_PUBLIC_AD_SIDEBAR_160X600}
        />
      </aside> */}

      {/* 广告位 1: 顶部固定横幅 */}
      <div className="sticky top-20 z-20 border-b border-border py-2">
        <AdBanner type="banner-320x50" adKey={process.env.NEXT_PUBLIC_AD_MOBILE_320X50} />
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pt-24 pb-14 md:pt-32 md:pb-20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 scroll-reveal">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 md:px-4 md:py-2
                            bg-[hsl(var(--nav-theme)/0.1)]
                            border border-[hsl(var(--nav-theme)/0.3)] mb-4 md:mb-6"
            >
              <Sparkles className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-xs md:text-sm font-medium">
                {t.hero.badge}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 md:mb-6 leading-[1.05]">
              {t.hero.title}
            </h1>

            {/* Description */}
            <p className="mx-auto mb-8 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg md:mb-10 md:max-w-3xl md:text-2xl">
              {t.hero.description}
            </p>

            {/* CTA Buttons */}
            <div className="mb-10 flex flex-col justify-center gap-3 sm:flex-row md:mb-12 md:gap-4">
              <a
                href="https://store.steampowered.com/app/4570720/DragonSword__Awakening/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 md:px-8 md:py-4
                           bg-[hsl(var(--nav-theme))] hover:bg-[hsl(var(--nav-theme)/0.9)]
                           text-white rounded-lg font-semibold text-base md:text-lg transition-colors"
              >
                <Gamepad2 className="w-5 h-5" />
                {t.hero.playOnSteamCTA}
              </a>
              <a
                href="https://www.youtube.com/watch?v=bvqGAuu-ZIM"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 md:px-8 md:py-4
                           border border-border hover:bg-white/10 rounded-lg
                           font-semibold text-base md:text-lg transition-colors"
              >
                {t.hero.getFreeCodesCTA}
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Stats */}
          <Suspense fallback={<LoadingPlaceholder height="h-32" />}>
            <HeroStats stats={Object.values(t.hero.stats)} />
          </Suspense>
        </div>
      </section>

      {/* Video Section - 紧跟 Hero 之后（容器宽度 max-w-5xl） */}
      <section className="px-4 py-10 md:py-12">
        <div className="scroll-reveal container mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-2xl">
            <VideoFeature
              videoId="bvqGAuu-ZIM"
              title="DragonSword: Awakening - Official Preview Trailer"
            />
          </div>
        </div>
      </section>

      {/* Tools Grid - 模块导航区（容器宽度 max-w-5xl，8 张卡片） */}
      <section className="px-4 py-14 md:py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {t.tools.title}{" "}
              <span className="text-[hsl(var(--nav-theme-light))]">
                {t.tools.titleHighlight}
              </span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              {t.tools.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
            {t.tools.cards.map((card: any, index: number) => {
              // 映射卡片索引到对应模块 section ID
              const sectionIds = [
                "beginner-guide",
                "characters-guide",
                "combat-guide",
                "walkthrough",
                "hero-tier-list",
                "weapons-and-builds-guide",
                "release-guide",
                "secrets-guide",
              ];
              const sectionId = sectionIds[index];

              return (
                <button
                  key={index}
                  onClick={() => scrollToSection(sectionId)}
                  className="scroll-reveal group rounded-xl border border-border p-4 md:p-6
                             bg-card hover:border-[hsl(var(--nav-theme)/0.5)]
                             transition-all duration-300 cursor-pointer text-left
                             hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div
                    className="mb-3 h-10 w-10 rounded-lg md:mb-4 md:h-12 md:w-12
                                  bg-[hsl(var(--nav-theme)/0.1)]
                                  flex items-center justify-center
                                  group-hover:bg-[hsl(var(--nav-theme)/0.2)]
                                  transition-colors"
                  >
                    <DynamicIcon
                      name={card.icon}
                      className="h-5 w-5 md:h-6 md:w-6 text-[hsl(var(--nav-theme-light))]"
                    />
                  </div>
                  <h3 className="mb-1.5 text-sm md:text-base font-semibold">
                    {card.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {card.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Latest Updates Section */}
      <LatestGuidesAccordion
        articles={latestArticles}
        locale={locale}
        max={12}
      />

      {/* 广告位 2: 首屏内容之后再加载广告 */}
      <NativeBannerAd adKey={process.env.NEXT_PUBLIC_AD_NATIVE_BANNER || ""} />

      {/* 广告位 3: 移动端优先使用方形，桌面端保留横幅 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-728x90"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90}
        className="hidden md:flex"
      />

      {/* Module 1: DragonSword Awakening Beginner Guide */}
      <section id="beginner-guide" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-10 md:mb-14 scroll-reveal">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-4
                            bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]">
              <BookOpen className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-xs md:text-sm font-medium">
                {t.modules.dragonswordBeginnerGuide.eyebrow}
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              {t.modules.dragonswordBeginnerGuide.title}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto mb-3">
              {t.modules.dragonswordBeginnerGuide.subtitle}
            </p>
            <p className="text-sm md:text-base text-muted-foreground/80 max-w-2xl mx-auto">
              {t.modules.dragonswordBeginnerGuide.intro}
            </p>
          </div>
          <ol className="space-y-4 max-w-3xl mx-auto scroll-reveal">
            {t.modules.dragonswordBeginnerGuide.steps.map(
              (step: any, index: number) => (
                <li
                  key={index}
                  className="flex gap-4 p-5 md:p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
                >
                  <div className="flex-shrink-0 h-9 w-9 rounded-full bg-[hsl(var(--nav-theme))] text-white flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-base md:text-lg mb-1">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </li>
              ),
            )}
          </ol>
        </div>
      </section>

      {/* Module 2: DragonSword Awakening Characters Guide */}
      <section
        id="characters-guide"
        className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]"
      >
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-10 md:mb-14 scroll-reveal">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-4
                            bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]">
              <UserCheck className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-xs md:text-sm font-medium">
                {t.modules.dragonswordCharactersGuide.eyebrow}
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              {t.modules.dragonswordCharactersGuide.title}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto mb-3">
              {t.modules.dragonswordCharactersGuide.subtitle}
            </p>
            <p className="text-sm md:text-base text-muted-foreground/80 max-w-2xl mx-auto">
              {t.modules.dragonswordCharactersGuide.intro}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 scroll-reveal">
            {t.modules.dragonswordCharactersGuide.cards.map(
              (card: any, index: number) => (
                <div
                  key={index}
                  className="p-5 md:p-6 bg-card border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
                >
                  <h3 className="font-bold text-base md:text-lg mb-2 text-[hsl(var(--nav-theme-light))]">
                    {card.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {card.description}
                  </p>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Module 3: DragonSword Awakening Combat Guide */}
      <section id="combat-guide" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-10 md:mb-14 scroll-reveal">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-4
                            bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]">
              <Crosshair className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-xs md:text-sm font-medium">
                {t.modules.dragonswordCombatGuide.eyebrow}
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              {t.modules.dragonswordCombatGuide.title}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto mb-3">
              {t.modules.dragonswordCombatGuide.subtitle}
            </p>
            <p className="text-sm md:text-base text-muted-foreground/80 max-w-2xl mx-auto">
              {t.modules.dragonswordCombatGuide.intro}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 scroll-reveal">
            {t.modules.dragonswordCombatGuide.cards.map(
              (card: any, index: number) => (
                <div
                  key={index}
                  className="p-5 md:p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
                >
                  <h3 className="font-bold text-base md:text-lg mb-2 text-[hsl(var(--nav-theme-light))]">
                    {card.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {card.description}
                  </p>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Module 4: DragonSword Awakening Walkthrough */}
      <section
        id="walkthrough"
        className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]"
      >
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-10 md:mb-14 scroll-reveal">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-4
                            bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]">
              <Route className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-xs md:text-sm font-medium">
                {t.modules.dragonswordWalkthrough.eyebrow}
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              {t.modules.dragonswordWalkthrough.title}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto mb-3">
              {t.modules.dragonswordWalkthrough.subtitle}
            </p>
            <p className="text-sm md:text-base text-muted-foreground/80 max-w-2xl mx-auto">
              {t.modules.dragonswordWalkthrough.intro}
            </p>
          </div>
          <ol className="space-y-4 max-w-3xl mx-auto scroll-reveal">
            {t.modules.dragonswordWalkthrough.steps.map(
              (step: any, index: number) => (
                <li
                  key={index}
                  className="flex gap-4 p-5 md:p-6 bg-card border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
                >
                  <div className="flex-shrink-0 h-9 w-9 rounded-full bg-[hsl(var(--nav-theme))] text-white flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-base md:text-lg mb-1">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </li>
              ),
            )}
          </ol>
        </div>
      </section>

      {/* Module 5: DragonSword Awakening Hero Tier List */}
      <section id="hero-tier-list" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-10 md:mb-14 scroll-reveal">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-4
                            bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]">
              <BarChart3 className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-xs md:text-sm font-medium">
                {t.modules.dragonswordHeroTierList.eyebrow}
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              {t.modules.dragonswordHeroTierList.title}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto mb-3">
              {t.modules.dragonswordHeroTierList.subtitle}
            </p>
            <p className="text-sm md:text-base text-muted-foreground/80 max-w-2xl mx-auto">
              {t.modules.dragonswordHeroTierList.intro}
            </p>
          </div>
          <div className="space-y-3 max-w-3xl mx-auto scroll-reveal">
            {t.modules.dragonswordHeroTierList.tiers.map(
              (tier: any, index: number) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row gap-3 sm:gap-5 p-5 md:p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
                >
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="inline-flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-[hsl(var(--nav-theme)/0.15)] border border-[hsl(var(--nav-theme)/0.4)] font-bold text-lg text-[hsl(var(--nav-theme-light))]">
                      {tier.rank.charAt(0)}
                    </span>
                    <div>
                      <div className="text-xs text-muted-foreground">
                        {tier.rank}
                      </div>
                      <div className="font-bold text-[hsl(var(--nav-theme-light))]">
                        {tier.name}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground sm:flex-1 sm:self-center">
                    {tier.description}
                  </p>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Module 6: DragonSword Awakening Weapons and Builds Guide */}
      <section
        id="weapons-and-builds-guide"
        className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]"
      >
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-10 md:mb-14 scroll-reveal">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-4
                            bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]">
              <Wrench className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-xs md:text-sm font-medium">
                {t.modules.dragonswordWeaponsAndBuilds.eyebrow}
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              {t.modules.dragonswordWeaponsAndBuilds.title}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto mb-3">
              {t.modules.dragonswordWeaponsAndBuilds.subtitle}
            </p>
            <p className="text-sm md:text-base text-muted-foreground/80 max-w-2xl mx-auto">
              {t.modules.dragonswordWeaponsAndBuilds.intro}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 scroll-reveal">
            {t.modules.dragonswordWeaponsAndBuilds.cards.map(
              (card: any, index: number) => (
                <div
                  key={index}
                  className="p-5 md:p-6 bg-card border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
                >
                  <h3 className="font-bold text-base md:text-lg mb-2 text-[hsl(var(--nav-theme-light))]">
                    {card.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {card.description}
                  </p>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Module 7: DragonSword Awakening Release Guide */}
      <section id="release-guide" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-10 md:mb-14 scroll-reveal">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-4
                            bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]">
              <Rocket className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-xs md:text-sm font-medium">
                {t.modules.dragonswordReleaseGuide.eyebrow}
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              {t.modules.dragonswordReleaseGuide.title}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto mb-3">
              {t.modules.dragonswordReleaseGuide.subtitle}
            </p>
            <p className="text-sm md:text-base text-muted-foreground/80 max-w-2xl mx-auto">
              {t.modules.dragonswordReleaseGuide.intro}
            </p>
          </div>
          <dl className="max-w-2xl mx-auto rounded-xl border border-border overflow-hidden scroll-reveal">
            {t.modules.dragonswordReleaseGuide.rows.map(
              (row: any, index: number) => (
                <div
                  key={index}
                  className={`flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 px-5 py-4 ${index % 2 === 0 ? "bg-white/[0.03]" : ""} border-b border-border last:border-b-0`}
                >
                  <dt className="font-semibold text-[hsl(var(--nav-theme-light))] sm:w-44 sm:flex-shrink-0">
                    {row.label}
                  </dt>
                  <dd className="text-sm text-muted-foreground sm:flex-1">
                    {row.value}
                  </dd>
                </div>
              ),
            )}
          </dl>
        </div>
      </section>

      {/* Module 8: DragonSword Awakening Secrets Guide */}
      <section
        id="secrets-guide"
        className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]"
      >
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-10 md:mb-14 scroll-reveal">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-4
                            bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]">
              <Search className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-xs md:text-sm font-medium">
                {t.modules.dragonswordSecretsGuide.eyebrow}
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              {t.modules.dragonswordSecretsGuide.title}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto mb-3">
              {t.modules.dragonswordSecretsGuide.subtitle}
            </p>
            <p className="text-sm md:text-base text-muted-foreground/80 max-w-2xl mx-auto">
              {t.modules.dragonswordSecretsGuide.intro}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 scroll-reveal">
            {t.modules.dragonswordSecretsGuide.cards.map(
              (card: any, index: number) => (
                <div
                  key={index}
                  className="p-5 md:p-6 bg-card border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
                >
                  <h3 className="font-bold text-base md:text-lg mb-2 text-[hsl(var(--nav-theme-light))]">
                    {card.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {card.description}
                  </p>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <FAQSection
          title={t.faq.title}
          titleHighlight={t.faq.titleHighlight}
          subtitle={t.faq.subtitle}
          questions={t.faq.questions}
        />
      </Suspense>

      {/* CTA Section */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <CTASection
          title={t.cta.title}
          description={t.cta.description}
          joinCommunity={t.cta.joinCommunity}
          joinGame={t.cta.joinGame}
        />
      </Suspense>

      {/* Ad Banner 3 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-728x90"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90}
        className="hidden md:flex"
      />

      {/* Footer */}
      <footer className="bg-white/[0.02] border-t border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-[hsl(var(--nav-theme-light))]">
                {t.footer.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t.footer.description}
              </p>
            </div>

            {/* Community - External Links Only */}
            <div>
              <h4 className="font-semibold mb-4">{t.footer.community}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://www.youtube.com/@DragonSwordAwakening"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.discord}
                  </a>
                </li>
                <li>
                  <a
                    href="https://x.com/DSAwakening"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.twitter}
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.reddit.com/r/DragonSwordAwakening/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.steamCommunity}
                  </a>
                </li>
                <li>
                  <a
                    href="https://store.steampowered.com/app/4570720/DragonSword__Awakening/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.steamStore}
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal - Internal Routes Only */}
            <div>
              <h4 className="font-semibold mb-4">{t.footer.legal}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/about"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.about}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.privacy}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-of-service"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.terms}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/copyright"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.copyrightNotice}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Copyright */}
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                {t.footer.copyright}
              </p>
              <p className="text-xs text-muted-foreground">
                {t.footer.disclaimer}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
