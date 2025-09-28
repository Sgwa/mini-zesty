import { Screen, Text } from "components/particles";
import { useGetPortfolio } from "hooks/api/portfolio";
import PositionCard from "templates/PositionCard";
import PortfolioCard from "templates/PortfolioCard";
import PortfolioGraph from "templates/PortfolioGraph";
import { FlatList } from "react-native";
import S from "i18n";

const Index = () => {
  const { data: portfolio } = useGetPortfolio();

  if (!portfolio) return null;
  return (
    <Screen flex={1} paddingHorizontal="l" paddingTop="m" paddingBottom="none" gap="m">
      <PortfolioCard portfolio={portfolio} />
      <PortfolioGraph portfolio={portfolio} />
      <Text variant="h2">{S.home.your_stocks_title}</Text>
      <FlatList
        data={portfolio.positions}
        keyExtractor={item => item.symbol}
        renderItem={({ item }) => <PositionCard position={item} />}
        showsVerticalScrollIndicator={false}
      />
    </Screen>
  );
};

export default Index;
