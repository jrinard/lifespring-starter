"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  defaultFooterV3PreviewSettings,
  footerV3LayoutWidths,
  footerV3LogoVariants,
  footerV3Themes,
  type FooterV3LayoutWidth,
  type FooterV3LogoVariant,
  type FooterV3PreviewSettings,
  type FooterV3Theme,
} from "@/lib/footer-v3-preview";
import {
  loadFooterV3PreviewSettings,
  saveFooterV3PreviewSettings,
} from "@/lib/footer-v3-preview-storage";

type FooterV3PreviewContextValue = {
  settings: FooterV3PreviewSettings;
  setSettings: (settings: FooterV3PreviewSettings) => void;
};

const FooterV3PreviewContext = createContext<FooterV3PreviewContextValue | null>(null);

export function FooterV3PreviewProvider({ children }: { children: ReactNode }) {
  const [settings, setSettingsState] = useState<FooterV3PreviewSettings>(
    defaultFooterV3PreviewSettings,
  );

  useEffect(() => {
    setSettingsState(loadFooterV3PreviewSettings());
  }, []);

  const setSettings = useCallback((next: FooterV3PreviewSettings) => {
    setSettingsState(next);
    saveFooterV3PreviewSettings(next);
  }, []);

  return (
    <FooterV3PreviewContext.Provider value={{ settings, setSettings }}>
      {children}
    </FooterV3PreviewContext.Provider>
  );
}

export function useFooterV3Preview() {
  return useContext(FooterV3PreviewContext);
}

const colorInputClassName =
  "h-8 w-8 cursor-pointer rounded border border-accent-purple/40 bg-background/90 p-0.5";

const selectClassName =
  "section-switcher-select rounded border border-accent-purple/40 bg-background/90 px-2 py-1 font-mono text-sm text-accent-purple backdrop-blur-sm focus:border-accent-purple focus:outline-none";

const buttonClassName =
  "rounded border border-accent-purple/40 bg-background/90 px-2 py-1 font-mono text-xs text-accent-purple backdrop-blur-sm transition-colors hover:border-accent-purple hover:bg-accent-purple/10";

export function FooterV3PreviewControls() {
  const context = useFooterV3Preview();
  if (!context) return null;

  const update = (patch: Partial<FooterV3PreviewSettings>) => {
    context.setSettings({ ...context.settings, ...patch });
  };

  return (
    <div className="flex flex-wrap items-center gap-x-3.5 gap-y-2">
      <label className="flex items-center gap-2">
        <span className="font-mono text-xs tracking-wide text-accent-purple uppercase">Accent</span>
        <input
          type="color"
          value={context.settings.accentColor}
          onChange={(event) => update({ accentColor: event.target.value })}
          className={colorInputClassName}
          aria-label="Footer tagline, Start a project, and Contact us color"
        />
      </label>
      <label className="flex items-center gap-2">
        <span className="font-mono text-xs tracking-wide text-accent-purple uppercase">©</span>
        <input
          type="color"
          value={context.settings.copyrightColor}
          onChange={(event) => update({ copyrightColor: event.target.value })}
          className={colorInputClassName}
          aria-label="Footer copyright text color"
        />
      </label>
      <label className="flex items-center gap-2">
        <span className="font-mono text-xs tracking-wide text-accent-purple uppercase">Domain</span>
        <input
          type="color"
          value={context.settings.domainColor}
          onChange={(event) => update({ domainColor: event.target.value })}
          className={colorInputClassName}
          aria-label="Footer domain text color"
        />
      </label>
      <label className="flex items-center gap-2">
        <span className="font-mono text-xs tracking-wide text-accent-purple uppercase">Social</span>
        <input
          type="color"
          value={context.settings.socialColor}
          onChange={(event) => update({ socialColor: event.target.value })}
          className={colorInputClassName}
          aria-label="Footer social icon color"
        />
      </label>
      <label className="flex items-center gap-2">
        <span className="font-mono text-xs tracking-wide text-accent-purple uppercase">Social hover</span>
        <input
          type="color"
          value={context.settings.socialHoverColor}
          onChange={(event) => update({ socialHoverColor: event.target.value })}
          className={colorInputClassName}
          aria-label="Footer social icon hover color"
        />
      </label>
      <label className="flex items-center gap-2">
        <span className="font-mono text-xs tracking-wide text-accent-purple uppercase">Logo</span>
        <select
          value={context.settings.logoVariant}
          onChange={(event) =>
            update({ logoVariant: event.target.value as FooterV3LogoVariant })
          }
          className={selectClassName}
          aria-label="Footer logo variant"
        >
          {footerV3LogoVariants.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
      <label className="flex items-center gap-2">
        <span className="font-mono text-xs tracking-wide text-accent-purple uppercase">Theme</span>
        <select
          value={context.settings.theme}
          onChange={(event) => update({ theme: event.target.value as FooterV3Theme })}
          className={selectClassName}
          aria-label="Footer theme"
        >
          {footerV3Themes.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
      <label className="flex items-center gap-2">
        <span className="font-mono text-xs tracking-wide text-accent-purple uppercase">Width</span>
        <select
          value={context.settings.layoutWidth}
          onChange={(event) =>
            update({ layoutWidth: event.target.value as FooterV3LayoutWidth })
          }
          className={selectClassName}
          aria-label="Footer layout width"
        >
          {footerV3LayoutWidths.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
      <button
        type="button"
        onClick={() => context.setSettings(defaultFooterV3PreviewSettings)}
        className={buttonClassName}
      >
        Reset
      </button>
    </div>
  );
}
