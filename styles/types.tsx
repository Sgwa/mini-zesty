import {
  backgroundColor,
  BackgroundColorProps,
  BaseTheme,
  border,
  BorderProps,
  color,
  ColorProps,
  createVariant,
  layout,
  LayoutProps,
  opacity,
  OpacityProps,
  position,
  PositionProps,
  shadow,
  ShadowProps,
  spacing,
  SpacingProps,
  textShadow,
  TextShadowProps,
  typography,
  TypographyProps,
  VariantProps,
  visible,
  VisibleProps,
} from "@shopify/restyle";
import { ForwardedRef } from "react";
import { RTheme } from "styles/restyleTheme";

const textVariant = createVariant<RTheme, "textVariants">({
  themeKey: "textVariants",
});

export type TextRestyleProps<Theme extends BaseTheme> = ColorProps<Theme> &
  BackgroundColorProps<Theme> &
  OpacityProps<Theme> &
  VisibleProps<Theme> &
  TypographyProps<Theme> &
  TextShadowProps<Theme> &
  SpacingProps<Theme> &
  Required<VariantProps<Theme, "textVariants">>;

export const textRestyleFunctions = [
  color,
  backgroundColor,
  opacity,
  visible,
  typography,
  ...textShadow,
  spacing,
  textVariant,
];

export type BoxRestyleProps<Theme extends BaseTheme> = BackgroundColorProps<Theme> &
  OpacityProps<Theme> &
  VisibleProps<Theme> &
  LayoutProps<Theme> &
  SpacingProps<Theme> &
  BorderProps<Theme> &
  ShadowProps<Theme> &
  PositionProps<Theme>;

export const boxRestyleFunctions = [
  backgroundColor,
  opacity,
  visible,
  layout,
  spacing,
  border,
  shadow,
  position,
];

export type RestyleRef<T> = { ref?: ForwardedRef<T | null> };
