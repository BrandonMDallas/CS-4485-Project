// src/components/StockList.jsx
import React, { useState, useEffect, useCallback } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import useAxiosPrivate from "../../api/useAxiosPrivate";
import styles from "./StockList.module.css";

const popularFallback = [
  "AAPL",
  "GOOGL",
  "MSFT",
  "AMZN",
  "TSLA",
  "NFLX",
  "META",
  "NVDA",
];

export default function StockList({ stocks, onView, onRemove, onAdd }) {
  const axiosPrivate = useAxiosPrivate();

  const [showEdit, setShowEdit] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  // Fetch matches (API → fallback)
  const fetchMatches = useCallback(async () => {
    if (!query) {
      setResults([]);
      return;
    }
    try {
      const resp = await axiosPrivate.get("/api/alphavantage/symbol-search", {
        params: { keywords: query },
      });
      const syms = resp.data.bestMatches.map((m) => m["1. symbol"]);
      if (syms.length) {
        setResults(syms);
        return;
      }
    } catch {
      // ignore errors and fallback
    }
    setResults(popularFallback.filter((s) => s.includes(query.toUpperCase())));
  }, [query, axiosPrivate]);

  useEffect(() => {
    fetchMatches();
  }, [query, fetchMatches]);

  // add on Enter
  const handleKey = (e) => {
    if (e.key === "Enter" && query.trim()) {
      onAdd(query.trim().toUpperCase());
      setQuery("");
      setResults([]);
    }
  };

  return (
    <section className={styles.section}>
      <h2>Your Stocks</h2>
      <Button onClick={() => setShowEdit(true)}>Edit List</Button>

      <Modal show={showEdit} onHide={() => setShowEdit(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit your stocks</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* unified search + add */}
          <Form.Group className={styles.searchSection}>
            <Form.Control
              type="text"
              placeholder="Search ticker or type new…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKey}
            />
            <Button
              variant="primary"
              size="sm"
              className={styles.addBtn}
              onClick={() => {
                if (query.trim()) {
                  onAdd(query.trim().toUpperCase());
                  setQuery("");
                  setResults([]);
                }
              }}
            >
              Add
            </Button>
          </Form.Group>

          <ul className={styles.searchResults}>
            {results.map((sym) => (
              <li key={sym} className={styles.resultItem}>
                <span>{sym}</span>
                <Button
                  size="sm"
                  onClick={() => {
                    onAdd(sym);
                    setQuery("");
                    setResults([]);
                  }}
                >
                  Add
                </Button>
              </li>
            ))}
          </ul>

          <hr />

          {/* existing list with Remove */}
          {stocks.map((sym) => (
            <div key={sym} className={styles.item}>
              <span>{sym}</span>
              <Button variant="danger" size="sm" onClick={() => onRemove(sym)}>
                Remove
              </Button>
            </div>
          ))}
        </Modal.Body>
      </Modal>

      {/* main stock cards with inline logo */}
      <div className={styles.list}>
        {stocks.map((sym) => {
          const lowerUrl = `https://eodhd.com/img/logos/US/${sym.toLowerCase()}.png`;
          const upperUrl = `https://eodhd.com/img/logos/US/${sym.toUpperCase()}.png`;

          return (
            <div key={sym} className={styles.card}>
              <img
                src={lowerUrl}
                alt={`${sym} logo`}
                className={styles.logo}
                onError={(e) => {
                  const img = e.currentTarget;
                  // if we just tried lowercase, switch to uppercase
                  if (img.src.endsWith(`${sym.toLowerCase()}.png`)) {
                    img.src = upperUrl;
                  } else {
                    // already tried uppercase, hide it
                    img.style.display = "none";
                  }
                }}
              />
              <span className={styles.symbol}>{sym}</span>
              <Button size="sm" onClick={() => onView(sym)}>
                View
              </Button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
