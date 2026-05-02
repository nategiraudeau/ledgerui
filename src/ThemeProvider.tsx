import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Theme, ThemePreference } from "./types";

export type ThemeContextValue = {
  theme: Theme;
  preference: ThemePreference;
  setPreference: (next: ThemePreference) => void;
  toggle: () => void;
};

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export type ThemeProviderProps = {
  children?: ReactNode;
  storageKey?: string;
  toggleKey?: string;
  defaultPreference?: ThemePreference;
};

const DEFAULT_STORAGE_KEY = "ledgerui-theme";
const DEFAULT_TOGGLE_KEY = "d";

function readSystemTheme(): Theme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function readStoredPreference(storageKey: string): ThemePreference | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(storageKey);
  if (raw === "light" || raw === "dark" || raw === "system") return raw;
  return null;
}

function applyPreference(preference: ThemePreference): void {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  if (preference === "system") {
    root.removeAttribute("data-theme");
  } else {
    root.setAttribute("data-theme", preference);
  }
}

export default function ThemeProvider({
  children,
  storageKey = DEFAULT_STORAGE_KEY,
  toggleKey = DEFAULT_TOGGLE_KEY,
  defaultPreference = "system"
}: ThemeProviderProps) {
  const [preference, setPreferenceState] = useState<ThemePreference>(() => {
    return readStoredPreference(storageKey) ?? defaultPreference;
  });
  const [systemTheme, setSystemTheme] = useState<Theme>(() => readSystemTheme());

  useEffect(() => {
    applyPreference(preference);
  }, [preference]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => setSystemTheme(mq.matches ? "dark" : "light");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const setPreference = useCallback(
    (next: ThemePreference) => {
      setPreferenceState(next);
      if (typeof window === "undefined") return;
      if (next === "system") window.localStorage.removeItem(storageKey);
      else window.localStorage.setItem(storageKey, next);
    },
    [storageKey]
  );

  const toggle = useCallback(() => {
    setPreferenceState((current) => {
      const resolved = current === "system" ? readSystemTheme() : current;
      const next: Theme = resolved === "dark" ? "light" : "dark";
      if (typeof window !== "undefined") {
        window.localStorage.setItem(storageKey, next);
      }
      return next;
    });
  }, [storageKey]);

  useEffect(() => {
    if (!toggleKey) return;
    const key = toggleKey.toLowerCase();
    const onKey = (e: KeyboardEvent) => {
      if (!(e.metaKey || e.ctrlKey)) return;
      if (e.key.toLowerCase() !== key) return;
      e.preventDefault();
      toggle();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggleKey, toggle]);

  const theme: Theme = preference === "system" ? systemTheme : preference;

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, preference, setPreference, toggle }),
    [theme, preference, setPreference, toggle]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
