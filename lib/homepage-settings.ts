import type { SpacerGradientStyle, SpacerStripeStyle } from "@/components/sections/Spacer";
import type { ContactPreviewSettings } from "@/lib/contact-preview";
import type { FooterV3PreviewSettings } from "@/lib/footer-v3-preview";
import type { HeaderV3PreviewSettings } from "@/lib/header-v3-gradient";
import type { HeroV21PreviewSettings } from "@/lib/hero-v21-preview";
import type { PortfolioPreviewSettings } from "@/lib/portfolio-preview";
import type { ReviewboxPreviewSettings } from "@/lib/reviewbox-preview";
import type { ServicesV1LayoutWidth } from "@/lib/services-v1-preview";

/** Section-specific preview settings baked into the live homepage. */
export type HomepagePreviewSettings = {
  heroV21?: HeroV21PreviewSettings;
  headerV3?: HeaderV3PreviewSettings;
  reviewbox?: ReviewboxPreviewSettings;
  footerV3?: FooterV3PreviewSettings;
  portfolio?: PortfolioPreviewSettings;
  servicesV1LayoutWidth?: ServicesV1LayoutWidth;
  spacerStripe?: SpacerStripeStyle;
  spacerGradient?: SpacerGradientStyle;
  contact?: ContactPreviewSettings;
};

let committedPreviewSettings: HomepagePreviewSettings | null = null;

export function setCommittedHomepagePreviewSettings(
  settings: HomepagePreviewSettings | null,
): void {
  committedPreviewSettings = settings;
}

export function getCommittedHomepagePreviewSettings(): HomepagePreviewSettings | null {
  return committedPreviewSettings;
}
