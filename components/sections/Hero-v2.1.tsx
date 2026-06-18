"use client";

import Link from "next/link";
import { useHeroV21Preview } from "@/components/dev/HeroV21PreviewContext";
import { Container } from "@/components/ui/Container";
import { PreviewButton } from "@/components/ui/PreviewButton";
import {
  defaultHeroV21BackgroundSettings,
  getHeroV21BackgroundStyle,
} from "@/lib/hero-v21-background-preview";
import { scrollToHashHref } from "@/lib/scroll-to-hash";
import { cn } from "@/lib/utils";

export type HeroHighlight = {
  title: string;
  description: string;
  href?: string;
};

type HeroV21Props = {
  /** Multi-line headline — each entry renders as a block line */
  headlineLines: string[];
  subtext: string;
  highlights: HeroHighlight[];
  ctaLabel?: string;
  ctaHref?: string;
};

function HighlightCard({ title, description, href }: HeroHighlight) {
  const content = (
    <>
      <h2 className="font-serif text-lg font-bold tracking-tight text-foreground sm:text-xl">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">{description}</p>
      {href && (
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent-blue transition-colors group-hover:text-accent-blue-dark">
          Learn more
          <span aria-hidden="true">→</span>
        </span>
      )}
    </>
  );

  const className =
    "group flex flex-col rounded-xl border border-border bg-surface/50 p-6 transition-colors hover:border-accent-blue/30 hover:bg-surface";

  if (href) {
    return (
      <Link
        href={href}
        aria-label={`Learn more about ${title}`}
        onClick={(event) => {
          if (scrollToHashHref(href)) {
            event.preventDefault();
          }
        }}
        className={className}
      >
        {content}
      </Link>
    );
  }

  return <div className={className}>{content}</div>;
}

/**
 * Split hero — tagline left, stacked service/product highlights right (no video required).
 */
export function HeroV21({
  headlineLines,
  subtext,
  highlights,
  ctaLabel,
  ctaHref,
}: HeroV21Props) {
  const preview = useHeroV21Preview();
  const backgroundSettings = preview?.settings.background ?? defaultHeroV21BackgroundSettings;
  const backgroundStyle = preview ? getHeroV21BackgroundStyle(backgroundSettings) : undefined;

  return (
    <section
      className="hero-v21 relative overflow-hidden py-[calc(6rem-15px)] lg:py-[calc(8rem-15px)]"
      aria-labelledby="hero-heading"
    >
      <div
        className={cn("hero-v21-bg pointer-events-none absolute inset-0", preview && "hero-v21-bg--preview")}
        style={backgroundStyle}
        aria-hidden="true"
      />

      <Container className="relative grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <h1
            id="hero-heading"
            className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            {headlineLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">{subtext}</p>
          {ctaLabel && ctaHref && (
            <div className="mt-8">
              <a href={ctaHref} aria-label={`${ctaLabel} — contact LifeSpring Design`}>
                <PreviewButton>{ctaLabel}</PreviewButton>
              </a>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4 sm:gap-5" role="list" aria-label="Featured services">
          {highlights.map((highlight) => (
            <div key={highlight.title} role="listitem">
              <HighlightCard {...highlight} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
