import { Box, Screen } from "components/particles";
import TickerCard from "templates/TickerCard";
import { FlatList } from "react-native";
import useTickerStore from "store/tickerStore";
import { SortBy, SortOrder, tickerCompanyName } from "resources/constants";
import useSortData from "hooks/useSortData";
import { useState } from "react";
import colors from "styles/colors";
import useSearchData from "hooks/useSearchData";
import { PLRangeSlider, SortPills, SearchField } from "components/atoms";
import usePLRangeData from "hooks/usePLRangeData";
import S from "i18n";

const Search = () => {
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.PERCENTAGE);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.DESC);
  const [searchQuery, setSearchQuery] = useState("");
  const [plRange, setPLRange] = useState<{ min: number; max: number }>({
    min: -100,
    max: 100,
  });
  const history = useTickerStore(state => state.history);
  const { sortData } = useSortData({ by: sortBy, order: sortOrder });
  const { searchData } = useSearchData({ query: searchQuery });
  const { filterPLRangeData } = usePLRangeData({ plRange });
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
    <Screen flex={1} paddingHorizontal="l" paddingTop="m" paddingBottom="none">
      <Box gap="m">
        <SearchField
          placeholder={S.filter.search.toString()}
          textProps={{ variant: "h4R", color: "black" }}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          backgroundColor="gray10"
          theme={{ colors: { onSurface: colors.gray20 } }}
        />
        <SortPills
          by={sortBy}
          order={sortOrder}
          items={Object.values(SortBy)}
          onChange={handleSort}
        />
        <Box paddingHorizontal="m">
          <PLRangeSlider onChange={(lo, hi) => setPLRange({ min: lo, max: hi })} />
        </Box>
      </Box>
      <FlatList
        data={filterPLRangeData(
          searchData(sortData(data as (keyof typeof tickerCompanyName)[])),
        )}
        keyExtractor={item => item}
        renderItem={({ item }) => <TickerCard tickerSymbol={item} />}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
      />
    </Screen>
  );
};

export default Search;
