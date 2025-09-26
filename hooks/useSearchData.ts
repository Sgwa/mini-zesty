import { tickerCompanyName } from "resources/constants";

interface Props {
  query: string;
}

const useSearchData = ({ query }: Props) => {
  const searchData = (data: (keyof typeof tickerCompanyName)[]) => {
    if (query === "") return data;
    return data.filter(
      symbol =>
        tickerCompanyName[symbol].toLowerCase().includes(query.toLowerCase()) ||
        symbol.toLowerCase().includes(query.toLowerCase()),
    );
  };
  return { searchData };
};

export default useSearchData;
