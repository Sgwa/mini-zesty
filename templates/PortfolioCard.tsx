import { Box, Text } from "components/particles";
import { Portfolio } from "services/types/portfolio";
import useTickerStore from "store/tickerStore";
import ArrowDownSvg from "assets/svgs/arrow-down.svg";
import ArrowUpSvg from "assets/svgs/arrow-up.svg";
import colors from "styles/colors";
import PositionCardSkeleton from "templates/PositionCard/Skeleton";
import S from "i18n";

interface Props {
  portfolio: Portfolio;
}

const PortfolioCard = ({ portfolio }: Props) => {
  const tickerData = useTickerStore(state =>
    portfolio.positions
      .map(position => state.tickerData?.[position.symbol]?.at(-1))
      .filter(ticker => ticker !== undefined),
  );
  const history = useTickerStore(state => state.history);
  const ticketsHistory = portfolio.positions
    .map(position => history?.data?.[position.symbol])
    .filter(dayData => dayData !== undefined);
  const ticketPriceYesterday = ticketsHistory
    .map(ticketHistory => ticketHistory?.at(-2)?.close)
    .filter(price => price !== undefined);
  if (!tickerData || !ticketPriceYesterday) return null;

  const dayChangesAbs = tickerData.map(
    (ticker, index) =>
      (ticker.price - ticketPriceYesterday[index]) * portfolio.positions[index].qty,
  );
  const totalTicketPriceYesterday = ticketPriceYesterday.reduce((a, b) => a + b, 0);
  const totalDayChangeAbs = dayChangesAbs.reduce((a, b) => a + b, 0);
  const totalDayChangePercent = (totalDayChangeAbs / totalTicketPriceYesterday) * 100;

  const buyPriceSum = portfolio.positions
    .map(position => position.buyPrice * position.qty)
    .reduce((a, b) => a + b, 0);
  const totalCurrentPrice = tickerData
    .map((ticker, index) => ticker.price * portfolio.positions[index].qty)
    .reduce((a, b) => a + b, 0);
  const totalChangeAbs = totalCurrentPrice - buyPriceSum;
  const totalChangePercent = (totalChangeAbs / buyPriceSum) * 100;
  if (portfolio.positions.length === 0) return null;
  if (totalCurrentPrice.toFixed(2) == "0.00")
    return (
      <Box borderWidth={2} borderColor="primary" borderRadius={8} paddingHorizontal="s">
        <PositionCardSkeleton />
      </Box>
    );

  return (
    <Box
      flexDirection="row"
      justifyContent="space-between"
      borderWidth={2}
      borderColor="primary"
      borderRadius={8}
      padding="s"
    >
      <Box>
        <Text variant="h2">{S.home.portfolio_title}</Text>
        <Text variant="h3R">{S.ticker.total}</Text>
        <Text variant="h4R" color="black">
          {S.ticker.pl_total}
        </Text>
        <Text variant="h5R" color="gray20">
          {S.ticker.pl_today}
        </Text>
      </Box>
      <Box alignItems="flex-end">
        <Text variant="h5R" color="black"></Text>
        <Text variant="h2" color="black">
          US${totalCurrentPrice.toFixed(2)}
        </Text>
        <Box flexDirection="row" alignItems="center">
          {totalChangeAbs < 0 ? (
            <ArrowDownSvg height={17} width={17} color={colors.red} />
          ) : (
            <ArrowUpSvg height={17} width={17} color={colors.green} />
          )}
          <Text variant="h4" color={totalChangeAbs < 0 ? "red" : "green"}>
            {totalChangeAbs > 0 && "+"}
            {totalChangeAbs.toFixed(2)} [{totalChangeAbs > 0 && "+"}
            {totalChangePercent.toFixed(2)}%]
          </Text>
        </Box>
        <Box flexDirection="row" alignItems="center">
          {totalDayChangeAbs < 0 ? (
            <ArrowDownSvg height={17} width={17} color={colors.red} />
          ) : (
            <ArrowUpSvg height={17} width={17} color={colors.green} />
          )}
          <Text variant="h5R" color={totalDayChangeAbs < 0 ? "red" : "green"}>
            {totalDayChangeAbs > 0 && "+"}
            {totalDayChangeAbs.toFixed(2)} [{totalDayChangeAbs > 0 && "+"}
            {totalDayChangePercent.toFixed(2)}%]
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default PortfolioCard;
