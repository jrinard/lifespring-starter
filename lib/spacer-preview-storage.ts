import {
  defaultSpacerGradientStyle,
  type SpacerGradientStyle,
  type SpacerStripeStyle,
} from "@/components/sections/Spacer";
import type { ColorThemeId } from "@/lib/color-themes";
import { getDefaultSpacerStripeStyle } from "@/lib/spacer-defaults";

export const spacerStripeStorageKey = "lifespring-spacer-stripe-style";
export const spacerGradientStorageKey = "lifespring-spacer-gradient-style";

function isSpacerStripeStyle(value: unknown): value is SpacerStripeStyle {
  if (!value || typeof value !== "object") return false;

  const style = value as SpacerStripeStyle;
  return (
    typeof style.from === "string" &&
    typeof style.to === "string" &&
    typeof style.direction === "string" &&
    typeof style.mode === "string" &&
    typeof style.heightPx === "number"
  );
}

function isSpacerGradientStyle(value: unknown): value is SpacerGradientStyle {
  if (!value || typeof value !== "object") return false;

  const style = value as SpacerGradientStyle;
  return typeof style.heightPx === "number";
}

import { getCommittedHomepagePreviewSettings } from "@/lib/homepage-settings";

export function loadSpacerStripeStyle(colorThemeId: ColorThemeId): SpacerStripeStyle {
  const committed = getCommittedHomepagePreviewSettings()?.spacerStripe;
  if (committed) return committed;

  if (typeof window === "undefined") {
    return getDefaultSpacerStripeStyle(colorThemeId);
  }

  try {
    const stored = localStorage.getItem(spacerStripeStorageKey);
    if (!stored) return getDefaultSpacerStripeStyle(colorThemeId);

    const parsed: unknown = JSON.parse(stored);
    if (isSpacerStripeStyle(parsed)) return parsed;
  } catch {
    // ignore invalid storage
  }

  return getDefaultSpacerStripeStyle(colorThemeId);
}

export function saveSpacerStripeStyle(style: SpacerStripeStyle): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(spacerStripeStorageKey, JSON.stringify(style));
}

export function loadSpacerGradientStyle(): SpacerGradientStyle {
  const committed = getCommittedHomepagePreviewSettings()?.spacerGradient;
  if (committed) return committed;

  if (typeof window === "undefined") {
    return defaultSpacerGradientStyle;
  }

  try {
    const stored = localStorage.getItem(spacerGradientStorageKey);
    if (!stored) return defaultSpacerGradientStyle;

    const parsed: unknown = JSON.parse(stored);
    if (isSpacerGradientStyle(parsed)) return parsed;
  } catch {
    // ignore invalid storage
  }

  return defaultSpacerGradientStyle;
}

export function saveSpacerGradientStyle(style: SpacerGradientStyle): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(spacerGradientStorageKey, JSON.stringify(style));
}
