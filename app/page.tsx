import type { Metadata } from "next";
import { UnderConstruction } from "@/components/under-construction/UnderConstruction";
import { LiveHomePage } from "@/components/pages/LiveHomePage";
import { SiteShell } from "@/components/layout/SiteShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { projects, simpleServices } from "@/lib/demo-content";
import { readHomepageConfig } from "@/lib/homepage-config.server";
import { isUnderConstruction, readLaunchMode } from "@/lib/launch-mode.server";
import { createMetadata } from "@/lib/seo";
import { pageSeo } from "@/lib/seo-content";
import {
  buildPortfolioItemListSchema,
  buildServicesItemListSchema,
} from "@/lib/seo-schema";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const launchMode = await readLaunchMode();

  if (isUnderConstruction(launchMode)) {
    return createMetadata({
      title: "Under Construction",
      description:
        "LifeSpring Design is crafting something extraordinary. Expert web design and digital experiences for businesses ready to grow.",
      path: pageSeo.home.path,
      noIndex: true,
    });
  }

  return createMetadata({
    title: pageSeo.home.title,
    description: pageSeo.home.description,
    path: pageSeo.home.path,
    noIndex: pageSeo.home.noIndex,
  });
}

export default async function Home() {
  const [launchMode, config] = await Promise.all([readLaunchMode(), readHomepageConfig()]);

  if (isUnderConstruction(launchMode)) {
    return <UnderConstruction />;
  }

  return (
    <SiteShell config={config}>
      <JsonLd
        data={[
          buildPortfolioItemListSchema(projects, "LifeSpring Design Web Projects"),
          buildServicesItemListSchema(simpleServices),
        ]}
      />
      <LiveHomePage config={config} />
    </SiteShell>
  );
}
