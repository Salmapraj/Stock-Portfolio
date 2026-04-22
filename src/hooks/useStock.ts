import stocksData from "../data/stock.json";
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

  const volumes = priceHistory.map((item) => item.volume);

  const prices = priceHistory.map((item) => item.price);

  return {
    priceHistory,
    dates,
    volumes,
    prices,
  };
};
