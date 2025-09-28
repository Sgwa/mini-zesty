import { useGetPortfolio } from "hooks/api/portfolio";
import useTickerStore from "store/tickerStore";
import { tickerCompanyName } from "resources/constants";

interface Props {
  tickerSymbol: keyof typeof tickerCompanyName;
}

const useTickerData = ({ tickerSymbol }: Props) => {
  const { data: portfolio } = useGetPortfolio();
  const positions = portfolio?.positions.filter(pos => pos.symbol === tickerSymbol);
  const tickerData = useTickerStore(state => state.tickerData?.[tickerSymbol]?.at(-1));
  const history = useTickerStore(state => state.history);
  const ticketHistory = history?.data?.[tickerSymbol];
  const ticketPriceYesterday = ticketHistory?.at(-2)?.close;
  if (!tickerData || !ticketPriceYesterday)
    return {
      tickerData,
      ticketHistory,
      ticketPriceYesterday,
      changeAbs: null,
      changePercent: null,
      positionsQty: null,
      positionsAvgPrice: null,
      portfolioPercent: null,
    };
  const changeAbs = tickerData.price - ticketPriceYesterday;
  const changePercent = (changeAbs / ticketPriceYesterday) * 100;
  const positionsQty = positions?.reduce((a, b) => a + b.qty, 0);
  const positionsAvgPrice =
    positions && positionsQty
      ? positions.reduce((a, b) => a + b.qty * b.buyPrice, 0) / positionsQty
      : 0;
  const portfolioPercent =
    positionsQty && portfolio
      ? (tickerData.price * positionsQty) /
        portfolio.positions.reduce((acc, pos) => {
          const posTickerData = useTickerStore
            .getState()
            .tickerData?.[pos.symbol]?.at(-1);
          if (!posTickerData) return acc;
          return acc + posTickerData.price * pos.qty;
        }, 0)
      : 0;
  return {
    tickerData,
    changeAbs,
    changePercent,
    ticketHistory,
    ticketPriceYesterday,
    positionsQty,
    positionsAvgPrice,
    portfolioPercent,
  };
};

export default useTickerData;
