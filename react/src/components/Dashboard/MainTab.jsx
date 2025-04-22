import React from "react";
import { Link } from "react-router";
import styles from "./Dashboard.module.css";
export default function MainTab() {
  return (
    <>
      <h2 className={styles.hero}>Dashboard</h2>

      <div className={styles.cardRow}>
        <div className={`card ${styles.mainCard}`}>
          <img
            src="https://w0.peakpx.com/wallpaper/286/926/HD-wallpaper-lebron-james-los-angeles-lakers-nba-famous-basketball-players-american-basketball-player-art-purple-stone-background-usa-basketball.jpg"
            height="45%"
            className="card-img-top"
            alt="Sports"
          />
          <div className="card-body">
            <h5 className="card-title text-center">Sports</h5>
            <p className="card-text text-center">
              Catch up with the latest news in sports, players, and teams!
            </p>
            <Link to="/sportsHub" className="btn btn-primary d-block mx-auto">
              Visit
            </Link>
          </div>
        </div>

        <div className={`card ${styles.mainCard}`}>
          <img
            src="https://storage.googleapis.com/research-production/1/2024/06/RS064-Socially-Motivated-Music-Recommendation_1_Without-Logo.png"
            height="45%"
            className="card-img-top"
            alt="Music"
          />
          <div className="card-body">
            <h5 className="card-title text-center">Music</h5>
            <p className="card-text text-center">
              Listen to the latest and most popular songs currently out there!
            </p>
            <Link to="/musicHub" className="btn btn-primary d-block mx-auto">
              Visit
            </Link>
          </div>
        </div>

        <div className={`card ${styles.mainCard}`}>
          <img
            src="https://www.analyticssteps.com/backend/media/thumbnail/8517708/4201790_1646043215_What%20are%20StocksArtboard%201%20(1).jpg"
            height="45%"
            className="card-img-top"
            alt="Stocks"
          />
          <div className="card-body">
            <h5 className="card-title text-center">Stocks</h5>
            <p className="card-text text-center">
              View and keep track of stock data from various companies!
            </p>
            <Link to="/stockhub" className="btn btn-primary d-block mx-auto">
              Visit
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
