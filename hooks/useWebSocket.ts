import useTickerStore from "store/tickerStore";
import { useEffect } from "react";
import { WS_URL } from "@env";
import { History, Tick } from "store/types";

const useTickerWebSocket = () => {
  const { addTicker, setHistory } = useTickerStore(state => ({
    addTicker: state.addTicker,
    setHistory: state.setHistory,
  }));

  useEffect(() => {
    const tickerState = useTickerStore.getState();
    tickerState.startTickerPump();
    return () => tickerState.stopTickerPump();
  }, []);

  useEffect(() => {
    const ws = new WebSocket(WS_URL);

    ws.onmessage = event => {
      const message: Tick | History = JSON.parse(event.data);
      if (message.type === "tick") {
        addTicker(message);
      } else if (message.type === "history") {
        setHistory(message);
      }
    };

    ws.onerror = event => {
      console.error("WebSocket error:", event);
    };
    return () => {
      ws.close();
    };
  }, [addTicker, setHistory]);
};

export default useTickerWebSocket;
