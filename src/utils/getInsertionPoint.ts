export function getInsertionPoint(): HTMLElement | undefined {
  if (typeof document === "undefined") return undefined;

  return document.querySelector<HTMLMetaElement>(
    "meta[name='mui-insertion-point']"
  ) || undefined;
}
