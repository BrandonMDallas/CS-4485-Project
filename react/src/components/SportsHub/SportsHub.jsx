// SportsHub.jsx with properly sized AI Assistant section
import React, { useState, useEffect, useRef } from "react";
import "./SportsHub.css";
import aiGifImage from "./AIGif.gif";
import Scores from "./Scores";
import TeamVideos from "./TeamVideos";
import NewsArticles from "./NewsArticles";
import FollowTeams from "./FollowTeams";
import AIAssistant from "./AiAssistant";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { NavLink } from "react-router-dom";

const SportsHub = () => {
  // State for dropdown menu
  const [showDropdown, setShowDropdown] = useState(false);

  // State for active sport tab
  const [activeSport, setActiveSport] = useState("NBA");

  // State for selected team
  const [selectedTeam, setSelectedTeam] = useState("Lakers");

  // State for followed teams
  const [followedTeams, setFollowedTeams] = useState([
    "Los Angeles Lakers",
    "Dallas Mavericks",
    "Texas Rangers",
    "Dallas Cowboys",
  ]);

  // State for quick select teams for each sport
  const [quickSelectTeams, setQuickSelectTeams] = useState({
    NBA: ["Lakers", "Warriors", "Celtics"],
    NFL: ["Cowboys", "Chiefs", "Eagles"],
    MLB: ["Yankees", "Dodgers", "Red Sox"],
  });

  // State for chatbot
  const [chatMessages, setChatMessages] = useState([
    {
      sender: "bot",
      text: "Hi there! I'm your Sports Assistant. Ask me anything about your favorite teams, players, or games!",
    },
  ]);
  const [userInput, setUserInput] = useState("");
  const [showChat, setShowChat] = useState(true); // Default to showing chat

  // Ref for scrolling to bottom of messages
  //const messagesEndRef = useRef(null);

  // Function to update quick select teams for a specific sport
  const updateQuickSelect = (sport, teams) => {
    setQuickSelectTeams((prev) => ({
      ...prev,
      [sport]: teams.length > 0 ? teams.slice(0, 3) : prev[sport],
    }));
  };

  // Function to toggle dropdown
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Function to handle window click to close dropdown
  const handleWindowClick = (event) => {
    if (
      !event.target.matches(".hamburger-menu") &&
      !event.target.matches(".hamburger-line")
    ) {
      setShowDropdown(false);
    }
  };

  // Function to open settings window
  const openSettingsWindow = () => {
    window.open(
      "sportsSettings.html",
      "Settings Window Sports",
      "top=100, left=100, width=400, height=500, status=1"
    );
  };

  // Function to change selected team
  const changeTeam = (team) => {
    setSelectedTeam(team);
    // Add a chatbot message when team changes
    const newMessage = {
      sender: "bot",
      text: `Team changed to ${team}! I can provide you with the latest ${team} news and stats. What would you like to know?`,
    };
    setChatMessages([...chatMessages, newMessage]);
  };

  // Function to handle following a new team
  const handleTeamFollow = (team) => {
    if (!followedTeams.includes(team)) {
      setFollowedTeams([...followedTeams, team]);
    }
  };

  // Function to handle removing a team from followed teams
  const handleTeamRemove = (team) => {
    setFollowedTeams(followedTeams.filter((t) => t !== team));
  };

  // Function to handle sport tab change
  const handleSportChange = (sport) => {
    setActiveSport(sport);
    // Set default team for the selected sport to the first quick select team
    setSelectedTeam(quickSelectTeams[sport][0]);
    // Add a chatbot message when sport changes
    const newMessage = {
      sender: "bot",
      text: `Switched to ${sport}! I can help you with ${sport} information. What would you like to know about the ${quickSelectTeams[sport][0]}?`,
    };
    setChatMessages([...chatMessages, newMessage]);
  };

  // Function to handle chatbot input submission
  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    // Add user message to chat
    const newUserMessage = { sender: "user", text: userInput };
    setChatMessages([...chatMessages, newUserMessage]);

    // Process and generate response
    setTimeout(() => {
      const botResponse = generateBotResponse(
        userInput,
        selectedTeam,
        activeSport
      );
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: botResponse },
      ]);
    }, 600);

    setUserInput("");
  };

  // Function to generate bot responses based on input
  const generateBotResponse = (input, team, sport) => {
    input = input.toLowerCase();

    if (
      input.includes("score") ||
      input.includes("game") ||
      input.includes("result")
    ) {
      return `The latest ${team} game ended 112-104. They're scheduled to play again this weekend.`;
    } else if (
      input.includes("player") ||
      input.includes("roster") ||
      input.includes("team member")
    ) {
      return `${team} has several star players in their roster. Would you like me to list the key players?`;
    } else if (input.includes("stats") || input.includes("statistics")) {
      return `${team} is currently ranked 3rd in their division with a record of 24-14.`;
    } else if (input.includes("news") || input.includes("update")) {
      return `The latest news for ${team}: Their star player has recovered from injury and will play in the next game.`;
    } else if (
      input.includes("hi") ||
      input.includes("hello") ||
      input.includes("hey")
    ) {
      return `Hey there! How can I help you with ${sport} information today?`;
    } else {
      return `I'm not sure about that regarding ${team}. Would you like to know about their recent games, players, or stats?`;
    }
  };

  // Toggle chat window
  const toggleChat = () => {
    setShowChat(!showChat);
  };

  // Scroll to bottom of messages when new ones are added
  /*
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages]);
*/
  // Adding event listener for window clicks (equivalent to window.onclick)
  useEffect(() => {
    window.addEventListener("click", handleWindowClick);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("click", handleWindowClick);
    };
  }, []);

  return (
    <div className="modern-container">
      {/* Header Navigation - Modern Redesign */}
      <header className="sports-hub-header py-2 border-bottom">
        <div className="container-fluid d-flex align-items-center">
          {/* Left side with back button, title and navigation tabs */}
          <div className="d-flex align-items-center flex-grow-1">
            <NavLink to="/dashboard">
              <button className="btn back-btn me-3">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 18L9 12L15 6"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </NavLink>
            <h1 className="sports-hub-title fs-4 mb-0 me-4">SportsHub</h1>

            <nav className="sports-tabs ms-1">
              <ul className="nav nav-pills">
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      activeSport === "NBA" ? "active" : ""
                    } px-3 py-1`}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSportChange("NBA");
                    }}
                  >
                    NBA
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      activeSport === "NFL" ? "active" : ""
                    } px-3 py-1`}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSportChange("NFL");
                    }}
                  >
                    NFL
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      activeSport === "MLB" ? "active" : ""
                    } px-3 py-1`}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSportChange("MLB");
                    }}
                  >
                    MLB
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content Area - Modern Layout */}
      <main className="modern-content">
        {/* Main Column - News and Videos */}
        <div className="main-column">
          {/* Team Info Banner */}
          <section className="modern-card team-banner">
            <h2 className="modern-section-title">
              Currently Viewing: {selectedTeam}
            </h2>
            <div className="team-selection">
              <p>Quick Select:</p>
              <div className="team-buttons">
                {quickSelectTeams[activeSport].map((team) => (
                  <button
                    key={team}
                    className={`btn btn-sm ${
                      selectedTeam === team
                        ? "btn-primary"
                        : "btn-outline-primary"
                    }`}
                    onClick={() => changeTeam(team)}
                  >
                    {team}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Scores Section */}
          <section className="modern-card news-section">
            <h2 className="modern-section-title">Latest Scores</h2>
            <Scores team={selectedTeam} sport={activeSport} />
          </section>

          {/* News Section */}
          <section className="modern-card news-section">
            <h2 className="modern-section-title">Team News</h2>
            <NewsArticles team={selectedTeam} sport={activeSport} />
          </section>

          {/* Video Section */}
          <section className="modern-card video-section">
            <h2 className="modern-section-title">Team Videos</h2>
            <TeamVideos team={selectedTeam} sport={activeSport} />
          </section>
        </div>

        {/* Sidebar Column - AI Assistant and Team Following */}
        <div className="sidebar-column">
          {/* Custom styled wrapper for AIAssistant */}
          <div className="ai-assistant-wrapper">
            {/* Integrate the new AIAssistant component */}
            <AIAssistant 
              currentTeam={selectedTeam} 
              activeSport={activeSport}
            />
              </div>
              
              {/* Inline styles for AI Assistant */}

          {/* Team Following Section */}
          <FollowTeams
            activeSport={activeSport}
            onTeamFollow={handleTeamFollow}
            followedTeams={followedTeams}
            onTeamRemove={handleTeamRemove}
            onTeamSelect={changeTeam}
            updateQuickSelect={updateQuickSelect}
          />
        </div>
      </main>

      {/* Global responsive styles */}
      <style jsx>{`
                .ai-assistant-card {
                  background: #4060e0;
                  color: white;
                  border-radius: 12px;
                  padding: 20px;
                  display: flex;
                  flex-direction: column;
                  margin-bottom: 20px;
                  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
                  height: ${showChat ? "auto" : "230px"};
                  overflow: hidden;
                  transition: height 0.3s ease;
                }

                .ai-assistant-title {
                  font-size: 18px;
                  font-weight: 600;
                  margin-top: 0;
                  margin-bottom: 16px;
                  padding-bottom: 12px;
                  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
                }

                .ai-assistant-content {
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                  height: 100%;
                  gap: 25px;
                }

                .assistant-avatar-container {
                  width: 90px;
                  height: 90px;
                  border-radius: 50%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                }

                .assistant-avatar {
                  width: 100%;
                  height: 100%;
                  object-fit: contain;
                }

                .chat-button {
                  width: 100%;
                  padding: 12px;
                  background-color: rgba(255, 255, 255, 0.15);
                  color: white;
                  border: none;
                  border-radius: 8px;
                  font-size: 16px;
                  font-weight: 500;
                  cursor: pointer;
                  transition: background-color 0.2s;
                }

                .chat-button:hover {
                  background-color: rgba(255, 255, 255, 0.25);
                }

                .chat-container {
                  width: 100%;
                  background-color: rgba(255, 255, 255, 0.05);
                  border-radius: 10px;
                  display: flex;
                  flex-direction: column;
                  overflow: hidden;
                  margin-top: 10px;
                }

                .chat-messages-container {
                  padding: 12px;
                  height: 180px;
                  overflow-y: auto;
                  display: flex;
                  flex-direction: column;
                  scrollbar-width: thin;
                  scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
                }

                .chat-messages-container::-webkit-scrollbar {
                  width: 5px;
                }

                .chat-messages-container::-webkit-scrollbar-track {
                  background: transparent;
                }

                .chat-messages-container::-webkit-scrollbar-thumb {
                  background-color: rgba(255, 255, 255, 0.3);
                  border-radius: 20px;
                }

                .message {
                  margin-bottom: 10px;
                  max-width: 90%;
                }

                .bot-message {
                  align-self: flex-start;
                }

                .user-message {
                  align-self: flex-end;
                }

                .message-content {
                  padding: 10px 15px;
                  border-radius: 18px;
                  font-size: 14px;
                  line-height: 1.4;
                }

                .bot-message .message-content {
                  background-color: rgba(255, 255, 255, 0.1);
                  color: white;
                  border-top-left-radius: 4px;
                }

                .user-message .message-content {
                  background-color: white;
                  color: #333;
                  border-top-right-radius: 4px;
                }

                .chat-input-container {
                  display: flex;
                  padding: 10px;
                  background-color: rgba(255, 255, 255, 0.05);
                  border-top: 1px solid rgba(255, 255, 255, 0.1);
                }

                .chat-input {
                  flex-grow: 1;
                  padding: 12px 15px;
                  border: none;
                  border-radius: 20px;
                  background-color: rgba(255, 255, 255, 0.1);
                  color: white;
                  margin-right: 8px;
                  font-size: 14px;
                }

                .chat-input::placeholder {
                  color: rgba(255, 255, 255, 0.6);
                }

                .chat-input:focus {
                  outline: none;
                  background-color: rgba(255, 255, 255, 0.15);
                }

                .send-button {
                  width: 36px;
                  height: 36px;
                  border-radius: 50%;
                  border: none;
                  background-color: white;
                  color: #4366e3;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  cursor: pointer;
                }

                .send-button svg {
                  width: 16px;
                  height: 16px;
                  color: #4366e3;
                }
      `}</style>
    </div>
  );
};

export default SportsHub;