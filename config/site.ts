export type TeamContact = {
  name: string;
  phone: string;
  email: string;
};

export const siteConfig = {
  name: "LifeSpring Design",
  domain: "lifespringdesign.com",
  url: "https://lifespringdesign.com",
  tagline: "Crafting digital experiences that help you grow.",
  description:
    "LifeSpring Design builds custom websites, software, and branding for businesses in Washington, Oregon, and Idaho.",
  phone: "208-316-8338",
  serviceArea: "Serving Washington, Oregon, Idaho",
  email: "josh@lifespringdesign.com",
  address: "",
  /** Optional contacts shown on the under construction page. Falls back to site phone/email when empty. */
  teamContacts: [] as TeamContact[],
  underConstruction: {
    headline: "Under Construction",
    subheadline: "Our new site is on the way.",
    /** Optional split lockup, e.g. ["Spartan", "Restoration"]. Defaults to site name. */
    brandTitleLines: undefined as string[] | undefined,
  },
  social: {
    facebook: "#",
    instagram: "#",
    linkedin: "#",
    twitter: "#",
  },
  /** Full site nav — dev/scaffold footers and legacy layouts */
  nav: [
    { label: "Home", href: "/" },
    { label: "Playground", href: "/playground" },
    { label: "Preview", href: "/preview" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  /** Primary marketing nav — header v3, footer v3 */
  primaryNav: [
    { label: "Home", href: "/" },
    { label: "Services", href: "#services" },
    { label: "Projects", href: "#portfolio" },
    { label: "Contact", href: "/contact" },
  ],
  assets: {
    logo: "/logo.png",
    logoWhite: "/LS-logo-white.png",
    logoBlack: "/LS-logo-black.png",
    logoColor: "/LS_Logo_Color.png",
    ogImage: "/ls-logo-color.png",
  },
  launch: {
    mode: "under-construction" as "under-construction" | "live",
    previewPlaygroundPath: "/playground",
    previewPath: "/preview",
  },
} as const;

export type SiteConfig = typeof siteConfig;
