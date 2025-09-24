import { Box, Pressable, Text } from "components/particles";
import { tickerCompanyName } from "resources/constants";
import { Position } from "services/types/portfolio";
import useTickerStore from "store/tickerStore";
import { router } from "expo-router";
import ArrowDownSvg from "assets/svgs/arrow-down.svg";
import ArrowUpSvg from "assets/svgs/arrow-up.svg";
import colors from "styles/colors";

interface Props {
  position: Position;
}

const TickerCard = ({ position }: Props) => {
  const tickerData = useTickerStore(state => state.tickerData?.[position.symbol]?.at(-1));
  const history = useTickerStore(state => state.history);
  const ticketHistory = history?.data?.[position.symbol];
  const ticketPriceYesterday = ticketHistory?.at(-2)?.close;
  if (!tickerData || !ticketPriceYesterday) return null;
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
      <Box>
        <Text variant="h4">{tickerCompanyName[position.symbol]}</Text>
        <Text variant="h5R">{position.symbol}</Text>
      </Box>
      <Box alignItems="flex-end">
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
            {changeAbs.toFixed(2)} [{changePercent.toFixed(2)}%]
          </Text>
        </Box>
      </Box>
    </Pressable>
  );
};

export default TickerCard;
