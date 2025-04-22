// src/components/DiscoverSection.jsx
import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import useAxiosPrivate from "../../api/useAxiosPrivate";
import styles from "./DiscoverSection.module.css";

export default function DiscoverSection({
  onAbout,
  onView,
  onInvest,
  onAdd, // ← new
}) {
  const axiosPrivate = useAxiosPrivate();
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  // whenever query changes, hit your backend’s symbol-search endpoint
  useEffect(() => {
    const fetchMatches = async () => {
      if (!query) {
        setResults([]);
        return;
      }
      try {
        const resp = await axiosPrivate.get("/api/alphavantage/symbol-search", {
          params: { keywords: query },
        });
        // Alpha Vantage returns bestMatches array
        const syms = resp.data.bestMatches.map((m) => m["1. symbol"]);
        setResults(syms);
      } catch (err) {
        console.error(err);
        setResults([]);
      }
    };
    fetchMatches();
  }, [query, axiosPrivate]);

  return (
    <section className={styles.section}>
      <h2>View More Stocks</h2>
      <Button onClick={() => setShowSearch(true)}>Search</Button>
      <Modal show={showSearch} onHide={() => setShowSearch(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Search Stocks</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="form-control mb-3"
            placeholder="Type ticker or company name"
          />

          <ul className={styles.results}>
            {results.map((sym) => (
              <li key={sym}>
                <span>{sym}</span>
                <Button
                  size="sm"
                  onClick={() => {
                    onAdd(sym); // ← add to your list
                    setShowSearch(false);
                  }}
                >
                  Add
                </Button>
              </li>
            ))}
          </ul>
        </Modal.Body>
      </Modal>

      {/* you can still show the “popular” grid if you like */}
    </section>
  );
}
