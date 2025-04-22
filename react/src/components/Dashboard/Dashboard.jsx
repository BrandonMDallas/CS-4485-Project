import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Nav, Tab } from "react-bootstrap";
import MainTab from "./MainTab";
import ProfileTab from "./ProfileTab";
import SettingsTab from "./SettingsTab";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  return (
    <Container fluid className={styles.dashboardContainer}>
      <Tab.Container defaultActiveKey="main">
        <Nav variant="pills" className="justify-content-center mb-4">
          <Nav.Item>
            <Nav.Link eventKey="main" className={styles.navLink}>
              Main
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="profile" className={styles.navLink}>
              Your Profile
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="settings" className={styles.navLink}>
              Settings
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content className={styles.tabContent}>
          <Tab.Pane eventKey="main">
            <MainTab />
          </Tab.Pane>
          <Tab.Pane eventKey="profile">
            <ProfileTab />
          </Tab.Pane>
          <Tab.Pane eventKey="settings">
            <SettingsTab />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </Container>
  );
};

export default Dashboard;
