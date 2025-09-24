import { createBox } from "@shopify/restyle";
import { Pressable as ReactPressable, PressableProps } from "react-native";
import { RTheme } from "styles/restyleTheme";

const Pressable = createBox<RTheme, PressableProps>(ReactPressable);

export default Pressable;
