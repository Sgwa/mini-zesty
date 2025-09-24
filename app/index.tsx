import { Screen, Text } from "components/particles";
import { useGetPortfolio } from "hooks/api/portfolio";
import TickerCard from "templates/TickerCard";
import PortfolioCard from "templates/PortfolioCard";
import PortfolioGraph from "templates/PortfolioGraph";
import { FlatList, ListRenderItemInfo } from "react-native";
import { useCallback } from "react";
import { Position } from "services/types/portfolio";

const Index = () => {
  const { data: portfolio } = useGetPortfolio();
  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Position>) => <TickerCard position={item} />,
    [],
  );
  if (!portfolio) return null;

  return (
    <Screen flex={1} padding="l" gap="m">
      <PortfolioGraph portfolio={portfolio} />
      <PortfolioCard portfolio={portfolio} />
      <Text variant="h2">Tus stocks</Text>
      <FlatList
        data={portfolio.positions}
        keyExtractor={item => item.symbol}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </Screen>
  );
};

export default Index;
