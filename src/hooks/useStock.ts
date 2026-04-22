import stocksData from "../data/stock.json";
// import type {Ticker} from "@/components/lineChart"

export type Ticker = keyof typeof stocksData;
export const useStock = (ticker: Ticker) => {
  const priceHistory = stocksData[ticker].priceHistory;
  const dates = priceHistory.map((item) =>
    new Date(item.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
  );
  const volumes = priceHistory.map((item) => {
    return item.volume;
  });

  const prices = priceHistory.map((item) => {
    return item.price;
  });

  return {
    priceHistory,
    dates,
    volumes,
    prices,
  };
};
