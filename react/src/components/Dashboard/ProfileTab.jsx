import React, { useState, useEffect } from "react";
import { Card, Form, Button, Container } from "react-bootstrap";

const ProfileTab = () => {
  // State for user info
  const [currentUsername, setCurrentUsername] = useState("Vijay");
  
  // State for form inputs
  const [newUsername, setNewUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // State for form feedback
  const [usernameMessage, setUsernameMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  
  // State for dark mode
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Detect dark mode changes
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.body.classList.contains('dark-mode'));
    };
    
    // Initial check
    checkDarkMode();
    
    // Create observer to watch for class changes on the body
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    
    // Cleanup
    return () => observer.disconnect();
  }, []);

  // Username change handler
  const handleUsernameChange = (e) => {
    e.preventDefault();
    
    if (!newUsername.trim()) {
      setUsernameMessage("Please enter a new username");
      return;
    }
    
    if (newUsername === currentUsername) {
      setUsernameMessage("New username must be different from current username");
      return;
    }
    
    // Simulate API call to change username
    console.log(`Changing username from ${currentUsername} to ${newUsername}`);
    
    // On success
    setCurrentUsername(newUsername);
    setNewUsername("");
    setUsernameMessage("Username successfully updated!");
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      setUsernameMessage("");
    }, 3000);
  };
  
  // Password change handler
  const handlePasswordChange = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!currentPassword.trim()) {
      setPasswordMessage("Please enter your current password");
      return;
    }
    
    if (!newPassword.trim()) {
      setPasswordMessage("Please enter a new password");
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setPasswordMessage("New passwords do not match");
      return;
    }
    
    // Simulate password change API call
    console.log("Changing password");
    
    // Reset fields on success
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordMessage("Password successfully updated!");
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      setPasswordMessage("");
    }, 3000);
  };

  // Custom styles for dark mode
  const darkModeStyles = {
    card: {
      backgroundColor: isDarkMode ? "#222" : "white",
      borderColor: isDarkMode ? "#444" : "#dee2e6",
    },
    cardBody: {
      backgroundColor: isDarkMode ? "#222" : "white",
      color: isDarkMode ? "#e4e4e4" : "inherit",
    },
    formControl: {
      backgroundColor: isDarkMode ? "#333" : "white",
      color: isDarkMode ? "#e4e4e4" : "inherit",
      borderColor: isDarkMode ? "#555" : "#ced4da",
    },
    text: {
      color: isDarkMode ? "#bbb" : "#6c757d",
    },
    hr: {
      borderColor: isDarkMode ? "#444" : "#dee2e6",
    }
  };

  return (
    <Container fluid className="px-0">
      <Card 
        className="shadow-sm" 
        style={{ 
          maxWidth: "450px", 
          margin: "0 auto",
          ...darkModeStyles.card
        }}
      >
        {/* Header */}
        <Card.Header className="bg-primary text-white py-3">
          <h4 className="mb-0">Profile Settings</h4>
        </Card.Header>
        
        <Card.Body className="p-4" style={darkModeStyles.cardBody}>
          {/* Username Change Section */}
          <div className="mb-4">
            <h5 className="mb-2" style={{ color: isDarkMode ? "white" : "inherit" }}>Change Username</h5>
            
            <p style={{ ...darkModeStyles.text, marginBottom: "1rem" }}>
              Current username: <span className="fw-bold" style={{ color: isDarkMode ? "white" : "inherit" }}>{currentUsername}</span>
            </p>
            
            {usernameMessage && (
              <div className="alert py-2 mb-3" style={{ 
                backgroundColor: isDarkMode ? "#264653" : "#cff4fc",
                color: isDarkMode ? "white" : "#055160"
              }}>
                {usernameMessage}
              </div>
            )}
            
            <Form onSubmit={handleUsernameChange}>
              <Form.Group className="mb-3">
                <Form.Label style={{ color: isDarkMode ? "white" : "inherit" }}>New Username</Form.Label>
                <Form.Control
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  placeholder="Enter new username"
                  size="sm"
                  style={darkModeStyles.formControl}
                />
              </Form.Group>
              
              <div className="text-center">
                <Button 
                  type="submit"
                  variant="primary"
                  className="px-4"
                  size="sm"
                >
                  Update Username
                </Button>
              </div>
            </Form>
          </div>
          
          <hr className="my-4" style={darkModeStyles.hr} />
          
          {/* Password Change Section */}
          <div>
            <h5 className="mb-4" style={{ color: isDarkMode ? "white" : "inherit" }}>Change Password</h5>
            
            {passwordMessage && (
              <div className="alert py-2 mb-3" style={{ 
                backgroundColor: isDarkMode ? "#264653" : "#cff4fc",
                color: isDarkMode ? "white" : "#055160"
              }}>
                {passwordMessage}
              </div>
            )}
            
            <Form onSubmit={handlePasswordChange}>
              <Form.Group className="mb-3">
                <Form.Label style={{ color: isDarkMode ? "white" : "inherit" }}>Current Password</Form.Label>
                <Form.Control
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  size="sm"
                  style={darkModeStyles.formControl}
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label style={{ color: isDarkMode ? "white" : "inherit" }}>New Password</Form.Label>
                <Form.Control
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  size="sm"
                  style={darkModeStyles.formControl}
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label style={{ color: isDarkMode ? "white" : "inherit" }}>Confirm New Password</Form.Label>
                <Form.Control
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  size="sm"
                  style={darkModeStyles.formControl}
                />
              </Form.Group>
              
              <div className="text-center">
                <Button 
                  type="submit" 
                  variant="primary"
                  className="px-4"
                  size="sm"
                >
                  Update Password
                </Button>
              </div>
            </Form>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProfileTab;