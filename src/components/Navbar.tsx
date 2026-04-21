import { Button } from "@/components/ui/button";

function Navbar() {
  return (
    <nav className="bg-black/80 border-b">
      <div className="py-2 px-8 h-14 flex items-center justify-between text-gray-200">
        <h1 className="text-xl font-bold">Stock Portfolio</h1>

        <div className="text-lg flex items-center gap-8">
          <p className="hover:underline cursor-pointer">Portfolio</p>
          <Button variant="secondary">Add Product</Button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
