import { Stack } from "expo-router";
import TickerWebSocketHandler from "templates/TickerWebSocketHandler";

const RootLayout = () => {
  console.log("holaa layout");
  return (
    <>
      <TickerWebSocketHandler />
      <Stack />
    </>
  );
};

export default RootLayout;
