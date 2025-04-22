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
  "FB",
  "NVDA",
];

export default function StockList({
  stocks,
  onView,
  onRemove,
  onInvest,
  onAdd,
}) {
  const axiosPrivate = useAxiosPrivate();

  const [showEdit, setShowEdit] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  // Fetch from API, fallback to popularFallback
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
    } catch (err) {
      console.error("API symbol search failed:", err);
    }

    // fallback
    const fallback = popularFallback.filter((s) =>
      s.includes(query.toUpperCase())
    );
    setResults(fallback);
  }, [query, axiosPrivate]);

  // whenever query changes, refetch
  useEffect(() => {
    fetchMatches();
  }, [query, fetchMatches]);

  // handle Enter key on the input
  const handleKey = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (query.trim()) {
        onAdd(query.trim().toUpperCase());
        setQuery("");
        setResults([]);
      }
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
          {/* unified search/add input */}
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

          {/* existing list */}
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

      <div className={styles.list}>
        {stocks.map((sym) => (
          <div key={sym} className={styles.card}>
            <span className={styles.symbol}>{sym}</span>
            <Button size="sm" onClick={() => onView(sym)}>
              View
            </Button>
            <Button size="sm" onClick={() => onInvest(sym)}>
              Invest
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}
