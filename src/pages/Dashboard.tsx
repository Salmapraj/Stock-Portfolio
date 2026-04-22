import Navbar from "../components/Navbar";
import LineChart from "../components/lineChart";
import stocksData from "../data/stock.json";

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
  const tickers = Object.keys(stocksData) as Ticker[];
  const [ticker, setTicker] = useState<Ticker>(tickers[0]);
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
              {tickers.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
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
