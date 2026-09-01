import { ui, defaultLang } from "./ui";

export const locales = ["es", "eu"];
export const defaultLocale = "es";

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

type Dict = typeof ui[typeof defaultLang];

// Si la entrada es función, toma sus Parameters; si no, tupla vacía
type ArgsFor<K extends keyof Dict> = Dict[K] extends (...args: any[]) => any
  ? Parameters<Dict[K]>
  : [];

export function useTranslations(lang: keyof typeof ui) {
  return function t<K extends keyof Dict>(
    key: K,
    ...args: ArgsFor<K>
  ): string {
    const entry = (ui[lang]?.[key] ?? ui[defaultLang][key]) as Dict[K];
    return typeof entry === 'function' ? (entry as any)(...args) : entry;
  };
}