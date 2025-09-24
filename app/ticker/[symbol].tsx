import {Box, Screen } from "components/particles";
import TickerPage from "templates/TickerPage";
import { useLocalSearchParams } from "expo-router";
import { tickerCompanyName } from "resources/constants";
import BackHeader from "templates/BackHeader";

const TickerScreen = () => {
  const { symbol } = useLocalSearchParams<{ symbol: keyof typeof tickerCompanyName }>();
  return (
    <Screen flex={1}>
      <BackHeader />
      <Box padding="l">
        <TickerPage tickerSymbol={symbol} />
      </Box>
    </Screen>
  );
};

export default TickerScreen;
