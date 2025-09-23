import { composeRestyleFunctions, useRestyle } from "@shopify/restyle";
import React, { ForwardedRef } from "react";
import { Text as RNText, TextProps } from "react-native";
import { RTheme } from "styles/restyleTheme";
import { RestyleRef, textRestyleFunctions, TextRestyleProps } from "styles/types";

type Props = TextRestyleProps<RTheme> & RestyleRef<RNText> & TextProps;

const restyleFunctions = composeRestyleFunctions<RTheme, Props>(textRestyleFunctions);

const Text = ({ ...rest }: Props, ref?: ForwardedRef<RNText | null>) => {
  const props = useRestyle(restyleFunctions, rest);
  return <RNText ref={ref} {...props} />;
};

export default Text;
