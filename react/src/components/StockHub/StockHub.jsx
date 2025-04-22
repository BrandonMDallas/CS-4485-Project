// src/components/StockHub.jsx
import React, { useState } from "react";
import StockList from "./StockList";
import IntervalTabs from "./IntervalTabs";
import ChartPanel from "./ChartPanel";
import NewsFeed from "./NewsFeed";
import useAxiosPrivate from "../../api/useAxiosPrivate";

const STOCK_DATA_URL = "/api/alphavantage/stock-data";

export default function StockHub() {
  const axiosPrivate = useAxiosPrivate();
  const [yourStocks, setYourStocks] = useState(["AAPL", "GOOGL"]);
  const [labels, setLabels] = useState([]);
  const [values, setValues] = useState([]);

  // fetch chart data
  const handleView = async (symbol) => {
    /*…*/
  };

  // add a new symbol if it isn’t already in the list
  const handleAdd = (symbol) => {
    if (!symbol) return;
    setYourStocks((prev) =>
      prev.includes(symbol.toUpperCase())
        ? prev
        : [...prev, symbol.toUpperCase()]
    );
  };

  const handleInterval = (unit) => {
    console.log(unit);
    /*…*/
  };
  const handleRemove = (symbol) => {
    console.log(symbol);
    /*…*/
  };
  const handleInvest = (symbol) => alert(`Invest in ${symbol}`);
  const handleAbout = (symbol) => alert(`Info about ${symbol}`);

  return (
    <main style={{ padding: "1rem" }}>
      <h1>StockHub</h1>

      <StockList
        stocks={yourStocks}
        onView={handleView}
        onRemove={handleRemove}
        onInvest={handleInvest}
        onAdd={handleAdd}
      />

      <IntervalTabs onSelect={handleInterval} />
      <ChartPanel labels={labels} values={values} />

      <NewsFeed />
    </main>
  );
}
