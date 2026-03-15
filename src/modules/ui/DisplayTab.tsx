"use client";
import * as React from "react";
import { Tabs, Tab } from "@mui/material";
import type { SystemStyleObject } from "@mui/system";
import type { Theme } from "@mui/material/styles";
import type { AppTabsProps } from "../schemas/tabs.schema";
import { resolveSx } from "../functions/resolveSx.function";

export function AppTabs<T extends string>({
  value,
  onChange,
  tabs,
  scrollable = true,
  fullWidth = false,
  sx,
  tabSx,
}: AppTabsProps<T>) {
  return (
    <Tabs
      value={value}
      onChange={(_, v) => onChange(v as T)}
      variant={scrollable ? "scrollable" : fullWidth ? "fullWidth" : "standard"}
      scrollButtons={scrollable ? "auto" : false}
      centered={!scrollable && !fullWidth}
      TabIndicatorProps={{ style: { display: "none" } }}
      sx={(theme): SystemStyleObject<Theme> => ({
        mb: 3,
        minHeight: 48,
        p: "6px",
        borderRadius: "16px",
        border: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
        "& .MuiTabs-flexContainer": { gap: "8px" },
        ...resolveSx(sx, theme),
      })}
    >
      {tabs.map((t) => (
        <Tab
          key={t.value}
          label={t.label}
          value={t.value}
          disabled={t.disabled}
          icon={t.icon}
          iconPosition={t.icon ? "start" : undefined}
          disableRipple
          sx={(theme): SystemStyleObject<Theme> => ({
            textTransform: "none",
            fontWeight: 700,
            fontSize: "0.875rem",
            minHeight: 40,
            borderRadius: 12,
            color: theme.palette.text.secondary,
            transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",

            "&.Mui-selected": {
              color:
                theme.palette.mode === "dark"
                  ? theme.palette.primary.dark
                  : theme.palette.primary.contrastText,
              backgroundColor:
                theme.palette.mode === "dark"
                  ? theme.palette.secondary.light
                  : theme.palette.primary.main,
              boxShadow:
                theme.palette.mode === "dark"
                  ? "0 6px 18px rgba(0,0,0,0.35)"
                  : "0 8px 22px rgba(15,27,43,0.18)",
            },

            ...resolveSx(tabSx, theme),
          })}
        />
      ))}
    </Tabs>
  );
}
