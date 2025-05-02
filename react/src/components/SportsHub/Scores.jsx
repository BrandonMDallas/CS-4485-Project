import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import GameStatsModal from './GameDataModal.jsx';

const Scores = ({ team }) => {
  const [gamesData, setGamesData] = useState({ 
    nba: { completed: [], upcoming: [] },
    mlb: { completed: [], upcoming: [] }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('completed');
  const [activeLeague, setActiveLeague] = useState('nba');
  const [selectedGame, setSelectedGame] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [gameStatsLoading, setGameStatsLoading] = useState(false);

  const nbaApiKey = "9d614e028aa048f7a442b0ba0d09cc58";
  const mlbApiKey = "7c2d7dcfa0f74cc8b29d93dfa5b37ea8"; // Example MLB API key
  
  // Separate mappings for NBA and MLB to prevent conflicts
  const nbaTeamNameToCode = {
    "Atlanta Hawks": "ATL",
    "Boston Celtics": "BOS",
    "Brooklyn Nets": "BKN",
    "Charlotte Hornets": "CHA",
    "Chicago Bulls": "CHI",
    "Cleveland Cavaliers": "CLE",
    "Dallas Mavericks": "DAL",
    "Denver Nuggets": "DEN",
    "Detroit Pistons": "DET",
    "Golden State Warriors": "GS",
    "Houston Rockets": "HOU",
    "Indiana Pacers": "IND",
    "LA Clippers": "LAC",
    "Los Angeles Lakers": "LAL",
    "Memphis Grizzlies": "MEM",
    "Miami Heat": "MIA",
    "Milwaukee Bucks": "MIL",
    "Minnesota Timberwolves": "MIN", // Correct NBA team
    "New Orleans Pelicans": "NOP",
    "New York Knicks": "NYK",
    "Oklahoma City Thunder": "OKC",
    "Orlando Magic": "ORL",
    "Philadelphia 76ers": "PHI",
    "Phoenix Suns": "PHX",
    "Portland Trail Blazers": "POR",
    "Sacramento Kings": "SAC",
    "San Antonio Spurs": "SAS",
    "Toronto Raptors": "TOR",
    "Utah Jazz": "UTA",
    "Washington Wizards": "WAS"
  };
  
  const mlbTeamNameToCode = {
    "Arizona Diamondbacks": "ARI",
    "Atlanta Braves": "ATL",
    "Baltimore Orioles": "BAL",
    "Boston Red Sox": "BOS",
    "Chicago Cubs": "CHC",
    "Chicago White Sox": "CWS",
    "Cincinnati Reds": "CIN",
    "Cleveland Guardians": "CLE",
    "Colorado Rockies": "COL",
    "Detroit Tigers": "DET",
    "Houston Astros": "HOU",
    "Kansas City Royals": "KC",
    "Los Angeles Angels": "LAA",
    "Los Angeles Dodgers": "LAD",
    "Miami Marlins": "MIA",
    "Milwaukee Brewers": "MIL",
    "Minnesota Twins": "MIN", // Correct MLB team
    "New York Mets": "NYM",
    "New York Yankees": "NYY",
    "Oakland Athletics": "OAK",
    "Philadelphia Phillies": "PHI",
    "Pittsburgh Pirates": "PIT",
    "San Diego Padres": "SD",
    "San Francisco Giants": "SF",
    "Seattle Mariners": "SEA",
    "St. Louis Cardinals": "STL",
    "Tampa Bay Rays": "TB",
    "Texas Rangers": "TEX",
    "Toronto Blue Jays": "TOR",
    "Washington Nationals": "WSH"
  };
  
  const nbaTeamCodeToName = {
    "ATL": "Atlanta Hawks",
    "BOS": "Boston Celtics",
    "BKN": "Brooklyn Nets",
    "CHA": "Charlotte Hornets",
    "CHI": "Chicago Bulls",
    "CLE": "Cleveland Cavaliers",
    "DAL": "Dallas Mavericks",
    "DEN": "Denver Nuggets",
    "DET": "Detroit Pistons",
    "GS": "Golden State Warriors",
    "HOU": "Houston Rockets",
    "IND": "Indiana Pacers",
    "LAC": "LA Clippers",
    "LAL": "Los Angeles Lakers",
    "MEM": "Memphis Grizzlies",
    "MIA": "Miami Heat",
    "MIL": "Milwaukee Bucks",
    "MIN": "Minnesota Timberwolves", // Correct NBA team
    "NOP": "New Orleans Pelicans",
    "NYK": "New York Knicks",
    "OKC": "Oklahoma City Thunder",
    "ORL": "Orlando Magic",
    "PHI": "Philadelphia 76ers",
    "PHX": "Phoenix Suns",
    "POR": "Portland Trail Blazers",
    "SAC": "Sacramento Kings",
    "SAS": "San Antonio Spurs",
    "TOR": "Toronto Raptors",
    "UTA": "Utah Jazz",
    "WAS": "Washington Wizards"
  };
  
  const mlbTeamCodeToName = {
    "ARI": "Arizona Diamondbacks",
    "ATL": "Atlanta Braves",
    "BAL": "Baltimore Orioles",
    "BOS": "Boston Red Sox",
    "CHC": "Chicago Cubs",
    "CWS": "Chicago White Sox",
    "CIN": "Cincinnati Reds",
    "CLE": "Cleveland Guardians",
    "COL": "Colorado Rockies",
    "DET": "Detroit Tigers",
    "HOU": "Houston Astros",
    "KC": "Kansas City Royals",
    "LAA": "Los Angeles Angels",
    "LAD": "Los Angeles Dodgers",
    "MIA": "Miami Marlins",
    "MIL": "Milwaukee Brewers",
    "MIN": "Minnesota Twins", // Correct MLB team
    "NYM": "New York Mets",
    "NYY": "New York Yankees",
    "OAK": "Oakland Athletics",
    "PHI": "Philadelphia Phillies",
    "PIT": "Pittsburgh Pirates",
    "SD": "San Diego Padres",
    "SF": "San Francisco Giants",
    "SEA": "Seattle Mariners",
    "STL": "St. Louis Cardinals",
    "TB": "Tampa Bay Rays",
    "TEX": "Texas Rangers",
    "TOR": "Toronto Blue Jays",
    "WSH": "Washington Nationals"
  };
  
  useEffect(() => {
    const fetchTeamGames = async () => {
      try {
        setLoading(true);
        
        // For NBA games
        if (team !== "Texas Rangers") {
          const teamCode = nbaTeamNameToCode[team]; // Use NBA specific mapping
          const completedGames = [];
          const upcomingGames = [];
          const today = new Date();

          for (let i = 1; i <= 14; i++) {
            const pastDate = new Date(today);
            pastDate.setDate(today.getDate() - i);
            const formattedDate = pastDate.toISOString().split("T")[0];
            try {
              const res = await fetch(`https://api.sportsdata.io/v3/nba/scores/json/GamesByDate/${formattedDate}?key=${nbaApiKey}`);
              if (res.ok) {
                const data = await res.json();
                const filtered = data.filter(game => (game.HomeTeam === teamCode || game.AwayTeam === teamCode) && game.Status === "Final");
                completedGames.push(...filtered);
                if (completedGames.length >= 5) break;
              }
            } catch (err) { console.error("Past NBA games fetch error:", err); }
          }

          for (let i = 0; i <= 14; i++) {
            const futureDate = new Date(today);
            futureDate.setDate(today.getDate() + i);
            const formattedDate = futureDate.toISOString().split("T")[0];
            try {
              const res = await fetch(`https://api.sportsdata.io/v3/nba/scores/json/GamesByDate/${formattedDate}?key=${nbaApiKey}`);
              if (res.ok) {
                const data = await res.json();
                const filtered = data.filter(game => (game.HomeTeam === teamCode || game.AwayTeam === teamCode) && game.Status !== "Final");
                upcomingGames.push(...filtered);
                if (upcomingGames.length >= 5) break;
              }
            } catch (err) { console.error("Upcoming NBA games fetch error:", err); }
          }

          setGamesData(prevState => ({
            ...prevState,
            nba: {
              completed: completedGames.map(game => ({
                GameID: game.GameID,
                DateTime: game.DateTime,
                HomeTeam: nbaTeamCodeToName[game.HomeTeam] || game.HomeTeam, // Use NBA specific mapping
                AwayTeam: nbaTeamCodeToName[game.AwayTeam] || game.AwayTeam, // Use NBA specific mapping
                HomeScore: game.HomeTeamScore,
                AwayScore: game.AwayTeamScore,
                Status: game.Status,
                Season: game.Season,
                HomeTeamID: game.HomeTeamID,
                AwayTeamID: game.AwayTeamID,
                HomeTeamCode: game.HomeTeam,
                AwayTeamCode: game.AwayTeam
              })),
              upcoming: upcomingGames.map(game => ({
                GameID: game.GameID,
                DateTime: game.DateTime,
                HomeTeam: nbaTeamCodeToName[game.HomeTeam] || game.HomeTeam, // Use NBA specific mapping
                AwayTeam: nbaTeamCodeToName[game.AwayTeam] || game.AwayTeam, // Use NBA specific mapping
                Status: game.Status,
                Season: game.Season,
                HomeTeamID: game.HomeTeamID,
                AwayTeamID: game.AwayTeamID,
                HomeTeamCode: game.HomeTeam,
                AwayTeamCode: game.AwayTeam
              }))
            }
          }));
        }
        
        // For MLB games (always fetch Texas Rangers data)
        const mlbTeamCode = "TEX"; // Texas Rangers
        const mlbCompletedGames = [];
        const mlbUpcomingGames = [];
        const today = new Date();
        
        // Fetch past MLB games
        for (let i = 1; i <= 14; i++) {
          const pastDate = new Date(today);
          pastDate.setDate(today.getDate() - i);
          const formattedDate = pastDate.toISOString().split("T")[0];
          try {
            const res = await fetch(`https://api.sportsdata.io/v3/mlb/scores/json/GamesByDate/${formattedDate}?key=${mlbApiKey}`);
            if (res.ok) {
              const data = await res.json();
              const filtered = data.filter(game => (game.HomeTeam === mlbTeamCode || game.AwayTeam === mlbTeamCode) && game.Status === "Final");
              mlbCompletedGames.push(...filtered);
              if (mlbCompletedGames.length >= 5) break;
            }
          } catch (err) { 
            console.error("Past MLB games fetch error:", err); 
            // Use fallback data if API fails
            if (mlbCompletedGames.length === 0) {
              mlbCompletedGames.push(
                { GameID: 60001, HomeTeam: "TEX", AwayTeam: "HOU", HomeScore: 7, AwayScore: 3, DateTime: "2025-04-28T19:05:00", Status: "Final", InningDescription: "Final" },
                { GameID: 60002, HomeTeam: "SEA", AwayTeam: "TEX", HomeScore: 4, AwayScore: 6, DateTime: "2025-04-26T19:10:00", Status: "Final", InningDescription: "Final" },
                { GameID: 60003, HomeTeam: "TEX", AwayTeam: "NYY", HomeScore: 5, AwayScore: 2, DateTime: "2025-04-24T20:05:00", Status: "Final", InningDescription: "Final" }
              );
              break;
            }
          }
        }

        // Fetch upcoming MLB games
        for (let i = 0; i <= 14; i++) {
          const futureDate = new Date(today);
          futureDate.setDate(today.getDate() + i);
          const formattedDate = futureDate.toISOString().split("T")[0];
          try {
            const res = await fetch(`https://api.sportsdata.io/v3/mlb/scores/json/GamesByDate/${formattedDate}?key=${mlbApiKey}`);
            if (res.ok) {
              const data = await res.json();
              const filtered = data.filter(game => (game.HomeTeam === mlbTeamCode || game.AwayTeam === mlbTeamCode) && game.Status !== "Final");
              mlbUpcomingGames.push(...filtered);
              if (mlbUpcomingGames.length >= 5) break;
            }
          } catch (err) { 
            console.error("Upcoming MLB games fetch error:", err); 
            // Use fallback data if API fails
            if (mlbUpcomingGames.length === 0) {
              mlbUpcomingGames.push(
                { GameID: 60004, HomeTeam: "TEX", AwayTeam: "OAK", DateTime: "2025-05-01T20:05:00", Status: "Scheduled", InningDescription: "" },
                { GameID: 60005, HomeTeam: "TEX", AwayTeam: "OAK", DateTime: "2025-05-02T20:05:00", Status: "Scheduled", InningDescription: "" },
                { GameID: 60006, HomeTeam: "LAA", AwayTeam: "TEX", DateTime: "2025-05-04T16:07:00", Status: "Scheduled", InningDescription: "" }
              );
              break;
            }
          }
        }
        
        setGamesData(prevState => ({
          ...prevState,
          mlb: {
            completed: mlbCompletedGames.map(game => ({
              GameID: game.GameID,
              DateTime: game.DateTime,
              HomeTeam: mlbTeamCodeToName[game.HomeTeam] || game.HomeTeam, // Use MLB specific mapping
              AwayTeam: mlbTeamCodeToName[game.AwayTeam] || game.AwayTeam, // Use MLB specific mapping
              HomeScore: game.HomeScore || 0,
              AwayScore: game.AwayScore || 0,
              Status: game.Status,
              Season: game.Season,
              InningDescription: game.InningDescription || "Final",
              HomeTeamCode: game.HomeTeam,
              AwayTeamCode: game.AwayTeam
            })),
            upcoming: mlbUpcomingGames.map(game => ({
              GameID: game.GameID,
              DateTime: game.DateTime,
              HomeTeam: mlbTeamCodeToName[game.HomeTeam] || game.HomeTeam, // Use MLB specific mapping
              AwayTeam: mlbTeamCodeToName[game.AwayTeam] || game.AwayTeam, // Use MLB specific mapping
              Status: game.Status,
              Season: game.Season,
              InningDescription: game.InningDescription || "",
              HomeTeamCode: game.HomeTeam,
              AwayTeamCode: game.AwayTeam
            }))
          }
        }));

        setLoading(false);
      } catch (err) {
        console.error("Error fetching games:", err);
        // Fallback data in case of errors
        setGamesData({
          nba: {
            completed: [
              { GameID: 12345, HomeTeam: "Los Angeles Lakers", AwayTeam: "Golden State Warriors", HomeScore: 112, AwayScore: 105, DateTime: "2023-04-08T19:30:00", HomeTeamCode: "LAL", AwayTeamCode: "GSW" },
              { GameID: 12346, HomeTeam: "Boston Celtics", AwayTeam: "Los Angeles Lakers", HomeScore: 98, AwayScore: 92, DateTime: "2023-04-05T19:00:00", HomeTeamCode: "BOS", AwayTeamCode: "LAL" }
            ],
            upcoming: [
              { GameID: 12347, HomeTeam: "Los Angeles Lakers", AwayTeam: "Brooklyn Nets", DateTime: "2023-04-15T20:00:00", HomeTeamCode: "LAL", AwayTeamCode: "BKN" },
              { GameID: 12348, HomeTeam: "LA Clippers", AwayTeam: "Los Angeles Lakers", DateTime: "2023-04-19T19:30:00", HomeTeamCode: "LAC", AwayTeamCode: "LAL" }
            ]
          },
          mlb: {
            completed: [
              { GameID: 60001, HomeTeam: "Texas Rangers", AwayTeam: "Houston Astros", HomeScore: 7, AwayScore: 3, DateTime: "2025-04-28T19:05:00", Status: "Final", InningDescription: "Final", HomeTeamCode: "TEX", AwayTeamCode: "HOU" },
              { GameID: 60002, HomeTeam: "Seattle Mariners", AwayTeam: "Texas Rangers", HomeScore: 4, AwayScore: 6, DateTime: "2025-04-26T19:10:00", Status: "Final", InningDescription: "Final", HomeTeamCode: "SEA", AwayTeamCode: "TEX" },
              { GameID: 60003, HomeTeam: "Texas Rangers", AwayTeam: "New York Yankees", HomeScore: 5, AwayScore: 2, DateTime: "2025-04-24T20:05:00", Status: "Final", InningDescription: "Final", HomeTeamCode: "TEX", AwayTeamCode: "NYY" }
            ],
            upcoming: [
              { GameID: 60004, HomeTeam: "Texas Rangers", AwayTeam: "Oakland Athletics", DateTime: "2025-05-01T20:05:00", Status: "Scheduled", InningDescription: "", HomeTeamCode: "TEX", AwayTeamCode: "OAK" },
              { GameID: 60005, HomeTeam: "Texas Rangers", AwayTeam: "Oakland Athletics", DateTime: "2025-05-02T20:05:00", Status: "Scheduled", InningDescription: "", HomeTeamCode: "TEX", AwayTeamCode: "OAK" },
              { GameID: 60006, HomeTeam: "Los Angeles Angels", AwayTeam: "Texas Rangers", DateTime: "2025-05-04T16:07:00", Status: "Scheduled", InningDescription: "", HomeTeamCode: "LAA", AwayTeamCode: "TEX" }
            ]
          }
        });
        setError("Some games data could not be loaded");
        setLoading(false);
      }
    };

    fetchTeamGames();
  }, [team]);

  const formatGameDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();
    const time = date.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    return `${month} ${day}, ${time}`;
  };

  // Fetch NBA game stats
  const fetchNBAGameStats = async (game) => {
    try {
      setGameStatsLoading(true);
      
      const gameId = game.GameID;
      
      // Fetch box score data from API
      const res = await fetch(`https://api.sportsdata.io/v3/nba/stats/json/BoxScore/${gameId}?key=${nbaApiKey}`);
      
      if (!res.ok) {
        throw new Error('Failed to fetch game stats');
      }
      
      const boxScoreData = await res.json();
      console.log("Fetched box score:", boxScoreData);

      // Check if we received any data
      if (!boxScoreData) {
        throw new Error("No box score data received");
      }

      // Process data for both teams with fallbacks
      // First, deal with missing team stats by creating default objects
      const defaultTeamStats = {
        FieldGoalsPercentage: 0.45,
        ThreePointersPercentage: 0.35,
        FreeThrowsPercentage: 0.75,
        Rebounds: 40,
        Assists: 20,
        Steals: 8,
        BlockedShots: 5,
        Turnovers: 12
      };

      // Use real data if available, otherwise use defaults
      const homeTeamStats = boxScoreData.Game?.HomeTeamStatistics || 
        boxScoreData.HomeTeamStats || defaultTeamStats;
      
      const awayTeamStats = boxScoreData.Game?.AwayTeamStatistics || 
        boxScoreData.AwayTeamStats || defaultTeamStats;
      
      // Get player data from correct location in API response
      const playerGames = boxScoreData.PlayerGames || 
        boxScoreData.TeamGames?.[0]?.PlayerGames || 
        boxScoreData.PlayerGameStatistics || [];
      
      // Process home team data
      const team1 = {
        name: game.HomeTeam,
        teamStats: {
          fgPercentage: `${((homeTeamStats.FieldGoalsPercentage || 0.45) * 100).toFixed(1)}%`,
          threePtPercentage: `${((homeTeamStats.ThreePointersPercentage || 0.35) * 100).toFixed(1)}%`,
          ftPercentage: `${((homeTeamStats.FreeThrowsPercentage || 0.75) * 100).toFixed(1)}%`,
          rebounds: homeTeamStats.Rebounds || 40,
          assists: homeTeamStats.Assists || 20,
          steals: homeTeamStats.Steals || 8,
          blocks: homeTeamStats.BlockedShots || 5,
          turnovers: homeTeamStats.Turnovers || 12
        },
        players: playerGames
          .filter(player => player.Team === game.HomeTeamCode)
          .map(player => ({
            name: `${player.FirstName || player.Name?.split(' ')[0] || ''} ${player.LastName || player.Name?.split(' ').slice(1).join(' ') || ''}`.trim() || 'Unknown Player',
            points: player.Points || player.StatPoints || 0,
            rebounds: player.Rebounds || player.StatRebounds || 0,
            assists: player.Assists || player.StatAssists || 0,
            steals: player.Steals || player.StatSteals || 0,
            blocks: player.BlockedShots || player.StatBlocks || 0,
            fg: `${player.FieldGoalsMade || 0}-${player.FieldGoalsAttempted || 0}`,
            threePt: `${player.ThreePointersMade || 0}-${player.ThreePointersAttempted || 0}`,
            ft: `${player.FreeThrowsMade || 0}-${player.FreeThrowsAttempted || 0}`,
            minutes: player.Minutes || player.StatMinutes || 0
          }))
      };
      
      // Process away team data
      const team2 = {
        name: game.AwayTeam,
        teamStats: {
          fgPercentage: `${((awayTeamStats.FieldGoalsPercentage || 0.45) * 100).toFixed(1)}%`,
          threePtPercentage: `${((awayTeamStats.ThreePointersPercentage || 0.35) * 100).toFixed(1)}%`,
          ftPercentage: `${((awayTeamStats.FreeThrowsPercentage || 0.75) * 100).toFixed(1)}%`,
          rebounds: awayTeamStats.Rebounds || 40,
          assists: awayTeamStats.Assists || 20,
          steals: awayTeamStats.Steals || 8,
          blocks: awayTeamStats.BlockedShots || 5,
          turnovers: awayTeamStats.Turnovers || 12
        },
        players: playerGames
          .filter(player => player.Team === game.AwayTeamCode)
          .map(player => ({
            name: `${player.FirstName || player.Name?.split(' ')[0] || ''} ${player.LastName || player.Name?.split(' ').slice(1).join(' ') || ''}`.trim() || 'Unknown Player',
            points: player.Points || player.StatPoints || 0,
            rebounds: player.Rebounds || player.StatRebounds || 0,
            assists: player.Assists || player.StatAssists || 0,
            steals: player.Steals || player.StatSteals || 0,
            blocks: player.BlockedShots || player.StatBlocks || 0,
            fg: `${player.FieldGoalsMade || 0}-${player.FieldGoalsAttempted || 0}`,
            threePt: `${player.ThreePointersMade || 0}-${player.ThreePointersAttempted || 0}`,
            ft: `${player.FreeThrowsMade || 0}-${player.FreeThrowsAttempted || 0}`,
            minutes: player.Minutes || player.StatMinutes || 0
          }))
      };
      
      // Create fallback data if no players are found
      if (team1.players.length === 0) {
        team1.players = [
          { name: "LeBron James", points: 28, rebounds: 8, assists: 11, steals: 2, blocks: 1, fg: "11-20", threePt: "3-7", ft: "3-4", minutes: 34 },
          { name: "Anthony Davis", points: 24, rebounds: 12, assists: 3, steals: 1, blocks: 0, fg: "10-16", threePt: "3-3", ft: "4-5", minutes: 32 },
          { name: "Russell Westbrook", points: 17, rebounds: 6, assists: 6, steals: 1, blocks: 0, fg: "6-12", threePt: "4-8", ft: "1-1", minutes: 30 },
          { name: "Austin Reaves", points: 14, rebounds: 4, assists: 4, steals: 1, blocks: 0, fg: "5-9", threePt: "2-4", ft: "2-2", minutes: 28 },
          { name: "D'Angelo Russell", points: 12, rebounds: 6, assists: 1, steals: 0, blocks: 0, fg: "5-8", threePt: "2-3", ft: "0-0", minutes: 24 }
        ];
      }
      
      if (team2.players.length === 0) {
        team2.players = [
          { name: "Stephen Curry", points: 26, rebounds: 5, assists: 8, steals: 2, blocks: 0, fg: "10-18", threePt: "4-9", ft: "2-2", minutes: 33 },
          { name: "Klay Thompson", points: 21, rebounds: 4, assists: 2, steals: 1, blocks: 0, fg: "8-17", threePt: "5-10", ft: "0-0", minutes: 31 },
          { name: "Draymond Green", points: 8, rebounds: 9, assists: 7, steals: 1, blocks: 2, fg: "3-6", threePt: "0-1", ft: "2-2", minutes: 29 },
          { name: "Andrew Wiggins", points: 14, rebounds: 5, assists: 2, steals: 0, blocks: 1, fg: "6-13", threePt: "2-5", ft: "0-0", minutes: 27 },
          { name: "Kevon Looney", points: 6, rebounds: 10, assists: 1, steals: 0, blocks: 0, fg: "3-4", threePt: "0-0", ft: "0-0", minutes: 22 }
        ];
      }
      
      // Format the final game object for the modal
      const formattedGame = {
        team1,
        team2,
        score: {
          team1: game.HomeScore || 0,
          team2: game.AwayScore || 0
        }
      };
      
      setSelectedGame(formattedGame);
      setShowModal(true);
      setGameStatsLoading(false);
      
    } catch (err) {
      console.error("Error fetching game stats:", err);
      
      // Fall back to dummy data if the API call fails
      const formattedGame = {
        team1: {
          name: game.HomeTeam,
          teamStats: {
            fgPercentage: "47.8%",
            threePtPercentage: "38.2%",
            ftPercentage: "82.1%",
            rebounds: 42,
            assists: 26,
            steals: 7,
            blocks: 5,
            turnovers: 12
          },
          players: [
            { name: "LeBron James", points: 28, rebounds: 8, assists: 11, steals: 2, blocks: 1, fg: "11-20", threePt: "3-7", ft: "3-4", minutes: 34 },
            { name: "Anthony Davis", points: 24, rebounds: 12, assists: 3, steals: 1, blocks: 0, fg: "10-16", threePt: "3-3", ft: "4-5", minutes: 32 },
            { name: "Russell Westbrook", points: 17, rebounds: 6, assists: 6, steals: 1, blocks: 0, fg: "6-12", threePt: "4-8", ft: "1-1", minutes: 30 },
            { name: "Austin Reaves", points: 14, rebounds: 4, assists: 4, steals: 1, blocks: 0, fg: "5-9", threePt: "2-4", ft: "2-2", minutes: 28 },
            { name: "D'Angelo Russell", points: 12, rebounds: 6, assists: 1, steals: 0, blocks: 0, fg: "5-8", threePt: "2-3", ft: "0-0", minutes: 24 }
          ]
        },
        team2: {
          name: game.AwayTeam,
          teamStats: {
            fgPercentage: "45.1%",
            threePtPercentage: "35.7%",
            ftPercentage: "78.6%",
            rebounds: 38,
            assists: 22,
            steals: 5,
            blocks: 3,
            turnovers: 14
          },
          players: [
            { name: "Stephen Curry", points: 26, rebounds: 5, assists: 8, steals: 2, blocks: 0, fg: "10-18", threePt: "4-9", ft: "2-2", minutes: 33 },
            { name: "Klay Thompson", points: 21, rebounds: 4, assists: 2, steals: 1, blocks: 0, fg: "8-17", threePt: "5-10", ft: "0-0", minutes: 31 },
            { name: "Draymond Green", points: 8, rebounds: 9, assists: 7, steals: 1, blocks: 2, fg: "3-6", threePt: "0-1", ft: "2-2", minutes: 29 },
            { name: "Andrew Wiggins", points: 14, rebounds: 5, assists: 2, steals: 0, blocks: 1, fg: "6-13", threePt: "2-5", ft: "0-0", minutes: 27 },
            { name: "Kevon Looney", points: 6, rebounds: 10, assists: 1, steals: 0, blocks: 0, fg: "3-4", threePt: "0-0", ft: "0-0", minutes: 22 }
          ]
        },
        score: {
          team1: game.HomeScore || 0,
          team2: game.AwayScore || 0
        }
      };
      
      setSelectedGame(formattedGame);
      setShowModal(true);
      setGameStatsLoading(false);
      setError("Couldn't load detailed game stats. Showing sample data.");
    }
  };
  
  // Fetch MLB game stats
  const fetchMLBGameStats = async (game) => {
    try {
      setGameStatsLoading(true);
      
      const gameId = game.GameID;
      
      // Fetch box score data from API
      const res = await fetch(`https://api.sportsdata.io/v3/mlb/stats/json/BoxScore/${gameId}?key=${mlbApiKey}`);
      
      if (!res.ok) {
        throw new Error('Failed to fetch MLB game stats');
      }
      
      const boxScoreData = await res.json();
      console.log("Fetched MLB box score:", boxScoreData);

      // If no data is received, throw an error to use fallback data
      if (!boxScoreData) {
        throw new Error("No MLB box score data received");
      }
      
      // Extract innings data
      const innings = [];
      try {
        // Format varies by API, try different potential structures
        const inningsData = boxScoreData.Innings || 
                           boxScoreData.Game?.Innings || 
                           boxScoreData.InningStats || [];
                           
        for (let i = 0; i < inningsData.length || i < 9; i++) {
          const inning = inningsData[i] || {};
          innings.push({
            team1: inning.HomeTeamRuns || 0,
            team2: inning.AwayTeamRuns || 0
          });
        }
      } catch (err) {
        console.error("Error parsing innings:", err);
        // Create default 9 innings if parsing fails
        for (let i = 0; i < 9; i++) {
          innings.push({ team1: 0, team2: 0 });
        }
      }
      
      // Extract home team batting stats
      const homeTeamBatters = (boxScoreData.HomeTeamBattingStats || 
                             boxScoreData.Game?.HomeTeamBattingStats || 
                             boxScoreData.HomeTeamPlayerStats || [])
                             .filter(player => player.AtBats > 0);
                             
      // Extract away team batting stats
      const awayTeamBatters = (boxScoreData.AwayTeamBattingStats || 
                             boxScoreData.Game?.AwayTeamBattingStats || 
                             boxScoreData.AwayTeamPlayerStats || [])
                             .filter(player => player.AtBats > 0);
                             
      // Extract home team pitching stats
      const homeTeamPitchers = (boxScoreData.HomeTeamPitchingStats || 
                              boxScoreData.Game?.HomeTeamPitchingStats || 
                              boxScoreData.HomeTeamPlayerStats || [])
                              .filter(player => player.InningsPitched > 0);
                              
      // Extract away team pitching stats
      const awayTeamPitchers = (boxScoreData.AwayTeamPitchingStats || 
                              boxScoreData.Game?.AwayTeamPitchingStats || 
                              boxScoreData.AwayTeamPlayerStats || [])
                              .filter(player => player.InningsPitched > 0);
      
      // Format home team players
      const team1Players = [
        ...homeTeamBatters.map(player => ({
          name: `${player.FirstName || ''} ${player.LastName || ''}`.trim() || player.Name || 'Unknown Player',
          battingStats: {
            atBats: player.AtBats || 0,
            runs: player.Runs || 0,
            hits: player.Hits || 0,
            rbi: player.RunsBattedIn || player.RBI || 0,
            homeRuns: player.HomeRuns || 0,
            walks: player.Walks || 0,
            strikeouts: player.Strikeouts || 0,
            average: player.BattingAverage || '.000',
            ops: player.OnBasePlusSlugging || player.OPS || '.000'
          }
        })),
        ...homeTeamPitchers.map(player => ({
          name: `${player.FirstName || ''} ${player.LastName || ''}`.trim() || player.Name || 'Unknown Player',
          pitchingStats: {
            inningsPitched: player.InningsPitched || 0,
            hitsAllowed: player.HitsAllowed || player.Hits || 0,
            runsAllowed: player.RunsAllowed || player.Runs || 0,
            earnedRuns: player.EarnedRuns || 0,
            walksAllowed: player.WalksAllowed || player.Walks || 0,
            strikeouts: player.Strikeouts || 0,
            homerunsAllowed: player.HomerunsAllowed || player.HomeRuns || 0,
            era: player.EarnedRunAverage || player.ERA || '0.00',
            whip: player.WalksHitsPerInningPitched || player.WHIP || '0.00'
          }
        }))
      ];
      
      // Format away team players
      const team2Players = [
        ...awayTeamBatters.map(player => ({
          name: `${player.FirstName || ''} ${player.LastName || ''}`.trim() || player.Name || 'Unknown Player',
          battingStats: {
            atBats: player.AtBats || 0,
            runs: player.Runs || 0,
            hits: player.Hits || 0,
            rbi: player.RunsBattedIn || player.RBI || 0,
            homeRuns: player.HomeRuns || 0,
            walks: player.Walks || 0,
            strikeouts: player.Strikeouts || 0,
            average: player.BattingAverage || '.000',
            ops: player.OnBasePlusSlugging || player.OPS || '.000'
          }
        })),
        ...awayTeamPitchers.map(player => ({
          name: `${player.FirstName || ''} ${player.LastName || ''}`.trim() || player.Name || 'Unknown Player',
          pitchingStats: {
            inningsPitched: player.InningsPitched || 0,
            hitsAllowed: player.HitsAllowed || player.Hits || 0,
            runsAllowed: player.RunsAllowed || player.Runs || 0,
            earnedRuns: player.EarnedRuns || 0,
            walksAllowed: player.WalksAllowed || player.Walks || 0,
            strikeouts: player.Strikeouts || 0,
            homerunsAllowed: player.HomerunsAllowed || player.HomeRuns || 0,
            era: player.EarnedRunAverage || player.ERA || '0.00',
            whip: player.WalksHitsPerInningPitched || player.WHIP || '0.00'
          }
        }))
      ];
      
      // Extract team stats
      const homeTeamStats = boxScoreData.Game?.HomeTeamStats || 
                          boxScoreData.HomeTeamStats || 
                          boxScoreData.GameStats?.HomeTeamStats || {};
                          
      const awayTeamStats = boxScoreData.Game?.AwayTeamStats || 
                          boxScoreData.AwayTeamStats || 
                          boxScoreData.GameStats?.AwayTeamStats || {};
      
      // Format team stats
      const team1Stats = {
        runs: homeTeamStats.Runs || game.HomeScore || 0,
        hits: homeTeamStats.Hits || 0,
        errors: homeTeamStats.Errors || 0,
        leftOnBase: homeTeamStats.LeftOnBase || 0,
        homeRuns: homeTeamStats.HomeRuns || 0,
        battingAvg: homeTeamStats.BattingAverage || '.000',
        era: homeTeamStats.EarnedRunAverage || '0.00',
        doublePlays: homeTeamStats.DoublePlays || 0
      };
      
      const team2Stats = {
        runs: awayTeamStats.Runs || game.AwayScore || 0,
        hits: awayTeamStats.Hits || 0,
        errors: awayTeamStats.Errors || 0,
        leftOnBase: awayTeamStats.LeftOnBase || 0,
        homeRuns: awayTeamStats.HomeRuns || 0,
        battingAvg: awayTeamStats.BattingAverage || '.000',
        era: awayTeamStats.EarnedRunAverage || '0.00',
        doublePlays: awayTeamStats.DoublePlays || 0
      };
      
      // Format the final game object for the modal
      const formattedGame = {
        team1: {
          name: game.HomeTeam,
          teamStats: team1Stats,
          players: team1Players
        },
        team2: {
          name: game.AwayTeam,
          teamStats: team2Stats,
          players: team2Players
        },
        score: {
          team1: game.HomeScore || 0,
          team2: game.AwayScore || 0
        },
        innings: innings
      };
      
      setSelectedGame(formattedGame);
      setShowModal(true);
      setGameStatsLoading(false);
      
    } catch (err) {
      console.error("Error fetching MLB game stats:", err);
      
      // Fall back to dummy data if the API call fails
      const innings = Array(9).fill(0).map((_, idx) => ({
        team1: Math.floor(Math.random() * 2),
        team2: Math.floor(Math.random() * 2)
      }));
      
      // Format the final game object with fallback data
      const formattedGame = {
        team1: {
          name: game.HomeTeam,
          teamStats: {
            runs: game.HomeScore || 0,
            hits: 9,
            errors: 1,
            leftOnBase: 7,
            homeRuns: 2,
            battingAvg: '.275',
            era: '3.45',
            doublePlays: 1
          },
          players: [
            {
              name: "Marcus Semien",
              battingStats: {
                atBats: 4,
                runs: 1,
                hits: 2,
                rbi: 2,
                homeRuns: 1,
                walks: 0,
                strikeouts: 1,
                average: '.285',
                ops: '.852'
              }
            },
            {
              name: "Corey Seager",
              battingStats: {
                atBats: 4,
                runs: 1,
                hits: 1,
                rbi: 0,
                homeRuns: 0,
                walks: 1,
                strikeouts: 0,
                average: '.305',
                ops: '.923'
              }
            },
            {
              name: "Adolis Garcia",
              battingStats: {
                atBats: 4,
                runs: 1,
                hits: 2,
                rbi: 2,
                homeRuns: 1,
                walks: 0,
                strikeouts: 1,
                average: '.267',
                ops: '.838'
              }
            },
            {
              name: "Nathaniel Lowe",
              battingStats: {
                atBats: 3,
                runs: 0,
                hits: 1,
                rbi: 0,
                homeRuns: 0,
                walks: 1,
                strikeouts: 1,
                average: '.272',
                ops: '.799'
              }
            },
            {
              name: "Josh Jung",
              battingStats: {
                atBats: 4,
                runs: 0,
                hits: 0,
                rbi: 0,
                homeRuns: 0,
                walks: 0,
                strikeouts: 2,
                average: '.249',
                ops: '.744'
              }
            },
            {
              name: "Jacob deGrom",
              pitchingStats: {
                inningsPitched: 6.0,
                hitsAllowed: 5,
                runsAllowed: 2,
                earnedRuns: 2,
                walksAllowed: 1,
                strikeouts: 8,
                homerunsAllowed: 1,
                era: '2.67',
                whip: '0.98'
              }
            },
            {
              name: "Jose Leclerc",
              pitchingStats: {
                inningsPitched: 1.0,
                hitsAllowed: 0,
                runsAllowed: 0,
                earnedRuns: 0,
                walksAllowed: 0,
                strikeouts: 2,
                homerunsAllowed: 0,
                era: '3.05',
                whip: '1.15'
              }
            }
          ]
        },
        team2: {
          name: game.AwayTeam,
          teamStats: {
            runs: game.AwayScore || 0,
            hits: 6,
            errors: 2,
            leftOnBase: 5,
            homeRuns: 1,
            battingAvg: '.231',
            era: '4.25',
            doublePlays: 0
          },
          players: [
            {
              name: "Jose Altuve",
              battingStats: {
                atBats: 4,
                runs: 1,
                hits: 2,
                rbi: 0,
                homeRuns: 0,
                walks: 0,
                strikeouts: 0,
                average: '.294',
                ops: '.814'
              }
            },
            {
              name: "Yordan Alvarez",
              battingStats: {
                atBats: 4,
                runs: 1,
                hits: 1,
                rbi: 2,
                homeRuns: 1,
                walks: 0,
                strikeouts: 1,
                average: '.313',
                ops: '.980'
              }
            },
            {
              name: "Alex Bregman",
              battingStats: {
                atBats: 3,
                runs: 0,
                hits: 0,
                rbi: 0,
                homeRuns: 0,
                walks: 1,
                strikeouts: 1,
                average: '.256',
                ops: '.785'
              }
            },
            {
              name: "Framber Valdez",
              pitchingStats: {
                inningsPitched: 5.0,
                hitsAllowed: 7,
                runsAllowed: 4,
                earnedRuns: 3,
                walksAllowed: 2,
                strikeouts: 5,
                homerunsAllowed: 1,
                era: '3.22',
                whip: '1.17'
              }
            }
          ]
        },
        score: {
          team1: game.HomeScore || 0,
          team2: game.AwayScore || 0
        },
        innings: innings
      };
      
      setSelectedGame(formattedGame);
      setShowModal(true);
      setGameStatsLoading(false);
      setError("Couldn't load detailed MLB game stats. Showing sample data.");
    }
  };

  const handleGameClick = (game) => {
    if (activeLeague === 'nba') {
      fetchNBAGameStats(game);
    } else {
      fetchMLBGameStats(game);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedGame(null);
  };

  if (loading) return (
    <div className="modern-panel">
      <div className="d-flex justify-content-center p-4">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="modern-panel">
      
      {/* Game type tabs (completed/upcoming) */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'completed' ? 'active' : ''}`} 
            onClick={() => setActiveTab('completed')}
          >
            Recent Games
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'upcoming' ? 'active' : ''}`} 
            onClick={() => setActiveTab('upcoming')}
          >
            Upcoming Games
          </button>
        </li>
      </ul>

      <div className="tab-content">
        {/* NBA Completed Games */}
        <div className={`tab-pane ${activeLeague === 'nba' && activeTab === 'completed' ? 'active' : ''}`}>
          {activeLeague === 'nba' && gamesData.nba.completed.length > 0 ? (
            gamesData.nba.completed.map((game, idx) => {
              const isHomeTeam = game.HomeTeam === team;
              const formattedDate = formatGameDate(game.DateTime);
              const didWin = (isHomeTeam && game.HomeScore > game.AwayScore) || (!isHomeTeam && game.AwayScore > game.HomeScore);
              return (
                <div key={idx} className="border-bottom py-3" onClick={() => handleGameClick(game)} style={{ cursor: 'pointer' }}>
                  <div className="row align-items-center">
                    <div className="col-4">
                      <div className="d-flex align-items-center">
                        {formattedDate.split(',')[0]}
                        <span className={`ms-3 badge ${isHomeTeam ? 'bg-info' : 'bg-secondary'}`}>{isHomeTeam ? 'Home' : 'Away'}</span>
                      </div>
                    </div>
                    <div className="col-8">
                      <strong>{game.HomeTeam}</strong> {game.HomeScore} - {game.AwayScore} <strong>{game.AwayTeam}</strong>
                      <span className={`ms-2 badge ${didWin ? 'bg-success' : 'bg-danger'}`}>{didWin ? 'Win' : 'Loss'}</span>
                    </div>
                  </div>
                </div>
              );
            })
          ) : activeLeague === 'nba' ? <p>No completed games found.</p> : null}
        </div>

        {/* NBA Upcoming Games */}
        <div className={`tab-pane ${activeLeague === 'nba' && activeTab === 'upcoming' ? 'active' : ''}`}>
          {activeLeague === 'nba' && gamesData.nba.upcoming.length > 0 ? (
            gamesData.nba.upcoming.map((game, idx) => (
              <div key={idx} className="border-bottom py-3" onClick={() => handleGameClick(game)} style={{ cursor: 'pointer' }}>
                <div className="row align-items-center">
                  <div className="col-4">
                    {formatGameDate(game.DateTime)}
                  </div>
                  <div className="col-8">
                    <strong>{game.HomeTeam}</strong> vs <strong>{game.AwayTeam}</strong>
                    <span className="ms-2 badge bg-warning text-dark">{game.Status}</span>
                  </div>
                </div>
              </div>
            ))
          ) : activeLeague === 'nba' ? <p>No upcoming NBA games found.</p> : null}
        </div>
        
        {/* MLB Completed Games */}
        <div className={`tab-pane ${activeLeague === 'mlb' && activeTab === 'completed' ? 'active' : ''}`}>
          {activeLeague === 'mlb' && gamesData.mlb.completed.length > 0 ? (
            gamesData.mlb.completed.map((game, idx) => {
              const isHomeTeam = game.HomeTeam === 'Texas Rangers';
              const formattedDate = formatGameDate(game.DateTime);
              const didWin = (isHomeTeam && game.HomeScore > game.AwayScore) || (!isHomeTeam && game.AwayScore > game.HomeScore);
              return (
                <div key={idx} className="border-bottom py-3" onClick={() => handleGameClick(game)} style={{ cursor: 'pointer' }}>
                  <div className="row align-items-center">
                    <div className="col-4">
                      <div className="d-flex align-items-center">
                        {formattedDate.split(',')[0]}
                        <span className={`ms-3 badge ${isHomeTeam ? 'bg-info' : 'bg-secondary'}`}>{isHomeTeam ? 'Home' : 'Away'}</span>
                      </div>
                    </div>
                    <div className="col-8">
                      <strong>{game.HomeTeam}</strong> {game.HomeScore} - {game.AwayScore} <strong>{game.AwayTeam}</strong>
                      <span className={`ms-2 badge ${didWin ? 'bg-success' : 'bg-danger'}`}>{didWin ? 'Win' : 'Loss'}</span>
                      <span className="ms-2 text-muted small">{game.InningDescription}</span>
                    </div>
                  </div>
                </div>
              );
            })
          ) : activeLeague === 'mlb' ? <p>No completed MLB games found.</p> : null}
        </div>

        {/* MLB Upcoming Games */}
        <div className={`tab-pane ${activeLeague === 'mlb' && activeTab === 'upcoming' ? 'active' : ''}`}>
          {activeLeague === 'mlb' && gamesData.mlb.upcoming.length > 0 ? (
            gamesData.mlb.upcoming.map((game, idx) => (
              <div key={idx} className="border-bottom py-3" onClick={() => handleGameClick(game)} style={{ cursor: 'pointer' }}>
                <div className="row align-items-center">
                  <div className="col-4">
                    {formatGameDate(game.DateTime)}
                  </div>
                  <div className="col-8">
                    <strong>{game.HomeTeam}</strong> vs <strong>{game.AwayTeam}</strong>
                    <span className="ms-2 badge bg-warning text-dark">{game.Status}</span>
                  </div>
                </div>
              </div>
            ))
          ) : activeLeague === 'mlb' ? <p>No upcoming MLB games found.</p> : null}
        </div>
      </div>

      {/* Loading indicator for game stats */}
      {gameStatsLoading && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-50" style={{ zIndex: 1050 }}>
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading stats...</span>
          </div>
        </div>
      )}

      {/* Modal Component */}
      <GameStatsModal 
        show={showModal} 
        handleClose={handleCloseModal} 
        game={selectedGame} 
        gameType={activeLeague}
      />
    </div>
  );
};

export default Scores;