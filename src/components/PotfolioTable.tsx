import { SquarePen, Trash } from "lucide-react";
import type { Ticker } from "@/hooks/useStock";
import stocksData from "../data/stock.json";
import type { stock } from "../types/stock";
import { useState } from "react";
import PortolioForm from "./PortolioForm";
import { usePortfolio } from "@/hooks/usePortfolio";
import { Input } from "@/components/ui/input";
function PotfolioTable() {
  const { deleteStock, addStock, editStock, portfolio } = usePortfolio();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<stock | null>(null);

  const [formData, setFormData] = useState({
    id: "",
    ticker: "",
    name: "",
    quantity: 0,
    purchasePrice: 0.0,
    datePurchased: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newData = {
      ...formData,
      id: editing ? editing.id : Date.now().toString(),
    };
    {
      editing ? editStock(newData, editing.id) : addStock(newData);
    }
    setFormData({
      id: "",
      ticker: "",
      name: "",
      quantity: 0,
      purchasePrice: 0.0,
      datePurchased: "",
    });
    setOpen(false);
  };
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const filteredPortfolio = portfolio.filter((stock: stock) => {
    // const currentPrice = stocksData[stock.ticker as Ticker]?.currentPrice ?? 0;
    return (
      (stock.name.toLowerCase().includes(search.toLowerCase()) ||
        stock.ticker.toLowerCase().includes(search.toLowerCase())) &&
      (minPrice === "" || stock.purchasePrice >= Number(minPrice)) &&
      (maxPrice === "" || stock.purchasePrice <= Number(maxPrice))
    );
  });
  return (
    <div className="p-4">
      <h1 className="text-2xl text-center font-semibold">My Stocks</h1>

      <Input
        className="w-66 mb-3 text-gray-600"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="search for Company stock..."
      />

      <div className="flex gap-3 mb-3">
        <Input
          placeholder="Min Price"
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="w-40"
        />

        <Input
          placeholder="Max Price"
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="w-40"
        />
      </div>

      <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden shadow-sm bg-white">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">
              Ticker
            </th>
            <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">
              Company Name
            </th>
            <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">
              Qty
            </th>
            <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">
              Purchase Rate
            </th>
            <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">
              Current Price
            </th>
            <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">
              Purchased Date
            </th>
            <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
          {filteredPortfolio.map((stock: stock) => (
            <tr
              key={stock.id}
              className="hover:bg-gray-50 transition-colors duration-150"
            >
              <td className="px-4 py-3 font-medium text-gray-900">
                {stock.ticker}
              </td>
              <td className="px-4 py-3">{stock.name}</td>
              <td className="px-4 py-3">{stock.quantity}</td>
              <td className="px-4 py-3">${stock.purchasePrice}</td>
              <td className="px-4 py-3">
                {stocksData[stock.ticker as Ticker]?.currentPrice ?? "N/A"}
              </td>
              <td className="px-4 py-3">
                {new Date(stock.datePurchased).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </td>
              <td className="px-4 py-3 flex gap-3 items-center">
                <SquarePen
                  className="cursor-pointer text-blue-500 font-semibold hover:text-blue-600 transition"
                  onClick={() => {
                    setEditing(stock);
                    setOpen(true);
                    setFormData(stock);
                  }}
                  size={16}
                />
                <Trash
                  onClick={() => deleteStock(stock.id)}
                  size={16}
                  className="cursor-pointer font-semibold text-red-500 hover:text-red-700 transition"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <PortolioForm
        open={open}
        setOpen={setOpen}
        handleSubmit={handleSubmit}
        editing={editing}
        setFormData={setFormData}
        setEditing={setEditing}
        formData={formData}
      />
    </div>
  );
}

export default PotfolioTable;
