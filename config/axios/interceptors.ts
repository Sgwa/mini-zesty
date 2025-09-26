import { AxiosResponse, InternalAxiosRequestConfig } from "axios";

const DELAY_MS = 350;

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

const getCredentials = async () => {
  return "mock_access_token";
};

const getPath = (config: InternalAxiosRequestConfig) => {
  const u = config.url ?? "";
  try {
    return new URL(u, config.baseURL ?? "http://d").pathname;
  } catch {
    return u;
  }
};

const mockPortfolioCall = async (
  config: InternalAxiosRequestConfig,
): Promise<AxiosResponse | null> => {
  const path = getPath(config);
  const method = (config.method ?? "get").toUpperCase();

  if (method === "GET" && path === "/v1/portfolio") {
    return {
      data: {
        cash: 1500.0,
        positions: [
          { symbol: "AAPL", qty: 10, avgPrice: 100 },
          { symbol: "NVDA", qty: 5, avgPrice: 400 },
          { symbol: "TSLA", qty: 2, avgPrice: 210 },
        ],
        updatedAt: Date.now(),
      },
      status: 200,
      statusText: "OK",
      headers: {},
      config,
      request: {},
    };
  }
  return null;
};

export const request = async (
  config: InternalAxiosRequestConfig,
): Promise<InternalAxiosRequestConfig> => {
  const accessToken = await getCredentials();

  const result = config;

  result.headers["Content-Type"] = "application/json";
  result.headers["Authorization"] = `Bearer ${accessToken}`;

  const mock = await mockPortfolioCall(result);
  if (mock) {
    result.adapter = async () => {
      if (DELAY_MS) await sleep(DELAY_MS);
      return mock;
    };
  }
  return result;
};
