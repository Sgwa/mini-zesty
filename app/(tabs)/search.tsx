import { Screen } from "components/particles";
import TickerCard from "templates/TickerCard";
import { FlatList } from "react-native";
import useTickerStore from "store/tickerStore";
import { SortBy, SortOrder, tickerCompanyName } from "resources/constants";
import useSortData from "hooks/useSortData";
import { useState } from "react";
import SortPills from "components/atoms/SortPills";

const Search = () => {
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.PERCENTAGE);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.DESC);
  const history = useTickerStore(state => state.history);
  const { sortData } = useSortData({ by: sortBy, order: sortOrder });
  const data = Object.keys(history?.data ?? {});
  const handleSort = (idx: number) => {
    setSortBy(Object.values(SortBy)[idx]);
    setSortOrder(prev =>
      Object.values(SortBy)[idx] === sortBy
        ? prev === SortOrder.DESC
          ? SortOrder.ASC
          : SortOrder.DESC
        : SortOrder.DESC,
    );
  };
  if (!history) return null;
  return (
    <Screen flex={1} padding="l" paddingBottom="none" gap="s">
      <SortPills
        by={sortBy}
        order={sortOrder}
        items={Object.values(SortBy)}
        onChange={handleSort}
      />
      <FlatList
        data={sortData(data as (keyof typeof tickerCompanyName)[])}
        keyExtractor={item => item}
        renderItem={({ item }) => <TickerCard tickerSymbol={item} />}
        showsVerticalScrollIndicator={false}
      />
    </Screen>
  );
};

export default Search;
