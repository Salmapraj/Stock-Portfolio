import { Chart, Series, Title, XAxis, YAxis, Legend } from "@highcharts/react";
import { useStock, type Ticker } from "@/hooks/useStock";

function ColumnChart({ ticker }: { ticker: Ticker }) {
  const { dates, volumes } = useStock(ticker);

  return (
    <div className="max-w-3xl w-full mx-auto">
      <Chart>
        <Title>Volume Traded</Title>
        <Legend />
        <XAxis categories={dates} accessibility={{ description: "Dates" }} />
        <YAxis title={{ text: "Volume" }} min={0} />

        <Series
          type="column"
          color="#FF00FF"
          data={volumes}
          name={ticker}
        />
      </Chart>
    </div>
  );
}

export default ColumnChart;
