import useTickerStore from "store/tickerStore";
import { Box, ScrollView, Text } from "components/particles";
import { tickerCompanyName } from "resources/constants";
import { Graph } from "components/molecules";
import ArrowDownSvg from "assets/svgs/arrow-down.svg";
import colors from "styles/colors";
import ArrowUpSvg from "assets/svgs/arrow-up.svg";
import { useGetPortfolio } from "hooks/api/portfolio";
import S from "../i18n";

interface Props {
  tickerSymbol: keyof typeof tickerCompanyName;
}

const TickerPage = ({ tickerSymbol }: Props) => {
  const { data: portfolio } = useGetPortfolio();
  const position = portfolio?.positions.find(pos => pos.symbol === tickerSymbol);
  const tickerData = useTickerStore(state => state.tickerData?.[tickerSymbol]?.at(-1));
  const history = useTickerStore(state => state.history);
  const ticketHistory = history?.data?.[tickerSymbol];
  const ticketPriceYesterday = ticketHistory?.at(-2)?.close;
  if (!tickerData || !ticketPriceYesterday) return null;
  const changeAbs = tickerData.price - ticketPriceYesterday;
  const changePercent = (changeAbs / ticketPriceYesterday) * 100;
  const portfolioPercent =
    position && portfolio
      ? (tickerData.price * position.qty) /
        portfolio.positions.reduce((acc, pos) => {
          const posTickerData = useTickerStore
            .getState()
            .tickerData?.[pos.symbol]?.at(-1);
          if (!posTickerData) return acc;
          return acc + posTickerData.price * pos.qty;
        }, 0)
      : 0;

  return (
    <ScrollView height="100%">
      <Box gap="m">
        <Box>
          <Text variant="h4R" color="gray20">
            {tickerSymbol}
          </Text>
          <Text variant="h2" color="black">
            {tickerCompanyName[tickerSymbol]}
          </Text>
          <Text variant="h1R" color="green">
            US${tickerData?.price}
          </Text>
          <Box flexDirection="row" alignItems="center">
            {changeAbs < 0 ? (
              <ArrowDownSvg height={17} width={17} color={colors.red} />
            ) : (
              <ArrowUpSvg height={17} width={17} color={colors.green} />
            )}
            <Text variant="h5" color={changeAbs < 0 ? "red" : "green"}>
              {changeAbs > 0 && "+"}
              {changeAbs.toFixed(2)} [{changeAbs > 0 && "+"}
              {changePercent.toFixed(2)}%]
            </Text>
          </Box>
          <Graph tickerHData={ticketHistory} />
        </Box>
        {position && (
          <Box gap="s">
            <Text variant="h3">{S.ticker.position.title}</Text>
            <Box flexDirection="row" gap="xxl">
              <Box gap="m">
                <Box>
                  <Text variant="h5R" color="black">
                    {S.ticker.position.qty}
                  </Text>
                  <Text variant="h4" color="black">
                    {position.qty.toFixed(2)}
                  </Text>
                </Box>
                <Box>
                  <Text variant="h5R" color="black">
                    {S.ticker.position.current_value}
                  </Text>
                  <Text variant="h4" color="black">
                    US${(tickerData.price * position.qty).toFixed(2)}
                  </Text>
                </Box>
              </Box>
              <Box gap="m">
                <Box>
                  <Text variant="h5R" color="black">
                    {S.ticker.position.average_price}
                  </Text>
                  <Text variant="h4" color="black">
                    US${position.avgPrice.toFixed(2)}
                  </Text>
                </Box>
                <Box>
                  <Text variant="h5R" color="black">
                    {S.ticker.position.portfolio_percentage}
                  </Text>
                  <Text variant="h4" color="black">
                    {(portfolioPercent * 100).toFixed(2)}%
                  </Text>
                </Box>
                <Box>
                  <Text variant="h5R" color="black">
                    {S.ticker.position.pl_total}
                  </Text>
                  <Text variant="h4" color="black">
                    US$
                    {((tickerData.price - position.avgPrice) * position.qty).toFixed(2)}
                  </Text>
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </ScrollView>
  );
};

export default TickerPage;
