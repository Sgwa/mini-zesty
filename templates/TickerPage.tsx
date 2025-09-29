import { Box, ScrollView, Text } from "components/particles";
import { tickerCompanyName } from "resources/constants";
import { Graph } from "components/molecules";
import ArrowDownSvg from "assets/svgs/arrow-down.svg";
import colors from "styles/colors";
import ArrowUpSvg from "assets/svgs/arrow-up.svg";
import S from "i18n";
import useTickerData from "hooks/useTickerData";

interface Props {
  tickerSymbol: keyof typeof tickerCompanyName;
}

const TickerPage = ({ tickerSymbol }: Props) => {
  const {
    tickerData,
    changeAbs,
    changePercent,
    ticketHistory,
    positionsQty,
    positionsAvgPrice,
    portfolioPercent,
  } = useTickerData({ tickerSymbol });
  if (!changeAbs || !changePercent) return null;

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
          <Graph marketData={ticketHistory} />
        </Box>
        {!!positionsQty && (
          <Box gap="s">
            <Text variant="h3">{S.ticker.position.title}</Text>
            <Box width="80%" flexDirection="row" justifyContent="space-between">
              <Box gap="m">
                <Box>
                  <Text variant="h5R" color="black">
                    {S.ticker.position.qty}
                  </Text>
                  <Text variant="h4" color="black">
                    {positionsQty.toFixed(2)}
                  </Text>
                </Box>
                <Box>
                  <Text variant="h5R" color="black">
                    {S.ticker.position.current_value}
                  </Text>
                  <Text variant="h4" color="black">
                    US${(tickerData.price * positionsQty).toFixed(2)}
                  </Text>
                </Box>
              </Box>
              <Box gap="m">
                <Box>
                  <Text variant="h5R" color="black">
                    {S.ticker.position.average_price}
                  </Text>
                  <Text variant="h4" color="black">
                    US${positionsAvgPrice.toFixed(2)}
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
                    {((tickerData.price - positionsAvgPrice) * positionsQty).toFixed(2)}
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
