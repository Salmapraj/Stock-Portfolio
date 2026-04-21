import stocksData from "../data/stock.json";
import { Chart, Series, Title, XAxis, YAxis, Legend } from "@highcharts/react";

export type Ticker = keyof typeof stocksData;

function LineChart({ ticker }: { ticker: Ticker }) {
  const priceHistory = stocksData[ticker].priceHistory;
  const prices = priceHistory.map((item) => {
    return item.price;
  });
  const dates = priceHistory.map((item) =>
    new Date(item.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
  );

  return (
        <div  className= "max-w-3xl w-full mx-auto">

    <Chart>
      <Title>Stock Price Over Time</Title>
      <Legend />
      <XAxis categories={dates} />
      <YAxis title={{ text: "Price" }} />
      <Series
        data={prices}
        name={ticker}
        color="#007bff"
        dataLabels={{ enabled: true }}
        type="line"
        lineWidth={2}
      />
    </Chart>
    </div>
  );
}

export default LineChart;
