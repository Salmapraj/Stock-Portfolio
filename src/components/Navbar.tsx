import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-black/80 border-b w-full">
      <div className="py-2 px-8 h-14 flex items-center justify-between text-gray-200">
        <Link to="/">
          <h1 className="text-xl font-bold">Stock Portfolio</h1>
        </Link>

        <div className="text-lg flex items-center gap-8">
          <Link to="/portfolio">
            <p className="hover:underline cursor-pointer">Portfolio</p>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
