import React, { useState } from "react";
import StockList from "./StockList";
import IntervalTabs from "./IntervalTabs";
import ChartPanel from "./ChartPanel";
import NewsFeed from "./NewsFeed";
import useAxiosPrivate from "../../api/useAxiosPrivate";

import styles from "./StockHub.module.css";

const STOCK_DATA_URL = "/api/alphavantage/stock-data";

export default function StockHub() {
  const axiosPrivate = useAxiosPrivate();
  const [yourStocks, setYourStocks] = useState(["AAPL", "GOOGL"]);
  const [labels, setLabels] = useState([]);
  const [values, setValues] = useState([]);

  // fetch chart data
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
    setYourStocks((prev) => prev.filter((s) => s !== symbol));
    /*…*/
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.header}>StocksHub</h1>

      <div className={styles.hub}>
        <div className={styles.stockListWrapper}>
          <StockList
            stocks={yourStocks}
            onView={handleView}
            onRemove={handleRemove}
            onAdd={handleAdd}
          />
        </div>

        <div className={styles.chartWrapper}>
          <ChartPanel labels={labels} values={values} />
        </div>

        <div className={styles.tabsWrapper}>
          <IntervalTabs onSelect={handleInterval} />
        </div>

        <div className={styles.newsWrapper}>
          <NewsFeed />
        </div>
      </div>
    </main>
  );
}
