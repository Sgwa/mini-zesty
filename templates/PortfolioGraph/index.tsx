import { Portfolio } from "services/types/portfolio";
import useTickerStore from "store/tickerStore";
import { Graph } from "components/molecules";
import { buildPortfolioDayData } from "templates/PortfolioGraph/utils";

interface Props {
  portfolio: Portfolio;
}

const PortfolioGraph = ({ portfolio }: Props) => {
  const history = useTickerStore(state => state.history);
  if (!history) return null;
  const totalHData = buildPortfolioDayData(history?.data, portfolio.positions);
  return <Graph tickerHData={totalHData} />;
};

export default PortfolioGraph;
