import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import styles from "./NewsFeed.module.css";
import axios from "axios";

export default function NewsFeed() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=AAPL&apikey=demo"
      )
      .then(({ data }) => {
        setArticles(data.feed.slice(0, 6));
      })
      .catch(console.error);
  }, []);

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Latest News</h2>
      <div className={styles.grid}>
        {articles.map((a, i) => (
          <Card key={i} className={styles.cardWrapper}>
            <Card.Img
              variant="top"
              src={a.banner_image}
              alt=""
              className={styles.image}
            />
            <Card.Body className={styles.body}>
              <Card.Title className={styles.title}>{a.title}</Card.Title>
              <Card.Text className={styles.summary}>{a.summary}</Card.Text>
              <Button className={styles.moreButton}>Read More</Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </section>
  );
}
