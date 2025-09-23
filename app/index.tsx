import useTickerStore from "store/tickerStore";
import { Box, Text } from "components/particles";

const Index = () => {
  const aaplData = useTickerStore(state => state.tickerData?.AAPL?.at(-1));
  const nvdaData = useTickerStore(state => state.tickerData?.NVDA?.at(-1));

  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <Text variant="h2" color="green">
        APPL price: {aaplData?.price}
      </Text>
      <Text variant="h2" color="green">
        NVDA price: {nvdaData?.price}
      </Text>
    </Box>
  );
};

export default Index;
