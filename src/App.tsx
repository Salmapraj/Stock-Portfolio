import { Routes, BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Portfolio from "./pages/Portfolio";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/portfolio" element={<Portfolio />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
