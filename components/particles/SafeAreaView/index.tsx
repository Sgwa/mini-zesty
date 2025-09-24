import {
  SafeAreaView as ReactSafeAreaView,
  SafeAreaViewProps,
} from "react-native-safe-area-context";
import { composeRestyleFunctions, useRestyle } from "@shopify/restyle";
import React, { ForwardedRef } from "react";
import { RTheme } from "styles/restyleTheme";
import { boxRestyleFunctions, BoxRestyleProps, RestyleRef } from "styles/types";
import { View } from "react-native";

type Props = BoxRestyleProps<RTheme> & RestyleRef<View> & SafeAreaViewProps;

const restyleFunctions = composeRestyleFunctions<RTheme, Props>(boxRestyleFunctions);

const SafeAreaView = ({ ...rest }: Props, ref?: ForwardedRef<View | null>) => {
  const props = useRestyle(restyleFunctions, rest);
  return <ReactSafeAreaView ref={ref} {...props} />;
};

export default SafeAreaView;
