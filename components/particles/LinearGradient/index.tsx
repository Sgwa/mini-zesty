import { composeRestyleFunctions, useRestyle, useTheme } from "@shopify/restyle";
import { LinearGradient as RNLinearGradient } from "expo-linear-gradient";
import { Colors, RTheme } from "styles/restyleTheme";
import { boxRestyleFunctions, BoxRestyleProps, RestyleRef } from "styles/types";
import { View, ViewProps } from "react-native";

type BProps = BoxRestyleProps<RTheme> & RestyleRef<View> & ViewProps;

interface Props extends BProps {
  colors: Colors[];
  starts?: { x: number; y: number };
  ends?: { x: number; y: number };
}

const restyleFunctions = composeRestyleFunctions<RTheme, BProps>(boxRestyleFunctions);

const LinearGradient = ({ colors, starts, ends, ...rest }: Props) => {
  const { colors: themeColors } = useTheme<RTheme>();
  const gradientColors = colors.map(c => themeColors[c]) as [string, string, ...string[]];
  const props = useRestyle(restyleFunctions, rest);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { start, end, ref, ...finalProps } = props;
  return (
    <RNLinearGradient colors={gradientColors} start={starts} end={ends} {...finalProps} />
  );
};

export default LinearGradient;
