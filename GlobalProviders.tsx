import RestyleProvider from "components/particles/RestyleProvider";
import { FC } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

interface Props {
  children: React.ReactNode;
}

const GlobalProviders: FC<Props> = ({ children }) => {
  return (
    <GestureHandlerRootView>
      <RestyleProvider>
        <SafeAreaProvider>{children}</SafeAreaProvider>
      </RestyleProvider>
    </GestureHandlerRootView>
  );
};

export default GlobalProviders;
