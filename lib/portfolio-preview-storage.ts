import {
  defaultPortfolioPreviewSettings,
  type PortfolioPreviewSettings,
  type PortfolioSectionTheme,
} from "@/lib/portfolio-preview";

export const portfolioPreviewStorageKey = "lifespring-portfolio-preview";

function isPortfolioSectionTheme(value: unknown): value is PortfolioSectionTheme {
  return value === "dark" || value === "light";
}

function normalizePortfolioPreviewSettings(
  value: Partial<PortfolioPreviewSettings>,
): PortfolioPreviewSettings {
  return {
    theme: isPortfolioSectionTheme(value.theme)
      ? value.theme
      : defaultPortfolioPreviewSettings.theme,
  };
}

function isPortfolioPreviewSettings(value: unknown): value is Partial<PortfolioPreviewSettings> {
  if (!value || typeof value !== "object") return false;
  return isPortfolioSectionTheme((value as PortfolioPreviewSettings).theme);
}

import { getCommittedHomepagePreviewSettings } from "@/lib/homepage-settings";

export function loadPortfolioPreviewSettings(): PortfolioPreviewSettings {
  const committed = getCommittedHomepagePreviewSettings()?.portfolio;
  if (committed) return committed;

  if (typeof window === "undefined") {
    return defaultPortfolioPreviewSettings;
  }

  try {
    const stored = localStorage.getItem(portfolioPreviewStorageKey);
    if (!stored) return defaultPortfolioPreviewSettings;

    const parsed: unknown = JSON.parse(stored);
    if (isPortfolioPreviewSettings(parsed)) return normalizePortfolioPreviewSettings(parsed);
  } catch {
    // ignore invalid storage
  }

  return defaultPortfolioPreviewSettings;
}

export function savePortfolioPreviewSettings(settings: PortfolioPreviewSettings): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(portfolioPreviewStorageKey, JSON.stringify(settings));
}
