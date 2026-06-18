"use client";

import { SectionPreview } from "@/components/dev/SectionPreview";
import type { HomepageConfig, HomepageSectionEntry } from "@/lib/homepage-config";
import { getHomepageSections } from "@/lib/homepage-config";

type LiveHomePageProps = {
  config: HomepageConfig;
};

function LiveHomeSections({ sections }: { sections: HomepageSectionEntry[] }) {
  return (
    <main id="main-content">
      {sections.map((section) => (
        <SectionPreview
          key={section.group}
          group={section.group}
          variant={section.variant}
        />
      ))}
    </main>
  );
}

/** Live homepage — renders the published section stack from homepage-config.json. */
export function LiveHomePage({ config }: LiveHomePageProps) {
  return <LiveHomeSections sections={getHomepageSections(config)} />;
}
