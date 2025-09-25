'use client'
import * as React from "react";
import { useServerInsertedHTML } from "next/navigation";
import { CacheProvider } from "@emotion/react";
import createCache, { EmotionCache } from "@emotion/cache";

interface EmotionStyleTag extends HTMLStyleElement {
  key: string;
  ids: string[];
  css: string;
}

function createEmotionCache(nonce?: string): EmotionCache {
  return createCache({ key: "css", prepend: true, nonce: nonce });
}

export function EmotionNonceCache({
  children,
  nonce,
}: {
  children: React.ReactNode;
  nonce?: string;
}) {
  const [cache] = React.useState(() => createEmotionCache(nonce));

  useServerInsertedHTML(() => {
    const styleTags = cache.sheet.tags as unknown as EmotionStyleTag[];

    cache.sheet.flush();

    return styleTags.map((tag) => {
      return (
        <style
          data-emotion={`${tag.key} ${tag.ids.join(" ")}`}
          dangerouslySetInnerHTML={{ __html: tag.css }}
          nonce={nonce}
          key={tag.key}
        />
      );
    });
  });

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
