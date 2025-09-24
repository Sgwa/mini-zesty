import useTickerStore from "store/tickerStore";
import { Screen, Text } from "components/particles";
import { Graph } from "components/molecules";
import { tickerCompanyName } from "resources/constants";

const Index = () => {
  const aaplData = useTickerStore(state => state.tickerData?.AAPL?.at(-1));
  const history = useTickerStore(state => state.history);

  return (
    <Screen flex={1} padding="l">
      <Text variant="h4R" color="gray20">
        AAPL
      </Text>
      <Text variant="h2" color="black">
        {tickerCompanyName["AAPL"]}
      </Text>
      <Text variant="h1R" color="green">
        US${aaplData?.price}
      </Text>
      <Graph ticker="AAPL" history={history} />
    </Screen>
  );
};

export default Index;
