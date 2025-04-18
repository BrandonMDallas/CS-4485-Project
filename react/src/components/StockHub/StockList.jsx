import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import styles from "./StockList.module.css";
export default function StockList({ stocks, onView, onRemove, onInvest }) {
  const [showEdit, setShowEdit] = useState(false);
  return (
    <section className={styles.section}>
      <h2>Your Stocks</h2>
      <Button onClick={() => setShowEdit(true)}>Edit List</Button>
      <Modal show={showEdit} onHide={() => setShowEdit(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit your stocks</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {stocks.map((sym, i) => (
            <div key={i} className={styles.item}>
              <span>{sym}</span>
              <Button variant="danger" size="sm" onClick={() => onRemove(sym)}>
                Remove
              </Button>
            </div>
          ))}
        </Modal.Body>
      </Modal>
      <div className={styles.list}>
        {stocks.map((sym, i) => (
          <div key={i} className={styles.card}>
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
