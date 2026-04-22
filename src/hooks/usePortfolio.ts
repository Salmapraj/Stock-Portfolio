import { useState, useEffect } from "react";
import portfoliodata from "../data/portfolio.json";
import type { stock } from "../types/stock";

export const usePortfolio = () => {
  const [portfolio, setPortfolio] = useState(() => {
    const saved = localStorage.getItem("portfolio");
    return saved ? JSON.parse(saved) : portfoliodata;
  });

  useEffect(() => {
    localStorage.setItem("portfolio", JSON.stringify(portfolio));
  }, [portfolio]);
  const deleteStock = (id: string) => {
    setPortfolio(portfolio.filter((item: stock) => item.id !== id));
  };
  const addStock = (newStock: stock) => {
    setPortfolio([...portfolio, newStock]);
  };

  const editStock = (newStock: stock, id: string) => {
   setPortfolio( portfolio.map((item: stock) => 
     item.id === id? newStock:item


    ))
  };
  return {
    portfolio,
    editStock,
    deleteStock,
    addStock,
  };
};
