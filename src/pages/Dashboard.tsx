import Navbar from "../components/Navbar";
import LineChart from "../components/lineChart";
import portfolioData from "../data/portfolio.json";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type {Ticker} from "@/components/lineChart";
import { useState } from "react";
import ColumnChart from "@/components/columnChart";

function Dashboard() {
  const [ticker, setTicker] = useState<Ticker>(portfolioData[0].ticker as Ticker);
  return (
    <div>
      <Navbar />

      <Select onValueChange={(value) => setTicker(value as Ticker)} defaultValue={ticker}>
        <SelectTrigger className="w-full max-w-48">
          <SelectValue placeholder="Select ticker" />{" "}
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectLabel>Tickers</SelectLabel>
            {portfolioData.map((item) => (
              <SelectItem key={item.ticker} value={item.ticker}>
                {item.ticker}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <LineChart ticker={ticker} />
      <ColumnChart ticker={ticker} />
    </div>
  );
}

export default Dashboard;
