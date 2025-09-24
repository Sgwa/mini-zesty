import RestyleProvider from "components/particles/RestyleProvider";
import { FC } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QueryClientProvider } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/query-core";

interface Props {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

const GlobalProviders: FC<Props> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView>
        <RestyleProvider>
          <SafeAreaProvider>{children}</SafeAreaProvider>
        </RestyleProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
};

export default GlobalProviders;
