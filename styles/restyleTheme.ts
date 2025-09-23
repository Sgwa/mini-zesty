import { createTheme } from "@shopify/restyle";
import breakpoints from "styles/breakpoints";
import colors from "styles/colors";
import spacing from "styles/spacing";
import textV from "styles/textVariants";

export const baseTheme = {
  colors,
  spacing,
  breakpoints: {
    mobile: breakpoints.mobile,
    tablet: breakpoints.tablet,
  },
  zIndices: undefined,
  borderRadii: undefined,
};

const textVariants = { ...textV.mobile };
export const variantsTheme = {
  textVariants,
};

const theme = createTheme({ ...baseTheme, ...variantsTheme });

export type RTheme = typeof theme;

export type Colors = Partial<keyof Omit<RTheme["colors"], "defaults">>;

export default theme;
