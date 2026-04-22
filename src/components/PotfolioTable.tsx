import { SquarePen, Trash } from "lucide-react";
import type { Ticker } from "@/hooks/useStock";
import stocksData from "../data/stock.json";
import type { stock } from "../types/stock";
import { useState } from "react";
import PortolioForm from "./PortolioForm";
import { usePortfolio } from "@/hooks/usePortfolio";

function PotfolioTable() {
  const { deleteStock, addStock, editStock,portfolio } = usePortfolio();

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
    {editing? editStock(newData,editing.id):    addStock(newData);
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

  
  return (
    <div>
      <h1>My Stocks</h1>

      <PortolioForm
        open={open}
        setOpen={setOpen}
        handleSubmit={handleSubmit}
        editing={editing}
        setFormData={setFormData}
setEditing={setEditing}     
   formData={formData}
      />
      <table className="min-w-full border-collapse border border-gray-400">
        <thead>
          <tr className="bg-gray-100 ">
            <th>Ticker</th>
            <th>Company Name</th>
            <th>Qty</th>
            <th>Purchase Rate</th>
            <th>Current Price</th>
            <th>Purchased Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {portfolio.map((stock: stock) => (
            <tr key={stock.id}>
              <td>{stock.ticker}</td>
              <td>{stock.name}</td>
              <td>{stock.quantity}</td>
              <td>{stock.purchasePrice}</td>
              <td>
                {stocksData[stock.ticker as Ticker]?.currentPrice ?? "N/A"}
              </td>
              <td>
                {new Date(stock.datePurchased).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </td>
              <td className="flex gap-2">
                <SquarePen onClick={() =>{
                  setEditing(stock)
                  setOpen(true)
                  setFormData(stock)
                }} size={14} />
                <Trash
                  onClick={() => deleteStock(stock.id)}
                  size={14}
                  className="text-red-500"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PotfolioTable;
