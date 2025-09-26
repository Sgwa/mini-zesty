import { Tick } from "store/types";
import useTickerStore from "store/tickerStore";
import { useGetPortfolio } from "hooks/api/portfolio";
import { SortBy, SortOrder, tickerCompanyName } from "resources/constants";

interface Props {
  by: SortBy;
  order?: SortOrder;
}

const useSortData = ({ by, order = SortOrder.DESC }: Props) => {
  const { data: portfolio } = useGetPortfolio();
  const tickerData = useTickerStore(state =>
    Object.keys(state.tickerData)
      .map(symbol => state.tickerData[symbol]?.at(-1))
      .filter(ticker => ticker !== undefined),
  );
  const history = useTickerStore(state => state.history);

  const criteria = (
    a: keyof typeof tickerCompanyName,
    b: keyof typeof tickerCompanyName,
  ) => {
    const tickerA = tickerData.find(ticker => ticker?.ticker === a) as Tick;
    const tickerB = tickerData.find(ticker => ticker?.ticker === b) as Tick;
    const priceYesterdayA = history?.data?.[a]?.at(-2)?.close ?? tickerA.price;
    const priceYesterdayB = history?.data?.[b]?.at(-2)?.close ?? tickerB.price;
    const positionA = portfolio?.positions.find(position => position.symbol === a);
    const positionB = portfolio?.positions.find(position => position.symbol === b);

    if (by === "p&l") {
      const changeA = tickerA.price - priceYesterdayA;
      const changeB = tickerB.price - priceYesterdayB;
      if (order === "asc") return changeA - changeB;
      return changeB - changeA;
    }
    if (by === "percentage") {
      const changePercentA = ((tickerA.price - priceYesterdayA) / priceYesterdayA) * 100;
      const changePercentB = ((tickerB.price - priceYesterdayB) / priceYesterdayB) * 100;
      if (order === "asc") return changePercentA - changePercentB;
      return changePercentB - changePercentA;
    }
    if (by === "price") {
      if (order === "asc") return tickerA.price - tickerB.price;
      return tickerB.price - tickerA.price;
    }
    if (by === "portfolio") {
      const portfolioValueA = positionA?.qty ? positionA.qty * tickerA.price : undefined;
      const portfolioValueB = positionB?.qty ? positionB.qty * tickerB.price : undefined;
      if (portfolioValueA === undefined && portfolioValueB === undefined) return 0;
      if (portfolioValueA === undefined) return 1;
      if (portfolioValueB === undefined) return -1;
      if (order === "asc") return portfolioValueA - portfolioValueB;
      return portfolioValueB - portfolioValueA;
    }
    return 0;
  };
  const sortData = (data: (keyof typeof tickerCompanyName)[]) => {
    return data.sort(criteria);
  };
  return { sortData };
};

export default useSortData;
