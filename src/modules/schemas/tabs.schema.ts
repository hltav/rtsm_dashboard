import { z } from "zod";
import type { ReactNode, ReactElement } from "react";
import type { SxProps, Theme } from "@mui/material";

// ─── Primitivos reutilizáveis ────────────────────────────────────────────────

const ReactNodeSchema = z.custom<ReactNode>();
const ReactElementSchema = z.custom<ReactElement>();
const SxPropsSchema = z.custom<SxProps<Theme>>();

// ─── Schemas públicos ────────────────────────────────────────────────────────

export const AppTabItemSchema = z.object({
  label: ReactNodeSchema,
  value: z.string(),
  disabled: z.boolean().optional(),
  icon: ReactElementSchema.optional(),
});

export const AppTabsPropsSchema = z.object({
  value: z.string(),
  onChange: z.custom<(value: string) => void>(),
  tabs: z.array(AppTabItemSchema),
  scrollable: z.boolean().optional(),
  fullWidth: z.boolean().optional(),
  sx: SxPropsSchema.optional(),
  tabSx: SxPropsSchema.optional(),
});

// ─── Tipos inferidos ─────────────────────────────────────────────────────────

type AppTabItemBase = z.infer<typeof AppTabItemSchema>;
type AppTabsPropsBase = z.infer<typeof AppTabsPropsSchema>;

export type AppTabItem<T extends string = string> = Omit<
  AppTabItemBase,
  "value"
> & {
  value: T;
};

export type AppTabsProps<T extends string = string> = Omit<
  AppTabsPropsBase,
  "value" | "onChange" | "tabs"
> & {
  value: T;
  onChange: (value: T) => void;
  tabs: ReadonlyArray<AppTabItem<T>>;
};
