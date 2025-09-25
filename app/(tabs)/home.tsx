import { Screen, Text } from "components/particles";
import { useGetPortfolio } from "hooks/api/portfolio";
import TickerCard from "templates/TickerCard";
import PortfolioCard from "templates/PortfolioCard";
import PortfolioGraph from "templates/PortfolioGraph";
import { FlatList } from "react-native";

const Index = () => {
  const { data: portfolio } = useGetPortfolio();

  if (!portfolio) return null;
  return (
    <Screen flex={1} padding="l" paddingBottom="none" gap="m">
      <PortfolioCard portfolio={portfolio} />
      <PortfolioGraph portfolio={portfolio} />
      <Text variant="h2">Tus stocks</Text>
      <FlatList
        data={portfolio.positions}
        keyExtractor={item => item.symbol}
        renderItem={({ item }) => <TickerCard position={item} />}
        showsVerticalScrollIndicator={false}
      />
    </Screen>
  );
};

export default Index;
