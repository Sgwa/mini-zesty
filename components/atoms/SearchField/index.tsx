import { Searchbar } from "react-native-paper";
import { composeRestyleFunctions, useRestyle } from "@shopify/restyle";
import { RTheme } from "styles/restyleTheme";
import {
  boxRestyleFunctions,
  BoxRestyleProps,
  RestyleRef,
  textRestyleFunctions,
  TextRestyleProps,
} from "styles/types";
import { Text as RNText } from "react-native/Libraries/Text/Text";
import { TextProps, View, ViewProps } from "react-native";
import { ComponentProps } from "react";

type TProps = TextRestyleProps<RTheme> & RestyleRef<RNText> & TextProps;
type BProps = BoxRestyleProps<RTheme> & RestyleRef<View> & ViewProps;
type PaperProps = ComponentProps<typeof Searchbar>;

interface Props extends BProps {
  placeholder: string;
  setSearchQuery: (text: string) => void;
  searchQuery: string;
  textProps: TProps;
  theme?: PaperProps["theme"];
}

const SearchField = ({
  textProps,
  placeholder,
  searchQuery,
  setSearchQuery,
  theme,
  ...rest
}: Props) => {
  const tRestyleFunctions = composeRestyleFunctions<RTheme, TProps>(textRestyleFunctions);
  const bRestyleFunctions = composeRestyleFunctions<RTheme, BProps>(boxRestyleFunctions);
  const tProps = useRestyle(tRestyleFunctions, textProps);
  const bProps = useRestyle(bRestyleFunctions, rest);

  return (
    <Searchbar
      placeholder={placeholder}
      onChangeText={setSearchQuery}
      value={searchQuery}
      inputStyle={tProps.style}
      style={bProps.style as PaperProps["style"]}
      theme={theme}
    />
  );
};

export default SearchField;
