import { Screen } from "components/particles";
import TickerCard from "templates/TickerCard";
import { FlatList } from "react-native";
import useTickerStore from "store/tickerStore";
import { tickerCompanyName } from "resources/constants";

const Search = () => {
  const history = useTickerStore(state => state.history);
  if (!history) return null;
  return (
    <Screen flex={1} padding="l" paddingBottom="none" gap="m">
      <FlatList
        data={Object.keys(history?.data)}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <TickerCard symbol={item as keyof typeof tickerCompanyName} />
        )}
        showsVerticalScrollIndicator={false}
      />
    </Screen>
  );
};

export default Search;
