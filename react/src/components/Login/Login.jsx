import React from "react";
import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import api from "../../api/apiClient";
import { API_ROUTES } from "../../config/constants";
import { useNavigate, useLocation, Link } from "react-router-dom";
import styles from "./Login.module.css";
const LOGIN_URL = "/api/auth/login";

const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const usernameRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/dashboard";

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post(
        API_ROUTES.LOGIN,
        JSON.stringify({ username: username, password: password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setUsername("");
      setPassword("");
      setSuccess(true);

      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ username, password, roles, accessToken });
      setTimeout(() => {
        navigate(from, { state: { fromRegister: true } });
      }, 1500);
      console.log(accessToken);
    } catch (err) {
      console.log(err);
      console.log("ISSUE");
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password;");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <section className={styles.container}>
      {success ? (
        <section className={styles.form}>
          <h1>You are logged in!</h1>
          <p>Redirecting you...</p>
        </section>
      ) : (
        <section className={styles.container}>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              ref={usernameRef}
              autoComplete="off"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              required
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              ref={usernameRef}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <button className={styles.button}>Sign In</button>
            <p>
              <br />
              Need an Account?{" "}
              <span className="line">
                <Link to="/register">Sign Up</Link>
              </span>
            </p>
          </form>
        </section>
      )}
    </section>
  );
};

export default Login;
