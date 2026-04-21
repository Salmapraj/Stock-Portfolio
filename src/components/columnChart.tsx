import { Chart, Series, Title, XAxis, YAxis, Legend } from "@highcharts/react";
import stocksData from "../data/stock.json";
import type { Ticker } from "./lineChart";

function ColumnChart({ ticker }: { ticker: Ticker }) {
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
  return (
    <div  className= "max-w-3xl w-full mx-auto">
      <Chart>
        <Title>Volume Traded</Title>
        <Legend />
        <XAxis categories={dates} accessibility={{ description: "Dates" }} />
        <YAxis title={{ text: "Volume" }} min={0} />

        <Series
          type="column"
          pointPadding={0.3}
          color="#FF00FF"
          data={volumes}
          name={ticker}
        />
      </Chart>
    </div>
  );
}

export default ColumnChart;
