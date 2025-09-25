import { Box, Pressable, Text } from "components/particles";
import { tickerCompanyName } from "resources/constants";
import { Position } from "services/types/portfolio";
import useTickerStore from "store/tickerStore";
import { router } from "expo-router";
import ArrowDownSvg from "assets/svgs/arrow-down.svg";
import ArrowUpSvg from "assets/svgs/arrow-up.svg";
import colors from "styles/colors";
import { memo } from "react";
import PositionCardSkeleton from "templates/PositionCard/Skeleton";

interface Props {
  position: Position;
}

const PositionCard = ({ position }: Props) => {
  const { tickerData, history } = useTickerStore(state => ({
    tickerData: state.tickerData?.[position.symbol]?.at(-1),
    history: state.history,
  }));
  const ticketHistory = history?.data?.[position.symbol];
  const ticketPriceYesterday = ticketHistory?.at(-2)?.close;
  if (!tickerData || !ticketPriceYesterday) return <PositionCardSkeleton />;
  const changeAbs = (tickerData.price - ticketPriceYesterday) * position.qty;
  const changePercent = (changeAbs / (ticketPriceYesterday * position.qty)) * 100;

  return (
    <Pressable
      flexDirection="row"
      justifyContent="space-between"
      borderBottomWidth={1}
      borderColor="gray10"
      paddingVertical="s"
      onPress={() => {
        router.push(`ticker/${position.symbol}`);
      }}
    >
      <Box flex={1} minWidth={0}>
        <Text variant="h4">{tickerCompanyName[position.symbol]}</Text>
        <Text variant="h5R">
          {position.symbol} | US${tickerData.price}
        </Text>
        <Text variant="h5R" color="gray20">
          P&L Hoy
        </Text>
        <Text variant="h5R" color="primary">
          Precio promedio
        </Text>
      </Box>
      <Box alignItems="flex-end" flexShrink={0}>
        <Text variant="h5R" color="black">
          {position.symbol} {position.qty.toFixed(2)}
        </Text>
        <Text variant="h4" color="black">
          US${(tickerData.price * position.qty).toFixed(2)}
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
          US${position.avgPrice.toFixed(2)}
        </Text>
      </Box>
    </Pressable>
  );
};

export default memo(PositionCard);
