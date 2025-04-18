import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import styles from "./DiscoverSection.module.css";

const popular = ["AAPL", "GOOGL", "MSFT", "AMZN"];
export default function DiscoverSection({ onAbout, onView, onInvest }) {
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  function search() {
    setResults(popular.filter((s) => s.includes(query.toUpperCase())));
  }

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
            onChange={(e) => {
              setQuery(e.target.value);
              search();
            }}
            className="form-control"
            placeholder="Symbol"
          />
          <ul className={styles.results}>
            {results.map((r) => (
              <li key={r} onClick={() => alert(`Clicked ${r}`)}>
                {r}
              </li>
            ))}
          </ul>
        </Modal.Body>
      </Modal>
      <div className={styles.grid}>
        {popular.map((sym) => (
          <div key={sym} className={styles.card}>
            <h5>{sym}</h5>
            <p>Popular stock</p>
            <Button size="sm" onClick={() => onAbout(sym)}>
              About
            </Button>
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
