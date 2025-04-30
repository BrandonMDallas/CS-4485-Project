// AI Assistant Component with Improved Chat UI
import React, { useState, useEffect, useRef } from 'react';
import './AIAssistant.css';
import aiGifImage from './AIGif.gif';

const AIAssistant = ({ currentTeam, activeSport }) => {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: `Hi there! I'm your Sports Assistant. Ask me anything about your favorite teams, players, or games!` }
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);
  
  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages, showChat]);
  
  // Handle sending a message
  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (!inputText.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { sender: 'user', text: inputText }]);
    
    // Generate bot response
    setTimeout(() => {
      const botResponse = generateResponse(inputText, currentTeam, activeSport);
      setMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
    }, 600);
    
    setInputText('');
  };
  
  // Simple response generator
  const generateResponse = (input, team, sport) => {
    input = input.toLowerCase();
    
    if (input.includes('score') || input.includes('game') || input.includes('result')) {
      return `The latest ${team} game ended 112-104. They're scheduled to play again this weekend.`;
    } else if (input.includes('player') || input.includes('roster') || input.includes('team')) {
      return `${team} has several star players in their roster. Would you like me to list the key players?`;
    } else if (input.includes('stats') || input.includes('statistics')) {
      return `${team} is currently ranked 3rd in their division with a record of 24-14.`;
    } else if (input.includes('news') || input.includes('update')) {
      return `The latest news for ${team}: Their star player has recovered from injury and will play in the next game.`;
    } else {
      return `I'm not sure about that regarding ${team}. Would you like to know about their recent games, players, or stats?`;
    }
  };
  
  // Toggle chat visibility
  const toggleChat = () => {
    setShowChat(!showChat);
  };

  return (
    <div className="ai-assistant-card">
      <h3 className="assistant-title">AI Assistant</h3>
      
      <div className="assistant-content">
        <div className="assistant-avatar">
          <img 
            src={aiGifImage} 
            alt="AI Assistant animated icon" 
            className="assistant-gif"
          />
        </div>
        
        {!showChat ? (
          <button 
            className="chat-button open-chat"
            onClick={toggleChat}
          >
            Chat with Assistant
          </button>
        ) : (
          <div className="chat-interface">
            <button 
              className="close-chat-button"
              onClick={toggleChat}
            >
              Close Chat
            </button>
            
            <div className="messages-container">
              {messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`message ${msg.sender === 'user' ? 'user-message' : 'bot-message'}`}
                >
                  {msg.sender === 'bot' && (
                    <div className="bot-avatar-small">
                      <img 
                        src={aiGifImage} 
                        alt="AI" 
                        className="bot-avatar-img"
                      />
                    </div>
                  )}
                  <div className="message-bubble">
                    <p>{msg.text}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            <form onSubmit={handleSendMessage} className="chat-input-form">
              <input
                type="text"
                placeholder="Ask about sports, teams, or players..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="chat-input"
              />
              <button type="submit" className="send-button">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIAssistant;