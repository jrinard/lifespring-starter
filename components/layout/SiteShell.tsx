"use client";

import type { ReactNode } from "react";
import { ContactModal } from "@/components/contact/ContactModal";
import { ContactModalProvider } from "@/components/contact/ContactModalContext";
import { CreativeProvider } from "@/components/dev/CreativeProvider";
import { ContactV1PreviewProvider } from "@/components/dev/ContactV1PreviewContext";
import type { HomepageConfig } from "@/lib/homepage-config";

type SiteShellProps = {
  children: ReactNode;
  config: HomepageConfig;
};

/** Production site wrapper — theme + contact modal, no playground controls. */
export function SiteShell({ children, config }: SiteShellProps) {
  return (
    <CreativeProvider
      initialColorThemeId={config.colorThemeId}
      initialFontThemeId={config.fontThemeId}
      persistTheme={false}
    >
      <ContactV1PreviewProvider>
        <ContactModalProvider>
          {children}
          <ContactModal />
        </ContactModalProvider>
      </ContactV1PreviewProvider>
    </CreativeProvider>
  );
}
