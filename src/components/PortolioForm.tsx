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
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "./ui/input";
import type { stock } from "../types/stock";

interface PortfolioProp {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  formData: stock;
  setFormData: React.Dispatch<React.SetStateAction<stock>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  editing: stock | null;
  setEditing: React.Dispatch<React.SetStateAction<stock | null>>;
}

function PortolioForm({
  open,
  setOpen,
  formData,
  setFormData,
  handleSubmit,
  editing,
  setEditing,
}: PortfolioProp) {
  const handleAddClick = () => {
    setEditing(null);
    setFormData({
      id: "",
      ticker: "",
      name: "",
      quantity: 0,
      purchasePrice: 0.0,
      datePurchased: "",
    });
    setOpen(true);
  };
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="default" onClick={handleAddClick}>
            Add Stock
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle> {editing ? "Edit Stock" : "Add Stock"}</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit}>
            <FieldGroup className="grid grid-cols-2">
              <Field>
                <FieldLabel>Ticker Symbol</FieldLabel>
                <Input
                  placeholder="AAPL"
                  value={formData.ticker}
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
                  value={formData.name}
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
                  type="number"
                  value={formData.quantity}
                  placeholder="200"
                  required
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      quantity: Number(e.target.value),
                    })
                  }
                />
              </Field>
              <Field>
                <FieldLabel> Purchase Price</FieldLabel>
                <Input
                  type="number"
                  placeholder="150.00"
                  value={formData.purchasePrice}
                  required
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      purchasePrice: Number(e.target.value),
                    })
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
                  value={formData.datePurchased}
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

              <Button type="submit">
                {editing ? "Update Stock" : "Add Stock"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default PortolioForm;
