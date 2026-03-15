import { Theme } from "@mui/material/styles";
import { SystemStyleObject } from "@mui/system";
import { AppTabsProps } from "../schemas/tabs.schema";

export function resolveSx(
  sx: AppTabsProps<string>["sx"],
  theme: Theme,
): SystemStyleObject<Theme> {
  if (!sx) return {};

  if (typeof sx === "function") {
    return sx(theme) ?? {};
  }

  if (Array.isArray(sx)) {
    return sx.reduce<SystemStyleObject<Theme>>((acc, item) => {
      const resolved = typeof item === "function" ? item(theme) : item;

      if (!resolved) return acc;

      return { ...acc, ...resolved };
    }, {} as SystemStyleObject<Theme>);
  }

  return (sx as SystemStyleObject<Theme>) ?? {};
}
