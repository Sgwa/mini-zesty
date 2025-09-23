import RestyleProvider from "components/particles/RestyleProvider";
import { FC } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

interface Props {
  children: React.ReactNode;
}

const GlobalProviders: FC<Props> = ({ children }) => {
  return (
    <RestyleProvider>
      <SafeAreaProvider>{children}</SafeAreaProvider>
    </RestyleProvider>
  );
};

export default GlobalProviders;
