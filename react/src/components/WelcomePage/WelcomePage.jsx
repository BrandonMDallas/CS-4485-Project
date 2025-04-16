import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./WelcomePage.module.css";

export default function WelcomePage() {
  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <Container className="text-center">
          <h1 className={styles.title}>Welcome to The Hub</h1>
          <p className={styles.subtitle}>
            Build your own dashboard with Sports, Music, Stocks & more.
          </p>
          <div className={styles.ctaGroup}>
            <Link to="/register">
              <Button size="lg" className={styles.primaryBtn}>
                Get Started
              </Button>
            </Link>
            <Link to="/login">
              <Button
                size="lg"
                variant="outline-primary"
                className={styles.secondaryBtn}
              >
                Sign In
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <Container>
          <h2 className="text-center mb-5">Why The Hub?</h2>
          <Row>
            {[
              {
                icon: "⚽️",
                title: "Sports Widgets",
                desc: "Live scores, schedules, and highlights.",
              },
              {
                icon: "🎵",
                title: "Music Widgets",
                desc: "Top charts, playlists, and recommendations.",
              },
              {
                icon: "💹",
                title: "Stocks Widgets",
                desc: "Real‑time quotes, charts, and news.",
              },
            ].map((feat, i) => (
              <Col md={4} key={i} className="mb-4">
                <Card className={styles.featureCard}>
                  <Card.Body className="text-center">
                    <div className={styles.icon}>{feat.icon}</div>
                    <Card.Title>{feat.title}</Card.Title>
                    <Card.Text>{feat.desc}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* How It Works */}
      <section className={styles.howItWorks}>
        <Container>
          <h2 className="text-center mb-5">How It Works</h2>
          <Row>
            {[
              "Choose your widgets",
              "Arrange your dashboard",
              "Enjoy real‑time updates",
            ].map((step, i) => (
              <Col md={4} key={i} className="text-center mb-4">
                <div className={styles.stepNumber}>{i + 1}</div>
                <p className={styles.stepDesc}>{step}</p>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Footer CTA */}
      <section className={styles.footerCta}>
        <Container className="text-center">
          <h2>Ready to build your hub?</h2>
          <Link to="/register">
            <Button size="lg" className={styles.primaryBtn}>
              Get Started Free
            </Button>
          </Link>
        </Container>
      </section>
    </div>
  );
}
