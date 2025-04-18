import React, { useState } from "react";
import StockList from "./StockList";
import IntervalTabs from "./IntervalTabs";
import ChartPanel from "./ChartPanel";
import DiscoverSection from "./DiscoverSection";
import NewsFeed from "./NewsFeed";
import useAxiosPrivate from "../../api/useAxiosPrivate";

const STOCK_DATA_URL = "/api/alphavantage/stock-data";

export default function StockHub() {
  const axiosPrivate = useAxiosPrivate();
  const [yourStocks, setYourStocks] = useState(["AAPL", "GOOGL"]);
  const [labels, setLabels] = useState([]);
  const [values, setValues] = useState([]);

  // Fetch and update chart for a symbol
  const handleView = async (symbol) => {
    try {
      const resp = await axiosPrivate.get(STOCK_DATA_URL, {
        params: { symbol },
      });
      console.log(resp.data);
      const series = resp.data["Time Series (Daily)"] || {};
      const dates = Object.keys(series).slice(0, 30).reverse();
      const prices = dates.map((date) => parseFloat(series[date]["4. close"]));
      setLabels(dates);
      setValues(prices);
    } catch (err) {
      console.error("Error fetching stock data:", err);
    }
  };

  const handleInterval = (unit) => {
    console.log("Interval selected:", unit);
  };

  const handleRemove = (symbol) => {
    setYourStocks((prev) => prev.filter((s) => s !== symbol));
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
      />
      <IntervalTabs onSelect={handleInterval} />
      <ChartPanel labels={labels} values={values} />
      <DiscoverSection
        onAbout={handleAbout}
        onView={handleView}
        onInvest={handleInvest}
      />
      <NewsFeed />
    </main>
  );
}
