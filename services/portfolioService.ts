import apiService from "services/apiService";
import { AxiosPromise } from "axios";
import { Portfolio } from "services/types/portfolio";

class PortfolioService {
  static getPortfolio = (): AxiosPromise<Portfolio> =>
    apiService.get<Portfolio>("v1/portfolio");
}

export default PortfolioService;
