import { SquarePen, Trash } from "lucide-react";
import portfoliodata from "../data/portfolio.json";
import { Button } from "./ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { Ticker } from "@/hooks/useStock";
import stocksData from "../data/stock.json";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
function PotfolioTable() {
  const [addModal, SetAddModal] = useState(false);

  const [formData, setFormData] = useState({
    ticker: "",
    name: "",
    quantity: "",
    purchasePrice: "",
    datePurchased: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newData = {
      ticker: formData.ticker,
      name: formData.name,
      quantity: Number(formData.quantity),
      purchasedPrice: Number(formData.purchasePrice),
      datePurchased: formData.datePurchased,
    };
    console.log("Form Data:", newData);
  };
  return (
    <div>
      <h1>My Stocks</h1>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default" onClick={() => SetAddModal(true)}>
            Add Product
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Add New Stock</DialogTitle>
            <DialogDescription>
              Fill in the details for the new stock you want to add.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit}>
            <FieldGroup className="grid grid-cols-2">
              <Field>
                <FieldLabel>Ticker Symbol</FieldLabel>
                <Input
                  placeholder="AAPL"
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, ticker: e.target.value })
                  }
                />
              </Field>
              <Field>
                <FieldLabel> Company Name</FieldLabel>
                <Input
                  placeholder="Apple Inc"
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </Field>
            </FieldGroup>

            <FieldGroup className="grid grid-cols-2">
              <Field>
                <FieldLabel>Quantity</FieldLabel>
                <Input
                  placeholder="200"
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, quantity: e.target.value })
                  }
                />
              </Field>
              <Field>
                <FieldLabel> Purchase Price</FieldLabel>
                <Input
                  placeholder="150.00"
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, purchasePrice: e.target.value })
                  }
                />
              </Field>
            </FieldGroup>

            <FieldGroup>
              <Field>
                <FieldLabel> Purchased date</FieldLabel>
                <Input
                  type="date"
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, datePurchased: e.target.value })
                  }
                />
              </Field>
            </FieldGroup>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>

              <Button type="submit">Add Stock</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <table className="min-w-full border-collapse border border-gray-400">
        <thead>
          <tr className="bg-gray-100 ">
            <th>Ticker</th>
            <th>Company Name</th>
            <th>Qty</th>
            <th>Purchase Rate</th>

            <th>Current Price</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {portfoliodata.map((stock) => (
            <tr key={stock.id}>
              <td>{stock.ticker}</td>
              <td>{stock.name}</td>
              <td>{stock.quantity}</td>
              <td>{stock.purchasePrice}</td>
              <td>{stocksData[stock.ticker as Ticker].currentPrice}</td>
              <td>
                {new Date(stock.datePurchased).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </td>
              <td className="flex gap-2">
                <SquarePen size={14} />
                <Trash size={14} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PotfolioTable;
