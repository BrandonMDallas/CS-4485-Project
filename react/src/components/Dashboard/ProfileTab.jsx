import React from "react";
import { useState, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Stack from "react-bootstrap/Stack";

const ProfileTab = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [elementType, setElementType] = useState("div");
  const [elementType2, setElementType2] = useState("div");
  const usernameChange = () => {
    console.log(username);
  };
  const passwordChange = () => {
    console.log(password);
  };
  return (
    <>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Edit profile</Accordion.Header>
          <Accordion.Body>
            <p>Change email</p>
            <input
              type="text"
              id="EmailInput"
              className="form-control"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />{" "}
            <Button type="submit" onClick={usernameChange}>
              Change
            </Button>
            <p>Change password</p>
            <input type="text" id="PasswordInput" />{" "}
            <Button type="submit">Change</Button>
            <br />
            <div style={{ display: "inline-flex" }}>
              <div>
                <p style={{ fontSize: "15px" }}>Current pic</p>
              </div>
              <div>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Edit profile pic</Form.Label>
                  <img />
                  <Form.Control type="file" />
                </Form.Group>
                <Button>Use pic</Button>
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <InputGroup className="mb-3">
        <Stack gap={3}>
          <div style={{ display: "inline-flex" }} className="p-2" id="Email">
            {React.createElement(elementType, {
              type: elementType === "input" ? "text" : null,
              children: elementType === "div" ? "Email goes here" : null,
            })}
            <Button
              variant="outline-secondary"
              id="button-addon2"
              onClick={() => changeEmail()}
            >
              Edit
            </Button>
          </div>
          <div style={{ display: "inline-flex" }} className="p-2" id="Password">
            {React.createElement(elementType2, {
              type: elementType2 === "input" ? "text" : null,
              children: elementType2 === "div" ? "Password goes here" : null,
            })}
            <Button
              variant="outline-secondary"
              id="button-addon2"
              onClick={() => changePassword()}
            >
              Edit
            </Button>
          </div>
          <div
            style={{ display: "inline-flex" }}
            className="p-2"
            id="Email"
          ></div>
        </Stack>
      </InputGroup>
    </>
  );
};

export default ProfileTab;
