import { Stack } from "expo-router";
import TickerWebSocketHandler from "templates/TickerWebSocketHandler";
import GlobalProviders from "GlobalProviders";

const RootLayout = () => {
  return (
    <GlobalProviders>
      <TickerWebSocketHandler />
      <Stack />
    </GlobalProviders>
  );
};

export default RootLayout;
