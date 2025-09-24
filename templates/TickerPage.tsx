import useTickerStore from "store/tickerStore";
import { Text } from "components/particles";
import { tickerCompanyName } from "resources/constants";
import { Graph } from "components/molecules";

interface Props {
  tickerSymbol: keyof typeof tickerCompanyName;
}

const TickerPage = ({ tickerSymbol }: Props) => {
  const tickerData = useTickerStore(state => state.tickerData?.[tickerSymbol]?.at(-1));
  const history = useTickerStore(state => state.history);

  return (
    <>
      <Text variant="h4R" color="gray20">
        {tickerSymbol}
      </Text>
      <Text variant="h2" color="black">
        {tickerCompanyName[tickerSymbol]}
      </Text>
      <Text variant="h1R" color="green">
        US${tickerData?.price}
      </Text>
      <Graph ticker={tickerSymbol} history={history} />
    </>
  );
};

export default TickerPage;
