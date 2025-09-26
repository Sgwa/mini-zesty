import { tickerCompanyName } from "resources/constants";
import useTickerStore from "store/tickerStore";
import { Tick } from "store/types";

interface Props {
  plRange: { min: number; max: number };
}

const usePLRangeData = ({ plRange }: Props) => {
  const tickerData = useTickerStore(state =>
    Object.keys(state.tickerData)
      .map(symbol => state.tickerData[symbol]?.at(-1))
      .filter(ticker => ticker !== undefined),
  );
  const history = useTickerStore(state => state.history);

  const filterPLRangeData = (data: (keyof typeof tickerCompanyName)[]) => {
    return data.filter(symbol => {
      const ticker = tickerData.find(ticker => ticker?.ticker === symbol) as Tick;
      const priceYesterday = history?.data?.[symbol]?.at(-2)?.close ?? ticker.price;
      const changePercent = ((ticker.price - priceYesterday) / priceYesterday) * 100;
      return (
        changePercent >= plRange.min &&
        (changePercent <= plRange.max || plRange.max === 200)
      );
    });
  };
  return { filterPLRangeData };
};

export default usePLRangeData;
