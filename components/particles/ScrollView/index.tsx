import { createBox } from "@shopify/restyle";
import { ScrollView as RNScrollView, ScrollViewProps } from "react-native";
import { RTheme } from "styles/restyleTheme";

const ScrollView = createBox<RTheme, ScrollViewProps>(RNScrollView);

export default ScrollView;
