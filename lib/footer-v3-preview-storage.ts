import {
  defaultFooterV3PreviewSettings,
  type FooterV3LayoutWidth,
  type FooterV3LogoVariant,
  type FooterV3PreviewSettings,
  type FooterV3Theme,
} from "@/lib/footer-v3-preview";

export const footerV3PreviewStorageKey = "lifespring-footer-v3-preview";

function isFooterV3LayoutWidth(value: unknown): value is FooterV3LayoutWidth {
  return value === "contained" || value === "full";
}

function isFooterV3LogoVariant(value: unknown): value is FooterV3LogoVariant {
  return value === "white" || value === "black" || value === "color";
}

function isFooterV3Theme(value: unknown): value is FooterV3Theme {
  return value === "dark" || value === "light";
}

function isFooterV3PreviewSettings(value: unknown): value is Partial<FooterV3PreviewSettings> {
  if (!value || typeof value !== "object") return false;

  const settings = value as Partial<FooterV3PreviewSettings>;
  return (
    typeof settings.copyrightColor === "string" &&
    typeof settings.domainColor === "string" &&
    typeof settings.socialColor === "string" &&
    typeof settings.socialHoverColor === "string"
  );
}

function normalizeFooterV3PreviewSettings(
  value: Partial<FooterV3PreviewSettings>,
): FooterV3PreviewSettings {
  return {
    ...defaultFooterV3PreviewSettings,
    ...value,
    accentColor:
      typeof value.accentColor === "string"
        ? value.accentColor
        : typeof (value as { taglineColor?: string }).taglineColor === "string"
          ? (value as { taglineColor: string }).taglineColor
          : defaultFooterV3PreviewSettings.accentColor,
    layoutWidth: isFooterV3LayoutWidth(value.layoutWidth)
      ? value.layoutWidth
      : defaultFooterV3PreviewSettings.layoutWidth,
    logoVariant: isFooterV3LogoVariant(value.logoVariant)
      ? value.logoVariant
      : defaultFooterV3PreviewSettings.logoVariant,
    theme: isFooterV3Theme(value.theme) ? value.theme : defaultFooterV3PreviewSettings.theme,
  };
}

export function loadFooterV3PreviewSettings(): FooterV3PreviewSettings {
  if (typeof window === "undefined") {
    return defaultFooterV3PreviewSettings;
  }

  try {
    const stored = localStorage.getItem(footerV3PreviewStorageKey);
    if (!stored) return defaultFooterV3PreviewSettings;

    const parsed: unknown = JSON.parse(stored);
    if (isFooterV3PreviewSettings(parsed)) {
      return normalizeFooterV3PreviewSettings(parsed);
    }
  } catch {
    // ignore invalid storage
  }

  return defaultFooterV3PreviewSettings;
}

export function saveFooterV3PreviewSettings(settings: FooterV3PreviewSettings): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(footerV3PreviewStorageKey, JSON.stringify(settings));
}
