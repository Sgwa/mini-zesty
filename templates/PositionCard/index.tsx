import { Box, Pressable, Text } from "components/particles";
import { tickerCompanyName } from "resources/constants";
import { router } from "expo-router";
import ArrowDownSvg from "assets/svgs/arrow-down.svg";
import ArrowUpSvg from "assets/svgs/arrow-up.svg";
import colors from "styles/colors";
import { memo } from "react";
import PositionCardSkeleton from "templates/PositionCard/Skeleton";
import S from "i18n";
import useTickerData from "hooks/useTickerData";

interface Props {
  symbol: keyof typeof tickerCompanyName;
}

const PositionCard = ({ symbol }: Props) => {
  const { tickerData, positionsQty, positionsAvgPrice, ticketPriceYesterday } =
    useTickerData({ tickerSymbol: symbol });
  if (!tickerData || !ticketPriceYesterday || !positionsQty)
    return <PositionCardSkeleton />;
  const changeAbs = (tickerData.price - ticketPriceYesterday) * positionsQty;
  const changePercent = (changeAbs / (ticketPriceYesterday * positionsQty)) * 100;

  return (
    <Pressable
      flexDirection="row"
      justifyContent="space-between"
      borderBottomWidth={1}
      borderColor="gray10"
      paddingVertical="s"
      onPress={() => {
        router.push(`ticker/${symbol}`);
      }}
    >
      <Box flex={1} minWidth={0}>
        <Text variant="h4">{tickerCompanyName[symbol]}</Text>
        <Text variant="h5R">
          {symbol} | US${tickerData.price}
        </Text>
        <Text variant="h5R" color="gray20">
          {S.ticker.pl_total}
        </Text>
        <Text variant="h5R" color="primary">
          {S.ticker.position.average_price}
        </Text>
      </Box>
      <Box alignItems="flex-end" flexShrink={0}>
        <Text variant="h5R" color="black">
          {symbol} {positionsQty.toFixed(2)}
        </Text>
        <Text variant="h4" color="black">
          US${(tickerData.price * positionsQty).toFixed(2)}
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
        <Text variant="h5R" color="primary">
          US${positionsAvgPrice.toFixed(2)}
        </Text>
      </Box>
    </Pressable>
  );
};

export default memo(PositionCard);
