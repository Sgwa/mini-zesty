import { Box, Pressable, Text } from "components/particles";
import { tickerCompanyName } from "resources/constants";
import useTickerStore from "store/tickerStore";
import { router } from "expo-router";
import ArrowDownSvg from "assets/svgs/arrow-down.svg";
import ArrowUpSvg from "assets/svgs/arrow-up.svg";
import colors from "styles/colors";
import { memo } from "react";
import PositionCardSkeleton from "templates/PositionCard/Skeleton";
import { useGetPortfolio } from "hooks/api/portfolio";

interface Props {
  tickerSymbol: keyof typeof tickerCompanyName;
}

const TickerCard = ({ tickerSymbol }: Props) => {
  const { data: portfolio } = useGetPortfolio();
  const position = portfolio?.positions.find(pos => pos.symbol === tickerSymbol);
  const tickerData = useTickerStore(state => state.tickerData?.[tickerSymbol]?.at(-1));
  const history = useTickerStore(state => state.history);
  const ticketHistory = history?.data?.[tickerSymbol];
  const ticketPriceYesterday = ticketHistory?.at(-2)?.close;
  if (!tickerData || !ticketPriceYesterday) return <PositionCardSkeleton />;
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
    <Pressable
      flexDirection="row"
      justifyContent="space-between"
      borderBottomWidth={1}
      borderColor="gray10"
      paddingVertical="m"
      onPress={() => {
        router.push(`ticker/${tickerSymbol}`);
      }}
    >
      <Box flex={1} minWidth={0}>
        <Text variant="h4">{tickerCompanyName[tickerSymbol]}</Text>
        <Text variant="h5R">{tickerSymbol}</Text>
        {position && (
          <Text variant="h5R" color="gray20">
            % de tu portafolio
          </Text>
        )}
      </Box>
      <Box alignItems="flex-end" flexShrink={0}>
        <Text variant="h4" color="black">
          US${tickerData.price.toFixed(2)}
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
        {position && (
          <Text variant="h5" color="primary">
            {(portfolioPercent * 100).toFixed(2)}%
          </Text>
        )}
      </Box>
    </Pressable>
  );
};

export default memo(TickerCard);
