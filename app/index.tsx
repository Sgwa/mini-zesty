import { Screen, Text } from "components/particles";
import { useGetPortfolio } from "hooks/api/portfolio";
import TickerCard from "templates/TickerCard";
import PortfolioCard from "templates/PortfolioCard";

const Index = () => {
  const { data } = useGetPortfolio();
  if (!data) return null;

  return (
    <Screen flex={1} padding="l">
      <PortfolioCard portfolio={data} />
      <Text variant="h2" marginTop="m">
        Tus stocks
      </Text>
      {data?.positions.map(position => (
        <TickerCard key={position.symbol} position={position} />
      ))}
    </Screen>
  );
};

export default Index;
