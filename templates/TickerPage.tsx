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
  const tickerHData = history?.data?.[tickerSymbol];

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
      <Graph tickerHData={tickerHData} />
    </>
  );
};

export default TickerPage;
