import { composeRestyleFunctions, useRestyle } from "@shopify/restyle";
import React, { ForwardedRef } from "react";
import { View, ViewProps } from "react-native";
import { RTheme } from "styles/restyleTheme";
import { boxRestyleFunctions, BoxRestyleProps, RestyleRef } from "styles/types";

type Props = BoxRestyleProps<RTheme> & RestyleRef<View> & ViewProps;

const restyleFunctions = composeRestyleFunctions<RTheme, Props>(boxRestyleFunctions);

const Box = ({ ...rest }: Props, ref?: ForwardedRef<View | null>) => {
  const props = useRestyle(restyleFunctions, rest);
  return <View ref={ref} {...props} />;
};

export default Box;
