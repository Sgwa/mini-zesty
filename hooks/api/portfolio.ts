import { useQuery } from "@tanstack/react-query";
import { portfolioKeys } from "hooks/api/queryKeys/portfolio";
import portfolioService from "services/portfolioService";
import { axiosData } from "hooks/api/utils";

interface Options {
  enabled: boolean;
}

export const useGetPortfolio = (options?: Options) =>
  useQuery({
    queryKey: portfolioKeys.all(),
    queryFn: axiosData(portfolioService.getPortfolio),
    enabled: options?.enabled,
  });
