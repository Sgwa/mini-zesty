import { Box, Pressable, Text } from "components/particles";
import { tickerCompanyName } from "resources/constants";
import { router } from "expo-router";
import ArrowDownSvg from "assets/svgs/arrow-down.svg";
import ArrowUpSvg from "assets/svgs/arrow-up.svg";
import colors from "styles/colors";
import { memo } from "react";
import S from "i18n";
import useTickerData from "hooks/useTickerData";

interface Props {
  tickerSymbol: keyof typeof tickerCompanyName;
}

const TickerCard = ({ tickerSymbol }: Props) => {
  const { tickerData, changeAbs, changePercent, positionsQty, portfolioPercent } =
    useTickerData({ tickerSymbol });
  if (!changeAbs || !changePercent) return null;

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
        {!!positionsQty && (
          <Text variant="h5R" color="gray20">
            {S.ticker.position.portfolio_percentage}
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
        {!!positionsQty && (
          <Text variant="h5" color="primary">
            {(portfolioPercent * 100).toFixed(2)}%
          </Text>
        )}
      </Box>
    </Pressable>
  );
};

export default memo(TickerCard);
