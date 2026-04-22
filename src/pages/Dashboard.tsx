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
import type { Ticker } from "@/hooks/useStock";
import { useState } from "react";
import ColumnChart from "@/components/columnChart";

function Dashboard() {
  const [ticker, setTicker] = useState<Ticker>(
    portfolioData[0].ticker as Ticker,
  );
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <div className="flex items-center justify-center my-4">
        <Select
          onValueChange={(value) => setTicker(value as Ticker)}
          defaultValue={ticker}
        >
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
      </div>
      <div className="flex flex-col gap-4 lg:flex-row p-4 ">
        <LineChart ticker={ticker} />
        <ColumnChart ticker={ticker} />
      </div>
    </div>
  );
}

export default Dashboard;
