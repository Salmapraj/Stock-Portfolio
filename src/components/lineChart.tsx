import { useStock, type Ticker } from "@/hooks/useStock";
import { Chart, Series, Title, XAxis, YAxis, Legend } from "@highcharts/react";


function LineChart({ ticker }: { ticker: Ticker }) {
  const {dates,prices}= useStock(ticker);

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
      />
    </Chart>
    </div>
  );
}

export default LineChart;
