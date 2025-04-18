import React from "react";
import { Link } from "react-router";
const MainTab = () => {
  return (
    <>
      <h2 style={{ textAlign: "center", fontFamily: "sans-serif" }}>
        What would you like to do today?
      </h2>
      <div style={{ display: "inline-flex" }}>
        <div className="card" style={{ width: "18rem" }}>
          <img
            src="https://w0.peakpx.com/wallpaper/286/926/HD-wallpaper-lebron-james-los-angeles-lakers-nba-famous-basketball-players-american-basketball-player-art-purple-stone-background-usa-basketball.jpg"
            height="45%"
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">Sports</h5>
            <p className="card-text">
              Catch up with the latest news in sports, players, and teams!
            </p>
            <Link to="/sportsHub" className="btn btn-primary">
              Visit
            </Link>
          </div>
        </div>
        <div className="card" style={{ width: "18rem" }}>
          <img
            src="https://storage.googleapis.com/research-production/1/2024/06/RS064-Socially-Motivated-Music-Recommendation_1_Without-Logo.png"
            height="45%"
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">Music</h5>
            <p className="card-text">
              Listen to the latest and most popular songs currently out there!
            </p>
            <Link to="/musicHub" className="btn btn-primary">
              Visit
            </Link>
          </div>
        </div>
        <div className="card" style={{ width: "18rem" }}>
          <img
            src="https://www.analyticssteps.com/backend/media/thumbnail/8517708/4201790_1646043215_What%20are%20StocksArtboard%201%20(1).jpg"
            height="45%"
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">Stocks</h5>
            <p className="card-text">
              View and keep track of stock data from various companies!
            </p>
            <Link to="/stocks" className="btn btn-primary">
              Visit
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainTab;
