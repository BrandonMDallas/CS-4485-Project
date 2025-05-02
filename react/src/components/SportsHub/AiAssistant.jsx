// AI Assistant Component with ChatGPT 3.5 Turbo Integration - SportsHub Version
import React, { useState, useEffect, useRef } from 'react';
import './AIAssistant.css';
import aiGifImage from './AIGif.gif';

const AIAssistant = ({ currentTeam, activeSport }) => {
  const [showChat, setShowChat] = useState(true); // Default to showing chat for SportsHub
  const [messages, setMessages] = useState([
    { 
      sender: 'bot', 
      text: `Hi there! I'm your Sports Assistant. Ask me anything about ${currentTeam || 'your favorite teams'}, ${activeSport || 'sports'}, players, or games!` 
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Update welcome message when team or sport changes
  useEffect(() => {
    // Only update the welcome message when team or sport changes
    // and only if there's just one message (the welcome message)
    if (messages.length === 1 && messages[0].sender === 'bot') {
      setMessages([
        { 
          sender: 'bot', 
          text: `Hi there! I'm your Sports Assistant. Ask me anything about ${currentTeam || 'your favorite teams'}, ${activeSport || 'sports'}, players, or games!` 
        }
      ]);
    }
  }, [currentTeam, activeSport]);
  /*
  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages, showChat]);
  */
  // Handle sending a message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!inputText.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { sender: 'user', text: inputText }]);
    
    // Show loading state
    setIsLoading(true);
    
    try {
      // Call ChatGPT API
      const response = await callChatGPT(inputText, currentTeam, activeSport);
      
      // Add bot response
      setMessages(prev => [...prev, { sender: 'bot', text: response }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages(prev => [...prev, { 
        sender: 'bot', 
        text: "Sorry, I'm having trouble connecting right now. Please try again in a moment." 
      }]);
    } finally {
      setIsLoading(false);
    }
    
    setInputText('');
  };
  
  // Function to call ChatGPT API
  const callChatGPT = async (userMessage, team, sport) => {
    const apiKey = 'h'; // 
  
    const systemMessage = `You are a helpful sports assistant specializing in ${sport || 'all sports'}. 
    ${team ? `You have particular expertise about the ${team} team.` : ''} 
    Keep your answers focused on sports-related topics, be concise, friendly, and informative. 
    If asked about non-sports topics, politely redirect the conversation to sports.
    Provide specific details about ${team || 'teams'} when available, such as player stats, recent game results, and interesting facts.
    Your responses should be brief and to the point - no more than 3 sentences for most questions.`;
  
    const conversationHistory = messages
      .filter(msg => messages.indexOf(msg) > 0)
      .map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text
      }));
  
    const requestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemMessage },
        ...conversationHistory,
        { role: "user", content: userMessage }
      ],
      max_tokens: 150,
      temperature: 0.7
    };
  
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(requestBody)
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
      throw error;
    }
  };
  
  
  // Toggle chat visibility
  const toggleChat = () => {
    setShowChat(!showChat);
  };

  return (
    <div className="ai-assistant-card">
      <h3 className="assistant-title">Sports AI Assistant</h3>
      
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
            Chat with Sports Assistant
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
              {isLoading && (
                <div className="message bot-message">
                  <div className="bot-avatar-small">
                    <img 
                      src={aiGifImage} 
                      alt="AI" 
                      className="bot-avatar-img"
                    />
                  </div>
                  <div className="message-bubble loading-bubble">
                    <span className="loading-dot"></span>
                    <span className="loading-dot"></span>
                    <span className="loading-dot"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            <form onSubmit={handleSendMessage} className="chat-input-form">
              <input
                type="text"
                placeholder={`Ask about ${currentTeam || 'teams'}, players, stats...`}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="chat-input"
                disabled={isLoading}
              />
              <button type="submit" className="send-button" disabled={isLoading}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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