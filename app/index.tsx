import { Screen } from "components/particles";
import { useGetPortfolio } from "hooks/api/portfolio";
import TickerCard from "templates/TickerCard";

const Index = () => {
  const { data } = useGetPortfolio();

  return (
    <Screen flex={1} padding="l" gap="m">
      {data?.positions.map(position => (
        <TickerCard key={position.symbol} position={position} />
      ))}
    </Screen>
  );
};

export default Index;
