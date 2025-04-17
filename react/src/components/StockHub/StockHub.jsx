import React, { useState } from "react";
import StockList from "./StockList";
import IntervalTabs from "./IntervalTabs";
import ChartPanel from "./ChartPanel";
import DiscoverSection from "./DiscoverSection";
import NewsFeed from "./NewsFeed";

export default function StockHub() {
  const [yourStocks, setYourStocks] = useState(["AAPL", "GOOGL"]);
  const [chartInfo, setChartInfo] = useState({ labels: [], values: [] });
  const [unitLabel, setUnitLabel] = useState("");

  const handleView = (symbol) => {
    setChartInfo({
      labels: ["Jan", "Feb", "Mar", "Apr"],
      values: [10, 20, 15, 30],
    });
    setUnitLabel("Months");
  };

  const handleInterval = (data, unit) => {
    const labels = data.map((_, i) => `${i + 1}`);
    setChartInfo({ labels, values: data });
    setUnitLabel(["Min", "Hours", "Days", "Weeks"][unit - 1] || "");
  };

  const handleRemove = (symbol) => {
    setYourStocks((prev) => prev.filter((s) => s !== symbol));
  };

  const handleInvest = (symbol) => alert(`Invest in ${symbol}`);
  const handleAbout = (symbol) => alert(`Info about ${symbol}`);

  return (
    <main style={{ padding: "0 1rem" }}>
      <h1>StockHub</h1>
      <StockList
        stocks={yourStocks}
        onView={handleView}
        onRemove={handleRemove}
        onInvest={handleInvest}
      />
      <IntervalTabs onSelect={handleInterval} />
      <ChartPanel data={chartInfo} unitLabel={unitLabel} />
      <DiscoverSection
        onAbout={handleAbout}
        onView={handleView}
        onInvest={handleInvest}
      />
      <NewsFeed />
    </main>
  );
}
