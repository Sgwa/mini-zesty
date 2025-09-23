import { Text, View } from "react-native";
import useTickerStore from "store/tickerStore";

const Index = () => {
  const { history, tickerData } = useTickerStore(state => ({
    history: state.history,
    tickerData: state.tickerData,
  }));

  console.log(tickerData.at(-1));

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
};

export default Index;
